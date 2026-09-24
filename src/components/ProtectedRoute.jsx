import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, loginAsAdminDemo } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0e17', color: '#00f0ff' }}>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  // Agar foydalanuvchi tizimga kirmagan bo'lsa
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin sahifasi uchun — faqat haqiqiy admin kira oladi
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
