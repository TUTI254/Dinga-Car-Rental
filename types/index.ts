import { MouseEventHandler } from "react";

export type VehicleCategory =
  | "economy"
  | "compact"
  | "sedan"
  | "suv"
  | "pickup"
  | "van"
  | "electric"
  | "hybrid"
  | "sports"
  | "luxury"
  | "convertible";

export type TransmissionType = "automatic" | "manual";
export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";
export type InsuranceStatus = "active" | "expired";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  category: VehicleCategory;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  mileage: number;
  engineSize: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  isAvailable: boolean;
  images: string[];
  thumbnail: string;
  location: string;
  licensePlate: string;
  vin: string;
  insuranceStatus: InsuranceStatus;
  createdAt: string;
}

export interface Booking {
  id: string;
  vehicleId: string;
  userId: string;
  vehicleName: string;
  vehicleThumbnail: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  totalDays: number;
  pricePerDay: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  vehicleId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  transmission: string;
  fuelType: string;
  seats: string;
  minRating: number;
  sortBy: string;
  location: string;
}

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit" | "reset";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface FilterProps {
  manufacturer: string;
  model: string;
  year: number;
  fuel: string;
  limit: number;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  date: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
