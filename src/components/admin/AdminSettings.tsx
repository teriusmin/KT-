import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Share2,
  Phone,
  Building,
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertTriangle,
  Gift,
  Wifi,
  Tv,
  ShieldCheck
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    resetToDefaultData,
    exportDataJson,
    importDataJson,
    showToast
  } = useApp();

  const [seoTitle, setSeoTitle] = useState(siteSettings.seoTitle);
  const [seoDescription, setSeoDescription] = useState(siteSettings.seoDescription);
  const [seoKeywords, setSeoKeywords] = useState(siteSettings.seoKeywords);
  const [ogImageUrl, setOgImageUrl] = useState(siteSettings.ogImageUrl);

  // 4 Mini Benefit Cards in Hero
  const [heroCard1Title, setHeroCard1Title] = useState(siteSettings.heroCard1Title || '최대 48만원');
  const [heroCard1Desc, setHeroCard1Desc] = useState(siteSettings.heroCard1Desc || '당일 현금 100% 지급');
  const [heroCard2Title, setHeroCard2Title] = useState(siteSettings.heroCard2Title || 'KT 100% 동일망');
  const [heroCard2Desc, setHeroCard2Desc] = useState(siteSettings.heroCard2Desc || '초고속 끊김없는 광랜');
  const [heroCard3Title, setHeroCard3Title] = useState(siteSettings.heroCard3Title || '239개 채널 UHD');
  const [heroCard3Desc, setHeroCard3Desc] = useState(siteSettings.heroCard3Desc || '안드로이드4 OTT 셋톱');
  const [heroCard4Title, setHeroCard4Title] = useState(siteSettings.heroCard4Title || '공식 파트너 인증');
  const [heroCard4Desc, setHeroCard4Desc] = useState(siteSettings.heroCard4Desc || '안심 개통 및 보증제');

  const [phoneNumber, setPhoneNumber] = useState(siteSettings.phoneNumber);
  const [phoneDisplay, setPhoneDisplay] = useState(siteSettings.phoneDisplay);
  const [workingHours, setWorkingHours] = useState(siteSettings.workingHours);
  const [kakaoChatUrl, setKakaoChatUrl] = useState(siteSettings.kakaoChatUrl);
  const [naverTalkUrl, setNaverTalkUrl] = useState(siteSettings.naverTalkUrl);

  const [companyName, setCompanyName] = useState(siteSettings.companyName);
  const [representative, setRepresentative] = useState(siteSettings.representative);
  const [businessNumber, setBusinessNumber] = useState(siteSettings.businessNumber);
  const [telecomSalesNumber, setTelecomSalesNumber] = useState(siteSettings.telecomSalesNumber);
  const [address, setAddress] = useState(siteSettings.address);
  const [privacyManager, setPrivacyManager] = useState(siteSettings.privacyManager);

  // Footer custom texts
  const [footerDescLine1, setFooterDescLine1] = useState(siteSettings.footerDescLine1 || '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터');
  const [footerDescLine2, setFooterDescLine2] = useState(siteSettings.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.');
  const [footerBadge1, setFooterBadge1] = useState(siteSettings.footerBadge1 || '본사 공식 인증 대리점');
  const [footerBadge2, setFooterBadge2] = useState(siteSettings.footerBadge2 || '100% 당일 사은품 지급 보증');
  const [footerNoticeText, setFooterNoticeText] = useState(siteSettings.footerNoticeText || '[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다.');
  const [footerCopyright, setFooterCopyright] = useState(siteSettings.footerCopyright || '© 2026 KT skylife Partner. All rights reserved.');

  useEffect(() => {
    setHeroCard1Title(siteSettings.heroCard1Title || '최대 48만원');
    setHeroCard1Desc(siteSettings.heroCard1Desc || '당일 현금 100% 지급');
    setHeroCard2Title(siteSettings.heroCard2Title || 'KT 100% 동일망');
    setHeroCard2Desc(siteSettings.heroCard2Desc || '초고속 끊김없는 광랜');
    setHeroCard3Title(siteSettings.heroCard3Title || '239개 채널 UHD');
    setHeroCard3Desc(siteSettings.heroCard3Desc || '안드로이드4 OTT 셋톱');
    setHeroCard4Title(siteSettings.heroCard4Title || '공식 파트너 인증');
    setHeroCard4Desc(siteSettings.heroCard4Desc || '안심 개통 및 보증제');
    setFooterDescLine1(siteSettings.footerDescLine1 || '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터');
    setFooterDescLine2(siteSettings.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.');
    setFooterBadge1(siteSettings.footerBadge1 || '본사 공식 인증 대리점');
    setFooterBadge2(siteSettings.footerBadge2 || '100% 당일 사은품 지급 보증');
    setFooterNoticeText(siteSettings.footerNoticeText || '[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다.');
    setFooterCopyright(siteSettings.footerCopyright || '© 2026 KT skylife Partner. All rights reserved.');
  }, [siteSettings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      seoTitle,
      seoDescription,
      seoKeywords,
      ogImageUrl,
      heroCard1Title,
      heroCard1Desc,
      heroCard2Title,
      heroCard2Desc,
      heroCard3Title,
      heroCard3Desc,
      heroCard4Title,
      heroCard4Desc,
      phoneNumber,
      phoneDisplay,
      workingHours,
      kakaoChatUrl,
      naverTalkUrl,
      companyName,
      representative,
      businessNumber,
      telecomSalesNumber,
      address,
      privacyManager,
      footerDescLine1,
      footerDescLine2,
      footerBadge1,
      footerBadge2,
      footerNoticeText,
      footerCopyright
    });
    showToast('사이트 및 푸터 문구 설정이 성공적으로 저장되었습니다.', 'success');
  };

  const handleDownloadBackup = () => {
    const dataStr = exportDataJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KT스카이라이프_전체설정백업_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    showToast('전체 설정 및 데이터 백업 파일이 생성되었습니다.', 'success');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJson(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            SEO & 연동/사업자 정보 설정
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            검색엔진 최적화(SEO), SNS/카카오톡 링크, 대표 전화번호, 사업자 등록 정보를 관리합니다.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-colors"
        >
          설정 저장하기
        </button>
      </div>

      {/* 1. SEO Tools & Search Engine Optimization */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm">SEO 검색엔진 최적화 & 메타 태그</h3>
            <p className="text-xs text-slate-500">네이버, 구글, 카카오톡 링크 공유 시 표시될 정보입니다.</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">SEO 웹사이트 제목 (Title Tag)</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">메타 설명문 (Meta Description)</label>
            <textarea
              rows={2}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">검색 키워드 (쉼표로 구분)</label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">SNS 공유 썸네일 이미지 URL (OG Image)</label>
            <input
              type="url"
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Main Hero 4 Benefit Mini Cards (최대 48만원, KT 100% 동일망 등) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">메인 히어로 4대 혜택 미니 카드 문구</h3>
              <p className="text-xs text-slate-500">메인 화면 최상단에 배치된 4개 핵심 혜택 카드의 제목과 설명 문구입니다.</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            메인 최상단
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-700 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-blue-600" /> 카드 1 (사은품)
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">1번째</span>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">제목 (예: 최대 48만원)</label>
              <input
                type="text"
                value={heroCard1Title}
                onChange={(e) => setHeroCard1Title(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-white font-black text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">설명 (예: 당일 현금 100% 지급)</label>
              <input
                type="text"
                value={heroCard1Desc}
                onChange={(e) => setHeroCard1Desc(e.target.value)}
                className="w-full p-2 rounded-xl border bg-white text-slate-700"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-700 flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-blue-600" /> 카드 2 (통신망/품질)
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">2번째</span>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">제목 (예: KT 100% 동일망)</label>
              <input
                type="text"
                value={heroCard2Title}
                onChange={(e) => setHeroCard2Title(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-white font-black text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">설명 (예: 초고속 끊김없는 광랜)</label>
              <input
                type="text"
                value={heroCard2Desc}
                onChange={(e) => setHeroCard2Desc(e.target.value)}
                className="w-full p-2 rounded-xl border bg-white text-slate-700"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-700 flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5 text-blue-600" /> 카드 3 (TV/OTT)
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">3번째</span>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">제목 (예: 239개 채널 UHD)</label>
              <input
                type="text"
                value={heroCard3Title}
                onChange={(e) => setHeroCard3Title(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-white font-black text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">설명 (예: 안드로이드4 OTT 셋톱)</label>
              <input
                type="text"
                value={heroCard3Desc}
                onChange={(e) => setHeroCard3Desc(e.target.value)}
                className="w-full p-2 rounded-xl border bg-white text-slate-700"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 카드 4 (공식인증/보증)
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">4번째</span>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">제목 (예: 공식 파트너 인증)</label>
              <input
                type="text"
                value={heroCard4Title}
                onChange={(e) => setHeroCard4Title(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-white font-black text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">설명 (예: 안심 개통 및 보증제)</label>
              <input
                type="text"
                value={heroCard4Desc}
                onChange={(e) => setHeroCard4Desc(e.target.value)}
                className="w-full p-2 rounded-xl border bg-white text-slate-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Customer Hotline & SNS Social Integration */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm">고객센터 전화 & 소셜 상담 채널 연동</h3>
            <p className="text-xs text-slate-500">방문자가 버튼 클릭 시 바로 연결되는 채널 URL 및 번호입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">대표 상담 전화번호 (클릭 연결용)</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">화면 표시 전화번호 텍스트</label>
            <input
              type="text"
              value={phoneDisplay}
              onChange={(e) => setPhoneDisplay(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-blue-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">상담 운영 시간 안내 문구</label>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">카카오톡 상담톡/채널 URL</label>
            <input
              type="url"
              value={kakaoChatUrl}
              onChange={(e) => setKakaoChatUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">네이버 톡톡 상담 URL</label>
            <input
              type="url"
              value={naverTalkUrl}
              onChange={(e) => setNaverTalkUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 3. Business Legal Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm">사업자 및 법적 정보 (푸터 노출)</h3>
            <p className="text-xs text-slate-500">전자상거래법 준수를 위한 대리점 사업자 정보입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">상호명</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">대표자명</label>
            <input
              type="text"
              value={representative}
              onChange={(e) => setRepresentative(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">사업자등록번호</label>
            <input
              type="text"
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">통신판매업신고번호</label>
            <input
              type="text"
              value={telecomSalesNumber}
              onChange={(e) => setTelecomSalesNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">사업장 주소</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">개인정보보호책임자</label>
            <input
              type="text"
              value={privacyManager}
              onChange={(e) => setPrivacyManager(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 4. Footer Texts (Under 'skylife 공식가입센터') */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">푸터 하단 문구 ('skylife 공식가입센터' 밑 글자)</h3>
              <p className="text-xs text-slate-500">홈페이지 맨 밑바닥 로고 아래에 노출되는 설명 문구와 뱃지를 수정합니다.</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            푸터 텍스트
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 text-xs pt-1">
          <div>
            <label className="block font-bold text-slate-700 mb-1">skylife 공식가입센터 밑 첫 번째 줄 문구</label>
            <input
              type="text"
              value={footerDescLine1}
              onChange={(e) => setFooterDescLine1(e.target.value)}
              placeholder="인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터"
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">skylife 공식가입센터 밑 두 번째 줄 문구</label>
            <input
              type="text"
              value={footerDescLine2}
              onChange={(e) => setFooterDescLine2(e.target.value)}
              placeholder="KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너."
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">하단 인증 뱃지 1</label>
              <input
                type="text"
                value={footerBadge1}
                onChange={(e) => setFooterBadge1(e.target.value)}
                placeholder="본사 공식 인증 대리점"
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">하단 인증 뱃지 2</label>
              <input
                type="text"
                value={footerBadge2}
                onChange={(e) => setFooterBadge2(e.target.value)}
                placeholder="100% 당일 사은품 지급 보증"
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">하단 공식 파트너 안내 고지문구</label>
            <textarea
              rows={2}
              value={footerNoticeText}
              onChange={(e) => setFooterNoticeText(e.target.value)}
              placeholder="[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며..."
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">저작권 표시 (Copyright)</label>
            <input
              type="text"
              value={footerCopyright}
              onChange={(e) => setFooterCopyright(e.target.value)}
              placeholder="© 2026 KT skylife Partner. All rights reserved."
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 5. Backup, Export, Import & Factory Reset */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm">데이터 백업 & 초기화</h3>
            <p className="text-xs text-slate-500">모든 설정 및 데이터를 JSON으로 백업하거나 초기 기본 데이터로 복원합니다.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>설정 데이터 백업 (JSON 다운로드)</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4 text-blue-600" />
            <span>백업 복원 (JSON 파일 선택)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (confirm('모든 데이터와 디자인을 초기 기본 상태로 초기화하시겠습니까?')) {
                resetToDefaultData();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 border border-rose-200 ml-auto"
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>초기 기본 샘플로 리셋</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl shadow-blue-500/25 transition-colors"
        >
          SEO 및 전체 사이트 설정 저장하기
        </button>
      </div>
    </form>
  );
};
