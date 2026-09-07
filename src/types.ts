export type ProductCategory = 'combo' | 'internet' | 'tv' | 'mobile';

export interface ProductItem {
  id: string;
  category: ProductCategory;
  name: string;
  subName: string;
  speed?: string; // e.g. "100M", "500M", "1G"
  channels?: string; // e.g. "239채널"
  originalPrice: number; // Regular monthly fee (원)
  salePrice: number; // Discounted monthly fee (원)
  cardDiscountPrice?: number; // Price with affiliate card (원)
  giftAmount: number; // Cash gift in 10,000 KRW (e.g. 45 -> 45만원)
  giftDescription: string;
  giftTimingText?: string; // e.g. "당일 지급", "현금 입금"
  giftMethodText?: string; // e.g. "계좌 전액 입금"
  badge?: string; // e.g. "인기 1위", "초특가", "추천"
  badgeColor?: string;
  features: string[];
  isPopular?: boolean;
}

export type LeadStatus = '접수' | '상담중' | '개통완료' | '보류/취소';

export interface LeadItem {
  id: string;
  createdAt: string; // ISO string or format
  name: string;
  phone: string;
  region: string; // e.g. "서울 강남구"
  productName: string;
  preferredTime: string; // e.g. "언제나 가능", "오전 09:00~12:00", "오후 13:00~18:00"
  status: LeadStatus;
  memo?: string;
  giftAmountExpected?: number; // in 10,000 KRW
  affiliateCardOption?: string; // e.g. "1. 30만원 이상 사용 > 15,000원 할인"
}

export type PostCategory = '공지사항' | '이벤트' | '가입혜택' | '설치후기';

export interface PostItem {
  id: string;
  title: string;
  category: PostCategory;
  date: string;
  author: string;
  views: number;
  isPinned: boolean;
  summary: string;
  content: string;
  imageUrl?: string;
}

export interface ReviewItem {
  id: string;
  customerName: string; // e.g. "김*수"
  region: string; // e.g. "경기 수원시"
  productName: string;
  rating: number; // 1 to 5
  date: string;
  giftReceived: string; // e.g. "현금 45만원 당일 입금"
  comment: string;
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  siteName: string;
  siteSubtitle: string;
  phoneNumber: string;
  phoneDisplay: string;
  workingHours: string;
  kakaoChatUrl: string;
  naverTalkUrl: string;
  topNoticeText: string;
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  maxGiftNotice: string;
  
  // Theme & Design
  primaryColor: string; // Hex e.g. #0066FF
  secondaryColor: string; // Hex e.g. #0A58CA
  accentColor: string; // Hex e.g. #00D2FF
  fontFamily: 'pretendard' | 'noto' | 'gmarket';
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImageUrl: string;
  
  // Business Info
  companyName: string;
  representative: string;
  businessNumber: string;
  telecomSalesNumber: string;
  address: string;
  privacyManager: string;

  // Simulator / Calculator Settings
  calcTitle: string;
  calcHighlight: string;
  calcSubtitle: string;
  calcBadgeText: string;
  calcBannerNotice: string;
  calcGiftPrefix: string;
  calcGiftSuffix: string;
  calcGiftBadge?: string; // e.g. "설치 당일 100% 입금", "현금 입금"
  calcTvSettopNotice?: string;
  
  // Calculator Rates & Prices (KRW)
  priceInternet100m: number;
  giftInternet100m: number;
  priceInternet500m: number;
  giftInternet500m: number;
  priceInternet1g: number;
  giftInternet1g: number;

  priceTvSkyAll: number;
  giftTvSkyAllCombo: number;
  giftTvSkyAllSolo: number;
  nameTvSkyAll?: string;
  subTvSkyAll?: string;

  priceTvSkyPoint: number;
  giftTvSkyPointCombo: number;
  giftTvSkyPointSolo: number;
  nameTvSkyPoint?: string;
  subTvSkyPoint?: string;

  priceTvSkyChoice: number;
  giftTvSkyChoiceCombo: number;
  giftTvSkyChoiceSolo: number;
  nameTvSkyChoice?: string;
  subTvSkyChoice?: string;

  comboDiscountAmount: number;
  mobileDiscountAmount: number;
  cardDiscount1: number;
  cardDiscount2: number;
  cardDiscount3: number;
  cardHeaderNotice?: string;
  cardLabel0?: string;
  cardSub0?: string;
  cardSub1?: string;
  cardSub2?: string;
  cardSub3?: string;

  // Consultation Form Card Options
  formCardTitle?: string;
  formCardNotice?: string;
  formCardOption0?: string;
  formCardOption1?: string;
  formCardOption2?: string;
  formCardOption3?: string;

  // Main Screen Hero 4 Feature Cards
  heroCard1Title?: string;
  heroCard1Desc?: string;
  heroCard2Title?: string;
  heroCard2Desc?: string;
  heroCard3Title?: string;
  heroCard3Desc?: string;
  heroCard4Title?: string;
  heroCard4Desc?: string;

  // Main Screen Hero Quick Apply Box
  heroFormBadge?: string;
  heroFormTitle?: string;
  heroFormSubtitle?: string;
  heroFormBtnText?: string;

  // Why Skylife 4 Main Features Section
  whyBadge?: string;
  whyTitle?: string;
  whyHighlight?: string;
  whySubtitle?: string;
  whyCard1Tag?: string;
  whyCard1Title?: string;
  whyCard1Sub?: string;
  whyCard1Desc?: string;
  whyCard2Tag?: string;
  whyCard2Title?: string;
  whyCard2Sub?: string;
  whyCard2Desc?: string;
  whyCard3Tag?: string;
  whyCard3Title?: string;
  whyCard3Sub?: string;
  whyCard3Desc?: string;
  whyCard4Tag?: string;
  whyCard4Title?: string;
  whyCard4Sub?: string;
  whyCard4Desc?: string;

  // Product Plan Comparison Section
  productSecBadge?: string;
  productSecTitle?: string;
  productSecHighlight?: string;
  productSecTitleSuffix?: string;
  productSecSubtitle?: string;

  // Main Consultation Form Section
  collectCustomerName?: boolean; // 상담 신청 폼 고객명(성함) 입력 필드 표시 여부 (기본: false - 일단 미표시)
  formSecBadge?: string;
  formSecTitle?: string;
  formSecHighlight?: string;
  formSecSubtitle?: string;
  formSubmitBtnText?: string;

  // Review Section
  reviewSecBadge?: string;
  reviewSecTitle?: string;
  reviewSecHighlight?: string;
  reviewSecSubtitle?: string;

  // FAQ Section
  faqSecBadge?: string;
  faqSecTitle?: string;
  faqSecSubtitle?: string;

  // Board Section
  boardSecBadge?: string;
  boardSecTitle?: string;
  boardSecHighlight?: string;
  boardSecSubtitle?: string;

  // Ticker
  tickerTitle?: string;

  // Footer text customization
  footerBrandTitle?: string;
  footerKtBadge?: string;
  footerDescLine1?: string;
  footerDescLine2?: string;
  footerBadge1?: string;
  footerBadge2?: string;
  
  // Footer Contact info
  footerPhoneTitle?: string;
  footerWorkingHoursLabel?: string;
  
  // Footer Business & Legal Labels & Values
  footerLabelCompanyName?: string;
  footerLabelRepresentative?: string;
  footerLabelBizNum?: string;
  footerLabelTelecomNum?: string;
  footerLabelAddress?: string;
  footerLabelPrivacy?: string;
  
  // Extra legal / business lines
  footerLabelApproval?: string;
  telecomApprovalNumber?: string;
  footerLabelEmail?: string;
  companyEmail?: string;

  // Legal notice & sub notice
  footerNoticeText?: string;
  footerLegalSubNotice?: string;

  // Copyright & Nav links
  footerCopyright?: string;
  footerLink1?: string;
  footerLink2?: string;
  footerLink3?: string;
  footerAdminBtnText?: string;
}

export interface CalculatorState {
  internetSpeed: 'none' | '100m' | '500m' | '1g';
  tvType: 'none' | 'skyAll' | 'skyChoice' | 'skyPoint';
  setTopBox: 'androidUhd' | 'basic';
  wifiIncluded: boolean;
  affiliateCard: 'none' | 'card15' | 'card20' | 'card25';
  mobileCombo: boolean;
}
