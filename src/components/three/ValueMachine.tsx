"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ---------------------------------------------------------------------------
   The hero's perpetual loop, in a soft isometric clay style: parcels of raw
   capital ride a belt into the workshop, and a finished product plus a
   compounding revenue stack come out the other side.

   Deliberately toy-scaled — rounded geometry, matte surfaces, diffuse light
   and soft contact shadows, viewed from a high three-quarter angle. Nothing
   is pure black; the ink is reserved for edges and detail so the scene reads
   light rather than heavy.

   Everything runs off one clock and a normalised 0..1 position along the belt,
   so items can't drift out of sync over a long session.
--------------------------------------------------------------------------- */

const CREAM = "#f2efe9";
const SHELL = "#e6e1d8";
const INK = "#141414";
const ACCENT = "#d81e20";
const BELT = "#d8d3c9";

/* drei is deliberately not used here. Importing anything from its barrel
   evaluates its SoftShadows module, which permanently patches three's
   shadowmap shader chunk with a PCSS implementation that calls
   `unpackRGBAToDepth` — a function three has since removed. Every
   MeshStandardMaterial on the page then fails to compile and the canvas
   renders nothing. three's own RoundedBoxGeometry covers what was needed. */
function RoundedBox({
  args,
  radius = 0.12,
  segments = 5,
  children,
  ...props
}: {
  args: [number, number, number];
  radius?: number;
  segments?: number;
  children?: React.ReactNode;
  /* `args` is ours (the box dimensions), so the mesh's own args is omitted
     rather than intersected — intersecting the two collapses it to never. */
} & Omit<ThreeElements["mesh"], "args" | "geometry" | "children">) {
  const geometry = useMemo(
    () => new RoundedBoxGeometry(args[0], args[1], args[2], segments, radius),
    [args, segments, radius]
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} {...props}>
      {children}
    </mesh>
  );
}

/* Soft ground shadow from a generated radial gradient, rather than drei's
   render-to-texture ContactShadows. Cheaper, and nothing to go stale. */
function GroundShadow({
  position,
  scale = [1, 1],
  opacity = 0.32,
}: {
  position: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(91,83,72,0.85)");
    g.addColorStop(0.55, "rgba(91,83,72,0.28)");
    g.addColorStop(1, "rgba(91,83,72,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={scale} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

const START_X = -4.1;
const END_X = 4.1;
const HUB_X = 0;

function beltT(clock: number, offset: number, speed: number) {
  return (((clock * speed + offset) % 1) + 1) % 1;
}

/* ---------------------------------------------------------------- parcel -- */

/* Capital arriving as a wrapped parcel — the reference's boxes-on-a-conveyor
   beat, restated as budget going in. */
function Parcel({ offset, speed }: { offset: number; speed: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = beltT(clock.elapsedTime, offset, speed);
    const x = START_X + t * (HUB_X - START_X);
    g.position.x = x;

    /* swallowed by the workshop mouth */
    const eaten = THREE.MathUtils.smoothstep(x, HUB_X - 1.5, HUB_X - 0.35);
    const born = THREE.MathUtils.smoothstep(x, START_X, START_X + 0.9);
    const life = born * (1 - eaten);
    g.scale.setScalar(Math.max(life, 0.0001));

    g.position.y = -0.32 + Math.sin(clock.elapsedTime * 1.8 + offset * 7) * 0.045;
    g.rotation.y = 0.36 + Math.sin(clock.elapsedTime * 0.7 + offset * 4) * 0.1;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[0.82, 0.66, 0.82]} radius={0.13} segments={5} castShadow>
        <meshStandardMaterial color={CREAM} roughness={0.85} />
      </RoundedBox>
      {/* strapping, the one bit of accent on the parcel */}
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[0.86, 0.13, 0.2]} />
        <meshStandardMaterial color={ACCENT} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.86, 0.13, 0.2]} />
        <meshStandardMaterial color={ACCENT} roughness={0.7} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------- product -- */

/* What leaves: a small device that assembles itself as it travels. */
function ProductUnit({ offset, speed }: { offset: number; speed: number }) {
  const ref = useRef<THREE.Group>(null);
  const screen = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = beltT(clock.elapsedTime, offset, speed);
    const x = HUB_X + t * (END_X - HUB_X);
    g.position.x = x;

    const born = THREE.MathUtils.smoothstep(x, HUB_X + 0.25, HUB_X + 1.5);
    const gone = 1 - THREE.MathUtils.smoothstep(x, END_X - 1.1, END_X);
    g.scale.setScalar(Math.max(born * gone, 0.0001));

    g.position.y = -0.26 + Math.sin(clock.elapsedTime * 1.5 + offset * 5) * 0.06;
    /* settles upright as it finishes assembling */
    g.rotation.z = (1 - born) * 0.5;
    g.rotation.y = 0.4 + Math.sin(clock.elapsedTime * 0.8 + offset * 3) * 0.14;

    if (screen.current) {
      (screen.current.material as THREE.MeshStandardMaterial).opacity = born;
    }
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[0.62, 0.95, 0.14]} radius={0.07} segments={5} castShadow>
        <meshStandardMaterial color={INK} roughness={0.6} />
      </RoundedBox>
      <mesh ref={screen} position={[0, 0.04, 0.077]}>
        <planeGeometry args={[0.46, 0.66]} />
        <meshStandardMaterial color={CREAM} roughness={0.9} transparent />
      </mesh>
      <mesh position={[-0.06, 0.2, 0.079]}>
        <planeGeometry args={[0.26, 0.06]} />
        <meshStandardMaterial color={ACCENT} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------- revenue -- */

/* Revenue leaves as a stack of coins that grows the further it travels. */
function RevenueStack({ offset, speed }: { offset: number; speed: number }) {
  const ref = useRef<THREE.Group>(null);
  const coins = useRef<THREE.Mesh[]>([]);
  const COUNT = 6;

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = beltT(clock.elapsedTime, offset, speed);
    const x = HUB_X + 0.7 + t * (END_X - HUB_X - 0.7);

    const born = THREE.MathUtils.smoothstep(x, HUB_X + 0.7, HUB_X + 1.7);
    const gone = 1 - THREE.MathUtils.smoothstep(x, END_X - 1.0, END_X);
    const life = born * gone;

    g.position.set(x, -0.72, -1.15);
    g.scale.setScalar(Math.max(life, 0.0001));

    /* coins pop in one by one as the stack compounds along the run */
    coins.current.forEach((c, i) => {
      if (!c) return;
      const share = THREE.MathUtils.smoothstep(t, i / COUNT - 0.08, i / COUNT + 0.12);
      c.scale.setScalar(Math.max(share, 0.0001));
      c.position.y = i * 0.13 * share;
    });
  });

  return (
    <group ref={ref}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) coins.current[i] = el;
          }}
          castShadow
        >
          <cylinderGeometry args={[0.27, 0.27, 0.11, 36]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? ACCENT : CREAM}
            roughness={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------- workshop -- */

/* The structure the belt runs through: a rounded shopfront with an awning,
   directly borrowing the reference's silhouette. */
function Workshop() {
  const body = useRef<THREE.Group>(null);
  const gear = useRef<THREE.Mesh>(null);
  const lamp = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (body.current) body.current.position.y = Math.sin(t * 1.05) * 0.035;
    if (gear.current) gear.current.rotation.z = t * 1.1;
    if (lamp.current) {
      const p = (Math.sin(t * 2.6) + 1) / 2;
      (lamp.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.3 + p * 0.9;
    }
  });

  return (
    <group ref={body}>
      {/* main block */}
      <RoundedBox args={[2.4, 2.3, 1.9]} radius={0.3} segments={6} position={[0, 0.38, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={SHELL} roughness={0.9} />
      </RoundedBox>

      {/* roof cap */}
      <RoundedBox args={[2.0, 0.42, 1.6]} radius={0.16} segments={5} position={[0, 1.62, 0]} castShadow>
        <meshStandardMaterial color={CREAM} roughness={0.85} />
      </RoundedBox>

      {/* striped awning over the output side */}
      <group position={[1.16, 0.62, 0]} rotation={[0, 0, -0.34]}>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[0.22, 0, -0.75 + i * 0.25]} castShadow>
            <boxGeometry args={[0.72, 0.07, 0.25]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? ACCENT : CREAM}
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* intake mouth */}
      <mesh position={[-1.205, -0.15, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.0, 0.82]} />
        <meshStandardMaterial color={INK} roughness={0.95} />
      </mesh>

      {/* window with a turning gear behind it */}
      <mesh position={[0, 0.62, 0.955]}>
        <circleGeometry args={[0.44, 40]} />
        <meshStandardMaterial color={CREAM} roughness={0.95} />
      </mesh>
      <mesh ref={gear} position={[0, 0.62, 0.97]}>
        <torusGeometry args={[0.24, 0.075, 10, 7]} />
        <meshStandardMaterial color={INK} roughness={0.6} />
      </mesh>

      {/* status lamp on the roof */}
      <mesh ref={lamp} position={[0, 1.95, 0]} castShadow>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.6}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------------- scene -- */

/* Keeps the whole belt inside frame regardless of the canvas aspect. The hero
   column is wide on a desktop and close to square on a phone, and a fixed
   camera distance clips the ends of the run at the narrow end. */
function FitCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const perspective = camera as THREE.PerspectiveCamera;
    /* Distance needed to fit SCENE_WIDTH horizontally at this aspect. */
    const SCENE_WIDTH = 9.8;
    const vFov = (perspective.fov * Math.PI) / 180;
    const needed = SCENE_WIDTH / (2 * aspect * Math.tan(vFov / 2));
    /* Hold the isometric direction; only the distance along it changes. */
    const dir = new THREE.Vector3(0.55, 0.41, 0.78).normalize();
    const dist = Math.max(needed, 9);
    camera.position.copy(dir.multiplyScalar(dist));
    camera.lookAt(0, -0.2, 0);
    perspective.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

function Scene({ reduced }: { reduced: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const smoothed = useRef({ x: 0, y: 0 });

  const parcels = useMemo(() => [0, 0.34, 0.67], []);
  const units = useMemo(() => [0.12, 0.5, 0.86], []);
  const stacks = useMemo(() => [0.05, 0.55], []);

  useFrame(({ pointer }) => {
    const g = rig.current;
    if (!g) return;
    smoothed.current.x += (pointer.x - smoothed.current.x) * 0.045;
    smoothed.current.y += (pointer.y - smoothed.current.y) * 0.045;
    /* a small orbit around the isometric rest pose */
    g.rotation.y = -0.5 + smoothed.current.x * 0.14;
    g.rotation.x = smoothed.current.y * -0.06;
  });

  const speed = reduced ? 0 : 0.075;

  return (
    <group ref={rig} position={[0, -0.05, 0]}>
      {/* platform the whole scene sits on */}
      <RoundedBox
        args={[9.6, 0.5, 3.2]}
        radius={0.22}
        segments={5}
        position={[0, -1.12, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={CREAM} roughness={0.95} />
      </RoundedBox>

      {/* the belt itself, inset into the platform */}
      <RoundedBox
        args={[8.9, 0.16, 1.25]}
        radius={0.07}
        segments={4}
        position={[0, -0.83, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={BELT} roughness={0.95} />
      </RoundedBox>

      {/* roller ticks, so the belt reads as moving even between parcels */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} position={[-4.6 + i * 0.62, -0.745, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 1.2, 12]} />
          <meshStandardMaterial color={CREAM} roughness={0.9} />
        </mesh>
      ))}

      <Workshop />

      {parcels.map((o) => (
        <Parcel key={o} offset={o} speed={speed} />
      ))}
      {units.map((o) => (
        <ProductUnit key={o} offset={o} speed={speed} />
      ))}
      {stacks.map((o) => (
        <RevenueStack key={o} offset={o} speed={speed} />
      ))}

      <GroundShadow position={[0, -1.37, 0]} scale={[13, 5.2]} opacity={0.38} />
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
      /* "soft" selects three's own PCFSoftShadowMap. drei's <SoftShadows>
         injects a PCSS shader that calls unpackRGBAToDepth, which three
         removed — it fails to compile and takes every MeshStandardMaterial on
         the page down with it. */
      shadows="soft"
      /* High three-quarter angle with a long lens: reads isometric without
         losing all perspective, which is what gives the reference its
         toy-diorama feel. */
      camera={{ position: [8.6, 6.4, 12.2], fov: 26 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight
        position={[5, 9, 6]}
        intensity={1.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      {/* cool fill from behind, to keep the shadow side from going muddy */}
      <directionalLight position={[-7, 4, -5]} intensity={0.55} color="#dfe4ee" />
      <FitCamera />
      <Scene reduced={reduced} />
    </Canvas>
  );
}
