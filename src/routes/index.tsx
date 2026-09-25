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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rümeysa Ahsen Çiçek — Software Engineer & Industrial AI Builder" },
      {
        name: "description",
        content:
          "Rümeysa Ahsen Çiçek is a software engineer building industrial AI, predictive maintenance systems, and full-stack products.",
      },
      {
        property: "og:title",
        content: "Rümeysa Ahsen Çiçek — Software Engineer & Industrial AI Builder",
      },
      {
        property: "og:description",
        content: "Industrial AI systems, selected software projects, and research.",
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
      <Publications />
      <Skills />
      <Contact />
    </main>
  );
}
