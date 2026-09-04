import { ProductItem, LeadItem, PostItem, ReviewItem, FaqItem, SiteSettings } from '../types';

export const defaultSiteSettings: SiteSettings = {
  siteName: 'KT skylife 공식가입센터',
  siteSubtitle: '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터',
  phoneNumber: '1588-3002',
  phoneDisplay: '1588-3002',
  workingHours: '평일 09:00 ~ 19:00 / 토요일 09:00 ~ 15:00 (일·공휴일 상담예약 가능)',
  kakaoChatUrl: 'https://pf.kakao.com',
  naverTalkUrl: 'https://talk.naver.com',
  topNoticeText: '⚡ [실시간 이벤트] 인터넷+TV 신규 가입 시 최대 48만원 현금 사은품 당일 전액 지급 + GiGA WiFi 무료!',
  heroBadge: 'KT 100% 동일망 • 전국 최고 혜택 보장',
  heroTitle: 'KT 스카이라이프 인터넷 + TV',
  heroHighlight: '최대 48만원 현금 사은품 당일 지급!',
  heroSubtitle: 'KT와 100% 동일한 광랜 인터넷망을 타사 대비 30% 알뜰한 요금으로 만나보세요. 239개 채널, 안드로이드 4 UHD 셋톱박스 기본 제공!',
  maxGiftNotice: '최대 480,000원 당일 지급',

  // Theme & Design
  primaryColor: '#0066FF',
  secondaryColor: '#0047BA',
  accentColor: '#00C2FF',
  fontFamily: 'pretendard',

  // SEO
  seoTitle: 'KT 스카이라이프 공식가입센터 | 인터넷 TV 결합 최대 현금 사은품 지원',
  seoDescription: 'KT스카이라이프 인터넷 TV 결합상품 공식가입센터. 인터넷 100M/500M/1G + all skylife TV 최대 48만원 당일 현금지급, 요금계산기, 실시간 빠른 상담 신청.',
  seoKeywords: 'KT스카이라이프, 스카이라이프가입, 스카이라이프인터넷, 스카이라이프TV, 현금사은품, 인터넷가입사은품많이주는곳, 스카이라이프요금제',
  ogImageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',

  // Business Info
  companyName: '(주)스카이라이프 공식 파트너 가입센터',
  representative: '김스카이',
  businessNumber: '123-86-09876',
  telecomSalesNumber: '제2024-서울강남-01234호',
  address: '서울특별시 강남구 테헤란로 152 강남타워 8층',
  privacyManager: '개인정보보호책임자 (privacy@skylife-partner.co.kr)',

  // Simulator / Calculator Defaults
  calcBadgeText: '실시간 견적 시뮬레이터',
  calcTitle: '내 조건에 맞춘',
  calcHighlight: '월 요금 & 현금 사은품',
  calcSubtitle: '인터넷 속도와 TV 옵션, 제휴카드를 선택하시면 예상 월 요금과 지급되는 최대 사은품을 즉시 계산해 드립니다.',
  calcBannerNotice: '+ GiGA WiFi 공유기 무료 임대 + 셋톱박스 무상 제공',
  calcGiftPrefix: '최대',
  calcGiftSuffix: '원 당일 100% 현금 입금',
  calcGiftBadge: '설치 당일 100% 입금',
  calcTvSettopNotice: '안드로이드 4 UHD 셋톱 기본제공',

  // Rates & Prices
  priceInternet100m: 17600,
  giftInternet100m: 12,
  priceInternet500m: 22000,
  giftInternet500m: 18,
  priceInternet1g: 27500,
  giftInternet1g: 20,

  priceTvSkyAll: 12100,
  giftTvSkyAllCombo: 27,
  giftTvSkyAllSolo: 8,
  nameTvSkyAll: 'Sky All',
  subTvSkyAll: '239채널 전채널 UHD',

  priceTvSkyPoint: 15400,
  giftTvSkyPointCombo: 28,
  giftTvSkyPointSolo: 8,
  nameTvSkyPoint: 'Sky Point',
  subTvSkyPoint: '239채널 + VOD포인트',

  priceTvSkyChoice: 14300,
  giftTvSkyChoiceCombo: 26,
  giftTvSkyChoiceSolo: 8,
  nameTvSkyChoice: 'Sky Choice',
  subTvSkyChoice: '맞춤형 장르팩',

  comboDiscountAmount: 4400,
  mobileDiscountAmount: 3300,
  cardDiscount1: 15000,
  cardDiscount2: 20000,
  cardDiscount3: 25000,
  cardHeaderNotice: '청구 할인 혜택',
  cardLabel0: '미적용',
  cardSub0: '일반 납부',
  cardSub1: '전월 30만원 이상',
  cardSub2: '전월 70만원 이상 (추천)',
  cardSub3: '전월 100만원 이상',

  // Consultation Form Affiliate Card Application Options
  formCardTitle: '제휴카드 신청 (선택)',
  formCardNotice: '매월 최대 20,000원 추가 청구할인',
  formCardOption0: '미신청 (일반 납부)',
  formCardOption1: '1. 30만원 이상 사용 > 15,000원 할인',
  formCardOption2: '2. 70만원 이상 사용 > 16,000원 할인',
  formCardOption3: '3. 120만원 이상 사용 > 20,000원 할인',

  // Main Screen Hero 4 Feature Cards
  heroCard1Title: '최대 48만원',
  heroCard1Desc: '당일 현금 100% 지급',
  heroCard2Title: 'KT 100% 동일망',
  heroCard2Desc: '초고속 끊김없는 광랜',
  heroCard3Title: '239개 채널 UHD',
  heroCard3Desc: '안드로이드4 OTT 셋톱',
  heroCard4Title: '공식 파트너 인증',
  heroCard4Desc: '안심 개통 및 보증제',

  // Main Screen Hero Quick Apply Box
  heroFormBadge: '30초 빠른 가입상담 신청',
  heroFormTitle: '전화번호만 남기시면 끝!',
  heroFormSubtitle: '전문 상담사가 10분 내로 최적의 결합 할인과 최대 사은품을 안내해 드립니다.',
  heroFormBtnText: '최대 사은품 혜택 상담 신청하기',

  // Why Skylife 4 Main Features Section
  whyBadge: '왜 KT 스카이라이프일까요?',
  whyTitle: 'KT의 품질 그대로,',
  whyHighlight: '요금과 혜택은 압도적으로!',
  whySubtitle: '수많은 고객님들이 약정 만료 후 KT 스카이라이프로 선택을 바꾸시는 결정적인 이유입니다.',
  whyCard1Tag: '동일 품질 보증',
  whyCard1Title: 'KT 100% 동일한 광케이블망',
  whyCard1Sub: '품질과 A/S는 본사 그대로',
  whyCard1Desc: 'KT의 전국 백본망과 광대역 통신망을 100% 동일하게 사용하여 게임, 재택근무, 고화질 스트리밍에서도 끊김 없는 최상의 속도를 보장합니다.',
  whyCard2Tag: '가계 통신비 절감',
  whyCard2Title: '타사 대비 월 30% 알뜰한 요금',
  whyCard2Sub: '3년 약정 시 최대 60만원 절약',
  whyCard2Desc: '불필요한 마케팅 비용을 뺀 합리적인 다이렉트 요금제로, 동일한 500M 인터넷+TV를 타사 4만원대 대신 2만원대에 이용할 수 있습니다.',
  whyCard3Tag: '스마트 OTT 내장',
  whyCard3Title: '안드로이드 4 UHD 스마트 셋톱',
  whyCard3Sub: '유튜브, 넷플릭스, 디즈니+ 완벽 지원',
  whyCard3Desc: '별도의 크롬캐스트나 미러링 없이 리모컨 클릭 한 번으로 유튜브, 넷플릭스, 디즈니+, 티빙, 웨이브 등 모든 OTT를 대화면 4K 초고화질로 감상하세요.',
  whyCard4Tag: '당일 전액 입금',
  whyCard4Title: '100% 당일 현금 사은품 보증제',
  whyCard4Sub: '설치 즉시 계좌로 전액 입금',
  whyCard4Desc: '본사 공식 직영 가입센터로서 상품권 분할 지급이나 지연 없이, 설치 완료 당일 약속된 사은품 전액을 고객님 명의 계좌로 즉시 입금해 드립니다.',

  // Product Plan Comparison Section
  productSecBadge: 'KT SKYLIFE 정직한 요금제',
  productSecTitle: '내게 딱 맞는 상품 찾고',
  productSecHighlight: '최대 사은품',
  productSecTitleSuffix: '받기',
  productSecSubtitle: 'KT 100% 동일망 인터넷과 239개 채널 UHD TV를 결합하여 매월 통신비를 아끼고 당일 현금 혜택까지 누리세요.',

  // Main Consultation Form Section
  formSecBadge: '1:1 맞춤 안심 상담',
  formSecTitle: 'KT 스카이라이프',
  formSecHighlight: '온라인 가입 상담 신청서',
  formSecSubtitle: '간단한 정보를 남겨주시면 담당 전문 플래너가 가장 높은 혜택과 맞춤 사은품을 안내해 드립니다.',
  formSubmitBtnText: '최대 사은품 혜택으로 가입 상담 신청하기',

  // Review Section
  reviewSecBadge: '고객 감동 리얼 후기',
  reviewSecTitle: '개통 고객님들이 직접 증명하는',
  reviewSecHighlight: '만족도 99.8%',
  reviewSecSubtitle: '사은품 당일 지급 완료 인증과 설치 사진을 실시간으로 확인해보세요.',

  // FAQ Section
  faqSecBadge: '궁금증 해결',
  faqSecTitle: '자주 묻는 질문 (FAQ)',
  faqSecSubtitle: '가입 전 가장 많이 문의주시는 질문들을 모았습니다. 추가 문의는 언제든 전화상담을 이용해주세요.',

  // Board Section
  boardSecBadge: '소식 & 프로모션',
  boardSecTitle: '공지사항 및',
  boardSecHighlight: '이달의 이벤트',
  boardSecSubtitle: '스카이라이프의 최신 혜택 정보와 프로모션 이벤트를 실시간으로 전해드립니다.',

  // Ticker
  tickerTitle: '실시간 사은품 지급 현황',

  // Footer text customization
  footerBrandTitle: '공식 가입 센터',
  footerKtBadge: 'KT',
  footerDescLine1: '인터넷 + TV 결합 대한민국 1등 가성비 공식 직영센터',
  footerDescLine2: 'KT 100% 동일망 초고속 인터넷 및 239개 전 채널 안드로이드 4 UHD TV 결합상품 공식 파트너.',
  footerBadge1: '본사 공식 인증 대리점',
  footerBadge2: '100% 당일 사은품 지급 보증',

  // Footer Contact info
  footerPhoneTitle: '가입 및 요금 상담 직통 센터',
  footerWorkingHoursLabel: '상담 운영시간',

  // Footer Business & Legal Labels & Values
  footerLabelCompanyName: '상호명',
  footerLabelRepresentative: '대표자',
  footerLabelBizNum: '사업자등록번호',
  footerLabelTelecomNum: '통신판매업신고',
  footerLabelAddress: '사업장 소재지',
  footerLabelPrivacy: '개인정보관리책임자',

  // Extra legal info
  footerLabelApproval: '유선통신사전승낙',
  telecomApprovalNumber: '사전승낙서 승인번호: 제 2024-SK-00129호',
  footerLabelEmail: '고객문의 이메일',
  companyEmail: 'help@skylife-direct.co.kr',

  // Legal Notices
  footerNoticeText: '[안내사항] 본 웹사이트는 KT 스카이라이프 유치 및 가입 상담을 대행하는 공식 온라인 파트너 대리점이며, 모든 상품 및 사은품 정책은 본사 정식 약관에 의거하여 투명하게 운영됩니다.',
  footerLegalSubNotice: '※ 개통 후 1년 이내 해지, 일시정지, 요금제 하향 변경 시 지급된 사은품 전액 환수 및 본사 약정 위약금이 발생할 수 있습니다.',

  // Copyright & Navigation
  footerCopyright: '© 2026 KT skylife Partner. All rights reserved.',
  footerLink1: '결합상품',
  footerLink2: '요금계산기',
  footerLink3: '자주묻는질문',
  footerAdminBtnText: '관리자 대시보드',
};

export const defaultProducts: ProductItem[] = [
  {
    id: 'prod-combo-500m',
    category: 'combo',
    name: '인터넷 500M + Sky All (239채널)',
    subName: '가장 많이 찾는 가성비 1등 결합상품',
    speed: '500Mbps (기가 라이트)',
    channels: '239개 전 채널 HD/UHD',
    originalPrice: 42900,
    salePrice: 29700,
    cardDiscountPrice: 9700,
    giftAmount: 45,
    giftDescription: '현금 45만원 당일 지급 + 기가 와이파이 무료',
    badge: '인기 1위 BEST',
    badgeColor: 'bg-blue-600 text-white',
    features: [
      'KT 100% 동일망 500Mbps 초고속 기가 인터넷',
      '239개 전 채널 시청 (스포츠, 드라마, 영화, 애니)',
      '안드로이드 4 UHD 셋톱박스 (유튜브, 넷플릭스, 디즈니+ 지원)',
      '최신형 GiGA WiFi 공유기 무료 임대',
      '설치 당일 현금 사은품 45만원 전액 계좌 입금'
    ],
    isPopular: true
  },
  {
    id: 'prod-combo-100m',
    category: 'combo',
    name: '인터넷 100M + Sky All (239채널)',
    subName: '1~2인 가구 및 부모님 댁 맞춤 초특가 상품',
    speed: '100Mbps (광랜)',
    channels: '239개 전 채널 HD/UHD',
    originalPrice: 38500,
    salePrice: 24200,
    cardDiscountPrice: 4200,
    giftAmount: 38,
    giftDescription: '현금 38만원 당일 지급 + 와이파이 무료',
    badge: '초알뜰 특가',
    badgeColor: 'bg-emerald-600 text-white',
    features: [
      '안정적인 100Mbps 웹서핑 및 OTT 스트리밍',
      '239개 전 채널 풍성한 TV 방송 시청',
      '안드로이드 UHD 셋톱박스 제공',
      '제휴카드 이용 시 월 4,200원의 압도적 가성비',
      '설치 당일 현금 사은품 38만원 즉시 지급'
    ]
  },
  {
    id: 'prod-combo-1g',
    category: 'combo',
    name: '인터넷 1G (기가) + Sky All (239채널)',
    subName: '대용량 다운로드 및 고사양 게이머 전용 최고속 결합',
    speed: '1Gbps (1000Mbps)',
    channels: '239개 전 채널 HD/UHD',
    originalPrice: 48400,
    salePrice: 34100,
    cardDiscountPrice: 14100,
    giftAmount: 48,
    giftDescription: '최대 현금 48만원 당일 지급 + 기가 와이파이',
    badge: '최대 혜택',
    badgeColor: 'bg-amber-600 text-white',
    features: [
      '1Gbps 최고속 광대역 기가 인터넷 (재택근무/게이밍 최적화)',
      '239개 전 채널 생생한 초고화질 UHD 방송',
      '안드로이드 4 최신 UHD 셋톱박스 무상 업그레이드',
      '프리미엄 기가 와이파이 공유기 무상 임대',
      '전국 최고 혜택 현금 사은품 48만원 당일 지급'
    ]
  },
  {
    id: 'prod-combo-point',
    category: 'combo',
    name: '인터넷 500M + Sky Point (239채널)',
    subName: '매월 VOD 포인트 적립으로 최신 영화 감상',
    speed: '500Mbps',
    channels: '239개 전 채널 + 매월 5,500P 적립',
    originalPrice: 46200,
    salePrice: 33000,
    cardDiscountPrice: 13000,
    giftAmount: 46,
    giftDescription: '현금 46만원 지급 + 매월 VOD 5,500P',
    badge: 'VOD 매니아',
    badgeColor: 'bg-indigo-600 text-white',
    features: [
      '500Mbps 기가인터넷 + 239채널 TV',
      '매월 5,500 VOD 포인트 36개월간 연속 적립',
      '최신 극장 개봉작 및 인기 드라마 무료 시청',
      '기가 와이파이 무료 제공',
      '현금 사은품 46만원 당일 계좌 입금'
    ]
  },
  {
    id: 'prod-internet-500m',
    category: 'internet',
    name: '인터넷 단독 500M (기가 라이트)',
    subName: 'TV 없이 인터넷만 필요하신 고객님을 위한 상품',
    speed: '500Mbps',
    originalPrice: 33000,
    salePrice: 22000,
    cardDiscountPrice: 2000,
    giftAmount: 18,
    giftDescription: '현금 18만원 당일 지급',
    badge: '인터넷 추천',
    badgeColor: 'bg-blue-500 text-white',
    features: [
      'KT 100% 동일망 500Mbps 안정적인 광랜',
      '기가 와이파이 무료 임대',
      '가입 설치 당일 사은품 18만원 즉시 입금'
    ]
  },
  {
    id: 'prod-internet-100m',
    category: 'internet',
    name: '인터넷 단독 100M (알뜰 광랜)',
    subName: '원룸/오피스텔/자취생 필수 알뜰 인터넷',
    speed: '100Mbps',
    originalPrice: 24200,
    salePrice: 17600,
    cardDiscountPrice: 0,
    giftAmount: 12,
    giftDescription: '현금 12만원 당일 지급',
    badge: '알뜰 실속',
    badgeColor: 'bg-slate-600 text-white',
    features: [
      '100Mbps 쾌적한 인터넷 서핑',
      '와이파이 공유기 기본 포함',
      '사은품 12만원 당일 지급'
    ]
  },
  {
    id: 'prod-tv-all',
    category: 'tv',
    name: 'Sky All TV 단독 (239채널)',
    subName: '인터넷 없이 선명한 고화질 TV만 시청할 때',
    channels: '239개 전 채널 HD/UHD',
    originalPrice: 16500,
    salePrice: 12100,
    cardDiscountPrice: 0,
    giftAmount: 8,
    giftDescription: '백화점 상품권 또는 현금 8만원',
    badge: 'TV 단독 1위',
    badgeColor: 'bg-cyan-600 text-white',
    features: [
      '239개 풍성한 TV 채널 시청',
      '최신 안드로이드 UHD 셋톱박스 제공',
      '유튜브, OTT 시청 가능 (핫스팟 연결 시)'
    ]
  },
  {
    id: 'prod-mobile-combo',
    category: 'mobile',
    name: '인터넷+TV+알뜰폰 결합 (스카이라이프 모바일)',
    subName: '가계 통신비 50% 이상 파격 절감 솔루션',
    speed: '500Mbps + 239채널 + 알뜰폰',
    originalPrice: 66000,
    salePrice: 42900,
    cardDiscountPrice: 22900,
    giftAmount: 48,
    giftDescription: '최대 48만원 사은품 + 모바일 추가할인',
    badge: '통신비 반값',
    badgeColor: 'bg-rose-600 text-white',
    features: [
      '인터넷+TV 결합 시 모바일 요금 매월 추가 3,300원~11,000원 할인',
      'KT망 데이터/음성 무제한 알뜰폰 요금제 결합',
      '약정 없는 자유로운 유심 가입 가능',
      '결합 추가 혜택 및 현금 사은품 최대 48만원 지급'
    ]
  }
];

export const defaultLeads: LeadItem[] = [
  {
    id: 'lead-1',
    createdAt: '2026-08-25 10:14',
    name: '김*수',
    phone: '010-38**-9120',
    region: '서울시 강남구 역삼동',
    productName: '인터넷 500M + Sky All (239채널)',
    preferredTime: '오후 14:00 ~ 17:00',
    status: '상담중',
    memo: '타사 약정 만료로 이전 희망. 이번 주 금요일 오후 설치 요청.',
    giftAmountExpected: 45
  },
  {
    id: 'lead-2',
    createdAt: '2026-08-25 09:30',
    name: '이*영',
    phone: '010-82**-4451',
    region: '경기도 수원시 영통구',
    productName: '인터넷 500M + Sky All (239채널)',
    preferredTime: '언제나 통화 가능',
    status: '개통완료',
    memo: '설치 완료 및 사은품 45만원 계좌 이체 확인 완료.',
    giftAmountExpected: 45
  },
  {
    id: 'lead-3',
    createdAt: '2026-08-25 08:45',
    name: '박*현',
    phone: '010-91**-7712',
    region: '인천시 연수구 송도동',
    productName: '인터넷 1G (기가) + Sky All (239채널)',
    preferredTime: '오전 10:00 ~ 12:00',
    status: '접수',
    memo: '재택근무로 기가인터넷 필수. 제휴카드 할인 문의 예정.',
    giftAmountExpected: 48
  },
  {
    id: 'lead-4',
    createdAt: '2026-08-24 18:20',
    name: '최*호',
    phone: '010-23**-5901',
    region: '부산시 해운대구 우동',
    productName: '인터넷 100M + Sky All (239채널)',
    preferredTime: '오후 18:00 이후',
    status: '개통완료',
    memo: '부모님 댁 설치. 안드로이드 UHD 셋톱박스 안내 완료.',
    giftAmountExpected: 38
  },
  {
    id: 'lead-5',
    createdAt: '2026-08-24 15:10',
    name: '정*진',
    phone: '010-44**-1290',
    region: '대전시 유성구 봉명동',
    productName: '인터넷 단독 500M (기가 라이트)',
    preferredTime: '점심시간 12:00 ~ 13:00',
    status: '상담중',
    memo: '원룸 자취 인터넷 단독 신청. WiFi 공유기 포함 여부 확인.',
    giftAmountExpected: 18
  }
];

export const defaultPosts: PostItem[] = [
  {
    id: 'post-1',
    title: '📢 [공지] 2026년 최신 KT 스카이라이프 사은품 당일 전액 지급 정책 안내',
    category: '공지사항',
    date: '2026-08-20',
    author: '관리자',
    views: 3420,
    isPinned: true,
    summary: '저희 공식 가입센터는 본사 공식 직영 파트너로서 기사님 방문 설치 즉시 100% 당일 현금 사은품을 계좌로 입금해 드립니다.',
    content: `안녕하세요, KT 스카이라이프 공식가입센터입니다.

저희 센터를 통해 인터넷 및 TV 결합상품을 가입해주시는 모든 고객님께 감사드립니다.

■ 현금 사은품 당일 지급 안내
1. 기사님 방문 설치 및 개통 완료
2. 고객센터 개통 전산 확인 즉시 입금 요청
3. 설치 당일 오후 6시 이전 고객님 본인 명의 계좌로 100% 전액 입금

※ 타 불법 대리점처럼 상품권 분할 지급이나 익월 말 지급 등의 지연 없이, 전액 당일 현금 지급을 철저히 약속드립니다.

■ 가입 혜택
- 인터넷 500M + Sky All : 현금 45만원 당일 지급
- 인터넷 1G + Sky All : 현금 48만원 당일 지급
- 최신 GiGA WiFi 무상 임대
- 안드로이드 4 UHD 최신형 셋톱박스 제공`,
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-2',
    title: '🎁 [이벤트] 인터넷+TV 신규 가입 시 GiGA WiFi 6 무상 업그레이드 프로모션',
    category: '이벤트',
    date: '2026-08-15',
    author: '운영팀',
    views: 2150,
    isPinned: true,
    summary: '이달의 특별 한정 이벤트! 인터넷 500M 이상 결합 시 차세대 초고속 WiFi 6 무선공유기를 무상으로 지원합니다.',
    content: `[이벤트 내용]
인터넷 500M 또는 1G 상품과 Sky All TV를 결합 가입하시는 모든 고객님께 기존 WiFi 공유기 대신 초고속 WiFi 6 단말기를 3년 약정 기간 동안 무상 임대 지원합니다.

■ 이벤트 기간 : 이번 달 말일까지 (선착순 100명 한정)
■ 대상 상품 : 인터넷 500M/1G + Sky All 결합 가입 고객
■ 혜택 : 
1. WiFi 6 공유기 무상 제공 (월 2,200원 상당 면제)
2. 최대 48만원 현금 사은품 당일 지급
3. 넷플릭스 / 디즈니+ 1개월 무료 체험권 증정`,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-3',
    title: '💡 [가이드] KT 스카이라이프 요금, 왜 타사보다 월 1만원 이상 저렴할까요?',
    category: '가입혜택',
    date: '2026-08-10',
    author: '전문상담사',
    views: 1890,
    isPinned: false,
    summary: 'KT 100% 동일한 광케이블 망을 사용하면서도 유통 거품을 뺀 스카이라이프만의 합리적인 요금 비밀을 알려드립니다.',
    content: `많은 고객님들께서 "스카이라이프는 왜 이렇게 요금이 저렴한가요? 품질이 떨어지는 건 아닌가요?"라고 질문하십니다.

결론부터 말씀드리면, **KT 인터넷 망과 100% 동일한 선로와 광케이블 망**을 그대로 사용하므로 속도와 안정성, 핑(Ping) 수치가 KT 본사 인터넷과 완벽하게 일치합니다!

■ 스카이라이프가 저렴한 3가지 이유:
1. 위성 및 IPTV 결합 기술을 통한 망 사용료 절감
2. 불필요한 마케팅 거품을 제거한 다이렉트 요금 정책
3. 안드로이드 오픈 플랫폼 셋톱박스 채택으로 원가 절감

타 통신사 3사 대비 3년 약정 시 무려 **40만원~60만원 이상의 통신비 절감 효과**를 누리실 수 있습니다.`,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'post-4',
    title: '📸 [설치후기] 서울 송파구 아파트 500M+TV 결합 설치 및 사은품 입금 인증',
    category: '설치후기',
    date: '2026-08-05',
    author: '고객지원팀',
    views: 1420,
    isPinned: false,
    summary: '서울 송파구 신축 아파트 고객님의 깔끔한 배선 정리와 안드로이드 UHD 셋톱박스 설치 완료 사례입니다.',
    content: `서울 송파구 잠실동 아파트에 거주하시는 박*훈 고객님 댁 설치 사례입니다.

- 가입 상품 : 인터넷 500M + Sky All (239채널)
- 특이 사항 : 거실 TV 벽걸이 배선 깔끔 숨김 작업 요청
- 사은품 처리 : 설치 당일 오후 4시 20분 현금 45만원 계좌 입금 완료

고객님 코멘트:
"기존 타사 쓰다가 약정 끝나서 바꿨는데 유튜브 반응속도도 엄청 빠르고 화질도 너무 깨끗하네요! 무엇보다 상담해주신 분이 친절하시고 약속대로 설치 당일에 사은품 입금 딱 들어와서 신뢰가 갑니다!"`,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'
  }
];

export const defaultReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: '김*수',
    region: '서울시 서초구',
    productName: '인터넷 500M + Sky All (239채널)',
    rating: 5,
    date: '2026-08-23',
    giftReceived: '현금 45만원 당일 입금 완료',
    comment: '상담받고 다음 날 바로 기사님 오셔서 설치해주셨어요. 설치 끝나고 30분 뒤에 계좌로 약속된 사은품 45만원 바로 들어왔습니다! 넷플릭스 유튜브도 바로 되고 가성비 최고입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-2',
    customerName: '정*우',
    region: '경기도 성남시 분당구',
    productName: '인터넷 1G + Sky All',
    rating: 5,
    date: '2026-08-21',
    giftReceived: '현금 48만원 당일 입금 완료',
    comment: '롤이랑 배그 게임 자주 해서 기가인터넷으로 했는데 핑 3~4ms 나오고 KT 본사랑 완전히 똑같습니다. 요금은 훨씬 싼데 사은품도 48만원 빵빵하게 챙겨받아서 기분 좋네요.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-3',
    customerName: '이*진',
    region: '인천시 부평구',
    productName: '인터넷 100M + Sky All',
    rating: 5,
    date: '2026-08-19',
    giftReceived: '현금 38만원 당일 입금 완료',
    comment: '부모님 댁 TV랑 인터넷 바꿔드렸는데 리모컨에 넷플릭스, 유튜브 버튼이 바로 있어서 부모님도 쉽게 쓰십니다. 제휴카드 할인까지 받으니 월 요금 만원도 안 나와요 강추합니다!',
    imageUrl: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-4',
    customerName: '최*민',
    region: '부산시 해운대구',
    productName: '인터넷 500M + Sky Point',
    rating: 5,
    date: '2026-08-16',
    giftReceived: '현금 46만원 당일 입금 완료',
    comment: '매달 VOD 포인트 들어오는 상품으로 가입했는데 주말마다 최신 영화 골라보는 재미가 쏠쏠합니다. 와이파이 속도도 온 집안 빵빵하게 잘 터져요.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
  }
];

export const defaultFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    category: '가입 및 사은품',
    question: '현금 사은품은 언제, 어떻게 지급되나요?',
    answer: '기사님이 방문하셔서 설치 및 개통을 완료하시면, 전산 등록 확인 즉시 설치 당일 오후(영업일 기준) 고객님 명의의 계좌로 100% 현금 전액 입금됩니다. 분할 지급이나 상품권 강요 없이 깔끔하게 처리됩니다.'
  },
  {
    id: 'faq-2',
    category: '품질 및 속도',
    question: '스카이라이프 인터넷은 KT 본사 인터넷과 품질 차이가 있나요?',
    answer: '차이가 전혀 없습니다. KT 스카이라이프는 KT의 100% 동일한 광케이블 인터넷망과 전국 백본망을 그대로 임대하여 서비스하므로, 인터넷 속도, 안정성, 다운로드 속도 및 A/S 망까지 KT와 완벽히 동일합니다.'
  },
  {
    id: 'faq-3',
    category: 'TV 및 셋톱박스',
    question: '비나 눈이 올 때 TV 수신에 이상이 없나요? 넷플릭스/유튜브도 시청 가능한가요?',
    answer: '과거 안테나 방식과 달리 현재는 IP 백업 스트리밍 기술과 광케이블 전송 방식을 결합하여 폭우나 폭설에도 끊김 없이 깨끗한 UHD 고화질을 지원합니다. 또한 제공되는 안드로이드 4 최신 UHD 셋톱박스로 유튜브, 넷플릭스, 디즈니+, 웨이브, 티빙 등을 별도 기기 없이 바로 시청하실 수 있습니다.'
  },
  {
    id: 'faq-4',
    category: '요금 및 할인',
    question: '제휴카드 할인은 어떻게 적용받나요?',
    answer: '스카이라이프 전용 제휴카드(국민, 신한, 롯데, 현대 등)로 자동이체를 등록하시면 전월 카드 사용 실적(30만~70만원 이상)에 따라 매월 15,000원 ~ 25,000원까지 요금이 청구 할인됩니다. 실적에 따라 월 0원~몇천원 대로 이용 가능합니다.'
  },
  {
    id: 'faq-5',
    category: '위약금 및 이전설치',
    question: '기존 통신사 위약금이나 약정 만료는 어떻게 확인하나요?',
    answer: '상담 신청을 남겨주시면 전문 상담사가 고객님의 기존 통신사 약정 만료일 조회 방법과 가장 유리한 전환 시점, 위약금 상쇄 혜택 플랜을 1:1 맞춤으로 상세히 안내해 드립니다.'
  }
];
