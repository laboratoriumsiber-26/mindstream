import React from 'react';
import { useAppContext } from '../context/AppContext';
import PublicLayout from '../components/Layout/PublicLayout';

const TitikTemu: React.FC = () => {
  const { state } = useAppContext();
  const articles = state.appData['cms-artikel'] || [];

  return (
    <PublicLayout>
      <div style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(90deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>Titik Temu</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
              Pusat literasi digital, berita, artikel, dan wawasan seputar inovasi pendidikan dari PIPD UIN Siber.
            </p>
          </div>

          {articles.length > 0 ? (
            <div style={{ display: 'grid', gap: '32px' }}>
              {articles.map((article: any, idx: number) => (
                <div key={idx} className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ background: 'rgba(188, 48, 95, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Berita Terbaru</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{article.c3 || 'Baru'}</span>
                    </div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-main)' }}>{article.c1 || 'Untitled'}</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '1.05rem' }}>{article.c4}</p>
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent-1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.2rem' }}>edit</span>
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ditulis oleh <strong style={{ color: 'var(--text-main)' }}>{article.c2 || 'Admin'}</strong></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--glass-border)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--text-muted)', opacity: 0.5, marginBottom: '16px' }}>article</span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Belum Ada Publikasi</h3>
              <p style={{ color: 'var(--text-muted)' }}>Nantikan artikel dan wawasan inovatif dari tim PIPD dalam waktu dekat.</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default TitikTemu;
