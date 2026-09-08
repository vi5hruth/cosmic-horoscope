import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import type { ZodiacSign } from "@/types/zodiac";

interface CameraRigProps {
  target: ZodiacSign | null;
}

export default function CameraRig({ target }: CameraRigProps) {
  const controlsRef = useRef<CameraControls>(null);
  const { camera } = useThree();

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const proxy = { progress: 0 };

    const startPos = camera.position.clone();
    const startTarget = new THREE.Vector3();
    controls.getTarget(startTarget);

    let endPos: THREE.Vector3;
    let endTarget: THREE.Vector3;

    if (target) {
      const nodePos = new THREE.Vector3(...target.position);
      const dir = nodePos.clone().normalize();
      endPos = nodePos.clone().add(dir.multiplyScalar(2.2)).setY(nodePos.y + 0.6);
      endTarget = nodePos;
    } else {
      endPos = new THREE.Vector3(0, 4, 14);
      endTarget = new THREE.Vector3(0, 0, 0);
    }

    const tween = gsap.to(proxy, {
      progress: 1,
      duration: 1.4,
      ease: "power3.inOut",
      onUpdate: () => {
        const pos = startPos.clone().lerp(endPos, proxy.progress);
        const tgt = startTarget.clone().lerp(endTarget, proxy.progress);
        controls.setLookAt(pos.x, pos.y, pos.z, tgt.x, tgt.y, tgt.z, false);
      },
    });

    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      minDistance={3}
      maxDistance={22}
      dollyToCursor={false}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI - Math.PI / 6}
    />
  );
}
