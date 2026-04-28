"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadIcon, UserIcon, PhoneIcon, MailIcon, CheckIcon, PawIcon } from "@/components/Icons";

type FormState = {
  name: string; species: string; breed: string; age: string; gender: string;
  location: string; description: string; vaccinated: boolean; sterilized: boolean;
  contactName: string; contactPhone: string; contactEmail: string;
};

const empty: FormState = {
  name: "", species: "", breed: "", age: "", gender: "", location: "",
  description: "", vaccinated: false, sterilized: false,
  contactName: "", contactPhone: "", contactEmail: "",
};

export default function PostPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const t = e.target as HTMLInputElement;
    setForm((p) => ({ ...p, [t.name]: t.type === "checkbox" ? t.checked : t.value }));
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckIcon size={28} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold text-ink-900 mb-2">Anunț publicat!</h2>
          <p className="text-ink-500 text-sm mb-6">
            Mulțumim că ajuți! <strong>{form.name}</strong> va apărea pe platformă după o scurtă verificare.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/animals" className="btn-primary w-full">Înapoi la animale</Link>
            <button onClick={() => { setSubmitted(false); setForm(empty); }} className="btn-outline w-full">
              Postează alt anunț
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-ink-900 mb-1">Postează un anunț</h1>
        <p className="text-ink-500 text-sm">Gratuit · Verificat în 24h · Vizibil în toată România</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">

        {/* Animal */}
        <div className="bg-white border border-ink-100 rounded-2xl shadow-card p-6 space-y-5">
          <h2 className="font-bold text-ink-900 text-base flex items-center gap-2">
            <PawIcon size={16} className="text-brand-500" />
            Detalii animal
          </h2>

          <div>
            <label className="label">Numele animalului *</label>
            <input name="name" value={form.name} onChange={set} required placeholder="ex: Max, Luna..." className="input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Specie *</label>
              <select name="species" value={form.species} onChange={set} required className="input">
                <option value="">Selectează...</option>
                <option value="dog">Câine</option>
                <option value="cat">Pisică</option>
                <option value="other">Alt animal</option>
              </select>
            </div>
            <div>
              <label className="label">Gen *</label>
              <select name="gender" value={form.gender} onChange={set} required className="input">
                <option value="">Selectează...</option>
                <option value="M">Mascul</option>
                <option value="F">Femelă</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Rasă</label>
              <input name="breed" value={form.breed} onChange={set} placeholder="ex: Labrador mix" className="input" />
            </div>
            <div>
              <label className="label">Vârstă estimată</label>
              <input name="age" value={form.age} onChange={set} placeholder="ex: 2 ani, 6 luni" className="input" />
            </div>
          </div>

          <div>
            <label className="label">Localitate / Județ *</label>
            <input name="location" value={form.location} onChange={set} required placeholder="ex: Cluj-Napoca" className="input" />
          </div>

          <div>
            <label className="label">Descriere</label>
            <textarea
              name="description" value={form.description} onChange={set} rows={4}
              placeholder="Temperament, cum a fost găsit, cu cine se înțelege..."
              className="input resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="label">Stare medicală</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              {[
                { name: "vaccinated", label: "Vaccinat", checked: form.vaccinated },
                { name: "sterilized", label: "Sterilizat", checked: form.sterilized },
              ].map((cb) => (
                <label key={cb.name} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  cb.checked ? "border-brand-300 bg-brand-50" : "border-ink-200 hover:border-ink-300"
                }`}>
                  <input type="checkbox" name={cb.name} checked={cb.checked} onChange={set} className="sr-only" />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    cb.checked ? "bg-brand-500 border-brand-500" : "border-ink-300"
                  }`}>
                    {cb.checked && <CheckIcon size={11} className="text-white" />}
                  </div>
                  <span className="text-sm font-medium text-ink-700">{cb.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white border border-ink-100 rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-ink-900 text-base mb-4 flex items-center gap-2">
            <UploadIcon size={16} className="text-brand-500" />
            Fotografii
          </h2>
          <label className="block border-2 border-dashed border-ink-200 rounded-xl p-8 text-center hover:border-brand-400 hover:bg-brand-50/30 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-ink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UploadIcon size={18} className="text-ink-400" />
            </div>
            <p className="text-sm font-semibold text-ink-700">Adaugă fotografii</p>
            <p className="text-xs text-ink-400 mt-1">PNG, JPG, WEBP — max 5 poze, 10 MB fiecare</p>
            <input type="file" accept="image/*" multiple className="sr-only" />
          </label>
        </div>

        {/* Contact */}
        <div className="bg-white border border-ink-100 rounded-2xl shadow-card p-6 space-y-5">
          <div>
            <h2 className="font-bold text-ink-900 text-base flex items-center gap-2">
              <UserIcon size={16} className="text-brand-500" />
              Date de contact
            </h2>
            <p className="text-xs text-ink-400 mt-1">Nu vor fi afișate public. Adoptorii te contactează prin platformă.</p>
          </div>

          <div>
            <label className="label">Numele tău *</label>
            <input name="contactName" value={form.contactName} onChange={set} required placeholder="Prenume Nume" className="input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label flex items-center gap-1.5">
                <PhoneIcon size={13} className="text-ink-400" /> Telefon *
              </label>
              <input type="tel" name="contactPhone" value={form.contactPhone} onChange={set} required placeholder="07xx xxx xxx" className="input" />
            </div>
            <div>
              <label className="label flex items-center gap-1.5">
                <MailIcon size={13} className="text-ink-400" /> Email *
              </label>
              <input type="email" name="contactEmail" value={form.contactEmail} onChange={set} required placeholder="email@exemplu.ro" className="input" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary-lg w-full">
          Publică anunțul gratuit
        </button>

        <p className="text-center text-xs text-ink-400">
          Prin publicare ești de acord cu{" "}
          <span className="text-brand-500 underline cursor-pointer">Termenii și Condițiile</span>
        </p>
      </form>
    </div>
  );
}
