import React, { createContext, useContext, useState, useEffect } from 'react';
import { kindergartens as initialData } from '../data/mockData';

const KindergartenContext = createContext();

export function KindergartenProvider({ children }) {
  const [data, setData] = useState(() => {
    return initialData; // Forced reload to fix images
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('bogchatop_reviews');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('bogchatop_applications');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bogchatop_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('bogchatop_applications', JSON.stringify(applications));
  }, [applications]);

  // Tablar o'rtasida ma'lumotlarni sinxronlash (agar Admin panel alohida tabda ochiq bo'lsa)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'bogchatop_applications' && e.newValue) {
        setApplications(JSON.parse(e.newValue));
      }
      if (e.key === 'bogchatop_reviews' && e.newValue) {
        setReviews(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addKindergarten = (kg) => {
    setData(prev => [{ ...kg, id: Date.now().toString() }, ...prev]);
  };

  const updateKindergarten = (id, updatedKg) => {
    setData(prev => prev.map(k => k.id === id ? { ...k, ...updatedKg } : k));
  };

  const deleteKindergarten = (id) => {
    setData(prev => prev.filter(k => k.id !== id));
  };

  const addReview = (kgId, review) => {
    setReviews(prev => {
      const current = prev[kgId] || [];
      return { ...prev, [kgId]: [...current, { ...review, id: Date.now().toString(), date: new Date().toISOString() }] };
    });
  };

  const submitApplication = (application) => {
    setApplications(prev => [...prev, { ...application, id: Date.now().toString(), date: new Date().toISOString(), status: 'pending' }]);
  };

  const updateApplicationStatus = (appId, status) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  };

  const deleteApplication = (appId) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
  };

  const deleteReview = (kgId, reviewId) => {
    setReviews(prev => {
      if (!prev[kgId]) return prev;
      const updatedRevs = prev[kgId].filter(r => r.id !== reviewId);
      return { ...prev, [kgId]: updatedRevs };
    });
  };

  return (
    <KindergartenContext.Provider value={{
      data, addKindergarten, updateKindergarten, deleteKindergarten,
      reviews, addReview, deleteReview,
      applications, submitApplication, updateApplicationStatus, deleteApplication
    }}>
      {children}
    </KindergartenContext.Provider>
  );
}

export function useKindergartens() {
  return useContext(KindergartenContext);
}
