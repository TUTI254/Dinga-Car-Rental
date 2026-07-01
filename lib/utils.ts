import { FilterState, Vehicle } from "@/types";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const formatKsh = (amount: number): string =>
  `Ksh ${amount.toLocaleString("en-KE")}`;

export const filterAndSortVehicles = (
  vehicles: Vehicle[],
  filters: Partial<FilterState>
): Vehicle[] => {
  let result = [...vehicles];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
    );
  }
  if (filters.category && filters.category !== "all") {
    result = result.filter((v) => v.category === filters.category);
  }
  if (filters.brand && filters.brand !== "all") {
    result = result.filter((v) => v.brand === filters.brand);
  }
  if (filters.transmission && filters.transmission !== "all") {
    result = result.filter((v) => v.transmission === filters.transmission);
  }
  if (filters.fuelType && filters.fuelType !== "all") {
    result = result.filter((v) => v.fuelType === filters.fuelType);
  }
  if (filters.seats && filters.seats !== "all") {
    result = result.filter((v) => v.seats === Number(filters.seats));
  }
  if (filters.location && filters.location !== "all") {
    result = result.filter((v) => v.location === filters.location);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((v) => v.pricePerDay >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
    result = result.filter((v) => v.pricePerDay <= filters.maxPrice!);
  }
  if (filters.minRating !== undefined && filters.minRating > 0) {
    result = result.filter((v) => v.rating >= filters.minRating!);
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
      break;
    case "price-desc":
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      result.sort((a, b) => b.rating - a.rating);
  }

  return result;
};

export const getUniqueBrands = (vehicles: Vehicle[]): string[] =>
  Array.from(new Set(vehicles.map((v) => v.brand))).sort();

export const calculateTotalPrice = (
  pricePerDay: number,
  days: number
): number => pricePerDay * days;
