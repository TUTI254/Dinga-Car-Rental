"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { differenceInCalendarDays, format } from "date-fns";
import { CheckCircle, MapPin, Calendar, Shield, ArrowLeft } from "lucide-react";
import { getVehicleById } from "@/data/vehicles";
import { createBooking, isVehicleAvailableForDates } from "@/lib/booking-store";
import { formatKsh } from "@/lib/utils";
import { Booking, Vehicle } from "@/types";
import toast from "react-hot-toast";
import Link from "next/link";

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  const vehicleId = params.get("vehicleId") || "";
  const pickup = params.get("pickup") || "";
  const dropoff = params.get("dropoff") || "";
  const pickupDate = params.get("pickupDate") || "";
  const returnDate = params.get("returnDate") || "";

  useEffect(() => {
    const v = getVehicleById(vehicleId);
    if (v) setVehicle(v);
    else router.push("/cars");
  }, [vehicleId]);

  useEffect(() => {
    if (isLoaded && !user) router.push("/sign-in");
  }, [isLoaded, user]);

  if (!vehicle || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full" /></div>;

  const days = Math.max(1, differenceInCalendarDays(new Date(returnDate), new Date(pickupDate)));
  const total = vehicle.pricePerDay * days;
  const available = isVehicleAvailableForDates(vehicleId, new Date(pickupDate), new Date(returnDate));

  const handleConfirm = async () => {
    if (!available) { toast.error("Dates unavailable"); return; }
    setLoading(true);
    try {
      const booking = createBooking({
        vehicle,
        userId: user.id,
        pickupLocation: pickup,
        returnLocation: dropoff,
        pickupDate: new Date(pickupDate),
        returnDate: new Date(returnDate),
      });
      setConfirmed(booking);
      toast.success("Booking confirmed! 🎉");
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-black-100 mb-2">Booking Confirmed!</h1>
          <p className="text-grey mb-6">Your booking ID is <strong className="text-black-100">{confirmed.id}</strong></p>

          <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-grey">Vehicle</span>
              <span className="font-semibold text-black-100">{confirmed.vehicleName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-grey">Pick-up</span>
              <span className="font-semibold text-black-100">{format(new Date(confirmed.pickupDate), "MMM d, yyyy")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-grey">Return</span>
              <span className="font-semibold text-black-100">{format(new Date(confirmed.returnDate), "MMM d, yyyy")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-grey">Duration</span>
              <span className="font-semibold text-black-100">{confirmed.totalDays} day{confirmed.totalDays > 1 ? "s" : ""}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-extrabold text-black-100">
              <span>Total Paid</span>
              <span>{formatKsh(confirmed.totalPrice)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/dashboard/bookings" className="block w-full bg-primary-blue text-white font-bold py-3 rounded-2xl text-center hover:bg-primary-blue/90">View My Bookings</Link>
            <Link href="/cars" className="block w-full border border-gray-200 text-black-100 font-bold py-3 rounded-2xl text-center hover:bg-gray-50">Browse More Cars</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6 sm:px-16">
        <Link href={`/cars/${vehicleId}`} className="flex items-center gap-2 text-grey text-sm mb-6 hover:text-black-100">
          <ArrowLeft className="w-4 h-4" /> Back to vehicle
        </Link>

        <h1 className="text-3xl font-extrabold text-black-100 mb-8">Confirm Your Booking</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Vehicle card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <img src={vehicle.thumbnail} alt={vehicle.brand} className="w-full h-40 object-contain bg-gray-50 rounded-2xl mb-4" onError={(e) => { (e.target as HTMLImageElement).src = "/hero.png"; }} />
            <h2 className="font-extrabold text-black-100 text-xl">{vehicle.brand} {vehicle.model} {vehicle.year}</h2>
            <p className="text-grey text-sm capitalize mt-1">{vehicle.category} · {vehicle.transmission} · {vehicle.fuelType}</p>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
            <h2 className="font-extrabold text-black-100">Booking Summary</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                <div><p className="text-grey text-xs">Pick-up</p><p className="font-semibold text-black-100">{pickup}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-orange mt-0.5 shrink-0" />
                <div><p className="text-grey text-xs">Drop-off</p><p className="font-semibold text-black-100">{dropoff}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                <div><p className="text-grey text-xs">Dates</p><p className="font-semibold text-black-100">{format(new Date(pickupDate), "MMM d")} – {format(new Date(returnDate), "MMM d, yyyy")} ({days} day{days > 1 ? "s" : ""})</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <div><p className="text-grey text-xs">Insurance</p><p className="font-semibold text-black-100">Comprehensive – Included</p></div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-grey">
                <span>{formatKsh(vehicle.pricePerDay)} × {days} day{days > 1 ? "s" : ""}</span>
                <span className="font-semibold text-black-100">{formatKsh(total)}</span>
              </div>
              <div className="flex justify-between text-grey">
                <span>Service fee</span><span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between font-extrabold text-black-100 text-base border-t border-gray-100 pt-2">
                <span>Total</span><span>{formatKsh(total)}</span>
              </div>
            </div>

            <button onClick={handleConfirm} disabled={loading || !available} className="w-full bg-primary-blue text-white font-bold py-4 rounded-2xl hover:bg-primary-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading ? "Processing..." : !available ? "Dates Unavailable" : `Confirm & Pay ${formatKsh(total)}`}
            </button>
            <p className="text-center text-xs text-grey">By confirming, you agree to our Terms & Conditions. Free cancellation up to 48h before pickup.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
