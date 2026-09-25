# rumeysahsencicekdesign.tech — Portfolio

Rumeysa Ahsen Çiçek'in kişisel portfolyosu. Three.js ile inşa edilmiş etkileşimli 3D bir masa sahnesi, scroll ile tetiklenen yumuşak geçişler ve modern bir dark theme arayüz.

> Interactive 3D portfolio of Rumeysa Ahsen Çiçek — built with TanStack Start, React Three Fiber, and Tailwind CSS.

---

## ✨ Öne Çıkan Özellikler

- 🐱 **Etkileşimli 3D masa sahnesi** — gözlüklü kedi karakteri, masa lambası, kahve kupası, dizüstü bilgisayar, kitap yığını ve İngiliz sarmaşığı
- 🕒 **Gerçek zamanlı dijital masa saati** (saat:dakika canlı tick)
- 🌌 **Scroll-tetikli yumuşak bölüm geçişleri** (Framer Motion + Lenis)
- 🎨 **Mor/violet temalı dark mode** — `oklch` tabanlı semantic design tokens
- 📱 **Responsive** mobil-masaüstü uyumu
- ⚡ **TanStack Start v1 + Vite 7** — modern SSR-ready full-stack React 19 yapısı
- ♿ **Reduced-motion** ve **glasses toggle** erişilebilirlik seçenekleri

---

## 🛠️ Teknoloji Yığını

| Kategori | Kullanılanlar |
|----------|----------------|
| Framework | [TanStack Start v1](https://tanstack.com/start), React 19 |
| Build | Vite 7 |
| 3D | [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), Three.js |
| Animasyon | [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) |
| Styling | Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com/), Radix UI |
| Forms | React Hook Form + Zod |
| Dil | TypeScript (strict) |

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- **Node.js** 20+ veya **Bun** 1.0+
- WebGL2 destekli modern bir tarayıcı (Chrome, Edge, Firefox, Safari)

### Kurulum

```bash
# Repoyu klonla
git clone https://github.com/RAhsencicek/portfolio-.git
cd portfolio-

# Bağımlılıkları yükle (Bun önerilir)
bun install
# veya
npm install

# Geliştirme sunucusunu başlat
bun run dev
# veya
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

### Ortam Değişkenleri

Bu proje **tamamen frontend** — herhangi bir backend, API anahtarı veya `.env` dosyasına ihtiyaç duymaz. Doğrudan çalışır.

---

## 📦 Komutlar

| Komut | Açıklama |
|-------|----------|
| `bun run dev` | Geliştirme sunucusu (HMR, port 3000) |
| `bun run build` | Üretim için build |
| `bun run build:dev` | Development modda build (debug için) |
| `bun run preview` | Build edilmiş app'i lokal olarak preview |
| `bun run lint` | ESLint kontrolü |
| `bun run format` | Prettier ile format |

---

## 📁 Proje Yapısı

```
portfolio-/
├── src/
│   ├── routes/                 # TanStack file-based routing
│   │   ├── __root.tsx          # Root layout (HTML shell)
│   │   └── index.tsx           # Ana sayfa
│   ├── components/
│   │   ├── portfolio/          # Sahne ve içerik bölümleri
│   │   │   ├── Scene3D.tsx     # 3D masa sahnesi (R3F)
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Publications.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ScrollReveal.tsx
│   │   └── ui/                 # shadcn/ui bileşenleri
│   ├── styles.css              # Tailwind v4 + design tokens
│   └── router.tsx
├── public/                     # Statik dosyalar
├── package.json
└── vite.config.ts
```

---

## 🌍 Dağıtım (Deployment)

Bu sitenin canlı yayını Lovable üzerinden yönetilir ve [rumeysahsencicekdesign.tech](https://rumeysahsencicekdesign.tech/) alan adına bağlıdır. GitHub deposuna yapılan bir push tek başına canlı yayını güncellemez. Proje GitHub Sync ile bağlıysa değişiklikleri Lovable'a eşitleyip **Publish changes** ile yayınlayın; bağlı değilse yeni kodu Lovable projesine aktararak yayınlayın.

TanStack Start, Cloudflare Workers / Vercel / Netlify / Node sunucu hedeflerini de destekler. Alternatif dağıtım seçenekleri:

- **Cloudflare Workers** (varsayılan hedef): `bun run build` çıktısını `wrangler deploy` ile yayınla
- **Vercel**: Repoyu bağla, framework otomatik algılanır
- **Netlify**: `bun run build` + publish directory `dist/`
- **Statik export**: TanStack Start prerender özelliği ile statik HTML üret

---

## ♿ Erişilebilirlik

- `prefers-reduced-motion` desteği — sistem ayarına göre animasyonlar otomatik azalır
- Üst sağdaki **Motion: On/Off** toggle ile manuel kontrol
- Anlamsal HTML, alt metinler ve klavye odak yönetimi

---

## 📄 Lisans

Bu proje kişisel bir portfolyodur. Kod yapısını kendi projeniz için ilham olarak kullanabilirsiniz; içerik ve görsel varlıklar telif hakkıyla korunmaktadır.

---

## 📬 İletişim

- **Rumeysa Ahsen Çiçek**
- 🌐 [rumeysahsencicekdesign.tech](https://rumeysahsencicekdesign.tech/)
- 📍 İstanbul, Türkiye

---

