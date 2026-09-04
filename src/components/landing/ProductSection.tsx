import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, ProductItem } from '../../types';
import { Check, Gift, Sparkles, Wifi, Tv, ArrowRight, CreditCard, ChevronDown } from 'lucide-react';

interface ProductSectionProps {
  onSelectProductToApply: (product: ProductItem) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ onSelectProductToApply }) => {
  const { products, siteSettings } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setExpandedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    { id: 'all', label: '전체 상품' },
    { id: 'combo', label: '인터넷+TV 결합 (추천)' },
    { id: 'internet', label: '인터넷 단독' },
    { id: 'tv', label: 'TV 단독' },
    { id: 'mobile', label: '알뜰폰 결합' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-12 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{siteSettings.productSecBadge || 'KT SKYLIFE 정직한 요금제'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {siteSettings.productSecTitle || '내게 딱 맞는 상품 찾고'}{' '}
            <span className="text-blue-600">{siteSettings.productSecHighlight || '최대 사은품'}</span>{' '}
            {siteSettings.productSecTitleSuffix || '받기'}
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {siteSettings.productSecSubtitle || 'KT 100% 동일망 인터넷과 239개 채널 UHD TV를 결합하여 매월 통신비를 아끼고 당일 현금 혜택까지 누리세요.'}
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-3 sm:pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory | 'all')}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-102 sm:scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
          {filteredProducts.map((prod) => {
            const isExpanded = !!expandedCardIds[prod.id];

            return (
              <div
                key={prod.id}
                onClick={() => {
                  toggleCard(prod.id);
                }}
                className={`rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between transition-all duration-300 relative cursor-pointer md:cursor-default ${
                  prod.isPopular
                    ? 'bg-gradient-to-b from-blue-50/50 to-white border-2 border-blue-600 shadow-md sm:shadow-xl shadow-blue-500/10'
                    : 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg shadow-2xs'
                }`}
              >
                <div>
                  {/* Badge & Speed */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-4">
                    {prod.badge ? (
                      <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-black ${prod.badgeColor || 'bg-blue-600 text-white'}`}>
                        {prod.badge}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-slate-100 text-slate-600">
                        스카이라이프
                      </span>
                    )}
                    {prod.speed && (
                      <span className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg">
                        <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {prod.speed}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-0.5 sm:space-y-1 mb-2.5 sm:mb-5">
                    <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                      {prod.subName}
                    </p>
                  </div>

                  {/* Mobile Compact Summary Row (Visible only on mobile) */}
                  <div className="md:hidden flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Gift className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold">{prod.giftTimingText || '당일 지급'}</div>
                        <div className="text-xs font-black text-blue-700">최대 {prod.giftAmount}만원</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">3년 약정 결합가</div>
                      <div className="text-sm font-black text-slate-900">
                        월 {prod.salePrice.toLocaleString()}<span className="text-[10px] font-normal text-slate-500">원</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Tap-to-expand Indicator */}
                  <div className="md:hidden flex items-center justify-between px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold transition-colors">
                    <span>{isExpanded ? '세부내용 접기' : '세부내용 보기 (사은품 및 혜택)'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-500' : 'text-blue-700'}`} />
                  </div>
                </div>

                {/* Detailed Content (Always visible on desktop md+, toggleable on mobile) */}
                <div className={`${isExpanded ? 'block' : 'hidden md:block'} pt-3 md:pt-0`}>
                  {/* Maximum Gift Benefit Highlight Box */}
                  <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-blue-100 font-medium mb-0.5">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-yellow-300" />
                        설치 당일 100% 현금 사은품
                      </span>
                      <span className="font-bold text-yellow-300">{prod.giftTimingText || '당일 지급'}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl sm:text-3xl font-black text-yellow-300 tracking-tight">
                        최대 {prod.giftAmount}만원
                      </span>
                      <span className="text-[11px] sm:text-xs text-blue-100">{prod.giftMethodText || '계좌 전액 입금'}</span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-blue-100 mt-1 border-t border-white/20 pt-1">
                      {prod.giftDescription}
                    </div>
                  </div>

                  {/* Price Details */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-100">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                      <span>정상 요금 (무약정 기준)</span>
                      <span className="line-through">{prod.originalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-700">3년 약정 결합가</span>
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-black text-slate-900">
                          월 {prod.salePrice.toLocaleString()}
                        </span>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-500"> 원/월</span>
                      </div>
                    </div>

                    {prod.cardDiscountPrice !== undefined && (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] sm:text-xs">
                        <span className="flex items-center gap-1 text-slate-600 font-semibold">
                          <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                          제휴카드 최대 할인 시
                        </span>
                        <span className="font-extrabold text-blue-600">
                          월 {prod.cardDiscountPrice.toLocaleString()}원
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-8 flex-1">
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-700">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Apply Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProductToApply(prod);
                    }}
                    className={`w-full py-3 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-[0.98] ${
                      prod.isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    <span>이 상품으로 가입 상담 신청</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Mobile-only collapse button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(prod.id);
                    }}
                    className="md:hidden w-full mt-3 py-2 text-center text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1"
                  >
                    <span>세부내용 닫기</span>
                    <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
