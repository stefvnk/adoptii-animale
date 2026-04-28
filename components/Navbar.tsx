"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PawIcon, MenuIcon, XIcon } from "./Icons";

const links = [
  { href: "/animals", label: "Animale" },
  { href: "/post", label: "Adaugă anunț" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="bg-white border-b border-ink-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <PawIcon size={16} className="text-white" />
          </div>
          <span className="font-bold text-ink-900 text-lg tracking-tight">
            Adopții<span className="text-brand-500">RO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                path === l.href
                  ? "bg-brand-50 text-brand-600"
                  : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/animals" className="btn-primary">
            Adoptă acum
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-ink-500 hover:bg-ink-50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Meniu"
        >
          {open ? <XIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ink-100 bg-white px-4 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                path === l.href ? "bg-brand-50 text-brand-600" : "text-ink-700 hover:bg-ink-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/animals" onClick={() => setOpen(false)} className="btn-primary w-full">
              Adoptă acum
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
