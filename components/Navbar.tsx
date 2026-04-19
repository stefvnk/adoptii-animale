"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-purple-700">AdopțiiRO</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/animals" className="text-gray-600 hover:text-purple-700 font-medium transition-colors">
              Animale
            </Link>
            <Link href="/post" className="text-gray-600 hover:text-purple-700 font-medium transition-colors">
              Postează anunț
            </Link>
            <Link href="/animals" className="btn-primary text-sm">
              Adoptă acum
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            <Link href="/animals" className="text-gray-700 font-medium px-2 py-1" onClick={() => setOpen(false)}>
              Animale
            </Link>
            <Link href="/post" className="text-gray-700 font-medium px-2 py-1" onClick={() => setOpen(false)}>
              Postează anunț
            </Link>
            <Link href="/animals" className="btn-primary text-center text-sm mt-2" onClick={() => setOpen(false)}>
              Adoptă acum
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
