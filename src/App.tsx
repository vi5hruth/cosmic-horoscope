import { useState, useCallback } from "react";
import Scene from "@/three/Scene";
import HeroOverlay from "@/components/HeroOverlay";
import HoroscopeModal from "@/components/HoroscopeModal";
import BirthChartForm from "@/components/BirthChartForm";
import type { ZodiacSign } from "@/types/zodiac";

export default function App() {
  const [focusedSign, setFocusedSign] = useState<ZodiacSign | null>(null);
  const [openSign, setOpenSign] = useState<ZodiacSign | null>(null);
  const [birthChartOpen, setBirthChartOpen] = useState(false);

  const handleSelect = useCallback((sign: ZodiacSign) => {
    setFocusedSign(sign);
  }, []);

  const handleEnter = useCallback(() => {
    if (focusedSign) setOpenSign(focusedSign);
  }, [focusedSign]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-deep-space">
      <Scene selectedSign={focusedSign} onSelectSign={handleSelect} />

      <div className="pointer-events-none fixed inset-0 z-[1] bg-radial-fade" />

      <HeroOverlay
        selectedSign={focusedSign}
        onSelect={handleSelect}
        onEnter={handleEnter}
        onOpenBirthChart={() => setBirthChartOpen(true)}
      />

      <HoroscopeModal sign={openSign} onClose={() => setOpenSign(null)} />
      <BirthChartForm open={birthChartOpen} onClose={() => setBirthChartOpen(false)} />
    </main>
  );
}
