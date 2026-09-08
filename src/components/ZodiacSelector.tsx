import { useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { zodiacSigns } from "@/data/zodiacData";
import type { ZodiacSign } from "@/types/zodiac";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ZodiacSelectorProps {
  selectedSign: ZodiacSign | null;
  onSelect: (sign: ZodiacSign) => void;
}

export default function ZodiacSelector({ selectedSign, onSelect }: ZodiacSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dx: number) => {
    scrollRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <button
        aria-label="Scroll signs left"
        onClick={() => scrollBy(-200)}
        className="visible-focus absolute left-0 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-8 w-8 rounded-full bg-midnight-navy/80 border border-line-violet text-muted-violet hover:text-starlight transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-10 py-2 no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {zodiacSigns.map((sign) => {
          const isActive = selectedSign?.id === sign.id;
          return (
            <motion.button
              key={sign.id}
              onClick={() => onSelect(sign)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              className={clsx(
                "visible-focus snap-center shrink-0 flex flex-col items-center justify-center gap-1 h-20 w-16 rounded-xl border transition-colors",
                isActive
                  ? "bg-electric-purple/20 border-celestial-gold shadow-glow-gold"
                  : "bg-midnight-navy/50 border-line-violet hover:border-muted-violet",
              )}
              aria-pressed={isActive}
              aria-label={`Select ${sign.name}`}
            >
              <span className="text-2xl" style={{ color: sign.color }}>
                {sign.symbol}
              </span>
              <span className="text-[10px] font-body text-muted-violet">{sign.name}</span>
            </motion.button>
          );
        })}
      </div>

      <button
        aria-label="Scroll signs right"
        onClick={() => scrollBy(200)}
        className="visible-focus absolute right-0 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-8 w-8 rounded-full bg-midnight-navy/80 border border-line-violet text-muted-violet hover:text-starlight transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
