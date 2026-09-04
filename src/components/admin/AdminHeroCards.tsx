import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Gift,
  Wifi,
  Tv,
  ShieldCheck,
  Check,
  RotateCcw,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { defaultSiteSettings } from '../../data/defaultData';

export const AdminHeroCards: React.FC = () => {
  const { siteSettings, updateSiteSettings, showToast } = useApp();

  const [card1Title, setCard1Title] = useState(siteSettings.heroCard1Title || '최대 48만원');
  const [card1Desc, setCard1Desc] = useState(siteSettings.heroCard1Desc || '당일 현금 100% 지급');

  const [card2Title, setCard2Title] = useState(siteSettings.heroCard2Title || 'KT 100% 동일망');
  const [card2Desc, setCard2Desc] = useState(siteSettings.heroCard2Desc || '초고속 끊김없는 광랜');

  const [card3Title, setCard3Title] = useState(siteSettings.heroCard3Title || '239개 채널 UHD');
  const [card3Desc, setCard3Desc] = useState(siteSettings.heroCard3Desc || '안드로이드4 OTT 셋톱');

  const [card4Title, setCard4Title] = useState(siteSettings.heroCard4Title || '공식 파트너 인증');
  const [card4Desc, setCard4Desc] = useState(siteSettings.heroCard4Desc || '안심 개통 및 보증제');

  useEffect(() => {
    setCard1Title(siteSettings.heroCard1Title || '최대 48만원');
    setCard1Desc(siteSettings.heroCard1Desc || '당일 현금 100% 지급');
    setCard2Title(siteSettings.heroCard2Title || 'KT 100% 동일망');
    setCard2Desc(siteSettings.heroCard2Desc || '초고속 끊김없는 광랜');
    setCard3Title(siteSettings.heroCard3Title || '239개 채널 UHD');
    setCard3Desc(siteSettings.heroCard3Desc || '안드로이드4 OTT 셋톱');
    setCard4Title(siteSettings.heroCard4Title || '공식 파트너 인증');
    setCard4Desc(siteSettings.heroCard4Desc || '안심 개통 및 보증제');
  }, [siteSettings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      heroCard1Title: card1Title,
      heroCard1Desc: card1Desc,
      heroCard2Title: card2Title,
      heroCard2Desc: card2Desc,
      heroCard3Title: card3Title,
      heroCard3Desc: card3Desc,
      heroCard4Title: card4Title,
      heroCard4Desc: card4Desc,
    });
    showToast('4대 혜택 카드 문구가 메인 화면에 즉시 반영되었습니다.', 'success');
  };

  const handleReset = () => {
    if (window.confirm('4대 혜택 카드 문구를 기본값(최대 48만원, KT 100% 동일망 등)으로 초기화하시겠습니까?')) {
      const def1Title = defaultSiteSettings.heroCard1Title || '최대 48만원';
      const def1Desc = defaultSiteSettings.heroCard1Desc || '당일 현금 100% 지급';
      const def2Title = defaultSiteSettings.heroCard2Title || 'KT 100% 동일망';
      const def2Desc = defaultSiteSettings.heroCard2Desc || '초고속 끊김없는 광랜';
      const def3Title = defaultSiteSettings.heroCard3Title || '239개 채널 UHD';
      const def3Desc = defaultSiteSettings.heroCard3Desc || '안드로이드4 OTT 셋톱';
      const def4Title = defaultSiteSettings.heroCard4Title || '공식 파트너 인증';
      const def4Desc = defaultSiteSettings.heroCard4Desc || '안심 개통 및 보증제';

      setCard1Title(def1Title);
      setCard1Desc(def1Desc);
      setCard2Title(def2Title);
      setCard2Desc(def2Desc);
      setCard3Title(def3Title);
      setCard3Desc(def3Desc);
      setCard4Title(def4Title);
      setCard4Desc(def4Desc);

      updateSiteSettings({
        heroCard1Title: def1Title,
        heroCard1Desc: def1Desc,
        heroCard2Title: def2Title,
        heroCard2Desc: def2Desc,
        heroCard3Title: def3Title,
        heroCard3Desc: def3Desc,
        heroCard4Title: def4Title,
        heroCard4Desc: def4Desc,
      });

      showToast('기본 문구로 복원되었습니다.', 'info');
    }
  };

  // Quick Presets
  const applyPreset = (preset: {
    c1t: string; c1d: string;
    c2t: string; c2d: string;
    c3t: string; c3d: string;
    c4t: string; c4d: string;
  }) => {
    setCard1Title(preset.c1t);
    setCard1Desc(preset.c1d);
    setCard2Title(preset.c2t);
    setCard2Desc(preset.c2d);
    setCard3Title(preset.c3t);
    setCard3Desc(preset.c3d);
    setCard4Title(preset.c4t);
    setCard4Desc(preset.c4d);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
      {/* Top Title & Header Action Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  4대 혜택 카드 설정
                </h2>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  메인 최상단
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                홈페이지 메인 화면 상단의 4개 핵심 혜택 카드(최대 48만원, KT 동일망 등)의 큰 글자와 설명을 수정합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            기본값 복원
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            4대 카드 저장하기
          </button>
        </div>
      </div>

      {/* Live Landing Hero Realtime Preview */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-lg text-white space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-300">
              메인 화면 실시간 미리보기 (Live Preview)
            </span>
          </div>
          <span className="text-[10px] text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/50">
            방문자에게 이렇게 보입니다
          </span>
        </div>

        {/* The 4 Cards in Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Preview Card 1 */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-blue-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-black text-sm text-white truncate">
                {card1Title || '최대 48만원'}
              </div>
              <div className="text-[11px] text-blue-300 truncate">
                {card1Desc || '당일 현금 100% 지급'}
              </div>
            </div>
          </div>

          {/* Preview Card 2 */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-black text-sm text-white truncate">
                {card2Title || 'KT 100% 동일망'}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {card2Desc || '초고속 끊김없는 광랜'}
              </div>
            </div>
          </div>

          {/* Preview Card 3 */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 flex items-center justify-center shrink-0">
              <Tv className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-black text-sm text-white truncate">
                {card3Title || '239개 채널 UHD'}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {card3Desc || '안드로이드4 OTT 셋톱'}
              </div>
            </div>
          </div>

          {/* Preview Card 4 */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-black text-sm text-white truncate">
                {card4Title || '공식 파트너 인증'}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {card4Desc || '안심 개통 및 보증제'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Presets Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>원클릭 추천 문구 템플릿</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <button
            type="button"
            onClick={() =>
              applyPreset({
                c1t: '최대 48만원',
                c1d: '당일 현금 100% 지급',
                c2t: 'KT 100% 동일망',
                c2d: '초고속 끊김없는 광랜',
                c3t: '239개 채널 UHD',
                c3d: '안드로이드4 OTT 셋톱',
                c4t: '공식 파트너 인증',
                c4d: '안심 개통 및 보증제',
              })
            }
            className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600">
              1. 기본 정석형
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              최대 48만원 + KT 동일망 + 239개 UHD + 공식인증
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              applyPreset({
                c1t: '현금 최대 지원',
                c1d: '설치 당일 계좌 전액 입금',
                c2t: 'KT 기가 와이파이',
                c2d: '최신 WiFi 공유기 무상임대',
                c3t: '넷플릭스/유튜브',
                c3d: '스마트 UHD 셋톱박스 탑재',
                c4t: '1:1 전담 플래너',
                c4d: '맞춤형 최대 할인 컨설팅',
              })
            }
            className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600">
              2. 혜택/사은품 강조형
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              현금 최대지원 + WiFi 무상 + OTT 탑재 + 전담플래너
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              applyPreset({
                c1t: '월 2만원대 알뜰가',
                c1d: '타사 대비 통신비 30% 절감',
                c2t: '전국 100% 동일품질',
                c2d: 'KT 본사 광대역 광케이블망',
                c3t: '4K 초고화질 TV',
                c3d: '생생한 화질의 239개 채널',
                c4t: '본사 공식 직영점',
                c4d: '약정 만료 재가입 1위 센터',
              })
            }
            className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-blue-600">
              3. 가성비/품질 강조형
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              월 2만원대 + 100% 동일품질 + 4K 초고화질 + 공식 직영
            </div>
          </button>
        </div>
      </div>

      {/* Detailed Card Edit Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-blue-100 hover:border-blue-300 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                  CARD 1 • 사은품 혜택
                </span>
                <h3 className="font-bold text-slate-900 text-sm">1번째 카드 문구</h3>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
              현금 사은품 강조
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                카드 큰 제목 (강조 문구)
              </label>
              <input
                type="text"
                value={card1Title}
                onChange={(e) => setCard1Title(e.target.value)}
                placeholder="최대 48만원"
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-black text-sm text-slate-900 transition-colors"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                하단 부가 설명 문구
              </label>
              <input
                type="text"
                value={card1Desc}
                onChange={(e) => setCard1Desc(e.target.value)}
                placeholder="당일 현금 100% 지급"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-medium text-xs text-slate-700 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-blue-300 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  CARD 2 • 통신망 & 품질
                </span>
                <h3 className="font-bold text-slate-900 text-sm">2번째 카드 문구</h3>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
              품질 보증
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                카드 큰 제목 (강조 문구)
              </label>
              <input
                type="text"
                value={card2Title}
                onChange={(e) => setCard2Title(e.target.value)}
                placeholder="KT 100% 동일망"
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-black text-sm text-slate-900 transition-colors"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                하단 부가 설명 문구
              </label>
              <input
                type="text"
                value={card2Desc}
                onChange={(e) => setCard2Desc(e.target.value)}
                placeholder="초고속 끊김없는 광랜"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-medium text-xs text-slate-700 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-blue-300 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  CARD 3 • TV 채널 & 셋톱
                </span>
                <h3 className="font-bold text-slate-900 text-sm">3번째 카드 문구</h3>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
              UHD OTT 지원
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                카드 큰 제목 (강조 문구)
              </label>
              <input
                type="text"
                value={card3Title}
                onChange={(e) => setCard3Title(e.target.value)}
                placeholder="239개 채널 UHD"
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-black text-sm text-slate-900 transition-colors"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                하단 부가 설명 문구
              </label>
              <input
                type="text"
                value={card3Desc}
                onChange={(e) => setCard3Desc(e.target.value)}
                placeholder="안드로이드4 OTT 셋톱"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-medium text-xs text-slate-700 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-blue-300 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  CARD 4 • 공식 인증 & 보증
                </span>
                <h3 className="font-bold text-slate-900 text-sm">4번째 카드 문구</h3>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
              안심 가입
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                카드 큰 제목 (강조 문구)
              </label>
              <input
                type="text"
                value={card4Title}
                onChange={(e) => setCard4Title(e.target.value)}
                placeholder="공식 파트너 인증"
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-black text-sm text-slate-900 transition-colors"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                하단 부가 설명 문구
              </label>
              <input
                type="text"
                value={card4Desc}
                onChange={(e) => setCard4Desc(e.target.value)}
                placeholder="안심 개통 및 보증제"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-medium text-xs text-slate-700 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Fixed/Float bar */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-black text-sm text-white">
              수정한 문구를 저장하시겠습니까?
            </div>
            <div className="text-xs text-slate-400">
              저장 즉시 메인 화면에 반영되며 Firebase 클라우드 DB에 영구 보관됩니다.
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          4대 카드 문구 저장하기
        </button>
      </div>
    </form>
  );
};
