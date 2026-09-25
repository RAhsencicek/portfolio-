import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { ScrollSection } from "./ScrollReveal";
import visionVetImg from "@/assets/project-visionvet.jpg";
import pharmoraImg from "@/assets/project-pharmora.jpg";
import teknofestImg from "@/assets/project-teknofest.jpg";
import greenguardImg from "@/assets/project-greenguard.jpg";
import opcaImg from "@/assets/project-opca.jpg";
import metrikaImg from "@/assets/project-metrika.png";
import erginsoyImg from "@/assets/project-erginsoy-illustrated.png";

type Project = {
  title: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  challenge: string;
  contribution: string;
  result: string;
  stack: string[];
  image?: string;
  visualClass?: string;
  links: { label: string; href: string }[];
  caseStudy?: boolean;
};

const mes: Project = {
  title: "Codlean MES",
  category: "Industrial AI · Featured case study",
  role: "AI Engine Developer · Atasayar Teknoloji",
  year: "2026",
  summary: "Turning live factory data into explainable maintenance decisions.",
  challenge: "Make live HPR machine signals useful for fault prediction and operator decisions.",
  contribution:
    "I built the Kafka data pipeline, predictive model, explainability layer, on-premise Llama 3.1 integration, five-agent analysis workflow, APIs, and operator-facing dashboard.",
  result:
    "The full system worked with real customer data. At handoff, the next team step was connecting it to SCADA screens. The model reached 98.5% AUC and processing latency fell 40%.",
  stack: ["Kafka", "FastAPI", "XGBoost", "SHAP", "Llama 3.1", "Multi-agent"],
  image: "/images/mes-dashboard.png",
  links: [{ label: "Core repository", href: "https://github.com/RAhsencicek/codleanMES" }],
  caseStudy: true,
};

const otherWork: Project[] = [
  {
    title: "Sa-Ra",
    category: "Emergency communication",
    role: "Team lead · TEKNOFEST 2025 finalist",
    year: "2024–25",
    summary: "A resilient wireless communication system for emergency conditions.",
    challenge:
      "Keep devices communicating when conventional infrastructure is unavailable or disrupted.",
    contribution:
      "Led a three-person team across the ESP32 BLE / LoRa mesh architecture, Python signal simulations, anti-jamming strategies, adaptive modulation, technical documentation, and an iOS companion app.",
    result:
      "The project reached the TEKNOFEST 2025 finals and received TÜBİTAK 2209-A research funding.",
    stack: ["ESP32", "C / C++", "BLE / LoRa", "SwiftUI"],
    image: teknofestImg,
    links: [
      { label: "iOS repository", href: "https://github.com/RAhsencicek/sa-ra" },
      { label: "BLE mesh repository", href: "https://github.com/RAhsencicek/Sa-Ra-BLE-mesh" },
    ],
  },
  {
    title: "Pharmora",
    category: "B2B platform",
    role: "Solo developer",
    year: "2024–25",
    summary: "A cross-platform pharmaceutical exchange product for pharmacies.",
    challenge:
      "Make surplus medication exchange easier to manage across web and mobile interfaces.",
    contribution:
      "Built the React dashboard, Node.js / Express API, MongoDB data layer, and SwiftUI mobile client, including barcode scanning and OpenFDA integration.",
    result:
      "Delivered a containerized full-stack product with a deployed web service and native mobile client.",
    stack: ["React", "Node.js", "MongoDB", "SwiftUI"],
    image: pharmoraImg,
    links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/Pharmora" }],
  },
  {
    title: "GreenGuard",
    category: "Desktop analytics",
    role: "Solo developer",
    year: "2025–26",
    summary: "Sensor-driven plant care analysis and recommendations.",
    challenge: "Turn plant sensor readings into a usable health assessment and next steps.",
    contribution:
      "Developed a C# / .NET desktop application with SQL Server, a decision-tree health score based on plant metrics, sensor anomaly detection, and NLP-powered care recommendations through the Groq API.",
    result:
      "A desktop decision-support workflow that connects sensor status with plain-language care recommendations.",
    stack: ["C# / .NET", "SQL Server", "Anomaly detection", "NLP"],
    image: greenguardImg,
    links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/G-G" }],
  },
  {
    title: "Metrika",
    category: "Analytics dashboard",
    role: "Frontend lead · Three-person team",
    year: "2024–25",
    summary: "A project management platform with a real-time KPI dashboard.",
    challenge: "Make changing performance indicators readable and useful in one place.",
    contribution:
      "Led the frontend implementation with React 19, TypeScript, Vite, and Tailwind CSS; set up consistent code quality with ESLint and Prettier.",
    result:
      "The frontend was deployed on Vercel; its source and implementation are available on GitHub.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind"],
    image: metrikaImg,
    links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/Metrika" }],
  },
  {
    title: "Ergin Soy İnşaat",
    category: "Freelance web project",
    role: "Designer & developer",
    year: "2024",
    summary: "A responsive corporate website for a construction company.",
    challenge: "Give a local business a clear and credible presence across desktop and mobile.",
    contribution: "Designed and built the responsive website as an independent client project.",
    result: "Published a working corporate website for the client.",
    stack: ["Web design", "Responsive UI", "Frontend"],
    image: erginsoyImg,
    links: [
      { label: "Live website", href: "https://erginsoyinsaat.com" },
      { label: "GitHub repository", href: "https://github.com/RAhsencicek/erginsoy_insaat" },
    ],
  },
  {
    title: "VisionVet-AI",
    category: "Mobile computer vision",
    role: "AI and mobile development",
    year: "2025",
    summary: "On-device veterinary imaging through smartphone microscopy.",
    challenge: "Explore faster, more accessible visual screening for animal health.",
    contribution: "Worked on CNN-based image analysis and mobile inference using ONNX and CoreML.",
    result:
      "Built the imaging and model pipeline toward a mobile veterinary screening prototype, working with clinical partners on microscopy data.",
    stack: ["PyTorch", "ONNX", "CoreML", "iOS"],
    image: visionVetImg,
    links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/VisionVet-AI" }],
  },
  {
    title: "DIBaS benchmark",
    category: "AI research",
    role: "Software & AI Engineer · Kriptarium",
    year: "2025",
    summary: "Benchmarking computer vision models for bacterial colony imaging.",
    challenge:
      "Find a model that performs well on a small, 33-class medical imaging dataset and can move toward edge use.",
    contribution:
      "Compared more than 20 CNN and ViT architectures and optimized model deployment through ONNX Runtime, CoreML, and TorchScript.",
    result:
      "Reached 95.45% top-1 accuracy in the benchmark documented in my CV and contributed to related published research.",
    stack: ["PyTorch", "TensorFlow", "ONNX", "CoreML"],
    image: opcaImg,
    links: [],
  },
];

function ProjectVisual({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-xl bg-[#151820] " +
        (featured ? "aspect-[4/3] md:aspect-[16/11]" : "aspect-[16/9]")
      }
    >
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className="absolute inset-0 h-full w-full scale-[1.055] object-cover object-top transition-transform duration-700 group-hover:scale-[1.1]"
          loading="lazy"
        />
      ) : (
        <div className={"flex h-full w-full items-end p-7 " + project.visualClass}>
          <span className="font-display text-4xl font-medium text-white/90 md:text-5xl">
            {project.title}
          </span>
        </div>
      )}
      {featured && (
        <span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--ink)]">
          View project ↗
        </span>
      )}
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-xl md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            key={project.title}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="relative grid max-h-[min(88vh,900px)] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/15 bg-[#181820] text-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-white hover:text-black"
            >
              <X size={18} />
            </button>
            <div className="relative min-h-56 overflow-hidden bg-[#12151d] lg:min-h-full">
              {project.image ? (
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full scale-[1.045] object-cover object-top"
                />
              ) : (
                <div className={"flex h-full min-h-56 items-end p-8 " + project.visualClass}>
                  <span className="font-display text-5xl">{project.title}</span>
                </div>
              )}
            </div>
            <div className="p-7 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--violet-glow)]">
                {project.category} · {project.year}
              </p>
              <h2
                id="project-dialog-title"
                className="mt-4 font-display text-4xl font-medium md:text-5xl"
              >
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-white/55">{project.role}</p>
              <p className="mt-6 text-lg leading-relaxed text-white/85">{project.summary}</p>
              <dl className="mt-8 space-y-5 border-t border-white/15 pt-7">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--violet-glow)]">
                    The challenge
                  </dt>
                  <dd className="mt-2 leading-relaxed text-white/65">{project.challenge}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--violet-glow)]">
                    My contribution
                  </dt>
                  <dd className="mt-2 leading-relaxed text-white/65">{project.contribution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--violet-glow)]">
                    Result
                  </dt>
                  <dd className="mt-2 leading-relaxed text-white/65">{project.result}</dd>
                </div>
              </dl>
              <ul className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/65"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.caseStudy && (
                  <Link
                    to="/work/codlean-mes"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--violet)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em]"
                  >
                    Read case study <ArrowUpRight size={14} />
                  </Link>
                )}
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-[var(--ink)]"
                  >
                    {link.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const closeDialog = useCallback(() => setActive(null), []);
  return (
    <ScrollSection id="work" className="relative bg-[var(--ink)] py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between border-b border-white/15 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/55">
            (02) Selected work
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/55">2024 — 2026</p>
        </div>
        <div className="grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:py-20">
          <button
            type="button"
            onClick={() => setActive(mes)}
            aria-haspopup="dialog"
            className="group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--violet-glow)]"
          >
            <ProjectVisual project={mes} featured />
          </button>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--violet-glow)]">
              Featured case study · Industrial AI
            </p>
            <h2 className="mt-5 font-display text-5xl font-medium tracking-tight md:text-7xl">
              Codlean MES
            </h2>
            <p className="mt-5 max-w-xl text-xl leading-snug text-white/85 md:text-2xl">
              {mes.summary}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              I built and delivered the working AI engine behind an industrial fault prediction
              system: live data ingestion, predictive models, explainability, on-premise LLM, and a
              multi-agent assistant used with real customer data.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/15 py-6">
              <div>
                <strong className="block font-display text-2xl md:text-3xl">98.5%</strong>
                <span className="mt-1 block text-xs text-white/50">Model AUC</span>
              </div>
              <div>
                <strong className="block font-display text-2xl md:text-3xl">40%</strong>
                <span className="mt-1 block text-xs text-white/50">Lower processing latency</span>
              </div>
              <div>
                <strong className="block font-display text-2xl md:text-3xl">5</strong>
                <span className="mt-1 block text-xs text-white/50">Specialized AI agents</span>
              </div>
            </div>
            <Link
              to="/work/codlean-mes"
              className="mt-8 inline-flex items-center gap-2 border-b border-[var(--violet-glow)] pb-2 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:text-[var(--violet-glow)]"
            >
              Explore the full story <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="flex items-end justify-between border-b border-white/15 pb-6">
          <h3 className="font-display text-2xl font-medium md:text-3xl">More things I built</h3>
          <span className="font-mono text-xs text-white/45">02 — 08</span>
        </div>
        <div className="grid gap-px bg-white/15 md:grid-cols-2">
          {otherWork.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActive(project)}
              aria-haspopup="dialog"
              aria-label={"View " + project.title + " details"}
              className={
                "group grid w-full gap-5 bg-[var(--ink)] py-8 text-left outline-none transition-colors hover:bg-[#202029] focus-visible:bg-[#202029] md:p-8 " +
                (index === otherWork.length - 1
                  ? "md:col-span-2 md:grid-cols-2 md:items-center md:gap-12"
                  : "")
              }
            >
              <ProjectVisual project={project} />
              <div className="flex flex-col items-start">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--violet-glow)]">
                    {project.category}
                  </p>
                  <h4 className="mt-2 font-display text-3xl font-medium">{project.title}</h4>
                  <p className="mt-1 text-sm text-white/50">{project.role}</p>
                </div>
                <p className="mt-5 max-w-xl leading-relaxed text-white/65">{project.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">
                  View project <ArrowUpRight size={14} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ProjectDialog project={active} onClose={closeDialog} />
    </ScrollSection>
  );
}
