import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Users, Search, Phone, Mail, Award, Eye, ShieldCheck, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CustomersTab() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState('all');

  const [customers, setCustomers] = useState([
    { id: 'CUST-101', name: 'Javohir Toshmatov', tag: 'ShadowGamer99', phone: '+998 90 123 45 67', email: 'javohir@gamer.uz', orders: 4, spent: 18500000, tier: 'Diamond', city: 'Toshkent' },
    { id: 'CUST-102', name: 'Sardor Aliyev', tag: 'CyberPhantom', phone: '+998 93 555 44 33', email: 'sardor@nexus.uz', orders: 2, spent: 7800000, tier: 'Gold', city: 'Samarqand' },
    { id: 'CUST-103', name: 'Dilshod Rahmatov', tag: 'NeonViper', phone: '+998 97 777 88 99', email: 'dilshod@esports.uz', orders: 5, spent: 28400000, tier: 'Diamond', city: 'Toshkent' },
    { id: 'CUST-104', name: 'Azizbek Qodirov', tag: 'AzizProFPS', phone: '+998 99 321 65 47', email: 'aziz@gmail.com', orders: 1, spent: 2200000, tier: 'Silver', city: 'Buxoro' },
    { id: 'CUST-105', name: 'Madina Karimova', tag: 'LunaStrike', phone: '+998 91 444 12 34', email: 'madina@streamer.uz', orders: 3, spent: 14200000, tier: 'Gold', city: 'Farg\'ona' },
    { id: 'CUST-106', name: 'Timur Karimov', tag: 'TitanRider', phone: '+998 90 987 65 43', email: 'timur@inbox.uz', orders: 1, spent: 9800000, tier: 'Gold', city: 'Andijon' },
  ]);

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  const filtered = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.tag.toLowerCase().includes(search.toLowerCase()) ||
                          c.phone.includes(search);
    const matchesTier = filterTier === 'all' || c.tier.toLowerCase() === filterTier.toLowerCase();
    return matchesSearch && matchesTier;
  });

  const getTierBadge = (tier) => {
    if (tier === 'Diamond') {
      return <span style={{ background: 'rgba(0, 240, 255, 0.15)', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>💎 Diamond VIP</span>;
    }
    if (tier === 'Gold') {
      return <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid #fbbf24', padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>⭐ Gold</span>;
    }
    return <span style={{ background: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', border: '1px solid #94a3b8', padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>Silver</span>;
  };

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: 0 }}>
          {t('admin.customers').toUpperCase()}
        </h2>
        <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '4px' }}>
          {t('admin.panelSubtitle')}
        </p>
      </div>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ padding: '18px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <span style={{ fontSize: '12px', color: 'var(--neutral-500)', fontWeight: 600 }}>Jami Ro'yxatdan O'tganlar</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: '6px 0 2px' }}>
            1,420 nafar
          </div>
          <span style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 600 }}>+48 ta yangi bu hafta</span>
        </div>

        <div className="card" style={{ padding: '18px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <span style={{ fontSize: '12px', color: 'var(--neutral-500)', fontWeight: 600 }}>Diamond VIP Gamerlar</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-gaming)', margin: '6px 0 2px' }}>
            86 nafar
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>15M+ so'm xarid qilganlar</span>
        </div>

        <div className="card" style={{ padding: '18px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <span style={{ fontSize: '12px', color: 'var(--neutral-500)', fontWeight: 600 }}>Qayta Xarid Qilish Foizi</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-gaming)', margin: '6px 0 2px' }}>
            42.8%
          </div>
          <span style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 600 }}>Yuqori sodiqlik ko'rsatkichi</span>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', padding: '8px 14px', minWidth: '280px' }}>
            <Search size={16} color="var(--neutral-400)" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ism, taxallus yoki telefon..."
              style={{ background: 'transparent', border: 'none', color: 'var(--neutral-900)', fontSize: '13.5px', outline: 'none', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'diamond', 'gold', 'silver'].map((tier) => (
              <button
                key={tier}
                onClick={() => setFilterTier(tier)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: filterTier === tier ? 'var(--neon-cyan)' : 'var(--neutral-100)',
                  color: filterTier === tier ? '#000' : 'var(--neutral-700)',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tier === 'all' ? 'Barchasi' : tier}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-500)', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Gamer</th>
                <th style={{ padding: '12px 14px' }}>Aloqa</th>
                <th style={{ padding: '12px 14px' }}>Shahar</th>
                <th style={{ padding: '12px 14px' }}>Buyurtmalar</th>
                <th style={{ padding: '12px 14px' }}>Umumiy Xarid</th>
                <th style={{ padding: '12px 14px' }}>Darajasi</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--neutral-200)' }}>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #7000ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, fontSize: '13px' }}>
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--neutral-900)' }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--neon-cyan)', fontWeight: 600 }}>@{c.tag}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px', fontSize: '12.5px', color: 'var(--neutral-600)' }}>
                    <div>{c.phone}</div>
                    <div style={{ fontSize: '11px', color: 'var(--neutral-400)' }}>{c.email}</div>
                  </td>
                  <td style={{ padding: '14px', fontSize: '13px', color: 'var(--neutral-700)' }}>
                    {c.city}
                  </td>
                  <td style={{ padding: '14px', fontSize: '13.5px', fontWeight: 700, color: 'var(--neutral-900)' }}>
                    {c.orders} ta
                  </td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-gaming)', fontWeight: 800, fontSize: '14px', color: '#10b981' }}>
                    {formatPrice(c.spent)}
                  </td>
                  <td style={{ padding: '14px' }}>
                    {getTierBadge(c.tier)}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <button 
                      onClick={() => toast.success(`${c.name} profiliga Telegram xabari yuborildi!`)}
                      style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--neon-cyan)', border: '1px solid rgba(0, 240, 255, 0.25)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Bog'lanish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
