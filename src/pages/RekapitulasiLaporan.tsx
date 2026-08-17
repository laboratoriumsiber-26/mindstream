import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const RekapitulasiLaporan = () => {
  const { state } = useAppContext();
  
  const videos = state.appData['video-pembelajaran'] || [];
  const podcasts = state.appData['podcast'] || [];
  
  const vidDone = videos.filter(v => v.c8 && v.c8.includes('Finalized')).length;
  const vidProc = videos.length - vidDone;
  
  const podDone = podcasts.filter(p => p.c8 && p.c8.includes('Finalized')).length;
  const podProc = podcasts.length - podDone;

  const handleDownload = () => {
    let csv = "Tipe,Judul,Dosen/Host,Mata Kuliah/RAW,Status,Editor,Deadline,Tanggal Publikasi\n";
    
    videos.forEach(v => {
      const row = [
        'Video Pembelajaran',
        `"${(v.c1 || '').replace(/"/g, '""')}"`,
        `"${(v.c2 || '').replace(/"/g, '""')}"`,
        `"${(v.c3 || '').replace(/"/g, '""')}"`,
        `"${(v.c8 || '').replace(/"/g, '""')}"`,
        `"${(v.c4 || '').replace(/"/g, '""')}"`,
        `"${(v.c6 || '').replace(/"/g, '""')}"`,
        `"${(v.c7 || '').replace(/"/g, '""')}"`
      ];
      csv += row.join(',') + "\n";
    });

    podcasts.forEach(p => {
      const row = [
        'Podcast',
        `"${(p.c1 || '').replace(/"/g, '""')}"`,
        `"${(p.c3 || '').replace(/"/g, '""')}"`,
        `"${(p.c2 || '').replace(/"/g, '""')}"`,
        `"${(p.c8 || '').replace(/"/g, '""')}"`,
        `"${(p.c4 || '').replace(/"/g, '""')}"`,
        `"${(p.c6 || '').replace(/"/g, '""')}"`,
        `"${(p.c7 || '').replace(/"/g, '""')}"`
      ];
      csv += row.join(',') + "\n";
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekapitulasi_Laporan_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-hover)', border: '1px solid var(--glass-border)', transition: 'all 0.2s ease' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>home</span> Beranda
          </Link> 
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
          <span style={{ fontWeight: 500, color: 'var(--primary)' }}>Rekapitulasi Laporan</span>
      </div>
      
      <div className="glass-card" style={{ padding: '24px', border: 'var(--glass-border)', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '8px' }}>Rekapitulasi Laporan Produksi</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Ringkasan dari seluruh kegiatan produksi video dan podcast.</p>
              </div>
              <button className="btn-primary" onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined">download</span> Unduh Laporan (CSV)
              </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', padding: '20px', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '8px' }}>{videos.length}</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Total Video Pembelajaran</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>{vidDone} Selesai &bull; {vidProc} Proses</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', padding: '20px', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-1)', marginBottom: '8px' }}>{podcasts.length}</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Total Podcast</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>{podDone} Selesai &bull; {podProc} Proses</div>
              </div>
          </div>
      </div>
    </>
  );
};

export default RekapitulasiLaporan;
