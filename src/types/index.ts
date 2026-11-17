export type Country = "Saudi Arabia" | "UAE" | "GCC";

export type ArabicSupportLevel = 
  | "Native UI & RTL" 
  | "Partial (Portal / Forms)" 
  | "English Only (Arabic Docs)" 
  | "Third-Party Localization";

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  regionalEstimateSAR?: string;
  regionalEstimateAED?: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface KeyFeature {
  title: string;
  score: number;
  description: string;
}

export interface Software {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  categoryName: string;
  rating: number;
  reviewCount: number;
  isVerifiedReview?: boolean;
  sampleNotice?: string;
  countrySuitability: Country[];
  arabicSupport: ArabicSupportLevel;
  localCompliance: string[];
  localIntegrations: string[];
  pricing: {
    model: "Free Tier" | "Monthly Subscription" | "Enterprise Quote" | "Tiered Plan";
    startingPrice: string;
    currency: string;
    billingPeriod: string;
    regionalNote: string;
    tiers: PricingTier[];
  };
  easeOfUse: number; // Out of 10
  deploymentTime: string;
  pros: string[];
  cons: string[];
  keyFeatures: KeyFeature[];
  gulfSuitabilityAnalysis: {
    summary: string;
    zatcaStatus?: string;
    uaeVatStatus?: string;
    arabicExperience: string;
    regionalSupport: string;
    dataResidency: string;
  };
  verdict: {
    score: number;
    badge: string;
    summary: string;
    bestFor: string;
    notRecommendedFor: string;
  };
  similarSoftwareSlugs: string[];
  websiteUrl: string;
  accentColor: string;
  badges: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  count: number;
  gulfRelevance: string;
  popularSoftwareSlugs: string[];
  keyCriteria: string[];
}

export interface Comparison {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  productAId: string;
  productBId: string;
  winnerSummary: string;
  gulfContext: string;
  categories: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  isoDate?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
  content?: string[];
  country?: string;
  countryCode?: GccCountryCode | "gcc";
  subheadings?: { title: string; paragraphs: string[] }[];
  keyTakeaways?: string[];
  relatedSoftwareSlugs?: string[];
}

export type GccCountryCode = "saudi-arabia" | "uae" | "qatar" | "kuwait" | "bahrain" | "oman";

export interface GccCountryProfile {
  id: GccCountryCode;
  name: string;
  shortName: string;
  nativeName: string;
  capital: string;
  techHubs: string[];
  flagEmoji: string;
  summary: string;
  keyInitiative: string;
  metrics: {
    startups: string;
    cloudRegions: string;
    aiRank: string;
    saasGrowth: string;
  };
  coordinates: { x: number; y: number };
}

export interface NewsArticle extends Article {
  subtitle?: string;
  categorySlug: string;
  country: string;
  countryCode: GccCountryCode | "gcc";
  featuredImage: string;
  imageCaption?: string;
  isHeroFeatured?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  tags: string[];
}


