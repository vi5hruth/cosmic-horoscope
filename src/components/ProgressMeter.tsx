import { motion } from "framer-motion";

interface ProgressMeterProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  accent?: string;
}

export default function ProgressMeter({ label, icon, value, accent = "#7B2FF7" }: ProgressMeterProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1.5 text-sm text-starlight font-body">
          {icon}
          {label}
        </span>
        <span className="text-xs font-mono text-muted-violet">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
