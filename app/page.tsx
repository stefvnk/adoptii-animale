import Link from "next/link";
import AnimalCard from "@/components/AnimalCard";
import { animals } from "@/lib/mockData";

const stats = [
  { label: "Animale adoptate", value: "1.240+", icon: "🏠" },
  { label: "Anunțuri active", value: "386", icon: "📋" },
  { label: "Orașe acoperite", value: "42", icon: "📍" },
  { label: "Voluntari activi", value: "850+", icon: "❤️" },
];

export default function HomePage() {
  const featured = animals.filter((a) => a.status === "available").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-orange-400 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🐶</div>
          <div className="absolute bottom-10 right-10 text-9xl">🐱</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px]">🐾</div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Dă o șansă unui<br />
            <span className="text-orange-300">suflet fără casă</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Conectăm animalele abandonate cu familii iubitoare din toată România.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/animals" className="bg-white text-purple-700 font-bold px-8 py-4 rounded-full text-lg hover:bg-orange-50 transition shadow-xl">
              🔍 Caută un animal
            </Link>
            <Link href="/post" className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-full text-lg transition shadow-xl">
              📋 Postează un anunț
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-purple-700">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Cum funcționează?</h2>
        <p className="text-center text-gray-500 mb-12">Procesul de adopție în 3 pași simpli</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", icon: "📷", title: "Găsești un animal?", desc: "Postează un anunț cu poze și detalii. Durează 2 minute." },
            { step: "2", icon: "🔍", title: "Caută și filtrează", desc: "Răsfoiește anunțurile după specie, județ, vârstă și mai mult." },
            { step: "3", icon: "🏠", title: "Trimite cerere", desc: "Contactează găsitorul, vorbesc direct și aranjați adopția." },
          ].map((item) => (
            <div key={item.step} className="text-center p-8 rounded-2xl bg-purple-50 border border-purple-100">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured animals */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Animale disponibile</h2>
            <p className="text-gray-500 mt-1">Așteaptă familia perfectă</p>
          </div>
          <Link href="/animals" className="btn-outline text-sm">
            Vezi toate →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-orange-400 to-purple-600 text-white py-16 mx-4 md:mx-8 rounded-3xl mb-8">
        <div className="text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ai găsit un animal abandonat?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Postează un anunț gratuit și ajută-l să găsească o familie iubitoare.
          </p>
          <Link href="/post" className="bg-white text-purple-700 font-bold px-8 py-4 rounded-full text-lg hover:bg-purple-50 transition shadow-xl inline-block">
            Postează acum — e gratuit 🐾
          </Link>
        </div>
      </section>
    </>
  );
}
