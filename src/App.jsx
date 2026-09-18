import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Kindergartens from './pages/Kindergartens';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { KindergartenProvider } from './context/KindergartenContext';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import MyApplications from './pages/MyApplications';
import AIChatbot from './components/AIChatbot';
import MapPage from './pages/MapPage';
import KidsGame from './pages/KidsGame';

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuthPage && !isAdmin && <Header />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div key={location.pathname} className="page-transition" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kindergartens" element={<Kindergartens />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/kids" element={<KidsGame />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/my-applications" element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bogcha/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login defaultRegister={true} />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
      {!isAdmin && !isAuthPage && <Footer />}
      {!isAdmin && !isAuthPage && <AIChatbot />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <KindergartenProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 5000,
                style: {
                  background: 'var(--surface-warm, #fff)',
                  color: 'var(--neutral-900, #333)',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  fontSize: '15px',
                  fontWeight: 500,
                  border: '1px solid var(--border-color, #eee)',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--success-500, #10B981)',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'var(--danger-500, #EF4444)',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <ScrollToTop />
            <Layout />
          </BrowserRouter>
        </FavoritesProvider>
      </KindergartenProvider>
    </AuthProvider>
  );
}
