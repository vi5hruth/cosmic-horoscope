import { useMemo } from "react";
import * as THREE from "three";
import { zodiacSigns } from "@/data/zodiacData";
import type { ZodiacSign } from "@/types/zodiac";
import ZodiacNode from "./ZodiacNode";

interface ZodiacWheelProps {
  selectedSign: ZodiacSign | null;
  onSelect: (sign: ZodiacSign) => void;
}

export default function ZodiacWheel({ selectedSign, onSelect }: ZodiacWheelProps) {
  const ringGeometry = useMemo(() => {
    const points = zodiacSigns.map((s) => new THREE.Vector3(...s.position));
    points.push(points[0]);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <group>
      <line>
        <primitive object={ringGeometry} attach="geometry" />
        <lineBasicMaterial color="#7B2FF7" transparent opacity={0.25} />
      </line>

      {zodiacSigns.map((sign) => (
        <ZodiacNode
          key={sign.id}
          sign={sign}
          isSelected={selectedSign?.id === sign.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}
