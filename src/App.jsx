import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
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
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import MyApplications from './pages/MyApplications';
import AIChatbot from './components/AIChatbot';
import KidsGame from './pages/KidsGame';
import PCBuilder from './pages/PCBuilder';
import { GamerProvider } from './context/GamerContext';

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--surface)' }}>
      {!isAuthPage && !isAdmin && <Header />}
      
      {/* Global Shopping Cart Drawer */}
      <CartDrawer />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div key={location.pathname} className="page-transition" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Products / Catalog routes */}
            <Route path="/products" element={<Kindergartens />} />
            <Route path="/kindergartens" element={<Kindergartens />} />
            <Route path="/map" element={<Navigate to="/products" replace />} />

            {/* PC Builder */}
            <Route path="/builder" element={<PCBuilder />} />
            <Route path="/pc-builder" element={<PCBuilder />} />

            {/* Product Detail routes */}
            <Route path="/product/:id" element={<Detail />} />
            <Route path="/bogcha/:id" element={<Detail />} />

            {/* Mini Game routes */}
            <Route path="/game" element={<KidsGame />} />
            <Route path="/kids" element={<KidsGame />} />

            {/* Wishlist */}
            <Route path="/favorites" element={<Favorites />} />

            {/* Orders */}
            <Route path="/orders" element={<MyApplications />} />
            <Route path="/my-applications" element={<MyApplications />} />

            {/* Profile */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Auth */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login defaultRegister={true} />} />

            {/* Admin Panel */}
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
      <GamerProvider>
        <ProductProvider>
          <FavoritesProvider>
            <CartProvider>
              <BrowserRouter>
                <Toaster 
                  position="top-center"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#111827',
                      color: '#ffffff',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                      fontSize: '14.5px',
                      fontWeight: 600,
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                    },
                    success: {
                      iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                <ScrollToTop />
                <Layout />
              </BrowserRouter>
            </CartProvider>
          </FavoritesProvider>
        </ProductProvider>
      </GamerProvider>
    </AuthProvider>
  );
}
