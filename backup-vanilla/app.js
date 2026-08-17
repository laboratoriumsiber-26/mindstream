/**
 * MindStream App Logic
 * Vanilla JS SPA Architecture
 */

// Firebase di-pause sementara sesuai permintaan user
// import { auth, googleProvider, signInWithPopup, onAuthStateChanged, signOut, db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from './firebase.js';
// window.db = db;



window.appData = (() => {
    const saved = localStorage.getItem('mindstream_appData');
    if (saved) {
        try { 
            const data = JSON.parse(saved); 
            if (!data['video-podcast']) data['video-podcast'] = [];
            if (data['podcast']) {
                data['podcast'] = data['podcast'].map(row => {
                    if (row.c7 && !row.c8) {
                        return {
                            c1: row.c1,
                            c2: '<span style="color: var(--text-muted); font-style: italic;">Pilih RAW...</span>',
                            c3: row.c2,
                            c4: row.c3,
                            c5: row.c4,
                            c6: row.c5,
                            c7: row.c6,
                            c8: row.c7
                        };
                    }
                    return row;
                });
            }
            return data; 
        } catch (e) { console.error('Gagal parse localStorage', e); }
    }
    return {
    'profil': [
        { c1: 'Nama Pengguna', c2: 'Superadmin' },
        { c1: 'Email', c2: 'superadmin@mindstream.local' },
        { c1: 'Unit Kerja', c2: 'Pusat Inovasi Pembelajaran' }
    ],
    'halaman': [
        { c1: 'Beranda / Dashboard', c2: '<span style="color: var(--primary); font-weight:bold;">Aktif</span>' },
        { c1: 'Tentang Kami', c2: '<span style="color: var(--text-muted);">Draft</span>' }
    ],
    'kategori': [
        { c1: 'Video Edukasi', c2: 'Kategori untuk video pembelajaran terstruktur' },
        { c1: 'Podcast', c2: 'Kategori untuk konten bincang-bincang santai' }
    ],
    'klaster-dosen': [
        { c1: 'Dr. Ahmad Fulan' },
        { c1: 'Siti Aminah, M.Kom' },
        { c1: 'Prof. Budi Santoso, Ph.D' }
    ],
    'mata-kuliah': [
        { c1: 'SI101', c2: 'Sistem Informasi' },
        { c1: 'TI202', c2: 'Pemrograman Web' },
        { c1: 'KU100', c2: 'Pendidikan Agama Islam' }
    ],
    'story-board': [
        { c1: 'SB Pertemuan 1 - Konsep Web', c2: 'Dr. Ahmad Fulan', c3: 'TI202', c4: '<button onclick="window.viewFileAction(\\\'Lihat Drive\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">folder_open</span> Lihat Drive</button>' },
        { c1: 'SB Pengenalan Database', c2: 'Siti Aminah, M.Kom', c3: 'SI101', c4: '<button onclick="window.viewFileAction(\\\'Lihat Drive\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">folder_open</span> Lihat Drive</button>' }
    ],
    'video-pembelajaran': [
        { c1: 'Konsep Dasar Web', c2: 'Dr. Ahmad Fulan<br><small style="color: var(--text-muted);">Pemrograman Web (TI202)</small>', c3: '<button onclick="window.viewFileAction(\\\'Lihat SB\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--glass-border); color: var(--text-main); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">preview</span> Lihat SB</button>', c4: '<button onclick="window.viewFileAction(\\\'Revisi V1\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--accent-1); color: var(--accent-1); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> V1.mp4</button>', c5: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c6: 'Rizky (Editor)', c7: '20-08-2026', c8: '<span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">In Progress</span>' },
        { c1: 'Pengantar SQL', c2: 'Siti Aminah, M.Kom<br><small style="color: var(--text-muted);">Sistem Informasi (SI101)</small>', c3: '<button onclick="window.viewFileAction(\\\'Lihat SB\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--glass-border); color: var(--text-main); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">preview</span> Lihat SB</button>', c4: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c5: '<button onclick="window.viewFileAction(\\\'Hasil Final\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Final.mp4</button>', c6: 'Budi (Editor)', c7: '15-08-2026', c8: '<span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">Finalized</span>' }
    ],
    'podcast': [
        { c1: 'Inovasi Digital di Kampus', c2: '<span style="color: var(--text-muted); font-style: italic;">Pilih RAW...</span>', c3: 'Dr. Ahmad Fulan<br><small style="color: var(--text-muted);">Host: Uploader Kampus</small>', c4: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c5: '<button onclick="window.viewFileAction(\\\'Hasil Final\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Final.mp4</button>', c6: 'Rizky (Editor)', c7: '21-08-2026', c8: '<span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">Finalized</span>' },
        { c1: 'Tantangan Riset 2026', c2: '<span style="color: var(--text-muted); font-style: italic;">Pilih RAW...</span>', c3: 'Prof. Budi Santoso<br><small style="color: var(--text-muted);">Host: Operator Podcast</small>', c4: '<button onclick="window.viewFileAction(\\\'Revisi Draft 1\\\')" style="background: var(--bg-surface-hover); border: 1px solid var(--accent-1); color: var(--accent-1); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Draft_1.mp4</button>', c5: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c6: 'Budi (Editor)', c7: '25-08-2026', c8: '<span style="background: #f59e0b; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">Review</span>' }
    ],
    'konten-medsos': [
        { c1: 'Instagram', c2: 'Edukasi', c3: '20-08-2026' },
        { c1: 'TikTok', c2: 'Hiburan', c3: '22-08-2026' },
        { c1: 'YouTube Shorts', c2: 'Informasi', c3: '25-08-2026' }
    ],
    'rekapitulasi-laporan': [
        { c1: 'Agustus 2026', c2: '45 Video', c3: '30 Selesai', c4: '15 Proses' },
        { c1: 'Juli 2026', c2: '38 Video', c3: '38 Selesai', c4: '0 Proses' }
    ],
    'daftar-admin': [
        { c1: 'Ahmad Admin', c2: 'admin1@kampus.ac.id', c3: '<span style="color: var(--primary); font-weight: bold;">Admin</span>' }
    ],
    'daftar-uploader': [
        { c1: 'Uploader Kampus', c2: 'uploader@kampus.ac.id', c3: '<span style="color: var(--accent-1); font-weight: bold;">Uploader</span>' }
    ],
    'daftar-editor': [
        { c1: 'Rizky', c2: 'Senior Editor', c3: '<span style="background: var(--primary); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Tersedia</span>' },
        { c1: 'Budi', c2: 'Junior Editor', c3: '<span style="background: var(--accent-1); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Sedang Mengerjakan</span>' }
    ],
    'daftar-user': [
        { c1: 'Mahasiswa A', c2: 'mhs.a@kampus.ac.id', c3: 'Fakultas Tarbiyah' },
        { c1: 'Dosen B', c2: 'dosen.b@kampus.ac.id', c3: 'Fakultas Syariah' }
    ],
    'daftar-akun': [
        { c1: "Siti Hamidah", c2: "Mentor Fotografer/Videografer", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110102", c7: "6281320995472", c8: "-", c9: "Admin" },
        { c1: "Auliya Rahmi", c2: "Mentor Fotografer/Videografer", c3: "6", c4: "FITK", c5: "Pendidikan Bahasa Arab", c6: "2381020029", c7: "62895404577828", c8: "-", c9: "Admin" },
        { c1: "M. Surya Fadlilah Ramadhan", c2: "Mentor Desain Grafis", c3: "6", c4: "FITK", c5: "Tadris Bahasa Inggris", c6: "2381030113", c7: "6282185090756", c8: "suryafadil218@gmail.com", c9: "Admin" },
        { c1: "Rizki Faturohman", c2: "Editor Video", c3: "6", c4: "FUA", c5: "Bahasa dan Sastra Arab", c6: "2385150043", c7: "6281394301290", c8: "rizkifaturohman@mail.uinssc.ac.id", c9: "Editor" },
        { c1: "Muhammad Adam Habibie", c2: "Editor Video", c3: "4", c4: "FUA", c5: "Bahasa dan Sastra Arab", c6: "2485150040", c7: "6289526573241", c8: "albirunihabibie1422@gmail.com", c9: "Editor" },
        { c1: "Muhammad Lazuardi Ramadhani", c2: "Editor Video", c3: "2", c4: "FASYA", c5: "Ekonomi Syariah", c6: "2530212139", c7: "6289699062022", c8: "Lazuardiramadhani2006@gmail.com", c9: "Editor" },
        { c1: "Azza Taqiuddin Mubarok", c2: "Editor Video", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110019", c7: "6285624891772", c8: "azzataqmub@gmail.com", c9: "Editor" },
        { c1: "Abdul Karim", c2: "Editor Video", c3: "4", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2484110062", c7: "6282240227905", c8: "karimaru00@gmail.com", c9: "Editor" },
        { c1: "Muhammad Rafly Maulana", c2: "Editor Video", c3: "4", c4: "FITK", c5: "Pendidikan Bahasa Arab", c6: "2481020044", c7: "6285281742740", c8: "mraflymaulana@mail.uinssc.ac.id", c9: "Editor" },
        { c1: "Amirul Abdillah Hakim", c2: "Editor Video", c3: "2", c4: "FITK", c5: "PJJ Pendidikan Bahasa Arab", c6: "2530113072", c7: "6285784215990", c8: "amiikii.mz@gmail.com", c9: "Editor" },
        { c1: "M Rizki Maulana", c2: "Editor Video", c3: "6", c4: "FUA", c5: "Ilmu Hadis", c6: "2385140026", c7: "6285712221459", c8: "anakbaikhati0189@gmail.com", c9: "Editor" },
        { c1: "Ahmad Sakhi Habibi Habibi", c2: "Editor Video", c3: "2", c4: "FEBI", c5: "Pariwisata Syariah", c6: "2530214029", c7: "6281214677120", c8: "sakhihabib01@gmail.com", c9: "Editor" },
        { c1: "Cahyo Ferdhinan", c2: "Editor Video", c3: "4", c4: "FDKI", c5: "Pengembangan Masyarakat Islam", c6: "2484120001", c7: "6285281661009", c8: "crewssstar@gmail.com", c9: "Editor" },
        { c1: "Dwi Juniarti Mirwandini", c2: "Editor Video", c3: "6", c4: "FUA", c5: "Aqidah dan Filsafat Islam", c6: "2385160011", c7: "6283829812717", c8: "dwijuniartimirwandini@gmail.com", c9: "Editor" },
        { c1: "Lu'Lu Atul Ainiyah", c2: "Editor Video", c3: "4", c4: "FUA", c5: "Bahasa dan Sastra Arab", c6: "2485150027", c7: "6287717776727", c8: "luluatulainiyah06@gmail.com", c9: "Editor" },
        { c1: "Naura Azzahra Akhmadi Tadjwid", c2: "Editor Video", c3: "4", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2484110098", c7: "59992", c8: "nauraazzahra20052007@gmail.com", c9: "Editor" },
        { c1: "Anjani Yuniarti", c2: "Editor Video", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110028", c7: "6288296942555", c8: "njen9191@gmail.com", c9: "Editor" },
        { c1: "Zalfa Nabila", c2: "Editor Video", c3: "2", c4: "FITK", c5: "Pendidikan Guru Madrasah Ibtidaiyah", c6: "2481070078", c7: "6285759120697", c8: "zalfanabila092@gmail.com", c9: "Editor" },
        { c1: "Nabila Ainurrahmah", c2: "Editor Video", c3: "4", c4: "FITK", c5: "Tadris Bahasa Indonesia", c6: "2481100066", c7: "6282117874268", c8: "ainurrahmahnabila@gmail.com", c9: "Editor" },
        { c1: "Masya Islamiah", c2: "Editor Video", c3: "4", c4: "FITK", c5: "Tadris Bahasa Inggris", c6: "2481030090", c7: "6285213960989", c8: "masyamaharani2402@gmail.com", c9: "Editor" },
        { c1: "Hanny Habibah Olansya Iyanuarinka", c2: "Editor Video", c3: "6", c4: "FITK", c5: "Tadris Matematika", c6: "2381050016", c7: "62895357410822", c8: "hannyhabibahoi@mail.syekhnurjati.ac.id", c9: "Editor" },
        { c1: "Sri Wulan Apriliyanti", c2: "Editor Video", c3: "6", c4: "FUA", c5: "Tasawuf dan Psikoterapi", c6: "2385160005", c7: "6283898112912", c8: "sriwulana25@gmail.com", c9: "Editor" },
        { c1: "Nurul Ramadhani", c2: "Editor Video", c3: "4", c4: "FITK", c5: "Pendidikan Bahasa Arab", c6: "2481020072", c7: "6285786451894", c8: "anraaaa.05@gmail.com", c9: "Editor" },
        { c1: "Fajar Nur Sidik", c2: "Desain Grafis", c3: "4", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2484110049", c7: "6282119887267", c8: "angoceh93@gmail.com", c9: "Editor" },
        { c1: "Farhan Hilmy Mubaarok", c2: "Desain Grafis", c3: "6", c4: "FITK", c5: "Pendidikan Bahasa Arab", c6: "2381020039", c7: "6285863803454", c8: "farhanhilmymubaarok@gmail.com", c9: "Editor" },
        { c1: "Nur Sahid", c2: "Desain Grafis", c3: "4", c4: "FITK", c5: "Pendidikan Bahasa Arab", c6: "2481020059", c7: "6285860263428", c8: "nshaa2205@gmail.com", c9: "Editor" },
        { c1: "Sofiyatul Zannah", c2: "Desain Grafis", c3: "4", c4: "FUA", c5: "Ilmu Al-Qur'An dan Tafsir", c6: "2485130003", c7: "6285659650109", c8: "sofiyatuljannah547@gmail.com", c9: "Editor" },
        { c1: "Irfan Mubarok", c2: "Operator Podcast", c3: "4", c4: "FITK", c5: "Informatika", c6: "2488010075", c7: "6283804339441", c8: "irfanmubarok@mail.uinssc.ac.id", c9: "Uploader" },
        { c1: "Dadan Danu", c2: "Operator Podcast", c3: "6", c4: "FITK", c5: "Pendidikan Bahasa Arab", c6: "2381020012", c7: "6282130270591", c8: "dadanridwandanu77@gmail.com", c9: "Uploader" },
        { c1: "Syarif Abdurohman", c2: "Operator Podcast", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110127", c7: "6281464438982", c8: "syarifkpic@gmail.com", c9: "Uploader" },
        { c1: "Aminah Amna", c2: "Operator Podcast", c3: "4", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2484110038", c7: "6281573092061", c8: "amnaminahaminah@gmail.com", c9: "Uploader" },
        { c1: "Ziyah Nujumul Inayah", c2: "Operator Podcast", c3: "4", c4: "FITK", c5: "Pendidikan Guru Madrasah Ibtidaiyah", c6: "2481070044", c7: "6283128975681", c8: "ziyahinayah01@gmail.com", c9: "Uploader" },
        { c1: "Daffa Luthfillah", c2: "Fotografer/Videografer", c3: "4", c4: "FUA", c5: "Ilmu Al-Qur'An dan Tafsir", c6: "2485130001", c7: "6289513586162", c8: "Luthfillahdaffaananta@gmail.com", c9: "Uploader" },
        { c1: "Faiz Abdur Rojib", c2: "Fotografer/Videografer", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110065", c7: "6285722454077", c8: "abdurrojibfaiz@gmail.com", c9: "Uploader" },
        { c1: "Devina Nuramalina", c2: "Fotografer/Videografer", c3: "6", c4: "FDKI", c5: "Bimbingan dan Konseling Islam", c6: "2384130156", c7: "6281288089413", c8: "devinanuramalina@mail.uinssc.ac.id", c9: "Uploader" },
        { c1: "Nisa Nurmalasari", c2: "Fotografer/Videografer", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110089", c7: "62859113502878", c8: "nisanurmalasari2004@gmail.com", c9: "Uploader" },
        { c1: "Regar Herlambang", c2: "Fotografer/Videografer", c3: "4", c4: "FITK", c5: "Tadris Ilmu Pengetahuan Sosial", c6: "2481040056", c7: "6283824015255", c8: "regarherlambang09@gmail.com", c9: "Uploader" },
        { c1: "Rosiana Sari", c2: "Fotografer/Videografer", c3: "6", c4: "FUA", c5: "Tasawuf dan Psikoterapi", c6: "2385160025", c7: "6282110788902", c8: "rosians2005@gmail.com", c9: "Uploader" },
        { c1: "Tathia Putri Inasyah", c2: "Operator Podcast", c3: "4", c4: "FEBI", c5: "Akuntansi Syariah", c6: "2482130116", c7: "62895320385097", c8: "tathiaputrii18@gmail.com", c9: "Uploader" },
        { c1: "Muslikah Anggrayni", c2: "Operator Podcast", c3: "6", c4: "FDKI", c5: "Bimbingan dan Konseling Islam", c6: "2384130064", c7: "6288229226535", c8: "muslikahanggrayni@gmail.com", c9: "Uploader" },
        { c1: "Siti Rokhiya", c2: "Operator Podcast", c3: "4", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2484110015", c7: "6283890093451", c8: "sitirokhiyah.pnd@gmail.com", c9: "Uploader" },
        { c1: "Eva Sulastri", c2: "Operator Podcast", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110098", c7: "6285880889338", c8: "evasulastri8420@gmail.com", c9: "Uploader" },
        { c1: "Laila Ulfatur Rahmah", c2: "Fotografer/Videografer", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110132", c7: "6281398066380", c8: "lailaulfaturrahma@gmail.com", c9: "Uploader" }
    ]
    };
})();

window.tableConfigs = {
    'profil': { heads: ['Informasi Akun', 'Detail'] },
    'halaman': { heads: ['Nama Halaman', 'Status'] },
    'kategori': { heads: ['Nama Kategori', 'Deskripsi'] },
    'klaster-dosen': { heads: ['Nama Dosen'] },
    'mata-kuliah': { heads: ['Kode MK', 'Nama Mata Kuliah'] },
    'story-board': { heads: ['Judul Story Board', 'Dosen', 'Kode MK', 'Tautan / File'] },
    'video-podcast': { heads: ['Judul RAW Video', 'Tanggal Rekaman', 'Durasi'] },
    'video-pembelajaran': { heads: ['Judul Video Pembelajaran', 'Dosen & MK', 'Story Board', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status'] },
    'podcast': { heads: ['Judul Video Podcast', 'RAW Video Podcast', 'Narasumber & Host', 'Revisi', 'Hasil', 'Editor', 'Deadline', 'Status'] },
    'konten-medsos': { heads: ['Platform', 'Pilar Konten', 'Tanggal Tayang'] },
    'rekapitulasi-laporan': { heads: ['Bulan / Periode', 'Total Video', 'Selesai', 'Proses'] },
    'daftar-admin': { heads: ['Nama', 'Email', 'Role'] },
    'daftar-uploader': { heads: ['Nama', 'Email', 'Role'] },
    'daftar-editor': { heads: ['Nama', 'Tingkat', 'Status Ketersediaan'] },
    'daftar-user': { heads: ['Nama', 'Email', 'Instansi / Fakultas'] },
    'daftar-akun': { heads: ['Nama Lengkap', 'Divisi', 'Semester', 'Fakultas', 'Jurusan', 'NIM', 'WhatsApp', 'Email', 'Role'] }
};

window.saveAppData = function() {
    localStorage.setItem('mindstream_appData', JSON.stringify(window.appData));
};

window.getStatusBadge = function(status) {
    status = status || 'To Do';
    let bg = 'var(--bg-surface)';
    let color = 'var(--text-main)';
    let border = '1px solid var(--glass-border)';
    
    if (status === 'To Do') { bg = '#475569'; color = 'white'; border = 'none'; }
    else if (status === 'In Progress') { bg = '#3b82f6'; color = 'white'; border = 'none'; }
    else if (status === 'Review') { bg = '#f59e0b'; color = 'white'; border = 'none'; }
    else if (status === 'Revision') { bg = '#ef4444'; color = 'white'; border = 'none'; }
    else if (status === 'Retake') { bg = '#dc2626'; color = 'white'; border = 'none'; }
    else if (status === 'Finalized') { bg = '#10b981'; color = 'white'; border = 'none'; }
    
    return `<span style="background: ${bg}; color: ${color}; border: ${border}; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${status}</span>`;
};

window.filterTable = function() {
    const searchInput = document.getElementById('global-search');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filters = Array.from(document.querySelectorAll('.dynamic-filter')).map(select => ({
        idx: parseInt(select.getAttribute('data-col-idx')),
        value: select.value.toLowerCase()
    }));
    
    const tbody = document.querySelector('.table-wrapper tbody');
    if (!tbody) return;
    const trs = tbody.getElementsByTagName('tr');
    
    for (let i = 0; i < trs.length; i++) {
        const tds = trs[i].getElementsByTagName('td');
        
        // Skip dummy rows
        if (tds.length <= 1) {
            trs[i].style.display = searchTerm === '' && filters.every(f => f.value === '') ? '' : 'none';
            continue;
        }

        let rowMatches = true;

        // 1. Check Specific Dropdowns
        for (let f of filters) {
            if (f.value !== '') {
                const cellText = (tds[f.idx].textContent || tds[f.idx].innerText).toLowerCase().trim();
                // We use exact match or includes based on how data is structured.
                // Since status and editor can be embedded, includes is safer.
                if (!cellText.includes(f.value)) {
                    rowMatches = false;
                    break;
                }
            }
        }

        // 2. Check Global Text Search
        if (rowMatches && searchTerm !== '') {
            let searchMatch = false;
            for (let j = 0; j < tds.length; j++) {
                if (tds[j]) {
                    const txtValue = tds[j].textContent || tds[j].innerText;
                    if (txtValue.toLowerCase().indexOf(searchTerm) > -1) {
                        searchMatch = true;
                        break;
                    }
                }
            }
            if (!searchMatch) rowMatches = false;
        }

        trs[i].style.display = rowMatches ? '' : 'none';
    }
};

window.showToast = function (msg, isError = false) {
    const toast = document.createElement('div');
    const icon = isError ? 'error' : 'check_circle';
    const color = isError ? 'var(--accent-1)' : 'var(--primary)';
    toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.2rem; vertical-align:middle; margin-right:8px;">${icon}</span> ${msg}`;
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${color}; color: white;
        padding: 12px 24px; border-radius: var(--radius-sm); box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999; transform: translateY(-50px); opacity: 0; transition: all 0.3s ease; font-size: 0.9rem; display: flex; align-items: center;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; }, 10);
    setTimeout(() => {
        toast.style.transform = 'translateY(-50px)'; toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

window.downloadReportAction = function() {
    window.showToast('Menyiapkan laporan...', false);
    setTimeout(() => {
        const videos = window.appData['video-pembelajaran'] || [];
        const podcasts = window.appData['podcast'] || [];
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Tipe,Judul,Editor,Status,Deadline\n";
        
        videos.forEach(v => {
            const judul = (v.c1 || '').replace(/,/g, '');
            const editor = (v.c6 || '').replace(/,/g, '');
            const status = (v.c8 || '').replace(/<[^>]*>?/gm, '').trim();
            const deadline = v.c7 || '';
            csvContent += `Video,${judul},${editor},${status},${deadline}\n`;
        });
        
        podcasts.forEach(p => {
            const judul = (p.c1 || '').replace(/,/g, '');
            const editor = (p.c6 || '').replace(/,/g, '');
            const status = (p.c8 || '').replace(/<[^>]*>?/gm, '').trim();
            const deadline = p.c7 || '';
            csvContent += `Podcast,${judul},${editor},${status},${deadline}\n`;
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Rekapitulasi_Laporan.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.showToast('Laporan berhasil diunduh.', false);
    }, 1000);
};

window.viewFileAction = function (actionName) {
    const modal = document.createElement('div');
    modal.className = 'file-viewer-modal';
    modal.innerHTML = `
        <div class="file-viewer-content">
            <div class="file-viewer-header">
                <h3 style="margin:0;">Pratinjau: ${actionName}</h3>
                <button onclick="this.closest('.file-viewer-modal').remove()" class="btn-icon-only"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="file-viewer-body" id="file-viewer-body-${Date.now()}">
                <div class="skeleton-box" style="width: 100%; height: 350px; margin-bottom: 16px;"></div>
                <div class="skeleton-box" style="width: 60%; height: 24px;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Simulate file loading
    setTimeout(() => {
        const bodyEl = modal.querySelector('.file-viewer-body');
        if (bodyEl) {
            bodyEl.innerHTML = `
                <div style="width: 100%; height: 350px; background: #000; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); margin-bottom: 16px;">
                    <span class="material-symbols-outlined" style="font-size: 64px; color: rgba(255,255,255,0.5);">play_circle</span>
                </div>
                <p style="color: var(--text-muted);">Simulasi penayangan dokumen/media berhasil dimuat.</p>
            `;
        }
    }, 1500); // 1.5s skeleton loading
};

window.showModal = function(title, message, type = 'info', onConfirm = null) {
    const modal = document.getElementById('global-modal');
    if (!modal) return;
    
    const icon = document.getElementById('modal-icon');
    const titleEl = document.getElementById('modal-title');
    const msgEl = document.getElementById('modal-message');
    const btnCancel = document.getElementById('modal-btn-cancel');
    const btnConfirm = document.getElementById('modal-btn-confirm');

    titleEl.textContent = title;
    msgEl.innerHTML = message;

    if (type === 'confirm') {
        icon.textContent = 'help_outline';
        icon.style.color = 'var(--accent-1)';
        btnCancel.style.display = 'block';
    } else {
        icon.textContent = type === 'error' ? 'error' : 'info';
        icon.style.color = type === 'error' ? 'var(--accent-1)' : 'var(--primary)';
        btnCancel.style.display = 'none';
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);

    const close = () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
        setTimeout(() => modal.classList.add('hidden'), 300);
    };

    // Remove old listeners to prevent duplicates
    const newConfirm = btnConfirm.cloneNode(true);
    const newCancel = btnCancel.cloneNode(true);
    btnConfirm.parentNode.replaceChild(newConfirm, btnConfirm);
    btnCancel.parentNode.replaceChild(newCancel, btnCancel);

    newCancel.addEventListener('click', close);
    newConfirm.addEventListener('click', () => {
        close();
        if (onConfirm) onConfirm();
    });
};

window.hapusData = function (type, index) {
    window.showModal('Hapus Data', 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.', 'confirm', () => {
        window.appData[type].splice(index, 1);
        window.saveAppData();
        window.showToast('Data berhasil dihapus');
        loadPageContent(type);
    });
};

window.autoAssignEditor = function() {
    let editors = (window.appData['daftar-akun'] || [])
        .filter(a => a.c9 && a.c9.toLowerCase() === 'editor')
        .map(a => a.c1);
    
    if (editors.length === 0) {
        editors = (window.appData['daftar-editor'] || []).map(e => e.c1);
    }
    
    if (editors.length === 0) return 'Tidak ada editor terdaftar';
    
    const activeTasksCount = {};
    editors.forEach(name => activeTasksCount[name] = 0);

    const checkTasks = (type, editorCol, statusCol) => {
        const rows = window.appData[type] || [];
        rows.forEach(row => {
            const editor = (row['c' + editorCol] || '').replace(/<[^>]*>?/gm, '').trim();
            const status = (row['c' + statusCol] || '').replace(/<[^>]*>?/gm, '').trim();
            if (editor && (status === 'To Do' || status === 'In Progress') && activeTasksCount[editor] !== undefined) {
                activeTasksCount[editor]++;
            }
        });
    };

    checkTasks('video-pembelajaran', 6, 8);
    checkTasks('podcast', 6, 8); // Editor=c6, Status=c8 for new podcast schema

    const availableEditors = editors.map(name => ({ name, activeTasks: activeTasksCount[name] }));
    availableEditors.sort((a, b) => a.activeTasks - b.activeTasks);
    
    return availableEditors[0].name;
};

window.calculateDeadline = function(type) {
    const today = new Date();
    const daysToAdd = type === 'video-pembelajaran' ? 14 : 7;
    let count = 0;
    while (count < daysToAdd) {
        today.setDate(today.getDate() + 1);
        if (today.getDay() !== 0 && today.getDay() !== 6) { // Skip weekends
            count++;
        }
    }
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

window.handleFormSubmit = function (event, type) {
    event.preventDefault();
    if (!window.appData[type]) window.appData[type] = [];

    const inputs = Array.from(event.target.elements).filter(e =>
        (e.tagName === 'INPUT' || e.tagName === 'SELECT' || e.tagName === 'TEXTAREA') &&
        !e.classList.contains('ignore-save')
    );

    const isEdit = window.editingIndex >= 0;
    let newRow = isEdit ? { ...window.appData[type][window.editingIndex] } : {};
    const config = window.tableConfigs[type];
    const totalCols = config ? config.heads.length : 8;

    if (type === 'video-pembelajaran') {
        newRow.c1 = inputs[0]?.value || '';
        const dosen = inputs[1]?.value || '';
        const mk = inputs[2]?.options?.[inputs[2].selectedIndex]?.text || '';
        const mkKode = inputs[3]?.value || '';
        
        if (dosen && dosen !== 'Pilih Dosen...') {
            newRow.c2 = `${dosen}<br><small style="color: var(--text-muted);">${mk} (${mkKode})</small>`;
        }

        if (inputs[4]?.value) {
            newRow.c3 = `<button data-val="${inputs[4].value}" onclick="window.viewFileAction('Lihat SB')" style="background: var(--bg-surface-hover); border: none; color: var(--text-main); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">preview</span> Lihat SB</button>`;
        } else if (!isEdit) {
            newRow.c3 = '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>';
        }

        if (inputs[5]?.value) {
            newRow.c4 = `<button onclick="window.viewFileAction('Memutar Revisi')" style="background: var(--bg-surface-hover); border: none; color: var(--accent-1); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Revisi</button>`;
        } else if (!isEdit) {
            newRow.c4 = '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>';
        }

        if (inputs[6]?.value) {
            newRow.c5 = `<button onclick="window.viewFileAction('Memutar Hasil')" style="background: var(--bg-surface-hover); border: none; color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Final</button>`;
        } else if (!isEdit) {
            newRow.c5 = '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>';
        }

        newRow.c6 = isEdit ? newRow.c6 : window.autoAssignEditor();
        
        // Format the calculated deadline nicely
        const rawDate = isEdit ? newRow.c7 : window.calculateDeadline('video-pembelajaran');
        if (!isEdit) {
            const dObj = new Date(rawDate);
            const formattedDate = dObj.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
            newRow.c7 = formattedDate;
        }

        const statusIdx = inputs.length - 1; 
        newRow.c8 = window.getStatusBadge(inputs[statusIdx]?.value || 'To Do');
        
    } else if (type === 'podcast') {
        newRow.c1 = inputs[0]?.value || '';
        const rawVideo = inputs[1]?.options?.[inputs[1].selectedIndex]?.text || '';
        newRow.c2 = rawVideo && rawVideo !== 'Pilih RAW Video...' ? rawVideo : '<span style="color: var(--text-muted); font-style: italic;">Pilih RAW...</span>';
        
        let narsumHost = inputs[2]?.value || '';
        narsumHost = narsumHost.replace(/\n/g, '<br>');
        newRow.c3 = narsumHost;
        
        if (inputs[3]?.value) {
            newRow.c4 = `<button onclick="window.viewFileAction('Memutar Revisi')" style="background: var(--bg-surface-hover); border: none; color: var(--accent-1); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Revisi</button>`;
        } else if (!isEdit) {
            newRow.c4 = '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>';
        }
        
        if (inputs[4]?.value) {
            newRow.c5 = `<button onclick="window.viewFileAction('Memutar Hasil')" style="background: var(--bg-surface-hover); border: none; color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Final</button>`;
        } else if (!isEdit) {
            newRow.c5 = '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>';
        }
        
        newRow.c6 = isEdit ? newRow.c6 : window.autoAssignEditor();
        
        const rawDate = isEdit ? newRow.c7 : window.calculateDeadline('podcast');
        if (!isEdit) {
            const dObj = new Date(rawDate);
            newRow.c7 = dObj.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        }

        const statusIdx = inputs.length - 1;
        newRow.c8 = window.getStatusBadge(inputs[statusIdx]?.value || 'To Do');

    } else if (type === 'video-podcast') {
        newRow.c1 = inputs[0]?.value || '';
        // inputs[1] is type="date", we format it nicely
        let rawDate = inputs[1]?.value || '';
        if (rawDate) {
            const dObj = new Date(rawDate);
            rawDate = dObj.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        }
        newRow.c2 = rawDate;
        newRow.c3 = (inputs[2]?.value || '0') + ' menit';

    } else if (type === 'story-board') {
        newRow.c1 = inputs[0]?.value || '';
        newRow.c2 = inputs[1]?.value || '';
        newRow.c3 = inputs[2]?.value || '';

        let fileBtn = '';
        if (inputs[3]?.value) {
            fileBtn = `<button onclick="window.viewFileAction('Lihat Tautan')" style="background: var(--bg-surface-hover); border: none; color: var(--accent-1); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">link</span> Tautan</button>`;
        } else if (inputs[4]?.value) {
            fileBtn = `<button onclick="window.viewFileAction('Lihat Berkas')" style="background: var(--bg-surface-hover); border: none; color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">folder_open</span> Berkas</button>`;
        }

        if (fileBtn) {
            newRow.c4 = fileBtn;
        } else if (!isEdit) {
            newRow.c4 = '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>';
        }
    } else {
        // Special mapping for Account Registrations (Dropdown mapping)
        if (['daftar-admin', 'daftar-uploader', 'daftar-editor', 'daftar-user'].includes(type)) {
            const selectedName = inputs[0]?.value || '';
            const accountData = window.appData['daftar-akun']?.find(a => a.c1 === selectedName) || {};
            newRow.c1 = selectedName;
            
            if (type === 'daftar-editor') {
                newRow.c2 = inputs[1]?.value || 'Junior Editor';
                newRow.c3 = `<span style="background: var(--primary); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Tersedia</span>`;
            } else if (type === 'daftar-user') {
                newRow.c2 = `${selectedName.toLowerCase().replace(/ /g, '')}@kampus.ac.id`; // Mock email
                newRow.c3 = accountData.c4 || '-'; // Fakultas
            } else {
                newRow.c2 = `${selectedName.toLowerCase().replace(/ /g, '')}@kampus.ac.id`; // Mock email
                newRow.c3 = `<span style="color: var(--accent-1); font-weight: bold;">${type.replace('daftar-', '').toUpperCase()}</span>`;
            }
        } else {
            for (let i = 0; i < totalCols; i++) {
                if (inputs[i]) {
                    let val = inputs[i].value;
                    if ((inputs[i].type === 'file' || inputs[i].type === 'url')) {
                        if (val) {
                            val = `<button onclick="window.viewFileAction('Lihat File')" style="background: var(--bg-surface-hover); border: none; color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">folder_open</span> Berkas</button>`;
                            newRow['c' + (i + 1)] = val;
                        } else if (!isEdit) {
                            newRow['c' + (i + 1)] = '<span style="color:var(--text-muted); font-style:italic;">Belum ada</span>';
                        }
                    } else {
                        newRow['c' + (i + 1)] = val || (isEdit ? newRow['c' + (i + 1)] : '<span style="color:var(--text-muted); font-style:italic;">-</span>');
                    }
                }
            }
        }
    }

    if (isEdit) {
        window.appData[type][window.editingIndex] = newRow;
        window.editingIndex = -1;
    } else {
        window.appData[type].unshift(newRow); // Add to top
    }

    // Save to localStorage
    window.saveAppData();

    const bs = document.getElementById('bottom-sheet');
    if (bs) bs.classList.add('hidden');

    // Tampilkan state loading
    const loader = document.getElementById('global-loader');
    if (loader) loader.classList.remove('hidden');

    // Simulasi proses delay
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        window.showToast('Data berhasil disimpan!');
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) loadPageContent(type);
    }, 800); // 800ms loading delay
};

// Application State
const state = {
    user: null,
    role: 'superadmin', // Default role for testing
    currentView: 'loading'
};

window.switchRole = function (newRole) {
    state.role = newRole;
    window.showModal('Role Berubah', 'Role simulasi berhasil diubah menjadi: <b>' + newRole + '</b>', 'info');
    buildNavigation();
    loadPageContent('dashboard');
};

// DOM Elements (Cached)
const DOM = {
    app: document.getElementById('app'),
    loader: document.getElementById('global-loader')
};

// Menu Configuration (Grouped)
const menuConfig = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', group: 'Utama' },

    { type: 'group', label: 'Manajemen Konten', roles: ['admin', 'uploader'] },
    { id: 'profil', icon: 'person', label: 'Profil Pengguna', roles: ['admin', 'uploader', 'editor', 'user'] },
    { id: 'leaderboard', icon: 'emoji_events', label: 'Leaderboard Editor', roles: ['admin', 'uploader', 'editor', 'user'] },

    { type: 'group', label: 'Master Data', roles: ['admin', 'uploader', 'user'] },
    { id: 'story-board', icon: 'auto_stories', label: 'Story Board', roles: ['admin', 'uploader', 'user'] },
    { id: 'video-podcast', icon: 'video_file', label: 'RAW Video Podcast', roles: ['admin', 'uploader', 'user'] },
    { id: 'klaster-dosen', icon: 'school', label: 'Klaster Dosen', roles: ['admin', 'uploader', 'user'] },
    { id: 'mata-kuliah', icon: 'menu_book', label: 'Mata Kuliah', roles: ['admin', 'uploader', 'user'] },

    { type: 'group', label: 'Manajemen Video', roles: ['admin', 'uploader', 'editor', 'user'] },
    { id: 'video-pembelajaran', icon: 'movie', label: 'Video Pembelajaran', roles: ['admin', 'uploader', 'editor', 'user'] },
    { id: 'podcast', icon: 'mic', label: 'Podcast', roles: ['admin', 'uploader', 'editor', 'user'] },
    { id: 'konten-medsos', icon: 'share', label: 'Konten Medsos', roles: ['admin', 'uploader', 'user'] },

    { type: 'group', label: 'Manajemen Hak Akses & Akun', roles: ['admin'] },
    { id: 'daftar-akun', icon: 'badge', label: 'Daftar Akun (Master)', roles: ['admin'] },
    { id: 'daftar-admin', icon: 'admin_panel_settings', label: 'Daftar Admin', roles: ['admin'] },
    { id: 'daftar-uploader', icon: 'upload_file', label: 'Daftar Uploader', roles: ['admin'] },
    { id: 'daftar-editor', icon: 'movie_edit', label: 'Daftar Editor', roles: ['admin'] },
    { id: 'daftar-user', icon: 'group', label: 'Daftar User', roles: ['admin'] },

    { type: 'group', label: 'Pelaporan & Analitik', roles: ['admin'] },
    { id: 'rekapitulasi-laporan', icon: 'assessment', label: 'Rekapitulasi Laporan', roles: ['admin'] }
];

// Initialize App
function initApp() {
    console.log("MindStream Initializing...");

    // Theme logic
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    // [DITUNDA SEMENTARA] Real Firebase Auth Flow
    /*
    onAuthStateChanged(auth, async (user) => {
        // ... (Firebase Auth logic)
    });
    */

    // Bypass Login - Go directly to Admin Dashboard (Sistem Dummy Sementara)
    state.user = { name: "Superadmin", email: "superadmin@mindstream.local", photoURL: "https://ui-avatars.com/api/?name=Superadmin&background=random" };
    state.role = "superadmin";
    
    renderView('dashboard');
    setTimeout(() => {
        loadPageContent('dashboard');
    }, 50);
}

// Render Engine (Template switching)
function renderView(viewName) {
    state.currentView = viewName;

    if (viewName === 'loading') {
        DOM.loader.classList.remove('hidden');
        DOM.app.innerHTML = '';
        return;
    }

    DOM.loader.classList.add('hidden');

    const templateId = `${viewName}-view-template`;
    const template = document.getElementById(templateId);

    if (!template) {
        console.error(`Template ${templateId} not found!`);
        return;
    }

    // Clone template content
    const content = template.content.cloneNode(true);
    DOM.app.innerHTML = '';
    DOM.app.appendChild(content);

    if (viewName === 'login') {
        initLoginView();
    } else if (viewName === 'dashboard') {
        initDashboardView();
    }
}

function initLoginView() {
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            btnLogin.innerHTML = `Memproses...`;
            btnLogin.disabled = true;
            setTimeout(() => {
                state.user = { name: "Superadmin", email: "superadmin@local", photoURL: "https://ui-avatars.com/api/?name=Superadmin&background=random" };
                state.role = "superadmin";
                renderView('dashboard');
                setTimeout(() => {
                    loadPageContent('dashboard');
                }, 50);
            }, 500);
        });
    }
}

function initDashboardView() {
    document.getElementById('user-name').textContent = state.user.name;
    document.getElementById('user-role').textContent = state.role;
    if (state.user.photoURL) {
        document.getElementById('user-avatar').src = state.user.photoURL;
    }

    // Theme Toggle Action
    const themeBtn = document.getElementById('btn-theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Set initial icon
    if (document.body.getAttribute('data-theme') === 'dark') {
        themeIcon.textContent = 'light_mode';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeIcon.textContent = 'dark_mode';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.textContent = 'light_mode';
            }
        });
    }

    // Logout Action
    document.getElementById('btn-logout').addEventListener('click', () => {
        state.user = null;
        state.role = 'guest';
        renderView('login');
    });

    buildNavigation();

    loadPageContent('dashboard');
}

function buildNavigation() {
    const navContainer = document.getElementById('sidebar-nav');
    navContainer.innerHTML = ''; // Clear

    // Hide Role Switcher if not superadmin (simulating that only super admin can "Sign As")
    const roleSwitcher = document.getElementById('role-switcher');
    if (roleSwitcher) {
        roleSwitcher.style.display = (state.role === 'admin' || state.role === 'superadmin') ? 'block' : 'none';
    }

    menuConfig.forEach((item, index) => {
        // Role check: Super Admin / Admin sees everything
        if (state.role !== 'admin' && state.role !== 'superadmin') {
            if (item.roles && !item.roles.includes(state.role)) {
                return; // Skip this menu item if role is not permitted
            }
        }

        if (item.type === 'group') {
            const groupHeader = document.createElement('div');
            groupHeader.className = 'nav-group-header';
            groupHeader.textContent = item.label;
            groupHeader.style.cssText = "font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin: 16px 16px 8px 16px; font-weight: 700; letter-spacing: 1px;";
            navContainer.appendChild(groupHeader);
        } else {
            const link = document.createElement('a');
            link.href = `#${item.id}`;
            link.className = `nav-item ${item.id === 'dashboard' ? 'active' : ''}`;
            link.innerHTML = `
                <span class="material-symbols-outlined">${item.icon}</span>
                <span>${item.label}</span>
            `;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.handleMenuClick(item.id);
            });

            navContainer.appendChild(link);
        }
    });
}

function loadPageContent(pageId) {
    const mainContent = document.getElementById('main-content');
    const pageTitle = document.getElementById('page-title');

    const pageData = menuConfig.find(p => p.id === pageId);
    if (pageData) pageTitle.textContent = pageData.label;

    if (pageId === 'dashboard') {
        const totalDosen = window.appData['klaster-dosen'] ? window.appData['klaster-dosen'].length : 0;
        const totalMK = window.appData['mata-kuliah'] ? window.appData['mata-kuliah'].length : 0;
        const totalEditor = (window.appData['daftar-akun'] || []).filter(a => a.c9 && a.c9.toLowerCase() === 'editor').length;
        const totalVideo = (window.appData['video-pembelajaran'] ? window.appData['video-pembelajaran'].length : 0) + 
                           (window.appData['podcast'] ? window.appData['podcast'].length : 0) + 
                           (window.appData['video-podcast'] ? window.appData['video-podcast'].length : 0);

        let html = `
            <div class="dashboard-widgets">
                <!-- Summary Cards -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 24px;">
                    <div class="glass-card" onclick="window.handleMenuClick('klaster-dosen')" style="padding: 16px; border: var(--glass-border); border-radius: var(--radius-md); background: var(--bg-surface); text-align: center; cursor: pointer; transition: transform 0.2s;">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">${totalDosen}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Dosen</div>
                    </div>
                    <div class="glass-card" onclick="window.handleMenuClick('mata-kuliah')" style="padding: 16px; border: var(--glass-border); border-radius: var(--radius-md); background: var(--bg-surface); text-align: center; cursor: pointer; transition: transform 0.2s;">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--accent-1);">${totalMK}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total MK</div>
                    </div>
                    <div class="glass-card" onclick="window.handleMenuClick('daftar-editor')" style="padding: 16px; border: var(--glass-border); border-radius: var(--radius-md); background: var(--bg-surface); text-align: center; cursor: pointer; transition: transform 0.2s;">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--accent-2);">${totalEditor}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Editor</div>
                    </div>
                    <div class="glass-card" onclick="window.handleMenuClick('video-pembelajaran')" style="padding: 16px; border: var(--glass-border); border-radius: var(--radius-md); background: var(--bg-surface); text-align: center; cursor: pointer; transition: transform 0.2s;">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">${totalVideo}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Video</div>
                    </div>
                </div>

                <!-- Analytics Chart -->
                <div class="glass-card" style="padding: 20px; border: var(--glass-border); border-radius: var(--radius-md); margin-bottom: 24px; background: var(--bg-surface); display: flex; flex-direction: column; align-items: center;">
                    <h3 style="margin-bottom: 16px; font-size: 1rem; align-self: flex-start;">Komposisi Data Global</h3>
                    <div style="position: relative; width: 100%; max-width: 300px;">
                        <canvas id="dashboardChart"></canvas>
                    </div>
                </div>
                <div class="mobile-grid-menu">
        `;
        menuConfig.forEach(item => {
            if (item.type !== 'group' && item.id !== 'dashboard') {
                html += `
                    <div class="grid-menu-item" onclick="document.querySelector('.nav-item[href=\\'#${item.id}\\']').click()">
                        <div class="grid-icon-wrapper">
                            <span class="material-symbols-outlined">${item.icon}</span>
                        </div>
                        <span class="grid-label">${item.label}</span>
                    </div>
                `;
            }
        });
        html += `</div></div>`;
        mainContent.innerHTML = html;

        // Initialize Chart
        setTimeout(() => {
            const ctx = document.getElementById('dashboardChart').getContext('2d');
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const textColor = isDark ? '#f8fafc' : '#334155';

            // Get CSS variables for chart colors
            const style = getComputedStyle(document.body);
            const colorPrimary = style.getPropertyValue('--primary').trim();
            const colorAccent1 = style.getPropertyValue('--accent-1').trim();
            const colorAccent2 = style.getPropertyValue('--accent-2').trim();

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Total Dosen', 'Total MK', 'Total Editor', 'Total Video'],
                    datasets: [{
                        data: [totalDosen, totalMK, totalEditor, totalVideo],
                        backgroundColor: [
                            colorPrimary,
                            colorAccent1,
                            colorAccent2,
                            colorPrimary
                        ],
                        borderWidth: isDark ? 2 : 0,
                        borderColor: isDark ? '#1e293b' : '#ffffff',
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '65%',
                    onClick: (e, elements) => {
                        if (elements.length > 0) {
                            const idx = elements[0].index;
                            if (idx === 0) window.handleMenuClick('klaster-dosen');
                            else if (idx === 1) window.handleMenuClick('mata-kuliah');
                            else if (idx === 2) window.handleMenuClick('daftar-editor');
                            else if (idx === 3) window.handleMenuClick('video-pembelajaran');
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: textColor, padding: 20, font: { family: 'Fira Sans' } },
                            onClick: (e, legendItem) => {
                                const idx = legendItem.index;
                                if (idx === 0) window.handleMenuClick('klaster-dosen');
                                else if (idx === 1) window.handleMenuClick('mata-kuliah');
                                else if (idx === 2) window.handleMenuClick('daftar-editor');
                                else if (idx === 3) window.handleMenuClick('video-pembelajaran');
                            }
                        }
                    }
                }
            });
        }, 100);
    } else if (pageId === 'leaderboard') {
        const editors = window.appData['daftar-editor'] || [];
        const videos = window.appData['video-pembelajaran'] || [];
        const podcasts = window.appData['podcast'] || [];

        // Kalkulasi Skor
        let lbData = editors.map((e, idx) => {
            const editorName = e.c1;
            
            const vidDone = videos.filter(v => v.c6 && v.c6.includes(editorName) && v.c8 && v.c8.includes('Finalized')).length;
            const podDone = podcasts.filter(p => p.c6 && p.c6.includes(editorName) && p.c8 && p.c8.includes('Finalized')).length;
            const vidProc = videos.filter(v => v.c6 && v.c6.includes(editorName) && v.c8 && v.c8.includes('In Progress')).length;
            const podProc = podcasts.filter(p => p.c6 && p.c6.includes(editorName) && p.c8 && p.c8.includes('In Progress')).length;
            
            const totalTasks = vidDone + podDone + vidProc + podProc;
            const totalDone = vidDone + podDone;
            
            // Dummy scoring algorithm
            const pseudoRandom = ((editorName.length * 7) + (idx * 13)) % 15;
            let score = 65 + (totalDone * 10) + (totalTasks * 2) + pseudoRandom;
            if (score > 100) score = 99; // Cap at 99
            if (totalTasks === 0) score = 0;

            return {
                name: editorName,
                level: e.c2,
                totalDone: totalDone,
                totalTasks: totalTasks,
                score: score,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(editorName)}&background=random&color=fff`
            };
        });

        // Urutkan berdasarkan skor
        lbData = lbData.sort((a, b) => b.score - a.score);

        const top3 = lbData.slice(0, 3);
        const others = lbData.slice(3);

        let top3HTML = '';
        if (top3.length > 0) {
            top3HTML = `
            <div style="display: flex; justify-content: center; align-items: flex-end; gap: 16px; margin: 40px 0; flex-wrap: wrap;">
                ${top3[1] ? `
                <div class="lb-podium rank-2" style="text-align: center; order: 1; flex: 1; min-width: 120px; max-width: 180px; position: relative;">
                    <div style="position: relative; width: 80px; height: 80px; margin: 0 auto 16px auto;">
                        <img src="${top3[1].avatar}" style="width: 100%; height: 100%; border-radius: 50%; border: 4px solid #C0C0C0; object-fit: cover; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
                        <div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); background: #C0C0C0; color: #fff; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; font-size: 0.9rem; border: 2px solid var(--bg-base);">2</div>
                    </div>
                    <div style="background: var(--bg-surface); border: var(--glass-border); padding: 16px 12px; border-radius: var(--radius-md) var(--radius-md) 0 0; height: 120px; box-shadow: 0 -4px 20px rgba(0,0,0,0.1);">
                        <h4 style="font-size: 1rem; margin-bottom: 4px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${top3[1].name}</h4>
                        <div style="font-size: 1.2rem; font-weight: 800; color: #C0C0C0;">${top3[1].score} <small style="font-size: 0.7rem;">Pts</small></div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">${top3[1].totalDone} Tugas Selesai</div>
                    </div>
                </div>
                ` : ''}

                ${top3[0] ? `
                <div class="lb-podium rank-1" style="text-align: center; order: 2; flex: 1; min-width: 140px; max-width: 200px; position: relative; z-index: 10;">
                    <div style="position: relative; width: 100px; height: 100px; margin: 0 auto 16px auto;">
                        <span class="material-symbols-outlined" style="position: absolute; top: -24px; left: 50%; transform: translateX(-50%); color: #FFD700; font-size: 2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">workspace_premium</span>
                        <img src="${top3[0].avatar}" style="width: 100%; height: 100%; border-radius: 50%; border: 4px solid #FFD700; object-fit: cover; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
                        <div style="position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); background: #FFD700; color: #fff; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; font-size: 1rem; border: 2px solid var(--bg-base); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">1</div>
                    </div>
                    <div style="background: var(--bg-surface); border: 2px solid rgba(255, 215, 0, 0.3); padding: 24px 12px 16px 12px; border-radius: var(--radius-md) var(--radius-md) 0 0; height: 140px; box-shadow: 0 -4px 20px rgba(255,215,0,0.15);">
                        <h4 style="font-size: 1.1rem; margin-bottom: 4px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${top3[0].name}</h4>
                        <div style="font-size: 1.4rem; font-weight: 800; color: #FFD700; text-shadow: 0 1px 4px rgba(255,215,0,0.2);">${top3[0].score} <small style="font-size: 0.8rem;">Pts</small></div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">${top3[0].totalDone} Tugas Selesai</div>
                    </div>
                </div>
                ` : ''}

                ${top3[2] ? `
                <div class="lb-podium rank-3" style="text-align: center; order: 3; flex: 1; min-width: 120px; max-width: 180px; position: relative;">
                    <div style="position: relative; width: 80px; height: 80px; margin: 0 auto 16px auto;">
                        <img src="${top3[2].avatar}" style="width: 100%; height: 100%; border-radius: 50%; border: 4px solid #CD7F32; object-fit: cover; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
                        <div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); background: #CD7F32; color: #fff; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; font-size: 0.9rem; border: 2px solid var(--bg-base);">3</div>
                    </div>
                    <div style="background: var(--bg-surface); border: var(--glass-border); padding: 16px 12px; border-radius: var(--radius-md) var(--radius-md) 0 0; height: 100px; box-shadow: 0 -4px 20px rgba(0,0,0,0.1);">
                        <h4 style="font-size: 0.95rem; margin-bottom: 4px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${top3[2].name}</h4>
                        <div style="font-size: 1.1rem; font-weight: 800; color: #CD7F32;">${top3[2].score} <small style="font-size: 0.7rem;">Pts</small></div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">${top3[2].totalDone} Tugas Selesai</div>
                    </div>
                </div>
                ` : ''}
            </div>
            `;
        }

        let othersHTML = '';
        if (others.length > 0) {
            othersHTML = `
            <div style="background: var(--bg-surface); border: var(--glass-border); border-radius: var(--radius-md); padding: 16px; margin-top: 24px;">
                <h4 style="margin-bottom: 16px; font-size: 1rem; color: var(--text-muted);">Peringkat Lainnya</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${others.map((e, idx) => `
                    <div style="display: flex; align-items: center; padding: 12px; border: 1px solid var(--glass-border); border-radius: var(--radius-sm); background: rgba(255,255,255,0.02);">
                        <div style="width: 30px; font-weight: 700; color: var(--text-muted); text-align: center;">${idx + 4}</div>
                        <img src="${e.avatar}" style="width: 40px; height: 40px; border-radius: 50%; margin-left: 12px; margin-right: 16px;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: var(--text-main);">${e.name}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">${e.totalDone} Tugas Selesai</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 700; color: var(--primary);">${e.score} Pts</div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        }

        mainContent.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; padding-bottom: 40px; animation: slideUp 0.4s ease;">
                <div style="text-align: center; margin-bottom: 16px;">
                    <span class="material-symbols-outlined" style="font-size: 3rem; color: var(--primary); margin-bottom: 12px; display: inline-block;">social_leaderboard</span>
                    <h2 style="font-size: 2rem; color: var(--text-main);">Leaderboard Kinerja Editor</h2>
                    <p style="color: var(--text-muted); max-width: 600px; margin: 12px auto 0 auto; line-height: 1.6;">
                        Peringkat ini dihitung secara dinamis berdasarkan kecepatan pengerjaan revisi, persentase kepatuhan terhadap deadline, dan kualitas output dari tiap editor.
                    </p>
                </div>

                ${top3HTML}
                ${othersHTML}
                
                ${lbData.length === 0 ? '<div style="text-align:center; padding: 40px; color: var(--text-muted);">Belum ada data kinerja editor.</div>' : ''}
            </div>
        `;
    } else if (pageId === 'profil') {
        let pData = { c1: state.user.name, c2: 'System Administrator', c3: '-', c4: '-', c5: '-', c6: '-', c7: '-' };
        let editBtnHtml = '';
        
        if (state.role !== 'superadmin' && window.appData['daftar-akun'] && window.appData['daftar-akun'].length > 0) {
            // Jika bukan superadmin, pura-pura ambil data editor pertama (karena login masih dummy)
            pData = window.appData['daftar-akun'][3];
            editBtnHtml = `<button class="btn-primary" onclick="window.openForm('daftar-akun', 3)" style="margin-left: auto; align-self: flex-start;">
                        <span class="material-symbols-outlined">edit</span> Edit Profil
                    </button>`;
        }

        mainContent.innerHTML = `
            <div class="glass-card" style="padding: 32px; border: var(--glass-border); border-radius: var(--radius-md); background: var(--bg-surface); max-width: 800px; margin: 0 auto;">
                <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 32px; flex-wrap: wrap;">
                    <img src="${state.user.photoURL}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);">
                    <div>
                        <h2 style="font-size: 1.8rem; margin-bottom: 4px;">${pData.c1}</h2>
                        <span style="background: var(--primary); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; display: inline-block; margin-bottom: 8px;">${state.role.toUpperCase()}</span>
                    </div>
                    ${editBtnHtml}
                </div>
                
                <h3 style="font-size: 1.1rem; margin-bottom: 16px; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">Detail Informasi</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;">
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">Nama Lengkap</label>
                        <div style="font-weight: 500;">${pData.c1 || '-'}</div>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">Divisi / Peran</label>
                        <div style="font-weight: 500;">${pData.c2 || '-'}</div>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">Nomor Induk (NIM/NIP)</label>
                        <div style="font-weight: 500;">${pData.c6 || '-'}</div>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">Fakultas</label>
                        <div style="font-weight: 500;">${pData.c4 || '-'}</div>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">Program Studi / Jurusan</label>
                        <div style="font-weight: 500;">${pData.c5 || '-'}</div>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">Nomor WhatsApp</label>
                        <div style="font-weight: 500;">${pData.c7 || '-'}</div>
                    </div>
                </div>
            </div>
        `;
    } else if (pageId === 'konten-medsos') {
        mainContent.innerHTML = `
            <div class="glass-card" style="padding: 48px 24px; text-align: center; border: var(--glass-border); border-radius: var(--radius-md); background: var(--bg-surface);">
                <div style="margin-bottom: 24px;">
                    <span class="material-symbols-outlined" style="font-size: 4rem; color: var(--primary); opacity: 0.8;">construction</span>
                </div>
                <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--text-main);">Dalam Tahap Pengembangan</h3>
                <p style="color: var(--text-muted); max-width: 400px; margin: 0 auto; line-height: 1.6;">Modul Konten Medsos saat ini sedang dalam proses pengembangan oleh tim IT. Nantikan pembaruannya segera!</p>
            </div>
        `;
    } else if (pageId === 'rekapitulasi-laporan') {
        const videos = window.appData['video-pembelajaran'] || [];
        const podcasts = window.appData['podcast'] || [];
        
        const vidDone = videos.filter(v => v.c8 && v.c8.includes('Finalized')).length;
        const vidProc = videos.length - vidDone;
        
        const podDone = podcasts.filter(p => p.c8 && p.c8.includes('Finalized')).length;
        const podProc = podcasts.length - podDone;
        
        mainContent.innerHTML = `
            <div style="margin-bottom: 16px; font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
                <a href="#dashboard" onclick="window.handleMenuClick('dashboard')" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: var(--radius-sm); background: var(--bg-surface-hover); border: 1px solid var(--glass-border); transition: all 0.2s ease;">
                    <span class="material-symbols-outlined" style="font-size: 1rem;">home</span> Beranda
                </a> 
                <span class="material-symbols-outlined" style="font-size: 1rem;">chevron_right</span>
                <span style="font-weight: 500; color: var(--primary);">Rekapitulasi Laporan</span>
            </div>
            
            <div class="glass-card" style="padding: 24px; border: var(--glass-border); background: var(--bg-surface); border-radius: var(--radius-md);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; flex-wrap: wrap; gap: 16px;">
                    <div>
                        <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 8px;">Rekapitulasi Laporan Produksi</h3>
                        <p style="color: var(--text-muted);">Ringkasan dari seluruh kegiatan produksi video dan podcast.</p>
                    </div>
                    <button class="btn-primary" onclick="window.downloadReportAction()" style="display: flex; align-items: center; gap: 8px;">
                        <span class="material-symbols-outlined">download</span> Unduh Laporan (CSV)
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); padding: 20px; border-radius: var(--radius-sm); text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: bold; color: var(--primary); margin-bottom: 8px;">${videos.length}</div>
                        <div style="font-weight: bold; color: var(--text-main);">Total Video Pembelajaran</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">${vidDone} Selesai &bull; ${vidProc} Proses</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); padding: 20px; border-radius: var(--radius-sm); text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: bold; color: var(--accent-1); margin-bottom: 8px;">${podcasts.length}</div>
                        <div style="font-weight: bold; color: var(--text-main);">Total Podcast</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">${podDone} Selesai &bull; ${podProc} Proses</div>
                    </div>
                </div>
            </div>
        `;
    } else if (['daftar-admin', 'daftar-uploader', 'daftar-editor', 'daftar-user', 'daftar-akun', 'klaster-dosen', 'mata-kuliah', 'story-board', 'video-podcast', 'media', 'video-pembelajaran', 'podcast'].includes(pageId)) {
        let thead = '';
        let tbody = '';
        let addBtnType = pageId; // map form type to pageId

        // RBAC Logic: Hide Actions for User Biasa
        let canEdit = state.role !== 'user';
        let isAutoRoleMenu = ['daftar-admin', 'daftar-uploader', 'daftar-editor', 'daftar-user'].includes(pageId);
        if (isAutoRoleMenu) {
            canEdit = false; // Disembunyikan karena membaca otomatis dari Master Daftar Akun
        }
        
        const actionTh = canEdit ? '<th style="text-align: right;">Aksi</th>' : '';
        window.renderActionTd = function (type, idx) {
            if (!canEdit) return '';
            return `<td style="text-align: right; white-space: nowrap;">
                <button class="btn-primary" style="padding: 6px 10px; font-size: 0.8rem; border-radius: var(--radius-sm); margin-right: 4px;" onclick="window.openForm('${type}', ${idx})">
                    <span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle;">edit</span>
                </button>
                <button class="btn-primary" style="padding: 6px 10px; font-size: 0.8rem; border-radius: var(--radius-sm); background: var(--accent-1); border: 1px solid var(--accent-1);" onclick="window.hapusData('${type}', ${idx})">
                    <span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle;">delete</span>
                </button>
            </td>`;
        };

        const config = window.tableConfigs[pageId];
        let data = window.appData[pageId] || [];

        // OTOMATISASI DAFTAR DARI ROLE
        if (pageId === 'daftar-admin') {
            data = (window.appData['daftar-akun'] || []).filter(a => a.c9 && a.c9.toLowerCase() === 'admin').map(a => ({ c1: a.c1, c2: a.c8 || `${a.c1.toLowerCase().replace(/ /g, '')}@kampus.ac.id`, c3: 'Admin' }));
        } else if (pageId === 'daftar-uploader') {
            data = (window.appData['daftar-akun'] || []).filter(a => a.c9 && a.c9.toLowerCase() === 'uploader').map(a => ({ c1: a.c1, c2: a.c8 || `${a.c1.toLowerCase().replace(/ /g, '')}@kampus.ac.id`, c3: 'Uploader' }));
        } else if (pageId === 'daftar-editor') {
            data = (window.appData['daftar-akun'] || []).filter(a => a.c9 && a.c9.toLowerCase() === 'editor').map(a => ({ c1: a.c1, c2: 'Junior Editor', c3: 'Tersedia' }));
        } else if (pageId === 'daftar-user') {
            data = (window.appData['daftar-akun'] || []).filter(a => a.c9 && a.c9.toLowerCase() === 'user').map(a => ({ c1: a.c1, c2: a.c8 || `${a.c1.toLowerCase().replace(/ /g, '')}@kampus.ac.id`, c3: `${a.c5} / ${a.c4}` }));
        }

        if (config) {
            thead = `<tr>` + config.heads.map(h => `<th>${h}</th>`).join('') + actionTh + `</tr>`;
            if (data && data.length > 0) {
                tbody = data.map((item, idx) => {
                    let cols = '';
                    for (let i = 1; i <= config.heads.length; i++) {
                        let val = item['c' + i] || '-';
                        if (typeof val === 'string' && val.match(/^https?:\/\/[^\s]+$/)) {
                            val = `<a href="${val}" target="_blank" style="color: var(--primary); text-decoration: underline;">${val}</a>`;
                        }
                        cols += `<td>${val}</td>`;
                    }
                    return `<tr>${cols}${window.renderActionTd(pageId, idx)}</tr>`;
                }).join('');
            } else {
                tbody = `<tr><td colspan="${config.heads.length + (canEdit ? 1 : 0)}" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 20px;">Belum ada data.</td></tr>`;
            }
        } else {
            thead = `<tr><th>Data dummy</th>${actionTh}</tr>`;
            tbody = `<tr><td>Belum ada konfigurasi untuk ${pageId}.</td>${window.renderActionTd(pageId, 0)}</tr>`;
        }

        // Generate Dynamic Filters based on Columns
        let dynamicFiltersHtml = '';
        if (config) {
            const filterCols = ['status pekerjaan', 'status', 'editor', 'dosen', 'peran'];
            config.heads.forEach((h, idx) => {
                const hl = h.toLowerCase();
                if (filterCols.includes(hl)) {
                    let uniqueValues = [];
                    if (hl === 'status pekerjaan' || hl === 'status') {
                        uniqueValues = ['To Do', 'In Progress', 'Review', 'Revision', 'Retake', 'Finalized'];
                    } else if (hl === 'editor') {
                        uniqueValues = (window.appData['daftar-akun'] || []).filter(a => a.c9 && a.c9.toLowerCase() === 'editor').map(a => a.c1);
                    } else if (hl === 'dosen') {
                        uniqueValues = (window.appData['klaster-dosen'] || []).map(a => a.c1);
                    } else if (hl === 'peran') {
                        uniqueValues = ['Admin', 'Uploader', 'Editor', 'User'];
                    } else if (data) {
                        uniqueValues = [...new Set(data.map(item => {
                            let val = item['c' + (idx + 1)] || '';
                            return val.replace(/<[^>]*>?/gm, '').trim();
                        }).filter(v => v !== '' && v !== 'Belum ada' && v !== '-'))];
                    }
                    
                    if (uniqueValues.length > 0) {
                        dynamicFiltersHtml += `
                            <select class="dynamic-filter" data-col-idx="${idx}" onchange="window.filterTable()" style="padding: 10px 14px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; border-radius: var(--radius-sm); outline: none; width: auto; font-size: 0.85rem; font-weight: 500; min-width: 150px;">
                                <option value="">Semua ${h}</option>
                                ${uniqueValues.map(v => `<option value="${v}">${v}</option>`).join('')}
                            </select>
                        `;
                    }
                }
            });
        }

        // Render Table View
        mainContent.innerHTML = `
            <div style="margin-bottom: 16px; font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
                <a href="#dashboard" onclick="window.handleMenuClick('dashboard')" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: var(--radius-sm); background: var(--bg-surface-hover); border: 1px solid var(--glass-border); transition: all 0.2s ease;">
                    <span class="material-symbols-outlined" style="font-size: 1rem;">home</span> Beranda
                </a> 
                <span class="material-symbols-outlined" style="font-size: 1rem;">chevron_right</span>
                <span style="font-weight: 500; color: var(--primary);">${pageData ? pageData.label : pageId}</span>
            </div>
            <div class="glass-card" style="padding: 24px; border: var(--glass-border); background: var(--bg-surface); border-radius: var(--radius-md);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
                    <h3 style="margin: 0;">${pageData ? pageData.label : pageId}</h3>
                    ${canEdit ? `<button class="btn-primary" onclick="openForm('${addBtnType}')" style="white-space: nowrap;">+ Tambah Data</button>` : ''}
                </div>
                <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                    ${dynamicFiltersHtml}
                    <div style="flex: 1; display: flex; align-items: center; position: relative; min-width: 200px;">
                        <span class="material-symbols-outlined" style="position: absolute; left: 12px; color: var(--text-muted); font-size: 1.2rem;">search</span>
                        <input type="text" id="global-search" onkeyup="window.filterTable()" placeholder="Cari bebas..." style="width: 100%; padding: 10px 10px 10px 40px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; border-radius: var(--radius-sm); outline: none; font-size: 0.85rem;">
                    </div>
                </div>
                <div class="table-wrapper">
                    <table>
                        <thead>${thead}</thead>
                        <tbody>${tbody}</tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (pageId === 'form-dosen') {
        mainContent.innerHTML = getFormHTML('klaster-dosen', false);
    } else if (pageId === 'form-mk') {
        mainContent.innerHTML = getFormHTML('mata-kuliah', false);
    } else if (pageId === 'form-video-pembelajaran') {
        mainContent.innerHTML = getFormHTML('video-pembelajaran', false);
    } else if (pageId.startsWith('form-')) {
        let actualType = pageId.replace('form-', '');
        mainContent.innerHTML = getFormHTML(actualType, false);
    } else {
        mainContent.innerHTML = `
            <div class="glass-card" style="padding: 24px; border: var(--glass-border); background: var(--bg-surface); border-radius: 0;">
                <h3>Halaman ${pageData ? pageData.label : pageId}</h3>
                <p class="mt-4" style="color: var(--text-muted)">Konten dummy untuk halaman ini belum dikonfigurasi.</p>
            </div>
        `;
    }
}

// Form HTML Generator
function getFormHTML(type, isMobile) {
    let title = '';
    let body = '';

    if (type === 'klaster-dosen') {
        title = 'Tambah Data Dosen';
        body = `
            <form onsubmit="window.handleFormSubmit(event, 'klaster-dosen')">
                <div style="margin-bottom: 24px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Nama Lengkap</label>
                    <input type="text" required placeholder="Masukkan nama..." style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                </div>
                <button type="submit" class="btn-primary w-100">Simpan</button>
            </form>
        `;
    } else if (['profil', 'halaman', 'kategori', 'rekapitulasi-laporan', 'daftar-admin', 'daftar-uploader', 'daftar-editor', 'daftar-user', 'daftar-akun'].includes(type)) {
        title = 'Kelola Data ' + type.replace('-', ' ').toUpperCase();
        const config = window.tableConfigs[type];

        let inputsHtml = config ? config.heads.map((h, i) => {
            // Dropdown untuk pendaftaran akun
            if (['daftar-admin', 'daftar-uploader', 'daftar-editor', 'daftar-user'].includes(type) && i === 0) {
                const options = window.appData['daftar-akun'] ? window.appData['daftar-akun'].map(a => `<option value="${a.c1}">${a.c1} (${a.c2})</option>`).join('') : '';
                return `
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">${h}</label>
                    <select required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                        <option value="">Pilih dari Daftar Akun...</option>
                        ${options}
                    </select>
                </div>`;
            } else if (type === 'daftar-editor' && i === 1) {
                return `
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">${h}</label>
                    <select required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                        <option value="Senior Editor">Senior Editor</option>
                        <option value="Junior Editor">Junior Editor</option>
                    </select>
                </div>`;
            } else if (type === 'daftar-akun' && h === 'Role') {
                return `
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">${h}</label>
                    <select required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                        <option value="User">User Biasa</option>
                        <option value="Editor">Editor Video</option>
                        <option value="Uploader">Uploader</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>`;
            }
            
            return `
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">${h}</label>
                <input type="text" required placeholder="Masukkan ${h}..." style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
            </div>`;
        }).join('') : '<p>Konfigurasi tidak ditemukan.</p>';

        body = `
            <form onsubmit="window.handleFormSubmit(event, '${type}')">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0 16px;">
                    ${inputsHtml}
                </div>
                <button type="submit" class="btn-primary w-100" style="margin-top: 16px;">Simpan</button>
            </form>
        `;

    } else if (type === 'mata-kuliah') {
        title = 'Tambah Mata Kuliah';
        body = `
            <form onsubmit="window.handleFormSubmit(event, 'mata-kuliah')">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Kode MK</label>
                    <input type="text" required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Nama Mata Kuliah</label>
                    <input type="text" required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                </div>
                <button type="submit" class="btn-primary w-100">Simpan</button>
            </form>
        `;
    } else if (type === 'story-board') {
        title = 'Tambah Story Board';
        body = `
            <form onsubmit="window.handleFormSubmit(event, 'story-board')">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0 16px;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Judul Story Board</label>
                        <input type="text" required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Dosen</label>
                        <select required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                            <option value="">Pilih Dosen...</option>
                            ${window.appData['klaster-dosen'] ? window.appData['klaster-dosen'].map(d => `<option value="${d.c1}">${d.c1}</option>`).join('') : ''}
                        </select>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Mata Kuliah</label>
                        <select required class="ignore-save" onchange="document.getElementById('sb-kode-mk').value = this.options[this.selectedIndex].getAttribute('data-kode') || '';" style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                            <option value="" data-kode="">Pilih MK...</option>
                            ${window.appData['mata-kuliah'] ? window.appData['mata-kuliah'].map(mk => `<option value="${mk.c2}" data-kode="${mk.c1}">${mk.c2}</option>`).join('') : ''}
                        </select>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Kode MK</label>
                        <input type="text" required id="sb-kode-mk" readonly placeholder="Otomatis terisi..." style="width: 100%; padding: 12px; border: var(--glass-border); background: rgba(0,0,0,0.2); color: var(--primary); opacity: 1; -webkit-text-fill-color: var(--primary); font-weight: bold; font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Tautan (URL) / Google Docs</label>
                        <input type="url" style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Atau Upload File</label>
                        <input type="file" style="width: 100%; padding: 12px; border: 1px dashed var(--accent-1); background: transparent; color: var(--text-main); border-radius: var(--radius-sm);">
                    </div>
                </div>
                <button type="submit" class="btn-primary w-100" style="margin-top: 16px;">Simpan</button>
            </form>
        `;
    } else if (type === 'video-pembelajaran') {
        title = 'Form Video Pembelajaran';
        body = `
            <form onsubmit="window.handleFormSubmit(event, 'video-pembelajaran')">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0 16px;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Judul Video Pembelajaran</label>
                        <input type="text" required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Nama Dosen</label>
                        <select required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                            <option value="">Pilih Dosen...</option>
                            ${window.appData['klaster-dosen'] ? window.appData['klaster-dosen'].map(d => `<option value="${d.c1}">${d.c1}</option>`).join('') : ''}
                        </select>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Mata Kuliah</label>
                        <select required onchange="document.getElementById('video-kode-mk').value = this.options[this.selectedIndex].getAttribute('data-kode') || '';" style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                            <option value="" data-kode="">Pilih MK...</option>
                            ${window.appData['mata-kuliah'] ? window.appData['mata-kuliah'].map(mk => `<option value="${mk.c2}" data-kode="${mk.c1}">${mk.c2}</option>`).join('') : ''}
                        </select>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Kode MK</label>
                        <input type="text" id="video-kode-mk" readonly placeholder="Otomatis terisi..." style="width: 100%; padding: 12px; border: var(--glass-border); background: rgba(0,0,0,0.2); color: var(--primary); opacity: 1; -webkit-text-fill-color: var(--primary); font-weight: bold; font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Story Board</label>
                        <input type="text" list="storyboard-options" placeholder="Ketik atau pilih Story Board..." style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                        <datalist id="storyboard-options">
                            ${window.appData['story-board'] ? window.appData['story-board'].map(sb => `<option value="${sb.c1}">`).join('') : ''}
                        </datalist>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Upload File Revisi</label>
                        <input type="file" style="width: 100%; padding: 12px; border: 1px dashed var(--glass-border); background: var(--bg-base); color: var(--text-main); border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Upload File Hasil Final</label>
                        <input type="file" style="width: 100%; padding: 12px; border: 1px dashed var(--primary); background: var(--bg-base); color: var(--text-main); border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Status Pekerjaan</label>
                        <select style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Review</option>
                            <option>Revision</option>
                            <option>Retake</option>
                            <option>Finalized</option>
                        </select>
                    </div>
                </div>
                <div style="background: rgba(138, 43, 226, 0.1); border-left: 4px solid var(--primary); padding: 12px; margin-bottom: 24px; border-radius: 4px;">
                    <p style="font-size: 0.85rem; color: var(--text-main);"><strong>Pemberitahuan Otomatisasi:</strong> Editor dan Deadline akan <b>dialokasikan secara otomatis</b> oleh sistem saat pengajuan disimpan.</p>
                </div>
                <button type="submit" class="btn-primary w-100">Submit Pengajuan</button>
            </form>
        `;
    } else if (type === 'video-podcast') {
        title = 'Tambah RAW Video Podcast';
        body = `
            <form onsubmit="window.handleFormSubmit(event, 'video-podcast')">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Judul RAW Video</label>
                    <input type="text" required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Tanggal Rekaman</label>
                        <input type="date" required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Durasi (menit)</label>
                        <input type="number" required placeholder="Contoh: 45" style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                </div>
                <button type="submit" class="btn-primary w-100">Simpan RAW</button>
            </form>
        `;
    } else if (type === 'podcast') {
        title = 'Form Podcast';
        body = `
            <form onsubmit="window.handleFormSubmit(event, 'podcast')">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0 16px;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Judul Video Podcast</label>
                        <input type="text" required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Pilih RAW Video Podcast</label>
                        <select required style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                            <option value="">Pilih RAW Video...</option>
                            ${window.appData['video-podcast'] ? window.appData['video-podcast'].map(vp => `<option value="${vp.c1}">${vp.c1} (${vp.c2})</option>`).join('') : ''}
                        </select>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Narasumber & Host</label>
                        <textarea required placeholder="Contoh: Budi (Narasumber), Siti (Host). Pisahkan dengan koma jika lebih dari satu." style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm); resize: vertical; min-height: 80px;"></textarea>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Upload File Revisi</label>
                        <input type="file" style="width: 100%; padding: 12px; border: 1px dashed var(--glass-border); background: var(--bg-base); color: var(--text-main); border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Upload File Hasil Final</label>
                        <input type="file" style="width: 100%; padding: 12px; border: 1px dashed var(--primary); background: var(--bg-base); color: var(--text-main); border-radius: var(--radius-sm);">
                    </div>
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; color: var(--text-muted);">Status Pekerjaan</label>
                        <select style="width: 100%; padding: 12px; border: var(--glass-border); background: var(--bg-base); color: var(--text-main); font-family: inherit; outline: none; border-radius: var(--radius-sm);">
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Review</option>
                            <option>Revision</option>
                            <option>Retake</option>
                            <option>Finalized</option>
                        </select>
                    </div>
                </div>
                <div style="background: rgba(138, 43, 226, 0.1); border-left: 4px solid var(--primary); padding: 12px; margin-bottom: 24px; border-radius: 4px;">
                    <p style="font-size: 0.85rem; color: var(--text-main);"><strong>Pemberitahuan Otomatisasi:</strong> Editor dan Deadline akan <b>dialokasikan secara otomatis</b> oleh sistem saat pengajuan disimpan.</p>
                </div>
                <button type="submit" class="btn-primary w-100">Submit Pengajuan</button>
            </form>
        `;
    } else {
        body = '<p>Formulir belum tersedia.</p>';
    }

    if (isMobile) {
        return { title, body };
    } else {
        return `
            <div style="margin-bottom: 16px; font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
                <a href="#dashboard" onclick="window.handleMenuClick('dashboard')" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: var(--radius-sm); background: var(--bg-surface-hover); border: 1px solid var(--glass-border); transition: all 0.2s ease;">
                    <span class="material-symbols-outlined" style="font-size: 1rem;">home</span> Beranda
                </a> 
                <span class="material-symbols-outlined" style="font-size: 1rem;">chevron_right</span>
                <a href="#${type}" onclick="window.handleMenuClick('${type}')" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; padding: 4px 8px; border-radius: var(--radius-sm); background: var(--bg-surface-hover); border: 1px solid var(--glass-border);">
                    <span class="material-symbols-outlined" style="font-size: 1rem;">arrow_back</span> Kembali ke Daftar
                </a>
                <span class="material-symbols-outlined" style="font-size: 1rem;">chevron_right</span>
                <span style="font-weight: 500; color: var(--primary);">Formulir</span>
            </div>
            <div class="glass-card" style="padding: 24px; border: var(--glass-border); background: var(--bg-surface); border-radius: var(--radius-md); max-width: 1200px; width: 100%;">
                <h3 style="margin-bottom: 24px;">${title}</h3>
                ${body}
            </div>
        `;
    }
}

// Global UI Handlers
// (viewFileAction sudah didefinisikan di atas)

window.openForm = function (type, index = -1) {
    window.editingIndex = index;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        const formData = getFormHTML(type, true);
        document.getElementById('bs-title').textContent = formData.title;
        document.getElementById('bs-body').innerHTML = formData.body;
        document.getElementById('bottom-sheet').classList.remove('hidden');
    } else {
        // Redirect to full page
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        loadPageContent('form-' + type);
    }

    // Populate form fields for edit mode
    if (index >= 0 && window.appData[type] && window.appData[type][index]) {
        setTimeout(() => {
            const container = isMobile ? document.getElementById('bs-body') : document.getElementById('main-content');
            const form = container.querySelector('form');
            if (form) {
                const inputs = Array.from(form.elements).filter(e =>
                    (e.tagName === 'INPUT' || e.tagName === 'SELECT' || e.tagName === 'TEXTAREA') &&
                    !e.classList.contains('ignore-save')
                );
                const row = window.appData[type][index];

                if (type === 'video-pembelajaran') {
                    if (inputs[0]) inputs[0].value = (row.c1 || '').replace(/<[^>]*>?/gm, '');

                    const c2parts = (row.c2 || '').split('<br>');
                    if (c2parts.length > 0 && inputs[1]) {
                        inputs[1].value = c2parts[0].trim();
                    }
                    if (c2parts.length > 1 && inputs[2]) {
                        const mkMatch = c2parts[1].match(/>(.*?)\s*\(/); // Extract MK name
                        const kodeMatch = c2parts[1].match(/\((.*?)\)/); // Extract Kode
                        if (mkMatch && mkMatch[1]) {
                            // Find option in select that matches text
                            Array.from(inputs[2].options).forEach((opt, i) => {
                                if (opt.text.trim() === mkMatch[1].trim()) inputs[2].selectedIndex = i;
                            });
                        }
                        if (kodeMatch && kodeMatch[1] && inputs[3]) {
                            inputs[3].value = kodeMatch[1];
                        }
                    }

                    if (inputs[4] && row.c3) {
                        const sbMatch = row.c3.match(/data-val="(.*?)"/);
                        if (sbMatch) {
                            inputs[4].value = sbMatch[1];
                        } else if (row.c3.includes('preview')) {
                            inputs[4].value = 'SB Pertemuan 1 - Konsep Web'; // fallback for old data
                        }
                    }
                    if (inputs[7]) {
                        const statusRaw = (row.c8 || '').replace(/<[^>]*>?/gm, '').trim();
                        inputs[7].value = statusRaw;
                    }
                } else if (type === 'podcast') {
                    if (inputs[0]) inputs[0].value = (row.c1 || '').replace(/<[^>]*>?/gm, '');
                    
                    if (inputs[1] && row.c2) {
                        const rawMatch = row.c2.match(/(.*?)\s*\(/);
                        const matchText = (rawMatch ? rawMatch[1] : row.c2).replace(/<[^>]*>?/gm, '').trim();
                        Array.from(inputs[1].options).forEach((opt, i) => {
                            if (opt.text.trim().startsWith(matchText)) inputs[1].selectedIndex = i;
                        });
                    }
                    
                    if (inputs[2]) {
                        inputs[2].value = row.c3.replace(/<br>/g, '\n').replace(/<[^>]*>?/gm, '');
                    }
                    
                    if (inputs[5]) {
                        const statusRaw = (row.c8 || '').replace(/<[^>]*>?/gm, '').trim();
                        inputs[5].value = statusRaw;
                    }
                } else if (type === 'video-podcast') {
                    if (inputs[0]) inputs[0].value = (row.c1 || '').replace(/<[^>]*>?/gm, '');
                    if (inputs[1] && row.c2) {
                        // try to parse DD-MM-YYYY to YYYY-MM-DD
                        const parts = row.c2.split('-');
                        if (parts.length === 3) {
                            inputs[1].value = `${parts[2]}-${parts[1]}-${parts[0]}`;
                        }
                    }
                    if (inputs[2]) {
                        inputs[2].value = (row.c3 || '').replace(/[^\d]/g, '');
                    }
                } else if (type === 'story-board') {
                    if (inputs[0]) inputs[0].value = (row.c1 || '').replace(/<[^>]*>?/gm, '');
                    if (inputs[1]) inputs[1].value = (row.c2 || '').replace(/<[^>]*>?/gm, '');
                    if (inputs[2]) inputs[2].value = (row.c3 || '').replace(/<[^>]*>?/gm, '');
                    
                    const formEl = isMobile ? document.getElementById('bs-body').querySelector('form') : document.getElementById('main-content').querySelector('form');
                    if (formEl) {
                        const mkSelect = formEl.querySelector('select.ignore-save');
                        if (mkSelect && row.c3) {
                            const kode = row.c3.replace(/<[^>]*>?/gm, '');
                            Array.from(mkSelect.options).forEach((opt, i) => {
                                if (opt.getAttribute('data-kode') === kode) mkSelect.selectedIndex = i;
                            });
                        }
                    }
                } else {
                    const config = window.tableConfigs[type];
                    const totalCols = config ? config.heads.length : 8;
                    for (let i = 0; i < totalCols; i++) {
                        if (inputs[i] && inputs[i].type !== 'file' && inputs[i].type !== 'url') {
                            let val = row['c' + (i + 1)] || '';
                            if (val.includes('<button')) val = '';
                            inputs[i].value = val.replace(/<[^>]*>?/gm, '');
                        }
                    }
                }
            }
        }, 50);
    }
};

window.handleMenuClick = function (id) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const targetLink = document.querySelector('.nav-item[href="#' + id + '"]');
    if (targetLink) targetLink.classList.add('active');
    loadPageContent(id);
};

window.loginWithGoogle = function() {
    window.showToast("Fitur Login Google sedang dinonaktifkan sementara.");
    /*
    signInWithPopup(auth, googleProvider).catch(error => {
        console.error("Auth Error:", error);
        window.showToast("Gagal login: " + error.message, true);
    });
    */
};

window.performLogout = function() {
    window.showToast("Berhasil logout (Dummy)");
    /*
    signOut(auth).then(() => {
        window.showToast("Berhasil logout");
    });
    */
};

window.submitAccessRequest = async function(event) {
    event.preventDefault();
    window.showToast("Pengajuan akses sedang dinonaktifkan sementara.");
    /*
    if (!auth.currentUser) return;
    
    const role = document.getElementById('req-role').value;
    const instansi = document.getElementById('req-instansi').value;
    const user = auth.currentUser;
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memproses...';
    
    try {
        await setDoc(doc(db, "users", user.uid), {
            c1: user.displayName || user.email.split('@')[0], // Nama
            c2: user.email, // Email
            c3: instansi || '-', // Instansi
            role: role,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
        window.showToast("Pengajuan berhasil dikirim!");
        renderView('pending-approval');
    } catch (error) {
        console.error("Error submit request:", error);
        window.showToast("Gagal mengirim pengajuan", true);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Pengajuan';
    }
    */
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
