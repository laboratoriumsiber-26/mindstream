import React from 'react';
import PublicLayout from '../components/Layout/PublicLayout';

const services = [
  {
    icon: 'smart_display',
    title: 'Pengembangan Konten Pembelajaran Digital',
    desc: 'Kami memfasilitasi produksi video pembelajaran interaktif, animasi edukasi, dan materi ajar multimedia interaktif dengan standar penyiaran profesional.',
    color: 'var(--primary)'
  },
  {
    icon: 'school',
    title: 'Pelatihan Teknologi Pendidikan',
    desc: 'Menyelenggarakan workshop dan sertifikasi bagi dosen serta tenaga kependidikan dalam penguasaan perangkat lunak LMS dan desain instruksional modern.',
    color: '#3b82f6'
  },
  {
    icon: 'mic_external_on',
    title: 'Podcast Inovasi',
    desc: 'Studio podcast terdedikasi untuk membedah isu-isu kontemporer dalam dunia pendidikan, sains, dan kajian Islam bersama para pakar.',
    color: '#f59e0b'
  },
  {
    icon: 'menu_book',
    title: 'OIER (Open Islamic Educational Resources)',
    desc: 'Membangun repositori raksasa berlisensi terbuka yang berisi literatur, modul, jurnal, dan aset digital untuk pendidikan Islam secara global.',
    color: '#10b981'
  },
  {
    icon: 'view_in_ar',
    title: 'Virtual Reality & Immersive Learning',
    desc: 'Mengeksplorasi penggunaan teknologi VR/AR untuk simulasi praktikum, tur sejarah peradaban Islam, dan lingkungan belajar tanpa batas ruang.',
    color: '#8b5cf6'
  }
];

const Layanan: React.FC = () => {
  return (
    <PublicLayout>
      <div style={{ padding: '80px 40px', textAlign: 'center', background: 'var(--bg-base)' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--text-main)' }}>Layanan Unggulan <span style={{ color: 'var(--primary)' }}>PIPD</span></h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 60px auto', lineHeight: 1.6 }}>
          Kami menyediakan ekosistem pendukung yang komprehensif untuk mendongkrak kualitas pendidikan melalui sentuhan teknologi mutakhir.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
          {services.map((srv, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `${srv.color}15`, color: srv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>{srv.icon}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-main)' }}>{srv.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div style={{ marginTop: '80px', padding: '60px 40px', background: 'linear-gradient(135deg, rgba(188,48,95,0.1), rgba(138,43,226,0.1))', borderRadius: 'var(--radius-lg)', maxWidth: '1200px', margin: '80px auto 0 auto', border: '1px solid var(--primary)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text-main)' }}>Tertarik Berkolaborasi?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto' }}>Jika instansi, fakultas, atau komunitas Anda ingin memanfaatkan fasilitas dan keahlian kami, hubungi kami sekarang.</p>
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '30px' }}>Hubungi Kemitraan</button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Layanan;
