import * as THREE from "three";
import type { ZodiacElement } from "@/types/zodiac";

interface ElementGradient {
  top: THREE.Color;
  bottom: THREE.Color;
  rim: THREE.Color;
}

const RAW: Record<ZodiacElement, { top: string; bottom: string }> = {
  Fire: { top: "#FFC069", bottom: "#FF3D3D" },
  Earth: { top: "#C9E4A0", bottom: "#2E6B3E" },
  Air: { top: "#E6F4FF", bottom: "#6EC6FF" },
  Water: { top: "#8FE3EA", bottom: "#1B3B7A" },
};

const cache = new Map<ZodiacElement, ElementGradient>();

export function getElementGradient(element: ZodiacElement): ElementGradient {
  const existing = cache.get(element);
  if (existing) return existing;
  const { top, bottom } = RAW[element];
  const topColor = new THREE.Color(top);
  const gradient: ElementGradient = {
    top: topColor,
    bottom: new THREE.Color(bottom),
    rim: topColor.clone().lerp(new THREE.Color("#FFFFFF"), 0.4),
  };
  cache.set(element, gradient);
  return gradient;
}