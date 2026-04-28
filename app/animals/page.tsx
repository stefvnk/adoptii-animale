"use client";

import { useState, useMemo } from "react";
import AnimalCard from "@/components/AnimalCard";
import { animals } from "@/lib/mockData";
import { SearchIcon, FilterIcon, XIcon } from "@/components/Icons";

const judete = ["Toate județele", "București", "Cluj-Napoca", "Timișoara", "Iași", "Brașov", "Constanța"];

export default function AnimalsPage() {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [judet, setJudet] = useState("Toate județele");
  const [vaccinated, setVaccinated] = useState(false);
  const [sterilized, setSterilized] = useState(false);

  const filtered = useMemo(() => {
    return animals.filter((a) => {
      if (a.status === "adopted") return false;
      if (species !== "all" && a.species !== species) return false;
      if (judet !== "Toate județele" && !a.location.includes(judet)) return false;
      if (vaccinated && !a.vaccinated) return false;
      if (sterilized && !a.sterilized) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!a.name.toLowerCase().includes(q) && !a.breed.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, species, judet, vaccinated, sterilized]);

  const hasFilters = species !== "all" || judet !== "Toate județele" || vaccinated || sterilized;

  const reset = () => {
    setSearch(""); setSpecies("all"); setJudet("Toate județele");
    setVaccinated(false); setSterilized(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-ink-900 mb-1">Animale disponibile</h1>
        <p className="text-ink-500 text-sm">
          {filtered.length} {filtered.length === 1 ? "animal găsit" : "animale găsite"}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Caută după nume sau rasă..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-11"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-400 hover:text-ink-700">
            <XIcon size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-7">
        {/* Filters */}
        <aside className="lg:w-56 shrink-0">
          <div className="bg-white border border-ink-100 rounded-2xl shadow-card p-5 sticky top-20">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 font-semibold text-ink-900 text-sm">
                <FilterIcon size={15} />
                Filtre
              </div>
              {hasFilters && (
                <button onClick={reset} className="text-xs text-brand-500 hover:text-brand-600 font-medium">
                  Resetează
                </button>
              )}
            </div>

            {/* Species */}
            <div className="mb-5">
              <p className="label text-xs uppercase tracking-wide text-ink-400 mb-2">Specie</p>
              <div className="space-y-1">
                {[
                  { val: "all", label: "Toate" },
                  { val: "dog", label: "Câine" },
                  { val: "cat", label: "Pisică" },
                  { val: "other", label: "Alt animal" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setSpecies(opt.val)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      species === opt.val
                        ? "bg-brand-50 text-brand-600 font-semibold"
                        : "text-ink-600 hover:bg-ink-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Județ */}
            <div className="mb-5">
              <p className="label text-xs uppercase tracking-wide text-ink-400 mb-2">Locație</p>
              <select value={judet} onChange={(e) => setJudet(e.target.value)} className="input text-sm py-2">
                {judete.map((j) => <option key={j}>{j}</option>)}
              </select>
            </div>

            {/* Medical */}
            <div>
              <p className="label text-xs uppercase tracking-wide text-ink-400 mb-2">Medical</p>
              <div className="space-y-2">
                {[
                  { id: "vacc", label: "Vaccinat", val: vaccinated, set: setVaccinated },
                  { id: "ster", label: "Sterilizat", val: sterilized, set: setSterilized },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        item.val ? "bg-brand-500 border-brand-500" : "border-ink-300 group-hover:border-brand-400"
                      }`}
                      onClick={() => item.set(!item.val)}
                    >
                      {item.val && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-ink-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-ink-400">
              <div className="w-16 h-16 bg-ink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon size={28} className="text-ink-300" />
              </div>
              <p className="font-semibold text-ink-600 mb-1">Niciun animal găsit</p>
              <p className="text-sm">Încearcă alte filtre</p>
              {hasFilters && (
                <button onClick={reset} className="mt-4 btn-primary text-sm px-5 py-2">
                  Șterge filtrele
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
