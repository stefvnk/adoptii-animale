import Link from "next/link";
import AnimalCard from "@/components/AnimalCard";
import { animals } from "@/lib/mockData";
import { PawIcon, SearchIcon, ChevronRightIcon, SparkleIcon } from "@/components/Icons";

const stats = [
  { value: "1.240+", label: "Adopții reușite" },
  { value: "386",    label: "Anunțuri active" },
  { value: "42",     label: "Orașe" },
  { value: "850+",   label: "Voluntari" },
];

export default function HomePage() {
  const featured = animals.filter((a) => a.status === "available").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1400&q=80"
          alt="Câine și pisică"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/60 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <SparkleIcon size={12} />
              Platforma #1 de adopții din România
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Fiecare animal<br />
              <span className="text-brand-400">merită o casă.</span>
            </h1>

            <p className="text-lg text-ink-300 mb-8 leading-relaxed">
              Conectăm animalele abandonate cu familii iubitoare din toată România.
              Simplu, gratuit, rapid.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/animals" className="btn-primary-lg">
                <SearchIcon size={18} />
                Caută un animal
              </Link>
              <Link
                href="/post"
                className="btn inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 px-7 py-3.5 text-base rounded-xl font-semibold transition-colors"
              >
                Postează un anunț
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-100">
          {stats.map((s) => (
            <div key={s.label} className="px-6 first:pl-0 last:pr-0 text-center md:text-left">
              <div className="text-2xl font-extrabold text-ink-900">{s.value}</div>
              <div className="text-sm text-ink-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl mb-3">Cum funcționează?</h2>
          <p className="text-ink-500 max-w-md mx-auto">Procesul de adopție în trei pași simpli</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "01",
              title: "Găsești un animal?",
              desc: "Postezi un anunț gratuit cu poze și detalii. Durează mai puțin de 2 minute.",
            },
            {
              n: "02",
              title: "Caută și filtrează",
              desc: "Răsfoiești anunțurile după specie, județ, vârstă și stare medicală.",
            },
            {
              n: "03",
              title: "Trimite cererea",
              desc: "Contactezi găsitorul direct prin platformă și aranjați adopția.",
            },
          ].map((step) => (
            <div key={step.n} className="relative bg-white border border-ink-100 rounded-2xl p-7 shadow-card">
              <div className="text-5xl font-extrabold text-ink-100 leading-none mb-4 select-none">
                {step.n}
              </div>
              <h3 className="text-base font-bold text-ink-900 mb-2">{step.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured animals */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="section-title">Animale disponibile</h2>
            <p className="text-sm text-ink-400 mt-1">Actualizat astăzi</p>
          </div>
          <Link href="/animals" className="btn-ghost flex items-center gap-1 text-brand-500 hover:text-brand-600 hover:bg-brand-50">
            Vezi toate
            <ChevronRightIcon size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-brand-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <PawIcon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Ai găsit un animal abandonat?</h2>
              <p className="text-brand-100 text-sm mt-0.5">Postează un anunț gratuit și ajută-l să găsească o familie.</p>
            </div>
          </div>
          <Link
            href="/post"
            className="btn shrink-0 bg-white text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm shadow-btn transition-colors"
          >
            Postează acum — gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
