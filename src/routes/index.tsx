import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/portfolio/Loader";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Publications } from "@/components/portfolio/Publications";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { SectionTransition } from "@/components/portfolio/ScrollReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rümeysa Ahsen Çiçek — Software Engineer & AI Researcher" },
      {
        name: "description",
        content:
          "Portfolio of Rümeysa Ahsen Çiçek — software engineer and AI researcher building mobile health AI, predictive industrial systems, and B2B platforms.",
      },
      {
        property: "og:title",
        content: "Rümeysa Ahsen Çiçek — Software Engineer & AI Researcher",
      },
      {
        property: "og:description",
        content: "Selected work, research, and publications.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-[var(--canvas)] text-[var(--ink)]">
      <Loader />
      <CustomCursor />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <SectionTransition fromColor="var(--canvas)" toColor="var(--ink)" />
      <Publications />
      <Skills />
      <SectionTransition fromColor="var(--canvas)" toColor="var(--ink)" />
      <Contact />
    </main>
  );
}
