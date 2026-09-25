import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { HomePage } from "@/components/portfolio/HomePage";

export const Route = createFileRoute("/tr")({
  head: () => ({
    meta: [
      { title: "Rümeysa Ahsen Çiçek — Yazılım Mühendisi ve Endüstriyel Yapay Zekâ" },
      {
        name: "description",
        content:
          "Rümeysa Ahsen Çiçek'in gerçek operasyonlar için geliştirdiği endüstriyel yapay zekâ sistemleri, yazılımlar ve araştırmalar.",
      },
      { property: "og:title", content: "Rümeysa Ahsen Çiçek — Endüstriyel Yapay Zekâ" },
      {
        property: "og:description",
        content: "Canlı endüstriyel veriden çalışan yazılıma ve açıklanabilir kararlara.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://rumeysahsencicekdesign.tech/tr" },
      { rel: "alternate", hrefLang: "en", href: "https://rumeysahsencicekdesign.tech/" },
      { rel: "alternate", hrefLang: "tr", href: "https://rumeysahsencicekdesign.tech/tr" },
    ],
  }),
  component: TrRoute,
});

function TrRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/tr" || pathname === "/tr/" ? <HomePage locale="tr" /> : <Outlet />;
}
