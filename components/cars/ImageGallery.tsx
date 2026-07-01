"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden aspect-video">
        <img
          src={images[active]}
          alt={name}
          className="w-full h-full object-contain"
          onError={(e) => { (e.target as HTMLImageElement).src = "/hero.png"; }}
        />
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center hover:bg-white transition-colors">
          <ChevronLeft className="w-5 h-5 text-black-100" />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center hover:bg-white transition-colors">
          <ChevronRight className="w-5 h-5 text-black-100" />
        </button>
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
              i === active ? "border-primary-blue" : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={img}
              alt={`View ${i + 1}`}
              className="w-full h-full object-contain bg-gray-50"
              onError={(e) => { (e.target as HTMLImageElement).src = "/hero.png"; }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
