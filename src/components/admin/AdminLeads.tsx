import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadItem, LeadStatus } from '../../types';
import { Search, Download, Trash2, Plus, Phone, MapPin, Clock, Edit3, Check, X, FileSpreadsheet, CreditCard, RefreshCw } from 'lucide-react';

export const AdminLeads: React.FC = () => {
  const { leads, siteSettings, updateSiteSettings, updateLead, deleteLead, addLead, showToast, refreshFromCloud, syncStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | '전체'>('전체');
  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);
  const [memoText, setMemoText] = useState('');
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [nameText, setNameText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Manual Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadRegion, setNewLeadRegion] = useState('');
  const [newLeadProduct, setNewLeadProduct] = useState('인터넷 500M + Sky All (239채널)');
  const [newLeadCardOption, setNewLeadCardOption] = useState('미신청 (일반 납부)');
  const [newLeadTime, setNewLeadTime] = useState('언제나 통화 가능');
  const [newLeadMemo, setNewLeadMemo] = useState('');

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === '전체' || l.status === statusFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStartEditName = (lead: LeadItem) => {
    setEditingNameId(lead.id);
    setNameText(lead.name === '고객' ? '' : lead.name);
  };

  const handleSaveName = (id: string) => {
    updateLead(id, { name: nameText.trim() || '고객' });
    setEditingNameId(null);
  };

  const handleStartEditMemo = (lead: LeadItem) => {
    setEditingMemoId(lead.id);
    setMemoText(lead.memo || '');
  };

  const handleSaveMemo = (id: string) => {
    updateLead(id, { memo: memoText });
    setEditingMemoId(null);
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('내보낼 신청서 데이터가 없습니다.', 'error');
      return;
    }

    const headers = ['접수일시', '고객명', '연락처', '설치희망지역', '희망상품', '제휴카드신청', '상담희망시간', '진행상태', '예상사은품(만원)', '상담메모'];
    const rows = leads.map((l) => [
      `"${l.createdAt}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.region}"`,
      `"${l.productName}"`,
      `"${l.affiliateCardOption || '미신청'}"`,
      `"${l.preferredTime}"`,
      `"${l.status}"`,
      `"${l.giftAmountExpected || 45}"`,
      `"${(l.memo || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `KT스카이라이프_상담신청자_목록_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('신청자 목록 CSV 파일이 다운로드되었습니다.', 'success');
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadPhone.trim()) {
      showToast('연락처(전화번호)를 입력해주세요.', 'error');
      return;
    }

    addLead({
      name: newLeadName.trim() || '고객',
      phone: newLeadPhone.trim(),
      region: newLeadRegion.trim() || '관리자 수기등록',
      productName: newLeadProduct,
      affiliateCardOption: newLeadCardOption,
      preferredTime: newLeadTime,
      memo: newLeadMemo.trim() || '관리자 수기 유입 상담'
    });

    setIsAddModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadRegion('');
    setNewLeadCardOption('미신청 (일반 납부)');
    setNewLeadMemo('');
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshFromCloud();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              상담 신청 고객 관리
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              실시간 클라우드 연동 중
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            접수된 고객 정보(이름, 전화번호, 설치지역, 상품)를 실시간으로 확인하고 상태를 관리합니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-60"
            title="Firestore 클라우드에서 최신 신청서 즉시 가져오기"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? '동기화 중...' : '클라우드 새로고침'}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>CSV 엑셀 다운로드</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>수기 접수 추가</span>
          </button>
        </div>
      </div>

      {/* Customer Name Field Setting Banner (Admin Toggle) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-blue-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black shrink-0 ${
            siteSettings.collectCustomerName ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
          }`}>
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-sm">상담 신청서 고객명(성함) 입력란 설정</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-black ${
                siteSettings.collectCustomerName
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {siteSettings.collectCustomerName ? '현재: 성함 입력 필수' : '현재: 고객명 미사용 (전화번호만 간편 접수)'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {siteSettings.collectCustomerName
                ? '고객이 웹사이트에서 신청 시 성함과 전화번호를 모두 필수로 입력하도록 설정되어 있습니다.'
                : '고객명 입력란을 숨겨 전화번호만으로 누구나 10초 만에 부담 없이 신청하도록 전환율을 높인 상태입니다.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const nextVal = !siteSettings.collectCustomerName;
            updateSiteSettings({ collectCustomerName: nextVal });
            showToast(
              nextVal
                ? '웹사이트 폼에 고객명(성함) 입력란이 추가되었습니다.'
                : '웹사이트 폼에서 고객명(성함) 입력란이 삭제되었습니다. (간편 접수 모드)',
              'success'
            );
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-2 shadow-xs ${
            siteSettings.collectCustomerName
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${siteSettings.collectCustomerName ? 'bg-slate-400' : 'bg-emerald-300 animate-pulse'}`} />
          <span>{siteSettings.collectCustomerName ? '고객명 필드 삭제(숨김)하기' : '고객명 필드 추가(노출)하기'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="이름, 연락처, 지역, 상품 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {(['전체', '접수', '상담중', '개통완료', '보류/취소'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
              {st !== '전체' && (
                <span className="ml-1 text-[10px] opacity-80">
                  ({leads.filter((l) => l.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">접수일시</th>
                <th className="py-3.5 px-4">고객명</th>
                <th className="py-3.5 px-4">연락처</th>
                <th className="py-3.5 px-4">설치지역</th>
                <th className="py-3.5 px-4">신청 상품</th>
                <th className="py-3.5 px-4">상담 희망시간</th>
                <th className="py-3.5 px-4">진행 상태</th>
                <th className="py-3.5 px-4">상담 메모</th>
                <th className="py-3.5 px-4 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    검색 조건에 일치하는 신청 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{lead.createdAt}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {editingNameId === lead.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={nameText}
                            onChange={(e) => setNameText(e.target.value)}
                            className="px-2 py-1 text-xs border rounded-lg bg-white w-24 font-bold border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="고객명 입력"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveName(lead.id)}
                            className="p-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                            title="저장"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setEditingNameId(null)}
                            className="p-1 rounded bg-slate-200 text-slate-600 hover:bg-slate-300"
                            title="취소"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleStartEditName(lead)}
                          className="group inline-flex items-center gap-1.5 cursor-pointer p-1 -m-1 rounded-lg hover:bg-slate-100 transition-colors"
                          title="클릭하여 고객명 추가/수정"
                        >
                          <span className="font-black text-slate-900 group-hover:text-blue-600">
                            {lead.name && lead.name !== '고객' ? lead.name : '고객'}
                          </span>
                          {(!lead.name || lead.name === '고객') && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                              간편접수
                            </span>
                          )}
                          <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 shrink-0" />
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <a
                        href={`tel:${lead.phone}`}
                        className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-blue-500" />
                        {lead.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{lead.region}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold max-w-[220px]">
                      <div className="truncate">{lead.productName}</div>
                      {lead.affiliateCardOption && lead.affiliateCardOption !== '미신청' && lead.affiliateCardOption !== '미신청 (일반 납부)' && (
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 truncate max-w-full">
                          <CreditCard className="w-3 h-3 text-blue-600 shrink-0" />
                          <span className="truncate">{lead.affiliateCardOption}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{lead.preferredTime}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          lead.status === '접수'
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : lead.status === '상담중'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : lead.status === '개통완료'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        <option value="접수">접수</option>
                        <option value="상담중">상담중</option>
                        <option value="개통완료">개통완료</option>
                        <option value="보류/취소">보류/취소</option>
                      </select>
                    </td>

                    {/* Memo Editing */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      {editingMemoId === lead.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={memoText}
                            onChange={(e) => setMemoText(e.target.value)}
                            className="px-2 py-1 text-xs border rounded bg-white w-full"
                            placeholder="메모 입력"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveMemo(lead.id)}
                            className="p-1 rounded bg-blue-600 text-white"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setEditingMemoId(null)}
                            className="p-1 rounded bg-slate-200 text-slate-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleStartEditMemo(lead)}
                          className="group flex items-center justify-between gap-1 text-slate-600 hover:text-blue-600 cursor-pointer p-1 rounded hover:bg-slate-100"
                          title="클릭하여 메모 수정"
                        >
                          <span className="truncate">{lead.memo || '메모 없음'}</span>
                          <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 shrink-0" />
                        </div>
                      )}
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-slate-900">
                수기 가입 상담 접수 등록
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  고객명 <span className="text-slate-400 font-normal">(선택 - 미입력 시 '고객'으로 저장)</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동 (미입력 시 '고객')"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">전화번호 *</label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">설치 지역</label>
                <input
                  type="text"
                  placeholder="예: 서울 강남구 대치동"
                  value={newLeadRegion}
                  onChange={(e) => setNewLeadRegion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">희망 상품</label>
                <input
                  type="text"
                  value={newLeadProduct}
                  onChange={(e) => setNewLeadProduct(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">제휴카드 신청</label>
                <select
                  value={newLeadCardOption}
                  onChange={(e) => setNewLeadCardOption(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white"
                >
                  <option value={siteSettings.formCardOption0 || '미신청 (일반 납부)'}>
                    {siteSettings.formCardOption0 || '미신청 (일반 납부)'}
                  </option>
                  <option value={siteSettings.formCardOption1 || '1. 30만원 이상 사용 > 15,000원 할인'}>
                    {siteSettings.formCardOption1 || '1. 30만원 이상 사용 > 15,000원 할인'}
                  </option>
                  <option value={siteSettings.formCardOption2 || '2. 70만원 이상 사용 > 16,000원 할인'}>
                    {siteSettings.formCardOption2 || '2. 70만원 이상 사용 > 16,000원 할인'}
                  </option>
                  <option value={siteSettings.formCardOption3 || '3. 120만원 이상 사용 > 20,000원 할인'}>
                    {siteSettings.formCardOption3 || '3. 120만원 이상 사용 > 20,000원 할인'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">상담 메모</label>
                <textarea
                  rows={2}
                  value={newLeadMemo}
                  onChange={(e) => setNewLeadMemo(e.target.value)}
                  placeholder="특이사항 메모..."
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-slate-600 font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
