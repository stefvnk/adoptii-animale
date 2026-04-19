"use client";

import { useState } from "react";
import Link from "next/link";

export default function PostPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    location: "",
    description: "",
    vaccinated: false,
    sterilized: false,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Anunțul a fost postat!</h2>
          <p className="text-gray-500 mb-8">
            Mulțumim că ajuți! Anunțul tău pentru <strong>{form.name}</strong> va fi vizibil în câteva minute după verificare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/animals" className="btn-primary">
              Vezi toate anunțurile
            </Link>
            <button onClick={() => { setSubmitted(false); setForm({ name: "", species: "", breed: "", age: "", gender: "", location: "", description: "", vaccinated: false, sterilized: false, contactName: "", contactPhone: "", contactEmail: "" }); }} className="btn-outline">
              Postează alt anunț
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Postează un anunț</h1>
        <p className="text-gray-500">Ajută un animal să găsească o familie. Anunțul e gratuit și durează 2 minute.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Animal info */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">🐾 Detalii animal</h2>

          <div>
            <label className="label">Numele animalului *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="ex: Max, Luna..." className="input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Specie *</label>
              <select name="species" value={form.species} onChange={handleChange} required className="input">
                <option value="">Selectează...</option>
                <option value="dog">🐶 Câine</option>
                <option value="cat">🐱 Pisică</option>
                <option value="other">🐰 Alt animal</option>
              </select>
            </div>
            <div>
              <label className="label">Gen *</label>
              <select name="gender" value={form.gender} onChange={handleChange} required className="input">
                <option value="">Selectează...</option>
                <option value="M">♂ Mascul</option>
                <option value="F">♀ Femelă</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Rasă</label>
              <input type="text" name="breed" value={form.breed} onChange={handleChange} placeholder="ex: Labrador mix" className="input" />
            </div>
            <div>
              <label className="label">Vârstă estimată</label>
              <input type="text" name="age" value={form.age} onChange={handleChange} placeholder="ex: 2 ani, 6 luni" className="input" />
            </div>
          </div>

          <div>
            <label className="label">Locație (oraș / județ) *</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="ex: București, Sector 2" className="input" />
          </div>

          <div>
            <label className="label">Descriere</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Povestește puțin despre animal — temperament, cum a fost găsit, cu ce se înțelege..."
              className="input resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="label">Stare medicală</label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-200 hover:border-purple-300 transition">
              <input type="checkbox" name="vaccinated" checked={form.vaccinated} onChange={handleChange} className="accent-purple-600 w-5 h-5" />
              <span className="text-gray-700 font-medium">Vaccinat ✓</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-200 hover:border-purple-300 transition">
              <input type="checkbox" name="sterilized" checked={form.sterilized} onChange={handleChange} className="accent-purple-600 w-5 h-5" />
              <span className="text-gray-700 font-medium">Sterilizat ✓</span>
            </label>
          </div>
        </div>

        {/* Photo upload */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">📷 Fotografii</h2>
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 transition cursor-pointer bg-purple-50/50">
            <div className="text-5xl mb-3">📸</div>
            <p className="font-semibold text-gray-700">Apasă pentru a adăuga poze</p>
            <p className="text-sm text-gray-400 mt-1">PNG, JPG, WEBP — max 5 poze, 10MB fiecare</p>
            <input type="file" accept="image/*" multiple className="hidden" />
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">📞 Date de contact</h2>
          <p className="text-sm text-gray-400">Datele tale nu vor fi afișate public. Cei interesați te vor contacta prin platformă.</p>
          <div>
            <label className="label">Numele tău *</label>
            <input type="text" name="contactName" value={form.contactName} onChange={handleChange} required placeholder="Prenume și nume" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Telefon *</label>
              <input type="tel" name="contactPhone" value={form.contactPhone} onChange={handleChange} required placeholder="07xx xxx xxx" className="input" />
            </div>
            <div>
              <label className="label">Email *</label>
              <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} required placeholder="email@exemplu.ro" className="input" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full text-base py-4">
          🐾 Publică anunțul gratuit
        </button>
      </form>
    </div>
  );
}
