import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadItem, LeadStatus } from '../../types';
import {
  Search,
  Trash2,
  Plus,
  Phone,
  MapPin,
  Clock,
  Edit3,
  Check,
  X,
  FileSpreadsheet,
  CreditCard,
  RefreshCw,
  Gift,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const AdminLeads: React.FC = () => {
  const {
    leads = [],
    siteSettings,
    products = [],
    updateSiteSettings,
    updateLead,
    deleteLead,
    addLead,
    showToast,
    refreshFromCloud,
    resetSampleLeads
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | '전체'>('전체');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Quick In-line edits
  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);
  const [memoText, setMemoText] = useState('');
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [nameText, setNameText] = useState('');

  // Full Edit Modal State
  const [editingLead, setEditingLead] = useState<LeadItem | null>(null);
  const [editFormName, setEditFormName] = useState('');
  const [editFormPhone, setEditFormPhone] = useState('');
  const [editFormRegion, setEditFormRegion] = useState('');
  const [editFormProduct, setEditFormProduct] = useState('');
  const [editFormCardOption, setEditFormCardOption] = useState('');
  const [editFormTime, setEditFormTime] = useState('');
  const [editFormStatus, setEditFormStatus] = useState<LeadStatus>('접수');
  const [editFormGiftAmount, setEditFormGiftAmount] = useState<number>(45);
  const [editFormMemo, setEditFormMemo] = useState('');

  // Delete Confirmation Modal State
  const [deletingLead, setDeletingLead] = useState<LeadItem | null>(null);

  // Manual Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadRegion, setNewLeadRegion] = useState('');
  const [newLeadProduct, setNewLeadProduct] = useState('인터넷 500M + Sky All (239채널)');
  const [newLeadCardOption, setNewLeadCardOption] = useState('미신청 (일반 납부)');
  const [newLeadTime, setNewLeadTime] = useState('언제나 통화 가능');
  const [newLeadGift, setNewLeadGift] = useState<number>(45);
  const [newLeadMemo, setNewLeadMemo] = useState('');

  // Available Product Options for select / auto-fill
  const productOptionsList: string[] = [
    ...(siteSettings.formProductOptions && siteSettings.formProductOptions.length > 0
      ? siteSettings.formProductOptions
      : [
          '인터넷 500M + Sky All (239채널) (월 29,700원 / 사은품 최대 45만원)',
          '인터넷 100M + Sky All (239채널) (월 24,200원 / 사은품 최대 38만원)',
          '인터넷 1G + Sky All (239채널) (월 34,100원 / 사은품 최대 48만원)',
          '인터넷 단독 500M (월 22,000원 / 사은품 최대 18만원)',
          '인터넷 단독 100M (월 17,600원 / 사은품 최대 12만원)',
          '인터넷 단독 1G (월 27,500원 / 사은품 최대 20만원)',
          '상담 후 맞춤 상품 추천 희망 (전문 상담원 맞춤설계)'
        ]),
    ...products.map((p) => `${p.name} (월 ${p.salePrice.toLocaleString()}원 / 사은품 ${p.giftAmount}만원)`)
  ];
  // Deduplicate product options
  const uniqueProductOptions = Array.from(new Set(productOptionsList));

  // Safe Filtered Leads
  const query = (searchQuery || '').trim().toLowerCase();
  const safeLeads = Array.isArray(leads) ? leads : [];

  const filteredLeads = safeLeads.filter((l) => {
    if (!l) return false;
    const currentStatus = l.status || '접수';
    const matchesStatus = statusFilter === '전체' || currentStatus === statusFilter;
    if (!matchesStatus) return false;
    if (!query) return true;

    const name = String(l.name || '').toLowerCase();
    const phone = String(l.phone || '').toLowerCase();
    const region = String(l.region || '').toLowerCase();
    const productName = String(l.productName || '').toLowerCase();
    const memo = String(l.memo || '').toLowerCase();

    return (
      name.includes(query) ||
      phone.includes(query) ||
      region.includes(query) ||
      productName.includes(query) ||
      memo.includes(query)
    );
  });

  // Open Full Edit Modal
  const handleOpenEditModal = (lead: LeadItem) => {
    setEditingLead(lead);
    setEditFormName(lead.name || '');
    setEditFormPhone(lead.phone || '');
    setEditFormRegion(lead.region || '');
    setEditFormProduct(lead.productName || '인터넷 500M + Sky All (239채널)');
    setEditFormCardOption(lead.affiliateCardOption || siteSettings.formCardOption0 || '미신청 (일반 납부)');
    setEditFormTime(lead.preferredTime || '언제나 통화 가능');
    setEditFormStatus(lead.status || '접수');
    setEditFormGiftAmount(lead.giftAmountExpected ?? 45);
    setEditFormMemo(lead.memo || '');
  };

  // Save Full Edit
  const handleSaveFullEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    if (!editFormPhone.trim()) {
      showToast('고객 연락처(전화번호)를 입력해주세요.', 'error');
      return;
    }

    await updateLead(editingLead.id, {
      name: editFormName.trim() || '고객',
      phone: editFormPhone.trim(),
      region: editFormRegion.trim() || '온라인 접수',
      productName: editFormProduct.trim() || '인터넷 500M + Sky All (239채널)',
      affiliateCardOption: editFormCardOption,
      preferredTime: editFormTime.trim() || '언제나 통화 가능',
      status: editFormStatus,
      giftAmountExpected: Number(editFormGiftAmount) || 0,
      memo: editFormMemo.trim()
    });

    setEditingLead(null);
  };

  // Quick In-line Name Save
  const handleStartEditName = (lead: LeadItem) => {
    setEditingNameId(lead.id);
    setNameText(lead.name === '고객' ? '' : lead.name || '');
  };

  const handleSaveName = (id: string) => {
    updateLead(id, { name: nameText.trim() || '고객' });
    setEditingNameId(null);
  };

  // Quick In-line Memo Save
  const handleStartEditMemo = (lead: LeadItem) => {
    setEditingMemoId(lead.id);
    setMemoText(lead.memo || '');
  };

  const handleSaveMemo = (id: string) => {
    updateLead(id, { memo: memoText.trim() });
    setEditingMemoId(null);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingLead) return;
    await deleteLead(deletingLead.id);
    setDeletingLead(null);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (safeLeads.length === 0) {
      showToast('내보낼 신청서 데이터가 없습니다.', 'error');
      return;
    }

    const headers = ['접수일시', '고객명', '연락처', '설치희망지역', '희망상품', '제휴카드신청', '상담희망시간', '진행상태', '예상사은품(만원)', '상담메모'];
    const rows = safeLeads.map((l) => [
      `"${l.createdAt || ''}"`,
      `"${l.name || '고객'}"`,
      `"${l.phone || ''}"`,
      `"${l.region || ''}"`,
      `"${l.productName || ''}"`,
      `"${l.affiliateCardOption || '미신청'}"`,
      `"${l.preferredTime || ''}"`,
      `"${l.status || '접수'}"`,
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

  // Create Manual Lead
  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadPhone.trim()) {
      showToast('연락처(전화번호)를 입력해주세요.', 'error');
      return;
    }

    await addLead({
      name: newLeadName.trim() || '고객',
      phone: newLeadPhone.trim(),
      region: newLeadRegion.trim() || '관리자 수기등록',
      productName: newLeadProduct,
      affiliateCardOption: newLeadCardOption,
      preferredTime: newLeadTime,
      giftAmountExpected: Number(newLeadGift) || 45,
      memo: newLeadMemo.trim() || '관리자 수기 유입 상담'
    });

    setIsAddModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadRegion('');
    setNewLeadCardOption('미신청 (일반 납부)');
    setNewLeadMemo('');
  };

  // Cloud Refresh
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshFromCloud();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Stats calculation
  const totalCount = safeLeads.length;
  const waitingCount = safeLeads.filter((l) => (l.status || '접수') === '접수').length;
  const inProgressCount = safeLeads.filter((l) => l.status === '상담중').length;
  const completedCount = safeLeads.filter((l) => l.status === '개통완료').length;
  const holdCount = safeLeads.filter((l) => l.status === '보류/취소').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              상담 신청 고객 관리
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              실시간 클라우드 연동 중
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            접수된 고객 정보(이름, 연락처, 설치지역, 상품, 진행상태)를 실시간으로 확인하고 수정 및 삭제할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
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

      {/* Status Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setStatusFilter('전체')}
          className={`p-3.5 rounded-2xl border text-left transition-all ${
            statusFilter === '전체'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold opacity-80">전체 접수건</div>
          <div className="text-xl font-black mt-0.5">{totalCount}건</div>
        </button>

        <button
          onClick={() => setStatusFilter('접수')}
          className={`p-3.5 rounded-2xl border text-left transition-all ${
            statusFilter === '접수'
              ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold opacity-80 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            신규 대기
          </div>
          <div className="text-xl font-black mt-0.5 text-amber-600 group-hover:text-amber-700">
            {waitingCount}건
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('상담중')}
          className={`p-3.5 rounded-2xl border text-left transition-all ${
            statusFilter === '상담중'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold opacity-80 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            상담 진행중
          </div>
          <div className="text-xl font-black mt-0.5 text-blue-600">
            {inProgressCount}건
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('개통완료')}
          className={`p-3.5 rounded-2xl border text-left transition-all ${
            statusFilter === '개통완료'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold opacity-80 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            개통/지급완료
          </div>
          <div className="text-xl font-black mt-0.5 text-emerald-600">
            {completedCount}건
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('보류/취소')}
          className={`p-3.5 rounded-2xl border text-left transition-all ${
            statusFilter === '보류/취소'
              ? 'bg-slate-700 text-white border-slate-700 shadow-md shadow-slate-700/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold opacity-80 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            보류/취소
          </div>
          <div className="text-xl font-black mt-0.5 text-slate-500">
            {holdCount}건
          </div>
        </button>
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
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="이름, 연락처, 지역, 상품, 메모 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
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
                  ({safeLeads.filter((l) => (l.status || '접수') === st).length})
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
                <th className="py-3.5 px-4 whitespace-nowrap">접수일시</th>
                <th className="py-3.5 px-4 whitespace-nowrap">고객명</th>
                <th className="py-3.5 px-4 whitespace-nowrap">연락처</th>
                <th className="py-3.5 px-4 whitespace-nowrap">설치지역</th>
                <th className="py-3.5 px-4">신청 상품</th>
                <th className="py-3.5 px-4 whitespace-nowrap">상담 희망시간</th>
                <th className="py-3.5 px-4 whitespace-nowrap">진행 상태</th>
                <th className="py-3.5 px-4">상담 메모</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">관리 (수정/삭제)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div className="font-black text-slate-800 text-sm">
                        {safeLeads.length === 0
                          ? '등록된 상담 신청서가 없습니다.'
                          : '조건에 일치하는 검색 결과가 없습니다.'}
                      </div>
                      <p className="text-xs text-slate-400">
                        {safeLeads.length === 0
                          ? '고객이 웹사이트에서 신청서를 작성하거나, 관리자가 직접 수기 접수 또는 샘플 데이터를 복원할 수 있습니다.'
                          : '검색어를 변경하거나 상태 필터를 전체로 변경해보세요.'}
                      </p>
                      <div className="pt-2 flex items-center justify-center gap-2">
                        {safeLeads.length === 0 ? (
                          <>
                            <button
                              onClick={() => setIsAddModalOpen(true)}
                              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-blue-500"
                            >
                              <Plus className="w-4 h-4" />
                              <span>새 신청서 등록하기</span>
                            </button>
                            <button
                              onClick={resetSampleLeads}
                              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                              <span>기본 샘플 데이터 복원</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setStatusFilter('전체');
                            }}
                            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                          >
                            검색 조건 초기화
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const leadName = lead.name || '고객';
                  const leadPhone = lead.phone || '-';
                  const leadRegion = lead.region || '온라인 접수';
                  const leadProduct = lead.productName || '인터넷 500M + Sky All (239채널)';
                  const leadStatus = lead.status || '접수';

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Created At */}
                      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                        {lead.createdAt || '오늘'}
                      </td>

                      {/* Customer Name */}
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
                            title="클릭하여 고객명 빠른 수정"
                          >
                            <span className="font-black text-slate-900 group-hover:text-blue-600">
                              {leadName}
                            </span>
                            {leadName === '고객' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                간편접수
                              </span>
                            )}
                            <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 shrink-0" />
                          </div>
                        )}
                      </td>

                      {/* Phone Number */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <a
                          href={`tel:${leadPhone.replace(/[^0-9]/g, '')}`}
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-blue-500" />
                          <span>{leadPhone}</span>
                        </a>
                      </td>

                      {/* Region */}
                      <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{leadRegion}</span>
                        </div>
                      </td>

                      {/* Product Name & Affiliate Card Badge */}
                      <td className="py-3.5 px-4 text-slate-800 font-semibold max-w-[220px]">
                        <div className="truncate font-bold" title={leadProduct}>
                          {leadProduct}
                        </div>
                        {lead.affiliateCardOption &&
                          lead.affiliateCardOption !== '미신청' &&
                          lead.affiliateCardOption !== '미신청 (일반 납부)' && (
                            <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 truncate max-w-full">
                              <CreditCard className="w-3 h-3 text-blue-600 shrink-0" />
                              <span className="truncate">{lead.affiliateCardOption}</span>
                            </div>
                          )}
                      </td>

                      {/* Preferred Time */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{lead.preferredTime || '언제나 통화 가능'}</span>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={leadStatus}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition-all shadow-xs ${
                            leadStatus === '접수'
                              ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                              : leadStatus === '상담중'
                              ? 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100'
                              : leadStatus === '개통완료'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          <option value="접수">접수 (신규)</option>
                          <option value="상담중">상담중</option>
                          <option value="개통완료">개통완료</option>
                          <option value="보류/취소">보류/취소</option>
                        </select>
                      </td>

                      {/* Memo */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        {editingMemoId === lead.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={memoText}
                              onChange={(e) => setMemoText(e.target.value)}
                              className="px-2 py-1 text-xs border rounded-lg bg-white w-full border-blue-400 focus:outline-none"
                              placeholder="메모 입력"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveMemo(lead.id)}
                              className="p-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setEditingMemoId(null)}
                              className="p-1 rounded bg-slate-200 text-slate-600 hover:bg-slate-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleStartEditMemo(lead)}
                            className="group flex items-center justify-between gap-1 text-slate-600 hover:text-blue-600 cursor-pointer p-1 -m-1 rounded-lg hover:bg-slate-100 transition-colors"
                            title="클릭하여 메모 빠른 수정"
                          >
                            <span className="truncate">{lead.memo || '메모 없음'}</span>
                            <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 shrink-0" />
                          </div>
                        )}
                      </td>

                      {/* Actions: Full Edit & Delete */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(lead)}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1 transition-colors border border-blue-200"
                            title="신청서 전체 상세 정보 수정"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                            <span>수정</span>
                          </button>
                          <button
                            onClick={() => setDeletingLead(lead)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200"
                            title="신청서 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Edit Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  <span>상담 신청서 상세 수정</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  접수일시: {editingLead.createdAt || '방금 전'}
                </p>
              </div>
              <button
                onClick={() => setEditingLead(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFullEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">고객명 (성함)</label>
                  <input
                    type="text"
                    value={editFormName}
                    onChange={(e) => setEditFormName(e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    연락처 (전화번호) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={editFormPhone}
                    onChange={(e) => setEditFormPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 font-bold text-blue-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">설치 희망 지역</label>
                  <input
                    type="text"
                    value={editFormRegion}
                    onChange={(e) => setEditFormRegion(e.target.value)}
                    placeholder="예: 서울 강남구 대치동"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">상담 희망 시간</label>
                  <input
                    type="text"
                    value={editFormTime}
                    onChange={(e) => setEditFormTime(e.target.value)}
                    placeholder="예: 언제나 통화 가능 / 14:00~16:00"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  신청 상품 (드롭다운 선택 또는 직접 수정)
                </label>
                <div className="space-y-2">
                  <select
                    value={editFormProduct}
                    onChange={(e) => setEditFormProduct(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-800"
                  >
                    {uniqueProductOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                    {!uniqueProductOptions.includes(editFormProduct) && editFormProduct && (
                      <option value={editFormProduct}>{editFormProduct} (기존 등록값)</option>
                    )}
                  </select>
                  <input
                    type="text"
                    value={editFormProduct}
                    onChange={(e) => setEditFormProduct(e.target.value)}
                    placeholder="상품명을 직접 수정할 수도 있습니다"
                    className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Affiliate Card Option */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">제휴카드 신청 옵션</label>
                  <select
                    value={editFormCardOption}
                    onChange={(e) => setEditFormCardOption(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
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

                {/* Progress Status */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">진행 상태</label>
                  <select
                    value={editFormStatus}
                    onChange={(e) => setEditFormStatus(e.target.value as LeadStatus)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold"
                  >
                    <option value="접수">접수 (신규 접수 대기)</option>
                    <option value="상담중">상담중 (상담사 배정 및 통화)</option>
                    <option value="개통완료">개통완료 (설치 및 사은품 지급)</option>
                    <option value="보류/취소">보류/취소 (고객 취소 또는 보류)</option>
                  </select>
                </div>
              </div>

              {/* Gift Amount */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-purple-600" />
                  <span>예상 사은품 금액 (만원)</span>
                </label>
                <input
                  type="number"
                  value={editFormGiftAmount}
                  onChange={(e) => setEditFormGiftAmount(Number(e.target.value))}
                  placeholder="예: 45"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-purple-700"
                />
              </div>

              {/* Memo */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">상담 관리자 메모</label>
                <textarea
                  rows={3}
                  value={editFormMemo}
                  onChange={(e) => setEditFormMemo(e.target.value)}
                  placeholder="고객 요청사항, 통화 이력, 설치 예정일 등 메모..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black shadow-md shadow-blue-500/20"
                >
                  수정사항 저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-black text-slate-900 text-base">
                상담 신청서 삭제 확인
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                정말 이 신청서를 삭제하시겠습니까? 삭제된 신청서는 클라우드 및 목록에서 영구적으로 제거됩니다.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-700">
              <div><span className="font-bold">고객명:</span> {deletingLead.name || '고객'}</div>
              <div><span className="font-bold">연락처:</span> {deletingLead.phone}</div>
              <div><span className="font-bold">신청상품:</span> {deletingLead.productName}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDeletingLead(null)}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>영구 삭제</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>수기 상담 신청 등록</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  고객명 <span className="text-slate-400 font-normal">(선택 - 미입력 시 '고객')</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동 (미입력 시 '고객')"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  전화번호 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">설치 희망 지역</label>
                <input
                  type="text"
                  placeholder="예: 서울 강남구 대치동"
                  value={newLeadRegion}
                  onChange={(e) => setNewLeadRegion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">희망 상품</label>
                <select
                  value={newLeadProduct}
                  onChange={(e) => setNewLeadProduct(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-800"
                >
                  {uniqueProductOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">제휴카드 신청</label>
                <select
                  value={newLeadCardOption}
                  onChange={(e) => setNewLeadCardOption(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
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
                <label className="block font-bold text-slate-700 mb-1">상담 희망 시간</label>
                <input
                  type="text"
                  placeholder="예: 언제나 통화 가능"
                  value={newLeadTime}
                  onChange={(e) => setNewLeadTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">예상 사은품 (만원)</label>
                <input
                  type="number"
                  value={newLeadGift}
                  onChange={(e) => setNewLeadGift(Number(e.target.value))}
                  placeholder="45"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">상담 메모</label>
                <textarea
                  rows={2}
                  value={newLeadMemo}
                  onChange={(e) => setNewLeadMemo(e.target.value)}
                  placeholder="관리자 상담 메모..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
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
