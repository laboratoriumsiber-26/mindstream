import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const menuConfig = [
  { id: 'dashboard', icon: 'admin_panel_settings', label: 'Beranda Panel', group: 'Utama', roles: ['admin', 'uploader', 'editor', 'user'] },
  
  { type: 'group', label: 'Manajemen Konten', roles: ['admin', 'uploader'] },
  { id: 'profil', icon: 'person', label: 'Profil Pengguna', roles: ['admin', 'uploader', 'editor', 'user'] },
  { id: 'leaderboard', icon: 'emoji_events', label: 'Leaderboard Editor', roles: ['admin', 'uploader', 'editor', 'user'] },

  { type: 'group', label: 'Uploader / Master Data', roles: ['admin', 'uploader', 'user'] },
  { id: 'story-board', icon: 'auto_stories', label: 'Story Board', roles: ['admin', 'uploader', 'user'] },
  { id: 'raw-video', icon: 'movie', label: 'RAW Video Pembelajaran', roles: ['admin', 'uploader', 'user'] },
  { id: 'raw-podcast', icon: 'mic', label: 'RAW Podcast', roles: ['admin', 'uploader', 'user'] },
  { id: 'klaster-dosen', icon: 'school', label: 'Klaster Dosen', roles: ['admin', 'uploader', 'user'] },
  { id: 'mata-kuliah', icon: 'menu_book', label: 'Mata Kuliah', roles: ['admin', 'uploader', 'user'] },

  { type: 'group', label: 'Ruang Editor', roles: ['admin', 'uploader', 'editor', 'user'] },
  { id: 'editor-video', icon: 'movie_edit', label: 'Editor Video Pembelajaran', roles: ['admin', 'uploader', 'editor', 'user'] },
  { id: 'editor-podcast', icon: 'mic_external_on', label: 'Editor Podcast', roles: ['admin', 'uploader', 'editor', 'user'] },
  { id: 'konten-medsos', icon: 'share', label: 'Konten Medsos', roles: ['admin', 'uploader', 'user'] },

  { type: 'group', label: 'Manajemen Hak Akses', roles: ['admin'] },
  { id: 'pengajuan-akun', icon: 'how_to_reg', label: 'Persetujuan Akun', roles: ['admin'] },
  { id: 'daftar-akun', icon: 'badge', label: 'Daftar Semua Akun', roles: ['admin'] },

  { type: 'group', label: 'Manajemen Website (CMS)', roles: ['admin'] },
  { id: 'cms-slider', icon: 'view_carousel', label: 'CMS Hero Slider', roles: ['admin'] },
  { id: 'cms-layanan', icon: 'design_services', label: 'CMS Layanan', roles: ['admin'] },
  { id: 'cms-artikel', icon: 'article', label: 'CMS Artikel & Berita', roles: ['admin'] },
  { id: 'cms-menu', icon: 'menu', label: 'CMS Menu Navigasi', roles: ['admin'] },

  { type: 'group', label: 'Pelaporan & Analitik', roles: ['admin'] },
  { id: 'pelaporan', icon: 'assessment', label: 'Rekapitulasi Laporan', roles: ['admin'] }
];

const Sidebar = () => {
  const { state, logout } = useAppContext();
  const location = useLocation();

  const getRoleBadge = (role: string) => {
    switch(role.toLowerCase()) {
      case 'admin': return <span className="badge-role" style={{ background: '#BC305F' }}>Admin</span>;
      case 'uploader': return <span className="badge-role" style={{ background: '#10b981' }}>Uploader</span>;
      case 'editor': return <span className="badge-role" style={{ background: '#f59e0b' }}>Editor</span>;
      default: return <span className="badge-role" style={{ background: '#64748b' }}>User Biasa</span>;
    }
  };

  return (
    <div className="glass-sidebar" style={{ overflowY: 'auto' }}>
      <div className="sidebar-brand">
        <span className="material-symbols-outlined">video_library</span>
        <h2>MindStream</h2>
      </div>
      
      <div className="user-profile">
        <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
        <div className="user-info">
          <h3>{state.username || 'User'}</h3>
          {getRoleBadge(state.role)}
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuConfig.map((item, idx) => {
          // Simulasi filter role, superadmin = admin
          const userRole = state.role.toLowerCase() === 'superadmin' ? 'admin' : state.role.toLowerCase();
          
          if (item.roles && !item.roles.includes(userRole)) return null;

          if (item.type === 'group') {
            return (
              <div key={idx} style={{ marginTop: '16px', marginBottom: '4px', paddingLeft: '8px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {item.label}
              </div>
            );
          }

          const isActive = location.pathname === `/${item.id!}`;
          return (
            <Link 
              key={item.id}
              to={`/${item.id}`} 
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="nav-item" style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
          <span className="material-symbols-outlined">logout</span>
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
