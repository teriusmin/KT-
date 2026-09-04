import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductItem,
  LeadItem,
  PostItem,
  ReviewItem,
  FaqItem,
  SiteSettings
} from '../types';
import {
  defaultSiteSettings,
  defaultProducts,
  defaultLeads,
  defaultPosts,
  defaultReviews,
  defaultFaqs
} from '../data/defaultData';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, product: Partial<ProductItem>) => void;
  updateAllProducts: (updatedProducts: ProductItem[]) => void;
  batchUpdateProducts: (fields: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  updateLead: (id: string, updates: Partial<LeadItem>) => void;
  deleteLead: (id: string) => void;

  posts: PostItem[];
  addPost: (post: Omit<PostItem, 'id' | 'date' | 'views'>) => void;
  updatePost: (id: string, post: Partial<PostItem>) => void;
  deletePost: (id: string) => void;

  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  updateReview: (id: string, review: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;

  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, faq: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;

  viewMode: 'landing' | 'admin';
  setViewMode: (mode: 'landing' | 'admin') => void;
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  adminTab: 'dashboard' | 'leads' | 'posts' | 'products' | 'cards' | 'design' | 'settings';
  setAdminTab: (tab: 'dashboard' | 'leads' | 'posts' | 'products' | 'cards' | 'design' | 'settings') => void;

  selectedProductForApply: ProductItem | null;
  setSelectedProductForApply: (product: ProductItem | null) => void;

  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  resetToDefaultData: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
  syncStatus: 'idle' | 'syncing' | 'saved';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'kt_skylife_settings',
  PRODUCTS: 'kt_skylife_products',
  LEADS: 'kt_skylife_leads',
  POSTS: 'kt_skylife_posts',
  REVIEWS: 'kt_skylife_reviews',
  FAQS: 'kt_skylife_faqs',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...defaultSiteSettings, ...JSON.parse(saved) } : defaultSiteSettings;
    } catch {
      return defaultSiteSettings;
    }
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : defaultLeads;
    } catch {
      return defaultLeads;
    }
  });

  const [posts, setPosts] = useState<PostItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      return saved ? JSON.parse(saved) : defaultPosts;
    } catch {
      return defaultPosts;
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : defaultReviews;
    } catch {
      return defaultReviews;
    }
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : defaultFaqs;
    } catch {
      return defaultFaqs;
    }
  });

  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'saved'>('idle');
  const [viewMode, setViewMode] = useState<'landing' | 'admin'>('landing');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('kt_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const loginAdmin = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('kt_admin_auth', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('kt_admin_auth');
    } catch (e) {
      console.error(e);
    }
    setViewMode('landing');
    showToast('관리자 로그아웃 되었습니다.', 'info');
  };

  const [adminTab, setAdminTab] = useState<'dashboard' | 'leads' | 'posts' | 'products' | 'design' | 'settings'>('dashboard');
  const [selectedProductForApply, setSelectedProductForApply] = useState<ProductItem | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Real-time Firestore Cloud Synchronization
  useEffect(() => {
    const configDocRef = doc(db, 'app_data', 'config');

    // Subscribe to real-time changes across instances and sessions
    const unsubscribe = onSnapshot(configDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.siteSettings) {
          setSiteSettings((prev) => ({ ...prev, ...data.siteSettings }));
          try { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.siteSettings)); } catch {}
        }
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
          try { localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products)); } catch {}
        }
        if (data.leads && Array.isArray(data.leads)) {
          setLeads(data.leads);
          try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(data.leads)); } catch {}
        }
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          try { localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(data.posts)); } catch {}
        }
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
          try { localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(data.reviews)); } catch {}
        }
        if (data.faqs && Array.isArray(data.faqs)) {
          setFaqs(data.faqs);
          try { localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(data.faqs)); } catch {}
        }
      } else {
        // If document doesn't exist yet, seed initial data to Firestore cloud
        setDoc(configDocRef, {
          siteSettings,
          products,
          leads,
          posts,
          reviews,
          faqs,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch((err) => console.error('Cloud init error:', err));
      }
    }, (error) => {
      console.warn('Firestore snapshot listener warning:', error);
    });

    return () => unsubscribe();
  }, []);

  // Helper to persist updates directly to Firestore Cloud and LocalStorage
  const persistToCloud = async (partialUpdates: {
    siteSettings?: SiteSettings;
    products?: ProductItem[];
    leads?: LeadItem[];
    posts?: PostItem[];
    reviews?: ReviewItem[];
    faqs?: FaqItem[];
  }) => {
    try {
      setSyncStatus('syncing');
      const configDocRef = doc(db, 'app_data', 'config');
      await setDoc(configDocRef, {
        ...partialUpdates,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSyncStatus('saved');
      setTimeout(() => setSyncStatus('idle'), 2500);
    } catch (e) {
      console.error('Firestore cloud save failed:', e);
      setSyncStatus('idle');
    }
  };

  // LocalStorage sync effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...settings };
    setSiteSettings(updated);
    persistToCloud({ siteSettings: updated });
    showToast('사이트 설정이 클라우드에 안전하게 저장되었습니다.', 'success');
  };

  // Products CRUD
  const addProduct = (product: Omit<ProductItem, 'id'>) => {
    const newProd: ProductItem = {
      ...product,
      id: 'prod-' + Date.now()
    };
    const updated = [newProd, ...products];
    setProducts(updated);
    persistToCloud({ products: updated });
    showToast(`상품 "${newProd.name}"이(가) 등록 및 클라우드 저장되었습니다.`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<ProductItem>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProducts(updated);
    persistToCloud({ products: updated });
    showToast('상품 정보가 수정되어 클라우드에 저장되었습니다.', 'success');
  };

  const updateAllProducts = (updatedList: ProductItem[]) => {
    setProducts(updatedList);
    persistToCloud({ products: updatedList });
    showToast(`전체 ${updatedList.length}개 상품 정보가 성공적으로 일괄 저장되었습니다.`, 'success');
  };

  const batchUpdateProducts = (fields: Partial<ProductItem>) => {
    const updated = products.map((p) => ({ ...p, ...fields }));
    setProducts(updated);
    persistToCloud({ products: updated });
    showToast('전체 상품에 문구가 성공적으로 일괄 적용되었습니다.', 'success');
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    persistToCloud({ products: updated });
    showToast('상품이 삭제되었습니다.', 'info');
  };

  // Leads CRUD
  const addLead = (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newLead: LeadItem = {
      ...leadData,
      id: 'lead-' + Date.now(),
      createdAt: formattedDate,
      status: '접수'
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    persistToCloud({ leads: updated });
    showToast('가입 상담 신청이 정상 접수되었습니다! 전문 상담사가 곧 연락드립니다.', 'success');
  };

  const updateLead = (id: string, updates: Partial<LeadItem>) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, ...updates } : l));
    setLeads(updated);
    persistToCloud({ leads: updated });
    showToast('신청서 상태가 업데이트되었습니다.', 'success');
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    persistToCloud({ leads: updated });
    showToast('신청 내역이 삭제되었습니다.', 'info');
  };

  // Posts CRUD
  const addPost = (postData: Omit<PostItem, 'id' | 'date' | 'views'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const newPost: PostItem = {
      ...postData,
      id: 'post-' + Date.now(),
      date: dateStr,
      views: 1
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    persistToCloud({ posts: updated });
    showToast(`게시글 "${newPost.title}"이(가) 등록되었습니다.`, 'success');
  };

  const updatePost = (id: string, postData: Partial<PostItem>) => {
    const updated = posts.map((p) => (p.id === id ? { ...p, ...postData } : p));
    setPosts(updated);
    persistToCloud({ posts: updated });
    showToast('게시글이 수정되었습니다.', 'success');
  };

  const deletePost = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    persistToCloud({ posts: updated });
    showToast('게시글이 삭제되었습니다.', 'info');
  };

  // Reviews CRUD
  const addReview = (rev: Omit<ReviewItem, 'id' | 'date'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const newRev: ReviewItem = {
      ...rev,
      id: 'rev-' + Date.now(),
      date: dateStr
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    persistToCloud({ reviews: updated });
    showToast('고객 후기가 등록되었습니다.', 'success');
  };

  const updateReview = (id: string, rev: Partial<ReviewItem>) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, ...rev } : r));
    setReviews(updated);
    persistToCloud({ reviews: updated });
    showToast('후기가 수정되었습니다.', 'success');
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    persistToCloud({ reviews: updated });
    showToast('후기가 삭제되었습니다.', 'info');
  };

  // FAQs CRUD
  const addFaq = (faq: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = {
      ...faq,
      id: 'faq-' + Date.now()
    };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    persistToCloud({ faqs: updated });
    showToast('FAQ 항목이 추가되었습니다.', 'success');
  };

  const updateFaq = (id: string, faq: Partial<FaqItem>) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, ...faq } : f));
    setFaqs(updated);
    persistToCloud({ faqs: updated });
    showToast('FAQ가 수정되었습니다.', 'success');
  };

  const deleteFaq = (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    persistToCloud({ faqs: updated });
    showToast('FAQ 항목이 삭제되었습니다.', 'info');
  };

  // Reset to default
  const resetToDefaultData = () => {
    setSiteSettings(defaultSiteSettings);
    setProducts(defaultProducts);
    setLeads(defaultLeads);
    setPosts(defaultPosts);
    setReviews(defaultReviews);
    setFaqs(defaultFaqs);
    localStorage.clear();
    persistToCloud({
      siteSettings: defaultSiteSettings,
      products: defaultProducts,
      leads: defaultLeads,
      posts: defaultPosts,
      reviews: defaultReviews,
      faqs: defaultFaqs
    });
    showToast('모든 데이터가 기본값으로 초기화되고 클라우드에 반영되었습니다.', 'info');
  };

  // Export / Import
  const exportDataJson = () => {
    const backup = {
      siteSettings,
      products,
      leads,
      posts,
      reviews,
      faqs,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.siteSettings) setSiteSettings(parsed.siteSettings);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.leads) setLeads(parsed.leads);
      if (parsed.posts) setPosts(parsed.posts);
      if (parsed.reviews) setReviews(parsed.reviews);
      if (parsed.faqs) setFaqs(parsed.faqs);
      
      persistToCloud({
        siteSettings: parsed.siteSettings || siteSettings,
        products: parsed.products || products,
        leads: parsed.leads || leads,
        posts: parsed.posts || posts,
        reviews: parsed.reviews || reviews,
        faqs: parsed.faqs || faqs
      });

      showToast('데이터 백업 파일이 성공적으로 복원 및 클라우드 동기화되었습니다.', 'success');
      return true;
    } catch {
      showToast('백업 파일 형식이 올바르지 않습니다.', 'error');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        siteSettings,
        updateSiteSettings,
        products,
        addProduct,
        updateProduct,
        updateAllProducts,
        batchUpdateProducts,
        deleteProduct,
        leads,
        addLead,
        updateLead,
        deleteLead,
        posts,
        addPost,
        updatePost,
        deletePost,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        viewMode,
        setViewMode,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminTab,
        setAdminTab,
        selectedProductForApply,
        setSelectedProductForApply,
        toasts,
        showToast,
        removeToast,
        resetToDefaultData,
        exportDataJson,
        importDataJson,
        syncStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
