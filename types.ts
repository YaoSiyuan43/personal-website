
export type Language = 'zh' | 'en';

export interface LocalizedString {
  zh: string;
  en: string;
}

export interface LocalizedArray {
  zh: string[];
  en: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  xhs: string;
}

export interface Experience {
  type: 'education' | 'work';
  period: string;
  role: LocalizedString;
  company: LocalizedString;
  shortDesc: LocalizedArray;
}

export interface WebProject {
  id: number;
  title: string;
  category: string;
  description?: string;
  background?: string;
  features?: string[];
  outputs?: string[]; // Added for project highlights/results
  images: string[];
  link?: string; // URL for "Read Online" or "Visit Site"
  fullText?: string; // Optional full text for internal reader
}

export interface GalleryPhoto {
  id: number;
  src: string;
  title: string;
}
