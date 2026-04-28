import Link from "next/link";
import { MapPinIcon, ShieldIcon, ScissorsIcon } from "./Icons";

export interface Animal {
  id: number;
  name: string;
  species: "dog" | "cat" | "other";
  breed: string;
  age: string;
  gender: "M" | "F";
  location: string;
  vaccinated: boolean;
  sterilized: boolean;
  image: string;
  description: string;
  status: "available" | "pending" | "adopted";
  postedBy: string;
  postedAt: string;
}

const speciesLabel: Record<string, string> = { dog: "Câine", cat: "Pisică", other: "Animal" };

const statusConfig = {
  available: { label: "Disponibil", cls: "badge-green" },
  pending:   { label: "În așteptare", cls: "badge-yellow" },
  adopted:   { label: "Adoptat", cls: "badge-gray" },
};

export default function AnimalCard({ animal }: { animal: Animal }) {
  const status = statusConfig[animal.status];

  return (
    <Link href={`/animals/${animal.id}`} className="card block group overflow-hidden">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-ink-100">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Status */}
        <div className="absolute top-3 left-3">
          <span className={status.cls}>{status.label}</span>
        </div>

        {/* Species */}
        <div className="absolute top-3 right-3">
          <span className="badge bg-white/90 text-ink-700 border-0 shadow-sm text-[11px]">
            {speciesLabel[animal.species]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-baseline justify-between mb-0.5">
          <h3 className="font-bold text-ink-900 text-base group-hover:text-brand-600 transition-colors">
            {animal.name}
          </h3>
          <span className="text-xs text-ink-400 ml-2 shrink-0">
            {animal.gender === "M" ? "Mascul" : "Femelă"}
          </span>
        </div>

        <p className="text-sm text-ink-500 mb-2">
          {animal.breed} &middot; {animal.age}
        </p>

        <div className="flex items-center gap-1 text-xs text-ink-400 mb-3">
          <MapPinIcon size={12} />
          <span>{animal.location}</span>
        </div>

        {/* Tags */}
        {(animal.vaccinated || animal.sterilized) && (
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {animal.vaccinated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                <ShieldIcon size={10} /> Vaccinat
              </span>
            )}
            {animal.sterilized && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                <ScissorsIcon size={10} /> Sterilizat
              </span>
            )}
          </div>
        )}

        <div className="pt-3 border-t border-ink-100">
          <span className="text-xs font-semibold text-brand-500 group-hover:text-brand-600">
            Vezi detalii →
          </span>
        </div>
      </div>
    </Link>
  );
}
