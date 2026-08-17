# Product Requirements Document (PRD)
**Project Name:** Sistem Informasi Manajemen Ekosistem Pembelajaran Digital (SIM-EPD)
**Target:** Pusat Inovasi Pembelajaran Digital UIN Siber Syekh Nurjati Cirebon
**Version:** 1.0

## 1. Latar Belakang & Tujuan
Pusat Inovasi Pembelajaran Digital membutuhkan platform terpusat untuk mengelola seluruh *workflow* produksi konten (modul, video pembelajaran, aset media sosial). Mengingat skala universitas yang besar, sistem harus mampu menangani ribuan antrean konten, terstruktur berdasarkan Kode Mata Kuliah (MK), dan *cost-effective* (menggunakan infrastruktur gratis).

## 2. Target Pengguna (Roles & Permissions)

* **Super Admin:** Mengelola pengaturan sistem, manajemen *role* pengguna, dan master data (Fakultas, Prodi, Kode MK).
* **Admin:** Memverifikasi pengajuan konten (dari dosen/user), mengalokasikan tugas (*assign task*) ke Editor, memantau *progress*, dan melakukan persetujuan akhir (*final approval*).
* **Editor (Video/Grafis):** Menerima *task*, mengunduh materi mentah (*raw*), mengunggah hasil *editing*, dan memperbarui status pengerjaan (*To Do, In Progress, Review*).
* **User (Dosen/Kreator):** Mengajukan permintaan pembuatan/editing konten, mengunggah materi mentah, dan memantau status penyelesaian konten mereka.

## 3. Fitur Utama

### 3.1. Modul Manajemen Master Data
* Manajemen Kode Mata Kuliah dan Dosen Pengampu.
* Manajemen Kategori Konten (Modul, Video Ceramah, Animasi, Konten Sosmed).

### 3.2. Sistem Manajemen *Workflow* (Kanban / List View)
* *Ticketing system* untuk setiap pengajuan konten.
* Status *tracking*: `Requested` -> `Assigned` -> `In Progress` -> `In Review` -> `Revision` -> `Completed`.
* Notifikasi *real-time* atau via email saat status tugas berubah.

### 3.3. Integrasi Penyimpanan Pihak Ketiga (Core Engine)
* Sistem tidak menyimpan *file* besar di *database*.
* File materi mentah dan hasil edit diunggah langsung ke **Google Drive** menggunakan integrasi Google Drive API.
* Sistem hanya menyimpan *metadata* (URL file, ukuran, tipe, uploader) di dalam *database* (Firebase).

## 4. Arsitektur Teknologi (Zero-Cost / Ekosistem Gratis)

* **Frontend:** Next.js (React) atau Vite.
* **Hosting Frontend:** Vercel atau Netlify (Free Tier).
* **Authentication:** Firebase Authentication (Mendukung Login dengan Akun Google `@syekhnurjati.ac.id`).
* **Database:** Firebase Firestore (NoSQL, Free Spark Plan - cocok untuk menyimpan data URL, teks, dan status *workflow*).
* **Storage Engine:** Google Drive API (Memanfaatkan Google Workspace for Education UIN Siber Syekh Nurjati yang memiliki kapasitas *storage* sangat besar).
* **State Management:** Zustand atau Redux.

## 5. Alur Kerja (User Journey)
1. **User (Dosen)** login, memilih Kode MK, dan membuat "Tiket Permintaan Video Pembelajaran".
2. **User** mengunggah file mentah via form (otomatis masuk ke Google Drive sistem).
3. **Admin** melihat tiket masuk, lalu melakukan *assign* kepada **Editor Video** tertentu.
4. **Editor** mendapatkan notifikasi, mengunduh file dari GDrive, mengedit, dan mengunggah hasil final.
5. **Admin** melakukan *review*. Jika oke, status berubah menjadi `Completed`.