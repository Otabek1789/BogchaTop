import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  ShoppingBag, 
  Globe, 
  Smartphone, 
  Monitor, 
  Zap, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function AnalyticsTab() {
  const { lang, t } = useLanguage();
  const [timeRange, setTimeRange] = useState('today');

  const hourlyData = [
    { time: '09:00', visitors: 45, sales: 1 },
    { time: '11:00', visitors: 110, sales: 3 },
    { time: '13:00', visitors: 165, sales: 6 },
    { time: '15:00', visitors: 190, sales: 8 },
    { time: '17:00', visitors: 240, sales: 12 },
    { time: '19:00', visitors: 310, sales: 17 },
    { time: '21:00', visitors: 280, sales: 14 },
    { time: '23:00', visitors: 150, sales: 5 },
  ];

  const trafficSources = [
    { name: 'Telegram (@nexus_gaming)', share: '46%', visits: '3,820 ta', trend: '+14%' },
    { name: 'Instagram & Reels', share: '28%', visits: '2,320 ta', trend: '+22%' },
    { name: 'Google Qidiruv (SEO)', share: '18%', visits: '1,490 ta', trend: '+8%' },
    { name: 'To\'g\'ridan-to\'g\'ri kirishlar (Direct)', share: '8%', visits: '660 ta', trend: '+5%' },
  ];

  const deviceData = [
    { name: 'Smartfonlar (iOS & Android)', percent: 64, icon: <Smartphone size={18} /> },
    { name: 'Kompyuter va Noutbuklar', percent: 32, icon: <Monitor size={18} /> },
    { name: 'Planshetlar', percent: 4, icon: <Globe size={18} /> },
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner & Range Picker */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: 0 }}>
              {t('admin.analytics').toUpperCase()}
            </h2>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
              LIVE
            </span>
          </div>
          <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '4px' }}>
            {t('admin.panelSubtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px', background: 'var(--neutral-100)', padding: '4px', borderRadius: '10px', border: '1px solid var(--neutral-200)' }}>
          {[
            { id: 'today', label: lang === 'ru' ? 'Сегодня' : lang === 'en' ? 'Today' : 'Bugun' },
            { id: 'week', label: lang === 'ru' ? 'Эта неделя' : lang === 'en' ? 'This Week' : 'Shu hafta' },
            { id: 'month', label: lang === 'ru' ? 'Этот месяц' : lang === 'en' ? 'This Month' : 'Shu oy' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTimeRange(item.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: timeRange === item.id ? 'var(--neon-cyan)' : 'transparent',
                color: timeRange === item.id ? '#000' : 'var(--neutral-600)',
                fontWeight: 700,
                fontSize: '12.5px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ padding: '20px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--neutral-500)', fontWeight: 600 }}>Hozir saytda onlayn</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-gaming)', margin: '10px 0 4px' }}>
            142 nafar
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#10b981', fontWeight: 600 }}>
            <ArrowUpRight size={14} /> +24% kechagiga nisbatan
          </div>
        </div>

        <div className="card" style={{ padding: '20px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--neutral-500)', fontWeight: 600 }}>Bugungi tashriflar</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: '10px 0 4px' }}>
            8,290 ta
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#10b981', fontWeight: 600 }}>
            <ArrowUpRight size={14} /> +18.5% o'sish
          </div>
        </div>

        <div className="card" style={{ padding: '20px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--neutral-500)', fontWeight: 600 }}>Konversiya (Sotuv)</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-gaming)', margin: '10px 0 4px' }}>
            3.85%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#10b981', fontWeight: 600 }}>
            <ArrowUpRight size={14} /> Yuqori (sanoat o'rtacha 2.1%)
          </div>
        </div>

        <div className="card" style={{ padding: '20px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--neutral-500)', fontWeight: 600 }}>O'rtacha chek qiymati</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-gaming)', margin: '10px 0 4px' }}>
            3,450,000 so'm
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--neutral-500)' }}>
            PS5 Pro va Noutbuklar hisobiga
          </div>
        </div>
      </div>

      {/* Hourly Dynamics Bar Chart Simulation */}
      <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
              Soatlik faollik va xaridlar jadvali (Bugun)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '12.5px', margin: '4px 0 0 0' }}>
              Foydalanuvchilar qaysi vaqtda eng ko'p gaming tovarlarni xarid qilishmoqda
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-cyan)' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--neon-cyan)' }}></span>
              Tashriflar
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#10b981' }}></span>
              Xaridlar
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '14px', alignItems: 'flex-end', height: '200px', paddingTop: '20px', borderBottom: '1px solid var(--neutral-200)' }}>
          {hourlyData.map((h, i) => {
            const heightPercent = (h.visitors / 320) * 100;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--neutral-400)' }}>{h.sales} ta</div>
                <div 
                  style={{ 
                    width: '100%', 
                    maxWidth: '42px',
                    height: `${heightPercent}%`, 
                    background: 'linear-gradient(180deg, var(--neon-cyan) 0%, rgba(0, 240, 255, 0.2) 100%)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.4s ease'
                  }}
                  title={`${h.time}: ${h.visitors} tashrif, ${h.sales} sotuv`}
                ></div>
                <span style={{ fontSize: '11.5px', color: 'var(--neutral-500)', fontWeight: 600 }}>{h.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Traffic Sources & Devices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Traffic Sources */}
        <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '16px' }}>
            Trafik manbalari
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {trafficSources.map((source, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--neutral-100)', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--neutral-900)' }}>{source.name}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)', marginTop: '2px' }}>{source.visits} tashrif</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--neon-cyan)' }}>{source.share}</div>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>{source.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '16px' }}>
            Qurilmalar bo'yicha taqsimot
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {deviceData.map((dev, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-800)' }}>
                    {dev.icon} {dev.name}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--neutral-900)' }}>{dev.percent}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--neutral-200)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${dev.percent}%`, height: '100%', background: idx === 0 ? 'var(--neon-cyan)' : idx === 1 ? '#a855f7' : '#f59e0b', borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
