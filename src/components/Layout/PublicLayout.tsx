import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { state } = useAppContext();
  
  // Extract CMS Layanan
  const cmsLayanan = state.appData['cms-layanan'] || [];
  const activeLayanan = cmsLayanan.length > 0 ? cmsLayanan.map((l: any) => ({
    name: l.c1 || 'Layanan',
    link: `/layanan/${(l.c1 || 'layanan').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  })) : [
    { name: 'Pengembangan Konten Pembelajaran Digital', link: '/layanan/pengembangan-konten' },
    { name: 'Pelatihan Teknologi Pendidikan', link: '/layanan/pelatihan-teknologi' },
    { name: 'Podcast Inovasi', link: '/layanan/podcast-inovasi' },
    { name: 'OIER (Open Islamic Educational Resources)', link: '/layanan/oier' },
    { name: 'Virtual Reality', link: '/layanan/virtual-reality' }
  ];

  // Extract CMS Menu
  const cmsMenu = state.appData['cms-menu'] || [];
  const activeMenus = cmsMenu.filter((m: any) => m.c4 === 'Active' && m.c3?.includes('Header Utama'));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header / Navbar */}
      <header className="public-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--primary), var(--accent-1))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '1.2rem' }}>play_circle</span>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.1 }}>MindStream <span style={{ color: 'var(--primary)' }}>Edu</span></h1>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Pusat Inovasi Pembelajaran Digital</div>
          </div>
        </div>
        
        <nav className="public-nav-links">
          {activeMenus.length > 0 ? (
            activeMenus.map((menu: any, idx: number) => {
              if (menu.c3 === 'Header Utama (Dropdown Layanan)') {
                return (
                  <div key={idx} className="nav-dropdown">
                    <span className="nav-link" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      {menu.c1} <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_drop_down</span>
                    </span>
                    <div className="dropdown-menu">
                      {activeLayanan.map((layanan, lIdx) => (
                        <Link key={lIdx} to={layanan.link} className="dropdown-item">{layanan.name}</Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // Check for Manual Nested Children
              const children = cmsMenu.filter((m: any) => m.c4 === 'Active' && m.c3 === 'Sub-Menu (Manual Dropdown)' && m.c5 === menu.c1);
              
              if (children.length > 0) {
                return (
                  <div key={idx} className="nav-dropdown">
                    <span className="nav-link" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      {menu.c1} <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_drop_down</span>
                    </span>
                    <div className="dropdown-menu">
                      {children.map((child: any, cIdx: number) => {
                        const isChildExt = child.c2?.startsWith('http');
                        if (isChildExt) {
                          return <a key={cIdx} href={child.c2} target="_blank" rel="noreferrer" className="dropdown-item">{child.c1}</a>;
                        }
                        return <Link key={cIdx} to={child.c2 || '#'} className="dropdown-item">{child.c1}</Link>;
                      })}
                    </div>
                  </div>
                );
              }
              
              // Standard Link
              const isExternal = menu.c2?.startsWith('http');
              if (isExternal) {
                return <a key={idx} href={menu.c2} target="_blank" rel="noreferrer" className="nav-link">{menu.c1}</a>;
              }
              return <Link key={idx} to={menu.c2 || '#'} className="nav-link">{menu.c1}</Link>;
            })
          ) : (
            // Fallback if CMS is empty
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/tentang" className="nav-link">Tentang</Link>
              <div className="nav-dropdown">
                <span className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>Layanan Kami <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_drop_down</span></span>
                <div className="dropdown-menu">
                  {activeLayanan.map((layanan, idx) => (
                    <Link key={idx} to={layanan.link} className="dropdown-item">{layanan.name}</Link>
                  ))}
                </div>
              </div>
              <Link to="/titik-temu" className="nav-link">Titik Temu</Link>
              <Link to="/tim-pipd" className="nav-link">Tim PIPD</Link>
            </>
          )}
        </nav>
        
        <div className="public-actions">
          <a href="https://pmb.uinssc.ac.id/" target="_blank" rel="noreferrer" className="btn-outline">Admisi</a>
          <a href="https://ppid.uinssc.ac.id/" target="_blank" rel="noreferrer" className="btn-outline">PPID</a>
          <a href="https://uinssc.ac.id/" target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.85rem' }}>UINSSC</a>
          
          {state.isLoggedIn ? (
            <Link to="/dashboard" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', marginLeft: '12px', padding: '8px', color: 'var(--primary)' }} title="Masuk ke Panel">
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>admin_panel_settings</span>
            </Link>
          ) : (
            <Link to="/login" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', marginLeft: '8px', padding: '8px', color: 'var(--text-main)' }} title="Login Admin">
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>login</span>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="public-layout-wrapper" style={{ flex: 1 }}>
        {children}
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', color: '#888', padding: '40px', textAlign: 'center', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Contact PIPD</a>
        </div>
        <p>&copy; 2026 Pusat Inovasi Pembelajaran Digital - UIN Siber Syekh Nurjati Cirebon. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
