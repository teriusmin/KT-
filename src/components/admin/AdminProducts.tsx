import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductItem, ProductCategory } from '../../types';
import { Plus, Edit, Trash2, Gift, Wifi, Tv, Check, X, Sparkles, Calculator, Layers } from 'lucide-react';
import { AdminSimulatorSettings } from './AdminSimulatorSettings';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, updateAllProducts, deleteProduct, siteSettings, updateSiteSettings, showToast } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'products' | 'simulator'>('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('combo');
  const [speed, setSpeed] = useState('');
  const [channels, setChannels] = useState('');
  const [originalPrice, setOriginalPrice] = useState<number>(42900);
  const [salePrice, setSalePrice] = useState<number>(29700);
  const [cardDiscountPrice, setCardDiscountPrice] = useState<number>(9700);
  const [giftAmount, setGiftAmount] = useState<number>(45);
  const [giftDescription, setGiftDescription] = useState('현금 45만원 당일 지급 + 기가 와이파이 무료');
  const [giftTimingText, setGiftTimingText] = useState('당일 지급');
  const [giftMethodText, setGiftMethodText] = useState('계좌 전액 입금');
  const [badge, setBadge] = useState('인기 1위 BEST');
  const [badgeColor, setBadgeColor] = useState('bg-blue-600 text-white');
  const [featuresText, setFeaturesText] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  // Batch Update State (Products & Calculator)
  const [batchTimingText, setBatchTimingText] = useState('현금 입금');
  const [batchMethodText, setBatchMethodText] = useState('계좌 전액 입금');
  const [batchCalcGiftBadge, setBatchCalcGiftBadge] = useState(siteSettings.calcGiftBadge || '설치 당일 100% 입금');

  const handleOpenCreate = () => {
    setEditingId(null);
    setName('');
    setSubName('');
    setCategory('combo');
    setSpeed('500Mbps');
    setChannels('239개 채널 HD/UHD');
    setOriginalPrice(42900);
    setSalePrice(29700);
    setCardDiscountPrice(9700);
    setGiftAmount(45);
    setGiftDescription('현금 45만원 당일 지급 + 기가 와이파이');
    setGiftTimingText('당일 지급');
    setGiftMethodText('계좌 전액 입금');
    setBadge('추천');
    setBadgeColor('bg-blue-600 text-white');
    setFeaturesText('KT 100% 동일망 초고속 인터넷\n239개 전 채널 시청\n안드로이드 UHD 셋톱박스\n당일 사은품 전액 지급');
    setIsPopular(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: ProductItem) => {
    setEditingId(prod.id);
    setName(prod.name);
    setSubName(prod.subName);
    setCategory(prod.category);
    setSpeed(prod.speed || '');
    setChannels(prod.channels || '');
    setOriginalPrice(prod.originalPrice);
    setSalePrice(prod.salePrice);
    setCardDiscountPrice(prod.cardDiscountPrice || 0);
    setGiftAmount(prod.giftAmount);
    setGiftDescription(prod.giftDescription);
    setGiftTimingText(prod.giftTimingText || '당일 지급');
    setGiftMethodText(prod.giftMethodText || '계좌 전액 입금');
    setBadge(prod.badge || '');
    setBadgeColor(prod.badgeColor || 'bg-blue-600 text-white');
    setFeaturesText(prod.features.join('\n'));
    setIsPopular(!!prod.isPopular);
    setIsModalOpen(true);
  };

  const handleBatchUpdateGiftTexts = (overrideTiming?: string, overrideMethod?: string, overrideCalcBadge?: string) => {
    const timingToApply = (overrideTiming !== undefined ? overrideTiming : batchTimingText).trim();
    const methodToApply = (overrideMethod !== undefined ? overrideMethod : batchMethodText).trim();
    const calcBadgeToApply = (overrideCalcBadge !== undefined ? overrideCalcBadge : batchCalcGiftBadge).trim();

    if (!timingToApply && !methodToApply && !calcBadgeToApply) {
      showToast('변경할 문구를 하나 이상 입력해주세요.', 'error');
      return;
    }

    if (timingToApply || methodToApply) {
      const updated = products.map((prod) => ({
        ...prod,
        giftTimingText: timingToApply || prod.giftTimingText || '당일 지급',
        giftMethodText: methodToApply || prod.giftMethodText || '계좌 전액 입금'
      }));
      updateAllProducts(updated);
    }

    if (calcBadgeToApply) {
      updateSiteSettings({ calcGiftBadge: calcBadgeToApply });
    }

    if (overrideTiming !== undefined) setBatchTimingText(overrideTiming);
    if (overrideMethod !== undefined) setBatchMethodText(overrideMethod);
    if (overrideCalcBadge !== undefined) setBatchCalcGiftBadge(overrideCalcBadge);
    
    showToast('상품 카드 및 요금계산기 사은품 문구가 전체 일괄 적용되었습니다.', 'success');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('상품명을 입력해주세요.', 'error');
      return;
    }

    const featuresArray = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const productPayload = {
      name: name.trim(),
      subName: subName.trim(),
      category,
      speed: speed.trim() || undefined,
      channels: channels.trim() || undefined,
      originalPrice: Number(originalPrice),
      salePrice: Number(salePrice),
      cardDiscountPrice: Number(cardDiscountPrice) || undefined,
      giftAmount: Number(giftAmount),
      giftDescription: giftDescription.trim(),
      giftTimingText: giftTimingText.trim() || '당일 지급',
      giftMethodText: giftMethodText.trim() || '계좌 전액 입금',
      badge: badge.trim() || undefined,
      badgeColor: badgeColor.trim() || undefined,
      features: featuresArray.length > 0 ? featuresArray : ['스카이라이프 정규 혜택 적용'],
      isPopular
    };

    if (editingId) {
      updateProduct(editingId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('products')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'products'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>상품 카드 목록 ({products.length}개)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'simulator'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>실시간 견적 시뮬레이터 요금/문구 설정</span>
        </button>
      </div>

      {activeSubTab === 'simulator' ? (
        <AdminSimulatorSettings />
      ) : (
        <>
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                요금제 & 사은품 혜택 설정
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                인터넷, TV 결합상품의 월 요금, 할인금액, 최대 사은품 지급액을 실시간으로 편집합니다.
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>새 상품 추가</span>
            </button>
          </div>

          {/* Quick Batch Update Banner for Gift Texts */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-slate-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1.5 max-w-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-extrabold text-sm text-slate-900">
                  상품 카드 & 요금계산기 사은품 문구 일괄 변경
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 shrink-0">
                  전체 {products.length}개 상품 + 계산기 동시 연동
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                상품 카드의 <span className="font-bold text-blue-700">(당일 지급)</span>, <span className="font-bold text-blue-700">(계좌 전액 입금)</span> 및 요금계산기 사은품 배너의 <span className="font-bold text-blue-700">(설치 당일 100% 입금)</span> 문구를 한 번에 일괄 수정합니다.
              </p>
              
              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500">빠른 원클릭 변경:</span>
                <button
                  type="button"
                  onClick={() => handleBatchUpdateGiftTexts('현금 입금', '계좌 전액 입금', '현금 입금')}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all active:scale-95 shadow-2xs"
                >
                  ⚡ '현금 입금' 전체 일괄 적용
                </button>
                <button
                  type="button"
                  onClick={() => handleBatchUpdateGiftTexts('당일 지급', '계좌 전액 입금', '설치 당일 100% 입금')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-bold transition-all active:scale-95"
                >
                  🔄 원래 문구로 복원 ('당일 지급')
                </button>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-end gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  1. 상품 카드 뱃지
                </label>
                <input
                  type="text"
                  placeholder="예: 현금 입금"
                  value={batchTimingText}
                  onChange={(e) => setBatchTimingText(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-blue-200 bg-white font-bold text-slate-800 placeholder:text-slate-400 w-28 sm:w-32 focus:ring-2 focus:ring-blue-400 outline-none"
                  title="상품 카드 사은품 우측 상단 뱃지"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  2. 금액 옆 문구
                </label>
                <input
                  type="text"
                  placeholder="예: 계좌 전액 입금"
                  value={batchMethodText}
                  onChange={(e) => setBatchMethodText(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-blue-200 bg-white font-bold text-slate-800 placeholder:text-slate-400 w-32 sm:w-36 focus:ring-2 focus:ring-blue-400 outline-none"
                  title="상품 카드 사은품 금액 우측 문구"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  3. 요금계산기 뱃지
                </label>
                <input
                  type="text"
                  placeholder="예: 설치 당일 100% 입금"
                  value={batchCalcGiftBadge}
                  onChange={(e) => setBatchCalcGiftBadge(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-blue-200 bg-white font-bold text-slate-800 placeholder:text-slate-400 w-36 sm:w-44 focus:ring-2 focus:ring-blue-400 outline-none"
                  title="요금계산기 사은품 배너 우측 상단 뱃지 (설치 당일 100% 입금)"
                />
              </div>
              <button
                type="button"
                onClick={() => handleBatchUpdateGiftTexts()}
                className="px-4 py-2 sm:h-[34px] rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all active:scale-95 whitespace-nowrap"
              >
                전체 일괄 적용
              </button>
            </div>
          </div>

          {/* Product List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between relative"
              >
                <div>
                  {/* Header Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                      {prod.category === 'combo' ? '인터넷+TV' : prod.category === 'internet' ? '인터넷단독' : prod.category === 'tv' ? 'TV단독' : '알뜰폰결합'}
                    </span>
                    {prod.badge && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${prod.badgeColor || 'bg-blue-600 text-white'}`}>
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-1 leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">{prod.subName}</p>

                  {/* Gift Highlight with Timing and Method Badges */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200 mb-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-700 font-bold flex items-center gap-1">
                        <Gift className="w-4 h-4 text-blue-600" />
                        사은품 혜택
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-yellow-300 text-yellow-900 shadow-2xs">
                        {prod.giftTimingText || '당일 지급'}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-black text-blue-700">
                        최대 {prod.giftAmount}만원
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600">
                        {prod.giftMethodText || '계좌 전액 입금'}
                      </span>
                    </div>
                  </div>

                  {/* Price Row */}
                  <div className="space-y-1.5 text-xs text-slate-600 border-t pt-3 mb-4">
                    <div className="flex justify-between">
                      <span>정상 요금:</span>
                      <span className="line-through">{prod.originalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>3년 약정 결합가:</span>
                      <span className="text-blue-600 font-black text-sm">
                        월 {prod.salePrice.toLocaleString()}원
                      </span>
                    </div>
                    {prod.cardDiscountPrice !== undefined && (
                      <div className="flex justify-between text-slate-500">
                        <span>제휴카드 적용가:</span>
                        <span>월 {prod.cardDiscountPrice.toLocaleString()}원</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>수정</span>
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-xl text-slate-900">
                {editingId ? '상품 및 요금제 수정' : '새 상품 등록'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">카테고리 *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                  >
                    <option value="combo">인터넷+TV 결합 (추천)</option>
                    <option value="internet">인터넷 단독</option>
                    <option value="tv">TV 단독</option>
                    <option value="mobile">알뜰폰 결합</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">인기상품 여부</label>
                  <label className="flex items-center gap-2 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-bold text-slate-800">메인 하이라이트 강조 상품</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">상품명 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 인터넷 500M + Sky All (239채널)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">서브 설명</label>
                <input
                  type="text"
                  placeholder="예: 가장 많이 찾는 가성비 1등 결합상품"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">정상가 (원)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">3년 약정 결합가 (원) *</label>
                  <input
                    type="number"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-bold text-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">제휴카드 적용가 (원)</label>
                  <input
                    type="number"
                    value={cardDiscountPrice}
                    onChange={(e) => setCardDiscountPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">현금 사은품 금액 (만원 단위) *</label>
                  <input
                    type="number"
                    required
                    placeholder="45"
                    value={giftAmount}
                    onChange={(e) => setGiftAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white font-black text-yellow-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">사은품 상세 문구</label>
                  <input
                    type="text"
                    placeholder="현금 45만원 당일 지급 + 와이파이"
                    value={giftDescription}
                    onChange={(e) => setGiftDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Card Gift Badges (당일 지급 / 계좌 전액 입금) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    사은품 우측 상단 문구 (예: 당일 지급, 현금 입금)
                  </label>
                  <input
                    type="text"
                    placeholder="당일 지급"
                    value={giftTimingText}
                    onChange={(e) => setGiftTimingText(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 focus:border-blue-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    상품 카드 사은품 박스 우측 상단 노란색 뱃지에 표기됩니다.
                  </span>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    사은품 금액 우측 문구 (예: 계좌 전액 입금, 현금 지급)
                  </label>
                  <input
                    type="text"
                    placeholder="계좌 전액 입금"
                    value={giftMethodText}
                    onChange={(e) => setGiftMethodText(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 focus:border-blue-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    '최대 OO만원' 금액 우측에 함께 표기됩니다.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">뱃지 태그 (선택)</label>
                  <input
                    type="text"
                    placeholder="인기 1위 BEST, 초특가 등"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">속도/채널 표기</label>
                  <input
                    type="text"
                    placeholder="500Mbps / 239채널"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  상품 특장점 목록 (엔터로 구분)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="KT 100% 동일망 500Mbps&#10;239개 전 채널 시청&#10;안드로이드 UHD 셋톱박스"
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-y"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border text-slate-600 font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  {editingId ? '수정 저장' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
