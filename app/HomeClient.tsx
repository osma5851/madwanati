"use client";

import { useState, useMemo } from "react";
import { Article } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

interface HomeClientProps {
  articles: Article[];
  categories: string[];
}

export default function HomeClient({ articles, categories }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");

  const filtered = useMemo(() => {
    let result = articles;
    if (selectedCategory !== "الكل") {
      result = result.filter((a) => a.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [articles, search, selectedCategory]);

  const featuredArticles = useMemo(() => filtered.filter((a) => a.featured), [filtered]);
  const regularArticles = useMemo(() => filtered.filter((a) => !a.featured), [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Search & Filter Bar */}
      <div
        className="rounded-2xl p-5 mb-8"
        style={{ background: '#1e293b', border: '1px solid rgba(30,58,95,0.8)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: '#475569' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full pr-10 pl-4 py-3 rounded-xl text-sm transition-all outline-none"
              style={{
                background: '#0f172a',
                border: '1px solid rgba(30,58,95,0.8)',
                color: '#e2e8f0',
              }}
              dir="rtl"
              onFocus={(e) => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(30,58,95,0.8)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedCategory("الكل")}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={
                selectedCategory === "الكل"
                  ? { background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0f172a', boxShadow: '0 2px 10px rgba(245,158,11,0.3)' }
                  : { background: 'rgba(30,58,95,0.5)', color: '#94a3b8' }
              }
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                style={
                  selectedCategory === cat
                    ? { background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0f172a', boxShadow: '0 2px 10px rgba(245,158,11,0.3)' }
                    : { background: 'rgba(30,58,95,0.5)', color: '#94a3b8' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {(search || selectedCategory !== "الكل") && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: '#64748b' }}>
            {filtered.length === 0
              ? "لا توجد نتائج"
              : `تم العثور على ${filtered.length} مقالة`}
          </p>
          <button
            onClick={() => { setSearch(""); setSelectedCategory("الكل"); }}
            className="text-sm transition-colors duration-200 hover:text-amber-300"
            style={{ color: '#f59e0b' }}
          >
            مسح الفلاتر
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: '#1e293b', border: '1px solid rgba(30,58,95,0.8)' }}
          >
            <svg className="w-10 h-10" style={{ color: '#475569' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#e2e8f0' }}>لا توجد مقالات</h3>
          <p style={{ color: '#64748b' }}>جرب البحث بكلمات مختلفة أو تغيير التصنيف</p>
        </div>
      ) : (
        <>
          {/* Featured Articles */}
          {featuredArticles.length > 0 && !search && selectedCategory === "الكل" && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #f59e0b, #d97706)' }} />
                <h2 className="text-xl font-bold" style={{ color: '#f1f5f9' }}>المقالات المميزة</h2>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  مختارة بعناية
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredArticles.map((article, i) => (
                  <div key={article.id} className={`animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}>
                    <ArticleCard article={article} featured={true} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All/Regular Articles */}
          {(regularArticles.length > 0 || search || selectedCategory !== "الكل") && (
            <section>
              {!search && selectedCategory === "الكل" && regularArticles.length > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)' }} />
                  <h2 className="text-xl font-bold" style={{ color: '#f1f5f9' }}>جميع المقالات</h2>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(search || selectedCategory !== "الكل" ? filtered : regularArticles).map((article, i) => (
                  <div key={article.id} className={`animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
