import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  Gift,
  Palette,
  Settings,
  Building,
  ExternalLink,
  RotateCcw,
  Sparkles,
  LogOut,
  CloudCheck,
  CloudUpload,
  Cloud
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setViewMode, logoutAdmin, adminTab, setAdminTab, siteSettings, leads, syncStatus } = useApp();

  const newLeadsCount = leads.filter((l) => l.status === '접수').length;

  const navTabs = [
    { id: 'dashboard', label: '대시보드 요약', icon: LayoutDashboard },
    { id: 'leads', label: '상담신청 관리', icon: Users, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { id: 'cards', label: '4대 혜택 카드 설정', icon: Gift },
    { id: 'products', label: '상품/요금제 설정', icon: Package },
    { id: 'design', label: '메인화면 문구 & 디자인', icon: Palette },
    { id: 'footer', label: '푸터 사업자·법적 정보', icon: Building },
    { id: 'posts', label: '게시글/공지 관리', icon: FileText },
    { id: 'settings', label: 'SEO & 사이트 설정', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Admin Top Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Cloud Status */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-md">
                KT
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>스카이라이프 관리자 센터</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    ADMIN
                  </span>
                  
                  {/* Cloud Realtime Status Indicator */}
                  {syncStatus === 'syncing' ? (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                      <CloudUpload className="w-3 h-3 text-amber-400 animate-bounce" />
                      클라우드 동기화 중...
                    </span>
                  ) : syncStatus === 'saved' ? (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Cloud className="w-3 h-3 text-emerald-400" />
                      클라우드 영구 저장됨
                    </span>
                  ) : (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      <Cloud className="w-3 h-3 text-blue-400" />
                      클라우드 실시간 연동
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  {siteSettings.siteName}
                </div>
              </div>
            </div>

            {/* Top Right Actions: Return to Website Preview & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setViewMode('landing')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
              >
                <span>웹사이트 보기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={logoutAdmin}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 hover:border-rose-800/60 transition-colors"
                title="관리자 로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-800/90 border-t border-slate-700/60 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};
