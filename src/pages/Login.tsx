import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, addRow, showToast } = useAppContext();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUnit, setRegUnit] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    setTimeout(() => {
      if (username === 'superadmin' && password === 'superadmin123') {
        login(username, 'Admin');
        showToast('Berhasil masuk sebagai Superadmin', 'success');
        navigate('/dashboard');
      } else {
        setError('Username atau Password salah! (Coba: superadmin / superadmin123)');
      }
      setIsSubmitting(false);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    setTimeout(() => {
      addRow('pengajuan-akun', {
        c1: regName,
        c2: regEmail,
        c3: regUnit,
        c4: '<span style="color:var(--text-muted)">Menunggu Keputusan Admin</span>',
        c5: '<span style="color:var(--warning); font-weight:bold;">Menunggu Persetujuan</span>'
      });
      showToast('Pengajuan akun berhasil dikirim! Silakan tunggu persetujuan Admin.', 'success');
      setIsSubmitting(false);
      setIsRegistering(false); // Back to login
      setRegName(''); setRegEmail(''); setRegUnit('');
    }, 800);
  };

  return (
    <div className="login-container" style={{ padding: '20px 0' }}>
      <div className="glass-card login-card" style={{ maxWidth: isRegistering ? '500px' : '400px', transition: 'max-width 0.3s ease' }}>
        <div className="logo-placeholder">
          <span className="material-symbols-outlined icon-large" style={{ fontSize: '4rem', color: 'var(--primary)' }}>{isRegistering ? 'how_to_reg' : 'admin_panel_settings'}</span>
        </div>
        <div className="login-header">
          <h1>{isRegistering ? 'Pengajuan Akun' : 'MediaHub'}</h1>
          <p>{isRegistering ? 'Lengkapi data untuk mengajukan hak akses' : 'Sistem Informasi Manajemen Video'}</p>
        </div>
        
        {!isRegistering ? (
          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Username</label>
              <input 
                type="text" 
                className="w-100" 
                style={{ padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                required
              />
            </div>
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
              <input 
                type={showPassword ? 'text' : 'password'}
                className="w-100" 
                style={{ padding: '12px', paddingRight: '40px', border: 'var(--glass-border)', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '38px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
            
            {error && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '4px' }}>{error}</div>}
            
            <button type="submit" className="btn-primary w-100 mt-4" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? (
                 <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span>
              ) : (
                 <><span className="material-symbols-outlined" style={{ marginRight: '8px' }}>login</span> Masuk</>
              )}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Belum punya akun? </span>
              <button type="button" onClick={() => setIsRegistering(true)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Ajukan Akun Baru</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ textAlign: 'left', animation: 'fadeInSlideUp 0.3s ease' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Nama Lengkap</label>
              <input type="text" className="w-100" style={{ padding: '10px', border: 'var(--glass-border)', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }} value={regName} onChange={(e) => setRegName(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
              <input type="email" className="w-100" style={{ padding: '10px', border: 'var(--glass-border)', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }} value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Unit Kerja / Fakultas</label>
              <input type="text" className="w-100" style={{ padding: '10px', border: 'var(--glass-border)', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }} value={regUnit} onChange={(e) => setRegUnit(e.target.value)} required />
            </div>
            
            <button type="submit" className="btn-primary w-100" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? (
                 <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span>
              ) : (
                 <><span className="material-symbols-outlined" style={{ marginRight: '8px' }}>send</span> Kirim Pengajuan</>
              )}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem' }}>
              <button type="button" onClick={() => setIsRegistering(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem', marginRight: '4px' }}>arrow_back</span> Kembali ke Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
