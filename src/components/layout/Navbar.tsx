import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneCall, ShieldCheck, Sparkles, Settings, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { SkylifeLogo } from '../common/SkylifeLogo';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
  onRequestAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo, onRequestAdmin }) => {
  const { siteSettings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '결합상품 안내', id: 'products' },
    { label: '요금 계산기', id: 'calculator' },
    { label: '스카이라이프 특장점', id: 'features' },
    { label: '설치 후기', id: 'reviews' },
    { label: '자주 묻는 질문', id: 'faq' },
    { label: '공지/이벤트', id: 'board' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Notification Strip */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-white/20 text-white">
              <Zap className="w-3 h-3 mr-1 text-yellow-300 fill-yellow-300" /> EVENT
            </span>
            <span className="font-medium truncate text-blue-50">
              {siteSettings.topNoticeText}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-blue-100 shrink-0 text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              본사 공식 직영 가입센터
            </span>
            <span>상담시간: {siteSettings.workingHours}</span>
            <button
              onClick={onRequestAdmin}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors"
              title="관리자 모드로 이동"
            >
              <Settings className="w-3.5 h-3.5" />
              관리자 모드
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/25 text-white font-black text-xl tracking-tighter">
              KT
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5">
                  <SkylifeLogo className="h-5 sm:h-6.5 w-auto" />
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    가입센터
                  </span>
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                  공식파트너
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {siteSettings.siteSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-blue-600 transition-colors py-2 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${siteSettings.phoneNumber.replace(/[^0-9]/g, '')}`}
              className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-sm border border-blue-200 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center animate-pulse">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-blue-600 font-medium leading-none">빠른 전화 상담</div>
                <div className="text-base font-extrabold text-slate-900 leading-tight">{siteSettings.phoneDisplay}</div>
              </div>
            </a>

            {/* Quick Apply Button */}
            <button
              onClick={() => handleNavClick('apply-form')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>간편 상담신청</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 text-slate-800 text-sm font-semibold text-left hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${siteSettings.phoneNumber.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm border border-blue-200"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>전화 상담 : {siteSettings.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 text-white font-medium text-xs"
            >
              <Settings className="w-4 h-4" />
              <span>관리자 대시보드 열기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
