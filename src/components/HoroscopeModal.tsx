import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, Briefcase, Leaf, Coins, Hash, Palette, Users, Smile, Orbit } from "lucide-react";
import clsx from "clsx";
import type { ZodiacSign, ReadingPeriod } from "@/types/zodiac";
import { READING_PERIODS } from "@/data/zodiacData";
import StarRating from "./StarRating";
import ProgressMeter from "./ProgressMeter";

interface HoroscopeModalProps {
  sign: ZodiacSign | null;
  onClose: () => void;
}

const periodLabels: Record<ReadingPeriod, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export default function HoroscopeModal({ sign, onClose }: HoroscopeModalProps) {
  const [period, setPeriod] = useState<ReadingPeriod>("daily");

  return (
    <AnimatePresence>
      {sign && (
        <motion.div
          className="fixed inset-0 z-20 flex items-end md:items-center justify-center p-0 md:p-6 bg-void/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="horoscope-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="glass-panel w-full md:max-w-lg max-h-[88vh] overflow-y-auto p-6 md:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-4xl" style={{ color: sign.color }}>
                  {sign.symbol}
                </span>
                <h2 id="horoscope-modal-title" className="font-display text-3xl text-starlight mt-1">
                  {sign.name}
                </h2>
                <p className="text-xs text-muted-violet font-mono">{sign.dateRange} · {sign.element}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close horoscope"
                className="visible-focus grid place-items-center h-8 w-8 rounded-full border border-line-violet text-muted-violet hover:text-starlight transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 flex gap-1 p-1 rounded-full bg-white/5 w-fit">
              {READING_PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={clsx(
                    "visible-focus px-4 py-1.5 rounded-full text-xs font-body transition-colors",
                    period === p ? "bg-electric-purple text-starlight" : "text-muted-violet hover:text-starlight",
                  )}
                  aria-pressed={period === p}
                >
                  {periodLabels[p]}
                </button>
              ))}
            </div>

            <motion.p
              key={period}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-5 text-starlight/90 font-body text-sm leading-relaxed"
            >
              {sign.readings[period].overview}
            </motion.p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <MetricChip icon={<Hash size={14} />} label="Lucky Number" value={String(sign.readings[period].luckyNumber)} />
              <MetricChip icon={<Palette size={14} />} label="Lucky Color" value={sign.readings[period].luckyColor} />
              <MetricChip icon={<Users size={14} />} label="Compatibility" value={sign.readings[period].compatibility} />
              <MetricChip icon={<Smile size={14} />} label="Mood" value={sign.readings[period].mood} />
              <MetricChip icon={<Orbit size={14} />} label="Planet Ruler" value={sign.readings[period].planetRuler} className="col-span-2" />
            </div>

            <div className="mt-6 space-y-4">
              <CategoryRow icon={<Heart size={14} className="text-pink-400" />} label="Love" data={sign.readings[period].categories.love} accent="#F472B6" />
              <CategoryRow icon={<Briefcase size={14} className="text-celestial-gold" />} label="Career" data={sign.readings[period].categories.career} accent="#E8B563" />
              <CategoryRow icon={<Leaf size={14} className="text-emerald-400" />} label="Health" data={sign.readings[period].categories.health} accent="#34D399" />
              <CategoryRow icon={<Coins size={14} className="text-electric-purple" />} label="Wealth" data={sign.readings[period].categories.wealth} accent="#7B2FF7" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetricChip({ icon, label, value, className }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className={clsx("rounded-lg bg-white/5 px-3 py-2", className)}>
      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-violet">
        {icon} {label}
      </span>
      <p className="mt-0.5 text-starlight font-mono text-sm">{value}</p>
    </div>
  );
}

function CategoryRow({ icon, label, data, accent }: { icon: React.ReactNode; label: string; data: { rating: number; meter: number; summary: string }; accent: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <ProgressMeter label={label} icon={icon} value={data.meter} accent={accent} />
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-muted-violet/80 font-body">{data.summary}</p>
        <StarRating rating={data.rating} />
      </div>
    </div>
  );
}
