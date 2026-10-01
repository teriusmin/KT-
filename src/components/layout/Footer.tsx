import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Phone, Clock, MapPin, MessageCircle, Settings } from 'lucide-react';
import { SkylifeLogo } from '../common/SkylifeLogo';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onRequestAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onRequestAdmin }) => {
  const { siteSettings } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-14 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Row: Brand & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm shadow-blue-900/40">
                {siteSettings.footerKtBadge || 'KT'}
              </div>
              <div className="flex items-center gap-2">
                <SkylifeLogo className="h-5 sm:h-5.5 w-auto" />
                <span className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {siteSettings.footerBrandTitle || '공식 가입 센터'}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {siteSettings.footerDescLine1 || siteSettings.siteSubtitle}
              <br />
              {siteSettings.footerDescLine2 || 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.'}
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-300 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {siteSettings.footerBadge1 || '본사 공식 인증 대리점'}
              </span>
              <span>•</span>
              <span className="text-yellow-400 font-bold">
                {siteSettings.footerBadge2 || '100% 당일 사은품 지급 보증'}
              </span>
            </div>
          </div>

          {/* Customer Center Contact */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-center space-y-2">
            <div className="text-xs text-slate-400 font-medium">
              {siteSettings.footerPhoneTitle || '가입 및 요금 상담 직통 센터'}
            </div>
            <a
              href={`tel:${(siteSettings?.phoneNumber || '').replace(/[^0-9]/g, '')}`}
              className="text-2xl sm:text-3xl font-black text-white hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Phone className="w-6 h-6 text-blue-500" />
              <span>{siteSettings.phoneDisplay}</span>
            </a>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {siteSettings.footerWorkingHoursLabel ? `${siteSettings.footerWorkingHoursLabel}: ` : ''}
                {siteSettings.workingHours}
              </span>
            </div>
          </div>
        </div>

        {/* Legal Business Information */}
        <div className="space-y-2.5 text-[11px] leading-relaxed text-slate-500">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>{siteSettings.footerLabelCompanyName || '상호명'}: {siteSettings.companyName}</span>
            <span>{siteSettings.footerLabelRepresentative || '대표자'}: {siteSettings.representative}</span>
            <span>{siteSettings.footerLabelBizNum || '사업자등록번호'}: {siteSettings.businessNumber}</span>
            <span>{siteSettings.footerLabelTelecomNum || '통신판매업신고'}: {siteSettings.telecomSalesNumber}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>{siteSettings.footerLabelAddress || '사업장 소재지'}: {siteSettings.address}</span>
            <span>{siteSettings.footerLabelPrivacy || '개인정보관리책임자'}: {siteSettings.privacyManager}</span>
            {siteSettings.telecomApprovalNumber && (
              <span>{siteSettings.footerLabelApproval || '사전승낙서'}: {siteSettings.telecomApprovalNumber}</span>
            )}
            {siteSettings.companyEmail && (
              <span>{siteSettings.footerLabelEmail || '이메일'}: {siteSettings.companyEmail}</span>
            )}
          </div>
          {siteSettings.footerNoticeText && (
            <p className="pt-2 text-slate-500">
              {siteSettings.footerNoticeText}
            </p>
          )}
          {siteSettings.footerLegalSubNotice && (
            <p className="text-[10px] text-slate-600">
              {siteSettings.footerLegalSubNotice}
            </p>
          )}
        </div>

        {/* Bottom copyright & Admin quick trigger */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            {siteSettings.footerCopyright || `© ${new Date().getFullYear()} KT skylife Partner. All rights reserved.`}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onScrollTo('products')}
              className="hover:text-slate-300"
            >
              {siteSettings.footerLink1 || '결합상품'}
            </button>
            <button
              onClick={() => onScrollTo('calculator')}
              className="hover:text-slate-300"
            >
              {siteSettings.footerLink2 || '요금계산기'}
            </button>
            <button
              onClick={() => onScrollTo('faq')}
              className="hover:text-slate-300"
            >
              {siteSettings.footerLink3 || '자주묻는질문'}
            </button>
            <button
              onClick={onRequestAdmin}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold border border-slate-700 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{siteSettings.footerAdminBtnText || '관리자 대시보드'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
