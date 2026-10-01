import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palette,
  Type,
  Layout,
  Sparkles,
  Check,
  Zap,
  HelpCircle,
  Newspaper,
  ThumbsUp,
  FileSpreadsheet,
  RotateCcw,
  CheckCircle2,
  Tv,
  Wifi,
  ShieldCheck,
  Gift,
  Building,
  ArrowRight,
  Plus,
  Trash2,
  List
} from 'lucide-react';
import { defaultSiteSettings } from '../../data/defaultData';

type SubSection = 'all' | 'hero' | 'why' | 'product' | 'form' | 'community' | 'brand' | 'footer';

export const AdminDesign: React.FC = () => {
  const { siteSettings, updateSiteSettings, showToast, setAdminTab } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<SubSection>('all');

  // Form State
  const [formData, setFormData] = useState({
    // Theme & Brand
    primaryColor: siteSettings.primaryColor || '#0066FF',
    siteName: siteSettings.siteName || 'KT 스카이라이프 공식 가입센터',
    siteSubtitle: siteSettings.siteSubtitle || 'KT 100% 동일품질 초고속인터넷 + UHD TV',
    topNoticeText: siteSettings.topNoticeText || 'KT 스카이라이프 공식 가입센터 단독 이벤트! 최대 48만원 당일 현금 지급 + 결합 시 월 30% 평생 할인!',
    maxGiftNotice: siteSettings.maxGiftNotice || '최대 48만원 당일 현금 지급!',

    // Hero Section
    heroBadge: siteSettings.heroBadge || 'KT 100% 동일망 공식 가입센터 특별 혜택',
    heroTitle: siteSettings.heroTitle || 'KT 스카이라이프 인터넷+TV',
    heroHighlight: siteSettings.heroHighlight || '최대 48만원 당일 현금 100% 지급',
    heroSubtitle: siteSettings.heroSubtitle || '약정 만료 후 통신비 아끼는 가장 스마트한 선택! KT 본사 동일 광케이블망과 239개 채널 UHD TV를 초특가 결합 요금으로 만나보세요.',
    heroCard1Title: siteSettings.heroCard1Title || '최대 48만원',
    heroCard1Desc: siteSettings.heroCard1Desc || '당일 현금 100% 지급',
    heroCard2Title: siteSettings.heroCard2Title || 'KT 100% 동일망',
    heroCard2Desc: siteSettings.heroCard2Desc || '초고속 끊김없는 광랜',
    heroCard3Title: siteSettings.heroCard3Title || '239개 채널 UHD',
    heroCard3Desc: siteSettings.heroCard3Desc || '안드로이드4 OTT 셋톱',
    heroCard4Title: siteSettings.heroCard4Title || '공식 파트너 인증',
    heroCard4Desc: siteSettings.heroCard4Desc || '안심 개통 및 보증제',
    heroFormBadge: siteSettings.heroFormBadge || '30초 빠른 상담신청',
    heroFormTitle: siteSettings.heroFormTitle || '전화번호만 남기시면 끝!',
    heroFormSubtitle: siteSettings.heroFormSubtitle || '전문 상담사가 10분 내로 최적의 결합 할인과 최대 사은품을 안내해 드립니다.',
    heroFormBtnText: siteSettings.heroFormBtnText || '최대 사은품 혜택 상담 신청하기',

    // Why Skylife Section
    whyBadge: siteSettings.whyBadge || '왜 KT 스카이라이프일까요?',
    whyTitle: siteSettings.whyTitle || 'KT의 품질 그대로,',
    whyHighlight: siteSettings.whyHighlight || '요금과 혜택은 압도적으로!',
    whySubtitle: siteSettings.whySubtitle || '수많은 고객님들이 약정 만료 후 KT 스카이라이프로 선택을 바꾸시는 결정적인 이유입니다.',
    whyCard1Tag: siteSettings.whyCard1Tag || '동일 품질 보증',
    whyCard1Title: siteSettings.whyCard1Title || 'KT 100% 동일한 광케이블망',
    whyCard1Sub: siteSettings.whyCard1Sub || '품질과 A/S는 본사 그대로',
    whyCard1Desc: siteSettings.whyCard1Desc || 'KT의 전국 백본망과 광대역 통신망을 100% 동일하게 사용하여 게임, 재택근무, 고화질 스트리밍에서도 끊김 없는 최상의 속도를 보장합니다.',
    whyCard2Tag: siteSettings.whyCard2Tag || '가계 통신비 절감',
    whyCard2Title: siteSettings.whyCard2Title || '타사 대비 월 30% 알뜰한 요금',
    whyCard2Sub: siteSettings.whyCard2Sub || '3년 약정 시 최대 60만원 절약',
    whyCard2Desc: siteSettings.whyCard2Desc || '불필요한 마케팅 비용을 뺀 합리적인 다이렉트 요금제로, 동일한 500M 인터넷+TV를 타사 4만원대 대신 2만원대에 이용할 수 있습니다.',
    whyCard3Tag: siteSettings.whyCard3Tag || '스마트 OTT 내장',
    whyCard3Title: siteSettings.whyCard3Title || '안드로이드 4 UHD 스마트 셋톱',
    whyCard3Sub: siteSettings.whyCard3Sub || '유튜브, 넷플릭스, 디즈니+ 완벽 지원',
    whyCard3Desc: siteSettings.whyCard3Desc || '별도의 크롬캐스트나 미러링 없이 리모컨 클릭 한 번으로 유튜브, 넷플릭스, 디즈니+, 티빙, 웨이브 등 모든 OTT를 대화면 4K 초고화질로 감상하세요.',
    whyCard4Tag: siteSettings.whyCard4Tag || '당일 전액 입금',
    whyCard4Title: siteSettings.whyCard4Title || '100% 당일 현금 사은품 보증제',
    whyCard4Sub: siteSettings.whyCard4Sub || '설치 즉시 계좌로 전액 입금',
    whyCard4Desc: siteSettings.whyCard4Desc || '본사 공식 직영 가입센터로서 상품권 분할 지급이나 지연 없이, 설치 완료 당일 약속된 사은품 전액을 고객님 명의 계좌로 즉시 입금해 드립니다.',

    // Product Section
    productSecBadge: siteSettings.productSecBadge || 'KT SKYLIFE 정직한 요금제',
    productSecTitle: siteSettings.productSecTitle || '내게 딱 맞는 상품 찾고',
    productSecHighlight: siteSettings.productSecHighlight || '최대 사은품',
    productSecTitleSuffix: siteSettings.productSecTitleSuffix || '받기',
    productSecSubtitle: siteSettings.productSecSubtitle || 'KT 100% 동일망 인터넷과 239개 채널 UHD TV를 결합하여 매월 통신비를 아끼고 당일 현금 혜택까지 누리세요.',

    // Form Section
    collectCustomerName: siteSettings.collectCustomerName ?? false,
    formProductSelectLabel: siteSettings.formProductSelectLabel || '희망 상품 선택',
    formProductOptions: siteSettings.formProductOptions || [
      '인터넷 500M + Sky All (239채널) (월 29,700원 / 사은품 최대 45만원)',
      '인터넷 100M + Sky All (239채널) (월 24,200원 / 사은품 최대 38만원)',
      '인터넷 1G + Sky All (239채널) (월 34,100원 / 사은품 최대 48만원)',
      '인터넷 단독 500M (월 22,000원 / 사은품 최대 18만원)',
      '인터넷 단독 100M (월 17,600원 / 사은품 최대 12만원)',
      '인터넷 단독 1G (월 27,500원 / 사은품 최대 20만원)',
      '상담 후 맞춤 상품 추천 희망 (전문 상담원 맞춤설계)'
    ],
    formSecBadge: siteSettings.formSecBadge || '1:1 맞춤 안심 상담',
    formSecTitle: siteSettings.formSecTitle || 'KT 스카이라이프',
    formSecHighlight: siteSettings.formSecHighlight || '온라인 상담 신청서',
    formSecSubtitle: siteSettings.formSecSubtitle || '간단한 정보를 남겨주시면 담당 전문 플래너가 가장 높은 혜택과 맞춤 사은품을 안내해 드립니다.',
    formSubmitBtnText: siteSettings.formSubmitBtnText || '최대 현금 사은품 상담 신청 완료하기',

    // Review / FAQ / Board / Ticker
    reviewSecBadge: siteSettings.reviewSecBadge || '고객 감동 리얼 후기',
    reviewSecTitle: siteSettings.reviewSecTitle || '개통 고객님들이 직접 증명하는',
    reviewSecHighlight: siteSettings.reviewSecHighlight || '만족도 99.8%',
    reviewSecSubtitle: siteSettings.reviewSecSubtitle || '사은품 당일 지급 완료 인증과 설치 사진을 실시간으로 확인해보세요.',
    faqSecBadge: siteSettings.faqSecBadge || '궁금증 해결',
    faqSecTitle: siteSettings.faqSecTitle || '자주 묻는 질문 (FAQ)',
    faqSecSubtitle: siteSettings.faqSecSubtitle || '가입 전 가장 많이 문의주시는 질문들을 모았습니다. 추가 문의는 언제든 전화상담을 이용해주세요.',
    boardSecBadge: siteSettings.boardSecBadge || '소식 & 프로모션',
    boardSecTitle: siteSettings.boardSecTitle || '공지사항 및',
    boardSecHighlight: siteSettings.boardSecHighlight || '이달의 이벤트',
    boardSecSubtitle: siteSettings.boardSecSubtitle || '스카이라이프의 최신 혜택 정보와 프로모션 이벤트를 실시간으로 전해드립니다.',
    tickerTitle: siteSettings.tickerTitle || '실시간 사은품 지급 현황',

    // Footer Text
    footerDescLine1: siteSettings.footerDescLine1 || '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터',
    footerDescLine2: siteSettings.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.',
    footerBadge1: siteSettings.footerBadge1 || '본사 공식 인증 대리점',
    footerBadge2: siteSettings.footerBadge2 || '100% 당일 사은품 지급 보증',
    footerNoticeText: siteSettings.footerNoticeText || '[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다.',
    footerCopyright: siteSettings.footerCopyright || '© 2026 KT skylife Partner. All rights reserved.',
  });

  useEffect(() => {
    // Keep local form state synced if external cloud update happens
    setFormData((prev) => ({
      ...prev,
      ...siteSettings,
      formProductOptions: siteSettings.formProductOptions || prev.formProductOptions
    }));
  }, [siteSettings]);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleUpdateProductOption = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.formProductOptions || [])];
      updated[index] = val;
      return { ...prev, formProductOptions: updated };
    });
  };

  const handleAddProductOption = () => {
    setFormData((prev) => ({
      ...prev,
      formProductOptions: [...(prev.formProductOptions || []), '새로운 상품 옵션 (월 요금 / 사은품 혜택)']
    }));
  };

  const handleDeleteProductOption = (index: number) => {
    setFormData((prev) => {
      const updated = (prev.formProductOptions || []).filter((_, i) => i !== index);
      return { ...prev, formProductOptions: updated };
    });
  };

  const handleResetProductOptions = () => {
    setFormData((prev) => ({
      ...prev,
      formProductOptions: [
        '인터넷 500M + Sky All (239채널) (월 29,700원 / 사은품 최대 45만원)',
        '인터넷 100M + Sky All (239채널) (월 24,200원 / 사은품 최대 38만원)',
        '인터넷 1G + Sky All (239채널) (월 34,100원 / 사은품 최대 48만원)',
        '인터넷 단독 500M (월 22,000원 / 사은품 최대 18만원)',
        '인터넷 단독 100M (월 17,600원 / 사은품 최대 12만원)',
        '인터넷 단독 1G (월 27,500원 / 사은품 최대 20만원)',
        '상담 후 맞춤 상품 추천 희망 (전문 상담원 맞춤설계)'
      ]
    }));
    showToast('희망 상품 드롭다운 목록이 기본 항목으로 복원되었습니다.', 'info');
  };

  const colorPresets = [
    { name: 'KT 시그니처 블루', hex: '#0066FF', bg: 'bg-[#0066FF]' },
    { name: '스카이 블루', hex: '#0284C7', bg: 'bg-[#0284C7]' },
    { name: '로열 딥블루', hex: '#1E40AF', bg: 'bg-[#1E40AF]' },
    { name: '비비드 블루', hex: '#2563EB', bg: 'bg-[#2563EB]' },
    { name: '청량 아쿠아 블루', hex: '#0EA5E9', bg: 'bg-[#0EA5E9]' },
  ];

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    showToast('메인화면 문구 및 디자인 설정이 저장되었습니다.', 'success');
  };

  const handleResetToDefault = () => {
    if (window.confirm('모든 문구 설정을 초기 기본 문구로 복원하시겠습니까?')) {
      const resetData = {
        ...formData,
        ...defaultSiteSettings
      };
      setFormData(resetData);
      updateSiteSettings(resetData);
      showToast('기본 문구로 초기화되었습니다.', 'info');
    }
  };

  const subTabs: { id: SubSection; label: string; icon: any }[] = [
    { id: 'all', label: '전체 문구 한눈에 보기', icon: Layout },
    { id: 'hero', label: '1. 메인 히어로 & 배너', icon: Zap },
    { id: 'why', label: '2. 4대 특장점 섹션', icon: Sparkles },
    { id: 'product', label: '3. 요금제 비교 섹션', icon: FileSpreadsheet },
    { id: 'form', label: '4. 온라인 상담 신청서', icon: Type },
    { id: 'community', label: '5. 후기 / FAQ / 공지', icon: Newspaper },
    { id: 'brand', label: '6. 브랜드 & 테마 컬러', icon: Palette },
    { id: 'footer', label: '7. 푸터(맨 밑) 문구', icon: ShieldCheck },
  ];

  const showHero = activeSubTab === 'all' || activeSubTab === 'hero';
  const showWhy = activeSubTab === 'all' || activeSubTab === 'why';
  const showProduct = activeSubTab === 'all' || activeSubTab === 'product';
  const showForm = activeSubTab === 'all' || activeSubTab === 'form';
  const showCommunity = activeSubTab === 'all' || activeSubTab === 'community';
  const showBrand = activeSubTab === 'all' || activeSubTab === 'brand';
  const showFooter = activeSubTab === 'all' || activeSubTab === 'footer';

  return (
    <form onSubmit={handleSaveAll} className="space-y-6 max-w-5xl">
      {/* Top Action Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              메인화면 텍스트 & 문구 관리
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            홈페이지 메인 화면의 모든 타이틀, 카드 설명, 뱃지, 버튼 텍스트를 실시간으로 직접 수정할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            기본값 복원
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            문구 변경사항 저장
          </button>
        </div>
      </div>

      {/* PROMINENT TOP HERO 4 MINI BENEFIT CARDS (최대 48만원, KT 100% 동일망 등) */}
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white shadow-lg border border-blue-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center font-black">
              <Gift className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 text-[10px] font-black border border-blue-400/30">
                  메인 화면 최상단 노출
                </span>
                <h3 className="font-black text-white text-base">
                  메인 히어로 4대 혜택 미니 카드 문구 수정
                </h3>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                '최대 48만원', 'KT 100% 동일망', '239개 채널 UHD', '공식 파트너 인증' 4개 카드의 제목과 설명을 바로 수정할 수 있습니다.
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-black shrink-0 transition-colors shadow-md flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Check className="w-4 h-4" />
            4대 카드 문구 저장
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-blue-300 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-blue-400" /> 카드 1 (사은품)
              </span>
              <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full font-bold">1번째</span>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">큰 제목 (예: 최대 48만원)</label>
              <input
                type="text"
                placeholder="최대 48만원"
                value={formData.heroCard1Title}
                onChange={(e) => handleChange('heroCard1Title', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-white/20 bg-white/15 focus:bg-white focus:text-slate-900 text-white text-xs font-black placeholder:text-slate-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">하단 설명 (예: 당일 현금 100% 지급)</label>
              <input
                type="text"
                placeholder="당일 현금 100% 지급"
                value={formData.heroCard1Desc}
                onChange={(e) => handleChange('heroCard1Desc', e.target.value)}
                className="w-full p-2 rounded-xl border border-white/20 bg-white/10 focus:bg-white focus:text-slate-900 text-white text-[11px] font-medium placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-blue-300 flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-blue-400" /> 카드 2 (품질/통신망)
              </span>
              <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full font-bold">2번째</span>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">큰 제목 (예: KT 100% 동일망)</label>
              <input
                type="text"
                placeholder="KT 100% 동일망"
                value={formData.heroCard2Title}
                onChange={(e) => handleChange('heroCard2Title', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-white/20 bg-white/15 focus:bg-white focus:text-slate-900 text-white text-xs font-black placeholder:text-slate-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">하단 설명 (예: 초고속 끊김없는 광랜)</label>
              <input
                type="text"
                placeholder="초고속 끊김없는 광랜"
                value={formData.heroCard2Desc}
                onChange={(e) => handleChange('heroCard2Desc', e.target.value)}
                className="w-full p-2 rounded-xl border border-white/20 bg-white/10 focus:bg-white focus:text-slate-900 text-white text-[11px] font-medium placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-blue-300 flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5 text-blue-400" /> 카드 3 (TV/OTT)
              </span>
              <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full font-bold">3번째</span>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">큰 제목 (예: 239개 채널 UHD)</label>
              <input
                type="text"
                placeholder="239개 채널 UHD"
                value={formData.heroCard3Title}
                onChange={(e) => handleChange('heroCard3Title', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-white/20 bg-white/15 focus:bg-white focus:text-slate-900 text-white text-xs font-black placeholder:text-slate-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">하단 설명 (예: 안드로이드4 OTT 셋톱)</label>
              <input
                type="text"
                placeholder="안드로이드4 OTT 셋톱"
                value={formData.heroCard3Desc}
                onChange={(e) => handleChange('heroCard3Desc', e.target.value)}
                className="w-full p-2 rounded-xl border border-white/20 bg-white/10 focus:bg-white focus:text-slate-900 text-white text-[11px] font-medium placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 카드 4 (신뢰/보증)
              </span>
              <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full font-bold">4번째</span>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">큰 제목 (예: 공식 파트너 인증)</label>
              <input
                type="text"
                placeholder="공식 파트너 인증"
                value={formData.heroCard4Title}
                onChange={(e) => handleChange('heroCard4Title', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-white/20 bg-white/15 focus:bg-white focus:text-slate-900 text-white text-xs font-black placeholder:text-slate-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">하단 설명 (예: 안심 개통 및 보증제)</label>
              <input
                type="text"
                placeholder="안심 개통 및 보증제"
                value={formData.heroCard4Desc}
                onChange={(e) => handleChange('heroCard4Desc', e.target.value)}
                className="w-full p-2 rounded-xl border border-white/20 bg-white/10 focus:bg-white focus:text-slate-900 text-white text-[11px] font-medium placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sub Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Main Hero & Top Bar Copy */}
      {showHero && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">1. 메인 히어로 배너 & 상단 띠배너 문구</h3>
                <p className="text-xs text-slate-500">방문자가 가장 먼저 보게 되는 메인 헤드라인과 4대 혜택 카드 문구입니다.</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              최상단 노출
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                최상단 혜택 띠배너 공지 문구
              </label>
              <input
                type="text"
                value={formData.topNoticeText}
                onChange={(e) => handleChange('topNoticeText', e.target.value)}
                className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">히어로 상단 뱃지 문구</label>
                <input
                  type="text"
                  value={formData.heroBadge}
                  onChange={(e) => handleChange('heroBadge', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">하단 플로팅 바 사은품 뱃지 텍스트</label>
                <input
                  type="text"
                  value={formData.maxGiftNotice}
                  onChange={(e) => handleChange('maxGiftNotice', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium text-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">메인 큰 제목 (첫째 줄)</label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white font-black text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                강조 포인트 제목 (둘째 줄 <span className="text-blue-600">파란색 강조</span>)
              </label>
              <input
                type="text"
                value={formData.heroHighlight}
                onChange={(e) => handleChange('heroHighlight', e.target.value)}
                className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white font-black text-sm text-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">메인 부가 설명 문구 (서브 타이틀)</label>
              <textarea
                rows={2}
                value={formData.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
              />
            </div>

            {/* Hero 4 Mini Cards */}
            <div className="pt-2">
              <label className="block font-black text-slate-800 text-xs mb-2">
                메인 히어로 4대 혜택 미니 카드 문구
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Card 1 */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-blue-600">카드 1 (현금)</span>
                  <input
                    type="text"
                    placeholder="제목"
                    value={formData.heroCard1Title}
                    onChange={(e) => handleChange('heroCard1Title', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="설명"
                    value={formData.heroCard1Desc}
                    onChange={(e) => handleChange('heroCard1Desc', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-[11px] text-slate-600"
                  />
                </div>

                {/* Card 2 */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-blue-600">카드 2 (동일망)</span>
                  <input
                    type="text"
                    placeholder="제목"
                    value={formData.heroCard2Title}
                    onChange={(e) => handleChange('heroCard2Title', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="설명"
                    value={formData.heroCard2Desc}
                    onChange={(e) => handleChange('heroCard2Desc', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-[11px] text-slate-600"
                  />
                </div>

                {/* Card 3 */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-blue-600">카드 3 (UHD TV)</span>
                  <input
                    type="text"
                    placeholder="제목"
                    value={formData.heroCard3Title}
                    onChange={(e) => handleChange('heroCard3Title', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="설명"
                    value={formData.heroCard3Desc}
                    onChange={(e) => handleChange('heroCard3Desc', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-[11px] text-slate-600"
                  />
                </div>

                {/* Card 4 */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-blue-600">카드 4 (공식인증)</span>
                  <input
                    type="text"
                    placeholder="제목"
                    value={formData.heroCard4Title}
                    onChange={(e) => handleChange('heroCard4Title', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="설명"
                    value={formData.heroCard4Desc}
                    onChange={(e) => handleChange('heroCard4Desc', e.target.value)}
                    className="w-full p-1.5 rounded-lg border bg-white text-[11px] text-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Quick Apply Card in Hero */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block font-black text-slate-800 text-xs mb-2">
                히어로 우측 빠른 간편신청 카드 문구
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-500">상단 뱃지</span>
                  <input
                    type="text"
                    value={formData.heroFormBadge}
                    onChange={(e) => handleChange('heroFormBadge', e.target.value)}
                    className="w-full p-2 rounded-lg border bg-slate-50 focus:bg-white text-xs font-medium"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500">카드 헤드라인</span>
                  <input
                    type="text"
                    value={formData.heroFormTitle}
                    onChange={(e) => handleChange('heroFormTitle', e.target.value)}
                    className="w-full p-2 rounded-lg border bg-slate-50 focus:bg-white text-xs font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500">안내 문구</span>
                  <input
                    type="text"
                    value={formData.heroFormSubtitle}
                    onChange={(e) => handleChange('heroFormSubtitle', e.target.value)}
                    className="w-full p-2 rounded-lg border bg-slate-50 focus:bg-white text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500">신청 버튼 텍스트</span>
                  <input
                    type="text"
                    value={formData.heroFormBtnText}
                    onChange={(e) => handleChange('heroFormBtnText', e.target.value)}
                    className="w-full p-2 rounded-lg border bg-slate-50 focus:bg-white text-xs font-black text-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Why Skylife (4 Main Features) */}
      {showWhy && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">2. '왜 KT 스카이라이프일까요?' 4대 특장점 섹션 문구</h3>
                <p className="text-xs text-slate-500">고객이 전환을 결정하는 핵심 4대 신뢰 포인트 및 상세 설명을 수정합니다.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">섹션 뱃지</label>
                <input
                  type="text"
                  value={formData.whyBadge}
                  onChange={(e) => handleChange('whyBadge', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">섹션 큰 제목 앞부분</label>
                <input
                  type="text"
                  value={formData.whyTitle}
                  onChange={(e) => handleChange('whyTitle', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">강조 타이틀 (<span className="text-blue-600">파란색</span>)</label>
                <input
                  type="text"
                  value={formData.whyHighlight}
                  onChange={(e) => handleChange('whyHighlight', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">섹션 부가 설명 문구</label>
              <textarea
                rows={2}
                value={formData.whySubtitle}
                onChange={(e) => handleChange('whySubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
              />
            </div>

            {/* 4 Feature Detail Cards */}
            <div className="space-y-4 pt-2">
              <label className="block font-black text-slate-800 text-xs">4대 특장점 카드별 상세 내용</label>

              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700">특장점 1. [동일 광케이블망]</span>
                  <input
                    type="text"
                    placeholder="태그 (예: 동일 품질 보증)"
                    value={formData.whyCard1Tag}
                    onChange={(e) => handleChange('whyCard1Tag', e.target.value)}
                    className="p-1 px-2 rounded border bg-white text-[11px] font-bold text-blue-600 w-36"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="카드 제목"
                    value={formData.whyCard1Title}
                    onChange={(e) => handleChange('whyCard1Title', e.target.value)}
                    className="p-2 rounded-lg border bg-white font-bold text-xs"
                  />
                  <input
                    type="text"
                    placeholder="부제목"
                    value={formData.whyCard1Sub}
                    onChange={(e) => handleChange('whyCard1Sub', e.target.value)}
                    className="p-2 rounded-lg border bg-white text-xs text-blue-600 font-semibold"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="상세 설명"
                  value={formData.whyCard1Desc}
                  onChange={(e) => handleChange('whyCard1Desc', e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white text-xs resize-none"
                />
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700">특장점 2. [알뜰한 요금 / 가계절약]</span>
                  <input
                    type="text"
                    placeholder="태그"
                    value={formData.whyCard2Tag}
                    onChange={(e) => handleChange('whyCard2Tag', e.target.value)}
                    className="p-1 px-2 rounded border bg-white text-[11px] font-bold text-blue-600 w-36"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="카드 제목"
                    value={formData.whyCard2Title}
                    onChange={(e) => handleChange('whyCard2Title', e.target.value)}
                    className="p-2 rounded-lg border bg-white font-bold text-xs"
                  />
                  <input
                    type="text"
                    placeholder="부제목"
                    value={formData.whyCard2Sub}
                    onChange={(e) => handleChange('whyCard2Sub', e.target.value)}
                    className="p-2 rounded-lg border bg-white text-xs text-blue-600 font-semibold"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="상세 설명"
                  value={formData.whyCard2Desc}
                  onChange={(e) => handleChange('whyCard2Desc', e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white text-xs resize-none"
                />
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700">특장점 3. [안드로이드 OTT 셋톱]</span>
                  <input
                    type="text"
                    placeholder="태그"
                    value={formData.whyCard3Tag}
                    onChange={(e) => handleChange('whyCard3Tag', e.target.value)}
                    className="p-1 px-2 rounded border bg-white text-[11px] font-bold text-blue-600 w-36"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="카드 제목"
                    value={formData.whyCard3Title}
                    onChange={(e) => handleChange('whyCard3Title', e.target.value)}
                    className="p-2 rounded-lg border bg-white font-bold text-xs"
                  />
                  <input
                    type="text"
                    placeholder="부제목"
                    value={formData.whyCard3Sub}
                    onChange={(e) => handleChange('whyCard3Sub', e.target.value)}
                    className="p-2 rounded-lg border bg-white text-xs text-blue-600 font-semibold"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="상세 설명"
                  value={formData.whyCard3Desc}
                  onChange={(e) => handleChange('whyCard3Desc', e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white text-xs resize-none"
                />
              </div>

              {/* Card 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700">특장점 4. [당일 현금 사은품 보증제]</span>
                  <input
                    type="text"
                    placeholder="태그"
                    value={formData.whyCard4Tag}
                    onChange={(e) => handleChange('whyCard4Tag', e.target.value)}
                    className="p-1 px-2 rounded border bg-white text-[11px] font-bold text-blue-600 w-36"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="카드 제목"
                    value={formData.whyCard4Title}
                    onChange={(e) => handleChange('whyCard4Title', e.target.value)}
                    className="p-2 rounded-lg border bg-white font-bold text-xs"
                  />
                  <input
                    type="text"
                    placeholder="부제목"
                    value={formData.whyCard4Sub}
                    onChange={(e) => handleChange('whyCard4Sub', e.target.value)}
                    className="p-2 rounded-lg border bg-white text-xs text-blue-600 font-semibold"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="상세 설명"
                  value={formData.whyCard4Desc}
                  onChange={(e) => handleChange('whyCard4Desc', e.target.value)}
                  className="w-full p-2 rounded-lg border bg-white text-xs resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Product Comparison Section */}
      {showProduct && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">3. 요금제 & 혜택 비교 섹션 헤더 문구</h3>
                <p className="text-xs text-slate-500">인터넷/TV 요금제 카드가 나열되는 상품 목록 영역의 헤드라인을 설정합니다.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">상단 뱃지 텍스트</label>
                <input
                  type="text"
                  value={formData.productSecBadge}
                  onChange={(e) => handleChange('productSecBadge', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">제목 접미사 (예: '받기')</label>
                <input
                  type="text"
                  value={formData.productSecTitleSuffix}
                  onChange={(e) => handleChange('productSecTitleSuffix', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">큰 제목 앞부분</label>
                <input
                  type="text"
                  value={formData.productSecTitle}
                  onChange={(e) => handleChange('productSecTitle', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">강조 타이틀 (<span className="text-blue-600">파란색</span>)</label>
                <input
                  type="text"
                  value={formData.productSecHighlight}
                  onChange={(e) => handleChange('productSecHighlight', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">섹션 설명 문구</label>
              <textarea
                rows={2}
                value={formData.productSecSubtitle}
                onChange={(e) => handleChange('productSecSubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Consultation Form Section */}
      {showForm && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">4. 온라인 상담 신청서 섹션 문구</h3>
                <p className="text-xs text-slate-500">고객이 성명과 연락처를 입력하는 메인 신청서 폼 상단의 타이틀 및 버튼 문구입니다.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Customer Name Field Toggle Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 border-2 border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${formData.collectCustomerName ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {formData.collectCustomerName ? '고객명 필드 활성화됨' : '고객명 필드 숨김 (간편 접수 모드)'}
                  </span>
                  <span className="font-black text-slate-900 text-sm">상담 신청서 고객명(성함) 입력란 설정</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {formData.collectCustomerName
                    ? '현재 고객이 신청 시 성함을 필수로 입력해야 합니다. (이름 수집 ON)'
                    : '현재 고객명 입력란이 숨김 처리되어 있어, 고객이 전화번호만으로 즉시 신청할 수 있습니다. (전환율 극대화 OFF)'}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const nextVal = !formData.collectCustomerName;
                    handleChange('collectCustomerName', nextVal);
                    updateSiteSettings({ collectCustomerName: nextVal });
                    showToast(nextVal ? '고객명 입력란이 활성화되었습니다.' : '고객명 입력란이 숨김 처리되었습니다. (전화번호만 접수)', 'success');
                  }}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all shadow-sm flex items-center gap-2 ${
                    formData.collectCustomerName
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/25'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${formData.collectCustomerName ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                  {formData.collectCustomerName ? '고객명 삭제(숨김)하기' : '고객명 입력란 추가(노출)하기'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">폼 상단 뱃지</label>
                <input
                  type="text"
                  value={formData.formSecBadge}
                  onChange={(e) => handleChange('formSecBadge', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">신청서 큰 제목 앞부분</label>
                <input
                  type="text"
                  value={formData.formSecTitle}
                  onChange={(e) => handleChange('formSecTitle', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">강조 타이틀 (<span className="text-blue-600">파란색</span>)</label>
                <input
                  type="text"
                  value={formData.formSecHighlight}
                  onChange={(e) => handleChange('formSecHighlight', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">신청서 설명 문구</label>
              <textarea
                rows={2}
                value={formData.formSecSubtitle}
                onChange={(e) => handleChange('formSecSubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                희망 상품 선택 드롭다운 라벨 문구 (글자 수정)
              </label>
              <input
                type="text"
                value={formData.formProductSelectLabel}
                onChange={(e) => handleChange('formProductSelectLabel', e.target.value)}
                placeholder="예: 희망 상품 선택 (또는 희망 가입 상품 선택)"
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                상담 신청서 및 메인 퀵신청 폼의 상품 선택 드롭다운 상단 라벨에 반영됩니다. (예: '희망 상품 선택', '희망 가입 상품 선택', '가입 희망 요금제 선택' 등)
              </p>
            </div>

            {/* Product Dropdown Options Editor */}
            <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <List className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="block font-black text-slate-900 text-xs sm:text-sm">
                      희망 상품 드롭다운 선택 항목 글자 수정 (선택지 목록)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      고객이 상품 선택을 클릭했을 때 펼쳐지는 드롭다운의 각 옵션 문구를 직접 수정, 추가, 삭제할 수 있습니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetProductOptions}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-bold transition-colors"
                  >
                    기본값 복원
                  </button>
                  <button
                    type="button"
                    onClick={handleAddProductOption}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>항목 추가</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {formData.formProductOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 text-center text-xs font-black text-slate-400 shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleUpdateProductOption(idx, e.target.value)}
                      placeholder={`상품 선택지 ${idx + 1} 문구 입력`}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteProductOption(idx)}
                      disabled={formData.formProductOptions.length <= 1}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors shrink-0"
                      title="항목 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                <p className="text-[11px] text-slate-500">
                  * 각 항목의 글자를 자유롭게 수정한 후 [드롭다운 목록 즉시 저장]을 누르면 즉시 사이트에 적용됩니다.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ formProductOptions: formData.formProductOptions });
                    showToast('희망 상품 드롭다운 목록이 성공적으로 저장되었습니다.', 'success');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
                >
                  드롭다운 목록 즉시 저장
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">신청서 제출 버튼 문구</label>
              <input
                type="text"
                value={formData.formSubmitBtnText}
                onChange={(e) => handleChange('formSubmitBtnText', e.target.value)}
                className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white font-black text-blue-600 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Community: Reviews / FAQ / Board / Ticker */}
      {showCommunity && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
                <Newspaper className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">5. 고객후기 / FAQ / 공지게시판 / 실시간 바 문구</h3>
                <p className="text-xs text-slate-500">실제 고객후기, 자주묻는질문, 공지사항, 실시간 롤링바의 헤더 텍스트를 수정합니다.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-xs">
            {/* Ticker Title */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
              <span className="font-bold text-sky-400 text-xs flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" /> 실시간 롤링 현황 바 타이틀
              </span>
              <input
                type="text"
                value={formData.tickerTitle}
                onChange={(e) => handleChange('tickerTitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white font-bold text-xs"
              />
            </div>

            {/* Review Section Copy */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-blue-600" /> 고객 후기 섹션 헤더
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="뱃지"
                  value={formData.reviewSecBadge}
                  onChange={(e) => handleChange('reviewSecBadge', e.target.value)}
                  className="p-2 rounded-lg border bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="제목 앞부분"
                  value={formData.reviewSecTitle}
                  onChange={(e) => handleChange('reviewSecTitle', e.target.value)}
                  className="p-2 rounded-lg border bg-white font-bold text-xs"
                />
                <input
                  type="text"
                  placeholder="강조 타이틀"
                  value={formData.reviewSecHighlight}
                  onChange={(e) => handleChange('reviewSecHighlight', e.target.value)}
                  className="p-2 rounded-lg border bg-white font-bold text-xs text-blue-600"
                />
              </div>
              <textarea
                rows={2}
                placeholder="설명 문구"
                value={formData.reviewSecSubtitle}
                onChange={(e) => handleChange('reviewSecSubtitle', e.target.value)}
                className="w-full p-2 rounded-lg border bg-white text-xs resize-none"
              />
            </div>

            {/* FAQ Section Copy */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> 자주 묻는 질문 (FAQ) 섹션 헤더
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="뱃지"
                  value={formData.faqSecBadge}
                  onChange={(e) => handleChange('faqSecBadge', e.target.value)}
                  className="p-2 rounded-lg border bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="제목"
                  value={formData.faqSecTitle}
                  onChange={(e) => handleChange('faqSecTitle', e.target.value)}
                  className="p-2 rounded-lg border bg-white font-bold text-xs"
                />
              </div>
              <textarea
                rows={2}
                placeholder="설명 문구"
                value={formData.faqSecSubtitle}
                onChange={(e) => handleChange('faqSecSubtitle', e.target.value)}
                className="w-full p-2 rounded-lg border bg-white text-xs resize-none"
              />
            </div>

            {/* Board Section Copy */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5 text-blue-600" /> 공지사항 & 이벤트 섹션 헤더
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="뱃지"
                  value={formData.boardSecBadge}
                  onChange={(e) => handleChange('boardSecBadge', e.target.value)}
                  className="p-2 rounded-lg border bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="제목 앞부분"
                  value={formData.boardSecTitle}
                  onChange={(e) => handleChange('boardSecTitle', e.target.value)}
                  className="p-2 rounded-lg border bg-white font-bold text-xs"
                />
                <input
                  type="text"
                  placeholder="강조 타이틀"
                  value={formData.boardSecHighlight}
                  onChange={(e) => handleChange('boardSecHighlight', e.target.value)}
                  className="p-2 rounded-lg border bg-white font-bold text-xs text-blue-600"
                />
              </div>
              <textarea
                rows={2}
                placeholder="설명 문구"
                value={formData.boardSecSubtitle}
                onChange={(e) => handleChange('boardSecSubtitle', e.target.value)}
                className="w-full p-2 rounded-lg border bg-white text-xs resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. Brand & Color Theme */}
      {showBrand && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">6. 브랜드 포인트 블루 컬러 & 사이트 명칭</h3>
                <p className="text-xs text-slate-500">웹사이트 브랜드 컬러 테마와 로고 하단 슬로건을 변경합니다.</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 text-xs">
            {/* Color Presets */}
            <div>
              <label className="block font-bold text-slate-700 mb-2">포인트 블루 컬러 프리셋</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {colorPresets.map((col) => (
                  <button
                    key={col.hex}
                    type="button"
                    onClick={() => handleChange('primaryColor', col.hex)}
                    className={`p-3 rounded-2xl border text-left flex flex-col items-center gap-2 transition-all ${
                      formData.primaryColor === col.hex
                        ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/40 font-bold'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${col.bg} shadow-sm flex items-center justify-center text-white`}>
                      {formData.primaryColor === col.hex && <Check className="w-4 h-4" />}
                    </div>
                    <span className="text-[11px] text-slate-700 text-center leading-tight">{col.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-3">
                <span className="font-bold text-slate-600">직접 Hex 코드 입력:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="px-3 py-1 rounded-lg border text-xs font-mono w-28 bg-slate-50"
                  />
                </div>
              </div>
            </div>

            {/* Site Name & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-bold text-slate-700 mb-1">웹사이트 대표명</label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">로고 하단 슬로건</label>
                <input
                  type="text"
                  value={formData.siteSubtitle}
                  onChange={(e) => handleChange('siteSubtitle', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Footer Text Section */}
      {showFooter && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  푸터 (하단 'skylife 공식가입센터' 밑 문구 관리)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  홈페이지 맨 아래(푸터) 'KT skylife 공식가입센터' 로고 바로 밑에 표시되는 설명 문구와 뱃지, 안내사항을 자유롭게 수정할 수 있습니다.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hidden sm:inline-block">
              화면 최하단 푸터
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Direct Jump Banner to Comprehensive Footer Legal Editor */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-blue-900">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-blue-950">
                    사업자등록번호, 대표자명, 상호, 소재지 등 모든 법적 텍스트 수정하기
                  </div>
                  <div className="text-[11px] text-blue-700">
                    새로 개설된 [푸터 사업자·법적 정보] 탭에서 라벨과 내용 전체를 실시간 라이브 미리보기와 함께 수정하실 수 있습니다.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAdminTab('footer')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>법적 정보 전체 편집기 바로가기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live Preview Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2.5">
              <div className="text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                실시간 푸터 미리보기
              </div>
              <div className="pl-2 border-l-2 border-blue-500 space-y-1">
                <div className="text-sm font-black text-white">
                  KT <span className="text-blue-400">skylife</span> 공식가입센터
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {formData.footerDescLine1 || formData.siteSubtitle}
                  <br />
                  {formData.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.'}
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-300">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    ✓ {formData.footerBadge1 || '본사 공식 인증 대리점'}
                  </span>
                  <span>•</span>
                  <span className="text-yellow-400 font-bold">
                    {formData.footerBadge2 || '100% 당일 사은품 지급 보증'}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Desc Lines */}
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  skylife 공식가입센터 바로 밑 첫 번째 줄 문구
                </label>
                <input
                  type="text"
                  value={formData.footerDescLine1}
                  onChange={(e) => handleChange('footerDescLine1', e.target.value)}
                  placeholder="인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터"
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  기본값: 인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  skylife 공식가입센터 바로 밑 두 번째 줄 문구
                </label>
                <input
                  type="text"
                  value={formData.footerDescLine2}
                  onChange={(e) => handleChange('footerDescLine2', e.target.value)}
                  placeholder="KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너."
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  기본값: KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  하단 인증 뱃지 1 (예: 본사 공식 인증 대리점)
                </label>
                <input
                  type="text"
                  value={formData.footerBadge1}
                  onChange={(e) => handleChange('footerBadge1', e.target.value)}
                  placeholder="본사 공식 인증 대리점"
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  하단 인증 뱃지 2 (예: 100% 당일 사은품 지급 보증)
                </label>
                <input
                  type="text"
                  value={formData.footerBadge2}
                  onChange={(e) => handleChange('footerBadge2', e.target.value)}
                  placeholder="100% 당일 사은품 지급 보증"
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Notice & Copyright */}
            <div className="grid grid-cols-1 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  하단 공식 대리점 안내 고지문구
                </label>
                <textarea
                  rows={2}
                  value={formData.footerNoticeText}
                  onChange={(e) => handleChange('footerNoticeText', e.target.value)}
                  placeholder="[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다."
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  저작권 표시 문구 (Copyright)
                </label>
                <input
                  type="text"
                  value={formData.footerCopyright}
                  onChange={(e) => handleChange('footerCopyright', e.target.value)}
                  placeholder="© 2026 KT skylife Partner. All rights reserved."
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Save Floating Bar */}
      <div className="sticky bottom-6 z-20 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline text-slate-300">문구를 수정한 후 우측 저장 버튼을 누르면 클라우드에 영구 저장됩니다.</span>
          <span className="sm:hidden text-slate-300">수정 후 저장을 눌러주세요.</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            초기화
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/40 transition-transform active:scale-95"
          >
            전체 저장하기
          </button>
        </div>
      </div>
    </form>
  );
};
