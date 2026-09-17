import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
            <ScrollToTop />
            <Layout />
          </BrowserRouter>
        </FavoritesProvider>
      </KindergartenProvider>
    </AuthProvider>
  );
}
