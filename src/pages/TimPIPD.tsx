import React from 'react';
import PublicLayout from '../components/Layout/PublicLayout';

const teamMembers = [
  { name: 'Dr. Ahmad Fauzi', role: 'Ketua PIPD', avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=BC305F&color=fff&size=200' },
  { name: 'Siti Aminah, M.Kom', role: 'Koordinator Produksi Video', avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=10b981&color=fff&size=200' },
  { name: 'Rudi Hartono, M.Pd', role: 'Koordinator Pelatihan & OIER', avatar: 'https://ui-avatars.com/api/?name=Rudi+Hartono&background=3b82f6&color=fff&size=200' },
  { name: 'Budi Santoso', role: 'Kepala Studio Podcast', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff&size=200' }
];

const volunteers = Array.from({ length: 8 }).map((_, i) => ({
  name: `Volunteer Mahasiswa ${i+1}`,
  role: ['Video Editor', 'Kameramen', 'Penulis Naskah', 'Desainer Grafis'][Math.floor(Math.random() * 4)],
  avatar: `https://ui-avatars.com/api/?name=VM+${i+1}&background=random&size=150`
}));

const TimPIPD: React.FC = () => {
  return (
    <PublicLayout>
      <div style={{ padding: '80px 40px', background: 'var(--bg-base)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--text-main)' }}>Tim Penggerak <span style={{ color: 'var(--primary)' }}>Inovasi</span></h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              Kreativitas, dedikasi, dan sinergi antara dosen ahli dan mahasiswa bertalenta di balik layar produksi PIPD.
            </p>
          </div>

          {/* Jajaran Inti */}
          <h2 style={{ fontSize: '2rem', marginBottom: '32px', textAlign: 'center' }}>Jajaran Inti PIPD</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '100px' }}>
            {teamMembers.map((member, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '40px 24px', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--glass-border)', background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 100%)' }}>
                <img src={member.avatar} alt={member.name} style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '24px', border: '4px solid var(--bg-base)', boxShadow: '0 0 0 2px var(--primary)' }} />
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-main)' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{member.role}</p>
              </div>
            ))}
          </div>

          {/* Mahasiswa Relawan */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Relawan Kreatif Mahasiswa</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Mahasiswa terpilih UIN Siber yang mendedikasikan waktu dan bakat mereka untuk membangun ekosistem digital kampus.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {volunteers.map((vol, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px dashed var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={vol.avatar} alt={vol.name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-main)' }}>{vol.name}</h4>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{vol.role}</div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </PublicLayout>
  );
};

export default TimPIPD;
