import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, UserCheck, DollarSign, Calendar, Briefcase, MessageSquare, Moon, Sun, Globe, Bell, Home } from 'lucide-react';

import DashboardTab from './admin/DashboardTab';
import ChildrenTab from './admin/ChildrenTab';
import AttendanceTab from './admin/AttendanceTab';
import FinanceTab from './admin/FinanceTab';
import ScheduleTab from './admin/ScheduleTab';
import HrTab from './admin/HrTab';
import CommunicationTab from './admin/CommunicationTab';
import KindergartensTab from './admin/KindergartensTab';
import ApplicationsTab from './admin/ApplicationsTab';
import ReviewsTab from './admin/ReviewsTab';

export default function Admin() {
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifs, setShowNotifs] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: t('crm.dashboard'), icon: <LayoutDashboard size={20} /> },
    { id: 'kindergartens', label: t('admin.allKindergartens') || 'Barcha Bog\'chalar', icon: <Globe size={20} /> },
    { id: 'applications', label: t('admin.applications') || 'Arizalar', icon: <MessageSquare size={20} /> },
    { id: 'reviews', label: t('admin.reviews') || 'Izohlar', icon: <MessageSquare size={20} /> },
    { id: 'children', label: t('crm.childrenAndGroups'), icon: <Users size={20} /> },
    { id: 'attendance', label: t('crm.attendance'), icon: <UserCheck size={20} /> },
    { id: 'finance', label: t('crm.financeAndPayments'), icon: <DollarSign size={20} /> },
    { id: 'schedule', label: t('crm.schedule'), icon: <Calendar size={20} /> },
    { id: 'hr', label: t('crm.hr'), icon: <Briefcase size={20} /> },
    { id: 'communication', label: t('crm.communication'), icon: <MessageSquare size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--surface)' }}>
      {/* Sidebar */}
      <aside style={{ width: '320px', background: 'var(--surface-warm)', borderRight: '1px solid var(--neutral-200)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className="text-h3" style={{ color: 'var(--neutral-900)' }}>{t('admin.crmTitle') || "Bog'cha CRM"}</h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '14px' }}>{t('admin.dashboardDesc') || "Boshqaruv paneli"}</p>
          </div>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifs(!showNotifs)}
              style={{ background: 'var(--neutral-100)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', position: 'relative', color: 'var(--neutral-700)' }}
            >
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%', border: '2px solid var(--surface-warm)' }}></span>
            </button>
            
            {showNotifs && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '280px', background: 'var(--surface)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid var(--neutral-200)', zIndex: 100, overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)', fontWeight: 600, color: 'var(--neutral-900)' }}>{t('admin.notifications') || "Bildirishnomalar"}</div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neutral-900)' }}>{t('admin.newApp') || "Yangi ariza:"}</strong>
                    <div style={{ color: 'var(--neutral-600)', marginTop: '4px' }}>{t('admin.newAppDesc') || "Alisher M. dan ariza tushdi."}</div>
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <strong style={{ color: 'var(--neutral-900)' }}>{t('admin.newReview') || "Yangi izoh:"}</strong>
                    <div style={{ color: 'var(--neutral-600)', marginTop: '4px' }}>{t('admin.newReviewDesc') || "\"Bog'cha judayam zo'r...\" (5 yulduz)"}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                background: activeTab === item.id ? 'var(--primary-50)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary-700)' : 'var(--neutral-600)',
                border: 'none', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
            background: 'var(--brand-500)', color: 'white',
            border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', textAlign: 'center',
            justifyContent: 'center', transition: 'all 0.2s ease', marginTop: '16px'
          }}
        >
          <Home size={20} /> {t('admin.backToSite') || "Saytga qaytish"}
        </button>

        {/* Toggles */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', marginTop: '24px' }}>
          <button 
            onClick={toggleTheme}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-700)', cursor: 'pointer' }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button 
            onClick={() => setLang(lang === 'uz' ? 'ru' : lang === 'ru' ? 'en' : 'uz')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '8px', color: 'var(--neutral-700)', cursor: 'pointer', fontWeight: 600 }}
          >
            <Globe size={18} /> {lang.toUpperCase()}
          </button>
        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid var(--neutral-200)', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-100, #e0e7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-700, #4338ca)', fontWeight: 'bold', flexShrink: 0, fontSize: '18px' }}>
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neutral-900)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.displayName || "Admin"}</div>
              <div style={{ fontSize: '12px', color: 'var(--neutral-500)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.email}</div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            style={{ padding: '8px', background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', flexShrink: 0 }}
            title={t('admin.logout')}
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', background: 'var(--surface)' }}>
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'kindergartens' && <KindergartensTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'children' && <ChildrenTab />}
        {activeTab === 'attendance' && <AttendanceTab />}
        {activeTab === 'finance' && <FinanceTab />}
        {activeTab === 'schedule' && <ScheduleTab />}
        {activeTab === 'hr' && <HrTab />}
        {activeTab === 'communication' && <CommunicationTab />}
      </main>
    </div>
  );
}
