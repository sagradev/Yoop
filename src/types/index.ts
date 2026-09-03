import type { PortableTextBlock } from 'sanity';
export interface SanityImage {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
}
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}
export interface Service {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  icon?: string;
  image?: SanityImage;
  order?: number;
  active: boolean;
}
export interface Project {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  videos?: Array<{ title?: string; url: string }>;
  shortDescription?: string;
  description?: PortableTextBlock[];
  category?: Category;
  services?: Service[];
  tags?: string[];
  projectDate?: string;
  featured?: boolean;
  manualOrder?: number;
  externalUrl?: string;
  instagramUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
}
export interface SocialLink {
  label: string;
  url: string;
}
export interface SiteSettings {
  companyName: string;
  logo?: SanityImage;
  alternateLogo?: SanityImage;
  favicon?: SanityImage;
  institutionalDescription?: string;
  instagram?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  socialLinks?: SocialLink[];
  primaryCta?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultOgImage?: SanityImage;
  aboutTitle?: string;
  aboutText?: PortableTextBlock[];
  process?: Array<{ title: string; description?: string }>;
}
