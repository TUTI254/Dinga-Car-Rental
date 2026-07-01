"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { filterAndSortVehicles, getUniqueBrands } from "@/lib/utils";
import { FilterState } from "@/types";
import VehicleCard from "@/components/cars/VehicleCard";
import CarFilters from "@/components/cars/CarFilters";

export default function CarsPage() {
  const params = useSearchParams();
  const [filters, setFilters] = useState<Partial<FilterState>>({
    search: params.get("search") || "",
    category: params.get("category") || "all",
    brand: params.get("brand") || "all",
    fuelType: params.get("fuelType") || "all",
    transmission: "all",
    seats: "all",
    location: params.get("location") || "all",
    minPrice: 0,
    maxPrice: 0,
    minRating: 0,
    sortBy: params.get("sortBy") || "rating",
  });

  const brands = useMemo(() => getUniqueBrands(vehicles), []);
  const filtered = useMemo(() => filterAndSortVehicles(vehicles, filters), [filters]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-black-100 mb-1">Browse Our Fleet</h1>
          <p className="text-grey">{filtered.length} vehicles available</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey" />
          <input
            type="text"
            placeholder="Search by brand, model or type..."
            value={filters.search || ""}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue shadow-sm"
          />
        </div>

        <div className="flex gap-8">
          <CarFilters filters={filters} onChange={setFilters} brands={brands} />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-bold text-black-100 mb-2">No vehicles found</h3>
                <p className="text-grey mb-6">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => setFilters({ search: "", category: "all", brand: "all", transmission: "all", fuelType: "all", seats: "all", location: "all", minPrice: 0, maxPrice: 0, minRating: 0, sortBy: "rating" })}
                  className="bg-primary-blue text-white px-6 py-3 rounded-xl font-semibold text-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
