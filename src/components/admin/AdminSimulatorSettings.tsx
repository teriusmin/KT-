import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Sparkles, Save, RotateCcw, HelpCircle, CheckCircle2, Wifi, Tv, CreditCard, Smartphone } from 'lucide-react';

export const AdminSimulatorSettings: React.FC = () => {
  const { siteSettings, updateSiteSettings, showToast } = useApp();

  // Text state
  const [calcBadgeText, setCalcBadgeText] = useState(siteSettings.calcBadgeText || '실시간 견적 시뮬레이터');
  const [calcTitle, setCalcTitle] = useState(siteSettings.calcTitle || '내 조건에 맞춘');
  const [calcHighlight, setCalcHighlight] = useState(siteSettings.calcHighlight || '월 요금 & 현금 사은품');
  const [calcSubtitle, setCalcSubtitle] = useState(siteSettings.calcSubtitle || '인터넷 속도와 TV 옵션, 제휴카드를 선택하시면 예상 월 요금과 지급되는 최대 사은품을 즉시 계산해 드립니다.');
  const [calcBannerNotice, setCalcBannerNotice] = useState(siteSettings.calcBannerNotice || '+ GiGA WiFi 공유기 무료 임대 + 셋톱박스 무상 제공');
  const [calcGiftPrefix, setCalcGiftPrefix] = useState(siteSettings.calcGiftPrefix || '최대');
  const [calcGiftBadge, setCalcGiftBadge] = useState(siteSettings.calcGiftBadge || '설치 당일 100% 입금');
  const [calcTvSettopNotice, setCalcTvSettopNotice] = useState(siteSettings.calcTvSettopNotice || '안드로이드 4 UHD 셋톱 기본제공');

  // Rates & Prices
  const [priceInternet100m, setPriceInternet100m] = useState(siteSettings.priceInternet100m ?? 17600);
  const [giftInternet100m, setGiftInternet100m] = useState(siteSettings.giftInternet100m ?? 12);

  const [priceInternet500m, setPriceInternet500m] = useState(siteSettings.priceInternet500m ?? 22000);
  const [giftInternet500m, setGiftInternet500m] = useState(siteSettings.giftInternet500m ?? 18);

  const [priceInternet1g, setPriceInternet1g] = useState(siteSettings.priceInternet1g ?? 27500);
  const [giftInternet1g, setGiftInternet1g] = useState(siteSettings.giftInternet1g ?? 20);

  // TV Options
  const [nameTvSkyAll, setNameTvSkyAll] = useState(siteSettings.nameTvSkyAll || 'Sky All');
  const [subTvSkyAll, setSubTvSkyAll] = useState(siteSettings.subTvSkyAll || '239채널 전채널 UHD');
  const [priceTvSkyAll, setPriceTvSkyAll] = useState(siteSettings.priceTvSkyAll ?? 12100);
  const [giftTvSkyAllCombo, setGiftTvSkyAllCombo] = useState(siteSettings.giftTvSkyAllCombo ?? 27);
  const [giftTvSkyAllSolo, setGiftTvSkyAllSolo] = useState(siteSettings.giftTvSkyAllSolo ?? 8);

  const [nameTvSkyPoint, setNameTvSkyPoint] = useState(siteSettings.nameTvSkyPoint || 'Sky Point');
  const [subTvSkyPoint, setSubTvSkyPoint] = useState(siteSettings.subTvSkyPoint || '239채널 + VOD포인트');
  const [priceTvSkyPoint, setPriceTvSkyPoint] = useState(siteSettings.priceTvSkyPoint ?? 15400);
  const [giftTvSkyPointCombo, setGiftTvSkyPointCombo] = useState(siteSettings.giftTvSkyPointCombo ?? 28);
  const [giftTvSkyPointSolo, setGiftTvSkyPointSolo] = useState(siteSettings.giftTvSkyPointSolo ?? 8);

  const [nameTvSkyChoice, setNameTvSkyChoice] = useState(siteSettings.nameTvSkyChoice || 'Sky Choice');
  const [subTvSkyChoice, setSubTvSkyChoice] = useState(siteSettings.subTvSkyChoice || '맞춤형 장르팩');
  const [priceTvSkyChoice, setPriceTvSkyChoice] = useState(siteSettings.priceTvSkyChoice ?? 14300);
  const [giftTvSkyChoiceCombo, setGiftTvSkyChoiceCombo] = useState(siteSettings.giftTvSkyChoiceCombo ?? 26);
  const [giftTvSkyChoiceSolo, setGiftTvSkyChoiceSolo] = useState(siteSettings.giftTvSkyChoiceSolo ?? 8);

  // Discounts & Cards
  const [comboDiscountAmount, setComboDiscountAmount] = useState(siteSettings.comboDiscountAmount ?? 4400);
  const [mobileDiscountAmount, setMobileDiscountAmount] = useState(siteSettings.mobileDiscountAmount ?? 3300);
  const [cardDiscount1, setCardDiscount1] = useState(siteSettings.cardDiscount1 ?? 15000);
  const [cardDiscount2, setCardDiscount2] = useState(siteSettings.cardDiscount2 ?? 20000);
  const [cardDiscount3, setCardDiscount3] = useState(siteSettings.cardDiscount3 ?? 25000);

  const [cardHeaderNotice, setCardHeaderNotice] = useState(siteSettings.cardHeaderNotice || '청구 할인 혜택');
  const [cardLabel0, setCardLabel0] = useState(siteSettings.cardLabel0 || '미적용');
  const [cardSub0, setCardSub0] = useState(siteSettings.cardSub0 || '일반 납부');
  const [cardSub1, setCardSub1] = useState(siteSettings.cardSub1 || '전월 30만원 이상');
  const [cardSub2, setCardSub2] = useState(siteSettings.cardSub2 || '전월 70만원 이상 (추천)');
  const [cardSub3, setCardSub3] = useState(siteSettings.cardSub3 || '전월 100만원 이상');

  // Consultation Form Card Options
  const [formCardTitle, setFormCardTitle] = useState(siteSettings.formCardTitle || '제휴카드 신청 (선택)');
  const [formCardNotice, setFormCardNotice] = useState(siteSettings.formCardNotice || '매월 최대 20,000원 추가 청구할인');
  const [formCardOption0, setFormCardOption0] = useState(siteSettings.formCardOption0 || '미신청 (일반 납부)');
  const [formCardOption1, setFormCardOption1] = useState(siteSettings.formCardOption1 || '1. 30만원 이상 사용 > 15,000원 할인');
  const [formCardOption2, setFormCardOption2] = useState(siteSettings.formCardOption2 || '2. 70만원 이상 사용 > 16,000원 할인');
  const [formCardOption3, setFormCardOption3] = useState(siteSettings.formCardOption3 || '3. 120만원 이상 사용 > 20,000원 할인');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      calcBadgeText,
      calcTitle,
      calcHighlight,
      calcSubtitle,
      calcBannerNotice,
      calcGiftPrefix,
      calcGiftBadge,
      calcTvSettopNotice,

      priceInternet100m: Number(priceInternet100m),
      giftInternet100m: Number(giftInternet100m),
      priceInternet500m: Number(priceInternet500m),
      giftInternet500m: Number(giftInternet500m),
      priceInternet1g: Number(priceInternet1g),
      giftInternet1g: Number(giftInternet1g),

      priceTvSkyAll: Number(priceTvSkyAll),
      giftTvSkyAllCombo: Number(giftTvSkyAllCombo),
      giftTvSkyAllSolo: Number(giftTvSkyAllSolo),
      nameTvSkyAll,
      subTvSkyAll,

      priceTvSkyPoint: Number(priceTvSkyPoint),
      giftTvSkyPointCombo: Number(giftTvSkyPointCombo),
      giftTvSkyPointSolo: Number(giftTvSkyPointSolo),
      nameTvSkyPoint,
      subTvSkyPoint,

      priceTvSkyChoice: Number(priceTvSkyChoice),
      giftTvSkyChoiceCombo: Number(giftTvSkyChoiceCombo),
      giftTvSkyChoiceSolo: Number(giftTvSkyChoiceSolo),
      nameTvSkyChoice,
      subTvSkyChoice,

      comboDiscountAmount: Number(comboDiscountAmount),
      mobileDiscountAmount: Number(mobileDiscountAmount),
      cardDiscount1: Number(cardDiscount1),
      cardDiscount2: Number(cardDiscount2),
      cardDiscount3: Number(cardDiscount3),
      cardHeaderNotice,
      cardLabel0,
      cardSub0,
      cardSub1,
      cardSub2,
      cardSub3,

      formCardTitle,
      formCardNotice,
      formCardOption0,
      formCardOption1,
      formCardOption2,
      formCardOption3,
    });
    showToast('견적 시뮬레이터 및 신청서 설정이 저장되었습니다.', 'success');
  };

  const handleResetDefaults = () => {
    setCalcBadgeText('실시간 견적 시뮬레이터');
    setCalcTitle('내 조건에 맞춘');
    setCalcHighlight('월 요금 & 현금 사은품');
    setCalcSubtitle('인터넷 속도와 TV 옵션, 제휴카드를 선택하시면 예상 월 요금과 지급되는 최대 사은품을 즉시 계산해 드립니다.');
    setCalcBannerNotice('+ GiGA WiFi 공유기 무료 임대 + 셋톱박스 무상 제공');
    setCalcGiftPrefix('최대');
    setCalcGiftBadge('설치 당일 100% 입금');
    setCalcTvSettopNotice('안드로이드 4 UHD 셋톱 기본제공');

    setPriceInternet100m(17600);
    setGiftInternet100m(12);
    setPriceInternet500m(22000);
    setGiftInternet500m(18);
    setPriceInternet1g(27500);
    setGiftInternet1g(20);

    setNameTvSkyAll('Sky All');
    setSubTvSkyAll('239채널 전채널 UHD');
    setPriceTvSkyAll(12100);
    setGiftTvSkyAllCombo(27);
    setGiftTvSkyAllSolo(8);

    setNameTvSkyPoint('Sky Point');
    setSubTvSkyPoint('239채널 + VOD포인트');
    setPriceTvSkyPoint(15400);
    setGiftTvSkyPointCombo(28);
    setGiftTvSkyPointSolo(8);

    setNameTvSkyChoice('Sky Choice');
    setSubTvSkyChoice('맞춤형 장르팩');
    setPriceTvSkyChoice(14300);
    setGiftTvSkyChoiceCombo(26);
    setGiftTvSkyChoiceSolo(8);

    setComboDiscountAmount(4400);
    setMobileDiscountAmount(3300);
    setCardDiscount1(15000);
    setCardDiscount2(20000);
    setCardDiscount3(25000);

    setCardHeaderNotice('청구 할인 혜택');
    setCardLabel0('미적용');
    setCardSub0('일반 납부');
    setCardSub1('전월 30만원 이상');
    setCardSub2('전월 70만원 이상 (추천)');
    setCardSub3('전월 100만원 이상');

    setFormCardTitle('제휴카드 신청 (선택)');
    setFormCardNotice('매월 최대 20,000원 추가 청구할인');
    setFormCardOption0('미신청 (일반 납부)');
    setFormCardOption1('1. 30만원 이상 사용 > 15,000원 할인');
    setFormCardOption2('2. 70만원 이상 사용 > 16,000원 할인');
    setFormCardOption3('3. 120만원 이상 사용 > 20,000원 할인');

    showToast('기본값으로 되돌렸습니다. [저장] 버튼을 눌러 적용하세요.', 'info');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50 border border-blue-200 p-4 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">
              실시간 견적 시뮬레이터 커스텀 설정
            </div>
            <div className="text-xs text-slate-600">
              랜딩페이지의 계산기 문구, 속도별 기본요금, 사은품 금액, 결합할인 폭을 원하는 값으로 즉시 수정할 수 있습니다.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>기본값 복원</span>
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-transform active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>시뮬레이터 설정 저장</span>
          </button>
        </div>
      </div>

      {/* 1. Header Text Customization */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-black text-base text-slate-900 flex items-center gap-2 border-b pb-3">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>시뮬레이터 제목 및 안내 문구 설정</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">상단 뱃지 텍스트</label>
            <input
              type="text"
              value={calcBadgeText}
              onChange={(e) => setCalcBadgeText(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
              placeholder="예: 실시간 견적 시뮬레이터"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">사은품 접두 문구</label>
            <input
              type="text"
              value={calcGiftPrefix}
              onChange={(e) => setCalcGiftPrefix(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
              placeholder="예: 최대"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">사은품 우측 뱃지 문구 (예: 설치 당일 100% 입금)</label>
            <input
              type="text"
              value={calcGiftBadge}
              onChange={(e) => setCalcGiftBadge(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900 font-bold text-blue-700"
              placeholder="예: 설치 당일 100% 입금 또는 현금 입금"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">메인 타이틀 앞부분</label>
            <input
              type="text"
              value={calcTitle}
              onChange={(e) => setCalcTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
              placeholder="예: 내 조건에 맞춘"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">강조 포인트 타이틀 (파란색)</label>
            <input
              type="text"
              value={calcHighlight}
              onChange={(e) => setCalcHighlight(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900 font-bold text-blue-600"
              placeholder="예: 월 요금 & 현금 사은품"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">시뮬레이터 설명 문구</label>
            <input
              type="text"
              value={calcSubtitle}
              onChange={(e) => setCalcSubtitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
              placeholder="설명 문구를 입력하세요"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">사은품 결과 배너 하단 혜택 텍스트</label>
            <input
              type="text"
              value={calcBannerNotice}
              onChange={(e) => setCalcBannerNotice(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-900"
              placeholder="예: + GiGA WiFi 공유기 무료 임대 + 셋톱박스 무상 제공"
            />
          </div>
        </div>
      </div>

      {/* 2. Internet Speeds & Pricing */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-black text-base text-slate-900 flex items-center gap-2 border-b pb-3">
          <Wifi className="w-4 h-4 text-blue-600" />
          <span>인터넷 속도별 요금 및 사은품 (단위: 원 / 만원)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* 100M */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>100Mbps (광랜)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 font-bold">기본</span>
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">월 기본요금 (원)</label>
              <input
                type="number"
                value={priceInternet100m}
                onChange={(e) => setPriceInternet100m(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-white text-blue-600 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">제공 사은품 (만원)</label>
              <input
                type="number"
                value={giftInternet100m}
                onChange={(e) => setGiftInternet100m(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-white text-yellow-600 font-black"
              />
            </div>
          </div>

          {/* 500M */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
            <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>500Mbps (기가라이트)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-bold">인기 1위</span>
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">월 기본요금 (원)</label>
              <input
                type="number"
                value={priceInternet500m}
                onChange={(e) => setPriceInternet500m(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-white text-blue-600 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">제공 사은품 (만원)</label>
              <input
                type="number"
                value={giftInternet500m}
                onChange={(e) => setGiftInternet500m(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-white text-yellow-600 font-black"
              />
            </div>
          </div>

          {/* 1G */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>1Gbps (초고속 기가)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">게이밍</span>
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">월 기본요금 (원)</label>
              <input
                type="number"
                value={priceInternet1g}
                onChange={(e) => setPriceInternet1g(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-white text-blue-600 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">제공 사은품 (만원)</label>
              <input
                type="number"
                value={giftInternet1g}
                onChange={(e) => setGiftInternet1g(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-white text-yellow-600 font-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. TV Options & Pricing */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
            <Tv className="w-4 h-4 text-blue-600" />
            <span>TV 상품별 이름, 요금 및 사은품 (단위: 원 / 만원)</span>
          </h3>
        </div>

        {/* TV Header notice customize */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs">
          <label className="block font-bold text-slate-800 mb-1">
            TV 상품 선택 헤더 우측 안내 문구 (기본: 안드로이드 4 UHD 셋톱 기본제공)
          </label>
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <input
              type="text"
              value={calcTvSettopNotice}
              onChange={(e) => setCalcTvSettopNotice(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-blue-200 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20"
              placeholder="예: 안드로이드 4 UHD 셋톱 기본제공"
            />
            <button
              type="button"
              onClick={() => setCalcTvSettopNotice('안드로이드 4 UHD 셋톱 기본제공')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold shrink-0 transition-colors"
            >
              문구 기본값
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            ※ 실시간 계산기의 '2. TV 상품 선택' 제목 우측에 표시되는 안내 텍스트입니다. (예: 최신 UHD 4 셋탑 무료 임대 등)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Sky All */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-bold">1번 TV (대표)</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">TV 상품명</label>
              <input
                type="text"
                value={nameTvSkyAll}
                onChange={(e) => setNameTvSkyAll(e.target.value)}
                placeholder="예: Sky All"
                className="w-full p-2 rounded-xl border bg-white font-extrabold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">상품 부가 설명</label>
              <input
                type="text"
                value={subTvSkyAll}
                onChange={(e) => setSubTvSkyAll(e.target.value)}
                placeholder="예: 239채널 전채널 UHD"
                className="w-full p-2 rounded-xl border bg-white text-slate-700 text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">월 기본요금 (원)</label>
              <input
                type="number"
                value={priceTvSkyAll}
                onChange={(e) => setPriceTvSkyAll(Number(e.target.value))}
                className="w-full p-2 rounded-xl border bg-white text-blue-600 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-600 mb-1">결합 사은품</label>
                <input
                  type="number"
                  value={giftTvSkyAllCombo}
                  onChange={(e) => setGiftTvSkyAllCombo(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border bg-white text-yellow-600 font-black"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 mb-1">단독 사은품</label>
                <input
                  type="number"
                  value={giftTvSkyAllSolo}
                  onChange={(e) => setGiftTvSkyAllSolo(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border bg-white text-slate-700 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Sky Point */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 font-bold text-slate-700">2번 TV (포인트)</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">TV 상품명</label>
              <input
                type="text"
                value={nameTvSkyPoint}
                onChange={(e) => setNameTvSkyPoint(e.target.value)}
                placeholder="예: Sky Point"
                className="w-full p-2 rounded-xl border bg-white font-extrabold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">상품 부가 설명</label>
              <input
                type="text"
                value={subTvSkyPoint}
                onChange={(e) => setSubTvSkyPoint(e.target.value)}
                placeholder="예: 239채널 + VOD포인트"
                className="w-full p-2 rounded-xl border bg-white text-slate-700 text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">월 기본요금 (원)</label>
              <input
                type="number"
                value={priceTvSkyPoint}
                onChange={(e) => setPriceTvSkyPoint(Number(e.target.value))}
                className="w-full p-2 rounded-xl border bg-white text-blue-600 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-600 mb-1">결합 사은품</label>
                <input
                  type="number"
                  value={giftTvSkyPointCombo}
                  onChange={(e) => setGiftTvSkyPointCombo(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border bg-white text-yellow-600 font-black"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 mb-1">단독 사은품</label>
                <input
                  type="number"
                  value={giftTvSkyPointSolo}
                  onChange={(e) => setGiftTvSkyPointSolo(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border bg-white text-slate-700 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Sky Choice */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 font-bold text-slate-700">3번 TV (맞춤팩)</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">TV 상품명</label>
              <input
                type="text"
                value={nameTvSkyChoice}
                onChange={(e) => setNameTvSkyChoice(e.target.value)}
                placeholder="예: Sky Choice"
                className="w-full p-2 rounded-xl border bg-white font-extrabold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">상품 부가 설명</label>
              <input
                type="text"
                value={subTvSkyChoice}
                onChange={(e) => setSubTvSkyChoice(e.target.value)}
                placeholder="예: 맞춤형 장르팩"
                className="w-full p-2 rounded-xl border bg-white text-slate-700 text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">월 기본요금 (원)</label>
              <input
                type="number"
                value={priceTvSkyChoice}
                onChange={(e) => setPriceTvSkyChoice(Number(e.target.value))}
                className="w-full p-2 rounded-xl border bg-white text-blue-600 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-600 mb-1">결합 사은품</label>
                <input
                  type="number"
                  value={giftTvSkyChoiceCombo}
                  onChange={(e) => setGiftTvSkyChoiceCombo(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border bg-white text-yellow-600 font-black"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 mb-1">단독 사은품</label>
                <input
                  type="number"
                  value={giftTvSkyChoiceSolo}
                  onChange={(e) => setGiftTvSkyChoiceSolo(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border bg-white text-slate-700 font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Discounts (Combo, Mobile) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-black text-base text-slate-900 flex items-center gap-2 border-b pb-3">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>결합 및 알뜰폰 할인 금액 설정</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <label className="block font-bold text-slate-700">인터넷+TV 결합할인 금액 (원)</label>
            <input
              type="number"
              value={comboDiscountAmount}
              onChange={(e) => setComboDiscountAmount(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
            />
            <span className="text-[11px] text-slate-500 block">※ 인터넷과 TV 동시 선택 시 기본 차감되는 결합할인액 (기본 -4,400원)</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
            <label className="block font-bold text-slate-700">알뜰폰 결합 추가할인 금액 (원)</label>
            <input
              type="number"
              value={mobileDiscountAmount}
              onChange={(e) => setMobileDiscountAmount(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-purple-600 focus:ring-2 focus:ring-purple-500/20"
            />
            <span className="text-[11px] text-slate-500 block">※ 스카이라이프 모바일 알뜰폰 결합 체크 시 추가 차감액 (기본 -3,300원)</span>
          </div>
        </div>
      </div>

      {/* 5. Affiliate Card Options & Descriptions */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span>제휴카드 할인 옵션명 & 전월 실적 문구 설정</span>
          </h3>
        </div>

        {/* Card Header Notice */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs">
          <label className="block font-bold text-slate-800 mb-1">
            제휴카드 헤더 우측 안내 문구 (기본: 청구 할인 혜택)
          </label>
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <input
              type="text"
              value={cardHeaderNotice}
              onChange={(e) => setCardHeaderNotice(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-blue-200 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20"
              placeholder="예: 청구 할인 혜택"
            />
            <button
              type="button"
              onClick={() => setCardHeaderNotice('청구 할인 혜택')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold shrink-0 transition-colors"
            >
              문구 기본값
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Card Option 0: No Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>0번 옵션 (미적용)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">0원</span>
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">옵션명 라벨</label>
              <input
                type="text"
                value={cardLabel0}
                onChange={(e) => setCardLabel0(e.target.value)}
                placeholder="예: 미적용"
                className="w-full p-2 rounded-xl border bg-white font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">하단 설명 문구</label>
              <input
                type="text"
                value={cardSub0}
                onChange={(e) => setCardSub0(e.target.value)}
                placeholder="예: 일반 납부"
                className="w-full p-2 rounded-xl border bg-white text-slate-700 text-[11px]"
              />
            </div>
          </div>

          {/* Card Option 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>1구간 할인</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">1구간</span>
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">월 할인 금액 (원)</label>
              <input
                type="number"
                value={cardDiscount1}
                onChange={(e) => setCardDiscount1(Number(e.target.value))}
                className="w-full p-2 rounded-xl border bg-white font-bold text-sky-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">하단 실적 설명 문구</label>
              <input
                type="text"
                value={cardSub1}
                onChange={(e) => setCardSub1(e.target.value)}
                placeholder="예: 전월 30만원 이상"
                className="w-full p-2 rounded-xl border bg-white text-slate-700 text-[11px]"
              />
            </div>
          </div>

          {/* Card Option 2 */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>2구간 할인 (추천)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-bold">인기</span>
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">월 할인 금액 (원)</label>
              <input
                type="number"
                value={cardDiscount2}
                onChange={(e) => setCardDiscount2(Number(e.target.value))}
                className="w-full p-2 rounded-xl border bg-white font-bold text-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">하단 실적 설명 문구</label>
              <input
                type="text"
                value={cardSub2}
                onChange={(e) => setCardSub2(e.target.value)}
                placeholder="예: 전월 70만원 이상 (추천)"
                className="w-full p-2 rounded-xl border bg-white text-slate-700 text-[11px]"
              />
            </div>
          </div>

          {/* Card Option 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>3구간 할인</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">최대</span>
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">월 할인 금액 (원)</label>
              <input
                type="number"
                value={cardDiscount3}
                onChange={(e) => setCardDiscount3(Number(e.target.value))}
                className="w-full p-2 rounded-xl border bg-white font-bold text-sky-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">하단 실적 설명 문구</label>
              <input
                type="text"
                value={cardSub3}
                onChange={(e) => setCardSub3(e.target.value)}
                placeholder="예: 전월 100만원 이상"
                className="w-full p-2 rounded-xl border bg-white text-slate-700 text-[11px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Online Consultation Form Affiliate Card Options */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>온라인 가입 상담 신청서 - 제휴카드 신청 옵션 문구 설정</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              랜딩페이지 하단 [온라인 가입 상담 신청서]에 노출되는 제휴카드 신청 옵션 문구를 직접 수정할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Form Card Header & Notice Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="block font-bold text-slate-800">
              신청서 항목 타이틀 문구
            </label>
            <input
              type="text"
              value={formCardTitle}
              onChange={(e) => setFormCardTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20"
              placeholder="예: 제휴카드 신청 (선택)"
            />
            <span className="text-[11px] text-slate-400 block">기본: 제휴카드 신청 (선택)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="block font-bold text-slate-800">
              신청서 우측 부가 안내 문구
            </label>
            <input
              type="text"
              value={formCardNotice}
              onChange={(e) => setFormCardNotice(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-blue-600 focus:ring-2 focus:ring-blue-500/20"
              placeholder="예: 매월 최대 20,000원 추가 청구할인"
            />
            <span className="text-[11px] text-slate-400 block">기본: 매월 최대 20,000원 추가 청구할인</span>
          </div>
        </div>

        {/* 4 Card Options in Application Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Option 0 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>0번 옵션 (미신청/기본)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">기본</span>
            </div>
            <input
              type="text"
              value={formCardOption0}
              onChange={(e) => setFormCardOption0(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-slate-800"
              placeholder="예: 미신청 (일반 납부)"
            />
            <span className="text-[11px] text-slate-400 block">기본: 미신청 (일반 납부)</span>
          </div>

          {/* Option 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>1번 옵션 (30만원 구간)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800">1구간</span>
            </div>
            <input
              type="text"
              value={formCardOption1}
              onChange={(e) => setFormCardOption1(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-blue-700"
              placeholder="예: 1. 30만원 이상 사용 > 15,000원 할인"
            />
            <span className="text-[11px] text-slate-400 block">기본: 1. 30만원 이상 사용 &gt; 15,000원 할인</span>
          </div>

          {/* Option 2 */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>2번 옵션 (70만원 구간 / 추천)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-bold">추천</span>
            </div>
            <input
              type="text"
              value={formCardOption2}
              onChange={(e) => setFormCardOption2(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-blue-700"
              placeholder="예: 2. 70만원 이상 사용 > 16,000원 할인"
            />
            <span className="text-[11px] text-slate-500 block">기본: 2. 70만원 이상 사용 &gt; 16,000원 할인</span>
          </div>

          {/* Option 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>3번 옵션 (120만원 구간 / 최대)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">최대</span>
            </div>
            <input
              type="text"
              value={formCardOption3}
              onChange={(e) => setFormCardOption3(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-white font-bold text-emerald-700"
              placeholder="예: 3. 120만원 이상 사용 > 20,000원 할인"
            />
            <span className="text-[11px] text-slate-400 block">기본: 3. 120만원 이상 사용 &gt; 20,000원 할인</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-transform active:scale-95"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>시뮬레이터 설정 저장하기</span>
        </button>
      </div>
    </form>
  );
};
