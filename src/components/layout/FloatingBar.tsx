import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneCall, ArrowUp, Sparkles, Gift } from 'lucide-react';

interface FloatingBarProps {
  onScrollTo: (id: string) => void;
}

export const FloatingBar: React.FC<FloatingBarProps> = ({ onScrollTo }) => {
  const { siteSettings } = useApp();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Bottom Quick Contact Bar for Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl p-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3">
          {/* Left: Call Info (hidden on very small screens) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              <Gift className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="text-xs text-blue-600 font-black">
                {siteSettings.maxGiftNotice}
              </div>
              <div className="text-xs text-slate-500">
                1:1 맞춤 요금 & 사은품 즉시 상담
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex-1 md:flex-initial flex items-center justify-end gap-2">
            {/* Direct Phone Call */}
            <a
              href={`tel:${(siteSettings?.phoneNumber || '').replace(/[^0-9]/g, '')}`}
              className="flex-1 sm:flex-initial px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
              <span>전화상담 <span className="hidden xs:inline">({siteSettings.phoneDisplay})</span></span>
            </a>

            {/* Instant Apply Scroll Trigger */}
            <button
              onClick={() => onScrollTo('apply-form')}
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-transform active:scale-95 animate-pulse whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
              <span>상담신청</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-40 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg border border-slate-700 backdrop-blur-sm transition-all hover:scale-110"
          aria-label="맨 위로 가기"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
