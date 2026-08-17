import React from 'react';
import PublicLayout from '../components/Layout/PublicLayout';

const Tentang: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div style={{ padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(138, 43, 226, 0.1) 0%, var(--bg-base) 100%)', borderBottom: '1px solid var(--glass-border)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: '0 0 24px 0', background: 'linear-gradient(90deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Tentang Kami
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
          Pusat Inovasi Pembelajaran Digital (PIPD) adalah lembaga strategis di bawah UIN Siber Syekh Nurjati Cirebon yang berdedikasi penuh untuk mengarustamakan transformasi pendidikan Islam berbasis teknologi terkini.
        </p>
      </div>

      <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Visi Misi */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          <div className="glass-card" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(188, 48, 95, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>visibility</span>
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Visi Kami</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Menjadi pusat unggulan (*Center of Excellence*) dalam pengembangan inovasi pembelajaran digital dan teknologi pendidikan Islam bertaraf internasional yang inklusif, adaptif, dan berkelanjutan.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(10, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>rocket_launch</span>
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Misi Kami</h2>
            <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '12px' }}>Menyelenggarakan riset dan pengembangan teknologi pendidikan yang tepat guna.</li>
              <li style={{ marginBottom: '12px' }}>Mengembangkan *Open Islamic Educational Resources* bermutu tinggi.</li>
              <li>Membangun ekosistem belajar Immersive (Virtual Reality, Augmented Reality) untuk mahasiswa.</li>
            </ul>
          </div>
        </div>

        {/* Timeline / Sejarah */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Perjalanan PIPD</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Menelusuri jejak langkah transformasi pendidikan digital di UIN Siber.</p>
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Garis vertikal timeline */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--primary)', opacity: 0.3, transform: 'translateX(-50%)' }}></div>
          
          {[
            { year: '2023', title: 'Inisiasi Konsep UIN Siber', desc: 'Gagasan awal transformasi IAIN Syekh Nurjati menjadi Universitas Islam Negeri berbasis Siber pertama di Indonesia.' },
            { year: '2024', title: 'Pendirian PIPD', desc: 'Pembentukan resmi Pusat Inovasi Pembelajaran Digital sebagai motor penggerak utama produksi konten edukasi.' },
            { year: '2025', title: 'Ekspansi Ekosistem', desc: 'Peluncuran studio terintegrasi, platform Video Pembelajaran, Podcast, dan lab Virtual Reality.' },
            { year: '2026', title: 'Open Resources Global', desc: 'Membuka akses portal konten pendidikan untuk publik, menghubungkan ekosistem akademik secara global.' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end', paddingBottom: '40px', position: 'relative' }}>
              <div style={{ width: '45%', textAlign: idx % 2 === 0 ? 'right' : 'left' }}>
                <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '8px' }}>{item.year}</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
              <div style={{ position: 'absolute', left: '50%', top: 0, width: '20px', height: '20px', background: 'var(--bg-base)', border: '4px solid var(--primary)', borderRadius: '50%', transform: 'translateX(-50%)' }}></div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Tentang;
