# Development Task Breakdown
**Project:** SIM-EPD UIN Siber Syekh Nurjati
**Methodology:** Agile / Kanban

## Epic 1: Persiapan Infrastruktur & Repositori
* [ ] Buat repositori proyek di GitHub (misal: `sim-epd-uinssc`).
* [ ] Inisialisasi proyek Next.js dengan Tailwind CSS.
* [ ] Buat *project* baru di Firebase Console.
* [ ] Daftarkan *project* di Google Cloud Console untuk mendapatkan kredensial Google Drive API.
* [ ] Atur *Service Account* Google Cloud untuk menjembatani *upload* ke Google Drive tanpa limitasi sesi user.

## Epic 2: Autentikasi & Otorisasi Pengguna
* [ ] Integrasi Firebase Auth (Email/Password & Google Sign-in).
* [ ] Buat middleware Next.js untuk proteksi *route* berdasarkan login status.
* [ ] Buat sistem Role-Based Access Control (RBAC) agar halaman terenkapsulasi (Admin tidak bisa diakses Editor, dsb).
* [ ] Buat halaman Login dan *Dashboard* utama untuk masing-masing *role*.

## Epic 3: Pengembangan Master Data (Super Admin)
* [ ] Buat skema Firestore untuk tabel `users`, `kode_mk`, dan `fakultas`.
* [ ] Buat UI/UX form untuk menambah, mengedit, dan menghapus Kode MK.
* [ ] Buat halaman manajemen pengguna (mengubah status *role* user biasa menjadi Editor atau Admin).

## Epic 4: Integrasi Google Drive API (Core Storage)
* [ ] Buat fungsi utilitas (*helper*) di *backend* (API Routes) untuk otentikasi Service Account GDrive.
* [ ] Buat *endpoint* API untuk `uploadFile` (menerima *stream* file dari *client* dan meneruskannya ke GDrive).
* [ ] Buat *endpoint* API untuk `createFolder` (otomatis membuat folder GDrive berdasarkan Kode MK agar rapi).
* [ ] Buat *endpoint* API untuk mengambil tautan publik (*view/download link*) dari GDrive.

## Epic 5: Modul Manajemen Workflow & Task (Ticketing)
* [ ] Buat form pengajuan konten untuk *User/Dosen* (Pilih MK, Tulis Deskripsi, Upload File).
* [ ] Buat tabel `tasks` di Firestore untuk menyimpan metadata pekerjaan.
* [ ] Buat halaman *Kanban Board* atau *Data Table* untuk **Admin** (memantau semua *task*).
* [ ] Buat fitur *Assign Task* agar Admin dapat memilih Editor dari *dropdown*.
* [ ] Buat halaman *My Tasks* khusus **Editor** untuk melihat daftar pekerjaan yang ditugaskan kepada mereka.
* [ ] Buat form bagi Editor untuk mengubah status tugas dan mengunggah file final.

## Epic 6: Deployment & Finishing
* [ ] Uji coba batas kapasitas upload (*stress test* menggunakan file video >500MB).
* [ ] *Deploy* aplikasi ke Vercel.
* [ ] Konfigurasi *environment variables* (Firebase keys, Google Drive credentials) di Vercel.
* [ ] Atur *custom domain* (jika ada, misal: `epd.syekhnurjati.ac.id`).