import { notFound } from "next/navigation";
import { getVehicleById, getSimilarVehicles } from "@/data/vehicles";
import ImageGallery from "@/components/cars/ImageGallery";
import BookingWidget from "@/components/cars/BookingWidget";
import ReviewSection from "@/components/cars/ReviewSection";
import VehicleCard from "@/components/cars/VehicleCard";
import { Star, MapPin, Shield, Fuel, Users, Gauge, Settings, CheckCircle } from "lucide-react";
import { formatKsh } from "@/lib/utils";
import type { Metadata } from "next";

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = getVehicleById(params.id);
  if (!v) return { title: "Vehicle Not Found" };
  return {
    title: `${v.brand} ${v.model} ${v.year} – ${formatKsh(v.pricePerDay)}/day`,
    description: v.description,
  };
}

export default function VehicleDetailPage({ params }: Props) {
  const vehicle = getVehicleById(params.id);
  if (!vehicle) notFound();

  const similar = getSimilarVehicles(vehicle, 4);

  const specs = [
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuelType },
    { icon: Settings, label: "Transmission", value: vehicle.transmission },
    { icon: Users, label: "Seats", value: `${vehicle.seats} passengers` },
    { icon: Gauge, label: "Engine", value: vehicle.engineSize },
    { icon: MapPin, label: "Location", value: vehicle.location },
    { icon: Shield, label: "Insurance", value: vehicle.insuranceStatus },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-grey mb-6 flex items-center gap-2">
          <a href="/cars" className="hover:text-primary-blue">Fleet</a>
          <span>/</span>
          <a href={`/cars?category=${vehicle.category}`} className="hover:text-primary-blue capitalize">{vehicle.category}</a>
          <span>/</span>
          <span className="text-black-100 font-medium">{vehicle.brand} {vehicle.model}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left – images + details */}
          <div className="lg:col-span-2">
            <ImageGallery images={vehicle.images} name={`${vehicle.brand} ${vehicle.model}`} />

            <div className="mt-8">
              {/* Title */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <span className="inline-block bg-primary-blue/10 text-primary-blue text-xs font-semibold px-3 py-1 rounded-full capitalize mb-2">
                    {vehicle.category}
                  </span>
                  <h1 className="text-3xl font-extrabold text-black-100">{vehicle.brand} {vehicle.model} {vehicle.year}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-black-100">{vehicle.rating}</span>
                      <span className="text-grey text-sm">({vehicle.reviewCount} reviews)</span>
                    </div>
                    <span className="text-grey">·</span>
                    <span className="text-grey text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{vehicle.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-black-100">{formatKsh(vehicle.pricePerDay)}<span className="text-grey text-base font-normal">/day</span></div>
                  <div className="text-sm text-grey mt-1">
                    {formatKsh(vehicle.pricePerWeek)}/week · {formatKsh(vehicle.pricePerMonth)}/month
                  </div>
                  <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${vehicle.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {vehicle.isAvailable ? "✓ Available" : "Currently Booked"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-grey leading-relaxed mb-8">{vehicle.description}</p>

              {/* Specs */}
              <h2 className="text-xl font-extrabold text-black-100 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {specs.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100">
                    <s.icon className="w-4 h-4 text-primary-blue mb-2" />
                    <p className="text-xs text-grey uppercase tracking-wider">{s.label}</p>
                    <p className="font-bold text-black-100 capitalize mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <h2 className="text-xl font-extrabold text-black-100 mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {vehicle.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-grey">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <ReviewSection vehicleId={vehicle.id} />
            </div>
          </div>

          {/* Right – booking widget */}
          <div className="lg:col-span-1">
            <BookingWidget vehicle={vehicle} />
          </div>
        </div>

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-black-100 mb-6">Similar Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {similar.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
