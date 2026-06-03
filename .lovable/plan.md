Proje frontend-only — Cloud/Supabase yok, env değişkeni yok. Clone → install → dev ile direkt çalışıyor. Yapacağım iş `README.md` oluşturmak ve siz indirip kendi reponuza push edeceksiniz.

## Yapılacaklar

1. **`README.md` oluştur** (kök dizinde) — Türkçe + İngilizce kısımlı, kapsamlı.
   - Üst başlık: "ahsencicek.dev — Portfolio"
   - Kısa tanıtım: Rumeysa Ahsen Çiçek'in 3D etkileşimli portfolyosu
   - Öne çıkan özellikler (3D masa sahnesi, kedi karakteri, gerçek zamanlı dijital saat, scroll animasyonları, dark theme, responsive)
   - Teknoloji yığını (TanStack Start v1, React 19, Vite 7, Three.js / R3F, Drei, Framer Motion, Tailwind v4, shadcn/ui, Lenis)
   - Hızlı başlangıç:
     ```
     git clone https://github.com/RAhsencicek/portfolio-.git
     cd portfolio-
     bun install        # veya npm install
     bun run dev
     ```
   - Komutlar tablosu (dev, build, build:dev, preview, lint, format)
   - Proje yapısı (src/routes, src/components/portfolio, src/components/ui)
   - Tarayıcı desteği (modern, WebGL2 gerekli)
   - Dağıtım notu (Vercel/Netlify/Cloudflare Workers — TanStack Start build çıktısı)
   - Lisans + iletişim

2. **Push talimatı** (chat cevabımda): Sol alt **Code** panelinden "Download codebase" ile zip indirip aşağıdaki gibi reponuza push edebilirsiniz:
   ```
   git init
   git remote add origin https://github.com/RAhsencicek/portfolio-.git
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main --force
   ```

## Dokunulmayacaklar
Hiçbir kaynak kod, varlık, sahne kodu, route veya bağımlılık değişmez. Sadece `README.md` eklenir (zaten yoksa).
