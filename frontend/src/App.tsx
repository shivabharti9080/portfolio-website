import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BrandDetail from './pages/BrandDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { api } from './lib/api';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [serverHealth, setServerHealth] = useState<{ status: string; mode: string } | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('admin_token'));

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await api.getHealth();
        setServerHealth(health);
      } catch (error) {
        console.warn('Server health check failed:', error);
      }
    };
    checkHealth();
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-dark-950 text-gray-100 min-h-screen flex flex-col">
        <Navbar isDark={isDark} setIsDark={setIsDark} isAdminLoggedIn={isAdminLoggedIn} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home serverHealth={serverHealth} />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/brands/:slug" element={<BrandDetail />} />
            <Route
              path="/admin/login"
              element={<AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />}
            />
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard isLoggedIn={isAdminLoggedIn} onLogout={() => setIsAdminLoggedIn(false)} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
