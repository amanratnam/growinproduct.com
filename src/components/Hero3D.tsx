"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* Endless neon grid floor scrolling toward the camera */
function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  const ref2 = useRef<THREE.GridHelper>(null);

  useFrame((state, delta) => {
    const speed = 2.2;
    [ref, ref2].forEach((r, i) => {
      if (!r.current) return;
      r.current.position.z += delta * speed;
      // two tiles leapfrog each other for an endless floor
      if (r.current.position.z > 20 + i * 0) r.current.position.z -= 40;
    });
  });

  return (
    <>
      <gridHelper ref={ref} args={[40, 40, "#10b981", "#10b981"]} position={[0, -2.6, 0]} material-transparent material-opacity={0.32} />
      <gridHelper ref={ref2} args={[40, 40, "#10b981", "#10b981"]} position={[0, -2.6, -40]} material-transparent material-opacity={0.32} />
    </>
  );
}

/* Neon wireframe shapes drifting above the grid */
function WireShape({
  position,
  geometry,
  scale = 1,
  speed = 1,
  color = "#10b981",
  opacity = 0.6,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus" | "ring";
  scale?: number;
  speed?: number;
  color?: string;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.22;
  });
  return (
    <Float speed={speed * 1.6} rotationIntensity={0.5} floatIntensity={1.8}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.8, 0.26, 10, 30]} />}
        {geometry === "ring" && <torusGeometry args={[1.2, 0.04, 8, 48]} />}
        <meshBasicMaterial wireframe color={color} transparent opacity={opacity} />
      </mesh>
    </Float>
  );
}

/* Horizontal light streaks racing past, Tron light-cycle trails */
function LightStreaks({ count = 14 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 30,
        y: Math.random() * 6 - 2,
        z: -Math.random() * 30 - 4,
        len: Math.random() * 2.5 + 1,
        speed: Math.random() * 10 + 6,
      })),
    [count]
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.position.x += delta * seeds[i].speed;
      if (child.position.x > 18) child.position.x = -18;
    });
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <boxGeometry args={[s.len, 0.03, 0.03]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#34d399" : "#10b981"} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6ee7b7" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* Pointer-reactive camera: shapes and grid sweep with the mouse */
function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2.6, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.6 + pointer.y * 1.4, 0.05);
    camera.lookAt(0, 0, -6);
  });
  return null;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.6, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#050807", 8, 34]} />
        <Rig />
        <GridFloor />
        <LightStreaks />
        <Particles />
        <WireShape geometry="icosahedron" position={[6, 1.8, -4]} scale={1.6} speed={0.7} opacity={0.7} />
        <WireShape geometry="ring" position={[6.2, 1.8, -4]} scale={1.7} speed={0.4} color="#34d399" opacity={0.5} />
        <WireShape geometry="torus" position={[-6.4, 2.6, -6]} scale={1.2} speed={0.5} opacity={0.45} />
        <WireShape geometry="octahedron" position={[7.5, -1.2, -2.5]} scale={0.9} speed={1.1} color="#6ee7b7" opacity={0.6} />
        <WireShape geometry="icosahedron" position={[-7.2, -0.8, -3]} scale={1.0} speed={0.9} opacity={0.55} />
        <WireShape geometry="ring" position={[-3.4, 3.6, -9]} scale={2.2} speed={0.3} color="#10b981" opacity={0.35} />
        <WireShape geometry="octahedron" position={[2.8, 4, -10]} scale={1.5} speed={0.5} color="#34d399" opacity={0.4} />
      </Canvas>
    </div>
  );
}
