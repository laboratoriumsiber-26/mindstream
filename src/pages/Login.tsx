import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate loading for better UX
    setTimeout(() => {
      if (username === 'superadmin' && password === 'superadmin123') {
        login(username, 'Admin');
        navigate('/dashboard');
      } else {
        setError('Username atau Password salah! (Coba: superadmin / superadmin123)');
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="glass-card login-card">
        <div className="logo-placeholder">
          <span className="material-symbols-outlined icon-large">movie_edit</span>
        </div>
        <div className="login-header">
          <h1>MediaHub</h1>
          <p>Sistem Informasi Manajemen Video</p>
        </div>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
