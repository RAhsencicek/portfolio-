# rumeysahsencicekdesign.tech — Portfolio

Rümeysa Ahsen Çiçek'in kişisel portfolyosu. Endüstriyel yapay zekâ, yazılım projeleri ve araştırma çalışmalarını İngilizce ve Türkçe sunar. Bu depo sitenin kanonik kaynak kodudur.

> Interactive 3D portfolio of Rumeysa Ahsen Çiçek — built with TanStack Start, React Three Fiber, and Tailwind CSS.

---

## ✨ Öne Çıkan Özellikler

- 🐱 **Etkileşimli 3D masa sahnesi** — gözlüklü kedi karakteri, masa lambası, kahve kupası, dizüstü bilgisayar, kitap yığını ve İngiliz sarmaşığı
- 🕒 **Gerçek zamanlı dijital masa saati** (saat:dakika canlı tick)
- 🌌 **Hareket tercihine duyarlı animasyonlar** (Framer Motion + Lenis)
- 🎨 **Mor/violet temalı dark mode** — `oklch` tabanlı semantic design tokens
- 📱 **Responsive** mobil-masaüstü uyumu ve mobil gezinme
- 🌍 **İngilizce/Türkçe** ana sayfa ve MES vaka incelemesi
- 📄 **İndirilebilir güncel CV'ler** ve yeniden üretilebilir PDF kaynak betiği
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

Terminalde gösterilen yerel adrese gidin. Vite farklı bir port seçebilir.

### Ortam Değişkenleri

Portfolyo içeriği statiktir; harici API anahtarı veya veritabanı gerektirmez. Uygulama TanStack Start ile sunucu tarafında da işlenir.

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
│   │   ├── index.tsx           # İngilizce ana sayfa
│   │   ├── tr.tsx              # Türkçe sayfalar
│   │   └── work/              # MES vaka incelemesi
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
├── public/cv/                  # İndirilebilir CV PDF'leri
├── scripts/generate-cvs.py     # CV kaynak betiği
├── package.json
└── vite.config.ts
```

---

## 🌍 Dağıtım (Deployment)

Bu depo (`RAhsencicek/portfolio-`) kaynak kodun sahibi ve temelidir. [Canlı alan adı](https://rumeysahsencicekdesign.tech/) şu anda Lovable projesiyle yayınlanıyor. Lovable GitHub Sync ayrı `RAhsencicek/repo-charm-sync` deposunu izliyor; bu yüzden bu depoya push etmek tek başına canlı yayını değiştirmez. Yayın akışı: burada doğrula ve commit et, değişiklikleri eşitleme deposuna aktar, Lovable'da **Publish changes** ile yayınla, alan adında kontrol et.

TanStack Start, Cloudflare Workers / Vercel / Netlify / Node sunucu hedeflerini de destekler. Alternatif dağıtım seçenekleri:

Başka barındırma sağlayıcısına geçerken bu depoyu klonlayıp TanStack Start uygulamasını hedef platformda derleyin. Portfolyo içeriği Lovable veritabanına bağlı değildir; yeni sağlayıcının TanStack Start sunucu çıktısı ve yönlendirmeleri için gereken yapılandırmasını ayrıca doğrulayın.

## CV güncelleme

`public/cv/` altındaki iki PDF, Rümeysa'nın sağladığı özgün CV dosyalarının birebir kopyalarıdır. `scripts/generate-cvs.py` önceki taslaklara aittir; çalıştırılması bu PDF'lerin üzerine farklı içerik yazar. CV güncellemesi için özgün PDF'leri aynı dosya adlarıyla değiştirin ve iki indirme bağlantısını kontrol edin.

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
