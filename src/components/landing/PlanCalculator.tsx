import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Sparkles, Gift, Wifi, Tv, CreditCard, Smartphone, Check, ArrowRight, ShieldAlert } from 'lucide-react';
import { ProductItem } from '../../types';

interface PlanCalculatorProps {
  onApplyCalculatedPlan: (customProduct: ProductItem) => void;
}

export const PlanCalculator: React.FC<PlanCalculatorProps> = ({ onApplyCalculatedPlan }) => {
  const { siteSettings } = useApp();
  const [internetSpeed, setInternetSpeed] = useState<'100m' | '500m' | '1g' | 'none'>('500m');
  const [tvType, setTvType] = useState<'skyAll' | 'skyPoint' | 'skyChoice' | 'none'>('skyAll');
  const [wifiIncluded, setWifiIncluded] = useState(true);
  const [setTopBox, setSetTopBox] = useState<'androidUhd' | 'basic'>('androidUhd');
  const [affiliateCardDiscount, setAffiliateCardDiscount] = useState<number>(siteSettings.cardDiscount2 || 20000); // in KRW
  const [mobileComboDiscount, setMobileComboDiscount] = useState<boolean>(false);

  // Price calculations using siteSettings
  let baseInternetPrice = 0;
  let baseTvPrice = 0;
  let maxGift = 0;
  let planName = '';

  // Internet calculation
  if (internetSpeed === '100m') {
    baseInternetPrice = siteSettings.priceInternet100m ?? 17600;
    maxGift += siteSettings.giftInternet100m ?? 12;
  } else if (internetSpeed === '500m') {
    baseInternetPrice = siteSettings.priceInternet500m ?? 22000;
    maxGift += siteSettings.giftInternet500m ?? 18;
  } else if (internetSpeed === '1g') {
    baseInternetPrice = siteSettings.priceInternet1g ?? 27500;
    maxGift += siteSettings.giftInternet1g ?? 20;
  }

  // TV calculation
  if (tvType === 'skyAll') {
    baseTvPrice = siteSettings.priceTvSkyAll ?? 12100;
    maxGift += (internetSpeed !== 'none' ? (siteSettings.giftTvSkyAllCombo ?? 27) : (siteSettings.giftTvSkyAllSolo ?? 8)); // combo bonus
  } else if (tvType === 'skyPoint') {
    baseTvPrice = siteSettings.priceTvSkyPoint ?? 15400;
    maxGift += (internetSpeed !== 'none' ? (siteSettings.giftTvSkyPointCombo ?? 28) : (siteSettings.giftTvSkyPointSolo ?? 8));
  } else if (tvType === 'skyChoice') {
    baseTvPrice = siteSettings.priceTvSkyChoice ?? 14300;
    maxGift += (internetSpeed !== 'none' ? (siteSettings.giftTvSkyChoiceCombo ?? 26) : (siteSettings.giftTvSkyChoiceSolo ?? 8));
  }

  // Combo discount adjustment
  let comboDiscount = 0;
  if (internetSpeed !== 'none' && tvType !== 'none') {
    comboDiscount = siteSettings.comboDiscountAmount ?? 4400; // 결합할인
  }

  let mobileDiscount = mobileComboDiscount ? (siteSettings.mobileDiscountAmount ?? 3300) : 0;
  const standardMonthlyPrice = baseInternetPrice + baseTvPrice - comboDiscount;
  const cardAppliedMonthlyPrice = Math.max(0, standardMonthlyPrice - affiliateCardDiscount - mobileDiscount);
  const regularNonContractPrice = (standardMonthlyPrice * 1.45);
  const threeYearSavings = Math.round((regularNonContractPrice - cardAppliedMonthlyPrice) * 36 + (maxGift * 10000));

  // Determine title for apply
  const tvDisplayName = 
    tvType === 'skyAll' ? (siteSettings.nameTvSkyAll || 'Sky All') :
    tvType === 'skyPoint' ? (siteSettings.nameTvSkyPoint || 'Sky Point') :
    tvType === 'skyChoice' ? (siteSettings.nameTvSkyChoice || 'Sky Choice') : '';

  if (internetSpeed !== 'none' && tvType !== 'none') {
    planName = `[맞춤결합] 인터넷 ${internetSpeed.toUpperCase()} + TV (${tvDisplayName})`;
  } else if (internetSpeed !== 'none') {
    planName = `[맞춤단독] 인터넷 ${internetSpeed.toUpperCase()} 단독`;
  } else if (tvType !== 'none') {
    planName = `[맞춤단독] TV단독 (${tvDisplayName})`;
  } else {
    planName = '스카이라이프 맞춤 상담';
  }

  const handleApply = () => {
    const customProd: ProductItem = {
      id: 'custom-' + Date.now(),
      category: internetSpeed !== 'none' && tvType !== 'none' ? 'combo' : 'internet',
      name: planName,
      subName: `맞춤 견적: 월 ${cardAppliedMonthlyPrice.toLocaleString()}원 (제휴카드 적용 시)`,
      speed: internetSpeed !== 'none' ? internetSpeed.toUpperCase() : undefined,
      channels: tvType !== 'none' ? '239개 채널' : undefined,
      originalPrice: regularNonContractPrice,
      salePrice: standardMonthlyPrice,
      cardDiscountPrice: cardAppliedMonthlyPrice,
      giftAmount: maxGift,
      giftDescription: `최대 ${maxGift}만원 당일 현금 지급 + 기가 WiFi 지원`,
      features: [
        `인터넷 속도: ${internetSpeed === 'none' ? '없음' : internetSpeed.toUpperCase()}`,
        `TV 상품: ${tvType === 'none' ? '없음' : '239개 전 채널 UHD'}`,
        `제휴카드 할인: 매월 -${affiliateCardDiscount.toLocaleString()}원`,
        mobileComboDiscount ? `알뜰폰 추가결합 할인 적용 (-${(siteSettings.mobileDiscountAmount ?? 3300).toLocaleString()}원)` : '알뜰폰 미결합'
      ]
    };
    onApplyCalculatedPlan(customProd);
  };

  const card1 = siteSettings.cardDiscount1 ?? 15000;
  const card2 = siteSettings.cardDiscount2 ?? 20000;
  const card3 = siteSettings.cardDiscount3 ?? 25000;

  const cardHeaderNotice = siteSettings.cardHeaderNotice || '청구 할인 혜택';
  const cardLabel0 = siteSettings.cardLabel0 || '미적용';
  const cardSub0 = siteSettings.cardSub0 || '일반 납부';
  const cardSub1 = siteSettings.cardSub1 || '전월 30만원 이상';
  const cardSub2 = siteSettings.cardSub2 || '전월 70만원 이상 (추천)';
  const cardSub3 = siteSettings.cardSub3 || '전월 100만원 이상';

  return (
    <section id="calculator" className="py-12 sm:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] sm:text-xs font-bold">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>{siteSettings.calcBadgeText || '실시간 견적 시뮬레이터'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {siteSettings.calcTitle || '내 조건에 맞춘'} <span className="text-blue-600">{siteSettings.calcHighlight || '월 요금 & 현금 사은품'}</span> 계산기
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {siteSettings.calcSubtitle || '인터넷 속도와 TV 옵션, 제휴카드를 선택하시면 예상 월 요금과 지급되는 최대 사은품을 즉시 계산해 드립니다.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Options Selector (Col 7) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Step 1: Internet Speed */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                    인터넷 속도 선택
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium">KT 100% 동일망 광랜</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  { id: '100m', label: '100Mbps', sub: '웹서핑/1인가구' },
                  { id: '500m', label: '500Mbps', sub: '인기 1위 기가라이트', highlight: true },
                  { id: '1g', label: '1Gbps', sub: '초고속 기가/게이밍' },
                  { id: 'none', label: '선택 안함', sub: 'TV만 필요 시' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setInternetSpeed(item.id as any)}
                    className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all ${
                      internetSpeed === item.id
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black flex items-center justify-between">
                      <span>{item.label}</span>
                      {internetSpeed === item.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: TV Product */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                    TV 상품 선택
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
                  {siteSettings.calcTvSettopNotice || '안드로이드 4 UHD 셋톱 기본제공'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  { id: 'skyAll', label: siteSettings.nameTvSkyAll || 'Sky All', sub: siteSettings.subTvSkyAll || '239채널 전채널 UHD', highlight: true },
                  { id: 'skyPoint', label: siteSettings.nameTvSkyPoint || 'Sky Point', sub: siteSettings.subTvSkyPoint || '239채널 + VOD포인트' },
                  { id: 'skyChoice', label: siteSettings.nameTvSkyChoice || 'Sky Choice', sub: siteSettings.subTvSkyChoice || '맞춤형 장르팩' },
                  { id: 'none', label: '선택 안함', sub: '인터넷 단독 시' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTvType(item.id as any)}
                    className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all ${
                      tvType === item.id
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black flex items-center justify-between">
                      <span>{item.label}</span>
                      {tvType === item.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Affiliate Card Discount */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                    제휴카드 할인 선택
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-blue-600 font-semibold">{cardHeaderNotice}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  { discount: 0, label: cardLabel0, sub: cardSub0 },
                  { discount: card1, label: `월 -${card1.toLocaleString()}원`, sub: cardSub1 },
                  { discount: card2, label: `월 -${card2.toLocaleString()}원`, sub: cardSub2 },
                  { discount: card3, label: `월 -${card3.toLocaleString()}원`, sub: cardSub3 }
                ].map((item) => (
                  <button
                    key={item.discount}
                    onClick={() => setAffiliateCardDiscount(item.discount)}
                    className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all ${
                      affiliateCardDiscount === item.discount
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black flex items-center justify-between">
                      <span className="truncate">{item.label}</span>
                      {affiliateCardDiscount === item.discount && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Additional Combine Discounts (Mobile Combo) */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    스카이라이프 모바일(알뜰폰) 추가 결합
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500">
                    인터넷+TV 결합 시 모바일 요금 매월 추가 {(siteSettings.mobileDiscountAmount ?? 3300).toLocaleString()}원 평생 할인
                  </div>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={mobileComboDiscount}
                  onChange={(e) => setMobileComboDiscount(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 sm:w-11 h-5 sm:h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Real-time Calculation Summary Result Card (Col 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-700 space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="border-b border-slate-700 pb-3 sm:pb-4">
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 mb-1">
                  <span>선택 상품 실시간 견적</span>
                  <span className="text-emerald-400 font-bold">3년 약정 결합 기준</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  {planName}
                </h3>
              </div>

              {/* Cash Gift Payout Banner */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg space-y-1">
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-blue-100 font-medium">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
                    지급 예정 현금 사은품
                  </span>
                  <span className="bg-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {siteSettings.calcGiftBadge || '설치 당일 100% 입금'}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-300 tracking-tight">
                  {siteSettings.calcGiftPrefix || '최대'} {maxGift}0,000원
                </div>
                <div className="text-[10px] sm:text-[11px] text-blue-100">
                  {siteSettings.calcBannerNotice || '+ GiGA WiFi 공유기 무료 임대 + 셋톱박스 무상 제공'}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 sm:space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>인터넷 기본요금</span>
                  <span>{baseInternetPrice > 0 ? `${baseInternetPrice.toLocaleString()}원` : '미선택'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>TV 기본요금</span>
                  <span>{baseTvPrice > 0 ? `${baseTvPrice.toLocaleString()}원` : '미선택'}</span>
                </div>
                {comboDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>인터넷+TV 결합할인</span>
                    <span>-{comboDiscount.toLocaleString()}원</span>
                  </div>
                )}
                {affiliateCardDiscount > 0 && (
                  <div className="flex justify-between text-sky-400 font-semibold">
                    <span>제휴카드 청구할인</span>
                    <span>-{affiliateCardDiscount.toLocaleString()}원</span>
                  </div>
                )}
                {mobileComboDiscount && (
                  <div className="flex justify-between text-purple-400 font-semibold">
                    <span>알뜰폰 결합 추가할인</span>
                    <span>-{(siteSettings.mobileDiscountAmount ?? 3300).toLocaleString()}원</span>
                  </div>
                )}

                {/* Final Estimated Monthly Bill */}
                <div className="pt-3 sm:pt-4 border-t border-slate-700 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-slate-300">제휴카드 적용 시 실 납부액</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">(부가세 포함)</div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      월 {cardAppliedMonthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300"> 원</span>
                  </div>
                </div>

                {/* 3 Years Total Saving */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[10px] sm:text-[11px] text-slate-300 flex items-center justify-between">
                  <span>3년간 총 절약 예상:</span>
                  <span className="font-extrabold text-emerald-400 text-xs">
                    약 {threeYearSavings.toLocaleString()}원 상당 절감
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleApply}
                className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-1.5 sm:gap-2 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>이 계산 조건으로 상담 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
