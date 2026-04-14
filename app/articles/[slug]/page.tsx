import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getAllArticles, formatDate, getReadingTime } from "@/lib/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import ArticleContent from "./ArticleContent";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "مقالة غير موجودة" };
  return {
    title: `${article.title} - مدونتي`,
    description: article.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  تقنية: "bg-blue-100 text-blue-700",
  "تطوير ذاتي": "bg-purple-100 text-purple-700",
  ثقافة: "bg-amber-100 text-amber-700",
  عام: "bg-gray-100 text-gray-700",
  صحة: "bg-green-100 text-green-700",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const catColor = CATEGORY_COLORS[article.category] || "bg-teal-100 text-teal-700";
  const readTime = getReadingTime(article.content);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        {/* Article Hero */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600 transition-colors">الرئيسية</Link>
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/?category=${article.category}`} className="hover:text-teal-600 transition-colors">
                {article.category}
              </Link>
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700 truncate max-w-xs">{article.title}</span>
            </nav>

            {/* Category + Featured */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${catColor}`}>
                {article.category}
              </span>
              {article.featured && (
                <span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full font-medium">
                  مميزة
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-xs">
                    {article.author.charAt(0)}
                  </span>
                </div>
                <span>{article.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readTime} دقائق قراءة</span>
              </div>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?q=${encodeURIComponent(tag)}`}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-teal-50 hover:text-teal-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <ArticleContent content={article.content} />
          </div>

          {/* Share/Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              العودة إلى المدونة
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <div className="border-t border-gray-200 pt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                مقالات ذات صلة في{" "}
                <span className="text-teal-600">{article.category}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
