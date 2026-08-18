import React from 'react';
import { useAppContext } from '../context/AppContext';
import PublicLayout from '../components/Layout/PublicLayout';

const TitikTemu: React.FC = () => {
  const { state } = useAppContext();
  const articles = (state.appData['cms-artikel'] || []).filter((a: any) => a.c4 === 'Published' || a.c4 === 'Tayang');

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
            <div style={{ display: 'grid', gap: '40px' }}>
              {articles.map((article: any, idx: number) => {
                const isHeadline = article.c3 === 'Ya' || article.c3 === 'Headline';
                return (
                  <div key={idx} className="glass-card fade-in" style={{ padding: 0, borderRadius: 'var(--radius-lg)', border: isHeadline ? '2px solid var(--primary)' : '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {article.c10 && (
                      <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                        <img src={article.c10} alt={article.c11 || article.c1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {isHeadline && (
                          <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--primary)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(188,48,95,0.4)' }}>
                            HEADLINE Utama
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {article.c7 && (
                          <span style={{ background: 'rgba(188, 48, 95, 0.1)', color: 'var(--primary)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>{article.c7}</span>
                        )}
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>folder</span> {article.c2 || 'Berita'}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>calendar_month</span> {article.c6 || 'Hari ini'}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>visibility</span> {article.c5 || '0'} Dilihat
                        </span>
                      </div>
                      
                      <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-main)', lineHeight: 1.3 }}>{article.c1 || 'Untitled'}</h2>
                      
                      <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '24px' }}>{article.c8 || article.c9?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}</p>
                      
                      {/* Expandable Content Area if we want them to read it here */}
                      <details style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                        <summary style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, outline: 'none' }}>Baca Selengkapnya</summary>
                        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)', color: 'var(--text-main)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: article.c9 || '' }} />
                        {article.c12 && (
                          <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {article.c12.split(',').map((t: string, i: number) => (
                              <span key={i} style={{ background: 'var(--bg-surface-hover)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{t.trim()}</span>
                            ))}
                          </div>
                        )}
                      </details>

                      <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent-1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.5rem' }}>edit_document</span>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Ditulis oleh</div>
                          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{article.c13 || 'Tim Redaksi PIPD'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
