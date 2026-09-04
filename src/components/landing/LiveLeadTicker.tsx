import React from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, CheckCircle2, Clock } from 'lucide-react';

export const LiveLeadTicker: React.FC = () => {
  const { leads, siteSettings } = useApp();

  // Combine real leads with fallback realistic ticker items
  const tickerItems = [
    { name: '김*수', region: '서울 강남구', product: '인터넷 500M + Sky All', benefit: '현금 45만원 입금완료', time: '방금 전' },
    { name: '박*현', region: '인천 연수구', product: '인터넷 1G + TV', benefit: '현금 48만원 지급완료', time: '12분 전' },
    { name: '이*진', region: '경기 수원시', product: '인터넷 500M + TV', benefit: '상담예약 접수완료', time: '25분 전' },
    { name: '최*민', region: '부산 해운대구', product: '스카이라이프 결합', benefit: '현금 45만원 당일지급', time: '40분 전' },
    { name: '정*우', region: '대전 유성구', product: '인터넷 단독 500M', benefit: '사은품 18만원 지급완료', time: '1시간 전' },
    ...leads.slice(0, 4).map((l) => ({
      name: l.name,
      region: l.region.split(' ').slice(0, 2).join(' ') || '전국',
      product: l.productName,
      benefit: l.status === '개통완료' ? '개통 및 사은품 전액 지급완료' : '가입상담 접수완료',
      time: '오늘'
    }))
  ];

  return (
    <div className="bg-slate-900 text-white py-3 border-y border-slate-800 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        {/* Left Badge */}
        <div className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Gift className="w-3.5 h-3.5" />
          <span>{siteSettings.tickerTitle || '실시간 사은품 지급 현황'}</span>
        </div>

        {/* Marquee Items */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-8 animate-[marquee_28s_linear_infinite] whitespace-nowrap text-xs text-slate-300">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-bold text-white">[{item.region}] {item.name} 고객님</span>
                <span className="text-slate-400">|</span>
                <span className="text-sky-300">{item.product}</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  <CheckCircle2 className="w-3 h-3" />
                  {item.benefit}
                </span>
                <span className="text-slate-500 flex items-center gap-0.5">
                  <Clock className="w-3 h-3" /> {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
