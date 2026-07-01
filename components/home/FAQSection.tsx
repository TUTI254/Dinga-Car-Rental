"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What documents do I need to rent a car?", a: "You need a valid Kenyan or international driving licence, a national ID or passport, and a credit/debit card for the security deposit. Foreign nationals require an International Driving Permit (IDP) in addition to their home country licence." },
  { q: "What is the minimum age to rent a car?", a: "You must be at least 23 years old to rent any vehicle on the Dinga platform. For luxury and sports vehicles, the minimum age is 25 years. A young driver surcharge may apply for drivers aged 23–25." },
  { q: "How does the payment and deposit work?", a: "We accept M-Pesa, Visa, Mastercard and bank transfer. A refundable security deposit (Ksh 10,000–50,000 depending on vehicle class) is held at booking and released within 5–7 business days after the vehicle is returned in good condition." },
  { q: "Can I pick up in one city and return in another?", a: "Yes! One-way rentals are available between our 8 locations (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Naivasha, and Karen). A one-way fee applies and will be displayed at checkout." },
  { q: "What is included in the rental price?", a: "All rentals include comprehensive insurance, 24/7 roadside assistance, unlimited mileage (select vehicles), and basic vehicle maintenance. Fuel is not included — vehicles are provided with a full tank and should be returned full." },
  { q: "What happens if I need to cancel my booking?", a: "Free cancellation is available up to 48 hours before your pick-up time. Cancellations within 48 hours incur a 20% fee. No-shows are charged the full first day's rental. You can cancel directly from your dashboard." },
  { q: "Are the vehicles insured?", a: "All Dinga vehicles carry comprehensive insurance. This covers third-party liability, fire, and theft. An optional Collision Damage Waiver (CDW) reduces your excess to zero and is recommended for off-road or long-distance travel." },
  { q: "Can I take the car outside Kenya?", a: "Cross-border travel is allowed to Uganda, Tanzania, and Rwanda with prior written consent. Additional documentation and a cross-border fee apply. Travel to other countries is currently not permitted." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary-blue font-semibold text-sm uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black-100">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-black-100 pr-4">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-grey flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-grey text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
