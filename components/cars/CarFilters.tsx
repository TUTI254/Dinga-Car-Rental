"use client";
import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { FilterState } from "@/types";
import { KENYA_LOCATIONS } from "@/data/vehicles";

const categories = ["all", "economy", "compact", "sedan", "suv", "pickup", "van", "electric", "hybrid", "sports", "luxury", "convertible"];
const transmissions = ["all", "automatic", "manual"];
const fuelTypes = ["all", "petrol", "diesel", "electric", "hybrid"];
const seatOptions = ["all", "2", "4", "5", "7", "8"];
const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest First" },
];

interface Props {
  filters: Partial<FilterState>;
  onChange: (f: Partial<FilterState>) => void;
  brands: string[];
}

export default function CarFilters({ filters, onChange, brands }: Props) {
  const [showMobile, setShowMobile] = useState(false);

  const set = (key: keyof FilterState, val: string | number) =>
    onChange({ ...filters, [key]: val });

  const reset = () =>
    onChange({ search: "", category: "all", brand: "all", transmission: "all", fuelType: "all", seats: "all", location: "all", minPrice: 0, maxPrice: 0, minRating: 0, sortBy: "rating" });

  const FilterPanel = () => (
    <div className="flex flex-col gap-5">
      {/* Sort */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Sort By</label>
        <select value={filters.sortBy || "rating"} onChange={(e) => set("sortBy", e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-black-100 focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white">
          {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Category</label>
        <select value={filters.category || "all"} onChange={(e) => set("category", e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-black-100 focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white capitalize">
          {categories.map((c) => <option key={c} value={c} className="capitalize">{c === "all" ? "All Categories" : c}</option>)}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Brand</label>
        <select value={filters.brand || "all"} onChange={(e) => set("brand", e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-black-100 focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white">
          <option value="all">All Brands</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Max Price / Day</label>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="No limit" value={filters.maxPrice || ""} onChange={(e) => set("maxPrice", Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue" />
          <span className="text-xs text-grey whitespace-nowrap">Ksh</span>
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Transmission</label>
        <div className="flex gap-2">
          {transmissions.map((t) => (
            <button key={t} onClick={() => set("transmission", t)} className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize border transition-colors ${filters.transmission === t || (!filters.transmission && t === "all") ? "bg-primary-blue text-white border-primary-blue" : "border-gray-200 text-grey hover:border-primary-blue"}`}>
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Fuel */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Fuel Type</label>
        <select value={filters.fuelType || "all"} onChange={(e) => set("fuelType", e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-black-100 focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white capitalize">
          {fuelTypes.map((f) => <option key={f} value={f} className="capitalize">{f === "all" ? "All Fuel Types" : f}</option>)}
        </select>
      </div>

      {/* Seats */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Seats</label>
        <div className="flex flex-wrap gap-2">
          {seatOptions.map((s) => (
            <button key={s} onClick={() => set("seats", s)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${filters.seats === s || (!filters.seats && s === "all") ? "bg-primary-blue text-white border-primary-blue" : "border-gray-200 text-grey hover:border-primary-blue"}`}>
              {s === "all" ? "Any" : `${s}`}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Location</label>
        <select value={filters.location || "all"} onChange={(e) => set("location", e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-black-100 focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white">
          <option value="all">All Locations</option>
          {KENYA_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-2 block">Minimum Rating</label>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => set("minRating", r)} className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${filters.minRating === r ? "bg-primary-blue text-white border-primary-blue" : "border-gray-200 text-grey hover:border-primary-blue"}`}>
              {r === 0 ? "Any" : `${r}+⭐`}
            </button>
          ))}
        </div>
      </div>

      <button onClick={reset} className="w-full py-2.5 text-sm font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-24 w-72 shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-extrabold text-black-100 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-primary-blue" /> Filters</h3>
            <button onClick={reset} className="text-xs text-primary-blue font-semibold hover:underline">Reset</button>
          </div>
          <FilterPanel />
        </div>
      </aside>

      {/* Mobile filter button */}
      <button onClick={() => setShowMobile(true)} className="lg:hidden fixed bottom-6 right-6 z-30 bg-primary-blue text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 font-semibold text-sm">
        <SlidersHorizontal className="w-4 h-4" /> Filters
      </button>

      {/* Mobile drawer */}
      {showMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobile(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-white h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-extrabold text-black-100">Filters</h3>
              <button onClick={() => setShowMobile(false)}><X className="w-5 h-5" /></button>
            </div>
            <FilterPanel />
            <button onClick={() => setShowMobile(false)} className="w-full mt-6 bg-primary-blue text-white py-3 rounded-xl font-bold">Apply Filters</button>
          </div>
        </div>
      )}
    </>
  );
}
