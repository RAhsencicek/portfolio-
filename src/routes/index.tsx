import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/portfolio/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rümeysa Ahsen Çiçek — Software Engineer & Industrial AI Builder" },
      {
        name: "description",
        content:
          "Industrial AI systems, explainable models and software delivered for real operations by Rümeysa Ahsen Çiçek.",
      },
      {
        property: "og:title",
        content: "Rümeysa Ahsen Çiçek — Industrial AI & Software Engineering",
      },
      {
        property: "og:description",
        content: "From live industrial data to working software and explainable decisions.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://rumeysahsencicekdesign.tech/" },
      { rel: "alternate", hrefLang: "en", href: "https://rumeysahsencicekdesign.tech/" },
      { rel: "alternate", hrefLang: "tr", href: "https://rumeysahsencicekdesign.tech/tr" },
    ],
  }),
  component: () => <HomePage locale="en" />,
});
