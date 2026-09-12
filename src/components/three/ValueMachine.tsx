"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
   The hero's perpetual loop: raw capital feeds into the machine on the left,
   the machine works, and a finished product plus compounding revenue leave on
   the right. Monochrome with a single accent, to match the page.

   Everything is driven off one clock and a normalised 0..1 position along the
   belt, so nothing can drift out of sync over long sessions.
--------------------------------------------------------------------------- */

const INK = "#0a0a0a";
const RULE = "#d9d9d9";
const ACCENT = "#d81e20";

/* Belt runs left to right through the machine at the origin. Kept inside the
   camera frustum at the narrowest aspect the hero column reaches, so nothing
   is ever clipped by the canvas edge. */
const START_X = -3.7;
const END_X = 3.7;
const MACHINE_X = 0;

/** Position along the belt, wrapped to 0..1, offset per item so they queue. */
function beltT(clock: number, offset: number, speed: number) {
  return (((clock * speed + offset) % 1) + 1) % 1;
}

/* ------------------------------------------------------------------ coin -- */

function Coin({ offset, speed }: { offset: number; speed: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = beltT(clock.elapsedTime, offset, speed);

    /* Coins only exist on the intake half; they're consumed by the machine. */
    const x = START_X + t * (MACHINE_X - START_X) * 2;
    g.position.x = x;

    /* Fade and shrink as the machine swallows them. */
    const eaten = THREE.MathUtils.smoothstep(x, MACHINE_X - 1.1, MACHINE_X - 0.15);
    const s = 1 - eaten;
    g.scale.setScalar(Math.max(s, 0.0001));
    g.visible = x < MACHINE_X - 0.1;

    /* Tumble, plus a gentle bob so the line doesn't read as a rigid ruler. */
    g.rotation.y = clock.elapsedTime * 2.2 + offset * 8;
    g.position.y = -0.55 + Math.sin(clock.elapsedTime * 2 + offset * 6) * 0.07;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.08, 40]} />
        <meshStandardMaterial color={INK} roughness={0.35} metalness={0.15} />
      </mesh>
      {/* inset face ring, reads as a coin edge rather than a puck */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.045]}>
        <torusGeometry args={[0.19, 0.022, 10, 40]} />
        <meshStandardMaterial color={ACCENT} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------------- shard -- */

/* Finished product: a small stack of panels that assembles as it leaves. */
function ProductUnit({ offset, speed }: { offset: number; speed: number }) {
  const ref = useRef<THREE.Group>(null);
  const panels = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = beltT(clock.elapsedTime, offset, speed);
    const x = MACHINE_X + t * (END_X - MACHINE_X);
    g.position.x = x;

    /* Assemble just after leaving the machine, dissolve at the far edge. */
    const born = THREE.MathUtils.smoothstep(x, MACHINE_X + 0.1, MACHINE_X + 1.4);
    const gone = 1 - THREE.MathUtils.smoothstep(x, END_X - 1.2, END_X);
    g.scale.setScalar(Math.max(born * gone, 0.0001));
    g.position.y = -0.5 + Math.sin(clock.elapsedTime * 1.6 + offset * 5) * 0.08;
    g.rotation.y = -0.45 + Math.sin(clock.elapsedTime * 0.9 + offset * 3) * 0.18;

    /* Panels slide into register as the unit assembles. */
    panels.current.forEach((p, i) => {
      if (!p) return;
      p.position.z = (1 - born) * (i - 1) * 0.9;
      p.position.y = i * 0.16;
    });
  });

  return (
    <group ref={ref}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) panels.current[i] = el;
          }}
          castShadow
        >
          <boxGeometry args={[0.78 - i * 0.1, 0.05, 0.52 - i * 0.06]} />
          <meshStandardMaterial
            color={i === 2 ? ACCENT : INK}
            roughness={0.45}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

/* --------------------------------------------------------------- revenue -- */

/* Revenue leaves as a rising bar that grows the further it travels. */
function RevenueBar({ offset, speed }: { offset: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = beltT(clock.elapsedTime, offset, speed);
    const x = MACHINE_X + 0.6 + t * (END_X - MACHINE_X - 0.6);

    const born = THREE.MathUtils.smoothstep(x, MACHINE_X + 0.6, MACHINE_X + 1.6);
    const gone = 1 - THREE.MathUtils.smoothstep(x, END_X - 1.0, END_X);
    const life = born * gone;

    /* Height compounds along the run — the "and revenue comes out" beat. */
    const h = 0.25 + t * 1.9;
    m.scale.set(life, Math.max(h * life, 0.0001), life);
    m.position.set(x, -0.75 + (h * life) / 2, -0.95);
  });

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.2, 1, 0.2]} />
      <meshStandardMaterial color={ACCENT} roughness={0.5} />
    </mesh>
  );
}

/* --------------------------------------------------------------- machine -- */

function Machine() {
  const shell = useRef<THREE.Group>(null);
  const rotorA = useRef<THREE.Mesh>(null);
  const rotorB = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    /* Breathe, so the machine never looks frozen between items. */
    if (shell.current) {
      shell.current.position.y = Math.sin(t * 1.1) * 0.04;
      shell.current.rotation.y = Math.sin(t * 0.4) * 0.06;
    }
    if (rotorA.current) rotorA.current.rotation.z = t * 1.6;
    if (rotorB.current) rotorB.current.rotation.z = -t * 2.1;
    if (pulse.current) {
      const p = (Math.sin(t * 3) + 1) / 2;
      (pulse.current.material as THREE.MeshStandardMaterial).opacity = 0.25 + p * 0.55;
      pulse.current.scale.setScalar(0.9 + p * 0.18);
    }
  });

  return (
    <group ref={shell}>
      {/* body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.8, 1.3]} />
        <meshStandardMaterial color={INK} roughness={0.5} metalness={0.08} />
      </mesh>

      {/* intake mouth */}
      <mesh position={[-0.91, -0.42, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.9, 0.6]} />
        <meshStandardMaterial color={ACCENT} roughness={0.6} />
      </mesh>

      {/* window onto the working parts */}
      <mesh position={[0, 0.15, 0.66]}>
        <planeGeometry args={[1.15, 0.82]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh ref={rotorA} position={[-0.26, 0.15, 0.68]}>
        <torusGeometry args={[0.26, 0.055, 8, 6]} />
        <meshStandardMaterial color={INK} roughness={0.4} />
      </mesh>
      <mesh ref={rotorB} position={[0.27, 0.05, 0.68]}>
        <torusGeometry args={[0.19, 0.05, 8, 6]} />
        <meshStandardMaterial color={ACCENT} roughness={0.4} />
      </mesh>

      {/* status lamp */}
      <mesh ref={pulse} position={[0, 0.98, 0.28]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color={ACCENT} transparent opacity={0.6} />
      </mesh>

      {/* output chute */}
      <mesh position={[0.91, -0.42, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.9, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ belt -- */

function Belt(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[8.6, 0.06, 1.0]} />
      <meshStandardMaterial color={RULE} roughness={0.9} />
    </mesh>
  );
}

/* ----------------------------------------------------------------- scene -- */

function Scene({ reduced }: { reduced: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const coins = useMemo(() => [0, 0.25, 0.5, 0.75], []);
  const units = useMemo(() => [0.1, 0.45, 0.8], []);
  const bars = useMemo(() => [0, 0.33, 0.66], []);

  useFrame(({ pointer: p }) => {
    const g = rig.current;
    if (!g) return;
    /* Light parallax so the scene feels dimensional under the cursor. */
    pointer.current.x += (p.x - pointer.current.x) * 0.05;
    pointer.current.y += (p.y - pointer.current.y) * 0.05;
    g.rotation.y = -0.3 + pointer.current.x * 0.16;
    g.rotation.x = 0.16 - pointer.current.y * 0.1;
  });

  const speed = reduced ? 0 : 0.085;

  return (
    <group ref={rig} position={[0, 0.3, 0]}>
      <Belt position={[0, -0.85, 0]} />
      <Machine />
      {coins.map((o) => (
        <Coin key={o} offset={o} speed={speed} />
      ))}
      {units.map((o) => (
        <ProductUnit key={o} offset={o} speed={speed} />
      ))}
      {bars.map((o) => (
        <RevenueBar key={o} offset={o} speed={speed} />
      ))}

      {/* ground plane catches the contact shadow and grounds the machine */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
        <planeGeometry args={[26, 14]} />
        <shadowMaterial opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function ValueMachine() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      camera={{ position: [0, 1.15, 10.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      /* Pause entirely when scrolled away; this sits in a tall hero and would
         otherwise burn a frame budget the whole way down the page. */
      frameloop={reduced ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.45} />
      <Scene reduced={reduced} />
    </Canvas>
  );
}
