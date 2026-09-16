import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const ADMIN_EMAIL = 'otabek1789@gmail.com';
const API_URL = 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const sendOTP = async (email) => {
    try {
      const response = await fetch(`${API_URL}/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, error: "Server bilan ulanishda xatolik. Backend (port 5000) ishlayotganiga ishonch hosil qiling." };
    }
  };

  const verifyOTP = async (email, code) => {
    try {
      const response = await fetch(`${API_URL}/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await response.json();
      
      if (data.success) {
        const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
        const displayName = isAdmin ? "Yahyo" : email.split('@')[0];
        
        const userObj = { email, displayName, isAdmin };
        localStorage.setItem('authUser', JSON.stringify(userObj));
        setUser(userObj);
      }
      return data;
    } catch (error) {
      return { success: false, error: "Server bilan ulanishda xatolik." };
    }
  };

  const mockLogin = async (email, password) => {
    const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
    const displayName = isAdmin ? "Yahyo" : email.split('@')[0];
    
    const userObj = { email, displayName, isAdmin };
    localStorage.setItem('authUser', JSON.stringify(userObj));
    setUser(userObj);
    return { success: true, isAdmin };
  };

  const signInWithGoogle = async () => {
    try {
      const { auth, provider, isConfigured } = await import('../firebase');
      if (!isConfigured) {
        return { success: false, error: "Firebase kalitlari topilmadi." };
      }
      
      const { signInWithPopup } = await import('firebase/auth');
      const result = await signInWithPopup(auth, provider);
      
      const email = result.user.email;
      const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
      const displayName = result.user.displayName || (isAdmin ? "Yahyo" : email.split('@')[0]);
      
      const userObj = { email, displayName, isAdmin, photoURL: result.user.photoURL };
      localStorage.setItem('authUser', JSON.stringify(userObj));
      setUser(userObj);
      
      return { success: true, isAdmin, user: userObj };
    } catch (error) {
      console.error("Google orqali kirishda xatolik:", error);
      return { success: false, error: error.message || "Google orqali kirish bekor qilindi yoki xatolik yuz berdi." };
    }
  };

  const updateUser = (newInfo) => {
    const updatedUser = { ...user, ...newInfo };
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = async () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, sendOTP, verifyOTP, mockLogin, signInWithGoogle, logout, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
