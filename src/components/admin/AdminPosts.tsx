import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostItem, PostCategory } from '../../types';
import { Plus, Edit2, Trash2, Pin, Eye, Calendar, X, Sparkles } from 'lucide-react';

export const AdminPosts: React.FC = () => {
  const { posts, addPost, updatePost, deletePost, showToast } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PostCategory>('공지사항');
  const [author, setAuthor] = useState('관리자');
  const [isPinned, setIsPinned] = useState(false);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const categories: PostCategory[] = ['공지사항', '이벤트', '가입혜택', '설치후기'];

  const handleOpenCreate = () => {
    setEditingPostId(null);
    setTitle('');
    setCategory('공지사항');
    setAuthor('관리자');
    setIsPinned(false);
    setSummary('');
    setContent('');
    setImageUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: PostItem) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setAuthor(post.author);
    setIsPinned(post.isPinned);
    setSummary(post.summary);
    setContent(post.content);
    setImageUrl(post.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('제목과 본문 내용을 입력해주세요.', 'error');
      return;
    }

    if (editingPostId) {
      updatePost(editingPostId, {
        title: title.trim(),
        category,
        author,
        isPinned,
        summary: summary.trim() || title.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined
      });
    } else {
      addPost({
        title: title.trim(),
        category,
        author,
        isPinned,
        summary: summary.trim() || title.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            게시글 & 프로모션 관리
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            웹사이트에 노출되는 공지사항, 이벤트, 설치후기, 혜택 가이드를 작성 및 수정합니다.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>새 게시글 등록</span>
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">분류</th>
                <th className="py-3.5 px-4">제목</th>
                <th className="py-3.5 px-4">작성자</th>
                <th className="py-3.5 px-4">등록일</th>
                <th className="py-3.5 px-4">조회수</th>
                <th className="py-3.5 px-4 text-center">상단고정</th>
                <th className="py-3.5 px-4 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 line-clamp-1">{post.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{post.summary}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{post.author}</td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{post.date}</td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-400" />
                    {post.views}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {post.isPinned ? (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600">
                        <Pin className="w-3 h-3" /> 고정됨
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                        title="수정"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-black text-xl text-slate-900">
                {editingPostId ? '게시글 수정' : '새 게시글 작성'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">카테고리 *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PostCategory)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-xs font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">작성자 명</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-xs"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-bold text-slate-800">목록 상단 고정(공지)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">게시글 제목 *</label>
                <input
                  type="text"
                  required
                  placeholder="제목을 입력하세요..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">한 줄 요약 (서머리)</label>
                <input
                  type="text"
                  placeholder="목록 카드에 노출될 간단한 요약..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">커버 이미지 URL (선택)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">본문 내용 *</label>
                <textarea
                  rows={8}
                  required
                  placeholder="게시글 내용을 상세히 작성하세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white text-xs leading-relaxed resize-y font-normal"
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border text-slate-600 font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  {editingPostId ? '수정사항 저장' : '새 글 등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
