import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCategory, PostItem } from '../../types';
import { Newspaper, Pin, Calendar, ChevronRight, Eye } from 'lucide-react';
import { PostDetailModal } from './PostDetailModal';

interface BoardSectionProps {
  onScrollToApply: () => void;
}

export const BoardSection: React.FC<BoardSectionProps> = ({ onScrollToApply }) => {
  const { posts, siteSettings } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | '전체'>('전체');
  const [activePost, setActivePost] = useState<PostItem | null>(null);

  const categories: (PostCategory | '전체')[] = ['전체', '공지사항', '이벤트', '가입혜택', '설치후기'];

  const filteredPosts = selectedCategory === '전체'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  return (
    <section id="board" className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
              <Newspaper className="w-3.5 h-3.5 text-blue-600" />
              <span>{siteSettings.boardSecBadge || '소식 & 프로모션'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {siteSettings.boardSecTitle || '공지사항 및'}{' '}
              <span className="text-blue-600">{siteSettings.boardSecHighlight || '이달의 이벤트'}</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {siteSettings.boardSecSubtitle || '스카이라이프의 최신 혜택 정보와 프로모션 이벤트를 실시간으로 전해드립니다.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Thumbnail if any */}
                {post.imageUrl && (
                  <div className="h-36 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Badge & Meta */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700">
                    {post.category}
                  </span>
                  {post.isPinned && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      <Pin className="w-3 h-3" />
                      고정
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  상세보기 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Reading Modal */}
      <PostDetailModal
        post={activePost}
        onClose={() => setActivePost(null)}
        onApplyClick={onScrollToApply}
      />
    </section>
  );
};
