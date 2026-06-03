import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useMotionPref } from "./MotionPref";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Section wrapper that fades + lifts in on enter and softly drifts on exit,
 * driven by scroll progress through the viewport.
 */
export function ScrollSection({
  children,
  className,
  id,
  as: Tag = "section",
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
  intensity?: number;
}) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });
  const opacity = useTransform(smooth, [0, 0.15, 0.85, 1], [0.35, 1, 1, 0.55]);
  const y = useTransform(smooth, [0, 0.5, 1], [40 * intensity, 0, -30 * intensity]);

  if (reduced) {
    return Tag === "div" ? (
      <div id={id} className={className}>{children}</div>
    ) : (
      <section id={id} className={className}>{children}</section>
    );
  }

  const MotionTag = Tag === "div" ? motion.div : motion.section;
  return (
    <MotionTag
      ref={ref as never}
      id={id}
      className={className}
      style={{ opacity, y, willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Reveals a block of text word-by-word from a masked baseline.
 * The DOM still contains the full original string for accessibility / SEO.
 */
export function RevealLines({
  text,
  className,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const { reduced } = useMotionPref();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.12em",
            marginBottom: "-0.12em",
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%" },
            }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Applies a small scroll-driven Y offset to its children. Pair with a sibling
 * at a different `speed` to create parallax depth.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const distance = 80 * speed;
  const y = useTransform(smooth, [0, 1], [distance, -distance]);

  if (reduced) {
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y: y as MotionValue<number>, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A 0-height marker placed between two sections. As it scrolls through the
 * viewport, the incoming color "wipes" down from the top of the next section.
 */
export function SectionTransition({
  fromColor,
  toColor,
  height = 160,
}: {
  fromColor: string;
  toColor: string;
  height?: number;
}) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  const clip = useTransform(smooth, [0.3, 0.7], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative w-full"
      style={{ height, background: fromColor, marginTop: -1, marginBottom: -1 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: toColor, clipPath: clip, WebkitClipPath: clip as never }}
      />
    </div>
  );
}