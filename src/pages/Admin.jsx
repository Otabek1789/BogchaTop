import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  MessageSquare, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Home,
  Gamepad2,
  Shield,
  TrendingUp,
  Layers,
  Ticket,
  Users,
  Settings,
  Activity,
  Zap
} from 'lucide-react';

import DashboardTab from './admin/DashboardTab';
import KindergartensTab from './admin/KindergartensTab';
import ApplicationsTab from './admin/ApplicationsTab';
import ReviewsTab from './admin/ReviewsTab';
import FinanceTab from './admin/FinanceTab';
import AnalyticsTab from './admin/AnalyticsTab';
import CategoriesTab from './admin/CategoriesTab';
import PromosTab from './admin/PromosTab';
import CustomersTab from './admin/CustomersTab';
import SettingsTab from './admin/SettingsTab';

export default function Admin() {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { products } = useProducts();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifs, setShowNotifs] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuSections = [
    {
      title: t('admin.secMain'),
      items: [
        { id: 'dashboard', label: t('admin.dashboard'), icon: <LayoutDashboard size={18} />, badge: null },
        { id: 'analytics', label: t('admin.analytics'), icon: <TrendingUp size={18} />, badge: 'LIVE', badgeColor: '#10b981', pulse: true },
      ]
    },
    {
      title: t('admin.secCatalog'),
      items: [
        { id: 'products', label: t('admin.products'), icon: <Package size={18} />, badge: `${products?.length || 24} ${t('admin.items')}`, badgeColor: 'var(--neon-cyan)' },
        { id: 'categories', label: t('admin.categories'), icon: <Layers size={18} />, badge: null },
        { id: 'promos', label: t('admin.promos'), icon: <Ticket size={18} />, badge: '-15%', badgeColor: '#ec4899' },
      ]
    },
    {
      title: t('admin.secSales'),
      items: [
        { id: 'orders', label: t('admin.orders'), icon: <ShoppingBag size={18} />, badge: `5 ${t('admin.newBadge')}`, badgeColor: '#f59e0b', pulse: true },
        { id: 'customers', label: t('admin.customers'), icon: <Users size={18} />, badge: '1.4K', badgeColor: '#a855f7' },
        { id: 'reviews', label: t('admin.reviews'), icon: <MessageSquare size={18} />, badge: '4.9 ★', badgeColor: '#fbbf24' },
      ]
    },
    {
      title: t('admin.secFinance'),
      items: [
        { id: 'finance', label: t('admin.finance'), icon: <DollarSign size={18} />, badge: null },
        { id: 'settings', label: t('admin.settings'), icon: <Settings size={18} />, badge: null },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '305px', 
        minWidth: '305px',
        background: 'var(--surface-warm)', 
        borderRight: '1px solid var(--neutral-200)', 
        padding: '20px 14px', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxSizing: 'border-box',
        zIndex: 50
      }}>
        {/* Brand */}
        <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0,240,255,0.15)', border: '1px solid rgba(0,240,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(0, 240, 255, 0.25)' }}>
              <Gamepad2 size={22} color="#00f0ff" />
            </div>
            <div>
              <h3 style={{ color: 'var(--neutral-900)', fontSize: '18px', fontWeight: 800, margin: 0, fontFamily: 'var(--font-gaming)', letterSpacing: '0.04em' }}>
                NEXUS<span style={{ color: '#00f0ff' }}>ADMIN</span>
              </h3>
              <p style={{ color: 'var(--neutral-500)', fontSize: '11px', margin: '2px 0 0 0', fontWeight: 600 }}>
                {t('admin.subtitle')}
              </p>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifs(!showNotifs)}
              style={{ background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', padding: '8px', borderRadius: '50%', cursor: 'pointer', position: 'relative', color: 'var(--neutral-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Bell size={16} />
              <span style={{ position: 'absolute', top: 1, right: 1, width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%', border: '2px solid var(--surface-warm)' }}></span>
            </button>
            
            {showNotifs && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '280px', background: 'var(--surface-warm)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: '1px solid var(--neutral-200)', zIndex: 100, overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--neutral-200)', fontWeight: 700, color: 'var(--neutral-900)', fontSize: '13px' }}>
                  {t('admin.notifications')}
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '12px' }}>
                    <strong style={{ color: '#00f0ff' }}>Yangi Gaming Buyurtma!</strong>
                    <div style={{ color: 'var(--neutral-600)', marginTop: '2px' }}>Javohir T. PlayStation 5 Pro sotib oldi.</div>
                  </div>
                  <div style={{ fontSize: '12px' }}>
                    <strong style={{ color: '#fbbf24' }}>Yangi Sharh:</strong>
                    <div style={{ color: 'var(--neutral-600)', marginTop: '2px' }}>"RTX 4090 noutbuk judayam kuchli..." (5★)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs with Sections */}
        <nav style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '14px', 
          overflowY: 'auto',
          paddingRight: '4px',
          marginBottom: '10px'
        }}>
          {menuSections.map((sec, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ 
                fontSize: '10.5px', 
                fontWeight: 800, 
                color: 'var(--neutral-400)', 
                letterSpacing: '0.08em', 
                padding: '4px 12px 2px',
                textTransform: 'uppercase'
              }}>
                {sec.title}
              </div>

              {sec.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                      color: isActive ? 'var(--neon-cyan)' : 'var(--neutral-600)',
                      border: isActive ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid transparent',
                      borderRadius: '10px', 
                      fontWeight: isActive ? 700 : 500, 
                      fontSize: '13px', 
                      cursor: 'pointer', 
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {item.icon} 
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span style={{ 
                        padding: '1px 7px', 
                        borderRadius: '6px', 
                        fontSize: '10.5px', 
                        fontWeight: 800,
                        background: `${item.badgeColor}20`,
                        color: item.badgeColor,
                        border: `1px solid ${item.badgeColor}40`
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Live System & Store Info Widget */}
        <div style={{
          margin: '4px 0 12px',
          padding: '10px 12px',
          borderRadius: '12px',
          background: 'rgba(0, 240, 255, 0.04)',
          border: '1px solid rgba(0, 240, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('admin.systemStatus')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
              {t('admin.online')} (18ms)
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--neutral-500)' }}>
            <span>{t('admin.todayRevenue')}</span>
            <strong style={{ color: '#10b981', fontFamily: 'var(--font-gaming)' }}>24.8M so'm</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--neutral-500)' }}>
            <span>{t('admin.onlineUsers')}</span>
            <strong style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-gaming)' }}>142 {t('admin.onlineUsersCount')}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--neutral-500)' }}>
            <span>{t('admin.inCourier')}</span>
            <strong style={{ color: '#f59e0b', fontFamily: 'var(--font-gaming)' }}>4 {t('admin.ordersCount')}</strong>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ borderTop: '1px solid var(--neutral-200)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)', color: '#000',
              border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', 
              textAlign: 'center', justifyContent: 'center', transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 240, 255, 0.3)'
            }}
          >
            <Home size={16} /> {t('admin.backToStore')}
          </button>

          {/* Theme & Lang */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={toggleTheme}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '7px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-700)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span>{theme === 'light' ? t('admin.night') : t('admin.day')}</span>
            </button>
            <button 
              onClick={() => setLang(lang === 'uz' ? 'ru' : lang === 'ru' ? 'en' : 'uz')}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '7px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-700)', cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}
            >
              <Globe size={14} /> <span>{lang.toUpperCase()}</span>
            </button>
          </div>

          {/* User Profile info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', paddingTop: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #7000ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', flexShrink: 0, fontSize: '13px' }}>
                <Shield size={15} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--neutral-900)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.displayName || "Nexus Admin"}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--neutral-500)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.email || "admin@nexusgaming.uz"}
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              style={{ padding: '6px', background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', flexShrink: 0, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={t('admin.logout')}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto', background: 'var(--surface)' }}>
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'products' && <KindergartensTab />}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'promos' && <PromosTab />}
        {activeTab === 'orders' && <ApplicationsTab />}
        {activeTab === 'customers' && <CustomersTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'finance' && <FinanceTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}
