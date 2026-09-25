import { createFileRoute } from "@tanstack/react-router";
import { CodleanCaseStudy } from "@/components/portfolio/CodleanCaseStudy";

export const Route = createFileRoute("/tr/work/codlean-mes")({
  head: () => ({
    meta: [
      { title: "Codlean MES — Endüstriyel Yapay Zekâ Vaka İncelemesi | Rümeysa Ahsen Çiçek" },
      {
        name: "description",
        content:
          "Gerçek müşteri makine verileriyle çalışan; kestirimci bakım, açıklanabilir modeller, yerel LLM ve uzman ajanlar içeren endüstriyel yapay zekâ motoru.",
      },
      { property: "og:title", content: "Codlean MES — Endüstriyel Yapay Zekâ Vaka İncelemesi" },
      {
        property: "og:description",
        content: "Canlı fabrika sinyallerinden açıklanabilir bakım kararlarına.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://rumeysahsencicekdesign.tech/tr/work/codlean-mes" },
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
  component: () => <CodleanCaseStudy locale="tr" />,
});
