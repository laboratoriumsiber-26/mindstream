# MINDSTREAM EDU (PIPD UIN SIBER) - PROJECT STATE & ARCHITECTURE
**Terakhir Diperbarui:** 18 Agustus 2026
**Status Proyek:** Pengembangan Lanjutan & Penyempurnaan Alur Kerja

Dokumen ini adalah **titik jangkar (checkpoint)** untuk Model AI atau Developer manusia yang akan melanjutkan pengembangan aplikasi ini. Tolong baca dokumen ini sebelum melakukan perubahan kode atau arsitektur apa pun.

## 1. Arsitektur Utama (Tech Stack)
- **Frontend Framework:** React 18 (TypeScript) dengan Vite.
- **Routing:** `react-router-dom` v6.
- **Styling:** Vanilla CSS (`index.css`) dengan pendekatan CSS Variables (`:root`) untuk mempermudah sistem *Theming* dan *Glassmorphism*. Tidak menggunakan TailwindCSS atau framework CSS eksternal.
- **State Management:** React Context API (`AppContext.tsx`).
- **Database / Backend:** Menggunakan `LocalStorage` sepenuhnya agar data dapat disinkronkan secara *real-time* di tingkat lokal untuk fase *testing* tanpa khawatir kehilangan sinkronisasi dengan Firebase. Integrasi Firebase di non-aktifkan sementara.

## 2. Struktur Direktori Kunci
- `/src/App.tsx` : Konfigurasi rute utama dan pembungkus tema.
- `/src/index.css` : Sistem desain inti (warna, tipografi, animasi seperti `slideUp`, desain kelas `.glass-card`).
- `/src/context/AppContext.tsx` : Otak utama dari sistem data (*state*). Berisi penyimpanan ke `localStorage`, mutasi `addRow` / `updateRow`, dan `initialData`.
- `/src/utils/config.ts` : Konfigurasi struktur tabel untuk dasbor. Semua menu *Sidebar* dan kolom tabel (termasuk CMS) didefinisikan di sini. Menu dipisahkan antara **Ruang Uploader / Master Data** dan **Ruang Editor**.
- `/src/components/Layout/` :
  - `PublicLayout.tsx` : Bungkus utama (Header & Footer) untuk semua halaman publik.
  - `Sidebar.tsx` : Navigasi samping khusus untuk halaman Dasbor Admin.
- `/src/components/UI/` : Komponen interaktif, seperti `DataForm.tsx` (yang cerdas mengelola form dinamis dan upload RAW file), `Table.tsx` (yang melakukan *render* kolom dan lencana status), dan `VideoCard.tsx`.

## 3. Modul yang Telah Selesai (Fitur Saat Ini)
1. **Sistem Autentikasi:**
   - Kredensial *Superadmin* telah disetel secara absolut ke (Username: `superadmin`, Password: `superadmin123`).
2. **Dashboard & Manajemen Data (Backend):**
   - Mendukung manipulasi master data (*Dosen*, *Mata Kuliah*, dll) dengan input manual biasa.
   - **Pemisahan Alur Kerja**: Terdapat *Uploader* (menambah RAW Video, memilih Dosen & Mata Kuliah lewat *dropdown* yang terhubung dengan master data) dan *Editor* (mengubah status pekerjaan, mengunggah revisi/video final).
   - Form pintar di `DataForm.tsx` yang secara spesifik menampilkan antarmuka berbeda berdasarkan `pageId`.
   - Modul analitik, rekapitulasi data (Ekspor CSV).
3. **Public View & Headless CMS (Frontend):**
   - Halaman publik ini bukan statis, melainkan digerakkan oleh **Sistem CMS** di dalam dasbor Admin.

## 4. Konvensi Desain (UI/UX)
Sistem ini menggunakan bahasa desain masa depan (*Futuristic / Glassmorphism*):
- Latar belakang utama bernuansa gelap (`#0f172a`).
- Penggunaan efek kaca (`backdrop-filter: blur()`).
- Warna aksen *(vibrant)*: *Purple/Magenta* dipadukan dengan *Cyan/Emerald*.
- Desain *Upload Box* dikonfigurasi secara ringkas, elegan, proporsional, serta mengutamakan *Micro-interactions*.
- Lencana status (Status Badges) dibuat cerah dan di-*render* langsung oleh `Table.tsx`.

## 5. Tugas Selanjutnya (Next Steps)
Jika Anda (AI Model) diinstruksikan untuk melanjutkan pekerjaan, berikut adalah hal yang perlu diperhatikan:
1. **Rich Text Editor:** Mengganti `<textarea>` pada FormModal CMS Artikel menjadi editor WYSIWYG seperti *React Quill* (library sudah di-*import* namun belum digunakan sepenuhnya) agar Admin bisa melakukan *formatting* teks.
2. **Implementasi Firebase Real-time:** Saat *MVP* sudah *solid* secara lokal, integrasikan kembali sinkronisasi `Firestore` atau Storage jika ada request dari *user*.

---
**Instruksi untuk Model AI Selanjutnya:** 
"Saya (AI sebelumnya) telah memisahkan *logic* Uploader dan Editor, serta memindahkan seluruh manajemen memori ke `LocalStorage` agar *testing* berjalan mulus tanpa masalah *overwrite*. UI Form telah dirapihkan, dan `Table.tsx` kini mandiri me-*render* lencana status. Lanjutkan pekerjaan dengan tetap memperhatikan *mapping* kolom `config.ts` dan *state* di `AppContext.tsx`. Pertahankan desain yang estetik!"
