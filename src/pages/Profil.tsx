import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Profil = () => {
  const { state } = useAppContext();
  
  // Dummy data matching logic from old app.js
  let pData = { c1: state.username, c2: 'System Administrator', c3: '-', c4: '-', c5: '-', c6: '-', c7: '-' };
  
  if (state.role !== 'admin' && state.appData['daftar-akun'] && state.appData['daftar-akun'].length > 3) {
      pData = state.appData['daftar-akun'][3] as any;
  }

  return (
    <>
      <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-hover)', border: '1px solid var(--glass-border)', transition: 'all 0.2s ease' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>home</span> Beranda
        </Link>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
        <span style={{ fontWeight: 500, color: 'var(--primary)' }}>Profil Pengguna</span>
      </div>

      <div className="glass-card" style={{ padding: '32px', border: 'var(--glass-border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} />
              <div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{pData.c1}</h2>
                  <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', display: 'inline-block', marginBottom: '8px' }}>{state.role.toUpperCase()}</span>
              </div>
          </div>
          
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>Detail Informasi</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Nama Lengkap</label>
                  <div style={{ fontWeight: 500 }}>{pData.c1 || '-'}</div>
              </div>
              <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Divisi / Peran</label>
                  <div style={{ fontWeight: 500 }}>{pData.c2 || '-'}</div>
              </div>
              <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Nomor Induk (NIM/NIP)</label>
                  <div style={{ fontWeight: 500 }}>{pData.c6 || '-'}</div>
              </div>
              <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Fakultas</label>
                  <div style={{ fontWeight: 500 }}>{pData.c4 || '-'}</div>
              </div>
              <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Program Studi / Jurusan</label>
                  <div style={{ fontWeight: 500 }}>{pData.c5 || '-'}</div>
              </div>
              <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Nomor WhatsApp</label>
                  <div style={{ fontWeight: 500 }}>{pData.c7 || '-'}</div>
              </div>
          </div>
      </div>
    </>
  );
};

export default Profil;
