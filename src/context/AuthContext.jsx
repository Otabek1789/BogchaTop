import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const ADMIN_EMAIL = 'otabek1789@gmail.com';

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

  const _saveUser = (email, displayName, photoURL = null) => {
    const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
    const finalDisplayName = displayName || (isAdmin ? "Yahyo" : email.split('@')[0]);
    const userObj = { email, displayName: finalDisplayName, isAdmin, photoURL };
    localStorage.setItem('authUser', JSON.stringify(userObj));
    setUser(userObj);
    return { success: true, isAdmin, user: userObj };
  };

  const registerWithEmail = async (name, email, password) => {
    try {
      const { auth, isConfigured } = await import('../firebase');
      if (!isConfigured) return { success: false, error: "Firebase kalitlari topilmadi." };
      
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      if (name) {
        await updateProfile(result.user, { displayName: name });
      }
      
      return _saveUser(result.user.email, name || result.user.displayName);
    } catch (error) {
      console.error("Ro'yxatdan o'tishda xatolik:", error);
      let errorMsg = "Xatolik yuz berdi.";
      if (error.code === 'auth/email-already-in-use') errorMsg = "Bu email allaqachon ro'yxatdan o'tgan.";
      if (error.code === 'auth/weak-password') errorMsg = "Parol juda oddiy. Kamida 6 ta belgi kiriting.";
      return { success: false, error: errorMsg };
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const { auth, isConfigured } = await import('../firebase');
      if (!isConfigured) return { success: false, error: "Firebase kalitlari topilmadi." };
      
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      return _saveUser(result.user.email, result.user.displayName, result.user.photoURL);
    } catch (error) {
      console.error("Kirishda xatolik:", error);
      let errorMsg = "Xatolik yuz berdi.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMsg = "Email yoki parol noto'g'ri.";
      }
      return { success: false, error: errorMsg };
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
      let errorMsg = "Xatolik yuz berdi.";
      if (error.code === 'auth/user-not-found') errorMsg = "Bu pochtaga ega foydalanuvchi topilmadi.";
      return { success: false, error: errorMsg };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { auth, provider, isConfigured } = await import('../firebase');
      if (!isConfigured) {
        return { success: false, error: "Firebase kalitlari topilmadi." };
      }
      
      const { signInWithPopup } = await import('firebase/auth');
      const result = await signInWithPopup(auth, provider);
      
      return _saveUser(result.user.email, result.user.displayName, result.user.photoURL);
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
    <AuthContext.Provider value={{ user, registerWithEmail, loginWithEmail, resetPassword, signInWithGoogle, logout, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
