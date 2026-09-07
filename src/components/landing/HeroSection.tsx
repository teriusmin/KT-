import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Gift, CheckCircle, ArrowRight, ShieldCheck, Wifi, Tv, Zap, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollTo }) => {
  const { siteSettings, addLead, showToast, setSelectedProductForApply, products } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || '인터넷 500M + Sky All (239채널)');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (siteSettings.collectCustomerName && !name.trim()) {
      showToast('성함을 입력해 주세요.', 'error');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      showToast('올바른 연락처(전화번호)를 입력해 주세요.', 'error');
      return;
    }
    if (!agreed) {
      showToast('개인정보 수집 및 이용에 동의해 주세요.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await addLead({
        name: siteSettings.collectCustomerName ? name.trim() : '고객',
        phone: phone.trim(),
        region: '온라인 빠른접수',
        productName: selectedProduct,
        preferredTime: '빠른 상담 희망',
        memo: '메인 히어로 퀵 간편상담 유입'
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      setName('');
      setPhone('');
    } catch (err) {
      console.error('Quick submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50/50 pt-5 pb-12 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 text-xs sm:text-sm font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              <span>{siteSettings.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-snug sm:leading-[1.2]">
                {siteSettings.heroTitle}
                <br />
                <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">
                  {siteSettings.heroHighlight}
                </span>
              </h1>
              <p className="text-xs sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                {siteSettings.heroSubtitle}
              </p>
            </div>

            {/* Core Feature Badges (4 Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 sm:mb-2">
                  <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="font-black text-slate-900 text-xs sm:text-sm truncate">
                  {siteSettings.heroCard1Title || '최대 48만원'}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 truncate sm:whitespace-normal">
                  {siteSettings.heroCard1Desc || '당일 현금 100% 지급'}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 sm:mb-2">
                  <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="font-black text-slate-900 text-xs sm:text-sm truncate">
                  {siteSettings.heroCard2Title || 'KT 100% 동일망'}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 truncate sm:whitespace-normal">
                  {siteSettings.heroCard2Desc || '초고속 끊김없는 광랜'}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 sm:mb-2">
                  <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="font-black text-slate-900 text-xs sm:text-sm truncate">
                  {siteSettings.heroCard3Title || '239개 채널 UHD'}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 truncate sm:whitespace-normal">
                  {siteSettings.heroCard3Desc || '안드로이드4 OTT 셋톱'}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 sm:mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="font-black text-slate-900 text-xs sm:text-sm truncate">
                  {siteSettings.heroCard4Title || '공식 파트너 인증'}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 truncate sm:whitespace-normal">
                  {siteSettings.heroCard4Desc || '안심 개통 및 보증제'}
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <button
                onClick={() => onScrollTo('calculator')}
                className="px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 sm:gap-2 transition-transform active:scale-95"
              >
                <span>요금 계산기</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
              </button>
              <button
                onClick={() => onScrollTo('products')}
                className="px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-colors"
              >
                <span>요금제 비교</span>
              </button>
            </div>
          </div>

          {/* Right Column: High Converting Quick Application Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl shadow-blue-500/10 border-2 border-blue-100 relative">
              {/* Top Banner Tag */}
              <div className="absolute -top-3.5 left-6 sm:left-8 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white text-[11px] sm:text-xs font-black shadow-md uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300 fill-yellow-300" />
                <span>{siteSettings.heroFormBadge || '30초 빠른 가입상담 신청'}</span>
              </div>

              <div className="mb-4 sm:mb-6 pt-1 sm:pt-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {siteSettings.heroFormTitle || '전화번호만 남기시면 끝!'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
                  {siteSettings.heroFormSubtitle || '전문 상담사가 10분 내로 최적의 결합 할인과 최대 사은품을 안내해 드립니다.'}
                </p>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-3 sm:space-y-4">
                {/* Name Field (Conditionally displayed via Admin toggle) */}
                {siteSettings.collectCustomerName && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      고객명 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required={siteSettings.collectCustomerName}
                      placeholder="홍길동"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                )}

                {/* Phone Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처(휴대폰 번호) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Preferred Product */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 상품 선택
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} (사은품 {p.giftAmount}만원)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Privacy Agreement Checkbox */}
                <div className="flex items-start gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="hero-privacy"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <label htmlFor="hero-privacy" className="text-[11px] text-slate-500 leading-tight cursor-pointer">
                    [필수] 가입 상담 및 사은품 안내를 위한{' '}
                    <span className="text-blue-600 underline font-medium">개인정보 수집 및 이용</span>에 동의합니다.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{isSubmitting ? '접수 처리 중...' : (siteSettings.heroFormBtnText || '최대 사은품 혜택 상담 신청하기')}</span>
                </button>
              </form>

              {/* Trust Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  스팸/광고 전화 절대 없음
                </span>
                <span>전문 상담사 1:1 비밀 보장</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
