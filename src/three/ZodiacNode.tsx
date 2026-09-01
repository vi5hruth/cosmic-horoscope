import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import type { ZodiacSign } from "@/types/zodiac";

interface ZodiacNodeProps {
  sign: ZodiacSign;
  isSelected: boolean;
  onSelect: (sign: ZodiacSign) => void;
}

const glowVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const glowFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform vec3 uColor;
  uniform float uIntensity;

  void main() {
    float fresnel = pow(1.0 - dot(normalize(vNormal), normalize(vViewDir)), 2.5);
    vec3 glow = uColor * fresnel * uIntensity;
    gl_FragColor = vec4(glow, fresnel * 0.9);
  }
`;

export default function ZodiacNode({ sign, isSelected, onSelect }: ZodiacNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const glowMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const color = useMemo(() => new THREE.Color(sign.color), [sign.color]);

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !glowMaterialRef.current) return;

    const t = state.clock.elapsedTime;
    groupRef.current.position.y = sign.position[1] + Math.sin(t * 0.8 + sign.position[0]) * 0.15;
    coreRef.current.rotation.y += delta * 0.3;

    const targetScale = isSelected ? 1.5 : hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);

    const targetIntensity = isSelected ? 2.4 : hovered ? 1.6 : 0.8;
    glowMaterialRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      glowMaterialRef.current.uniforms.uIntensity.value,
      targetIntensity,
      0.1,
    );
  });

  return (
    <group
      ref={groupRef}
      position={sign.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(sign);
      }}
    >
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 0.8 : 0.35}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      <mesh scale={1.6}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <shaderMaterial
          ref={glowMaterialRef}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={{
            uColor: { value: color },
            uIntensity: { value: 0.8 },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>

      <Billboard position={[0, 0.85, 0]}>
        <Text
          fontSize={0.28}
          color={hovered || isSelected ? "#F5F3FF" : "#A8A3C7"}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjornFonQ.woff"
        >
          {`${sign.symbol}  ${sign.name}`}
        </Text>
      </Billboard>
    </group>
  );
}
