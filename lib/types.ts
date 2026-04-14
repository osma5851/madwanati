export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  coverImage: string;
  featured: boolean;
}

export type ArticleInput = Omit<Article, "id" | "publishedAt"> & {
  id?: string;
  publishedAt?: string;
};

export const CATEGORIES = [
  "عام",
  "تقنية",
  "تطوير ذاتي",
  "ثقافة",
  "صحة",
  "سفر",
  "أعمال",
  "فن",
] as const;

export type Category = (typeof CATEGORIES)[number];
