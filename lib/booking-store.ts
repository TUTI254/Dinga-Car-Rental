"use client";
import { Booking, Review, Vehicle } from "@/types";
import { format } from "date-fns";

const BOOKINGS_KEY = "dinga_bookings";
const REVIEWS_KEY = "dinga_reviews";

export const getBookings = (): Booking[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveBookings = (bookings: Booking[]) => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const createBooking = (data: {
  vehicle: Vehicle;
  userId: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: Date;
  returnDate: Date;
}): Booking => {
  const { vehicle, userId, pickupLocation, returnLocation, pickupDate, returnDate } = data;
  const totalDays = Math.max(
    1,
    Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const booking: Booking = {
    id: `BK${Date.now()}`,
    vehicleId: vehicle.id,
    userId,
    vehicleName: `${vehicle.brand} ${vehicle.model}`,
    vehicleThumbnail: vehicle.thumbnail,
    pickupLocation,
    returnLocation,
    pickupDate: pickupDate.toISOString(),
    returnDate: returnDate.toISOString(),
    totalDays,
    pricePerDay: vehicle.pricePerDay,
    totalPrice: vehicle.pricePerDay * totalDays,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  const all = getBookings();
  all.push(booking);
  saveBookings(all);
  return booking;
};

export const getUserBookings = (userId: string): Booking[] =>
  getBookings().filter((b) => b.userId === userId);

export const cancelBooking = (bookingId: string, userId: string): boolean => {
  const all = getBookings();
  const idx = all.findIndex((b) => b.id === bookingId && b.userId === userId);
  if (idx === -1) return false;
  all[idx].status = "cancelled";
  saveBookings(all);
  return true;
};

export const getBookedDatesForVehicle = (vehicleId: string): Date[] => {
  const bookings = getBookings().filter(
    (b) => b.vehicleId === vehicleId && b.status !== "cancelled"
  );
  const dates: Date[] = [];
  bookings.forEach((b) => {
    const start = new Date(b.pickupDate);
    const end = new Date(b.returnDate);
    const cur = new Date(start);
    while (cur <= end) {
      dates.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
  });
  return dates;
};

export const isVehicleAvailableForDates = (
  vehicleId: string,
  pickupDate: Date,
  returnDate: Date
): boolean => {
  const booked = getBookedDatesForVehicle(vehicleId);
  const bookedStr = new Set(booked.map((d) => format(d, "yyyy-MM-dd")));
  const cur = new Date(pickupDate);
  while (cur <= returnDate) {
    if (bookedStr.has(format(cur, "yyyy-MM-dd"))) return false;
    cur.setDate(cur.getDate() + 1);
  }
  return true;
};

// ── Reviews ──────────────────────────────────────────────────────────────────

export const getReviews = (): Review[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const getVehicleReviews = (vehicleId: string): Review[] =>
  getReviews().filter((r) => r.vehicleId === vehicleId);

export const addReview = (review: Omit<Review, "id" | "createdAt">): Review => {
  const all = getReviews();
  const existing = all.findIndex(
    (r) => r.vehicleId === review.vehicleId && r.userId === review.userId
  );
  const newReview: Review = {
    ...review,
    id: `RV${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  if (existing !== -1) {
    all[existing] = newReview;
  } else {
    all.push(newReview);
  }
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
  return newReview;
};

export const deleteReview = (reviewId: string, userId: string): boolean => {
  const all = getReviews();
  const filtered = all.filter((r) => !(r.id === reviewId && r.userId === userId));
  if (filtered.length === all.length) return false;
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(filtered));
  return true;
};
