"use client";
import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { Vehicle } from "@/types";
import { formatKsh } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  vehicles: Vehicle[];
  viewAllHref?: string;
}

function VehicleCardMini({ v }: { v: Vehicle }) {
  return (
    <div className="min-w-0 flex-[0_0_280px] sm:flex-[0_0_320px]">
      <Link href={`/cars/${v.id}`}>
        <div className="group bg-primary-blue-100 hover:bg-white hover:shadow-xl rounded-2xl p-5 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-100 mx-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-grey font-medium capitalize">{v.category}</p>
              <h3 className="font-bold text-black-100 text-lg leading-tight">{v.brand} {v.model}</h3>
              <p className="text-xs text-grey">{v.year}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-600">{v.rating}</span>
            </div>
          </div>

          <div className="relative h-36 mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={v.thumbnail}
              alt={`${v.brand} ${v.model}`}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = "/hero.png"; }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-grey mb-4">
            <span className="capitalize">{v.transmission}</span>
            <span className="capitalize">{v.fuelType}</span>
            <span>{v.seats} seats</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-extrabold text-black-100">{formatKsh(v.pricePerDay)}</span>
              <span className="text-xs text-grey">/day</span>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${v.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {v.isAvailable ? "Available" : "Booked"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function VehicleCarousel({ title, subtitle, vehicles, viewAllHref = "/cars" }: Props) {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [autoplay.current]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!vehicles.length) return null;

  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black-100">{title}</h2>
            {subtitle && <p className="text-grey mt-2">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-blue hover:border-primary-blue hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-blue hover:border-primary-blue hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link href={viewAllHref} className="hidden sm:inline-flex text-primary-blue text-sm font-bold hover:underline ml-2">
              View All →
            </Link>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {vehicles.map((v) => <VehicleCardMini key={v.id} v={v} />)}
          </div>
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href={viewAllHref} className="text-primary-blue text-sm font-bold hover:underline">View All →</Link>
        </div>
      </div>
    </section>
  );
}
