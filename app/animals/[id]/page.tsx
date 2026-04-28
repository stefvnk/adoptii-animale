"use client";

import { useState } from "react";
import Link from "next/link";
import { animals } from "@/lib/mockData";
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, ShieldIcon, ScissorsIcon, CheckIcon, UserIcon } from "@/components/Icons";

const speciesLabel: Record<string, string> = { dog: "Câine", cat: "Pisică", other: "Animal" };

export default function AnimalDetailPage({ params }: { params: { id: string } }) {
  const animal = animals.find((a) => a.id === Number(params.id));
  const [step, setStep] = useState<"idle" | "form" | "done">("idle");
  const [msg, setMsg] = useState("");

  if (!animal) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Animalul nu a fost găsit</h2>
          <Link href="/animals" className="btn-primary mt-4 inline-flex">Înapoi la lista de animale</Link>
        </div>
      </div>
    );
  }

  const others = animals.filter((a) => a.id !== animal.id && a.status === "available").slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

      {/* Breadcrumb */}
      <Link href="/animals" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 mb-7 transition-colors">
        <ArrowLeftIcon size={16} />
        Înapoi la animale
      </Link>

      <div className="grid md:grid-cols-2 gap-8 bg-white border border-ink-100 rounded-3xl shadow-card overflow-hidden">

        {/* Photo */}
        <div className="relative h-72 md:h-auto min-h-[380px] bg-ink-100">
          <img src={animal.image} alt={animal.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            {animal.status === "available" && <span className="badge-green">Disponibil</span>}
            {animal.status === "pending"   && <span className="badge-yellow">În așteptare</span>}
            {animal.status === "adopted"   && <span className="badge-gray">Adoptat</span>}
          </div>
        </div>

        {/* Info */}
        <div className="p-7 flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-3xl font-extrabold text-ink-900">{animal.name}</h1>
            <span className="text-sm text-ink-400 mt-1 ml-3 shrink-0">{animal.gender === "M" ? "Mascul" : "Femelă"}</span>
          </div>

          <p className="text-sm text-ink-500 mb-5">{speciesLabel[animal.species]} · {animal.breed}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: <CalendarIcon size={14} />, label: "Vârstă", val: animal.age },
              { icon: <MapPinIcon size={14} />, label: "Locație", val: animal.location },
            ].map((m) => (
              <div key={m.label} className="bg-ink-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-ink-400 text-xs mb-0.5">
                  {m.icon} {m.label}
                </div>
                <p className="text-sm font-semibold text-ink-800">{m.val}</p>
              </div>
            ))}
          </div>

          {/* Medical badges */}
          {(animal.vaccinated || animal.sterilized) && (
            <div className="flex gap-2 flex-wrap mb-5">
              {animal.vaccinated && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                  <ShieldIcon size={12} /> Vaccinat
                </span>
              )}
              {animal.sterilized && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  <ScissorsIcon size={12} /> Sterilizat
                </span>
              )}
            </div>
          )}

          <p className="text-sm text-ink-600 leading-relaxed mb-5 flex-1">{animal.description}</p>

          <div className="flex items-center gap-2 text-xs text-ink-400 mb-6 pt-4 border-t border-ink-100">
            <UserIcon size={13} />
            <span>Postat de <strong className="text-ink-600">{animal.postedBy}</strong> pe {new Date(animal.postedAt).toLocaleDateString("ro-RO")}</span>
          </div>

          {/* CTA */}
          {step === "idle" && animal.status === "available" && (
            <button onClick={() => setStep("form")} className="btn-primary-lg w-full">
              Vreau să adoptez
            </button>
          )}

          {step === "idle" && animal.status === "pending" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center text-sm text-amber-700 font-medium">
              Există deja o cerere în așteptare pentru acest animal.
            </div>
          )}

          {step === "form" && (
            <div className="space-y-3">
              <h3 className="font-bold text-ink-900 text-sm">Cerere de adopție</h3>
              <input type="text" placeholder="Numele tău" className="input" />
              <input type="email" placeholder="Adresa de email" className="input" />
              <textarea
                rows={3}
                placeholder="Câteva cuvinte despre tine și de ce dorești să adopți..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="input resize-none"
              />
              <div className="flex gap-2 pt-1">
                <button onClick={() => setStep("done")} className="btn-primary flex-1">Trimite cererea</button>
                <button onClick={() => setStep("idle")} className="btn-outline flex-1">Anulează</button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckIcon size={20} className="text-success" />
              </div>
              <p className="font-bold text-green-800 text-sm">Cererea a fost trimisă!</p>
              <p className="text-xs text-green-600 mt-1">{animal.postedBy} va fi notificat și te va contacta în curând.</p>
            </div>
          )}
        </div>
      </div>

      {/* Similar */}
      {others.length > 0 && (
        <div className="mt-14">
          <h2 className="section-title mb-5">Mai ai timp să te uiți și la...</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {others.map((a) => (
              <Link key={a.id} href={`/animals/${a.id}`} className="card block group overflow-hidden">
                <div className="h-36 overflow-hidden">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <p className="font-bold text-ink-900 text-sm group-hover:text-brand-600 transition-colors">{a.name}</p>
                  <p className="text-xs text-ink-400 mt-0.5 flex items-center gap-1">
                    <MapPinIcon size={11} /> {a.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
