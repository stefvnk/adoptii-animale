"use client";

import { useState } from "react";
import Link from "next/link";
import { animals } from "@/lib/mockData";
import { notFound } from "next/navigation";

const speciesLabel: Record<string, string> = { dog: "🐶 Câine", cat: "🐱 Pisică", other: "🐾 Alt animal" };

export default function AnimalDetailPage({ params }: { params: { id: string } }) {
  const animal = animals.find((a) => a.id === Number(params.id));
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  if (!animal) return notFound();

  const others = animals.filter((a) => a.id !== animal.id && a.status === "available").slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/animals" className="text-purple-600 hover:underline text-sm flex items-center gap-1 mb-6">
        ← Înapoi la lista de animale
      </Link>

      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Photo */}
        <div className="relative h-80 md:h-auto min-h-[360px]">
          <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            {animal.status === "available" && (
              <span className="badge bg-green-500 text-white shadow">✓ Disponibil</span>
            )}
            {animal.status === "pending" && (
              <span className="badge bg-yellow-400 text-yellow-900 shadow">⏳ În așteptare</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-8 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-extrabold text-gray-900">{animal.name}</h1>
            <span className="text-gray-400 text-2xl">{animal.gender === "M" ? "♂" : "♀"}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Specie</p>
              <p className="font-semibold text-gray-800 text-sm">{speciesLabel[animal.species]}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Rasă</p>
              <p className="font-semibold text-gray-800 text-sm">{animal.breed}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Vârstă</p>
              <p className="font-semibold text-gray-800 text-sm">{animal.age}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Locație</p>
              <p className="font-semibold text-gray-800 text-sm">📍 {animal.location}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-5 flex-wrap">
            {animal.vaccinated && <span className="badge bg-blue-100 text-blue-700">✓ Vaccinat</span>}
            {animal.sterilized && <span className="badge bg-purple-100 text-purple-700">✓ Sterilizat</span>}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 flex-1">{animal.description}</p>

          <p className="text-xs text-gray-400 mb-6">
            Postat de <strong>{animal.postedBy}</strong> pe {new Date(animal.postedAt).toLocaleDateString("ro-RO")}
          </p>

          {!showForm && !sent && animal.status === "available" && (
            <button onClick={() => setShowForm(true)} className="btn-primary w-full text-base py-4">
              🏠 Vreau să adoptez
            </button>
          )}
          {animal.status === "pending" && !sent && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center text-yellow-700 font-medium">
              ⏳ Există deja o cerere în așteptare pentru acest animal
            </div>
          )}

          {showForm && !sent && (
            <div className="space-y-4 mt-2">
              <h3 className="font-bold text-gray-900">Trimite cerere de adopție</h3>
              <input type="text" placeholder="Numele tău" className="input" />
              <input type="email" placeholder="Email" className="input" />
              <textarea
                rows={3}
                placeholder="De ce vrei să adopți acest animal? Povestește-ne puțin despre tine..."
                className="input resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex gap-3">
                <button onClick={() => setSent(true)} className="btn-primary flex-1">
                  Trimite cererea
                </button>
                <button onClick={() => setShowForm(false)} className="btn-outline flex-1">
                  Anulează
                </button>
              </div>
            </div>
          )}

          {sent && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-bold text-green-800">Cererea a fost trimisă!</p>
              <p className="text-sm text-green-600 mt-1">{animal.postedBy} va fi notificat și te va contacta în curând.</p>
            </div>
          )}
        </div>
      </div>

      {/* Similar animals */}
      {others.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Alte animale disponibile</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((a) => (
              <Link key={a.id} href={`/animals/${a.id}`} className="card block group">
                <div className="h-40 overflow-hidden">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-700">{a.name}</h3>
                  <p className="text-sm text-gray-500">{a.breed} · {a.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
