"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Car, Users, MapPin, CheckCircle } from "lucide-react";

const stats = [
  { icon: Car, value: 96, suffix: "+", label: "Vehicles Available" },
  { icon: Users, value: 15000, suffix: "+", label: "Happy Customers" },
  { icon: MapPin, value: 8, suffix: "", label: "Kenya Locations" },
  { icon: CheckCircle, value: 45000, suffix: "+", label: "Bookings Completed" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(Math.floor(cur));
      if (cur >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-primary-blue py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-2">
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <Counter target={s.value} suffix={s.suffix} />
              <p className="text-white/70 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
