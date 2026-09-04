import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              개인정보 수집 및 이용 동의 안내
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            KT 스카이라이프 공식가입센터는 고객님의 개인정보를 소중히 다루며, 관련 법령을 철저히 준수합니다.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
            <div className="font-bold text-slate-900">1. 수집하는 개인정보의 항목</div>
            <p>이름(성명), 휴대폰 전화번호, 설치 희망 지역, 희망 가입 상품, 통화 가능 시간대</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
            <div className="font-bold text-slate-900">2. 개인정보의 수집 및 이용 목적</div>
            <p>
              - KT 스카이라이프 인터넷 및 TV 상품 가입 상담 및 요금 안내
              <br />- 설치 가능 여부 조회 및 기사 배정
              <br />- 현금 사은품 및 프로모션 혜택 지급 안내
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
            <div className="font-bold text-slate-900">3. 개인정보의 보유 및 이용 기간</div>
            <p>
              가입 상담 및 개통 처리 완료 후 관련 법령(전자상거래 등에서의 소비자보호에 관한 법률 등)에 따라 최대 3개월간 보관 후 복구 불가능한 방법으로 안전하게 파기됩니다.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
            <div className="font-bold text-slate-900">4. 동의를 거부할 권리 및 거부에 따른 불이익</div>
            <p>
              고객님께서는 개인정보 수집 및 이용 동의를 거부하실 수 있으나, 동의를 거부하실 경우 1:1 맞춤 상담 및 사은품 혜택 제공이 제한될 수 있습니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
