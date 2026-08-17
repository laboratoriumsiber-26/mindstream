export const tableConfigs: Record<string, { heads: string[] }> = {
  'daftar-akun': { heads: ['Nama Lengkap', 'Username/NIM/NIP', 'Jenis Kelamin', 'No WhatsApp', 'Email', 'Unit Kerja / Fakultas', 'Jabatan / Program Studi', 'Tanggal Lahir', 'Role'] },
  'daftar-admin': { heads: ['Nama Admin', 'Username', 'Status'] },
  'daftar-uploader': { heads: ['Nama Uploader', 'Username', 'Status'] },
  'daftar-editor': { heads: ['Nama Editor', 'Spesialisasi', 'Status'] },
  'daftar-user': { heads: ['Nama User', 'Email', 'Departemen'] },
  'klaster-dosen': { heads: ['Nama Dosen', 'Fakultas / Program Studi'] },
  'mata-kuliah': { heads: ['Kode MK', 'Nama Mata Kuliah'] },
  'video-pembelajaran': { heads: ['Judul Video Pembelajaran', 'Dosen', 'Story Board', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan'] },
  'podcast': { heads: ['Judul Video Podcast', 'RAW Video Podcast', 'Narasumber & Host', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan'] },
  'story-board': { heads: ['Judul Story Board', 'Dosen', 'Kode MK', 'Tautan / File'] },
  'video-podcast': { heads: ['Judul Video', 'Tanggal', 'Durasi'] },
  'cms-slider': { heads: ['Judul Slide', 'Subjudul', 'URL Gambar', 'Status'] },
  'cms-layanan': { heads: ['Nama Layanan', 'Deskripsi Singkat', 'Tautan Icon', 'Status'] },
  'cms-artikel': { heads: ['Judul Artikel', 'Penulis', 'Tanggal Publish', 'Isi Konten', 'Status'] }
};

export const pageDataMap: Record<string, { label: string }> = {
  'dashboard': { label: 'Dashboard' },
  'daftar-admin': { label: 'Daftar Admin' },
  'daftar-uploader': { label: 'Daftar Uploader' },
  'daftar-editor': { label: 'Daftar Editor' },
  'daftar-user': { label: 'Daftar User' },
  'klaster-dosen': { label: 'Klaster Dosen' },
  'mata-kuliah': { label: 'Mata Kuliah' },
  'video-pembelajaran': { label: 'Video Pembelajaran' },
  'podcast': { label: 'Podcast' },
  'story-board': { label: 'Story Board' },
  'video-podcast': { label: 'Video Podcast' },
  'pelaporan': { label: 'Rekapitulasi Laporan' },
  'cms-slider': { label: 'Manajemen Hero Slider' },
  'cms-layanan': { label: 'Manajemen Layanan PIPD' },
  'cms-artikel': { label: 'Manajemen Artikel & Berita' }
};
