import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Clock,
  CheckCircle2,
  Gift,
  PlusCircle,
  FileText,
  Palette,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building,
  Trash2,
  Edit3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { leads = [], posts, products, setAdminTab, updateLead, deleteLead } = useApp();

  const totalLeads = leads.length;
  const pendingLeads = leads.filter((l) => l.status === '접수').length;
  const inProgressLeads = leads.filter((l) => l.status === '상담중').length;
  const completedLeads = leads.filter((l) => l.status === '개통완료').length;
  
  // Calculate total gift payouts (in 10,000 KRW)
  const totalGiftDistributed = leads
    .filter((l) => l.status === '개통완료')
    .reduce((acc, curr) => acc + (curr.giftAmountExpected || 45), 0);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>실시간 가입센터 통합 관제 시스템</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            KT 스카이라이프 가입센터 관리자 포털
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
            상담 신청 고객 내역, 요금제 및 사은품 혜택, 공지/이벤트 게시글, SEO 메타 정보를 실시간으로 관리하세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setAdminTab('leads')}
            className="px-5 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-md hover:bg-blue-50 transition-colors flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>신청서 전체보기</span>
          </button>
          <button
            onClick={() => setAdminTab('posts')}
            className="px-5 py-3 rounded-xl bg-blue-600/60 hover:bg-blue-600 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>새 게시글 작성</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">총 상담신청 접수</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalLeads}건</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>실시간 누적 데이터</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">대기중 신규 신청</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">{pendingLeads}건</div>
          <div className="text-xs text-slate-400 mt-1">
            상담 진행 필요: <span className="font-bold text-slate-700">{inProgressLeads}건</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">개통 및 완료</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{completedLeads}건</div>
          <div className="text-xs text-slate-400 mt-1">
            완료율 <span className="font-bold text-slate-700">{totalLeads > 0 ? Math.round((completedLeads / totalLeads) * 100) : 0}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">누적 사은품 지급액</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-600">
            {totalGiftDistributed.toLocaleString()}만원
          </div>
          <div className="text-xs text-slate-400 mt-1">
            당일 계좌 입금 완료 기준
          </div>
        </div>
      </div>

      {/* Grid: Recent Leads + Quick Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Leads Table (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-lg text-slate-900">
                최근 상담 신청 현황
              </h3>
              <p className="text-xs text-slate-500">
                고객님이 랜딩페이지에서 신청한 실시간 접수 목록입니다.
              </p>
            </div>
            <button
              onClick={() => setAdminTab('leads')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>전체 관리</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-3">접수일시</th>
                  <th className="py-3 px-3">고객명</th>
                  <th className="py-3 px-3">연락처</th>
                  <th className="py-3 px-3">희망상품</th>
                  <th className="py-3 px-3">상태</th>
                  <th className="py-3 px-3 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                      접수된 상담 신청서가 없습니다.
                    </td>
                  </tr>
                ) : (
                  leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{lead.createdAt || '오늘'}</td>
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">{lead.name || '고객'}</td>
                      <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">{lead.phone || '-'}</td>
                      <td className="py-3 px-3 text-slate-600 max-w-[180px] truncate">{lead.productName || '-'}</td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <select
                          value={lead.status || '접수'}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value as any })}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            (lead.status || '접수') === '접수'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : lead.status === '상담중'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : lead.status === '개통완료'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          <option value="접수">접수</option>
                          <option value="상담중">상담중</option>
                          <option value="개통완료">개통완료</option>
                          <option value="보류/취소">보류/취소</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setAdminTab('leads')}
                            className="p-1 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                            title="상담신청 관리 탭에서 전체 수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`'${lead.name || '고객'}'님의 신청서를 삭제하시겠습니까?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="신청서 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Action Shortcuts (Col 4) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-base text-slate-900">
              빠른 설정 및 관리 바로가기
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => setAdminTab('cards')}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-left flex items-center justify-between transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-xs text-blue-950 group-hover:text-blue-600 flex items-center gap-1.5">
                      <span>4대 혜택 카드 문구 수정</span>
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">인기</span>
                    </div>
                    <div className="text-[11px] text-blue-800">최대 48만원, KT 동일망 등</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setAdminTab('products')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600">
                      상품 요금 & 사은품 변경
                    </div>
                    <div className="text-[11px] text-slate-500">등록 상품 {products.length}개</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setAdminTab('posts')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600">
                      공지사항 및 이벤트 작성
                    </div>
                    <div className="text-[11px] text-slate-500">게시글 {posts.length}개</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setAdminTab('design')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600">
                      디자인 테마 & 문구 커스텀
                    </div>
                    <div className="text-[11px] text-slate-500">배너, 색상, 타이틀 편집</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setAdminTab('footer')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600">
                      푸터 사업자·법적 정보 전체 수정
                    </div>
                    <div className="text-[11px] text-slate-500">상호, 대표자, 사업자번호, 고지문구</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="p-5 rounded-3xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <span>💡 실시간 동기화 안내</span>
            </div>
            <p className="text-blue-700 leading-relaxed">
              관리자 페이지에서 수정한 모든 상품, 가격, 사은품 금액, 배너 문구는 브라우저에 실시간으로 즉시 반영되며 새로고침 후에도 유지됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
