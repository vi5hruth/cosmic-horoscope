import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CalendarDays, Clock, MapPin, Loader2, AlertCircle } from "lucide-react";
import { getSignById } from "@/data/zodiacData";
import type { ZodiacSign } from "@/types/zodiac";
import { fetchBirthChart } from "@/lib/api";

interface BirthChartFormProps {
  open: boolean;
  onClose: () => void;
}

interface BirthChartResult {
  sun: ZodiacSign;
  moon: ZodiacSign;
  rising: ZodiacSign;
  resolvedLocationName: string;
  approximateRising: boolean;
}

export default function BirthChartForm({ open, onClose }: BirthChartFormProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState<BirthChartResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setStatus("loading");
    setErrorMessage("");
    setResult(null);

    try {
      const data = await fetchBirthChart({ date, time, location });
      const sun = getSignById(data.sun);
      const moon = getSignById(data.moon);
      const rising = getSignById(data.rising);

      if (!sun || !moon || !rising) {
        throw new Error("Server returned an unrecognized sign — check backend/frontend sign IDs match.");
      }

      setResult({
        sun,
        moon,
        rising,
        resolvedLocationName: data.resolvedLocation.name,
        approximateRising: data.approximateRising,
      });
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
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
            aria-labelledby="birth-chart-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="glass-panel w-full md:max-w-md max-h-[88vh] overflow-y-auto p-6 md:p-8"
          >
            <div className="flex items-start justify-between">
              <h2 id="birth-chart-title" className="font-display text-2xl text-starlight">
                Birth Chart Calculator
              </h2>
              <button
                onClick={onClose}
                aria-label="Close birth chart calculator"
                className="visible-focus grid place-items-center h-8 w-8 rounded-full border border-line-violet text-muted-violet hover:text-starlight transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-violet font-body">
              Enter your birth details for your Sun, Moon, and Rising signs.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <Field icon={<CalendarDays size={14} />} label="Date of birth">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="visible-focus w-full bg-transparent text-starlight font-mono text-sm outline-none"
                />
              </Field>

              <Field icon={<Clock size={14} />} label="Time of birth (optional)">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="visible-focus w-full bg-transparent text-starlight font-mono text-sm outline-none"
                />
              </Field>

              <Field icon={<MapPin size={14} />} label="Birth location (optional)">
                <input
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="visible-focus w-full bg-transparent text-starlight font-body text-sm outline-none placeholder:text-muted-violet/50"
                />
              </Field>

              <button
                type="submit"
                disabled={status === "loading"}
                className="visible-focus w-full py-2.5 rounded-full bg-celestial-gold text-deep-space font-body text-sm font-semibold hover:bg-celestial-gold/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {status === "loading" && <Loader2 size={14} className="animate-spin" />}
                {status === "loading" ? "Reading the sky…" : "Calculate My Chart"}
              </button>
            </form>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2.5 overflow-hidden"
                >
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-200 font-body">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="grid grid-cols-3 gap-2">
                    <ResultCard title="Sun" sign={result.sun} />
                    <ResultCard title="Moon" sign={result.moon} />
                    <ResultCard title="Rising" sign={result.rising} />
                  </div>
                  <p className="mt-3 text-[11px] text-muted-violet font-body text-center">
                    Resolved to {result.resolvedLocationName}
                    {result.approximateRising && " · add a birth time for a precise Rising sign"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-violet mb-1.5">
        {icon} {label}
      </span>
      <div className="rounded-lg bg-white/5 border border-line-violet px-3 py-2.5 focus-within:border-celestial-gold transition-colors">
        {children}
      </div>
    </label>
  );
}

function ResultCard({ title, sign }: { title: string; sign: ZodiacSign }) {
  return (
    <div className="rounded-xl bg-white/5 border border-line-violet p-3 text-center">
      <p className="text-[10px] uppercase tracking-wide text-muted-violet">{title}</p>
      <p className="text-2xl mt-1" style={{ color: sign.color }}>
        {sign.symbol}
      </p>
      <p className="text-xs font-body text-starlight mt-0.5">{sign.name}</p>
    </div>
  );
}
