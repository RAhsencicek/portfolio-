export type Locale = "en" | "tr";
import visionVetImg from "@/assets/project-visionvet.jpg";
import pharmoraImg from "@/assets/project-pharmora.jpg";
import teknofestImg from "@/assets/project-teknofest.jpg";
import greenguardImg from "@/assets/project-greenguard.jpg";
import opcaImg from "@/assets/project-opca.jpg";
import metrikaImg from "@/assets/project-metrika.webp";
import erginsoyImg from "@/assets/project-erginsoy-illustrated.webp";

export const isTurkish = (locale: Locale) => locale === "tr";
export const homePath = (locale: Locale) => (isTurkish(locale) ? "/tr" : "/");
export const casePath = (locale: Locale) =>
  isTurkish(locale) ? "/tr/work/codlean-mes" : "/work/codlean-mes";

export const copy = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      close: "Close menu",
      motionOn: "Motion: On",
      motionOff: "Motion: Off",
    },
    hero: {
      phrases: ["Software Engineer", "Industrial AI Builder", "Researcher", "Product Developer"],
      eyebrow: "From live data to working systems",
      headline: "I build AI systems that work with real operations.",
      recent:
        "Built and delivered the Codlean MES AI engine using live customer machine data. The next team step at handoff was SCADA screen integration.",
      cta: "Explore the work",
    },
    about: {
      label: "About",
      class: "Fırat University · Software Engineering graduate, 2026",
      statement:
        "I design the path from messy data to a decision someone can act on. My work spans live industrial signals, explainable models, APIs and interfaces — with ownership from architecture through delivery.",
      stats: ["Projects", "Conference papers", "Open dataset", "TEKNOFEST 2025"],
    },
    work: {
      label: "Selected work",
      featured: "Featured case study · Industrial AI",
      title: "Codlean MES",
      summary: "Turning live factory signals into explainable maintenance decisions.",
      intro:
        "I built the working AI engine behind an industrial fault prediction system: Kafka streams, predictive models, explainability, an on-premise LLM, five agents and an operator dashboard. The system ran with real customer data before handoff for SCADA screen integration.",
      metrics: ["Model AUC reported in CV", "Specialized AI agents", "Live customer data"],
      metricValues: ["98.5%", "5", "In use"],
      explore: "Read the case study",
      more: "Other work",
      view: "View project",
      visual: "Representative illustration",
      details: "Project details",
      challenge: "The challenge",
      contribution: "My contribution",
      result: "Result",
      caseStudy: "Read case study",
      close: "Close project details",
    },
    experience: {
      label: "Experience",
      title: "From model to working system.",
      intro:
        "The strongest work is measured by what reaches a real workflow. These roles took me from research and model evaluation to software delivered for operational use.",
    },
    research: {
      label: "Research",
      paper: "Conference paper",
      dataset: "Dataset",
      book: "ICSIS 2025 proceedings",
      page: "p.",
      open: "Open source",
    },
    skills: {
      label: "Capabilities",
      title: "The tools follow the problem.",
      intro:
        "I connect data engineering, models and product delivery so the result works beyond a notebook and makes sense to the person using it.",
    },
    contact: {
      label: "Contact",
      title: "Let's build something that works in the real world.",
      cta: "Start a conversation",
      talk: "Let's Talk",
      city: "Built in Istanbul",
      cvTitle: "Download my CV",
      software: "Software Engineering CV",
      ai: "AI / ML Engineering CV",
      phone: "Phone",
    },
  },
  tr: {
    nav: {
      work: "Projeler",
      about: "Hakkımda",
      contact: "İletişim",
      menu: "Menü",
      close: "Menüyü kapat",
      motionOn: "Hareket: Açık",
      motionOff: "Hareket: Kapalı",
    },
    hero: {
      phrases: ["Yazılım Mühendisi", "Endüstriyel Yapay Zekâ", "Araştırmacı", "Ürün Geliştirici"],
      eyebrow: "Canlı veriden çalışan sistemlere",
      headline: "Gerçek operasyonlar için çalışan yapay zekâ sistemleri kuruyorum.",
      recent:
        "Codlean MES yapay zekâ motorunu gerçek müşteri makine verileriyle geliştirip teslim ettim. Teslim sırasında sonraki ekip adımı SCADA ekran bağlantısıydı.",
      cta: "Çalışmaları incele",
    },
    about: {
      label: "Hakkımda",
      class: "Fırat Üniversitesi · Yazılım Mühendisliği mezunu, 2026",
      statement:
        "Karmaşık veriden insanların harekete geçebileceği kararlara uzanan yolu tasarlıyorum. Canlı endüstriyel veriler, açıklanabilir modeller, API'ler ve arayüzler üzerinde; mimariden teslime kadar sorumluluk alıyorum.",
      stats: ["Proje", "Konferans makalesi", "Açık veri seti", "TEKNOFEST 2025"],
    },
    work: {
      label: "Seçili çalışmalar",
      featured: "Öne çıkan vaka incelemesi · Endüstriyel yapay zekâ",
      title: "Codlean MES",
      summary: "Canlı fabrika sinyallerini açıklanabilir bakım kararlarına dönüştürmek.",
      intro:
        "Endüstriyel arıza tahmin sisteminin çalışan yapay zekâ motorunu geliştirdim: Kafka veri akışları, tahmin modelleri, açıklanabilirlik, kurum içinde çalışan LLM, beş ajan ve operatör paneli. Sistem gerçek müşteri verileriyle çalıştı; SCADA ekran bağlantısı için ekibe devredildi.",
      metrics: [
        "CV'de raporlanan model AUC",
        "Uzmanlaşmış yapay zekâ ajanı",
        "Gerçek müşteri verisi",
      ],
      metricValues: ["%98,5", "5", "Kullanıldı"],
      explore: "Vaka incelemesini oku",
      more: "Diğer çalışmalar",
      view: "Projeyi incele",
      visual: "Temsili çizim",
      details: "Proje ayrıntıları",
      challenge: "Problem",
      contribution: "Katkım",
      result: "Sonuç",
      caseStudy: "Vaka incelemesini oku",
      close: "Proje ayrıntılarını kapat",
    },
    experience: {
      label: "Deneyim",
      title: "Modelden çalışan sisteme.",
      intro:
        "En güçlü çalışma, gerçek bir iş akışına ulaşandır. Bu deneyimler beni araştırma ve model değerlendirmesinden operasyonel kullanıma sunulan yazılımlara taşıdı.",
    },
    research: {
      label: "Araştırma",
      paper: "Konferans makalesi",
      dataset: "Veri seti",
      book: "ICSIS 2025 bildiri kitabı",
      page: "s.",
      open: "Kaynağı aç",
    },
    skills: {
      label: "Yetkinlikler",
      title: "Araçlar problemi izler.",
      intro:
        "Veri mühendisliğini, modelleri ve ürün geliştirmeyi birleştiriyorum; sonuç bir defterin dışında çalışmalı ve onu kullanan kişi için anlamlı olmalı.",
    },
    contact: {
      label: "İletişim",
      title: "Gerçek dünyada işe yarayan bir şey inşa edelim.",
      cta: "İletişime geç",
      talk: "Konuşalım",
      city: "İstanbul'da geliştirildi",
      cvTitle: "Özgeçmişlerimi indir",
      software: "Yazılım Mühendisliği CV",
      ai: "Yapay Zekâ / ML CV",
      phone: "Telefon",
    },
  },
} as const;

export type Project = {
  title: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  challenge: string;
  contribution: string;
  result: string;
  stack: string[];
  image?: string;
  links: { label: string; href: string }[];
  caseStudy?: boolean;
  priority?: boolean;
};

const sharedLinks = {
  mes: [{ label: "Core repository", href: "https://github.com/RAhsencicek/codleanMES" }],
  sara: [
    { label: "iOS repository", href: "https://github.com/RAhsencicek/sa-ra" },
    { label: "BLE mesh repository", href: "https://github.com/RAhsencicek/Sa-Ra-BLE-mesh" },
  ],
};

export const projects: Record<Locale, Project[]> = {
  en: [
    {
      title: "Codlean MES",
      category: "Industrial AI",
      role: "AI Engine Developer · Atasayar Teknoloji",
      year: "2026",
      summary: copy.en.work.summary,
      challenge:
        "Turn live HPR machine signals into useful fault predictions and operator decisions.",
      contribution:
        "I built the Kafka pipeline, predictive model, SHAP and DLIME explanations, on-premise Llama 3.1 integration, five-agent analysis workflow, APIs and dashboard.",
      result:
        "The complete system worked with real customer data. At handoff, the team was preparing SCADA screen integration. The model AUC reported in my CV was 98.5%.",
      stack: ["Kafka", "FastAPI", "XGBoost", "SHAP", "Llama 3.1", "Multi-agent"],
      image: "/images/mes-dashboard.png",
      links: sharedLinks.mes,
      caseStudy: true,
    },
    {
      title: "Sa-Ra",
      category: "Emergency communication",
      role: "Team lead · TEKNOFEST 2025 finalist",
      year: "2024–25",
      priority: true,
      summary: "A resilient BLE / LoRa mesh communication system for disrupted infrastructure.",
      challenge:
        "Keep devices communicating when conventional infrastructure is unavailable or disrupted.",
      contribution:
        "Led a three-person team across ESP32 BLE / LoRa mesh architecture, Python signal simulations, anti-jamming strategies, adaptive modulation, documentation and an iOS companion app.",
      result: "Reached the TEKNOFEST 2025 finals and received TÜBİTAK 2209-A research funding.",
      stack: ["ESP32", "C / C++", "BLE / LoRa", "SwiftUI"],
      image: teknofestImg,
      links: sharedLinks.sara,
    },
    {
      title: "DIBaS benchmark",
      category: "AI research · Edge inference",
      role: "Software & AI Engineer · Kriptarium",
      year: "2025",
      priority: true,
      summary: "Compared 20+ CNN and ViT models on a 33-class bacterial imaging dataset.",
      challenge: "Find an accurate model that could also move toward edge deployment.",
      contribution:
        "Benchmarked CNN and ViT architectures, then optimized deployment paths with ONNX Runtime, CoreML and TorchScript.",
      result:
        "The current CV reports 95.45% top-1 benchmark accuracy; the work also contributed to a conference paper.",
      stack: ["PyTorch", "TensorFlow", "ONNX", "CoreML"],
      image: opcaImg,
      links: [
        {
          label: "Conference proceedings · p. 54",
          href: "https://drive.google.com/file/d/1pjG0aHZw5piFt4Lz5OUdwhewleO_YBNg/view",
        },
      ],
    },
    {
      title: "Pharmora",
      category: "B2B platform",
      role: "Software developer",
      year: "2024–25",
      summary: "Web and mobile software for pharmacy inventory exchange.",
      challenge: "Make surplus medication exchange easier to manage across interfaces.",
      contribution:
        "Built a React dashboard, Node.js / Express API, MongoDB data layer and SwiftUI mobile client with barcode scanning and OpenFDA integration.",
      result: "Delivered a containerized full-stack product with web and native mobile clients.",
      stack: ["React", "Node.js", "MongoDB", "SwiftUI"],
      image: pharmoraImg,
      links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/Pharmora" }],
    },
    {
      title: "GreenGuard",
      category: "Desktop analytics",
      role: "Team lead & developer",
      year: "2025–26",
      summary: "Sensor-driven plant care analysis and recommendations.",
      challenge: "Turn plant sensor readings into a usable health assessment.",
      contribution:
        "Developed a C# / .NET desktop application, decision-tree health score, sensor anomaly detection and NLP care recommendations.",
      result: "Built a decision-support workflow connecting sensor status to care recommendations.",
      stack: ["C# / .NET", "SQL Server", "Decision trees", "NLP"],
      image: greenguardImg,
      links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/G-G" }],
    },
    {
      title: "Metrika",
      category: "Analytics dashboard",
      role: "Frontend lead · Three-person team",
      year: "2024–25",
      summary: "Project management and real-time KPI dashboard.",
      challenge: "Make changing performance indicators clear and useful.",
      contribution:
        "Led the React and TypeScript frontend and established code quality conventions.",
      result: "The frontend was deployed on Vercel; implementation is available on GitHub.",
      stack: ["React 19", "TypeScript", "Vite", "Tailwind"],
      image: metrikaImg,
      links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/Metrika" }],
    },
    {
      title: "Ergin Soy İnşaat",
      category: "Client website",
      role: "Designer & developer",
      year: "2024",
      summary: "A responsive corporate website delivered for a construction company.",
      challenge: "Give a local business a credible presence on desktop and mobile.",
      contribution: "Designed and built the responsive site as an independent client project.",
      result: "Published the working website for the client.",
      stack: ["Web design", "Responsive UI", "Frontend"],
      image: erginsoyImg,
      links: [
        { label: "Live website", href: "https://erginsoyinsaat.com" },
        { label: "GitHub repository", href: "https://github.com/RAhsencicek/erginsoy_insaat" },
      ],
    },
    {
      title: "VisionVet-AI",
      category: "Mobile computer vision",
      role: "AI and mobile development",
      year: "2025",
      summary: "On-device veterinary imaging through smartphone microscopy.",
      challenge: "Explore accessible visual screening for animal health.",
      contribution: "Worked on CNN image analysis and mobile inference using ONNX and CoreML.",
      result:
        "Built the imaging and model pipeline toward a mobile veterinary screening prototype with clinical partners.",
      stack: ["PyTorch", "ONNX", "CoreML", "iOS"],
      image: visionVetImg,
      links: [{ label: "GitHub repository", href: "https://github.com/RAhsencicek/VisionVet-AI" }],
    },
  ],
  tr: [],
};

const turkishLinkLabels: Record<string, string> = {
  "Core repository": "Ana sistem kodu",
  "iOS repository": "iOS kodu",
  "BLE mesh repository": "BLE ağ kodu",
  "Conference proceedings · p. 54": "Konferans kitabı · s. 54",
  "GitHub repository": "GitHub kodu",
  "Live website": "Canlı web sitesi",
};
projects.tr = projects.en.map((project) => ({
  ...project,
  links: project.links.map((link) => ({
    ...link,
    label: turkishLinkLabels[link.label] ?? link.label,
  })),
}));
Object.assign(projects.tr[0], {
  category: "Endüstriyel yapay zekâ",
  role: "Yapay Zekâ Motoru Geliştiricisi · Atasayar Teknoloji",
  summary: copy.tr.work.summary,
  challenge:
    "Canlı HPR makine sinyallerini arıza tahmini ve operatör kararları için kullanılabilir kılmak.",
  contribution:
    "Kafka hattını, tahmin modelini, SHAP ve DLIME açıklamalarını, kurum içinde çalışan Llama 3.1 entegrasyonunu, beş ajanlı analiz akışını, API'leri ve paneli geliştirdim.",
  result:
    "Sistem gerçek müşteri verileriyle çalıştı. Teslim sırasında ekibin sonraki adımı SCADA ekran bağlantısıydı. CV'mde raporlanan model AUC değeri %98,5.",
});
Object.assign(projects.tr[1], {
  category: "Acil durum iletişimi",
  role: "Takım lideri · TEKNOFEST 2025 finalisti",
  summary: "Kesintiye uğramış altyapı için dayanıklı BLE / LoRa ağ iletişim sistemi.",
  challenge: "Geleneksel iletişim altyapısı yokken cihazların bağlantısını sürdürmek.",
  contribution:
    "Üç kişilik ekibe ESP32 BLE / LoRa ağ mimarisi, Python sinyal simülasyonları, jammer dayanımı, adaptif modülasyon, dokümantasyon ve iOS yardımcı uygulaması boyunca liderlik ettim.",
  result: "TEKNOFEST 2025 finaline ulaştık ve TÜBİTAK 2209-A araştırma desteği aldık.",
});
Object.assign(projects.tr[2], {
  category: "Yapay zekâ araştırması · Uç cihaz",
  role: "Yazılım ve Yapay Zekâ Mühendisi · Kriptarium",
  summary:
    "33 sınıflı bakteri görüntü veri setinde 20'den fazla CNN ve ViT modelini karşılaştırdım.",
  challenge: "Uç cihaza taşınabilecek doğru bir model bulmak.",
  contribution:
    "CNN ve ViT mimarilerini karşılaştırıp ONNX Runtime, CoreML ve TorchScript ile dağıtım yollarını iyileştirdim.",
  result:
    "Güncel CV'de en iyi sınıflandırma doğruluğu %95,45 olarak raporlanıyor; çalışma konferans makalesine de katkı sağladı.",
});
Object.assign(projects.tr[3], {
  category: "B2B platform",
  role: "Yazılım geliştirici",
  summary: "Eczaneler arası ilaç stok değişimi için web ve mobil yazılım.",
  challenge: "Fazla ilaç stokunun farklı arayüzlerde yönetimini kolaylaştırmak.",
  contribution:
    "React paneli, Node.js / Express API, MongoDB katmanı ve barkod tarama ile OpenFDA entegrasyonlu SwiftUI uygulaması geliştirdim.",
  result: "Web ve yerel mobil istemcileri olan full-stack ürünü teslim ettim.",
});
Object.assign(projects.tr[4], {
  category: "Masaüstü analitiği",
  role: "Takım lideri ve geliştirici",
  summary: "Sensör verisine dayalı bitki bakımı analizi ve önerileri.",
  challenge: "Bitki sensör okumalarını anlaşılır sağlık değerlendirmesine dönüştürmek.",
  contribution:
    "C# / .NET uygulaması, karar ağacıyla sağlık puanı, sensör anomali tespiti ve NLP bakım önerileri geliştirdim.",
  result: "Sensör durumu ile bakım önerilerini birleştiren karar destek akışı kurdum.",
});
Object.assign(projects.tr[5], {
  category: "Analitik paneli",
  role: "Frontend lideri · Üç kişilik ekip",
  summary: "Proje yönetimi ve gerçek zamanlı KPI paneli.",
  challenge: "Değişen performans göstergelerini açık ve kullanışlı sunmak.",
  contribution: "React ve TypeScript ön yüzüne liderlik edip kod kalitesi kurallarını oluşturdum.",
  result: "Ön yüz Vercel'de yayımlandı; kodu GitHub'da bulunuyor.",
});
Object.assign(projects.tr[6], {
  category: "Müşteri web sitesi",
  role: "Tasarımcı ve geliştirici",
  summary: "Bir inşaat şirketine teslim edilen duyarlı kurumsal web sitesi.",
  challenge: "Yerel bir işletmeye masaüstü ve mobilde güven veren bir dijital görünürlük sağlamak.",
  contribution: "Bağımsız müşteri projesi olarak duyarlı siteyi tasarlayıp geliştirdim.",
  result: "Çalışan web sitesini müşteriye yayımladım.",
});
Object.assign(projects.tr[7], {
  category: "Mobil bilgisayarlı görü",
  role: "Yapay zekâ ve mobil geliştirme",
  summary: "Telefon mikroskopisiyle cihaz üzerinde veteriner görüntü analizi.",
  challenge: "Hayvan sağlığı için erişilebilir görüntü taraması araştırmak.",
  contribution: "ONNX ve CoreML ile CNN görüntü analizi ve mobil çıkarım üzerinde çalıştım.",
  result:
    "Klinik paydaşlarla mobil veteriner tarama prototipine yönelik görüntü ve model hattı geliştirdim.",
});

export const experience = {
  en: [
    {
      company: "Atasayar Teknoloji (Codlean)",
      location: "Düzce, Türkiye",
      role: "AI Engine Developer · Co-op",
      period: "Feb — Jun 2026",
      theme: "Industrial AI · Client delivery",
      summary:
        "Owned the AI engine of a working MES, from live customer machine data to explainable operator decisions.",
      metrics: [
        { value: "98.5%", label: "model AUC reported in CV" },
        { value: "5", label: "specialized AI agents" },
        { value: "Live", label: "customer machine data" },
      ],
      details: [
        "Built Kafka and FastAPI pipelines, validation and state handling for live machine signals.",
        "Developed the XGBoost fault model, SHAP and DLIME explanations, and a local Llama 3.1 assistant.",
        "Delivered the working system; SCADA screen integration was the next team step after handoff.",
      ],
    },
    {
      company: "Kriptarium LTD. ŞTİ.",
      location: "Elazığ, Türkiye",
      role: "Software & AI Engineer · Internship",
      period: "Aug — Oct 2025",
      theme: "Computer vision · Edge deployment",
      summary:
        "Compared medical-image models and moved the selected pipeline toward mobile deployment.",
      metrics: [
        { value: "20+", label: "CNN and ViT models" },
        { value: "33", label: "DIBaS classes" },
        { value: "95.45%", label: "accuracy reported in CV" },
      ],
      details: [
        "Benchmarked CNN and ViT architectures on the 33-class DIBaS dataset.",
        "Prepared ONNX Runtime, CoreML and TorchScript paths and built an Android companion app.",
        "Joined TÜBİTAK BiGG CUBE with teammates; the application was shortlisted.",
      ],
    },
  ],
  tr: [
    {
      company: "Atasayar Teknoloji (Codlean)",
      location: "Düzce, Türkiye",
      role: "Yapay Zekâ Motoru Geliştiricisi · İşyeri eğitimi",
      period: "Şub — Haz 2026",
      theme: "Endüstriyel yapay zekâ · Müşteri teslimi",
      summary:
        "Gerçek müşteri makine verilerinden açıklanabilir operatör kararlarına uzanan çalışan MES yapay zekâ motorunun sorumluluğunu aldım.",
      metrics: [
        { value: "%98,5", label: "CV'de raporlanan model AUC" },
        { value: "5", label: "uzmanlaşmış yapay zekâ ajanı" },
        { value: "Canlı", label: "müşteri makine verisi" },
      ],
      details: [
        "Canlı sinyaller için Kafka ve FastAPI hatlarını, doğrulama ve durum yönetimini kurdum.",
        "XGBoost arıza modeli, SHAP ve DLIME açıklamaları ile yerel Llama 3.1 asistanını geliştirdim.",
        "Çalışan sistemi teslim ettim; SCADA ekran bağlantısı devrin ardından ekibin sonraki adımıydı.",
      ],
    },
    {
      company: "Kriptarium LTD. ŞTİ.",
      location: "Elazığ, Türkiye",
      role: "Yazılım ve Yapay Zekâ Mühendisi · Staj",
      period: "Ağu — Eki 2025",
      theme: "Bilgisayarlı görü · Uç cihaz",
      summary:
        "Tıbbi görüntü modellerini karşılaştırıp seçilen hattı mobil kullanıma yaklaştırdım.",
      metrics: [
        { value: "20+", label: "CNN ve ViT modeli" },
        { value: "33", label: "DIBaS sınıfı" },
        { value: "%95,45", label: "CV'de raporlanan doğruluk" },
      ],
      details: [
        "33 sınıflı DIBaS veri setinde CNN ve ViT mimarilerini karşılaştırdım.",
        "ONNX Runtime, CoreML ve TorchScript yollarını hazırlayıp Android yardımcı uygulaması geliştirdim.",
        "Ekip arkadaşlarımla TÜBİTAK BiGG CUBE programına katıldım; başvurumuz ön elemeye kaldı.",
      ],
    },
  ],
};

export const capabilities = {
  en: [
    {
      title: "Industrial data & AI",
      description:
        "Live pipelines, risk scoring, predictive maintenance and operator-facing decision support.",
      tools: ["Python", "Apache Kafka", "FastAPI", "XGBoost"],
    },
    {
      title: "Explainable & deployable models",
      description:
        "Evaluating models, explaining their outputs and preparing inference for constrained devices.",
      tools: ["PyTorch", "SHAP", "DLIME", "ONNX", "CoreML"],
    },
    {
      title: "Products people use",
      description:
        "APIs and interfaces across web, mobile and desktop that bring engineering into a real workflow.",
      tools: ["React", "TypeScript", "SwiftUI", "Kotlin", ".NET"],
    },
  ],
  tr: [
    {
      title: "Endüstriyel veri ve yapay zekâ",
      description: "Canlı veri hatları, risk puanlama, kestirimci bakım ve operatör karar desteği.",
      tools: ["Python", "Apache Kafka", "FastAPI", "XGBoost"],
    },
    {
      title: "Açıklanabilir ve uygulanabilir modeller",
      description:
        "Modelleri değerlendirme, çıktılarını açıklama ve kısıtlı cihazlar için çıkarım hazırlama.",
      tools: ["PyTorch", "SHAP", "DLIME", "ONNX", "CoreML"],
    },
    {
      title: "İnsanların kullandığı ürünler",
      description:
        "Mühendisliği gerçek iş akışlarına taşıyan web, mobil ve masaüstü API ve arayüzleri.",
      tools: ["React", "TypeScript", "SwiftUI", "Kotlin", ".NET"],
    },
  ],
};
