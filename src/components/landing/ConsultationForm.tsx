import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneCall, ShieldCheck, CheckCircle2, Sparkles, Gift, MapPin, Clock, FileText, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PrivacyModal } from './PrivacyModal';

export const ConsultationForm: React.FC = () => {
  const { products, siteSettings, addLead, showToast, selectedProductForApply, setSelectedProductForApply } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [regionProvince, setRegionProvince] = useState('서울');
  const [regionDetail, setRegionDetail] = useState('');
  const [productName, setProductName] = useState(products[0]?.name || '인터넷 500M + Sky All (239채널)');
  const [preferredTime, setPreferredTime] = useState('언제나 통화 가능');
  const [affiliateCardOption, setAffiliateCardOption] = useState('');
  const [memo, setMemo] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card Options from settings
  const cardOpt0 = siteSettings.formCardOption0 || '미신청 (일반 납부)';
  const cardOpt1 = siteSettings.formCardOption1 || '1. 30만원 이상 사용 > 15,000원 할인';
  const cardOpt2 = siteSettings.formCardOption2 || '2. 70만원 이상 사용 > 16,000원 할인';
  const cardOpt3 = siteSettings.formCardOption3 || '3. 120만원 이상 사용 > 20,000원 할인';

  // Initialize selected card option
  useEffect(() => {
    if (!affiliateCardOption) {
      setAffiliateCardOption(cardOpt0);
    }
  }, [cardOpt0, affiliateCardOption]);

  // Sync selected product from state if updated via clicking cards or calculator
  useEffect(() => {
    if (selectedProductForApply) {
      setProductName(selectedProductForApply.name);
    }
  }, [selectedProductForApply]);

  const provinces = [
    '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '세종',
    '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
  ];

  const timeOptions = [
    '언제나 통화 가능',
    '오전 09:00 ~ 12:00',
    '점심시간 12:00 ~ 13:00',
    '오후 13:00 ~ 18:00',
    '저녁 18:00 이후'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('성함을 입력해 주세요.', 'error');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      showToast('올바른 연락처를 입력해 주세요.', 'error');
      return;
    }
    if (!agreed) {
      showToast('개인정보 수집 및 이용에 동의해 주세요.', 'error');
      return;
    }

    setIsSubmitting(true);

    const fullRegion = `${regionProvince} ${regionDetail}`.trim();
    const matchedProduct = products.find((p) => p.name === productName);
    const expectedGift = matchedProduct ? matchedProduct.giftAmount : 45;

    setTimeout(() => {
      addLead({
        name: name.trim(),
        phone: phone.trim(),
        region: fullRegion,
        productName,
        preferredTime,
        memo: memo.trim() ? memo.trim() : undefined,
        giftAmountExpected: expectedGift,
        affiliateCardOption: affiliateCardOption || cardOpt0
      });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      setName('');
      setPhone('');
      setRegionDetail('');
      setMemo('');
      setAffiliateCardOption(cardOpt0);
      setSelectedProductForApply(null);
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <section id="apply-form" className="py-12 sm:py-20 bg-gradient-to-b from-white via-blue-50/40 to-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Card Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl shadow-blue-500/10 border-2 border-blue-200 relative overflow-hidden">
          {/* Top Decorative Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-black shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{siteSettings.formSecBadge || '1:1 맞춤 안심 상담'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {siteSettings.formSecTitle || 'KT 스카이라이프'}{' '}
              <span className="text-blue-600">{siteSettings.formSecHighlight || '온라인 가입 상담 신청서'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              {siteSettings.formSecSubtitle || '간단한 정보를 남겨주시면 담당 전문 플래너가 가장 높은 혜택과 맞춤 사은품을 안내해 드립니다.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  고객 성명 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  연락처 (휴대폰 번호) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              {/* Installation Region */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  설치 희망 지역 (시/도 + 상세) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={regionProvince}
                    onChange={(e) => setRegionProvince(e.target.value)}
                    className="px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="예: 강남구 역삼동"
                    value={regionDetail}
                    onChange={(e) => setRegionDetail(e.target.value)}
                    className="col-span-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  상담 통화 희망 시간대
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Desired Product */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  희망 가입 상품 선택
                </label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} (월 {p.salePrice.toLocaleString()}원 / 사은품 최대 {p.giftAmount}만원)
                    </option>
                  ))}
                </select>
              </div>

              {/* Affiliate Card Application Option (Customizable in Admin) */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    <span>{siteSettings.formCardTitle || '제휴카드 신청 (선택)'}</span>
                  </label>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600">
                    {siteSettings.formCardNotice || '매월 최대 20,000원 추가 청구할인'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { id: 'opt0', text: cardOpt0, isDefault: true },
                    { id: 'opt1', text: cardOpt1, highlight: false },
                    { id: 'opt2', text: cardOpt2, highlight: true },
                    { id: 'opt3', text: cardOpt3, highlight: false }
                  ].map((card) => {
                    const isSelected = affiliateCardOption === card.text;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setAffiliateCardOption(card.text)}
                        className={`p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 text-blue-900 ring-2 ring-blue-500/20 font-bold shadow-xs'
                            : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-[11px] sm:text-xs truncate">{card.text}</span>
                        </div>
                        {card.highlight && (
                          <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold shrink-0">
                            추천
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Memo */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  기타 문의 또는 전달사항 (선택)
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 기존 통신사 만료일, 주말 설치 희망, 제휴카드 문의 등"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            {/* Privacy Agreement Checkbox */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-start gap-2 sm:gap-2.5">
                <input
                  type="checkbox"
                  id="full-privacy"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="full-privacy" className="text-[11px] sm:text-xs text-slate-700 font-medium cursor-pointer leading-snug">
                  [필수] 서비스 가입 안내 및 사은품 혜택 제공을 위한{' '}
                  <span className="font-bold text-slate-900">개인정보 수집 및 이용</span>에 동의합니다.
                </label>
              </div>

              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-[11px] sm:text-xs font-bold text-blue-700 hover:underline shrink-0 text-left sm:text-right ml-6 sm:ml-0"
              >
                약관 전문 보기 &gt;
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-black text-sm sm:text-lg shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
              <span>{isSubmitting ? '접수 처리 중...' : (siteSettings.formSubmitBtnText || '최대 현금 사은품 가입 상담 신청 완료하기')}</span>
            </button>

            {/* Security Guarantee Notice */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-400 text-center pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                개인정보 100% 암호화 및 안전 파기
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                스팸/강요 절대 없음
              </span>
            </div>
          </form>
        </div>
      </div>

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </section>
  );
};
