import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDate, getReadingTime } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  تقنية: "bg-blue-100 text-blue-700",
  "تطوير ذاتي": "bg-purple-100 text-purple-700",
  ثقافة: "bg-amber-100 text-amber-700",
  عام: "bg-gray-100 text-gray-700",
  صحة: "bg-green-100 text-green-700",
  سفر: "bg-sky-100 text-sky-700",
  أعمال: "bg-orange-100 text-orange-700",
  فن: "bg-pink-100 text-pink-700",
};

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const readTime = getReadingTime(article.content);
  const catColor = CATEGORY_COLORS[article.category] || "bg-teal-100 text-teal-700";

  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`} className="group block">
        <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 text-white h-full hover:from-teal-700 hover:to-teal-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
            <span className="bg-amber-400 text-amber-900 text-xs px-3 py-1 rounded-full font-bold">
              مميز
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-teal-100 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-teal-100 text-sm leading-relaxed mb-6 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-teal-200 text-xs">
            <span>{formatDate(article.publishedAt)}</span>
            <span>{readTime} دقائق قراءة</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${catColor}`}>
            {article.category}
          </span>
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors leading-tight line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{readTime} دقائق</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
