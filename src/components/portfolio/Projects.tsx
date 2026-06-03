import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useMotionPref } from "./MotionPref";
import { ScrollSection } from "./ScrollReveal";
import codleanImg from "@/assets/project-codlean.jpg";
import visionVetImg from "@/assets/project-visionvet.jpg";
import pharmoraImg from "@/assets/project-pharmora.jpg";
import teknofestImg from "@/assets/project-teknofest.jpg";
import opcaImg from "@/assets/project-opca.jpg";
import greenguardImg from "@/assets/project-greenguard.jpg";

type Project = {
  index: string;
  title: string;
  role: string;
  year: string;
  blurb: string;
  stack: string[];
  image: string;
  href?: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "Codlean MES",
    role: "Lead AI Engine Developer",
    year: "2026",
    blurb:
      "End-to-end AI engine for a predictive digital twin platform — Kafka data streams, anomaly detection layers, and decision engines that translate sensor data into actionable industrial insight.",
    stack: ["Python", "Kafka", "State Stores", "Anomaly Detection", "MES"],
    image: codleanImg,
  },
  {
    index: "02",
    title: "VisionVet-AI",
    role: "Software Developer · TÜBİTAK 2209-A",
    year: "2025",
    blurb:
      "Mobile AI system for early mastitis & parasite diagnosis through smartphone microscopy. CNN detection trained on a custom veterinary dataset and shipped to iOS via CoreML/ONNX.",
    stack: ["PyTorch", "CoreML", "ONNX", "iOS"],
    image: visionVetImg,
    href: "https://github.com/RAhsencicek",
  },
  {
    index: "03",
    title: "Pharmora",
    role: "Team Lead & Full-Stack Developer",
    year: "2025",
    blurb:
      "Sustainability-focused B2B drug-exchange marketplace between pharmacies. React web dashboard, Node/Express API, and a Swift iOS app with barcode scanning.",
    stack: ["React", "Node.js", "MongoDB", "Swift"],
    image: pharmoraImg,
    href: "https://github.com/RAhsencicek",
  },
  {
    index: "04",
    title: "TEKNOFEST WCC '25",
    role: "Developer · Finalist",
    year: "2025",
    blurb:
      "Core simulation pipeline for a mesh-based, jammer-resilient BLE/LoRa system — adaptive modulation (BPSK–1024QAM, OFDM, GFSK, CSS, FLRC) with CNN-inspired frequency hopping.",
    stack: ["Python", "DSP", "OFDM", "Mesh Networking"],
    image: teknofestImg,
  },
  {
    index: "05",
    title: "OpCa / DIBaS Benchmark",
    role: "AI Research Intern · Kriptarium",
    year: "2025",
    blurb:
      "PyTorch pipeline benchmarking 20+ CNN/ViT architectures on the DIBaS bacterial colony dataset. Best result: 93.94% val accuracy with MobileNetV3-Large, deployed on-device to iOS.",
    stack: ["PyTorch", "MobileNetV3", "TorchScript", "iOS"],
    image: opcaImg,
    href: "https://github.com/RAhsencicek",
  },
  {
    index: "06",
    title: "GreenGuard",
    role: "Team Lead & Developer",
    year: "2025",
    blurb:
      "Desktop analytics for smart plant care. Decision-tree engine yields a 0–100 health score; predictive maintenance and NLP reporting generate care recommendations.",
    stack: ["C#", ".NET", "Decision Trees", "NLP"],
    image: greenguardImg,
    href: "https://github.com/RAhsencicek",
  },
];

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <ScrollSection id="work" className="relative bg-[var(--ink)] py-32 text-[var(--surface-foreground)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            (02) Selected Work
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            2025 — 2026
          </p>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </ScrollSection>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Smooth out the raw scroll value with a spring before mapping to transforms
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const y = useTransform(smooth, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(smooth, [0, 0.5, 1], [1.12, 1.04, 1.12]);

  return (
    <motion.div
      ref={ref}
      data-cursor="view"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
      className="group relative flex h-full cursor-pointer flex-col gap-8 bg-[var(--ink)] p-8 outline-none transition-colors duration-500 hover:bg-[var(--surface)] focus-visible:bg-[var(--surface)] md:p-12"
    >
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/40">
        <span>{project.index}</span>
        <span>{project.year}</span>
      </div>

      <motion.div
        className="relative aspect-[4/3] overflow-hidden rounded-md"
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={{
          duration: 7 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          width={1280}
          height={960}
          loading="lazy"
          className="absolute inset-0 h-[120%] w-full -translate-y-[10%] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          style={reduced ? undefined : { y, scale }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md transition-opacity duration-300 group-hover:bg-white group-hover:text-black">
          View
        </div>
      </motion.div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--violet-glow)]">
            {project.role}
          </p>
        </div>
        <p className="max-w-lg text-base leading-relaxed text-white/70">{project.blurb}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-6xl gap-0 overflow-hidden rounded-xl bg-[var(--surface)] text-white shadow-2xl md:grid-cols-[1.4fr_1fr]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
            >
              <X size={16} />
            </button>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black md:aspect-auto md:h-full">
              <motion.img
                key={project.image}
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col gap-6 p-8 md:p-10">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                <span>{project.index}</span>
                <span>{project.year}</span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--violet-glow)]">
                  {project.role}
                </p>
              </div>
              <p className="text-base leading-relaxed text-white/75">{project.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/65"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[var(--violet)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  View on GitHub <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}