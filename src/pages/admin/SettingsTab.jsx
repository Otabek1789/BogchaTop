import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Settings, CreditCard, Truck, Bell, Shield, Save, CheckCircle, Store, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsTab() {
  const { t } = useLanguage();
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_payment_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [
      { id: 'click', name: 'Click Up', fee: '0%', active: true, desc: 'O\'zbekiston bo\'ylab bir zumda to\'lov' },
      { id: 'payme', name: 'Payme', fee: '0%', active: true, desc: 'Humo va Uzcard kartalari orqali to\'lov' },
      { id: 'uzum', name: 'Uzum Bank / Nasiya', fee: '0%', active: true, desc: 'Bo\'lib to\'lash va Uzum orqali xarid' },
      { id: 'cash', name: 'Kuryerga Naqd / Karta', fee: '0%', active: true, desc: 'Tovarni qabul qilib olganda to\'lash' },
    ];
  });

  const [botAlerts, setBotAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_bot_alerts');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (_) {
      return true;
    }
  });

  const [soundAlerts, setSoundAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_sound_alerts');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (_) {
      return true;
    }
  });

  const [deliveryTariffs, setDeliveryTariffs] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_delivery_tariffs');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      tashkentPrice: 25000,
      regionsPrice: 45000,
      freeThreshold: 5000000
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_payment_settings', JSON.stringify(payments));
    } catch (_) {}
  }, [payments]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_bot_alerts', JSON.stringify(botAlerts));
      localStorage.setItem('nexus_sound_alerts', JSON.stringify(soundAlerts));
    } catch (_) {}
  }, [botAlerts, soundAlerts]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_delivery_tariffs', JSON.stringify(deliveryTariffs));
    } catch (_) {}
  }, [deliveryTariffs]);

  const togglePayment = (id) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    toast.success("To'lov tizimi holati yangilandi!");
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    toast.success("Barcha do'kon sozlamalari muvaffaqiyatli saqlandi! ✨");
  };

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: 0 }}>
          {t('admin.settings').toUpperCase()}
        </h2>
        <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '4px' }}>
          {t('admin.panelSubtitle')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px' }}>
        {/* Payment Systems */}
        <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
              To'lov Tizimlari
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {payments.map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--neutral-100)', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--neutral-900)' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--neutral-500)', marginTop: '2px' }}>{p.desc}</div>
                </div>
                <button
                  onClick={() => togglePayment(p.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: p.active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: p.active ? '#10b981' : '#ef4444',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {p.active ? 'Yoqilgan 🟢' : 'O\'chirilgan 🔴'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Deliveries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Telegram Notifications */}
          <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
                Xabarnomalar (Telegram Bot)
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '10px 14px', background: 'var(--neutral-100)', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--neutral-900)' }}>Telegram Bot orqali yangi buyurtmalar</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>@NexusGamingAdminBot ga xabar boradi</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={botAlerts} 
                  onChange={(e) => setBotAlerts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--neon-cyan)', cursor: 'pointer' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '10px 14px', background: 'var(--neutral-100)', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--neutral-900)' }}>Tovushli audio signal</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>Yangi xarid bo'lganda ovozli bildirishnoma</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={soundAlerts} 
                  onChange={(e) => setSoundAlerts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--neon-cyan)', cursor: 'pointer' }}
                />
              </label>
            </div>
          </div>

          {/* Delivery Tariffs */}
          <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
                Yetkazib Berish Narxlari
              </h3>
            </div>

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: '4px' }}>
                  Toshkent shahar ichida tezkor yetkazish (3 soat):
                </label>
                <input 
                  type="number" 
                  value={deliveryTariffs.tashkentPrice} 
                  onChange={(e) => setDeliveryTariffs({ ...deliveryTariffs, tashkentPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 12px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-900)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: '4px' }}>
                  Viloyatlarga yetkazish (24 soat):
                </label>
                <input 
                  type="number" 
                  value={deliveryTariffs.regionsPrice} 
                  onChange={(e) => setDeliveryTariffs({ ...deliveryTariffs, regionsPrice: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 12px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-900)', outline: 'none' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
                <Save size={16} /> Tariflarni Saqlash
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
