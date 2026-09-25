import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { useMotionPref } from "./MotionPref";

/* ─────────────────────────────────────────────────────────────────────────────
 * Fixed material profiles (HDRI = apartment).
 * The previous live-tuning panel has been removed for a clean moncy.dev feel.
 * ─────────────────────────────────────────────────────────────────────────── */

const HDRI_PRESET = "apartment" as const;
const HDRI_INTENSITY = 0.85;

const FUR = {
  roughness: 0.7,
  clearcoat: 0.12,
  clearcoatRoughness: 0.55,
  sheen: 1.0,
  sheenRoughness: 0.45,
  sheenColor: "#b39bff",
  envMapIntensity: 0.85,
};

const METAL = {
  color: "#1a1a22",
  metalness: 0.95,
  roughness: 0.22,
  envMapIntensity: 1.3,
};

const GLASS = {
  tint: "#ffffff",
  roughness: 0.04,
  transmission: 0.98,
  thickness: 0.04,
  ior: 1.5,
  envMapIntensity: 1.2,
};

/* ─── Glasses tuning model ───────────────────────────────────────────────── */

export type GlassesTuning = {
  scale: number;        // overall multiplier (responsive)
  lensRadius: number;
  ovalY: number;
  eyeSpacing: number;   // half-distance between lens centers (cx)
  tube: number;
  tilt: number;         // X-axis tilt, radians
  templeAngle: number;  // Y rotation at hinge
  templeLength: number;
  yOffset: number;
  zOffset: number;
};

const GLASSES_DEFAULT: GlassesTuning = {
  scale: 1,
  lensRadius: 0.09,
  ovalY: 0.88,
  eyeSpacing: 0.105,
  tube: 0.008,
  tilt: -0.05,
  templeAngle: 0.35,
  templeLength: 0.28,
  yOffset: 0.02,
  zOffset: 0.295,
};

/** Responsive base scale based on canvas width (px). */
function autoScaleFor(width: number) {
  if (width < 480) return 0.85;
  if (width < 768) return 0.92;
  if (width < 1280) return 1.0;
  return 1.05;
}

const VIEWPORT_PRESETS: Array<{ label: string; width: number }> = [
  { label: "Mobile", width: 390 },
  { label: "Tablet", width: 768 },
  { label: "Desktop", width: 1280 },
  { label: "Wide", width: 1600 },
];

/* ─── Public API ─────────────────────────────────────────────────────────── */

export function Scene3D({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const { reduced } = useMotionPref();

  // Glasses tuning state — overrides defaults, lives only at runtime.
  const [glasses, setGlasses] = useState<GlassesTuning>(GLASSES_DEFAULT);
  const [scaleOverride, setScaleOverride] = useState<number | null>(null);

  // Wrapper ref — used by the comparison capture to grab the live canvas.
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Show tuner via ?glasses=tune query string OR pressing "g".
  const [tunerOpen, setTunerOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.search.includes("glasses=tune")) setTunerOpen(true);
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "g") setTunerOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      setWebglAvailable(Boolean(document.createElement("canvas").getContext("webgl2")));
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  if (!mounted || !webglAvailable) {
    return (
      <div
        className={`${className ?? "absolute inset-0"} bg-[radial-gradient(circle_at_60%_55%,#342349_0%,#0d0a18_70%)]`}
        aria-hidden
      />
    );
  }

  return (
    <div ref={wrapperRef} className={className ?? "absolute inset-0"}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        shadows
        className="!absolute inset-0"
      >
        <color attach="background" args={["#0d0a18"]} />
        <fog attach="fog" args={["#0d0a18", 7, 24]} />
        <PerspectiveCamera makeDefault position={[0, 1.4, 5.5]} fov={34} />

        <Suspense fallback={null}>
          <SceneContent reduced={reduced} glasses={glasses} scaleOverride={scaleOverride} />
          <Environment preset={HDRI_PRESET} environmentIntensity={HDRI_INTENSITY} />
        </Suspense>

        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.78}
          scale={10}
          blur={1.8}
          far={3.2}
          resolution={1024}
          color="#05030a"
        />
        <ContactShadows
          position={[0, -1.045, 0]}
          opacity={0.45}
          scale={4.5}
          blur={0.6}
          far={1.2}
          resolution={1024}
          color="#000000"
        />
      </Canvas>
      {tunerOpen && (
        <GlassesTuner
          value={glasses}
          scaleOverride={scaleOverride}
          onChange={setGlasses}
          onScaleOverride={setScaleOverride}
          onClose={() => setTunerOpen(false)}
          getCanvas={() =>
            wrapperRef.current?.querySelector("canvas") ?? null
          }
        />
      )}
    </div>
  );
}

/* ─── Scene root ─────────────────────────────────────────────────────────── */

function SceneContent({
  reduced,
  glasses,
  scaleOverride,
}: {
  reduced: boolean;
  glasses: GlassesTuning;
  scaleOverride: number | null;
}) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const intro = useRef(0); // 0 → 1 over ~1.2s on mount
  const { camera } = useThree();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = Math.max(window.innerHeight * 1.2, 1);
      scrollY.current = Math.min(window.scrollY / max, 1);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // intro dolly: from far/up to settle
    intro.current = Math.min(1, intro.current + dt * 0.9);
    const introE = easeOutCubic(intro.current);

    if (reduced) {
      group.current.rotation.set(0, -0.1, 0);
      camera.position.set(0, 1.4, 5.5);
      camera.lookAt(0, 0.3, 0);
      return;
    }

    // mouse parallax on the whole rig
    const targetRotY = mouse.current.x * 0.22;
    const targetRotX = mouse.current.y * 0.08;
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.06;

    // 3-phase scroll camera
    const s = scrollY.current;
    const p1 = THREE.MathUtils.clamp(s / 0.3, 0, 1); // dolly in
    const p2 = THREE.MathUtils.clamp((s - 0.3) / 0.4, 0, 1); // orbit
    const p3 = THREE.MathUtils.clamp((s - 0.7) / 0.3, 0, 1); // lift away

    const introZ = THREE.MathUtils.lerp(8.5, 5.5, introE);
    const introY = THREE.MathUtils.lerp(3.2, 1.4, introE);

    const baseZ = introZ - p1 * 0.9 + p3 * 1.8;
    const baseY = introY + p2 * 0.2 + p3 * 1.2;
    const baseX = Math.sin(p2 * Math.PI) * 1.1 + mouse.current.x * 0.3;

    camera.position.x += (baseX - camera.position.x) * 0.05;
    camera.position.y += (baseY + Math.sin(t * 0.5) * 0.03 - camera.position.y) * 0.05;
    camera.position.z += (baseZ - camera.position.z) * 0.05;

    const lookY = 0.35 - p3 * 0.3;
    const lookZ = -p2 * 0.6;
    camera.lookAt(0, lookY, lookZ);
  });

  return (
    <group ref={group}>
      {/* Key violet light */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.15}
        color="#c9b8ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
        shadow-normal-bias={0.02}
      />
      <directionalLight position={[-4, 2.5, -3.5]} intensity={1.1} color="#ffb07a" />
      <directionalLight position={[-2, 4, 2]} intensity={0.25} color="#8aa7ff" />
      <ambientLight intensity={0.22} />
      <pointLight position={[0, 1.4, 1.2]} intensity={0.35} color="#7c66ff" distance={4} decay={2} />

      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#120e22" roughness={0.9} metalness={0.05} />
      </mesh>

      <Desk />
      <Laptop reduced={reduced} />
      <Cat reducedMotion={reduced} glasses={glasses} scaleOverride={scaleOverride} />
      <Mug position={[0.62, -0.18, 0.95]} />
      <DeskLamp position={[-1.7, -0.49, -0.6]} />
      <Books position={[-1.05, -0.43, 0.55]} />
      <Plant position={[-1.78, -0.43, 0.55]} />
      <DigitalClock position={[-1.15, -0.42, -0.45]} />

      <BackgroundCodeField />

      <Sparkles
        count={50}
        scale={[10, 5, 5]}
        size={2}
        speed={0.3}
        color="#b39bff"
        position={[0, 1, -1]}
      />
    </group>
  );
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

/* ─── Desk / Laptop / Mug ────────────────────────────────────────────────── */

function Desk() {
  return (
    <group position={[0, -0.55, 0]}>
      <RoundedBox args={[4.6, 0.12, 1.9]} radius={0.04} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2238" roughness={0.55} metalness={0.15} />
      </RoundedBox>
      {[
        [-2.1, -0.4, 0.75],
        [2.1, -0.4, 0.75],
        [-2.1, -0.4, -0.75],
        [2.1, -0.4, -0.75],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#1a1428" />
        </mesh>
      ))}
    </group>
  );
}

const TERMINAL_POOL: Array<{ kind: "prompt" | "out" | "ok" | "warn" | "info"; text: string }> = [
  { kind: "prompt", text: "pnpm dev" },
  { kind: "info", text: "▲ ready - started server on 0.0.0.0:5173" },
  { kind: "ok", text: "✓ compiled successfully in 1.2s" },
  { kind: "out", text: "> training model · epoch 12/40 · loss 0.184" },
  { kind: "prompt", text: "git status" },
  { kind: "out", text: "   modified: src/components/portfolio/Scene3D.tsx" },
  { kind: "out", text: "   modified: src/routes/index.tsx" },
  { kind: "prompt", text: "npm test" },
  { kind: "ok", text: "PASS  src/lib/utils.test.ts (4 tests)" },
  { kind: "info", text: "[ai] tokenizing batch (256)…" },
  { kind: "info", text: "[ws] client connected · id=8f2a" },
  { kind: "prompt", text: "tail -f logs/codlean.log" },
  { kind: "out", text: "[mes] twin sync · 142 nodes · 38ms" },
  { kind: "ok", text: "✓ inference 18ms · conf 0.94" },
  { kind: "warn", text: "! retrying upstream (2/3)" },
  { kind: "prompt", text: "docker compose up -d" },
  { kind: "out", text: "Creating network codlean_default … done" },
  { kind: "prompt", text: "python train.py --gpu 0" },
  { kind: "out", text: "loaded 12.4k samples · device=cuda:0" },
  { kind: "info", text: "[ai] eval acc 0.962 · f1 0.948" },
];

function Laptop({ reduced }: { reduced: boolean }) {
  const screenRef = useRef<THREE.MeshStandardMaterial>(null);

  const { texture, ctx, canvas, state } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return {
      texture,
      ctx,
      canvas,
      state: {
        lines: [] as Array<{ kind: string; text: string }>,
        lastAdd: 0,
        cursor: true,
        cursorAt: 0,
      },
    };
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  const draw = () => {
    const W = canvas.width;
    const H = canvas.height;
    ctx.fillStyle = "#0b0820";
    ctx.fillRect(0, 0, W, H);

    // title bar
    ctx.fillStyle = "#1a1633";
    ctx.fillRect(0, 0, W, 22);
    ctx.fillStyle = "#ff6b7a";
    ctx.beginPath(); ctx.arc(12, 11, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f5c451";
    ctx.beginPath(); ctx.arc(26, 11, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#65d68a";
    ctx.beginPath(); ctx.arc(40, 11, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#9b95b5";
    ctx.font = '11px "JetBrains Mono", ui-monospace, monospace';
    ctx.textBaseline = "middle";
    ctx.fillText("~/projects/rumeysa — zsh — 80×24", 60, 11);

    // lines
    ctx.font = '13px "JetBrains Mono", ui-monospace, monospace';
    ctx.textBaseline = "top";
    const padX = 14;
    let y = 30;
    const lh = 16;
    for (const line of state.lines) {
      if (line.kind === "prompt") {
        ctx.fillStyle = "#7c66ff";
        ctx.fillText("$", padX, y);
        ctx.fillStyle = "#e8e3ff";
        ctx.fillText(line.text, padX + 14, y);
      } else if (line.kind === "ok") {
        ctx.fillStyle = "#9dffd2";
        ctx.fillText(line.text, padX, y);
      } else if (line.kind === "warn") {
        ctx.fillStyle = "#f5c451";
        ctx.fillText(line.text, padX, y);
      } else if (line.kind === "info") {
        ctx.fillStyle = "#8aa7ff";
        ctx.fillText(line.text, padX, y);
      } else {
        ctx.fillStyle = "#cfc6dc";
        ctx.fillText(line.text, padX, y);
      }
      y += lh;
    }

    // blinking cursor
    if (state.cursor) {
      ctx.fillStyle = "#9dffd2";
      ctx.fillRect(padX, y + 2, 8, 12);
    }

    texture.needsUpdate = true;
  };

  // seed
  useEffect(() => {
    state.lines = [
      { kind: "prompt", text: "pnpm dev" },
      { kind: "info", text: "▲ ready - started server on 0.0.0.0:5173" },
      { kind: "ok", text: "✓ compiled successfully in 1.2s" },
    ];
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const interval = reduced ? 1.4 : 0.45;
    if (t - state.lastAdd > interval) {
      state.lastAdd = t;
      const next = TERMINAL_POOL[Math.floor(Math.random() * TERMINAL_POOL.length)];
      state.lines.push(next);
      const maxLines = 16;
      if (state.lines.length > maxLines) state.lines.splice(0, state.lines.length - maxLines);
    }
    const blink = Math.floor(t * 2) % 2 === 0;
    if (blink !== state.cursor) {
      state.cursor = blink;
    }
    draw();

    if (!screenRef.current) return;
    const flicker = reduced ? 1 : 1 + Math.sin(t * 6) * 0.05;
    screenRef.current.emissiveIntensity = 0.55 * flicker;
  });

  return (
    <group position={[1.15, -0.42, 0.25]} rotation={[0, -0.35, 0]}>
      <RoundedBox args={[1.5, 0.06, 1]} radius={0.02} smoothness={3} castShadow>
        <meshStandardMaterial
          color="#9a9aa8"
          metalness={METAL.metalness}
          roughness={Math.max(METAL.roughness + 0.08, 0.12)}
          envMapIntensity={METAL.envMapIntensity}
        />
      </RoundedBox>
      <group position={[0, 0.45, -0.48]} rotation={[-0.18, 0, 0]}>
        <RoundedBox args={[1.5, 0.9, 0.04]} radius={0.02} smoothness={3} castShadow>
          <meshStandardMaterial
            color="#9a9aa8"
            metalness={METAL.metalness}
            roughness={Math.max(METAL.roughness + 0.08, 0.12)}
            envMapIntensity={METAL.envMapIntensity}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.38, 0.78]} />
          <meshStandardMaterial
            ref={screenRef}
            map={texture}
            emissive="#7c66ff"
            emissiveMap={texture}
            emissiveIntensity={0.55}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function Mug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.13, 0.11, 0.28, 24]} />
        <meshStandardMaterial color="#e85d6f" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.115, 0.115, 0.02, 24]} />
        <meshStandardMaterial color="#3a2418" roughness={0.8} emissive="#1a0f08" />
      </mesh>
      <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.085, 0.018, 10, 24, Math.PI]} />
        <meshStandardMaterial color="#e85d6f" roughness={0.4} />
      </mesh>
      <Float speed={2} floatIntensity={0.4} rotationIntensity={0}>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.25} />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── Classic banker desk lamp ───────────────────────────────────────────── */

function DeskLamp({ position }: { position: [number, number, number] }) {
  const spotRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (spotRef.current && targetRef.current) {
      spotRef.current.target = targetRef.current;
      targetRef.current.updateMatrixWorld();
    }
  }, []);

  return (
    <group position={position}>
      {/* Disk base */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.04, 32]} />
        <meshStandardMaterial color="#1a1428" metalness={0.45} roughness={0.45} />
      </mesh>
      {/* Vertical pole */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.022, 0.66, 16]} />
        <meshStandardMaterial color="#2a2238" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Joint ball — violet accent */}
      <mesh position={[0, 0.68, 0]} castShadow>
        <sphereGeometry args={[0.038, 18, 18]} />
        <meshStandardMaterial
          color="#7c66ff"
          metalness={0.85}
          roughness={0.25}
          emissive="#7c66ff"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Forward-curved arm — tilts toward desk (+Z) */}
      <mesh position={[0, 0.74, 0.18]} rotation={[Math.PI / 2 - 0.35, 0, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.36, 16]} />
        <meshStandardMaterial color="#2a2238" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Shade head — points straight down toward the desk */}
      <group position={[0, 0.62, 0.4]}>
        {/* Cone shade (wider at bottom, open) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.10, 0.18, 0.18, 32, 1, true]} />
          <meshPhysicalMaterial
            color="#3a2a78"
            metalness={0.35}
            roughness={0.3}
            clearcoat={0.7}
            clearcoatRoughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Inner glow lip — mint highlight */}
        <mesh position={[0, -0.088, 0]}>
          <torusGeometry args={[0.175, 0.006, 10, 32]} />
          <meshStandardMaterial
            color="#9dffd2"
            emissive="#9dffd2"
            emissiveIntensity={0.4}
            toneMapped={false}
          />
        </mesh>
        {/* Brass ring — violet glow */}
        <mesh position={[0, 0.085, 0]}>
          <torusGeometry args={[0.105, 0.008, 10, 28]} />
          <meshStandardMaterial color="#b6a8ff" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Bulb */}
        <mesh position={[0, -0.04, 0]}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshStandardMaterial
            color="#fff4dd"
            emissive="#cbb6ff"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Spot target — directly below bulb, at desk-top height */}
        <object3D ref={targetRef} position={[0, -0.6, 0]} />

        {/* Physical spot light — illuminates the desk */}
        <spotLight
          ref={spotRef}
          position={[0, -0.05, 0]}
          angle={0.55}
          penumbra={0.55}
          intensity={6}
          distance={2.8}
          decay={2}
          color="#d9c8ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0008}
          shadow-normal-bias={0.02}
        />
      </group>
    </group>
  );
}

/* ─── Cat ────────────────────────────────────────────────────────────────── */

/* ─── Books / Plant / DigitalClock decor ─────────────────────────────────── */

type Vec3 = [number, number, number];

function Books({ position }: { position: Vec3 }) {
  const closed: Array<{ y: number; rotY: number; rotX: number; color: string }> = [
    { y: 0.025, rotY: 0.02, rotX: -0.02, color: "#7c66ff" },
    { y: 0.075, rotY: -0.10, rotX: 0, color: "#1a1428" },
  ];
  return (
    <group position={position} rotation={[0, 0.32, 0]}>
      {/* Two stacked closed books */}
      {closed.map((v, i) => (
        <group key={i} position={[0, v.y, 0]} rotation={[v.rotX, v.rotY, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.05, 0.28]} />
            <meshStandardMaterial color={v.color} roughness={0.55} metalness={0.05} />
          </mesh>
          {/* page edges on the front (toward camera, +Z) */}
          <mesh position={[0, 0, 0.141]} castShadow>
            <boxGeometry args={[0.4, 0.038, 0.004]} />
            <meshStandardMaterial color="#e8e2d0" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Open book on top, facing camera, ready to read */}
      <group position={[0, 0.145, 0.03]} rotation={[-0.35, -0.08, 0]}>
        {/* spine */}
        <mesh position={[0, 0.002, 0]} castShadow>
          <boxGeometry args={[0.006, 0.014, 0.24]} />
          <meshStandardMaterial color="#b39bff" roughness={0.5} metalness={0.15} />
        </mesh>
        {/* left page */}
        <group position={[-0.001, 0, 0]} rotation={[0, 0, 0.22]}>
          <mesh position={[-0.095, -0.002, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.19, 0.004, 0.24]} />
            <meshStandardMaterial color="#f3eedf" roughness={0.95} />
          </mesh>
          {/* text lines */}
          {[-0.06, -0.02, 0.02, 0.06].map((z, i) => (
            <mesh key={i} position={[-0.095, 0.0015, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.13, 0.005]} />
              <meshStandardMaterial color="#9b8fb8" roughness={1} />
            </mesh>
          ))}
        </group>
        {/* right page */}
        <group position={[0.001, 0, 0]} rotation={[0, 0, -0.22]}>
          <mesh position={[0.095, -0.002, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.19, 0.004, 0.24]} />
            <meshStandardMaterial color="#f3eedf" roughness={0.95} />
          </mesh>
          {[-0.06, -0.02, 0.02, 0.06].map((z, i) => (
            <mesh key={i} position={[0.095, 0.0015, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.13, 0.005]} />
              <meshStandardMaterial color="#9b8fb8" roughness={1} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

function Plant({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* pot body */}
      <mesh castShadow receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.11, 0.085, 0.16, 24]} />
        <meshStandardMaterial color="#3a2a78" roughness={0.55} metalness={0.1} />
      </mesh>
      {/* rim */}
      <mesh castShadow position={[0, 0.162, 0]}>
        <torusGeometry args={[0.108, 0.012, 10, 32]} />
        <meshStandardMaterial color="#b39bff" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* soil */}
      <mesh position={[0, 0.158, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.012, 24]} />
        <meshStandardMaterial color="#1a1428" roughness={1} />
      </mesh>
      {/* English ivy — central short stem + 3 trailing branches with green leaves */}
      {/* central stem */}
      <mesh position={[0, 0.21, 0]} castShadow>
        <cylinderGeometry args={[0.005, 0.006, 0.09, 8]} />
        <meshStandardMaterial color="#3a5a2a" roughness={0.9} />
      </mesh>
      {(() => {
        const greens = ["#3f8a4a", "#5fb86b", "#8fd99a"];
        const branches: Array<{ rotY: number; rotZ: number }> = [
          { rotY: 0.0, rotZ: 0.7 },
          { rotY: (Math.PI * 2) / 3, rotZ: 0.65 },
          { rotY: -(Math.PI * 2) / 3, rotZ: 0.75 },
        ];
        return branches.map((b, bi) => (
          <group key={bi} position={[0, 0.235, 0]} rotation={[0, b.rotY, 0]}>
            {/* drooping branch */}
            <group rotation={[0, 0, b.rotZ]}>
              <mesh position={[0.09, 0, 0]} rotation={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.0035, 0.0045, 0.2, 6]} />
                <meshStandardMaterial color="#3a5a2a" roughness={0.9} />
              </mesh>
              {/* leaves spread along the branch */}
              {[0.02, 0.06, 0.1, 0.14, 0.18].map((d, li) => {
                const side = li % 2 === 0 ? 1 : -1;
                const color = greens[(bi + li) % greens.length];
                const size = 0.028 + ((li * 7) % 4) * 0.004;
                return (
                  <mesh
                    key={li}
                    position={[d, 0.005, side * 0.018]}
                    rotation={[side * 0.3, li * 0.4, side * 0.2]}
                    scale={[1.3, 0.45, 1]}
                    castShadow
                  >
                    <icosahedronGeometry args={[size, 0]} />
                    <meshStandardMaterial color={color} roughness={0.65} metalness={0.02} />
                  </mesh>
                );
              })}
            </group>
          </group>
        ));
      })()}
      {/* a few leaves near the top of the central stem */}
      {[
        { p: [0.02, 0.255, 0.015] as Vec3, c: "#5fb86b" },
        { p: [-0.02, 0.25, -0.012] as Vec3, c: "#3f8a4a" },
        { p: [0.005, 0.265, -0.02] as Vec3, c: "#8fd99a" },
      ].map((l, i) => (
        <mesh
          key={`top-${i}`}
          position={l.p}
          rotation={[0.2, i * 0.7, 0.1]}
          scale={[1.3, 0.45, 1]}
          castShadow
        >
          <icosahedronGeometry args={[0.032, 0]} />
          <meshStandardMaterial color={l.c} roughness={0.65} />
        </mesh>
      ))}
    </group>
  );
}

function DigitalClock({ position }: { position: Vec3 }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const hh = now ? pad(now.getHours()) : "--";
  const mm = now ? pad(now.getMinutes()) : "--";
  const ss = now ? pad(now.getSeconds()) : "--";
  const colon = now ? (now.getSeconds() % 2 === 0 ? ":" : " ") : ":";

  return (
    <group position={position} rotation={[-0.12, 0.15, 0]}>
      {/* body */}
      <RoundedBox args={[0.42, 0.2, 0.1]} radius={0.018} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2238" roughness={0.5} metalness={0.25} />
      </RoundedBox>
      {/* base trim */}
      <mesh position={[0, -0.105, 0]} castShadow>
        <boxGeometry args={[0.44, 0.012, 0.11]} />
        <meshStandardMaterial color="#1a1428" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* recessed screen */}
      <mesh position={[0, 0.005, 0.0505]}>
        <planeGeometry args={[0.36, 0.14]} />
        <meshStandardMaterial color="#0a0612" roughness={0.25} metalness={0.4} />
      </mesh>
      {/* time HH:MM */}
      <Text
        position={[0, 0.018, 0.052]}
        fontSize={0.075}
        color="#9dffd2"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
        outlineWidth={0}
        material-toneMapped={false}
      >
        {`${hh}${colon}${mm}`}
      </Text>
      {/* seconds */}
      <Text
        position={[0.13, -0.04, 0.052]}
        fontSize={0.032}
        color="#b39bff"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.05}
        material-toneMapped={false}
      >
        {ss}
      </Text>
      {/* small label */}
      <Text
        position={[-0.13, -0.04, 0.052]}
        fontSize={0.022}
        color="#7c66ff"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.12}
        material-toneMapped={false}
      >
        LIVE
      </Text>
    </group>
  );
}

function Cat({
  reducedMotion,
  glasses,
  scaleOverride,
}: {
  reducedMotion: boolean;
  glasses: GlassesTuning;
  scaleOverride: number | null;
}) {
  const { size } = useThree();
  const autoScale = useMemo(() => autoScaleFor(size.width), [size.width]);
  const effectiveScale =
    scaleOverride != null ? scaleOverride : glasses.scale * autoScale;
  const glassesProps: GlassesTuning = { ...glasses, scale: effectiveScale };

  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Mesh>(null);
  const leftEar = useRef<THREE.Mesh>(null);
  const rightEar = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (reducedMotion) return;
    if (head.current) {
      const targetY = mouse.current.x * 0.5;
      const targetX = mouse.current.y * 0.2;
      head.current.rotation.y += (targetY - head.current.rotation.y) * 0.08;
      head.current.rotation.x += (targetX - head.current.rotation.x) * 0.08;
    }
    if (body.current) body.current.scale.y = 1 + Math.sin(t * 1.4) * 0.025;
    if (tail.current) tail.current.rotation.z = Math.sin(t * 1.6) * 0.4 - 0.3;
    const twitch = Math.max(0, Math.sin(t * 0.8) - 0.95) * 4;
    if (leftEar.current) leftEar.current.rotation.z = 0.2 - twitch;
    if (rightEar.current) rightEar.current.rotation.z = -0.2 + twitch;
  });

  const furColor = "#2a2335";
  const noseColor = "#ff8aa8";
  const eyeColor = "#9dffd2";

  return (
    <group position={[0, -0.05, 0.55]}>
      <group ref={body}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.4, 24, 20]} />
          <meshPhysicalMaterial
            color={furColor}
            roughness={FUR.roughness + 0.02}
            metalness={0.0}
            sheen={FUR.sheen}
            sheenRoughness={FUR.sheenRoughness}
            sheenColor={FUR.sheenColor}
            clearcoat={FUR.clearcoat}
            clearcoatRoughness={FUR.clearcoatRoughness}
            envMapIntensity={FUR.envMapIntensity}
          />
        </mesh>
        <mesh position={[0, -0.05, 0.32]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshPhysicalMaterial
            color="#cfc6dc"
            roughness={0.85}
            sheen={FUR.sheen}
            sheenRoughness={Math.max(FUR.sheenRoughness - 0.1, 0.2)}
            sheenColor="#ffffff"
            envMapIntensity={FUR.envMapIntensity}
          />
        </mesh>
      </group>

      <mesh ref={tail} position={[-0.32, 0.05, -0.1]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.04, 0.07, 0.55, 12]} />
        <meshPhysicalMaterial
          color={furColor}
          roughness={FUR.roughness + 0.05}
          sheen={FUR.sheen}
          sheenRoughness={FUR.sheenRoughness}
          sheenColor={FUR.sheenColor}
          envMapIntensity={FUR.envMapIntensity}
        />
      </mesh>

      <group ref={head} position={[0, 0.42, 0.05]}>
        <mesh castShadow>
          <sphereGeometry args={[0.3, 24, 20]} />
          <meshPhysicalMaterial
            color={furColor}
            roughness={FUR.roughness}
            sheen={FUR.sheen}
            sheenRoughness={FUR.sheenRoughness}
            sheenColor={FUR.sheenColor}
            clearcoat={FUR.clearcoat}
            clearcoatRoughness={FUR.clearcoatRoughness}
            envMapIntensity={FUR.envMapIntensity}
          />
        </mesh>

        <mesh ref={leftEar} position={[-0.18, 0.22, 0]} rotation={[0, 0, 0.2]} castShadow>
          <coneGeometry args={[0.1, 0.22, 16]} />
          <meshStandardMaterial color={furColor} roughness={0.85} />
        </mesh>
        <mesh ref={rightEar} position={[0.18, 0.22, 0]} rotation={[0, 0, -0.2]} castShadow>
          <coneGeometry args={[0.1, 0.22, 16]} />
          <meshStandardMaterial color={furColor} roughness={0.85} />
        </mesh>
        <mesh position={[-0.18, 0.2, 0.025]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.05, 0.14, 12]} />
          <meshStandardMaterial color={noseColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.18, 0.2, 0.025]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.05, 0.14, 12]} />
          <meshStandardMaterial color={noseColor} roughness={0.7} />
        </mesh>

        {/* Eyes (rendered first, glasses sit in front) */}
        <mesh position={[-0.1, 0.02, 0.275]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            color={eyeColor}
            emissive={eyeColor}
            emissiveIntensity={0.4}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0.1, 0.02, 0.275]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            color={eyeColor}
            emissive={eyeColor}
            emissiveIntensity={0.4}
            toneMapped={false}
          />
        </mesh>

        <Glasses tuning={glassesProps} />

        <mesh position={[0, -0.07, 0.29]}>
          <sphereGeometry args={[0.022, 10, 10]} />
          <meshStandardMaterial color={noseColor} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Realistic wire-frame glasses ───────────────────────────────────────── */

function Glasses({ tuning }: { tuning: GlassesTuning }) {
  const frameMat = (
    <meshStandardMaterial
      color={METAL.color}
      metalness={METAL.metalness}
      roughness={METAL.roughness}
      envMapIntensity={METAL.envMapIntensity}
    />
  );

  const {
    scale, lensRadius: lensR, ovalY: lensOvalY, eyeSpacing: cx,
    tube, tilt, templeAngle, templeLength, yOffset: lensY, zOffset: lensZ,
  } = tuning;

  // Derive bridge length from inner lens edges (clamped so it never crosses).
  const innerEdge = Math.max(cx - lensR, 0.005);
  const bridge = innerEdge * 2;
  const outerEdge = cx + lensR;

  const lensGlass = (
    <meshPhysicalMaterial
      color={GLASS.tint}
      roughness={GLASS.roughness}
      transmission={GLASS.transmission}
      thickness={GLASS.thickness}
      ior={GLASS.ior}
      envMapIntensity={GLASS.envMapIntensity}
      transparent
      opacity={0.12}
      side={THREE.DoubleSide}
    />
  );

  // One full lens (frame + glass) scaled into an oval
  const Lens = ({ x }: { x: number }) => (
    <group position={[x, lensY, lensZ]} scale={[1, lensOvalY, 1]}>
      <mesh>
        <torusGeometry args={[lensR, tube, 14, 40]} />
        {frameMat}
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[lensR - tube, 32]} />
        {lensGlass}
      </mesh>
    </group>
  );

  return (
    <group rotation={[tilt, 0, 0]} scale={scale}>
      <Lens x={-cx} />
      <Lens x={cx} />

      {/* Bridge — horizontal bar sitting on top half of the lenses */}
      <mesh position={[0, lensY + 0.018, lensZ]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tube * 0.9, tube * 0.9, bridge, 12]} />
        {frameMat}
      </mesh>

      {/* Nose pads — small translucent pads tucked under the bridge */}
      <mesh position={[-0.018, lensY - 0.01, lensZ - 0.006]} scale={[1, 1.6, 0.6]}>
        <sphereGeometry args={[0.009, 10, 10]} />
        <meshPhysicalMaterial color="#e6e3ee" roughness={0.35} transmission={0.45} thickness={0.015} />
      </mesh>
      <mesh position={[0.018, lensY - 0.01, lensZ - 0.006]} scale={[1, 1.6, 0.6]}>
        <sphereGeometry args={[0.009, 10, 10]} />
        <meshPhysicalMaterial color="#e6e3ee" roughness={0.35} transmission={0.45} thickness={0.015} />
      </mesh>

      {/* Temples — hinge at outer lens edge, then sweep back around the head.
          Outer group rotates around Y at the hinge; inner cylinder lies along Z. */}
      <group position={[-outerEdge, lensY + 0.005, lensZ]} rotation={[0, templeAngle, 0]}>
        <mesh position={[0, 0, -templeLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[tube * 0.65, tube * 0.65, templeLength, 10]} />
          {frameMat}
        </mesh>
      </group>
      <group position={[outerEdge, lensY + 0.005, lensZ]} rotation={[0, -templeAngle, 0]}>
        <mesh position={[0, 0, -templeLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[tube * 0.65, tube * 0.65, templeLength, 10]} />
          {frameMat}
        </mesh>
      </group>
    </group>
  );
}

/* ─── Glasses tuner UI (dev) ─────────────────────────────────────────────── */

function GlassesTuner({
  value,
  scaleOverride,
  onChange,
  onScaleOverride,
  onClose,
  getCanvas,
}: {
  value: GlassesTuning;
  scaleOverride: number | null;
  onChange: (v: GlassesTuning) => void;
  onScaleOverride: (v: number | null) => void;
  onClose: () => void;
  getCanvas: () => HTMLCanvasElement | null;
}) {
  const set = (k: keyof GlassesTuning) => (n: number) =>
    onChange({ ...value, [k]: n });

  const [shots, setShots] = useState<Record<string, string>>({});
  const [capturing, setCapturing] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const waitFrames = (n: number) =>
    new Promise<void>((resolve) => {
      let i = 0;
      const step = () => {
        i += 1;
        if (i >= n) resolve();
        else requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });

  const captureAll = async () => {
    if (capturing) return;
    setCapturing(true);
    const prev = scaleOverride;
    const next: Record<string, string> = {};
    try {
      for (const p of VIEWPORT_PRESETS) {
        onScaleOverride(autoScaleFor(p.width));
        // Let React commit + R3F render at the new scale.
        await waitFrames(4);
        const canvas = getCanvas();
        if (!canvas) continue;
        try {
          next[p.label] = canvas.toDataURL("image/png");
        } catch {
          // canvas tainted — abort silently
        }
      }
      setShots(next);
      setCompareOpen(true);
    } finally {
      onScaleOverride(prev);
      setCapturing(false);
    }
  };

  return (
    <div className="absolute right-3 top-3 z-30 w-[260px] rounded-2xl border border-white/10 bg-black/70 p-3 font-mono text-[10px] text-white/90 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">
          Glasses · tune
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/15 px-2 py-0.5 text-white/70 hover:bg-white/10"
        >
          close
        </button>
      </div>

      <div className="mb-3">
        <div className="mb-1 text-[9px] uppercase tracking-[0.3em] text-white/50">
          Simulate viewport
        </div>
        <div className="flex flex-wrap gap-1">
          {VIEWPORT_PRESETS.map((p) => {
            const s = autoScaleFor(p.width);
            const active = scaleOverride != null && Math.abs(scaleOverride - s) < 1e-3;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => onScaleOverride(s)}
                className={`rounded-full border px-2 py-0.5 ${
                  active
                    ? "border-[#b39bff] bg-[#b39bff]/20 text-white"
                    : "border-white/15 text-white/70 hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onScaleOverride(null)}
            className={`rounded-full border px-2 py-0.5 ${
              scaleOverride == null
                ? "border-[#9dffd2] bg-[#9dffd2]/15 text-white"
                : "border-white/15 text-white/70 hover:bg-white/10"
            }`}
          >
            Auto
          </button>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            onClick={captureAll}
            disabled={capturing}
            className="flex-1 rounded-full border border-white/15 px-2 py-1 uppercase tracking-[0.2em] text-white/85 hover:bg-white/10 disabled:opacity-50"
          >
            {capturing ? "Capturing…" : "Capture all"}
          </button>
          {Object.keys(shots).length > 0 && (
            <button
              type="button"
              onClick={() => setCompareOpen((v) => !v)}
              className="rounded-full border border-white/15 px-2 py-1 uppercase tracking-[0.2em] text-white/70 hover:bg-white/10"
            >
              {compareOpen ? "Hide" : "Compare"}
            </button>
          )}
        </div>

        {compareOpen && Object.keys(shots).length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {VIEWPORT_PRESETS.map((p) => {
              const src = shots[p.label];
              if (!src) return null;
              const s = autoScaleFor(p.width);
              const active =
                scaleOverride != null && Math.abs(scaleOverride - s) < 1e-3;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => onScaleOverride(s)}
                  className={`group overflow-hidden rounded-md border text-left ${
                    active ? "border-[#b39bff]" : "border-white/15 hover:border-white/40"
                  }`}
                  title={`Apply ${p.label} (${p.width}px)`}
                >
                  <img
                    src={src}
                    alt={`${p.label} preview`}
                    className="block aspect-[4/3] w-full object-cover"
                  />
                  <div className="flex items-center justify-between bg-black/60 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.2em] text-white/80">
                    <span>{p.label}</span>
                    <span className="text-white/50">{p.width}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <TuneRow label="Lens R"     value={value.lensRadius}   min={0.06} max={0.14} step={0.001} onChange={set("lensRadius")} />
        <TuneRow label="Oval Y"     value={value.ovalY}        min={0.7}  max={1.0}  step={0.01}  onChange={set("ovalY")} />
        <TuneRow label="Spacing"    value={value.eyeSpacing}   min={0.08} max={0.14} step={0.001} onChange={set("eyeSpacing")} />
        <TuneRow label="Tube"       value={value.tube}         min={0.004} max={0.014} step={0.0005} onChange={set("tube")} />
        <TuneRow label="Tilt"       value={value.tilt}         min={-0.2} max={0.2}  step={0.005} onChange={set("tilt")} />
        <TuneRow label="Temple ∠"   value={value.templeAngle}  min={0}    max={0.6}  step={0.01}  onChange={set("templeAngle")} />
        <TuneRow label="Temple L"   value={value.templeLength} min={0.18} max={0.35} step={0.005} onChange={set("templeLength")} />
        <TuneRow label="Y offset"   value={value.yOffset}      min={-0.05} max={0.08} step={0.001} onChange={set("yOffset")} />
        <TuneRow label="Z offset"   value={value.zOffset}      min={0.26} max={0.33} step={0.001} onChange={set("zOffset")} />
        <TuneRow label="Scale ×"    value={value.scale}        min={0.7}  max={1.3}  step={0.01}  onChange={set("scale")} />
      </div>

      <button
        type="button"
        onClick={() => {
          onChange(GLASSES_DEFAULT);
          onScaleOverride(null);
        }}
        className="mt-3 w-full rounded-full border border-white/15 py-1 uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
      >
        Reset to auto
      </button>
    </div>
  );
}

function TuneRow({
  label, value, min, max, step, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="w-20 shrink-0 text-white/65">{label}</span>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-[#b39bff]"
      />
      <span className="w-12 shrink-0 text-right tabular-nums text-white/80">
        {value.toFixed(3)}
      </span>
    </label>
  );
}

/* ─── Background code chips ──────────────────────────────────────────────── */

const TOKENS = [
  "TS", "JS", "PY", "Swift", "Go", "Rs", "C#", "C++", "Kt", "Rb",
  "PHP", "SQL", "HTML", "CSS", "AI", "ML", "</>", "{}", "=>", "&&",
  "||", "404", "git", "npm", "λ", "API", "GPU", "SSR",
];
const COLORS = ["#b39bff", "#ffb98a", "#9dffd2", "#ffffff", "#f5b8ff"];

type Chip = {
  pos: [number, number, number];
  rot: [number, number, number];
  text: string;
  color: string;
  scale: number;
  speed: number;
};

function BackgroundCodeField() {
  const chips = useMemo<Chip[]>(() => {
    const rng = mulberry32(20260603);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 18 : 34;
    const out: Chip[] = [];
    let safety = 0;
    while (out.length < count && safety++ < 800) {
      // distribute roughly in a hollow shell around the cat
      const x = (rng() - 0.5) * 14;
      const y = (rng() - 0.5) * 7 + 1.5;
      const z = -(rng() * 5 + 1.5);

      // Push chips that fall too close to the character outward (radial mask)
      const dx = x;
      const dy = y - 0.5;
      const r = Math.hypot(dx, dy);
      if (r < 1.6 && z > -3) continue; // skip the central foreground bubble

      out.push({
        pos: [x, y, z],
        rot: [(rng() - 0.5) * 0.4, (rng() - 0.5) * 0.6, (rng() - 0.5) * 0.3],
        text: TOKENS[Math.floor(rng() * TOKENS.length)],
        color: COLORS[Math.floor(rng() * COLORS.length)],
        scale: 0.7 + rng() * 0.9,
        speed: 0.6 + rng() * 1.4,
      });
    }
    return out;
  }, []);

  return (
    <group>
      {chips.map((c, i) => (
        <Float key={i} speed={c.speed} rotationIntensity={0.35} floatIntensity={0.7}>
          <CodeChip {...c} />
        </Float>
      ))}
    </group>
  );
}

function CodeChip({ pos, rot, text, color, scale }: Chip) {
  const w = Math.max(0.4, 0.18 + text.length * 0.11);
  const h = 0.32;
  return (
    <group position={pos} rotation={rot} scale={scale}>
      <RoundedBox args={[w, h, 0.05]} radius={0.05} smoothness={3}>
        <meshStandardMaterial
          color="#1a1428"
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.25}
          roughness={0.45}
          toneMapped={false}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.031]}
        fontSize={0.16}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#0d0a18"
      >
        {text}
      </Text>
    </group>
  );
}

/* ─── Tiny seeded RNG so chip layout is stable between renders ───────────── */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
