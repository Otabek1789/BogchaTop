import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Zap, Ticket, Plus, Trash2, CheckCircle2, Clock, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PromosTab() {
  const { t } = useLanguage();
  const [promos, setPromos] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_admin_promos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [
      { code: 'GAMERPRO15', discount: 15, type: 'percent', used: 64, max: 200, status: 'Faol', expires: '2025-12-31' },
      { code: 'WELCOME10', discount: 10, type: 'percent', used: 128, max: 500, status: 'Faol', expires: '2025-10-30' },
      { code: 'ESPORTS20', discount: 20, type: 'percent', used: 18, max: 50, status: 'Faol', expires: '2025-11-15' },
      { code: 'CYBERDEAL', discount: 25, type: 'percent', used: 50, max: 50, status: 'Tugagan', expires: '2025-08-01' },
    ];
  });

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newMax, setNewMax] = useState(100);

  const [gameThreshold, setGameThreshold] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_rush_mid_threshold');
      return saved ? Number(saved) : 150;
    } catch (_) {
      return 150;
    }
  });

  const [gamePrize, setGamePrize] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_rush_mid_prize');
      return saved ? Number(saved) : 15;
    } catch (_) {
      return 15;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_admin_promos', JSON.stringify(promos));
    } catch (_) {}
  }, [promos]);

  const handleAddPromo = (e) => {
    e.preventDefault();
    if (!newCode.trim() || !newDiscount) return;
    const item = {
      code: newCode.toUpperCase(),
      discount: Number(newDiscount),
      type: 'percent',
      used: 0,
      max: Number(newMax),
      status: 'Faol',
      expires: '2025-12-31'
    };
    setPromos([item, ...promos]);
    setNewCode('');
    setNewDiscount('');
    toast.success(`Yangi promokod yaratildi: ${item.code}`);
  };

  const handleDeletePromo = (code) => {
    setPromos(promos.filter(p => p.code !== code));
    toast.success("Promokod o'chirildi!");
  };

  const handleSaveGameSettings = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('nexus_rush_mid_threshold', gameThreshold.toString());
      localStorage.setItem('nexus_rush_mid_prize', gamePrize.toString());
    } catch (_) {}
    toast.success("Rush Mid o'yini parametrlari saqlandi! 🎮");
  };

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: 0 }}>
          {t('admin.promos').toUpperCase()}
        </h2>
        <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '4px' }}>
          {t('admin.panelSubtitle')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px' }}>
        {/* Promocodes Table */}
        <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={18} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
              Faol Promokodlar
            </h3>
          </div>

          {/* Add form */}
          <form onSubmit={handleAddPromo} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr auto', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="KOD (masalan: ROG2025)..."
              style={{ padding: '10px 12px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-900)', fontSize: '13px', outline: 'none', textTransform: 'uppercase' }}
            />
            <input 
              type="number" 
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              placeholder="Chegirma %"
              min="1"
              max="90"
              style={{ padding: '10px 12px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-900)', fontSize: '13px', outline: 'none' }}
            />
            <input 
              type="number" 
              value={newMax}
              onChange={(e) => setNewMax(e.target.value)}
              placeholder="Limit"
              style={{ padding: '10px 12px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-900)', fontSize: '13px', outline: 'none' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '13px' }}>
              <Plus size={16} />
            </button>
          </form>

          {/* Promos List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {promos.map((p) => (
              <div key={p.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--neutral-100)', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <strong style={{ fontFamily: 'var(--font-gaming)', fontSize: '1.2rem', color: 'var(--neon-cyan)', letterSpacing: '0.05em' }}>
                      {p.code}
                    </strong>
                    <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', fontSize: '12px', fontWeight: 800 }}>
                      -{p.discount}%
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)', marginTop: '4px' }}>
                    Ishlatildi: {p.used} / {p.max} ta • Muddati: {p.expires}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: p.status === 'Faol' ? '#10b981' : '#ef4444' }}>
                    {p.status}
                  </span>
                  <button 
                    onClick={() => handleDeletePromo(p.code)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--neutral-400)', cursor: 'pointer', padding: '4px' }}
                    title="O'chirish"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cyber Reflex Mini-game settings */}
        <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
              Rush Mid CS2 O'yin Parametrlari
            </h3>
          </div>

          <form onSubmit={handleSaveGameSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: '6px' }}>
                Yutuqli ball chegarasi (Threshold)
              </label>
              <input 
                type="number" 
                value={gameThreshold}
                onChange={(e) => setGameThreshold(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', color: 'var(--neutral-900)', outline: 'none' }}
              />
              <span style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>Foydalanuvchi shu balldan oshsa promokod oladi</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: '6px' }}>
                Sovrinli Chegirma Foizi (%)
              </label>
              <input 
                type="number" 
                value={gamePrize}
                onChange={(e) => setGamePrize(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', color: 'var(--neutral-900)', outline: 'none' }}
              />
            </div>

            <div style={{ padding: '14px', background: 'rgba(0, 240, 255, 0.08)', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-cyan)', fontWeight: 700, fontSize: '13px' }}>
                <Award size={16} /> Beriladigan Promokod
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--neutral-500)' }}>
                Yutgan gamerlarga avtomatik ravishda <strong>GAMERPRO15</strong> kodi taqdim etiladi.
              </p>
            </div>

            <button type="submit" className="btn btn-cyber" style={{ marginTop: '8px' }}>
              Parametrlarni Saqlash
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
