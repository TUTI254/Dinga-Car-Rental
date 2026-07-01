import HeroSection from "@/components/home/HeroSection";
import VehicleCarousel from "@/components/home/VehicleCarousel";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import {
  getFeaturedVehicles,
  getBudgetVehicles,
  getLuxuryVehicles,
  getElectricVehicles,
  getSUVVehicles,
} from "@/data/vehicles";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  { label: "Economy", slug: "economy", icon: "🚗", desc: "From Ksh 3,200/day" },
  { label: "Sedan", slug: "sedan", icon: "🚙", desc: "From Ksh 4,500/day" },
  { label: "SUV", slug: "suv", icon: "🛻", desc: "From Ksh 7,000/day" },
  { label: "Pickup", slug: "pickup", icon: "🚐", desc: "From Ksh 8,000/day" },
  { label: "Luxury", slug: "luxury", icon: "✨", desc: "From Ksh 18,000/day" },
  { label: "Electric", slug: "electric", icon: "⚡", desc: "From Ksh 7,000/day" },
  { label: "Sports", slug: "sports", icon: "🏎️", desc: "From Ksh 40,000/day" },
  { label: "Van", slug: "van", icon: "🚌", desc: "From Ksh 6,000/day" },
];

export default function HomePage() {
  const popular = getFeaturedVehicles(10);
  const budget = getBudgetVehicles(6000, 10);
  const luxury = getLuxuryVehicles(20000, 10);
  const electric = getElectricVehicles(8);
  const suvs = getSUVVehicles(10);

  return (
    <>
      <HeroSection />

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
          <div className="text-center mb-10">
            <p className="text-primary-blue font-semibold text-sm uppercase tracking-wider mb-2">Browse by type</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black-100">Find Your Perfect Ride</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((c) => (
              <Link key={c.slug} href={`/cars?category=${c.slug}`}>
                <div className="group bg-primary-blue-100 hover:bg-primary-blue rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer border border-transparent hover:border-primary-blue">
                  <div className="text-3xl mb-2">{c.icon}</div>
                  <p className="font-bold text-black-100 group-hover:text-white text-sm">{c.label}</p>
                  <p className="text-xs text-grey group-hover:text-white/80 mt-1">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <VehicleCarousel
          title="🔥 Most Popular"
          subtitle="Top-rated vehicles chosen by Kenyan drivers"
          vehicles={popular}
          viewAllHref="/cars?sortBy=rating"
        />
      </div>

      <VehicleCarousel
        title="💰 Budget Friendly"
        subtitle="Great cars at unbeatable Ksh rates"
        vehicles={budget}
        viewAllHref="/cars?sortBy=price-asc"
      />

      <div className="bg-gray-50">
        <VehicleCarousel
          title="✨ Luxury Fleet"
          subtitle="Premium vehicles for those who demand the best"
          vehicles={luxury}
          viewAllHref="/cars?category=luxury"
        />
      </div>

      <VehicleCarousel
        title="⚡ Electric Vehicles"
        subtitle="Zero emissions, full performance"
        vehicles={electric}
        viewAllHref="/cars?fuelType=electric"
      />

      <div className="bg-gray-50">
        <VehicleCarousel
          title="🛻 SUVs & 4WDs"
          subtitle="Built for Kenya's diverse terrain"
          vehicles={suvs}
          viewAllHref="/cars?category=suv"
        />
      </div>

      <StatsSection />
      <TestimonialsSection />
      <FAQSection />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-black-100 to-primary-blue">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Hit the Road?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Book your perfect car in minutes. No hidden fees, instant confirmation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cars"
              className="bg-white text-primary-blue font-bold px-8 py-4 rounded-full text-base hover:bg-white/90 transition-colors"
            >
              Browse All Cars
            </Link>
            <Link
              href="/sign-up"
              className="bg-secondary-orange text-white font-bold px-8 py-4 rounded-full text-base hover:bg-secondary-orange/90 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
