import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { state } = useAppContext();

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        {/* Topbar logic could go here or within pages */}
        <div className="content-area" id="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
