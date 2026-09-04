import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs, siteSettings } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>{siteSettings.faqSecBadge || '궁금증 해결'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {siteSettings.faqSecTitle || '자주 묻는 질문 (FAQ)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            {siteSettings.faqSecSubtitle || '가입 전 가장 많이 문의주시는 질문들을 모았습니다. 추가 문의는 언제든 전화상담을 이용해주세요.'}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 bg-white"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-blue-50 text-blue-600 font-black text-[11px] sm:text-xs flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span className="font-bold text-slate-900 text-xs sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-blue-50/20 border-t border-slate-100 flex items-start gap-2.5 sm:gap-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-emerald-50 text-emerald-600 font-black text-[11px] sm:text-xs flex items-center justify-center shrink-0 mt-0.5">
                      A
                    </span>
                    <div className="flex-1 text-slate-700 whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
