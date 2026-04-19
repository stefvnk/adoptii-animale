import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdopțiiRO — Adoptă un suflet",
  description: "Platforma din România pentru adopția animalelor abandonate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-10 mt-20">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-white font-bold text-lg">AdopțiiRO</span>
            </div>
            <p className="text-sm">Fiecare animal merită o casă cu dragoste. © 2026 AdopțiiRO</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
