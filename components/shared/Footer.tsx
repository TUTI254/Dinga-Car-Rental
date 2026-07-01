"use client";

import Link from "next/link";
import { Car, Mail, Phone, MapPin } from "lucide-react";

const categories = ["Economy", "Sedan", "SUV", "Pickup", "Luxury", "Electric", "Sports", "Van"];
const company = ["About Us", "Our Fleet", "Locations", "Partners", "Careers", "Blog"];
const support = ["Help Center", "Contact Us", "Terms & Conditions", "Privacy Policy", "Refund Policy", "Cookie Policy"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black-100 text-white">
      {/* Newsletter */}
      <div className="bg-primary-blue py-10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-white">Get Exclusive Deals</h3>
            <p className="text-white/80 text-sm mt-1">Subscribe for special offers and new fleet arrivals.</p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full text-black-100 text-sm outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-primary-blue font-bold px-6 py-3 rounded-full text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-blue rounded-lg p-1.5">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold">Dinga<span className="text-primary-blue"> Rentals</span></span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Kenya's premier car rental service. From economy to luxury, we have the perfect vehicle for every journey.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-blue" /> +254 700 000 000</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-blue" /> hello@dingacarrentals.co.ke</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-blue" /> Westlands, Nairobi, Kenya</span>
            </div>
            <div className="flex gap-3 mt-6">
              {["FB", "TW", "IG", "IN", "YT"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-white/10 hover:bg-primary-blue rounded-full flex items-center justify-center transition-colors text-white text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/90">Categories</h4>
            <ul className="flex flex-col gap-3">
              {categories.map((c) => (
                <li key={c}>
                  <Link href={`/cars?category=${c.toLowerCase()}`} className="text-white/60 text-sm hover:text-white transition-colors">{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/90">Company</h4>
            <ul className="flex flex-col gap-3">
              {company.map((c) => (
                <li key={c}>
                  <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{c}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/90">Support</h4>
            <ul className="flex flex-col gap-3">
              {support.map((s) => (
                <li key={s}>
                  <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© {year} Dinga Car Rentals. All rights reserved.</p>
          <p>Made with ♥ for Kenya</p>
        </div>
      </div>
    </footer>
  );
}
