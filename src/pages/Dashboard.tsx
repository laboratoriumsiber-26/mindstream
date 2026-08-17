import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { state } = useAppContext();

  // Basic stats
  const totalVideo = state.appData['video-pembelajaran']?.length || 0;
  const totalPodcast = state.appData['podcast']?.length || 0;
  
  const vProgress = state.appData['video-pembelajaran']?.filter(v => 
    !v.c8?.includes('Finalized') && !v.c8?.includes('To Do')
  ).length || 0;

  return (
    <div>
      <div className="topbar">
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Dashboard Overview</h2>
          <p style={{ color: 'var(--text-muted)' }}>Selamat datang kembali, {state.username}</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Total Video Pembelajaran</p>
              <h3 style={{ fontSize: '2rem', margin: 0 }}>{totalVideo}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(188, 48, 95, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <span className="material-symbols-outlined">video_library</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Total Podcast</p>
              <h3 style={{ fontSize: '2rem', margin: 0 }}>{totalPodcast}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <span className="material-symbols-outlined">mic</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Sedang Diproses</p>
              <h3 style={{ fontSize: '2rem', margin: 0 }}>{vProgress}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
