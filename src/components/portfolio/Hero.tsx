import { motion } from "framer-motion";
import { Marquee } from "./Marquee";
import { Scene3D } from "./Scene3D";

const phrases = [
  "Software Engineer",
  "Industrial AI Builder",
  "Mobile Developer",
  "Full-Stack Builder",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#0d0a18] text-white"
    >
      {/* Full-bleed 3D scene as the background */}
      <Scene3D className="absolute inset-0 z-0" />

      {/* Soft top/bottom vignette so marquees stay legible over the canvas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#0d0a18] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[#0d0a18] to-transparent" />

      {/* Top marquee — sits above the character, never overlaps the face */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 md:top-22">
        <Marquee className="text-[11vw] font-semibold leading-[0.95] tracking-tight text-white md:text-[8vw]">
          {phrases.map((p, i) => (
            <span key={i} className="flex items-center pr-12">
              <span className="font-display">{p}</span>
              <span className="mx-10 text-[var(--violet)]">•</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Bottom marquee — mirrored, ghosted */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 z-20 md:bottom-1">
        <Marquee
          reverse
          className="text-[11vw] font-semibold leading-[0.95] tracking-tight text-white/15 md:text-[8vw]"
        >
          {phrases.map((p, i) => (
            <span key={i} className="flex items-center pr-12">
              <span className="font-display italic">{p}</span>
              <span className="mx-10">•</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Corner overlays — small, out of the character's bounding box */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute left-6 top-[32%] max-w-[220px] md:left-10 md:top-[35%]"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[5%] left-6 hidden max-w-[220px] md:bottom-[28%] md:left-10 md:block"
        >
          <p className="font-mono text-[20px] uppercase tracking-[0.3em] text-white">
            Most recently
          </p>
          <p className="mt-2 text-sm leading-snug text-white/80">
            Built and delivered the Codlean MES AI engine for live industrial fault prediction and
            decision support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-[25%] right-6 hidden max-w-[230px] text-right md:bottom-[28%] md:right-10 md:block"
        >
          <p className="mt-2 text-[18px] uppercase tracking-[0.3em] text-white">
            Rümeysa Ahsen Çiçek
          </p>
          <p className="mt-2 text-sm leading-snug text-white/80">
            Software engineering graduate building{" "}
            <span className="text-[var(--violet-glow)]">AI systems</span> for industry, research,
            and real products.
          </p>
        </motion.div>
      </div>
      <div className="absolute inset-x-4 bottom-5 z-30 rounded-2xl border border-white/20 bg-[#0d0a18]/80 p-5 backdrop-blur-md md:hidden">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--violet-glow)]">
          Rümeysa Ahsen Çiçek
        </p>
        <p className="mt-2 font-display text-lg leading-snug">
          Software engineer building AI systems for real operations.
        </p>
      </div>
    </section>
  );
}
