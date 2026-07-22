# Wisata Religi Desa Bugel

Website landing page resmi **Wisata Religi Makam Syekh Maulana Mangun Sejati**, Desa Bugel, Kecamatan Kedung, Kabupaten Jepara, Jawa Tengah.

🌐 **Live:** [wisatareligidesabugel.vercel.app](https://wisatareligidesabugel.vercel.app) *(deploy setelah push)*

---

## 📋 Tentang Proyek

Website ini dibangun sebagai media digital untuk mengenalkan sejarah, budaya, dan informasi wisata religi Desa Bugel kepada masyarakat luas dan peziarah. Dibuat dalam rangka **Program KKN** dengan tujuan melestarikan sejarah lokal secara digital.

### Fitur Utama
- ✅ Landing page modern & responsif (mobile-first)
- ✅ Animasi scroll reveal & entrance (GSAP)
- ✅ Navbar sticky dengan mobile hamburger menu
- ✅ Section: Hero, Tentang, Sejarah (Timeline), Tokoh, Haul, Galeri, Kontak
- ✅ Gallery dengan filter kategori & lightbox modal (klik foto → detail)
- ✅ Navigasi keyboard & swipe gesture di lightbox
- ✅ Link Google Maps langsung ke lokasi makam
- ✅ Footer informatif dengan CTA banner

---

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|-----------|-----------|
| HTML5 | Semantik, aksesibel |
| CSS3 | Custom properties, Grid, Flexbox |
| JavaScript (Vanilla) | ES6+, tanpa framework |
| [GSAP 3](https://gsap.com/) | Animasi & ScrollTrigger |
| [Phosphor Icons](https://phosphoricons.com/) | Icon library modern |
| [Google Fonts](https://fonts.google.com/) | DM Serif Display + DM Sans |

**Tidak ada build tool, tidak ada npm** — buka langsung di browser atau deploy ke static hosting.

---

## 📁 Struktur Proyek

```
bugel-web/
├── index.html          # Entry point utama
├── css/
│   └── style.css       # Semua styling (CSS Variables + komponen)
├── js/
│   └── main.js         # Semua interaktivitas (GSAP, lightbox, navbar)
├── img/                # ⚠️ Folder foto (KOSONG — perlu diisi)
│   ├── makam/
│   ├── haul/
│   ├── ziarah/
│   └── desa/
└── README.md
```

---

## 🖼️ TODO — Yang Masih Perlu Dilengkapi

### 🔴 Prioritas Tinggi

#### 1. Upload Foto Galeri
Folder `img/` saat ini **kosong**. Foto-foto berikut perlu dikumpulkan dan diupload:

| File | Kategori | Keterangan |
|------|----------|-----------|
| `img/makam/area-makam.jpg` | Makam | Foto area kompleks makam |
| `img/makam/gerbang-masuk.jpg` | Makam | Foto gerbang utama makam |
| `img/haul/kegiatan-haul.jpg` | Haul | Foto suasana kegiatan Haul |
| `img/haul/ribuan-peziarah.jpg` | Haul | Foto kerumunan peziarah saat Haul |
| `img/ziarah/suasana-ziarah.jpg` | Ziarah | Foto peziarah sedang berdoa |
| `img/desa/desa-bugel.jpg` | Desa | Foto suasana Desa Bugel |

Setelah foto tersedia, update `index.html` di bagian galeri — ganti `gallery__placeholder` dengan tag `<img>`:

```html
<!-- Sebelum (placeholder): -->
<div class="gallery__placeholder"><i class="ph ph-image"></i><span>Area Makam</span></div>

<!-- Sesudah (foto nyata): -->
<img src="img/makam/area-makam.jpg" alt="Area Makam Syekh Maulana Mangun Sejati" loading="lazy" />
```

#### 2. Foto Hero Background
Saat ini hero menggunakan background gelap + efek gradient. Opsional: tambahkan foto panorama makam/desa sebagai background dengan overlay.

Di `css/style.css`, cari `.hero` dan tambahkan:
```css
.hero {
  background-image: url('../img/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

---

### 🟡 Prioritas Sedang

#### 3. Info Kontak Lengkap
Di `index.html`, section kontak — update nomor telepon yang valid:
```html
<!-- Cari baris ini dan update: -->
<div><strong>Telepon</strong><span>+62 xxx-xxxx-xxxx</span></div>
```

#### 4. Generate & Pasang QR Code
Buat QR Code yang mengarah ke URL website ini menggunakan:
- [qr-code-generator.com](https://www.qr-code-generator.com/)
- Atau library JS: `npm install qrcode` (jika pakai Node)

Cetak QR Code dan pasang di:
1. Pintu masuk area makam
2. Depan makam Syekh Maulana Mangun Sejati
3. Papan informasi di Balai Desa

#### 5. Meta OG Tags untuk Social Sharing
Di `index.html` bagian `<head>`, tambahkan sebelum `</head>`:
```html
<meta property="og:title" content="Wisata Religi Desa Bugel — Jepara" />
<meta property="og:description" content="Makam Syekh Maulana Mangun Sejati, penyebar Islam di Jepara sejak abad ke-16." />
<meta property="og:image" content="https://[domain-lo]/img/og-image.jpg" />
<meta property="og:url" content="https://[domain-lo]" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

#### 6. Favicon
Tambahkan favicon di `index.html`:
```html
<!-- Ganti baris favicon yang ada dengan: -->
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
```

---

### 🟢 Prioritas Rendah / Opsional

#### 7. Google Analytics / Tracking Pengunjung
```html
<!-- Tambahkan sebelum </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### 8. Sitemap & robots.txt
Buat file `sitemap.xml` dan `robots.txt` di root folder untuk SEO.

#### 9. Konten Tambahan
- Tambah section **Agenda & Jadwal** (selain Haul — pengajian rutin, dll)
- Tambah section **Cara Menuju Lokasi** (dari kota Jepara, dari Kudus, dst)
- Update deskripsi galeri jika ada info lebih detail

---

## 🚀 Deploy ke Vercel

1. Push ke GitHub (langkah di bawah)
2. Buka [vercel.com](https://vercel.com) → **New Project**
3. Import repo `wisatareligidesabugel`
4. Framework Preset: **Other** (static HTML)
5. Root Directory: `bugel-web`
6. Klik **Deploy** ✅

Vercel akan otomatis deploy ulang setiap kali ada push ke branch `main`.

---

## 💻 Development Lokal

Tidak butuh instalasi apapun. Cukup:

```bash
# Pakai Live Server di VS Code, atau
# Buka langsung di browser:
start bugel-web/index.html

# Atau pakai Laragon (sudah ada):
# http://localhost/WisataReligiDesaBugel/bugel-web/
```

---

## 📝 Git Workflow

```bash
# Setelah update konten atau foto:
git add .
git commit -m "feat: tambah foto galeri area makam"
git push

# Vercel akan otomatis re-deploy
```

---

## 👥 Tim

Dibuat oleh tim **KKN Desa Bugel**, Kecamatan Kedung, Kabupaten Jepara.

Referensi konten:
- Istiana et al. (2017) — Cerita Rakyat di Jawa Tengah, Balai Bahasa Jawa Tengah
- Fadlilah & Na'am (2020) — Legenda Tokoh Jepara, Jurnal TEKNOBUGA UNNES
- Pemerintah Desa Bugel, Kecamatan Kedung — Asal Muasal Desa Bugel
- Wahyu Sugeng et al. (2023) — QR Code Rumah Adat dan Sign Board Desa Wisata Dokan

---

## 📄 Lisensi

© 2025 Wisata Religi Desa Bugel — Program KKN. All rights reserved.
