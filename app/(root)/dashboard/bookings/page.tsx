"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar, MapPin, Car, XCircle, ArrowLeft } from "lucide-react";
import { Booking } from "@/types";
import { getUserBookings, cancelBooking } from "@/lib/booking-store";
import { formatKsh } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  active: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-grey",
  cancelled: "bg-red-100 text-red-600",
  pending: "bg-yellow-100 text-yellow-700",
};

export default function BookingsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  useEffect(() => {
    if (isLoaded && !user) router.push("/sign-in");
  }, [isLoaded, user]);

  useEffect(() => {
    if (user) setBookings(getUserBookings(user.id));
  }, [user]);

  const now = new Date();
  const filtered = bookings.filter((b) => {
    if (tab === "upcoming") return ["confirmed", "pending", "active"].includes(b.status) && new Date(b.returnDate) >= now;
    if (tab === "completed") return b.status === "completed" || (b.status !== "cancelled" && new Date(b.returnDate) < now);
    if (tab === "cancelled") return b.status === "cancelled";
    return true;
  });

  const handleCancel = (id: string) => {
    if (!user) return;
    const ok = cancelBooking(id, user.id);
    if (ok) {
      setBookings(getUserBookings(user.id));
      toast.success("Booking cancelled");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-16">
        <Link href="/dashboard" className="flex items-center gap-2 text-grey text-sm mb-6 hover:text-black-100">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-black-100 mb-8">My Bookings</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${tab === t ? "bg-primary-blue text-white" : "bg-white text-grey border border-gray-200 hover:border-primary-blue"}`}>
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Car className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <h3 className="font-bold text-black-100 text-xl mb-2">No bookings found</h3>
            <p className="text-grey mb-6">Start exploring our fleet and book your next adventure.</p>
            <Link href="/cars" className="bg-primary-blue text-white font-bold px-6 py-3 rounded-2xl text-sm hover:bg-primary-blue/90">Browse Cars</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((b) => (
              <div key={b.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img src={b.vehicleThumbnail} alt={b.vehicleName} className="w-full sm:w-40 h-28 object-contain bg-gray-50 rounded-2xl shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = "/hero.png"; }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h3 className="font-extrabold text-black-100 text-lg">{b.vehicleName}</h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${statusColors[b.status] || "bg-gray-100 text-grey"}`}>{b.status}</span>
                    </div>
                    <p className="text-xs text-grey mt-0.5">Booking ID: {b.id}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-sm">
                      <div className="flex items-center gap-2 text-grey">
                        <Calendar className="w-4 h-4 text-primary-blue" />
                        <span>{format(new Date(b.pickupDate), "MMM d")} – {format(new Date(b.returnDate), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-grey">
                        <MapPin className="w-4 h-4 text-primary-blue" />
                        <span>{b.pickupLocation}</span>
                      </div>
                      <div className="font-extrabold text-black-100">{formatKsh(b.totalPrice)} <span className="text-grey font-normal text-xs">({b.totalDays}d)</span></div>
                    </div>
                  </div>
                </div>
                {["confirmed", "pending"].includes(b.status) && new Date(b.pickupDate) > now && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <button onClick={() => handleCancel(b.id)} className="flex items-center gap-2 text-red-500 text-sm font-semibold hover:text-red-700">
                      <XCircle className="w-4 h-4" /> Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
