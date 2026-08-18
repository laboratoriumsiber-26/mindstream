import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const { state } = useAppContext();
  
  const allAccounts = state.appData['daftar-akun'] || [];
  const editors = allAccounts.filter(acc => acc.c9 === 'Editor' || acc.c9?.toLowerCase().includes('editor'));
  const videos = state.appData['video-pembelajaran'] || [];
  const podcasts = state.appData['podcast'] || [];

  // Kalkulasi Skor
  let lbData = editors.map((e, idx) => {
      const editorName = e.c1 ?? '';
      
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
          level: e.c9 ?? 'Editor', // Use role column for level
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

  return (
    <>
      <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-hover)', border: '1px solid var(--glass-border)', transition: 'all 0.2s ease' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>home</span> Beranda
          </Link> 
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
          <span style={{ fontWeight: 500, color: 'var(--primary)' }}>Leaderboard Kinerja Editor</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '40px', animation: 'slideUp 0.4s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '12px', display: 'inline-block' }}>social_leaderboard</span>
              <h2 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Leaderboard Kinerja Editor</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0 auto', lineHeight: 1.6 }}>
                  Peringkat ini dihitung secara dinamis berdasarkan kecepatan pengerjaan revisi, persentase kepatuhan terhadap deadline, dan kualitas output dari tiap editor.
              </p>
          </div>

          {/* Analitik Tambahan */}
          <div style={{ display: 'flex', gap: '24px', margin: '32px 0', flexWrap: 'wrap' }}>
            <div className="glass-card" style={{ flex: 1, minWidth: '300px', padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Progres Keseluruhan Ekosistem</h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Finalized</span>
                <span>{( ( (videos.filter(v=>v.c8?.includes('Finalized')).length + podcasts.filter(p=>p.c8?.includes('Finalized')).length) / ((videos.length + podcasts.length) || 1) ) * 100 ).toFixed(1)}%</span>
              </div>
              <div style={{ height: '12px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: `${( (videos.filter(v=>v.c8?.includes('Finalized')).length + podcasts.filter(p=>p.c8?.includes('Finalized')).length) / ((videos.length + podcasts.length) || 1) ) * 100}%`, background: 'var(--primary)', height: '100%', transition: 'width 1s ease' }}></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>In Progress / Review</span>
                <span>{( ( (videos.filter(v=>v.c8 && !v.c8.includes('Finalized') && !v.c8.includes('To Do')).length + podcasts.filter(p=>p.c8 && !p.c8.includes('Finalized') && !p.c8.includes('To Do')).length) / ((videos.length + podcasts.length) || 1) ) * 100 ).toFixed(1)}%</span>
              </div>
              <div style={{ height: '12px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${( (videos.filter(v=>v.c8 && !v.c8.includes('Finalized') && !v.c8.includes('To Do')).length + podcasts.filter(p=>p.c8 && !p.c8.includes('Finalized') && !p.c8.includes('To Do')).length) / ((videos.length + podcasts.length) || 1) ) * 100}%`, background: 'var(--accent-1)', height: '100%', transition: 'width 1s ease' }}></div>
              </div>
            </div>
            
            <div className="glass-card" style={{ flex: 1, minWidth: '300px', padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Distribusi Beban Kerja Editor</h4>
              {top3.map(editor => (
                <div key={editor.name} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>{editor.name}</span>
                    <span>{editor.totalTasks} Tugas</span>
                  </div>
                  <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(editor.totalTasks / (videos.length + podcasts.length || 1)) * 100}%`, background: '#CD7F32', height: '100%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {top3.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '16px', margin: '40px 0', flexWrap: 'wrap' }}>
                {top3[1] && (
                  <div className="lb-podium rank-2" style={{ textAlign: 'center', order: 1, flex: 1, minWidth: '120px', maxWidth: '180px', position: 'relative' }}>
                      <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 16px auto' }}>
                          <img src={top3[1].avatar} style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #C0C0C0', objectFit: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }} alt={top3[1].name} />
                          <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#C0C0C0', color: '#fff', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold', fontSize: '0.9rem', border: '2px solid var(--bg-base)' }}>2</div>
                      </div>
                      <div style={{ background: 'var(--bg-surface)', border: 'var(--glass-border)', padding: '16px 12px', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', height: '120px', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
                          <h4 style={{ fontSize: '1rem', marginBottom: '4px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{top3[1].name}</h4>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#C0C0C0' }}>{top3[1].score} <small style={{ fontSize: '0.7rem' }}>Pts</small></div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>{top3[1].totalDone} Tugas Selesai</div>
                      </div>
                  </div>
                )}

                {top3[0] && (
                  <div className="lb-podium rank-1" style={{ textAlign: 'center', order: 2, flex: 1, minWidth: '140px', maxWidth: '200px', position: 'relative', zIndex: 10 }}>
                      <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 16px auto' }}>
                          <span className="material-symbols-outlined" style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', color: '#FFD700', fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>workspace_premium</span>
                          <img src={top3[0].avatar} style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #FFD700', objectFit: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }} alt={top3[0].name} />
                          <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#FFD700', color: '#fff', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold', fontSize: '1rem', border: '2px solid var(--bg-base)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>1</div>
                      </div>
                      <div style={{ background: 'var(--bg-surface)', border: '2px solid rgba(255, 215, 0, 0.3)', padding: '24px 12px 16px 12px', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', height: '140px', boxShadow: '0 -4px 20px rgba(255,215,0,0.15)' }}>
                          <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{top3[0].name}</h4>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFD700', textShadow: '0 1px 4px rgba(255,215,0,0.2)' }}>{top3[0].score} <small style={{ fontSize: '0.8rem' }}>Pts</small></div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>{top3[0].totalDone} Tugas Selesai</div>
                      </div>
                  </div>
                )}

                {top3[2] && (
                  <div className="lb-podium rank-3" style={{ textAlign: 'center', order: 3, flex: 1, minWidth: '120px', maxWidth: '180px', position: 'relative' }}>
                      <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 16px auto' }}>
                          <img src={top3[2].avatar} style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #CD7F32', objectFit: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }} alt={top3[2].name} />
                          <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#CD7F32', color: '#fff', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold', fontSize: '0.9rem', border: '2px solid var(--bg-base)' }}>3</div>
                      </div>
                      <div style={{ background: 'var(--bg-surface)', border: 'var(--glass-border)', padding: '16px 12px', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', height: '100px', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
                          <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{top3[2].name}</h4>
                          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#CD7F32' }}>{top3[2].score} <small style={{ fontSize: '0.7rem' }}>Pts</small></div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>{top3[2].totalDone} Tugas Selesai</div>
                      </div>
                  </div>
                )}
            </div>
          )}
          
          {others.length > 0 && (
            <div style={{ background: 'var(--bg-surface)', border: 'var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '16px', marginTop: '24px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-muted)' }}>Peringkat Lainnya</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {others.map((e, idx) => (
                      <div key={e.name} style={{ display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.02)' }}>
                          <div style={{ width: '30px', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center' }}>{idx + 4}</div>
                          <img src={e.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: '12px', marginRight: '16px' }} alt={e.name} />
                          <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{e.name}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.totalDone} Tugas Selesai</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{e.score} Pts</div>
                          </div>
                      </div>
                    ))}
                </div>
            </div>
          )}
          
          {lbData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Belum ada data kinerja editor.</div>
          )}
      </div>
    </>
  );
};

export default Leaderboard;
