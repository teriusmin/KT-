import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  getDocs
} from 'firebase/firestore';

// Recursively sanitize objects and arrays to remove undefined values, preventing Firestore write errors
export function sanitizeForFirestore<T>(data: T): T {
  if (data === undefined) {
    return null as unknown as T;
  }
  if (data === null || typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForFirestore(item)) as unknown as T;
  }
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      result[key] = sanitizeForFirestore(value);
    }
  }
  return result as T;
}

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
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateLead: (id: string, updates: Partial<LeadItem>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  refreshFromCloud: () => Promise<void>;
  resetSampleLeads: () => Promise<void>;

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
  adminTab: 'dashboard' | 'leads' | 'posts' | 'products' | 'cards' | 'design' | 'footer' | 'settings';
  setAdminTab: (tab: 'dashboard' | 'leads' | 'posts' | 'products' | 'cards' | 'design' | 'footer' | 'settings') => void;

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
  DELETED_LEADS: 'kt_skylife_deleted_lead_ids',
  POSTS: 'kt_skylife_posts',
  REVIEWS: 'kt_skylife_reviews',
  FAQS: 'kt_skylife_faqs',
};

const getPersistedDeletedIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DELETED_LEADS);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
};

const savePersistedDeletedIds = (ids: Set<string>) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DELETED_LEADS, JSON.stringify(Array.from(ids)));
  } catch {}
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
      const deletedIds = getPersistedDeletedIds();
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      const parsed: LeadItem[] = saved ? JSON.parse(saved) : defaultLeads;
      return parsed.filter((l) => l && l.id && !deletedIds.has(l.id));
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

  const [adminTab, setAdminTab] = useState<'dashboard' | 'leads' | 'posts' | 'products' | 'cards' | 'design' | 'footer' | 'settings'>('dashboard');
  const [selectedProductForApply, setSelectedProductForApply] = useState<ProductItem | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const deletedLeadIdsRef = useRef<Set<string>>(new Set());

  // Real-time Firestore Cloud Synchronization
  useEffect(() => {
    // 1. Subscribe to app_data/config (site settings, products, posts, reviews, faqs, and base leads)
    const configDocRef = doc(db, 'app_data', 'config');

    const unsubscribeConfig = onSnapshot(configDocRef, (docSnap) => {
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
          const deletedIds = getPersistedDeletedIds();
          const validConfigLeads = (data.leads as LeadItem[]).filter(
            (l) => l && l.id && !deletedIds.has(l.id) && !deletedLeadIdsRef.current.has(l.id)
          );
          setLeads((prev) => {
            const map = new Map<string, LeadItem>();
            validConfigLeads.forEach((l) => map.set(l.id, l));
            prev.forEach((l) => {
              if (l && l.id && !deletedIds.has(l.id) && !deletedLeadIdsRef.current.has(l.id)) {
                map.set(l.id, l);
              }
            });
            const merged = Array.from(map.values()).filter(
              (l) => !deletedIds.has(l.id) && !deletedLeadIdsRef.current.has(l.id)
            );
            merged.sort((a, b) => ((b.createdAt || '') > (a.createdAt || '') ? 1 : -1));
            try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(merged)); } catch {}
            return merged;
          });
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
        const initialClean = sanitizeForFirestore({
          siteSettings,
          products,
          leads,
          posts,
          reviews,
          faqs,
          updatedAt: new Date().toISOString()
        });
        setDoc(configDocRef, initialClean, { merge: true }).catch((err) => console.error('Cloud init error:', err));
      }
    }, (error) => {
      console.warn('Firestore config snapshot listener warning:', error);
    });

    // 2. Subscribe to dedicated 'leads' collection (atomic real-time per application submission)
    const leadsColRef = collection(db, 'leads');
    const unsubscribeLeads = onSnapshot(leadsColRef, (querySnap) => {
      const deletedIds = getPersistedDeletedIds();
      const cloudLeads: LeadItem[] = [];
      querySnap.forEach((d) => {
        const item = d.data() as LeadItem;
        if (item && item.id && !deletedIds.has(item.id) && !deletedLeadIdsRef.current.has(item.id)) {
          cloudLeads.push(item);
        }
      });
      setLeads((prev) => {
        const map = new Map<string, LeadItem>();
        cloudLeads.forEach((l) => map.set(l.id, l));

        const allQueryIds = new Set(querySnap.docs.map((doc) => doc.id));
        prev.forEach((l) => {
          if (l && l.id && !deletedIds.has(l.id) && !deletedLeadIdsRef.current.has(l.id)) {
            if (!querySnap.empty && allQueryIds.size > 0 && !allQueryIds.has(l.id)) {
              return;
            }
            if (!map.has(l.id)) {
              map.set(l.id, l);
            }
          }
        });

        const merged = Array.from(map.values()).filter(
          (l) => !deletedIds.has(l.id) && !deletedLeadIdsRef.current.has(l.id)
        );
        merged.sort((a, b) => ((b.createdAt || '') > (a.createdAt || '') ? 1 : -1));
        try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(merged)); } catch {}
        return merged;
      });
    }, (err) => {
      console.warn('Firestore leads collection listener warning:', err);
    });

    return () => {
      unsubscribeConfig();
      unsubscribeLeads();
    };
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
      const cleanUpdates = sanitizeForFirestore(partialUpdates);
      await setDoc(configDocRef, {
        ...cleanUpdates,
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
  const addLead = async (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newLead: LeadItem = {
      ...leadData,
      id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: leadData.name?.trim() || '고객',
      createdAt: formattedDate,
      status: '접수',
      memo: leadData.memo || '',
      affiliateCardOption: leadData.affiliateCardOption || '미신청 (일반 납부)',
      giftAmountExpected: leadData.giftAmountExpected || 45
    };

    const deletedIds = getPersistedDeletedIds();
    if (deletedIds.has(newLead.id)) {
      deletedIds.delete(newLead.id);
      savePersistedDeletedIds(deletedIds);
    }
    deletedLeadIdsRef.current.delete(newLead.id);

    // Optimistic local state & storage update
    setLeads((prev) => {
      const updated = [newLead, ...prev.filter((l) => l.id !== newLead.id)];
      try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated)); } catch {}
      return updated;
    });

    try {
      setSyncStatus('syncing');
      const cleanLead = sanitizeForFirestore(newLead);

      // 1. Save as independent atomic document in dedicated 'leads' collection
      const leadDocRef = doc(db, 'leads', newLead.id);
      await setDoc(leadDocRef, cleanLead);

      // 2. Also update 'app_data/config' for cross-session array compatibility
      const configDocRef = doc(db, 'app_data', 'config');
      const latestDocSnap = await getDoc(configDocRef);
      let existingLeads: LeadItem[] = [];
      if (latestDocSnap.exists()) {
        const d = latestDocSnap.data();
        if (Array.isArray(d.leads)) existingLeads = d.leads;
      }
      const updatedConfigLeads = sanitizeForFirestore([cleanLead, ...existingLeads.filter((l) => l.id !== newLead.id)]);
      await setDoc(configDocRef, {
        leads: updatedConfigLeads,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSyncStatus('saved');
      setTimeout(() => setSyncStatus('idle'), 2500);
      showToast('상담 신청이 정상 접수되었습니다! 전문 상담사가 곧 연락드립니다.', 'success');
      return true;
    } catch (e: any) {
      console.error('Firestore cloud lead save error:', e);
      setSyncStatus('idle');
      // Toast notification confirms receipt even under transient offline state
      showToast('상담 신청이 접수되었습니다! (로컬 안전 보관 완료)', 'success');
      return true;
    }
  };

  const updateLead = async (id: string, updates: Partial<LeadItem>): Promise<void> => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, ...updates } : l));
      try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated)); } catch {}
      return updated;
    });

    try {
      const cleanUpdates = sanitizeForFirestore(updates);
      // Update in dedicated collection
      await setDoc(doc(db, 'leads', id), cleanUpdates, { merge: true });

      // Update in config document
      const configDocRef = doc(db, 'app_data', 'config');
      const configSnap = await getDoc(configDocRef);
      if (configSnap.exists()) {
        const d = configSnap.data();
        if (Array.isArray(d.leads)) {
          const updated = d.leads.map((l: LeadItem) => (l.id === id ? { ...l, ...cleanUpdates } : l));
          await setDoc(configDocRef, { leads: sanitizeForFirestore(updated) }, { merge: true });
        }
      }
      showToast('신청서 상태가 업데이트되었습니다.', 'success');
    } catch (e) {
      console.error('Update lead error:', e);
    }
  };

  const deleteLead = async (id: string): Promise<void> => {
    // 1. Record in persisted deleted IDs
    const deletedIds = getPersistedDeletedIds();
    deletedIds.add(id);
    savePersistedDeletedIds(deletedIds);
    deletedLeadIdsRef.current.add(id);

    // 2. Immediate local state & storage update
    setLeads((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated)); } catch {}
      return updated;
    });

    // 3. Delete in Firestore
    try {
      setSyncStatus('syncing');
      await deleteDoc(doc(db, 'leads', id));

      const configDocRef = doc(db, 'app_data', 'config');
      const configSnap = await getDoc(configDocRef);
      if (configSnap.exists()) {
        const d = configSnap.data();
        if (Array.isArray(d.leads)) {
          const updated = d.leads.filter((l: LeadItem) => l.id !== id);
          await setDoc(configDocRef, { leads: sanitizeForFirestore(updated) }, { merge: true });
        }
      }
      setSyncStatus('saved');
      setTimeout(() => setSyncStatus('idle'), 2000);
      showToast('신청 내역이 안전하게 삭제되었습니다.', 'info');
    } catch (e) {
      console.error('Delete lead error:', e);
      setSyncStatus('idle');
      showToast('신청 내역이 삭제되었습니다.', 'info');
    }
  };

  const resetSampleLeads = async (): Promise<void> => {
    try {
      localStorage.removeItem(STORAGE_KEYS.DELETED_LEADS);
    } catch {}
    deletedLeadIdsRef.current.clear();
    setLeads(defaultLeads);
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(defaultLeads));
      await persistToCloud({ leads: defaultLeads });
      for (const dl of defaultLeads) {
        await setDoc(doc(db, 'leads', dl.id), sanitizeForFirestore(dl));
      }
      showToast('기본 샘플 상담 신청 데이터가 성공적으로 복원되었습니다.', 'success');
    } catch {
      showToast('기본 샘플 데이터가 로컬에 복원되었습니다.', 'info');
    }
  };

  const refreshFromCloud = async (): Promise<void> => {
    setSyncStatus('syncing');
    try {
      const deletedIds = getPersistedDeletedIds();
      const cloudLeads: LeadItem[] = [];

      // 1. Fetch from 'leads' collection
      const leadsCol = collection(db, 'leads');
      const querySnap = await getDocs(leadsCol);
      querySnap.forEach((d) => {
        const item = d.data() as LeadItem;
        if (item && item.id && !deletedIds.has(item.id) && !deletedLeadIdsRef.current.has(item.id)) {
          cloudLeads.push(item);
        }
      });

      // 2. Fetch from config document
      const configDocRef = doc(db, 'app_data', 'config');
      const configSnap = await getDoc(configDocRef);
      if (configSnap.exists()) {
        const data = configSnap.data();
        if (data.siteSettings) setSiteSettings(data.siteSettings);
        if (Array.isArray(data.products)) setProducts(data.products);
        if (Array.isArray(data.posts)) setPosts(data.posts);
        if (Array.isArray(data.reviews)) setReviews(data.reviews);
        if (Array.isArray(data.faqs)) setFaqs(data.faqs);
        if (Array.isArray(data.leads)) {
          data.leads.forEach((l: LeadItem) => {
            if (l && l.id && !deletedIds.has(l.id) && !deletedLeadIdsRef.current.has(l.id)) {
              cloudLeads.push(l);
            }
          });
        }
      }

      // Merge and deduplicate
      const map = new Map<string, LeadItem>();
      cloudLeads.forEach((l) => map.set(l.id, l));
      const merged = Array.from(map.values()).filter(
        (l) => !deletedIds.has(l.id) && !deletedLeadIdsRef.current.has(l.id)
      );
      merged.sort((a, b) => ((b.createdAt || '') > (a.createdAt || '') ? 1 : -1));
      setLeads(merged);
      try { localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(merged)); } catch {}

      setSyncStatus('saved');
      setTimeout(() => setSyncStatus('idle'), 2500);
      showToast(`클라우드 최신 데이터와 동기화되었습니다! (총 ${merged.length}건)`, 'success');
    } catch (e: any) {
      console.error('Refresh from cloud error:', e);
      setSyncStatus('idle');
      showToast('데이터 새로고침 실패: ' + (e?.message || '네트워크 오류'), 'error');
    }
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
        syncStatus,
        refreshFromCloud,
        resetSampleLeads
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
