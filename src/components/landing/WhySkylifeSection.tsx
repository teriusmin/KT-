import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, DollarSign, Tv, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export const WhySkylifeSection: React.FC = () => {
  const { siteSettings } = useApp();

  const points = [
    {
      icon: Wifi,
      title: siteSettings.whyCard1Title || 'KT 100% 동일한 광케이블망',
      subtitle: siteSettings.whyCard1Sub || '품질과 A/S는 본사 그대로',
      desc: siteSettings.whyCard1Desc || 'KT의 전국 백본망과 광대역 통신망을 100% 동일하게 사용하여 게임, 재택근무, 고화질 스트리밍에서도 끊김 없는 최상의 속도를 보장합니다.',
      tag: siteSettings.whyCard1Tag || '동일 품질 보증'
    },
    {
      icon: DollarSign,
      title: siteSettings.whyCard2Title || '타사 대비 월 30% 알뜰한 요금',
      subtitle: siteSettings.whyCard2Sub || '3년 약정 시 최대 60만원 절약',
      desc: siteSettings.whyCard2Desc || '불필요한 마케팅 비용을 뺀 합리적인 다이렉트 요금제로, 동일한 500M 인터넷+TV를 타사 4만원대 대신 2만원대에 이용할 수 있습니다.',
      tag: siteSettings.whyCard2Tag || '가계 통신비 절감'
    },
    {
      icon: Tv,
      title: siteSettings.whyCard3Title || '안드로이드 4 UHD 스마트 셋톱',
      subtitle: siteSettings.whyCard3Sub || '유튜브, 넷플릭스, 디즈니+ 완벽 지원',
      desc: siteSettings.whyCard3Desc || '별도의 크롬캐스트나 미러링 없이 리모컨 클릭 한 번으로 유튜브, 넷플릭스, 디즈니+, 티빙, 웨이브 등 모든 OTT를 대화면 4K 초고화질로 감상하세요.',
      tag: siteSettings.whyCard3Tag || '스마트 OTT 내장'
    },
    {
      icon: ShieldCheck,
      title: siteSettings.whyCard4Title || '100% 당일 현금 사은품 보증제',
      subtitle: siteSettings.whyCard4Sub || '설치 즉시 계좌로 전액 입금',
      desc: siteSettings.whyCard4Desc || '본사 공식 직영 가입센터로서 상품권 분할 지급이나 지연 없이, 설치 완료 당일 약속된 사은품 전액을 고객님 명의 계좌로 즉시 입금해 드립니다.',
      tag: siteSettings.whyCard4Tag || '당일 전액 입금'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold border border-blue-200">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>{siteSettings.whyBadge || '왜 KT 스카이라이프일까요?'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {siteSettings.whyTitle || 'KT의 품질 그대로,'}{' '}
            <span className="text-blue-600">
              {siteSettings.whyHighlight || '요금과 혜택은 압도적으로!'}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {siteSettings.whySubtitle || '수많은 고객님들이 약정 만료 후 KT 스카이라이프로 선택을 바꾸시는 결정적인 이유입니다.'}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-blue-100/70 text-blue-700 text-[10px] sm:text-[11px] font-bold">
                      {pt.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-0.5 sm:mb-1 leading-snug">
                    {pt.title}
                  </h3>
                  <div className="text-xs font-bold text-blue-600 mb-2 sm:mb-3">
                    {pt.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>공식 인증 서비스 보장</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
