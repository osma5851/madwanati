import fs from "fs";
import path from "path";
import { Article, ArticleInput } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "articles.json");

export function getAllArticles(): Article[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    const articles: Article[] = JSON.parse(data);
    return articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}

export function getArticleById(id: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.id === id) || null;
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function searchArticles(query: string): Article[] {
  const articles = getAllArticles();
  const q = query.toLowerCase().trim();
  if (!q) return articles;
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function createArticle(input: ArticleInput): Article {
  const articles = getAllArticles();
  const newArticle: Article = {
    ...input,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString(),
    featured: input.featured ?? false,
  };
  articles.unshift(newArticle);
  saveArticles(articles);
  return newArticle;
}

export function updateArticle(id: string, input: Partial<ArticleInput>): Article | null {
  const articles = getAllArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  articles[idx] = { ...articles[idx], ...input };
  saveArticles(articles);
  return articles[idx];
}

export function deleteArticle(id: string): boolean {
  const articles = getAllArticles();
  const newArticles = articles.filter((a) => a.id !== id);
  if (newArticles.length === articles.length) return false;
  saveArticles(newArticles);
  return true;
}

function saveArticles(articles: Article[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), "utf-8");
}

// Re-export utilities for server-side convenience
export { formatDate, getReadingTime, generateSlug } from "./utils";
