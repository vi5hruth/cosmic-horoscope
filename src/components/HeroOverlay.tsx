import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ZodiacSelector from "./ZodiacSelector";
import type { ZodiacSign } from "@/types/zodiac";

interface HeroOverlayProps {
  selectedSign: ZodiacSign | null;
  onSelect: (sign: ZodiacSign) => void;
  onEnter: () => void;
  onOpenBirthChart: () => void;
}

export default function HeroOverlay({ selectedSign, onSelect, onEnter, onOpenBirthChart }: HeroOverlayProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-between h-full w-full pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto text-center pt-16 px-6"
      >
        <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-celestial-gold font-mono">
          <Sparkles size={12} /> Celestial Cartography
        </span>
        <h1 className="mt-3 font-display text-5xl md:text-7xl font-medium text-starlight">
          Chart your sky.
        </h1>
        <p className="mt-3 max-w-md mx-auto text-muted-violet font-body text-sm md:text-base">
          Twelve signs, one wheel. Select yours to zoom in and read what the stars set for you today.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-auto w-full pb-10 px-4 flex flex-col items-center gap-5"
      >
        <ZodiacSelector selectedSign={selectedSign} onSelect={onSelect} />

        <div className="flex items-center gap-3">
          <button
            onClick={onEnter}
            disabled={!selectedSign}
            className="visible-focus px-6 py-2.5 rounded-full bg-electric-purple text-starlight font-body text-sm font-medium shadow-glow-purple hover:bg-electric-purple/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {selectedSign ? `Enter ${selectedSign.name}'s Reading` : "Select a sign to enter"}
          </button>
          <button
            onClick={onOpenBirthChart}
            className="visible-focus px-5 py-2.5 rounded-full border border-line-violet text-muted-violet hover:text-starlight hover:border-celestial-gold font-body text-sm transition-colors"
          >
            Calculate Birth Chart
          </button>
        </div>
      </motion.div>
    </div>
  );
}
