"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Calendar, Search, ChevronDown } from "lucide-react";
import { KENYA_LOCATIONS } from "@/data/vehicles";
import { format, addDays } from "date-fns";

export default function HeroSection() {
  const router = useRouter();
  const today = new Date();
  const [pickup, setPickup] = useState(KENYA_LOCATIONS[0]);
  const [dropoff, setDropoff] = useState(KENYA_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(format(addDays(today, 1), "yyyy-MM-dd"));
  const [returnDate, setReturnDate] = useState(format(addDays(today, 3), "yyyy-MM-dd"));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/cars?location=${encodeURIComponent(pickup)}`);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black-100 via-[#1a1b27] to-[#0d1117]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      {/* Glowing blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-orange/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-16 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 bg-primary-blue/20 text-primary-blue text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-primary-blue/30">
              <span className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" />
              Kenya's #1 Car Rental Platform
            </span>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
              Drive Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-secondary-orange">
                Dream Car
              </span>{" "}
              Today
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8 max-w-lg">
              90+ premium vehicles available across 8 Kenyan cities. Instant booking, transparent Ksh pricing, and 24/7 roadside support.
            </p>
            <div className="flex flex-wrap gap-6 text-white/60 text-sm mb-10">
              {["Free Cancellation", "No Hidden Fees", "24/7 Support", "Fully Insured"].map((f) => (
                <span key={f} className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-primary-blue/30 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-primary-blue rounded-full" />
                  </span>
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero image placeholder – replaced by the booking form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary-blue/10 rounded-3xl blur-xl" />
            <img
              src="/hero.png"
              alt="Premium car"
              className="relative w-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Pickup */}
            <div className="lg:col-span-1">
              <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Pick-up Location
              </label>
              <div className="relative">
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  {KENYA_LOCATIONS.map((l) => <option key={l} value={l} className="text-black">{l}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
              </div>
            </div>

            {/* Drop-off */}
            <div className="lg:col-span-1">
              <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Drop-off Location
              </label>
              <div className="relative">
                <select
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  {KENYA_LOCATIONS.map((l) => <option key={l} value={l} className="text-black">{l}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
              </div>
            </div>

            {/* Pick-up Date */}
            <div>
              <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Pick-up Date
              </label>
              <input
                type="date"
                value={pickupDate}
                min={format(addDays(today, 1), "yyyy-MM-dd")}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue [color-scheme:dark]"
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                min={pickupDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue [color-scheme:dark]"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4" />
              Search Cars
            </button>
          </form>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
