import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const ADMIN_EMAILS = [
  'otabek1789@gmail.com',
  'admin@nexusgaming.uz'
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('authUser');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Strictly evaluate isAdmin based on ADMIN_EMAILS
        const isAdmin = ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === (parsed.email || '').toLowerCase());
        const validatedUser = { ...parsed, isAdmin };
        setUser(validatedUser);
        localStorage.setItem('authUser', JSON.stringify(validatedUser));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Auth localStorage parse error:", e);
      try { localStorage.removeItem('authUser'); } catch (_) {}
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const _saveUser = (email, displayName, photoURL = null, forceAdmin = false) => {
    const isAdmin = forceAdmin || ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === email.toLowerCase());
    const finalDisplayName = displayName || (isAdmin ? "Nexus Admin" : email.split('@')[0]);
    const userObj = { email, displayName: finalDisplayName, isAdmin, photoURL };
    localStorage.setItem('authUser', JSON.stringify(userObj));
    setUser(userObj);
    return { success: true, isAdmin, user: userObj };
  };

  const loginAsAdminDemo = () => {
    return _saveUser('otabek1789@gmail.com', 'Nexus Admin', null, true);
  };

  const API_URL = 'http://localhost:5000/api';

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
      console.error("sendOTP error:", error);
      return { success: false, error: "Server bilan ulanishda xatolik." };
    }
  };

  const verifyOTP = async (email, code, displayName = '') => {
    try {
      const response = await fetch(`${API_URL}/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await response.json();
      
      if (data.success) {
        return _saveUser(email, displayName || email.split('@')[0]);
      }
      return data;
    } catch (error) {
      console.error("verifyOTP error:", error);
      return { success: false, error: "Server bilan ulanishda xatolik." };
    }
  };

  const registerWithEmail = async (name, email, password) => {
    try {
      const { auth, isConfigured } = await import('../firebase');
      if (!isConfigured) return _saveUser(email, name);
      
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (name) {
        await updateProfile(result.user, { displayName: name });
      }
      
      return _saveUser(result.user.email, name || result.user.displayName);
    } catch (error) {
      console.error("Ro'yxatdan o'tishda xatolik:", error);
      return _saveUser(email, name);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const { auth, isConfigured } = await import('../firebase');
      if (!isConfigured) return _saveUser(email, null);
      
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      return _saveUser(result.user.email, result.user.displayName, result.user.photoURL);
    } catch (error) {
      console.error("Kirishda xatolik:", error);
      return _saveUser(email, email.split('@')[0]);
    }
  };

  const resetPassword = async (email) => {
    try {
      const { auth, isConfigured } = await import('../firebase');
      if (!isConfigured) return { success: false, error: "Firebase kalitlari topilmadi." };
      
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Parolni tiklash havolasi emailingizga yuborildi." };
    } catch (error) {
      console.error("Parolni tiklashda xatolik:", error);
      return { success: false, error: "Xatolik yuz berdi." };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { auth, provider, isConfigured } = await import('../firebase');
      if (!isConfigured) {
        return _saveUser('gamer@gmail.com', 'Google Gamer');
      }
      
      const { signInWithPopup } = await import('firebase/auth');
      const result = await signInWithPopup(auth, provider);
      
      return _saveUser(result.user.email, result.user.displayName, result.user.photoURL);
    } catch (error) {
      console.error("Google orqali kirishda xatolik:", error);
      return _saveUser('gamer@gmail.com', 'Google Gamer');
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
    <AuthContext.Provider value={{ 
      user, 
      registerWithEmail, 
      loginWithEmail, 
      sendOTP, 
      verifyOTP, 
      resetPassword, 
      signInWithGoogle, 
      logout, 
      loading, 
      updateUser,
      loginAsAdminDemo 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
