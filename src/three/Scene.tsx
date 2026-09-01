import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import StarField from "./StarField";
import Nebula from "./Nebula";
import ZodiacWheel from "./ZodiacWheel";
import CameraRig from "./CameraRig";
import type { ZodiacSign } from "@/types/zodiac";

interface SceneProps {
  selectedSign: ZodiacSign | null;
  onSelectSign: (sign: ZodiacSign) => void;
}

export default function Scene({ selectedSign, onSelectSign }: SceneProps) {
  return (
    <Canvas
      className="r3f-canvas"
      dpr={[1, 1.8]}
      camera={{ position: [0, 4, 14], fov: 50, near: 0.1, far: 200 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#05050F"]} />
      <fog attach="fog" args={["#05050F", 18, 55]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 8, 0]} intensity={40} color="#E8B563" distance={40} />

      <Suspense fallback={null}>
        <Nebula />
        <StarField />
        <ZodiacWheel selectedSign={selectedSign} onSelect={onSelectSign} />
      </Suspense>

      <CameraRig target={selectedSign} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
