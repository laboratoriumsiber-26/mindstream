# MINDSTREAM EDU (PIPD UIN SIBER) - PROJECT STATE & ARCHITECTURE
**Terakhir Diperbarui:** 17 Agustus 2026
**Status Proyek:** MVP (Minimum Viable Product) Telah Selesai.

Dokumen ini adalah **titik jangkar (checkpoint)** untuk Model AI atau Developer manusia yang akan melanjutkan pengembangan aplikasi ini. Tolong baca dokumen ini sebelum melakukan perubahan kode atau arsitektur apa pun.

## 1. Arsitektur Utama (Tech Stack)
- **Frontend Framework:** React 18 (TypeScript) dengan Vite.
- **Routing:** `react-router-dom` v6.
- **Styling:** Vanilla CSS (`index.css`) dengan pendekatan CSS Variables (`:root`) untuk mempermudah sistem *Theming* dan *Glassmorphism*. Tidak menggunakan TailwindCSS atau framework CSS eksternal.
- **State Management:** React Context API (`AppContext.tsx`).
- **Database / Backend:** Firebase Firestore (saat ini masih menggunakan data *mock* lokal di `AppContext.tsx` untuk MVP, yang disimulasikan agar memiliki struktur mirip Firestore).

## 2. Struktur Direktori Kunci
- `/src/App.tsx` : Konfigurasi rute utama dan pembungkus tema.
- `/src/index.css` : Sistem desain inti (warna, tipografi, animasi seperti `slideUp`, desain kelas `.glass-card`).
- `/src/context/AppContext.tsx` : Otak utama dari sistem data (*state*). Berisi simulasi *login*, penyimpanan data dalam bentuk tabel/koleksi, dan daftar *array* awal.
- `/src/utils/config.ts` : Konfigurasi struktur tabel untuk dasbor. Semua menu *Sidebar* dan kolom tabel (termasuk CMS) didefinisikan di sini.
- `/src/components/Layout/` :
  - `PublicLayout.tsx` : Bungkus utama (Header & Footer) untuk semua halaman publik.
  - `Sidebar.tsx` : Navigasi samping khusus untuk halaman Dasbor Admin.
- `/src/components/UI/` : Komponen interaktif guna-ulang (*reusable*), seperti `FormModal.tsx` (yang sudah cerdas mengenali `<textarea>`), `Table.tsx`, dan `VideoCard.tsx`.

## 3. Modul yang Telah Selesai (Fitur Saat Ini)
1. **Sistem Autentikasi (Hardcoded untuk MVP):**
   - Halaman Login (`/login`) dengan tombol *Toggle* Mata (lihat/sembunyikan password) dan animasi *Loading Spinner*.
   - Kredensial *Superadmin* telah disetel secara absolut ke (Username: `superadmin`, Password: `superadmin123`).
2. **Dashboard & Manajemen Data (Backend):**
   - Mendukung manipulasi master data: Video Pembelajaran, Podcast, Story Board, dll.
   - Sistem tabel yang secara otomatis melakukan *render* kolom berdasarkan `config.ts`.
   - Modul analitik, rekapitulasi data (Ekspor CSV), dan Leaderboard kinerja editor/uploader.
3. **Public View & Headless CMS (Frontend):**
   - *Public Showcase* (`/`), *Tentang* (`/tentang`), *Layanan* (`/layanan`), *Tim PIPD* (`/tim-pipd`), dan *Titik Temu* (`/titik-temu`).
   - Halaman publik ini bukan statis, melainkan digerakkan oleh **Sistem CMS** di dalam dasbor Admin (CMS Hero Slider, CMS Layanan, CMS Artikel).

## 4. Konvensi Desain (UI/UX)
Sistem ini menggunakan bahasa desain masa depan (*Futuristic / Glassmorphism*):
- Latar belakang utama bernuansa gelap (`#0f172a`).
- Penggunaan efek kaca (`backdrop-filter: blur()`).
- Warna aksen *(vibrant)*: *Purple/Magenta* dipadukan dengan *Cyan/Emerald*.
- Segala aksi *asynchronous* (seperti Login, Simpan Data, Hapus Data) **WAJIB** menyertakan *loading skeleton* atau *spinner icon* (`progress_activity` dengan animasi *spin*) agar pengguna tidak kebingungan.
- Segala bentuk ikon mengambil dari Google Material Symbols Outlined.

## 5. Tugas Selanjutnya (Next Steps)
Jika Anda (AI Model) diinstruksikan untuk melanjutkan pekerjaan, berikut adalah fitur yang belum diimplementasikan:
1. **Integrasi Firebase Asli:** Memindahkan logika `AppContext.tsx` agar benar-benar menembak *endpoint* Firestore sesungguhnya.
2. **Sistem Gambar Dinamis:** Mengganti input URL/Teks biasa pada CMS Slider/Artikel menjadi sistem unggah berkas (*file upload*) ke Firebase Storage.
3. **Rich Text Editor:** Mengganti `<textarea>` pada FormModal CMS Artikel menjadi editor WYSIWYG (seperti *React Quill* atau *Draft.js*) agar Admin bisa melakukan *formatting* teks (*bold*, *italic*, sisipkan gambar).

---
**Instruksi untuk Model AI Selanjutnya:** 
"Saya (AI sebelumnya) telah mempersiapkan kerangka ini dengan sangat solid dan modular. Jika Anda diminta membuat fitur baru, bacalah `config.ts` dan `AppContext.tsx` terlebih dahulu. Pertahankan estetika *glassmorphism* di `index.css`. Jangan gunakan metode yang berbelit-belit. *Good luck!*"
