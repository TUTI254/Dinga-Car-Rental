"use client";
import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { id: 1, name: "Amina Odhiambo", location: "Nairobi", rating: 5, image: "https://i.pravatar.cc/80?img=5", review: "Dinga made my Mombasa trip absolutely unforgettable. The Toyota Land Cruiser was immaculate, and the booking process took less than 5 minutes. I've already recommended them to all my colleagues!", date: "March 2025" },
  { id: 2, name: "Kipchoge Mutai", location: "Eldoret", rating: 5, image: "https://i.pravatar.cc/80?img=12", review: "As a business consultant who travels frequently between Nairobi and Eldoret, Dinga is my go-to. The Mercedes E350 was spotless, the team was professional, and the rates are genuinely competitive.", date: "February 2025" },
  { id: 3, name: "Wanjiru Kamau", location: "Nairobi", rating: 5, image: "https://i.pravatar.cc/80?img=9", review: "I rented the Tesla Model 3 for a week and it completely changed how I think about electric vehicles. Zero fuel costs, smooth drive, and Dinga's team was on standby the whole time. 10/10 service!", date: "January 2025" },
  { id: 4, name: "Hassan Abdi", location: "Mombasa", rating: 5, image: "https://i.pravatar.cc/80?img=15", review: "The Dinga team in Mombasa are exceptional. Booked a Range Rover for a week-long family trip to Tsavo — flawless vehicle, zero issues, and the kids absolutely loved it. Will book again!", date: "December 2024" },
  { id: 5, name: "Grace Otieno", location: "Kisumu", rating: 4, image: "https://i.pravatar.cc/80?img=20", review: "Very impressed with the availability of vehicles and transparent Ksh pricing. The Toyota RAV4 handled the Western Kenya roads beautifully. Minor paperwork delay at pickup but otherwise perfect.", date: "November 2024" },
  { id: 6, name: "Daniel Mwangi", location: "Nakuru", rating: 5, image: "https://i.pravatar.cc/80?img=25", review: "Used Dinga for our company offsite at Lake Naivasha. Rented 4 SUVs — all in pristine condition, delivered on time, and the fleet discount was very much appreciated. Highly recommended!", date: "October 2024" },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-primary-blue font-semibold text-sm uppercase tracking-wider mb-2"
            >Testimonials</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-extrabold text-black-100"
            >What Our Customers Say</motion.h2>
          </div>
          <div className="flex gap-3">
            <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-blue hover:border-primary-blue hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-blue hover:border-primary-blue hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-0">
            {testimonials.map((t) => (
              <div key={t.id} className="flex-[0_0_340px] sm:flex-[0_0_400px] mx-3">
                <div className="bg-white rounded-2xl p-7 h-full shadow-sm border border-gray-100 flex flex-col gap-4">
                  <Quote className="w-8 h-8 text-primary-blue/30" />
                  <p className="text-grey text-sm leading-relaxed flex-1">"{t.review}"</p>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-black-100 text-sm">{t.name}</p>
                      <p className="text-grey text-xs">{t.location} · {t.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
