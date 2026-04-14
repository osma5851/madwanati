"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-teal-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
              <span className="text-white font-bold text-lg">م</span>
            </div>
            <span className="text-xl font-bold text-teal-700">مدونتي</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
            >
              الرئيسية
            </Link>
            <Link
              href="/?category=تقنية"
              className="px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
            >
              تقنية
            </Link>
            <Link
              href="/?category=تطوير ذاتي"
              className="px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
            >
              تطوير ذاتي
            </Link>
            <Link
              href="/?category=ثقافة"
              className="px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
            >
              ثقافة
            </Link>
            <Link
              href="/admin"
              className="mr-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm"
            >
              لوحة التحكم
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-1 pt-3 space-y-1">
            <Link href="/" className="block px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg font-medium">
              الرئيسية
            </Link>
            <Link href="/?category=تقنية" className="block px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg font-medium">
              تقنية
            </Link>
            <Link href="/?category=تطوير ذاتي" className="block px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg font-medium">
              تطوير ذاتي
            </Link>
            <Link href="/?category=ثقافة" className="block px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg font-medium">
              ثقافة
            </Link>
            <Link href="/admin" className="block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-center">
              لوحة التحكم
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
