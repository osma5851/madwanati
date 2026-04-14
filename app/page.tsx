import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const categories = [...new Set(allArticles.map((a) => a.category))];
  const stats = {
    total: allArticles.length,
    categories: categories.length,
    featured: featuredArticles.length,
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse inline-block"></span>
              مدونة عربية متجددة يومياً
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              أهلاً بكم في
              <span className="block text-amber-300">مدونتي</span>
            </h1>
            <p className="text-teal-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              مساحة للأفكار والمعرفة والإلهام. نتشارك هنا أفضل ما في عقولنا وتجاربنا
              لنبني معاً مجتمعاً معرفياً راقياً.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-3xl font-black text-amber-300">{stats.total}</div>
                <div className="text-teal-200">مقالة</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-amber-300">{stats.categories}</div>
                <div className="text-teal-200">تصنيف</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-amber-300">{stats.featured}</div>
                <div className="text-teal-200">مقالة مميزة</div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Client Part (Search + Filter + Articles) */}
        <HomeClient articles={allArticles} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
