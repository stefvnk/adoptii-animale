import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AdopțiiRO — Găsește un animal de adoptat",
  description: "Platforma din România pentru adopția animalelor abandonate. Simplu, gratuit, rapid.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-ink-900 text-ink-400 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <ellipse cx="6" cy="6.5" rx="2" ry="2.5"/>
                  <ellipse cx="10" cy="4" rx="1.8" ry="2.3"/>
                  <ellipse cx="14" cy="4" rx="1.8" ry="2.3"/>
                  <ellipse cx="18" cy="6.5" rx="2" ry="2.5"/>
                  <path d="M12 10c-3.5 0-7 2.5-6.5 6 .3 2.2 2 3.5 3.5 3.8 1 .2 2 .2 3 .2s2 0 3-.2c1.5-.3 3.2-1.6 3.5-3.8.5-3.5-3-6-6.5-6z"/>
                </svg>
              </div>
              <span className="text-white font-bold text-sm">AdopțiiRO</span>
            </div>
            <p className="text-xs text-center">Fiecare animal merită o casă cu dragoste. &copy; 2026 AdopțiiRO</p>
            <div className="flex gap-5 text-xs">
              <span className="hover:text-ink-200 cursor-pointer">Termeni</span>
              <span className="hover:text-ink-200 cursor-pointer">Confidențialitate</span>
              <span className="hover:text-ink-200 cursor-pointer">Contact</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
