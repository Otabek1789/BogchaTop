import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>{t('misc.loading')}</p>
      </div>
    );
  }

  // Foydalanuvchi tizimga kirmagan bo'lsa — login sahifasiga yo'naltirish
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin sahifasi uchun — faqat adminlar kirishi mumkin
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
