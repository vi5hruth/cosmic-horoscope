import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vPos;
  uniform float uTime;

  float blob(vec3 p, vec3 center, float scale) {
    float d = distance(normalize(p), normalize(center));
    return smoothstep(scale, 0.0, d);
  }

  void main() {
    vec3 p = normalize(vPos);

    vec3 goldCenter = vec3(sin(uTime * 0.05), 0.3, cos(uTime * 0.05));
    vec3 purpleCenter = vec3(cos(uTime * 0.04), -0.2, sin(uTime * 0.07));

    float goldBlob = blob(p, goldCenter, 0.9) * 0.35;
    float purpleBlob = blob(p, purpleCenter, 1.1) * 0.4;

    vec3 gold = vec3(0.91, 0.71, 0.39) * goldBlob;
    vec3 purple = vec3(0.48, 0.18, 0.97) * purpleBlob;

    vec3 color = gold + purple;
    float alpha = clamp(goldBlob + purpleBlob, 0.0, 0.6);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function Nebula() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh scale={50}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
