import type { Locale } from "./portfolio-content";

export const mesCaseCopy: Record<
  Locale,
  {
    back: string;
    caseLabel: string;
    eyebrow: string;
    headline: string;
    intro: string;
    challengeLabel: string;
    challengeTitle: string;
    challengeText: string;
    buildLabel: string;
    buildTitle: string;
    buildText: string;
    stages: { title: string; text: string }[];
    useLabel: string;
    useTitle: string;
    useText: string;
    shot1: string;
    shot2: string;
    shot3: string;
    full: string;
    resultsLabel: string;
    resultsTitle: string;
    resultsText: string;
    results: { value: string; label: string }[];
    deliveryLabel: string;
    deliveryTitle: string;
    deliveryText: string;
    repos: [string, string, string];
    footerLabel: string;
    footerTitle: string;
    contact: string;
  }
> = {
  en: {
    back: "All work",
    caseLabel: "Case study 01",
    eyebrow: "Industrial AI · Predictive maintenance · 2026",
    headline: "From live factory signals to decisions operators can use.",
    intro:
      "I designed, built and delivered an operational AI engine for fault prediction using real customer machine data. The live dashboard, predictive model, local LLM and multi-agent analysis worked together as one system.",
    challengeLabel: "The challenge",
    challengeTitle: "Machine data matters when it leads to a clear next action.",
    challengeText:
      "Operators needed live status, a developing-fault signal, the evidence behind it and a practical recommendation rather than an unexplained score.",
    buildLabel: "What I built",
    buildTitle: "One connected path from sensor reading to explanation.",
    buildText:
      "I owned the AI engine end to end: data ingestion and validation, predictive and explainability layers, local model integration, specialized agents, APIs and the operator-facing analysis flow.",
    stages: [
      {
        title: "Live data",
        text: "Kafka streams brought real HPR machine readings into the system. Validation and state management made the signals available for monitoring and analysis.",
      },
      {
        title: "Prediction & evidence",
        text: "XGBoost fault prediction, risk scoring, engineering rules, and SHAP / DLIME explanations turned sensor patterns into findings operators could inspect.",
      },
      {
        title: "Local intelligence",
        text: "Llama 3.1 ran on-premise. Five specialized agents supported machine questions, diagnosis, actions, reports and fleet analysis.",
      },
      {
        title: "Operator experience",
        text: "The working dashboard showed live status, alerts, risk and an AI assistant. I handed it to the team for the next SCADA screen integration step.",
      },
    ],
    useLabel: "In use",
    useTitle: "The analysis was visible and actionable.",
    useText:
      "Screens from different stages of the working system. Some interface labels reflect earlier builds.",
    shot1: "Delivered system · Live machine dashboard and event stream",
    shot2: "Earlier assistant interface · Fleet analysis",
    shot3: "Machine analysis · Evidence and next action",
    full: "View full size",
    resultsLabel: "Evidence",
    resultsTitle: "A working system with documented model results.",
    resultsText:
      "The AUC is reported in my current engineering CV. It describes the predictive model, not a measured reduction in factory downtime. I do not present modeled downtime estimates as observed customer outcomes.",
    results: [
      { value: "98.5%", label: "Model AUC reported in CV" },
      { value: "5", label: "Specialized AI agents" },
      { value: "Real", label: "Customer machine data" },
    ],
    deliveryLabel: "Delivery",
    deliveryTitle: "Delivered as a functioning system.",
    deliveryText:
      "Fault prediction, the locally running LLM, the agent workflow and the dashboard were used together with real customer data. At handoff, I delivered the project to the wider team for connection to SCADA screens. That integration was the next team step.",
    repos: ["Core system", "SCADA API", "AI gateway"],
    footerLabel: "Have a similar challenge?",
    footerTitle: "Let's build what works.",
    contact: "Start a conversation",
  },
  tr: {
    back: "Tüm projeler",
    caseLabel: "Vaka incelemesi 01",
    eyebrow: "Endüstriyel yapay zekâ · Kestirimci bakım · 2026",
    headline: "Canlı fabrika sinyallerinden operatörün kullanabileceği kararlara.",
    intro:
      "Gerçek müşteri makine verileriyle arıza tahmini yapan operasyonel yapay zekâ motorunu tasarladım, geliştirdim ve teslim ettim. Canlı panel, tahmin modeli, yerel LLM ve çok ajanlı analiz tek bir sistem olarak çalıştı.",
    challengeLabel: "Problem",
    challengeTitle: "Makine verisi, net bir sonraki adıma dönüştüğünde değerlidir.",
    challengeText:
      "Operatörlerin açıklamasız bir puan yerine canlı duruma, gelişen arıza sinyaline, ardındaki kanıta ve uygulanabilir öneriye ihtiyacı vardı.",
    buildLabel: "Geliştirdiklerim",
    buildTitle: "Sensör okumasından açıklamaya uzanan bağlı bir hat.",
    buildText:
      "Veri alma ve doğrulama, tahmin ve açıklanabilirlik katmanları, yerel model entegrasyonu, uzman ajanlar, API'ler ve operatöre yönelik analiz akışı dahil yapay zekâ motorunun uçtan uca sorumluluğunu aldım.",
    stages: [
      {
        title: "Canlı veri",
        text: "Kafka akışları gerçek HPR makine okumalarını sisteme taşıdı. Doğrulama ve durum yönetimi sinyalleri izleme ve analiz için kullanılabilir kıldı.",
      },
      {
        title: "Tahmin ve kanıt",
        text: "XGBoost arıza tahmini, risk puanlama, mühendislik kuralları ve SHAP / DLIME açıklamaları sensör örüntülerini incelenebilir bulgulara dönüştürdü.",
      },
      {
        title: "Yerel zekâ",
        text: "Llama 3.1 kurum içinde çalıştı. Beş uzman ajan makine soruları, teşhis, aksiyon, rapor ve filo analizi için görev aldı.",
      },
      {
        title: "Operatör deneyimi",
        text: "Çalışan panel canlı durum, alarm, risk ve yapay zekâ asistanını sundu. SCADA ekran bağlantısı için sistemi ekibe devrettim.",
      },
    ],
    useLabel: "Kullanım",
    useTitle: "Analiz görünür ve uygulanabilirdi.",
    useText:
      "Çalışan sistemin farklı aşamalarından ekranlar. Bazı arayüz etiketleri erken sürümlerden kalmadır.",
    shot1: "Teslim edilen sistem · Canlı makine paneli ve olay akışı",
    shot2: "Erken asistan arayüzü · Filo analizi",
    shot3: "Makine analizi · Kanıt ve sonraki adım",
    full: "Tam boyutta aç",
    resultsLabel: "Kanıt",
    resultsTitle: "Belgelenmiş model sonucu olan çalışan sistem.",
    resultsText:
      "AUC değeri güncel mühendislik CV'mde raporlanıyor. Bu değer tahmin modelini tanımlar; fabrikada ölçülmüş duruş azalmasını ifade etmez. Modellenmiş duruş tahminlerini gerçekleşmiş müşteri sonucu gibi sunmuyorum.",
    results: [
      { value: "%98,5", label: "CV'de raporlanan model AUC" },
      { value: "5", label: "Uzman yapay zekâ ajanı" },
      { value: "Gerçek", label: "Müşteri makine verisi" },
    ],
    deliveryLabel: "Teslim",
    deliveryTitle: "Çalışan bir sistem olarak teslim edildi.",
    deliveryText:
      "Arıza tahmini, yerel LLM, ajan akışı ve panel gerçek müşteri verileriyle birlikte kullanıldı. Teslim sırasında projeyi SCADA ekranlarına bağlanması için diğer ekip üyelerine devrettim. Bu entegrasyon ekibin sonraki adımıydı.",
    repos: ["Ana sistem", "SCADA API", "Yapay zekâ geçidi"],
    footerLabel: "Benzer bir probleminiz mi var?",
    footerTitle: "İşe yarayan sistemi kuralım.",
    contact: "İletişime geç",
  },
};
