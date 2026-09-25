import { copy, type Locale } from "@/lib/portfolio-content";

const proceedings = "https://drive.google.com/file/d/1pjG0aHZw5piFt4Lz5OUdwhewleO_YBNg/view";

const papers = [
  {
    title:
      "Lightweight CNN Models Outperform Vision Transformers on a Small-Scale Medical Imaging Dataset: The DIBaS Bacterial Colony Case Study",
    page: 54,
  },
  {
    title:
      "LGS Sınav Sorularını Tahmin Eden ve Üreten Yapay Zekâ Modeli: SWOT Analizi, Literatür Taraması ve LGS-Türkçe-QA Veri Seti",
    page: 778,
  },
];

export function Publications({ locale }: { locale: Locale }) {
  const t = copy[locale].research;
  return (
    <section
      id="research"
      className="relative bg-[var(--ink)] pb-24 pt-16 text-white md:pb-28 md:pt-20"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-white/50">
          (04) {t.label}
        </p>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {papers.map((paper) => (
            <li key={paper.page}>
              <a
                href={proceedings}
                target="_blank"
                rel="noreferrer"
                aria-label={`${paper.title} — ${t.book}, ${t.page} ${paper.page}`}
                className="grid gap-4 py-8 transition-colors hover:bg-white/[0.04] md:grid-cols-[180px_1fr_200px] md:items-start md:gap-8 md:py-10"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                  {t.paper} · 2025
                </span>
                <h3 className="font-display text-xl font-medium leading-snug md:text-2xl">
                  {paper.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--violet-glow)] md:text-right">
                  {t.book}
                  <br />
                  {t.page} {paper.page} ↗
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://doi.org/10.5281/zenodo.18304976"
              target="_blank"
              rel="noreferrer"
              className="grid gap-4 py-8 transition-colors hover:bg-white/[0.04] md:grid-cols-[180px_1fr_200px] md:items-start md:gap-8 md:py-10"
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                {t.dataset} · 2026
              </span>
              <h3 className="font-display text-xl font-medium leading-snug md:text-2xl">
                LGS Türkçe Soru Veri Seti (Turkish LGS Exam Question Dataset) v1.0
              </h3>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--violet-glow)] md:text-right">
                Zenodo
                <br />
                10.5281/zenodo.18304976 ↗
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
