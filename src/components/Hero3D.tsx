"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function WireShape({
  position,
  geometry,
  scale = 1,
  speed = 1,
  color = "#10b981",
  opacity = 0.5,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus" | "box";
  scale?: number;
  speed?: number;
  color?: string;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.18;
  });

  return (
    <Float speed={speed * 1.4} rotationIntensity={0.4} floatIntensity={1.6}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.8, 0.28, 10, 28]} />}
        {geometry === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        <meshBasicMaterial wireframe color={color} transparent opacity={opacity} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#0a0a0a" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function Rig() {
  useFrame((state) => {
    // gentle camera drift toward the pointer — the 3D parallax layer
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.4, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.8, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Rig />
        <Particles />
        <WireShape geometry="icosahedron" position={[5.4, 1.6, -2]} scale={1.5} speed={0.8} opacity={0.55} />
        <WireShape geometry="torus" position={[-5.8, 2.4, -3]} scale={1.1} speed={0.6} color="#0a0a0a" opacity={0.16} />
        <WireShape geometry="octahedron" position={[6.4, -2.6, -1.5]} scale={0.9} speed={1.1} color="#0a0a0a" opacity={0.18} />
        <WireShape geometry="box" position={[-6.6, -2.2, -2.5]} scale={0.8} speed={0.9} opacity={0.4} />
        <WireShape geometry="icosahedron" position={[-3.2, -3.4, -5]} scale={1.8} speed={0.4} color="#10b981" opacity={0.22} />
        <WireShape geometry="octahedron" position={[2.6, 3.4, -6]} scale={1.4} speed={0.5} color="#10b981" opacity={0.25} />
      </Canvas>
    </div>
  );
}
