export const tableConfigs: Record<string, { heads: string[] }> = {
  'pengajuan-akun': { heads: ['Nama Lengkap', 'Email', 'Unit Kerja / Institusi', 'Role yang Diberikan', 'Status Pengajuan'] },
  'daftar-akun': { heads: ['Nama Lengkap', 'Username/NIM/NIP', 'Jenis Kelamin', 'No WhatsApp', 'Email', 'Unit Kerja / Fakultas', 'Jabatan / Program Studi', 'Tanggal Lahir', 'Role'] },
  'klaster-dosen': { heads: ['Nama Dosen', 'Nomor WhatsApp'] },
  'mata-kuliah': { heads: ['Kode MK', 'Nama Mata Kuliah'] },
  'video-pembelajaran': { heads: ['Judul Video Pembelajaran', 'Dosen', 'Story Board', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan', 'Menu Publik', 'Kode MK', 'RAW File'] },
  'podcast': { heads: ['Judul Video Podcast', 'RAW Video Podcast', 'Narasumber & Host', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan', 'Menu Publik'] },
  'raw-video': { heads: ['Judul Video Pembelajaran', 'Dosen', 'Story Board', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan', 'Menu Publik', 'Kode MK', 'RAW File'] },
  'raw-podcast': { heads: ['Judul Video Podcast', 'RAW Video Podcast', 'Narasumber & Host', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan', 'Menu Publik'] },
  'editor-video': { heads: ['Judul Video Pembelajaran', 'Dosen', 'Story Board', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan', 'Menu Publik', 'Kode MK', 'RAW File'] },
  'editor-podcast': { heads: ['Judul Video Podcast', 'RAW Video Podcast', 'Narasumber & Host', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status Pekerjaan', 'Menu Publik'] },
  'story-board': { heads: ['Judul Story Board', 'Dosen', 'Kode MK', 'Tautan / File'] },
  'video-podcast': { heads: ['Judul Video', 'Tanggal', 'Durasi'] },
  'cms-slider': { heads: ['Judul Slide', 'Subjudul', 'URL Gambar', 'Status'] },
  'cms-layanan': { heads: ['Nama Layanan', 'Deskripsi Singkat', 'Tautan Icon', 'Status'] },
  'cms-artikel': { heads: ['Judul', 'Kategori', 'Headline', 'Status Tayang', 'Dilihat', 'Tanggal Publish'] },
  'cms-menu': { heads: ['Nama Menu', 'Tautan (URL)', 'Posisi', 'Status', 'Induk Menu'] }
};

export const pageDataMap: Record<string, { label: string }> = {
  'dashboard': { label: 'Dashboard' },
  'pengajuan-akun': { label: 'Persetujuan Akun' },
  'daftar-akun': { label: 'Daftar Semua Akun' },
  'klaster-dosen': { label: 'Klaster Dosen' },
  'mata-kuliah': { label: 'Mata Kuliah' },
  'raw-video': { label: 'RAW Video Pembelajaran' },
  'raw-podcast': { label: 'RAW Podcast' },
  'editor-video': { label: 'Editor Video Pembelajaran' },
  'editor-podcast': { label: 'Editor Podcast' },
  'story-board': { label: 'Story Board' },
  'video-podcast': { label: 'Video Podcast' },
  'pelaporan': { label: 'Rekapitulasi Laporan' },
  'cms-slider': { label: 'Manajemen Hero Slider' },
  'cms-layanan': { label: 'Manajemen Layanan PIPD' },
  'cms-artikel': { label: 'Manajemen Artikel & Berita' },
  'cms-menu': { label: 'Pengaturan Menu Navigasi' }
};
