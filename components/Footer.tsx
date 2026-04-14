import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">م</span>
              </div>
              <span className="text-xl font-bold text-white">مدونتي</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              مساحة للأفكار والإبداع والمعرفة. نتشارك هنا أفضل ما في عقولنا وتجاربنا.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-4">التصنيفات</h3>
            <ul className="space-y-2 text-sm">
              {["تقنية", "تطوير ذاتي", "ثقافة", "صحة", "أعمال"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/?category=${cat}`}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-teal-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-teal-400 transition-colors">
                  لوحة التحكم
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} مدونتي - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
