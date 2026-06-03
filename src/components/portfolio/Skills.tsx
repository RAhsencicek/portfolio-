import { Marquee } from "./Marquee";
import { Parallax, ScrollSection } from "./ScrollReveal";

const skills = [
  "PyTorch", "Swift", "React", "Node.js", "Kafka", "ONNX", "CoreML",
  "C#/.NET", "MongoDB", "Python", "TorchScript", "MobileNetV3", "OFDM",
  "Express", "MES", "Anomaly Detection",
];

export function Skills() {
  return (
    <ScrollSection className="relative overflow-hidden bg-[var(--canvas)] py-20">
      <Parallax speed={0.1} className="mx-auto mb-10 max-w-[1600px] px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
          (05) Stack
        </p>
      </Parallax>
      <Marquee className="text-[var(--ink)]">
        {skills.map((s, i) => (
          <span key={i} className="flex items-center pr-10">
            <span className="font-display text-5xl font-medium tracking-tight md:text-7xl">
              {s}
            </span>
            <span className="mx-10 inline-block h-2 w-2 rounded-full bg-[var(--violet)]" />
          </span>
        ))}
      </Marquee>
    </ScrollSection>
  );
}