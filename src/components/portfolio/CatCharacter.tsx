import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import catImg from "@/assets/cat-character.png";
import { useMotionPref } from "./MotionPref";

export function CatCharacter() {
  const { reduced } = useMotionPref();

  // Normalized mouse position from -1 to 1 (centered on viewport)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smoother, slightly underdamped spring for a more "physical" body response
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.9 });

  // Body parallax + subtle 3D tilt for added depth
  const tx = useTransform(sx, [-1, 1], [-18, 18]);
  const ty = useTransform(sy, [-1, 1], [-10, 10]);
  const rotZ = useTransform(sx, [-1, 1], [-4, 4]);
  const rotY = useTransform(sx, [-1, 1], [12, -12]);
  const rotX = useTransform(sy, [-1, 1], [-8, 8]);

  // Highlight/shadow layers shift opposite the body for fake-light realism
  const lightX = useTransform(sx, [-1, 1], [20, -20]);
  const lightY = useTransform(sy, [-1, 1], [12, -12]);
  const shadowSkew = useTransform(sx, [-1, 1], [10, -10]);
  const shadowScaleX = useTransform(sx, [-1, 1], [1.15, 0.85]);
  const specX = useTransform(sx, [-1, 1], [10, -10]);
  const specY = useTransform(sy, [-1, 1], [6, -6]);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div
      className="relative aspect-square w-full max-w-[520px]"
      style={{ perspective: 1200 }}
    >
      {/* Ambient violet/cool halo behind the character */}
      <motion.div
        aria-hidden
        className="absolute inset-[-6%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--violet) 55%, transparent), transparent 72%)",
        }}
        animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Warm rim from upper-right for realistic two-tone lighting */}
      <motion.div
        aria-hidden
        className="absolute -inset-[8%] rounded-full blur-2xl mix-blend-screen"
        style={{
          x: lightX,
          y: lightY,
          background:
            "radial-gradient(40% 40% at 75% 28%, color-mix(in oklab, #ffd1a8 70%, transparent), transparent 70%)",
          opacity: 0.55,
        }}
      />

      {/* Contact shadow on the floor — soft, elongated, mouse-reactive */}
      <motion.div
        aria-hidden
        className="absolute inset-x-[8%] bottom-[2%] h-6 rounded-[50%] bg-[var(--ink)]/55 blur-2xl"
        style={{ skewX: shadowSkew, scaleX: shadowScaleX }}
        animate={reduced ? undefined : { opacity: [0.55, 0.35, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Tighter inner contact shadow for grounding */}
      <motion.div
        aria-hidden
        className="absolute inset-x-[22%] bottom-[3%] h-2 rounded-full bg-black/55 blur-md"
        style={{ scaleX: shadowScaleX }}
      />

      {/* Idle float + breathing */}
      <motion.div
        className="relative h-full w-full"
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Mouse-driven sway with subtle 3D rotation */}
        <motion.div
          className="relative h-full w-full will-change-transform"
          style={{
            x: tx,
            y: ty,
            rotateZ: rotZ,
            rotateY: rotY,
            rotateX: rotX,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={catImg}
            alt="Programmer cat — 3D mascot"
            width={1024}
            height={1280}
            className="relative z-10 h-full w-full object-contain
              [filter:drop-shadow(0_18px_30px_rgba(20,10,40,0.45))_drop-shadow(0_40px_70px_rgba(99,55,200,0.35))_drop-shadow(0_2px_0_rgba(255,255,255,0.05))]"
            draggable={false}
          />

          {/* Specular highlight overlay that follows the warm light direction */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
            style={{
              background:
                "radial-gradient(35% 35% at 70% 25%, rgba(255,230,200,0.55), transparent 70%)",
              x: specX,
              y: specY,
            }}
          />
          {/* Cool rim/ambient occlusion on the opposite side */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply"
            style={{
              background:
                "radial-gradient(45% 55% at 18% 80%, rgba(40,20,80,0.35), transparent 70%)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}