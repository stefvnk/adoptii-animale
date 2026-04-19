import Link from "next/link";

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

const speciesEmoji: Record<string, string> = { dog: "🐶", cat: "🐱", other: "🐾" };
const speciesLabel: Record<string, string> = { dog: "Câine", cat: "Pisică", other: "Alt animal" };

export default function AnimalCard({ animal }: { animal: Animal }) {
  const statusColor: Record<string, string> = {
    available: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    adopted: "bg-gray-100 text-gray-500",
  };
  const statusLabel: Record<string, string> = {
    available: "Disponibil",
    pending: "În așteptare",
    adopted: "Adoptat",
  };

  return (
    <Link href={`/animals/${animal.id}`} className="card block group cursor-pointer">
      <div className="relative overflow-hidden h-52">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${statusColor[animal.status]}`}>{statusLabel[animal.status]}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge bg-white/90 text-gray-700 shadow">
            {speciesEmoji[animal.species]} {speciesLabel[animal.species]}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
            {animal.name}
          </h3>
          <span className="text-sm text-gray-500 ml-2 shrink-0">{animal.gender === "M" ? "♂ Mascul" : "♀ Femelă"}</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">
          {animal.breed} · {animal.age}
        </p>
        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <span>📍</span> {animal.location}
        </p>
        <div className="flex gap-2 flex-wrap">
          {animal.vaccinated && (
            <span className="badge bg-blue-50 text-blue-600">✓ Vaccinat</span>
          )}
          {animal.sterilized && (
            <span className="badge bg-purple-50 text-purple-600">✓ Sterilizat</span>
          )}
        </div>
        <button className="btn-primary w-full mt-4 text-sm text-center block">
          Vreau să adoptez
        </button>
      </div>
    </Link>
  );
}
