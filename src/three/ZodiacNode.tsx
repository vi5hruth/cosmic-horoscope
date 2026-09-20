import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import * as THREE from "three";
import type { ZodiacSign } from "@/types/zodiac";
import { getGlyphTexture } from "./glyphTexture";
import { getElementGradient } from "./elementGradients";

interface ZodiacNodeProps {
  sign: ZodiacSign;
  isSelected: boolean;
  onSelect: (sign: ZodiacSign) => void;
}

const RADIUS = 0.42;
const TICK_COUNT = 16;
const BRACKET_SPAN = 0.32;
const BRACKET_BASES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

export default function ZodiacNode({ sign, isSelected, onSelect }: ZodiacNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const hudMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#FFFFFF", transparent: true, opacity: 0.75, toneMapped: false }),
    [],
  );
  const [hovered, setHovered] = useState(false);

  const glyphTexture = useMemo(() => getGlyphTexture(sign.symbol), [sign.symbol]);
  const gradient = useMemo(() => getElementGradient(sign.element), [sign.element]);
  const showTooltip = hovered || isSelected;

  const ticks = useMemo(() => {
    const arr: { position: [number, number, number]; rotation: [number, number, number] }[] = [];
    for (let i = 0; i < TICK_COUNT; i++) {
      if (i % 4 === 0) continue;
      const a = (i / TICK_COUNT) * Math.PI * 2;
      arr.push({ position: [Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, 0], rotation: [0, 0, a] });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !spinRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = sign.position[1] + Math.sin(t * 0.8 + sign.position[0]) * 0.12;

    const spinSpeed = isSelected ? 0.9 : hovered ? 0.6 : 0.25;
    spinRef.current.rotation.z += delta * spinSpeed;

    const targetScale = isSelected ? 1.5 : hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);

    const targetOpacity = isSelected ? 1 : hovered ? 0.9 : 0.7;
    hudMaterial.opacity = THREE.MathUtils.lerp(hudMaterial.opacity, targetOpacity, 0.1);
    hudMaterial.color.lerp(gradient.rim, isSelected || hovered ? 0.15 : 0);
  });

  return (
    <group
      ref={groupRef}
      position={sign.position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onSelect(sign); }}
    >
      <Billboard>
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[RADIUS * 0.94, 48]} />
          <meshPhysicalMaterial color="#14162b" metalness={0.6} roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.2} transparent opacity={0.6} />
        </mesh>

        <group ref={spinRef}>
          <mesh material={hudMaterial}>
            <ringGeometry args={[RADIUS * 0.97, RADIUS, 64]} />
          </mesh>
          {BRACKET_BASES.map((base) => (
            <mesh key={base} material={hudMaterial}>
              <ringGeometry args={[RADIUS * 0.94, RADIUS * 1.06, 24, 1, base - BRACKET_SPAN / 2, BRACKET_SPAN]} />
            </mesh>
          ))}
          {ticks.map((tick, i) => (
            <mesh key={i} position={tick.position} rotation={tick.rotation} material={hudMaterial}>
              <boxGeometry args={[0.05, 0.012, 0.001]} />
            </mesh>
          ))}
        </group>

        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[RADIUS * 1.15, RADIUS * 1.15]} />
          <meshBasicMaterial map={glyphTexture} transparent alphaTest={0.05} toneMapped={false} />
        </mesh>
      </Billboard>

      <Html center position={[0, 0.85, 0]} style={{ pointerEvents: "none" }} occlude={false}>
        <div className="whitespace-nowrap rounded-full bg-midnight-navy/80 backdrop-blur-sm border border-line-violet px-3 py-1 text-xs font-body text-starlight transition-opacity duration-200" style={{ opacity: showTooltip ? 1 : 0 }}>
          {sign.name}
        </div>
      </Html>
    </group>
  );
}