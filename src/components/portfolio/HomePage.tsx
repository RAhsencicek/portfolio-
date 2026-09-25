import { useState } from "react";
import { CustomCursor } from "./CustomCursor";
import { Loader } from "./Loader";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Publications } from "./Publications";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import type { Locale } from "@/lib/portfolio-content";

export function HomePage({ locale }: { locale: Locale }) {
  const [sceneReady, setSceneReady] = useState(false);
  return (
    <main className="relative bg-[var(--canvas)] text-[var(--ink)]">
      <Loader ready={sceneReady} locale={locale} />
      <CustomCursor />
      <Nav locale={locale} />
      <Hero locale={locale} onSceneReady={() => setSceneReady(true)} />
      <About locale={locale} />
      <Projects locale={locale} />
      <Experience locale={locale} />
      <Publications locale={locale} />
      <Skills locale={locale} />
      <Contact locale={locale} />
    </main>
  );
}
