import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../components/Layout/PublicLayout';
import { useAppContext } from '../context/AppContext';
import VideoCard from '../components/UI/VideoCard';

const services = [
  {
    icon: 'smart_display',
    title: 'Pengembangan Konten Pembelajaran Digital',
    slug: 'pengembangan-konten',
    desc: 'Kami memfasilitasi produksi video pembelajaran interaktif, animasi edukasi, dan materi ajar multimedia interaktif dengan standar penyiaran profesional. Solusi end-to-end kami mencakup pra-produksi, syuting dengan kualitas broadcast, hingga pasca-produksi menggunakan teknologi motion graphics.',
    color: 'var(--primary)'
  },
  {
    icon: 'school',
    title: 'Pelatihan Teknologi Pendidikan',
    slug: 'pelatihan-teknologi',
    desc: 'Menyelenggarakan workshop dan sertifikasi bagi dosen serta tenaga kependidikan dalam penguasaan perangkat lunak LMS dan desain instruksional modern. Kami menghadirkan pakar-pakar teknologi pendidikan terkemuka untuk memastikan transfer knowledge yang optimal.',
    color: '#3b82f6'
  },
  {
    icon: 'mic_external_on',
    title: 'Podcast Inovasi',
    slug: 'podcast-inovasi',
    desc: 'Studio podcast terdedikasi untuk membedah isu-isu kontemporer dalam dunia pendidikan, sains, dan kajian Islam bersama para pakar. Fasilitas ini didukung dengan peralatan rekam audio visual berstandar profesional untuk menghasilkan output siaran yang jernih dan berkualitas tinggi.',
    color: '#f59e0b'
  },
  {
    icon: 'menu_book',
    title: 'OIER (Open Islamic Educational Resources)',
    slug: 'oier',
    desc: 'Membangun repositori raksasa berlisensi terbuka yang berisi literatur, modul, jurnal, dan aset digital untuk pendidikan Islam secara global. Kami berkomitmen untuk membuka akses seluas-luasnya terhadap sumber daya pengetahuan Islam yang otoritatif dan kredibel.',
    color: '#10b981'
  },
  {
    icon: 'view_in_ar',
    title: 'Virtual Reality & Immersive Learning',
    slug: 'virtual-reality',
    desc: 'Mengeksplorasi penggunaan teknologi VR/AR untuk simulasi praktikum, tur sejarah peradaban Islam, dan lingkungan belajar tanpa batas ruang. Teknologi imersif kami dirancang khusus untuk meningkatkan engagement dan retensi pemahaman mahasiswa secara signifikan.',
    color: '#8b5cf6'
  }
];

const Layanan: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { state } = useAppContext();
  
  // Deteksi layanan dari CMS
  const cmsLayanan = state.appData['cms-layanan'] || [];
  const dynamicServices = cmsLayanan.length > 0 ? cmsLayanan.map((l: any, idx: number) => {
    const colors = ['var(--primary)', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];
    return {
      title: l.c1 || 'Untitled',
      desc: l.c2 || '',
      icon: l.c3 || 'design_services',
      slug: (l.c1 || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      color: colors[idx % colors.length]
    };
  }) : services.map(s => ({ ...s, slug: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));

  // Deteksi jika slug ada dan cocok
  const selectedService = slug ? dynamicServices.find((s: any) => s.slug === slug) : null;

  // Extract both Videos and Podcasts that target this specific menu!
  const targetMenu = selectedService?.title;
  
  const targetedVideos = targetMenu ? (state.appData['video-pembelajaran'] || [])
    .filter((v: any) => v.c8?.includes('Finalized') && v.c9 === targetMenu)
    .map((v: any) => ({
      title: v.c1 || 'Untitled Video',
      lecturer: v.c2 || 'Unknown',
      course: v.c2_mk || 'Materi Kuliah',
      videoLink: v.c5 || '#',
      date: v.c7 || 'Baru',
      type: 'Video Edukasi' as const
    })) : [];

  const targetedPodcasts = targetMenu ? (state.appData['podcast'] || [])
    .filter((p: any) => p.c8?.includes('Finalized') && p.c9 === targetMenu)
    .map((p: any) => ({
      title: p.c1 || 'Untitled Podcast',
      lecturer: p.c3 || 'Unknown',
      course: 'Sesi Diskusi',
      videoLink: p.c5 || '#',
      date: p.c7 || 'Baru',
      type: 'Podcast' as const
    })) : [];

  const combinedGallery = [...targetedVideos, ...targetedPodcasts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PublicLayout>
      <div style={{ padding: '80px 40px', minHeight: 'calc(100vh - 200px)', background: 'var(--bg-base)' }}>
        {selectedService ? (
          // === DETAIL PAGE ===
          <div style={{ maxWidth: '1200px', margin: '0 auto', animation: 'slideUp 0.4s ease' }}>
            <Link to="/layanan" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, marginBottom: '40px', background: 'rgba(188, 48, 95, 0.1)', padding: '8px 16px', borderRadius: '50px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>arrow_back</span> Kembali ke Layanan
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: `${selectedService.color}15`, color: selectedService.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>{selectedService.icon}</span>
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', lineHeight: 1.2, flex: 1, minWidth: '300px' }}>{selectedService.title}</h1>
            </div>
            
            <div className="glass-card" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', background: 'var(--bg-surface)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--text-main)' }}>Deskripsi Layanan</h3>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                {selectedService.desc}
              </p>
              
              <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(0,0,0,0.02)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>info</span>
                  <span style={{ fontWeight: 500 }}>Informasi Pendaftaran Layanan</span>
                </div>
                <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 0 }}>
                  Untuk mengakses atau bermitra dalam layanan ini, silakan hubungi tim Pusat Inovasi Pembelajaran Digital (PIPD) melalui menu <Link to="/titik-temu" style={{ color: 'var(--primary)' }}>Titik Temu</Link> atau portal akademik terpadu.
                </p>
              </div>
            </div>

            {/* Render Dynamic Gallery if applicable */}
            {combinedGallery.length > 0 && (
              <div style={{ marginTop: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                  <div>
                    <h3 style={{ fontSize: '2rem', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="material-symbols-outlined" style={{ color: selectedService.color }}>video_library</span> 
                      Galeri Layanan
                    </h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Menampilkan karya-karya terbaru dari layanan {selectedService.title}.</p>
                  </div>
                  <span style={{ color: selectedService.color, fontWeight: 'bold', background: `${selectedService.color}15`, padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>{combinedGallery.length} Karya</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                  {combinedGallery.map((item, idx) => (
                    <VideoCard 
                      key={idx}
                      title={item.title}
                      lecturer={item.lecturer}
                      course={item.course}
                      date={item.date}
                      type={item.type}
                      videoLink={item.videoLink}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // === CATALOG PAGE ===
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--text-main)' }}>Layanan Unggulan <span style={{ color: 'var(--primary)' }}>PIPD</span></h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 60px auto', lineHeight: 1.6 }}>
              Kami menyediakan ekosistem pendukung yang komprehensif untuk mendongkrak kualitas pendidikan melalui sentuhan teknologi mutakhir.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
              {dynamicServices.map((srv: any, idx: number) => (
                <Link key={idx} to={`/layanan/${srv.slug}`} className="glass-card" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', transition: 'transform 0.3s ease', cursor: 'pointer', textDecoration: 'none', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `${srv.color}15`, color: srv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>{srv.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-main)' }}>{srv.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {srv.desc}
                  </p>
                  <div style={{ marginTop: '24px', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                    Pelajari lebih lanjut <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Call to action */}
            <div style={{ marginTop: '80px', padding: '60px', background: 'linear-gradient(135deg, var(--primary), var(--accent-1))', borderRadius: '24px', color: 'white' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Butuh Solusi Khusus?</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '32px', opacity: 0.9 }}>Tim ahli kami siap mendiskusikan kebutuhan institusi Anda.</p>
              <Link to="/titik-temu" className="btn-outline" style={{ border: '2px solid white', color: 'white', padding: '16px 32px', fontSize: '1.1rem', background: 'transparent' }}>Hubungi Kami Sekarang</Link>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default Layanan;
