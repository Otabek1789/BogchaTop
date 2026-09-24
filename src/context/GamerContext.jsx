import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { soundFX } from '../utils/soundFX';

const GamerContext = createContext();

export const ALL_BADGES = [
  { id: 'first_order', title: 'Birinchi Geymer Xaridi', desc: 'Do\'kondan birinchi mahsulotni xarid qildi', icon: 'ShoppingBag', color: '#10b981' },
  { id: 'reflex_champ', title: 'Rush Mid Chempioni', desc: "Rush Mid o'yinida g'alabaga erishdi", icon: 'Crosshair', color: '#f59e0b' },
  { id: 'speed_demon', title: 'Kiber Snayper', desc: "Rush Mid o'yinida 300+ ball to'plab promokod yutdi", icon: 'Flame', color: '#ef4444' },
  { id: 'pc_architect', title: 'PC Arxitektori', desc: 'PC Konfigurator orqali orzusidagi kompyuterni yig\'di', icon: 'Cpu', color: '#00f0ff' },
  { id: 'ai_explorer', title: 'Cyber AI Hamkor', desc: 'Nexus AI maslahatchisi yordamida texnika tanladi', icon: 'Bot', color: '#8b5cf6' },
  { id: 'collector', title: 'Kolleksioner', desc: '5 dan ortiq gaming tovarlarini sevimlilarga saqladi', icon: 'Heart', color: '#ec4899' },
  { id: 'esports_veteran', title: 'E-Sports Faxriysi', desc: '10-darajali professional geymer maqomiga yetdi', icon: 'Award', color: '#eab308' },
  { id: 'cyber_legend', title: 'Kiber Afsona', desc: 'Eng oliy darajadagi 20+ Level geymer!', icon: 'Crown', color: '#a855f7' }
];

export function GamerProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_gamer_profile');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      xp: 850,
      unlockedBadges: ['pc_architect', 'ai_explorer'],
      completedQuests: ['quest-1']
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_gamer_profile', JSON.stringify(profile));
    } catch (_) {}
  }, [profile]);

  // Calculations
  const xp = profile.xp;
  const level = Math.floor(xp / 250) + 1;
  const currentLevelXp = xp % 250;
  const nextLevelXp = 250;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100));

  // Rank title and styling
  let rankTitle = 'Recruit Gamer';
  let rankTier = 'bronze';
  let rankBadge = '🥉';
  let discountPercent = 0;

  if (level >= 20) {
    rankTitle = 'Cyber Legend';
    rankTier = 'legend';
    rankBadge = '👑';
    discountPercent = 15;
  } else if (level >= 15) {
    rankTitle = 'Diamond Master';
    rankTier = 'diamond';
    rankBadge = '💎';
    discountPercent = 10;
  } else if (level >= 10) {
    rankTitle = 'Pro Esports';
    rankTier = 'gold';
    rankBadge = '🥇';
    discountPercent = 8;
  } else if (level >= 5) {
    rankTitle = 'Silver Trooper';
    rankTier = 'silver';
    rankBadge = '🥈';
    discountPercent = 5;
  }

  const addXP = (amount, reason = '') => {
    if (!amount || amount <= 0) return;
    const oldLevel = Math.floor(profile.xp / 250) + 1;
    const newXP = profile.xp + amount;
    const newLevel = Math.floor(newXP / 250) + 1;

    setProfile(prev => ({ ...prev, xp: newXP }));

    if (newLevel > oldLevel) {
      soundFX.playSuccess();
      toast.success(`🎉 LEVEL UP! Siz ${newLevel}-Darajaga erishdingiz!`, {
        duration: 5000,
        style: {
          background: '#0f172a',
          color: '#00f0ff',
          border: '2px solid #00f0ff',
          boxShadow: '0 0 25px rgba(0, 240, 255, 0.5)',
          fontWeight: 800
        }
      });
      if (newLevel === 5) unlockBadge('esports_veteran');
      if (newLevel >= 20) unlockBadge('cyber_legend');
    } else {
      soundFX.playClick(1500);
      toast(`+${amount} XP ${reason ? `(${reason})` : ''} 🎮`, {
        icon: '⚡',
        style: {
          background: '#1e1b4b',
          color: '#c084fc',
          border: '1px solid #7c3aed',
          fontSize: '13px',
          fontWeight: 700
        }
      });
    }
  };

  const unlockBadge = (badgeId) => {
    if (profile.unlockedBadges.includes(badgeId)) return;
    const badge = ALL_BADGES.find(b => b.id === badgeId);
    if (!badge) return;

    soundFX.playSuccess();
    setProfile(prev => ({
      ...prev,
      unlockedBadges: [...prev.unlockedBadges, badgeId],
      xp: prev.xp + 150
    }));

    toast.success(`🏆 Yangi Yutuq Ochildi: "${badge.title}" (+150 XP)!`, {
      duration: 5000,
      style: {
        background: '#18181b',
        color: '#fbbf24',
        border: '1px solid #f59e0b'
      }
    });
  };

  const completeQuest = (questId, rewardXP = 100) => {
    if (profile.completedQuests.includes(questId)) return;
    setProfile(prev => ({
      ...prev,
      completedQuests: [...prev.completedQuests, questId]
    }));
    addXP(rewardXP, "Topshiriq bajarildi");
  };

  return (
    <GamerContext.Provider value={{
      xp,
      level,
      currentLevelXp,
      nextLevelXp,
      progressPercent,
      rankTitle,
      rankTier,
      rankBadge,
      discountPercent,
      unlockedBadges: profile.unlockedBadges,
      completedQuests: profile.completedQuests,
      allBadges: ALL_BADGES,
      addXP,
      unlockBadge,
      completeQuest
    }}>
      {children}
    </GamerContext.Provider>
  );
}

export function useGamer() {
  return useContext(GamerContext);
}
