"use client";

import { useState, useMemo } from "react";
import AnimalCard from "@/components/AnimalCard";
import { animals } from "@/lib/mockData";

const judete = ["Toate județele", "București", "Cluj-Napoca", "Timișoara", "Iași", "Brașov", "Constanța"];

export default function AnimalsPage() {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [judet, setJudet] = useState("Toate județele");
  const [status, setStatus] = useState("all");
  const [vaccinated, setVaccinated] = useState(false);
  const [sterilized, setSterilized] = useState(false);

  const filtered = useMemo(() => {
    return animals.filter((a) => {
      if (species !== "all" && a.species !== species) return false;
      if (judet !== "Toate județele" && !a.location.includes(judet)) return false;
      if (status !== "all" && a.status !== status) return false;
      if (vaccinated && !a.vaccinated) return false;
      if (sterilized && !a.sterilized) return false;
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.breed.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, species, judet, status, vaccinated, sterilized]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Animale disponibile</h1>
        <p className="text-gray-500">Găsește animalul perfect pentru familia ta</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
        <input
          type="text"
          placeholder="Caută după nume sau rasă..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-12 text-lg"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6 sticky top-20">
            <h2 className="font-bold text-lg text-gray-900">Filtre</h2>

            <div>
              <label className="label">Specie</label>
              <div className="space-y-2">
                {[
                  { val: "all", label: "🐾 Toate" },
                  { val: "dog", label: "🐶 Câine" },
                  { val: "cat", label: "🐱 Pisică" },
                  { val: "other", label: "🐰 Alt animal" },
                ].map((opt) => (
                  <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="species"
                      value={opt.val}
                      checked={species === opt.val}
                      onChange={() => setSpecies(opt.val)}
                      className="accent-purple-600"
                    />
                    <span className="text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Județ / Oraș</label>
              <select
                value={judet}
                onChange={(e) => setJudet(e.target.value)}
                className="input"
              >
                {judete.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="input"
              >
                <option value="all">Toate</option>
                <option value="available">Disponibil</option>
                <option value="pending">În așteptare</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="label">Condiții medicale</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vaccinated}
                  onChange={(e) => setVaccinated(e.target.checked)}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className="text-gray-700">Vaccinat</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sterilized}
                  onChange={(e) => setSterilized(e.target.checked)}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className="text-gray-700">Sterilizat</span>
              </label>
            </div>

            <button
              onClick={() => {
                setSearch(""); setSpecies("all"); setJudet("Toate județele");
                setStatus("all"); setVaccinated(false); setSterilized(false);
              }}
              className="text-sm text-purple-600 hover:underline"
            >
              Resetează filtrele
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="text-gray-500 mb-4 text-sm">
            {filtered.length} {filtered.length === 1 ? "animal găsit" : "animale găsite"}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">🐾</div>
              <p className="text-xl font-medium">Niciun animal găsit</p>
              <p className="text-sm mt-2">Încearcă alte filtre</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
