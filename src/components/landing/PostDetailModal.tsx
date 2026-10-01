import React from 'react';
import { PostItem } from '../../types';
import { X, Calendar, Eye, Tag, ArrowRight } from 'lucide-react';

interface PostDetailModalProps {
  post: PostItem | null;
  onClose: () => void;
  onApplyClick: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose, onApplyClick }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {post.category}
              </span>
              {post.isPinned && (
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700">
                  중요 공지
                </span>
              )}
            </div>
            <h3 className="text-xl font-black text-slate-900 leading-snug">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                조회 {post.views}
              </span>
              <span>작성자: {post.author}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {post.imageUrl && (
            <div className="rounded-2xl overflow-hidden max-h-72 bg-slate-100">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line space-y-3 font-normal">
            {post.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100"
          >
            목록으로 닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onApplyClick();
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <span>상담 바로 신청</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
