import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Login from './pages/Login';
import Profil from './pages/Profil';
import Tentang from './pages/Tentang';
import TitikTemu from './pages/TitikTemu';
import TimPIPD from './pages/TimPIPD';
import Layanan from './pages/Layanan';
import Leaderboard from './pages/Leaderboard';
import RekapitulasiLaporan from './pages/RekapitulasiLaporan';
import GenericPage from './components/Layout/GenericPage';
import PublicShowcase from './pages/PublicShowcase';
import { useAppContext } from './context/AppContext';
import { pageDataMap } from './utils/config';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <div className="content-area" id="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { state } = useAppContext();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicShowcase />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/titik-temu" element={<TitikTemu />} />
        <Route path="/tim-pipd" element={<TimPIPD />} />
        
        {/* Login Route */}
        <Route path="/login" element={
          state.isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
        } />
        
        {/* Protected Routes */}
        {state.isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<ProtectedLayout><Leaderboard /></ProtectedLayout>} />
            <Route path="/profil" element={<ProtectedLayout><Profil /></ProtectedLayout>} />
            <Route path="/leaderboard" element={<ProtectedLayout><Leaderboard /></ProtectedLayout>} />
            <Route path="/rekapitulasi-laporan" element={<ProtectedLayout><RekapitulasiLaporan /></ProtectedLayout>} />
            
            {/* Map all other routes dynamically based on config */}
            {Object.keys(pageDataMap).map(pageId => (
              <Route 
                key={pageId} 
                path={`/${pageId}`} 
                element={<ProtectedLayout><GenericPage pageId={pageId} /></ProtectedLayout>} 
              />
            ))}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
