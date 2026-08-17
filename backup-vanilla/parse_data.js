const fs = require('fs');

const raw_data = `
Siti Hamidah	2384110102	6	FDKI	Komunikasi dan Penyiaran Islam	Mentor Fotografer/Videografer	6281320995472
Auliya Rahmi	2381020029	6	FITK	Pendidikan Bahasa Arab	Mentor Fotografer/Videografer	62895404577828
M. Surya Fadlilah Ramadhan	2381030113	6	FITK	Tadris Bahasa Inggris	Mentor Desain Grafis	6282185090756
Rizki Faturohman	2385150043	6	FUA	Bahasa dan Sastra Arab	Editor Video	6281394301290
Muhammad Adam Habibie	2485150040	4	FUA	Bahasa dan Sastra Arab	Editor Video	6289526573241
Muhammad Lazuardi Ramadhani	2530212139	2	FASYA	Ekonomi Syariah	Editor Video	6289699062022
Azza Taqiuddin Mubarok	2384110019	6	FDKI	Komunikasi dan Penyiaran Islam	Editor Video	6285624891772
Abdul Karim	2484110062	4	FDKI	Komunikasi dan Penyiaran Islam	Editor Video	6282240227905
Muhammad Rafly Maulana	2481020044	4	FITK	Pendidikan Bahasa Arab	Editor Video	6285281742740
Amirul Abdillah Hakim	2530113072	2	FITK	PJJ Pendidikan Bahasa Arab	Editor Video	6285784215990
M Rizki Maulana	2385140026	6	FUA	Ilmu Hadis	Editor Video	6285712221459
Ahmad Sakhi Habibi Habibi	2530214029	2	FEBI	Pariwisata Syariah	Editor Video	6281214677120
Cahyo Ferdhinan	2484120001	4	FDKI	Pengembangan Masyarakat Islam	Editor Video	6285281661009
Dwi Juniarti Mirwandini	2385160011	6	FUA	Aqidah dan Filsafat Islam	Editor Video	6283829812717
Lu’Lu Atul Ainiyah	2485150027	4	FUA	Bahasa dan Sastra Arab	Editor Video	6287717776727
Naura Azzahra Akhmadi Tadjwid	2484110098	4	FDKI	Komunikasi dan Penyiaran Islam	Editor Video	59992
Anjani Yuniarti	2384110028	6	FDKI	Komunikasi dan Penyiaran Islam	Editor Video	6288296942555
Zalfa Nabila	2481070078	2	FITK	Pendidikan Guru Madrasah Ibtidaiyah	Editor Video	6285759120697
Nabila Ainurrahmah	2481100066	4	FITK	Tadris Bahasa Indonesia	Editor Video	6282117874268
Masya Islamiah	2481030090	4	FITK	Tadris Bahasa Inggris	Editor Video	6285213960989
Hanny Habibah Olansya Iyanuarinka	2381050016	6	FITK	Tadris Matematika	Editor Video	62895357410822
Sri Wulan Apriliyanti	2385160005	6	FUA	Tasawuf dan Psikoterapi	Editor Video	6283898112912
Nurul Ramadhani	2481020072	4	FITK	Pendidikan Bahasa Arab	Editor Video	6285786451894
Fajar Nur Sidik	2484110049	4	FDKI	Komunikasi dan Penyiaran Islam	Desain Grafis	6282119887267
Farhan Hilmy Mubaarok	2381020039	6	FITK	Pendidikan Bahasa Arab	Desain Grafis	6285863803454
Nur Sahid	2481020059	4	FITK	Pendidikan Bahasa Arab	Desain Grafis	6285860263428
Sofiyatul Zannah	2485130003	4	FUA	Ilmu Al-Qur’An dan Tafsir	Desain Grafis	6285659650109
Irfan Mubarok	2488010075	4	FITK	Informatika	Operator Podcast	6283804339441
Dadan Danu	2381020012	6	FITK	Pendidikan Bahasa Arab	Operator Podcast	6282130270591
Syarif Abdurohman	2384110127	6	FDKI	Komunikasi dan Penyiaran Islam	Operator Podcast	6281464438982
Aminah Amna	2484110038	4	FDKI	Komunikasi dan Penyiaran Islam	Operator Podcast	6281573092061
Ziyah Nujumul Inayah	2481070044	4	FITK	Pendidikan Guru Madrasah Ibtidaiyah	Operator Podcast	6283128975681
Daffa Luthfillah	2485130001	4	FUA	Ilmu Al-Qur'An dan Tafsir	Fotografer/Videografer	6289513586162
Faiz Abdur Rojib	2384110065	6	FDKI	Komunikasi dan Penyiaran Islam	Fotografer/Videografer	6285722454077
Devina Nuramalina	2384130156	6	FDKI	Bimbingan dan Konseling Islam	Fotografer/Videografer	6281288089413
Nisa Nurmalasari	2384110089	6	FDKI	Komunikasi dan Penyiaran Islam	Fotografer/Videografer	62859113502878
Regar Herlambang	2481040056	4	FITK	Tadris Ilmu Pengetahuan Sosial	Fotografer/Videografer	6283824015255
Rosiana Sari	2385160025	6	FUA	Tasawuf dan Psikoterapi	Fotografer/Videografer	6282110788902
Tathia Putri Inasyah	2482130116	4	FEBI	Akuntansi Syariah	Operator Podcast	62895320385097
Muslikah Anggrayni	2384130064	6	FDKI	Bimbingan dan Konseling Islam	Operator Podcast	6288229226535
Siti Rokhiya	2484110015	4	FDKI	Komunikasi dan Penyiaran Islam	Operator Podcast	6283890093451
Eva Sulastri	2384110098	6	FDKI	Komunikasi dan Penyiaran Islam	Operator Podcast	6285880889338
Laila Ulfatur Rahmah	2384110132	6	FDKI	Komunikasi dan Penyiaran Islam	Fotografer/Videografer	6281398066380
`;

let lines = raw_data.trim().split('\n');
let out = [];

for (let line of lines) {
    let parts = line.split('\t');
    if (parts.length >= 7) {
        let c1 = parts[0];
        let c6 = parts[1];
        let c3 = parts[2];
        let c4 = parts[3];
        let c5 = parts[4];
        let c2 = parts[5];
        let c7 = parts[6];
        
        let role = "User";
        let div_lower = c2.toLowerCase();
        if (div_lower.includes("mentor")) {
            role = "Admin";
        } else if (div_lower.includes("editor") || div_lower.includes("desain")) {
            role = "Editor";
        } else if (div_lower.includes("operator") || div_lower.includes("fotografer") || div_lower.includes("videografer")) {
            role = "Uploader";
        }
        
        out.push(`        { c1: "${c1.replace(/"/g, '\\"')}", c2: "${c2.replace(/"/g, '\\"')}", c3: "${c3}", c4: "${c4.replace(/"/g, '\\"')}", c5: "${c5.replace(/"/g, '\\"')}", c6: "${c6}", c7: "${c7}", c8: "${role}" }`);
    }
}
out.push(`        { c1: "Yuyun Wulandari", c2: "Superadmin", c3: "8", c4: "FST", c5: "Sistem Informasi", c6: "112233", c7: "08111222333", c8: "Admin" }`);

const newArray = `    'daftar-akun': [\n${out.join(',\n')}\n    ]`;

const appJs = fs.readFileSync('app.js', 'utf8');
const updated = appJs.replace(/    'daftar-akun': \[[\s\S]*?\]/, newArray);
fs.writeFileSync('app.js', updated);

console.log('Success replacing data!');
