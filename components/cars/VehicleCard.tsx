"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, Users, Fuel, Zap } from "lucide-react";
import { Vehicle } from "@/types";
import { formatKsh } from "@/lib/utils";

export default function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  const fuelIcon = vehicle.fuelType === "electric" ? <Zap className="w-3 h-3" /> : <Fuel className="w-3 h-3" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/cars/${vehicle.id}`}>
        <div className="group bg-primary-blue-100 hover:bg-white hover:shadow-xl rounded-3xl p-6 transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-primary-blue/10 text-primary-blue text-xs font-semibold px-2.5 py-1 rounded-full capitalize mb-2">
                {vehicle.category}
              </span>
              <h3 className="font-bold text-black-100 text-lg leading-tight">{vehicle.brand} {vehicle.model}</h3>
              <p className="text-xs text-grey mt-0.5">{vehicle.year} · {vehicle.color}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full shrink-0">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-600">{vehicle.rating}</span>
              <span className="text-xs text-grey">({vehicle.reviewCount})</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-4 flex-shrink-0">
            <img
              src={vehicle.thumbnail}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = "/hero.png"; }}
            />
            {!vehicle.isAvailable && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">Currently Booked</span>
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="flex justify-between text-xs text-grey mb-4">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{vehicle.seats} seats</span>
            <span className="capitalize">{vehicle.transmission}</span>
            <span className="flex items-center gap-1">{fuelIcon}{vehicle.fuelType}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vehicle.location.split(",")[0]}</span>
          </div>

          {/* Price & CTA */}
          <div className="flex justify-between items-center mt-auto">
            <div>
              <span className="text-2xl font-extrabold text-black-100">{formatKsh(vehicle.pricePerDay)}</span>
              <span className="text-xs text-grey">/day</span>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
              vehicle.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
            }`}>
              {vehicle.isAvailable ? "Book Now" : "Unavailable"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
