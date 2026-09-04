import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, CheckCircle, Gift, ThumbsUp, MessageSquare } from 'lucide-react';

export const ReviewSection: React.FC = () => {
  const { reviews, siteSettings } = useApp();

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] sm:text-xs font-bold">
            <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
            <span>{siteSettings.reviewSecBadge || '고객 감동 리얼 후기'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {siteSettings.reviewSecTitle || '개통 고객님들이 직접 증명하는'}{' '}
            <span className="text-blue-600">{siteSettings.reviewSecHighlight || '만족도 99.8%'}</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {siteSettings.reviewSecSubtitle || '사은품 당일 지급 완료 인증과 설치 사진을 실시간으로 확인해보세요.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo Preview if available */}
                {rev.imageUrl && (
                  <div className="mb-3 sm:mb-4 h-36 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img
                      src={rev.imageUrl}
                      alt="설치 사진"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      실제 설치 인증
                    </div>
                  </div>
                )}

                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400">{rev.date}</span>
                </div>

                {/* Gift Payout Badge */}
                <div className="mb-2 sm:mb-3 inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] sm:text-xs font-bold border border-emerald-200">
                  <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                  <span>{rev.giftReceived}</span>
                </div>

                {/* Comment */}
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-normal line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Customer Info Footer */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-xs">{rev.customerName} 고객님</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">{rev.region}</div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded truncate max-w-[120px]">
                  {rev.productName.split('+')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
