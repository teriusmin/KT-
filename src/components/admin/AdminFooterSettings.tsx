import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  ShieldCheck,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  FileText,
  AlertCircle,
  Eye,
  Info,
  ExternalLink
} from 'lucide-react';
import { defaultSiteSettings } from '../../data/defaultData';
import { SkylifeLogo } from '../common/SkylifeLogo';

export const AdminFooterSettings: React.FC = () => {
  const { siteSettings, updateSiteSettings, showToast } = useApp();

  const [formData, setFormData] = useState({
    // Brand & Top Header in Footer
    footerKtBadge: siteSettings.footerKtBadge || 'KT',
    footerBrandTitle: siteSettings.footerBrandTitle || '공식 가입 센터',
    footerDescLine1: siteSettings.footerDescLine1 || siteSettings.siteSubtitle || '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터',
    footerDescLine2: siteSettings.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.',
    footerBadge1: siteSettings.footerBadge1 || '본사 공식 인증 대리점',
    footerBadge2: siteSettings.footerBadge2 || '100% 당일 사은품 지급 보증',

    // Call Center info
    footerPhoneTitle: siteSettings.footerPhoneTitle || '가입 및 요금 상담 직통 센터',
    phoneDisplay: siteSettings.phoneDisplay || '1522-8239',
    phoneNumber: siteSettings.phoneNumber || '1522-8239',
    workingHours: siteSettings.workingHours || '평일 09:00~19:00 / 토요일 09:00~15:00 (일·공휴일 휴무)',
    footerWorkingHoursLabel: siteSettings.footerWorkingHoursLabel || '',

    // Business Legal Information (Labels & Values)
    footerLabelCompanyName: siteSettings.footerLabelCompanyName || '상호명',
    companyName: siteSettings.companyName || '(주)스카이라이프 공식 파트너 가입센터',

    footerLabelRepresentative: siteSettings.footerLabelRepresentative || '대표자',
    representative: siteSettings.representative || '김스카이',

    footerLabelBizNum: siteSettings.footerLabelBizNum || '사업자등록번호',
    businessNumber: siteSettings.businessNumber || '123-86-09876',

    footerLabelTelecomNum: siteSettings.footerLabelTelecomNum || '통신판매업신고',
    telecomSalesNumber: siteSettings.telecomSalesNumber || '제2024-서울강남-01234호',

    footerLabelAddress: siteSettings.footerLabelAddress || '사업장 소재지',
    address: siteSettings.address || '서울특별시 강남구 테헤란로 152 강남타워 8층',

    footerLabelPrivacy: siteSettings.footerLabelPrivacy || '개인정보관리책임자',
    privacyManager: siteSettings.privacyManager || '개인정보보호책임자 (privacy@skylife-partner.co.kr)',

    // Additional Legal Lines
    footerLabelApproval: siteSettings.footerLabelApproval || '유선통신사전승낙',
    telecomApprovalNumber: siteSettings.telecomApprovalNumber || '사전승낙서 승인번호: 제 2024-SK-00129호',

    footerLabelEmail: siteSettings.footerLabelEmail || '고객문의 이메일',
    companyEmail: siteSettings.companyEmail || 'help@skylife-direct.co.kr',

    // Legal Notices & Disclaimer
    footerNoticeText: siteSettings.footerNoticeText || '[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다.',
    footerLegalSubNotice: siteSettings.footerLegalSubNotice || '※ 개통 후 1년 이내 해지, 일시정지, 요금제 하향 변경 시 지급된 사은품 전액 환수 및 본사 약정 위약금이 발생할 수 있습니다.',

    // Copyright & Links
    footerCopyright: siteSettings.footerCopyright || '© 2026 KT skylife Partner. All rights reserved.',
    footerLink1: siteSettings.footerLink1 || '결합상품',
    footerLink2: siteSettings.footerLink2 || '요금계산기',
    footerLink3: siteSettings.footerLink3 || '자주묻는질문',
    footerAdminBtnText: siteSettings.footerAdminBtnText || '관리자 대시보드',
  });

  useEffect(() => {
    setFormData({
      footerKtBadge: siteSettings.footerKtBadge || 'KT',
      footerBrandTitle: siteSettings.footerBrandTitle || '공식 가입 센터',
      footerDescLine1: siteSettings.footerDescLine1 || siteSettings.siteSubtitle || '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터',
      footerDescLine2: siteSettings.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.',
      footerBadge1: siteSettings.footerBadge1 || '본사 공식 인증 대리점',
      footerBadge2: siteSettings.footerBadge2 || '100% 당일 사은품 지급 보증',
      footerPhoneTitle: siteSettings.footerPhoneTitle || '가입 및 요금 상담 직통 센터',
      phoneDisplay: siteSettings.phoneDisplay || '1522-8239',
      phoneNumber: siteSettings.phoneNumber || '1522-8239',
      workingHours: siteSettings.workingHours || '평일 09:00~19:00 / 토요일 09:00~15:00 (일·공휴일 휴무)',
      footerWorkingHoursLabel: siteSettings.footerWorkingHoursLabel || '',
      footerLabelCompanyName: siteSettings.footerLabelCompanyName || '상호명',
      companyName: siteSettings.companyName || '(주)스카이라이프 공식 파트너 가입센터',
      footerLabelRepresentative: siteSettings.footerLabelRepresentative || '대표자',
      representative: siteSettings.representative || '김스카이',
      footerLabelBizNum: siteSettings.footerLabelBizNum || '사업자등록번호',
      businessNumber: siteSettings.businessNumber || '123-86-09876',
      footerLabelTelecomNum: siteSettings.footerLabelTelecomNum || '통신판매업신고',
      telecomSalesNumber: siteSettings.telecomSalesNumber || '제2024-서울강남-01234호',
      footerLabelAddress: siteSettings.footerLabelAddress || '사업장 소재지',
      address: siteSettings.address || '서울특별시 강남구 테헤란로 152 강남타워 8층',
      footerLabelPrivacy: siteSettings.footerLabelPrivacy || '개인정보관리책임자',
      privacyManager: siteSettings.privacyManager || '개인정보보호책임자 (privacy@skylife-partner.co.kr)',
      footerLabelApproval: siteSettings.footerLabelApproval || '유선통신사전승낙',
      telecomApprovalNumber: siteSettings.telecomApprovalNumber || '사전승낙서 승인번호: 제 2024-SK-00129호',
      footerLabelEmail: siteSettings.footerLabelEmail || '고객문의 이메일',
      companyEmail: siteSettings.companyEmail || 'help@skylife-direct.co.kr',
      footerNoticeText: siteSettings.footerNoticeText || '[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다.',
      footerLegalSubNotice: siteSettings.footerLegalSubNotice || '※ 개통 후 1년 이내 해지, 일시정지, 요금제 하향 변경 시 지급된 사은품 전액 환수 및 본사 약정 위약금이 발생할 수 있습니다.',
      footerCopyright: siteSettings.footerCopyright || '© 2026 KT skylife Partner. All rights reserved.',
      footerLink1: siteSettings.footerLink1 || '결합상품',
      footerLink2: siteSettings.footerLink2 || '요금계산기',
      footerLink3: siteSettings.footerLink3 || '자주묻는질문',
      footerAdminBtnText: siteSettings.footerAdminBtnText || '관리자 대시보드',
    });
  }, [siteSettings]);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    showToast('푸터 사업자 및 법적 정보가 성공적으로 클라우드에 저장되었습니다.', 'success');
  };

  const handleReset = () => {
    if (!window.confirm('푸터 사업자 및 법적 정보를 기본값으로 초기화하시겠습니까?')) return;
    const resetData = {
      footerKtBadge: defaultSiteSettings.footerKtBadge || 'KT',
      footerBrandTitle: defaultSiteSettings.footerBrandTitle || '공식 가입 센터',
      footerDescLine1: defaultSiteSettings.footerDescLine1 || '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터',
      footerDescLine2: defaultSiteSettings.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.',
      footerBadge1: defaultSiteSettings.footerBadge1 || '본사 공식 인증 대리점',
      footerBadge2: defaultSiteSettings.footerBadge2 || '100% 당일 사은품 지급 보증',
      footerPhoneTitle: defaultSiteSettings.footerPhoneTitle || '가입 및 요금 상담 직통 센터',
      phoneDisplay: defaultSiteSettings.phoneDisplay || '1522-8239',
      phoneNumber: defaultSiteSettings.phoneNumber || '1522-8239',
      workingHours: defaultSiteSettings.workingHours || '평일 09:00~19:00 / 토요일 09:00~15:00 (일·공휴일 휴무)',
      footerWorkingHoursLabel: defaultSiteSettings.footerWorkingHoursLabel || '',
      footerLabelCompanyName: defaultSiteSettings.footerLabelCompanyName || '상호명',
      companyName: defaultSiteSettings.companyName || '(주)스카이라이프 공식 파트너 가입센터',
      footerLabelRepresentative: defaultSiteSettings.footerLabelRepresentative || '대표자',
      representative: defaultSiteSettings.representative || '김스카이',
      footerLabelBizNum: defaultSiteSettings.footerLabelBizNum || '사업자등록번호',
      businessNumber: defaultSiteSettings.businessNumber || '123-86-09876',
      footerLabelTelecomNum: defaultSiteSettings.footerLabelTelecomNum || '통신판매업신고',
      telecomSalesNumber: defaultSiteSettings.telecomSalesNumber || '제2024-서울강남-01234호',
      footerLabelAddress: defaultSiteSettings.footerLabelAddress || '사업장 소재지',
      address: defaultSiteSettings.address || '서울특별시 강남구 테헤란로 152 강남타워 8층',
      footerLabelPrivacy: defaultSiteSettings.footerLabelPrivacy || '개인정보관리책임자',
      privacyManager: defaultSiteSettings.privacyManager || '개인정보보호책임자 (privacy@skylife-partner.co.kr)',
      footerLabelApproval: defaultSiteSettings.footerLabelApproval || '유선통신사전승낙',
      telecomApprovalNumber: defaultSiteSettings.telecomApprovalNumber || '사전승낙서 승인번호: 제 2024-SK-00129호',
      footerLabelEmail: defaultSiteSettings.footerLabelEmail || '고객문의 이메일',
      companyEmail: defaultSiteSettings.companyEmail || 'help@skylife-direct.co.kr',
      footerNoticeText: defaultSiteSettings.footerNoticeText || '[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다.',
      footerLegalSubNotice: defaultSiteSettings.footerLegalSubNotice || '※ 개통 후 1년 이내 해지, 일시정지, 요금제 하향 변경 시 지급된 사은품 전액 환수 및 본사 약정 위약금이 발생할 수 있습니다.',
      footerCopyright: defaultSiteSettings.footerCopyright || '© 2026 KT skylife Partner. All rights reserved.',
      footerLink1: defaultSiteSettings.footerLink1 || '결합상품',
      footerLink2: defaultSiteSettings.footerLink2 || '요금계산기',
      footerLink3: defaultSiteSettings.footerLink3 || '자주묻는질문',
      footerAdminBtnText: defaultSiteSettings.footerAdminBtnText || '관리자 대시보드',
    };
    setFormData(resetData);
    updateSiteSettings(resetData);
    showToast('푸터 설정이 기본값으로 초기화되었습니다.', 'info');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-20">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span>전자상거래법 & 통신판매사업자 법적 필수 정보</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            푸터 사업자 및 법적 정보 전체 관리
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            웹사이트 최하단 푸터에 노출되는 상호명, 사업자번호, 대표자, 통신판매신고, 사전승낙서, 법적 고지문, 저작권, 고객센터 문구 등 <span className="text-yellow-300 font-bold">모든 텍스트를 자유롭게 변경</span>할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 복원</span>
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>전체 저장하기</span>
          </button>
        </div>
      </div>

      {/* Live Real-time Footer Preview */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black text-blue-300 tracking-wider uppercase">
              실시간 푸터 노출 미리보기 (고객에게 보여지는 실제 화면)
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            입력 즉시 반영
          </span>
        </div>

        {/* Mini simulated footer */}
        <div className="space-y-6 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  {formData.footerKtBadge}
                </div>
                <SkylifeLogo className="h-4.5 w-auto" />
                <span className="text-base font-black text-white">{formData.footerBrandTitle}</span>
              </div>
              <p className="text-slate-300 text-xs">
                {formData.footerDescLine1}
                <br />
                {formData.footerDescLine2}
              </p>
              <div className="flex items-center gap-3 text-xs pt-1">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {formData.footerBadge1}
                </span>
                <span>•</span>
                <span className="text-yellow-400 font-bold">{formData.footerBadge2}</span>
              </div>
            </div>

            <div className="md:text-right space-y-1">
              <div className="text-[11px] text-slate-400 font-bold">{formData.footerPhoneTitle}</div>
              <div className="text-2xl font-black text-white flex items-center md:justify-end gap-2 text-blue-400">
                <Phone className="w-5 h-5" />
                <span>{formData.phoneDisplay}</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center md:justify-end gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>
                  {formData.footerWorkingHoursLabel ? `${formData.footerWorkingHoursLabel}: ` : ''}
                  {formData.workingHours}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-[11px] text-slate-400">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong className="text-slate-300">{formData.footerLabelCompanyName}:</strong> {formData.companyName}</span>
              <span><strong className="text-slate-300">{formData.footerLabelRepresentative}:</strong> {formData.representative}</span>
              <span><strong className="text-slate-300">{formData.footerLabelBizNum}:</strong> {formData.businessNumber}</span>
              <span><strong className="text-slate-300">{formData.footerLabelTelecomNum}:</strong> {formData.telecomSalesNumber}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong className="text-slate-300">{formData.footerLabelAddress}:</strong> {formData.address}</span>
              <span><strong className="text-slate-300">{formData.footerLabelPrivacy}:</strong> {formData.privacyManager}</span>
              {formData.telecomApprovalNumber && (
                <span><strong className="text-slate-300">{formData.footerLabelApproval}:</strong> {formData.telecomApprovalNumber}</span>
              )}
              {formData.companyEmail && (
                <span><strong className="text-slate-300">{formData.footerLabelEmail}:</strong> {formData.companyEmail}</span>
              )}
            </div>
            <p className="pt-1 text-slate-400 text-[11px]">
              {formData.footerNoticeText}
            </p>
            {formData.footerLegalSubNotice && (
              <p className="text-[10px] text-amber-400/90 font-medium">
                {formData.footerLegalSubNotice}
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>{formData.footerCopyright}</div>
            <div className="flex items-center gap-3">
              <span>{formData.footerLink1}</span>
              <span>{formData.footerLink2}</span>
              <span>{formData.footerLink3}</span>
              <span className="text-blue-400 font-bold">[{formData.footerAdminBtnText}]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: 사업자 핵심 정보 & 라벨 커스텀 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                1. 사업자 기본 등록 정보 (라벨 및 내용)
              </h3>
              <p className="text-xs text-slate-500">
                상호, 대표자, 사업자번호, 통신판매신고 라벨과 실제 값을 수정합니다.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* 상호명 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">상호명 라벨</label>
                <input
                  type="text"
                  value={formData.footerLabelCompanyName}
                  onChange={(e) => handleChange('footerLabelCompanyName', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-slate-800"
                  placeholder="상호명"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">상호명 (법인/개인 상호)</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-semibold text-slate-900"
                  placeholder="(주)스카이라이프 공식 파트너 가입센터"
                />
              </div>
            </div>

            {/* 대표자 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">대표자 라벨</label>
                <input
                  type="text"
                  value={formData.footerLabelRepresentative}
                  onChange={(e) => handleChange('footerLabelRepresentative', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-slate-800"
                  placeholder="대표자"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">대표자 성명</label>
                <input
                  type="text"
                  value={formData.representative}
                  onChange={(e) => handleChange('representative', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
                  placeholder="김스카이"
                />
              </div>
            </div>

            {/* 사업자등록번호 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">사업자번호 라벨</label>
                <input
                  type="text"
                  value={formData.footerLabelBizNum}
                  onChange={(e) => handleChange('footerLabelBizNum', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-slate-800"
                  placeholder="사업자등록번호"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">사업자등록번호 (000-00-00000)</label>
                <input
                  type="text"
                  value={formData.businessNumber}
                  onChange={(e) => handleChange('businessNumber', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
                  placeholder="123-86-09876"
                />
              </div>
            </div>

            {/* 통신판매업신고 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">통신판매 라벨</label>
                <input
                  type="text"
                  value={formData.footerLabelTelecomNum}
                  onChange={(e) => handleChange('footerLabelTelecomNum', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-slate-800"
                  placeholder="통신판매업신고"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">통신판매업신고번호</label>
                <input
                  type="text"
                  value={formData.telecomSalesNumber}
                  onChange={(e) => handleChange('telecomSalesNumber', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
                  placeholder="제2024-서울강남-01234호"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 사업장 소재지 & 개인정보보호책임자 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                2. 사업장 소재지 & 개인정보보호책임자
              </h3>
              <p className="text-xs text-slate-500">
                실제 사업장 도로명 주소와 개인정보 담당자 표기를 수정합니다.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* 사업장 소재지 주소 */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">소재지 라벨</label>
                  <input
                    type="text"
                    value={formData.footerLabelAddress}
                    onChange={(e) => handleChange('footerLabelAddress', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                    placeholder="사업장 소재지"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">사업장 상세 도로명 주소</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
                    placeholder="서울특별시 강남구 테헤란로 152 강남타워 8층"
                  />
                </div>
              </div>
            </div>

            {/* 개인정보관리책임자 */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">책임자 라벨</label>
                  <input
                    type="text"
                    value={formData.footerLabelPrivacy}
                    onChange={(e) => handleChange('footerLabelPrivacy', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                    placeholder="개인정보관리책임자"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">개인정보보호책임자 성명 및 연락처/이메일</label>
                  <input
                    type="text"
                    value={formData.privacyManager}
                    onChange={(e) => handleChange('privacyManager', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
                    placeholder="개인정보보호책임자 (privacy@skylife-partner.co.kr)"
                  />
                </div>
              </div>
            </div>

            {/* 유선통신 사전승낙서 (선택) */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">사전승낙 라벨</label>
                  <input
                    type="text"
                    value={formData.footerLabelApproval}
                    onChange={(e) => handleChange('footerLabelApproval', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                    placeholder="유선통신사전승낙"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">사전승낙서 번호 (비워둘 시 숨김)</label>
                  <input
                    type="text"
                    value={formData.telecomApprovalNumber}
                    onChange={(e) => handleChange('telecomApprovalNumber', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
                    placeholder="사전승낙서 승인번호: 제 2024-SK-00129호"
                  />
                </div>
              </div>
            </div>

            {/* 고객문의 이메일 (선택) */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">이메일 라벨</label>
                  <input
                    type="text"
                    value={formData.footerLabelEmail}
                    onChange={(e) => handleChange('footerLabelEmail', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                    placeholder="고객문의 이메일"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">대표 이메일 주소 (비워둘 시 숨김)</label>
                  <input
                    type="text"
                    value={formData.companyEmail}
                    onChange={(e) => handleChange('companyEmail', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
                    placeholder="help@skylife-direct.co.kr"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 법적 안내 & 면책 고지문구 (Disclaimers) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                3. 공식 파트너 고지 및 법적 면책 문구
              </h3>
              <p className="text-xs text-slate-500">
                대리점 안내문구 및 개통 약정 관련 법적 안내 텍스트를 수정합니다.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>공식 온라인 파트너 대리점 안내 고지문구</span>
                <span className="text-[11px] text-slate-400 font-normal">회색 작은 글씨로 노출</span>
              </label>
              <textarea
                rows={3}
                value={formData.footerNoticeText}
                onChange={(e) => handleChange('footerNoticeText', e.target.value)}
                placeholder="[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며..."
                className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white leading-relaxed text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>사은품 환수 및 위약금 관련 법적 주의사항 문구</span>
                <span className="text-[11px] text-amber-600 font-bold">노란색/주황색 강조 표기</span>
              </label>
              <textarea
                rows={2}
                value={formData.footerLegalSubNotice}
                onChange={(e) => handleChange('footerLegalSubNotice', e.target.value)}
                placeholder="※ 개통 후 1년 이내 해지, 일시정지, 요금제 하향 변경 시 지급된 사은품 전액 환수 및 본사 약정 위약금이 발생할 수 있습니다."
                className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white leading-relaxed text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Section 4: 푸터 상단 로고, 뱃지, 설명 문구 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                4. 푸터 상단 브랜드 & 뱃지 문구
              </h3>
              <p className="text-xs text-slate-500">
                푸터 최상단 로고 옆 텍스트와 인증 뱃지 문구를 수정합니다.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">좌측 뱃지 글자</label>
                <input
                  type="text"
                  value={formData.footerKtBadge}
                  onChange={(e) => handleChange('footerKtBadge', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                  placeholder="KT"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">skylife 로고 우측 명칭</label>
                <input
                  type="text"
                  value={formData.footerBrandTitle}
                  onChange={(e) => handleChange('footerBrandTitle', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-slate-900"
                  placeholder="공식 가입 센터"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">로고 밑 첫 번째 설명 문구</label>
              <input
                type="text"
                value={formData.footerDescLine1}
                onChange={(e) => handleChange('footerDescLine1', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-800"
                placeholder="인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">로고 밑 두 번째 설명 문구</label>
              <input
                type="text"
                value={formData.footerDescLine2}
                onChange={(e) => handleChange('footerDescLine2', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-800"
                placeholder="KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">초록 인증 뱃지 문구</label>
                <input
                  type="text"
                  value={formData.footerBadge1}
                  onChange={(e) => handleChange('footerBadge1', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-emerald-700 font-bold"
                  placeholder="본사 공식 인증 대리점"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">황금 사은품 뱃지 문구</label>
                <input
                  type="text"
                  value={formData.footerBadge2}
                  onChange={(e) => handleChange('footerBadge2', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-amber-700 font-bold"
                  placeholder="100% 당일 사은품 지급 보증"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: 상담센터 연락처 및 근무시간 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                5. 푸터 상담센터 연락처 & 운영시간
              </h3>
              <p className="text-xs text-slate-500">
                푸터 우측에 표시되는 전화번호와 상담시간 문구를 수정합니다.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">상담센터 상단 타이틀</label>
              <input
                type="text"
                value={formData.footerPhoneTitle}
                onChange={(e) => handleChange('footerPhoneTitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-800"
                placeholder="가입 및 요금 상담 직통 센터"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">노출 전화번호 (화면 표시)</label>
                <input
                  type="text"
                  value={formData.phoneDisplay}
                  onChange={(e) => handleChange('phoneDisplay', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-black text-slate-900"
                  placeholder="1522-8239"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">실제 연결 번호 (클릭 시 통화)</label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                  placeholder="1522-8239"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">상담 운영시간 안내 문구</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-800"
                placeholder="평일 09:00~19:00 / 토요일 09:00~15:00 (일·공휴일 휴무)"
              />
            </div>
          </div>
        </div>

        {/* Section 6: 저작권(Copyright) 및 하단 링크 텍스트 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                6. 저작권 (Copyright) & 하단 링크 버튼
              </h3>
              <p className="text-xs text-slate-500">
                푸터 맨 밑줄의 저작권 문구와 이동 링크 이름을 수정합니다.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">저작권 (Copyright) 표시 문구</label>
              <input
                type="text"
                value={formData.footerCopyright}
                onChange={(e) => handleChange('footerCopyright', e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-800 font-medium"
                placeholder="© 2026 KT skylife Partner. All rights reserved."
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">링크 1 명칭</label>
                <input
                  type="text"
                  value={formData.footerLink1}
                  onChange={(e) => handleChange('footerLink1', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                  placeholder="결합상품"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">링크 2 명칭</label>
                <input
                  type="text"
                  value={formData.footerLink2}
                  onChange={(e) => handleChange('footerLink2', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                  placeholder="요금계산기"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">링크 3 명칭</label>
                <input
                  type="text"
                  value={formData.footerLink3}
                  onChange={(e) => handleChange('footerLink3', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium"
                  placeholder="자주묻는질문"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">관리자 버튼 명칭</label>
                <input
                  type="text"
                  value={formData.footerAdminBtnText}
                  onChange={(e) => handleChange('footerAdminBtnText', e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-medium text-blue-600"
                  placeholder="관리자 대시보드"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Floating Save Bar */}
      <div className="sticky bottom-6 z-30 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="hidden sm:inline text-slate-300">
            푸터 사업자 및 법적 정보를 수정한 후 저장 버튼을 누르면 즉시 웹사이트와 클라우드에 영구 적용됩니다.
          </span>
          <span className="sm:hidden text-slate-300">수정 후 저장을 눌러주세요.</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            초기화
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/40 transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>전체 저장하기</span>
          </button>
        </div>
      </div>
    </form>
  );
};
