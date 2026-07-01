"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { addDays, format, differenceInCalendarDays } from "date-fns";
import { Calendar, MapPin, ChevronDown, AlertCircle } from "lucide-react";
import { Vehicle } from "@/types";
import { formatKsh } from "@/lib/utils";
import { isVehicleAvailableForDates } from "@/lib/booking-store";
import { KENYA_LOCATIONS } from "@/data/vehicles";
import toast from "react-hot-toast";

export default function BookingWidget({ vehicle }: { vehicle: Vehicle }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const today = new Date();

  const [pickup, setPickup] = useState(vehicle.location);
  const [dropoff, setDropoff] = useState(vehicle.location);
  const [pickupDate, setPickupDate] = useState(format(addDays(today, 1), "yyyy-MM-dd"));
  const [returnDate, setReturnDate] = useState(format(addDays(today, 3), "yyyy-MM-dd"));

  const days = Math.max(1, differenceInCalendarDays(new Date(returnDate), new Date(pickupDate)));
  const total = vehicle.pricePerDay * days;

  const [available, setAvailable] = useState(true);
  useEffect(() => {
    setAvailable(isVehicleAvailableForDates(vehicle.id, new Date(pickupDate), new Date(returnDate)));
  }, [vehicle.id, pickupDate, returnDate]);

  const handleBook = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to book a vehicle");
      router.push(`/sign-in?redirect=/cars/${vehicle.id}`);
      return;
    }
    if (!vehicle.isAvailable || !available) {
      toast.error("This vehicle is not available for those dates");
      return;
    }
    const qs = new URLSearchParams({
      vehicleId: vehicle.id,
      pickup,
      dropoff,
      pickupDate,
      returnDate,
    });
    router.push(`/booking?${qs}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg sticky top-24">
      <div className="mb-5">
        <span className="text-3xl font-extrabold text-black-100">{formatKsh(vehicle.pricePerDay)}</span>
        <span className="text-grey text-sm">/day</span>
      </div>

      <div className="flex flex-col gap-4 mb-5">
        {/* Pickup location */}
        <div>
          <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary-blue" /> Pick-up Location
          </label>
          <div className="relative">
            <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white">
              {KENYA_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey pointer-events-none" />
          </div>
        </div>

        {/* Drop-off location */}
        <div>
          <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-secondary-orange" /> Drop-off Location
          </label>
          <div className="relative">
            <select value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white">
              {KENYA_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey pointer-events-none" />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Pick-up
            </label>
            <input type="date" value={pickupDate} min={format(addDays(today, 1), "yyyy-MM-dd")} onChange={(e) => setPickupDate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue" />
          </div>
          <div>
            <label className="text-xs font-bold text-black-100 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Return
            </label>
            <input type="date" value={returnDate} min={pickupDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue" />
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-5 flex flex-col gap-2">
        <div className="flex justify-between text-sm text-grey">
          <span>{formatKsh(vehicle.pricePerDay)} × {days} day{days > 1 ? "s" : ""}</span>
          <span className="font-semibold text-black-100">{formatKsh(total)}</span>
        </div>
        <div className="flex justify-between text-sm text-grey">
          <span>Insurance</span>
          <span className="text-green-600 font-semibold">Included</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between font-extrabold text-black-100">
          <span>Total</span>
          <span>{formatKsh(total)}</span>
        </div>
      </div>

      {!available && vehicle.isAvailable && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 text-xs rounded-xl p-3 mb-4">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Vehicle is already booked for these dates. Please select different dates.</span>
        </div>
      )}

      <button
        onClick={handleBook}
        disabled={!vehicle.isAvailable || !available}
        className="w-full bg-primary-blue text-white font-bold py-4 rounded-2xl hover:bg-primary-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!isSignedIn ? "Sign in to Book" : !vehicle.isAvailable ? "Unavailable" : !available ? "Dates Unavailable" : "Book Now"}
      </button>

      <p className="text-center text-xs text-grey mt-3">Free cancellation · No hidden fees · Fully insured</p>
    </div>
  );
}
