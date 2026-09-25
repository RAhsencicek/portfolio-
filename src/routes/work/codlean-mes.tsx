import { createFileRoute } from "@tanstack/react-router";
import { CodleanCaseStudy } from "@/components/portfolio/CodleanCaseStudy";

export const Route = createFileRoute("/work/codlean-mes")({
  head: () => ({
    meta: [
      { title: "Codlean MES — Industrial AI Case Study | Rümeysa Ahsen Çiçek" },
      {
        name: "description",
        content:
          "A working industrial AI engine built with live customer machine data, predictive maintenance, explainable models, an on-premise LLM and specialized agents.",
      },
      { property: "og:title", content: "Codlean MES — Industrial AI Case Study" },
      {
        property: "og:description",
        content: "From live factory signals to explainable maintenance decisions.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://rumeysahsencicekdesign.tech/work/codlean-mes" },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://rumeysahsencicekdesign.tech/work/codlean-mes",
      },
      {
        rel: "alternate",
        hrefLang: "tr",
        href: "https://rumeysahsencicekdesign.tech/tr/work/codlean-mes",
      },
    ],
  }),
  component: () => <CodleanCaseStudy locale="en" />,
});
