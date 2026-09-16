import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Baby, User, Settings, LogOut, Moon, Sun, Heart, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import './Header.css';

export default function Header({ isAdmin }) {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="header glass">
      <div className={`header-content ${isAdmin ? 'admin-header-container' : 'container'}`} style={isAdmin ? { position: 'relative' } : {}}>
        <Link to="/" className="logo-link" style={isAdmin ? { width: '280px' } : {}}>
          <div className="logo-icon">
            <Baby size={24} color="white" />
          </div>
          <span className="logo-text">Bog'cha<span className="text-gradient">Top</span></span>
        </Link>
        
        <nav className="nav-desktop" style={isAdmin ? { position: 'absolute', left: '50%', transform: 'translateX(-50%)' } : {}}>
          <Link to="/" className="nav-link">{t('header.home')}</Link>
          <Link to="/kindergartens" className="nav-link">{t('header.kindergartens')}</Link>
          <Link to="/map" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {t('header.map')}
          </Link>
          <Link to="/kids" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {t('header.kids')}
          </Link>
          <Link to="/favorites" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {t('header.favorites')}
            {favorites.length > 0 && (
              <span style={{ background: '#EF4444', color: 'white', fontSize: '12px', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/contact" className="nav-link">{t('header.contact')}</Link>
        </nav>
        
        <div className="header-actions" style={isAdmin ? { flex: 1, justifyContent: 'flex-end' } : {}}>
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${lang === 'uz' ? 'active' : ''}`}
              onClick={() => setLang('uz')}
            >
              UZ
            </button>
            <button 
              className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
              onClick={() => setLang('ru')}
            >
              RU
            </button>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          
          <button 
            onClick={toggleTheme} 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', cursor: 'pointer', color: 'var(--neutral-700)' }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <div className="user-dropdown-container" ref={dropdownRef} style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="btn btn-primary cta-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="User" style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={18} />
                )}
                <span>{user.displayName || t('header.user')}</span>
              </button>

              {isDropdownOpen && (
                <div style={{ position: 'absolute', top: '100%', right: '0', marginTop: '12px', background: 'var(--surface-warm)', border: '1px solid var(--neutral-200)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: '220px', zIndex: 100 }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--neutral-200)', background: 'var(--surface)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-700)', fontWeight: 'bold', fontSize: '18px', flexShrink: 0 }}>
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : "F"}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{user.displayName || t('header.user')}</div>
                      <div style={{ fontSize: '13px', color: 'var(--neutral-500)', marginTop: '2px' }}>{user.email || "foydalanuvchi@mail.com"}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--neutral-700)', textDecoration: 'none', transition: 'all 0.2s' }} className="dropdown-item">
                      <User size={16} color="var(--neutral-500)" />
                      {t('header.myProfile')}
                    </Link>

                    <Link to="/favorites" onClick={() => setIsDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--neutral-700)', textDecoration: 'none', transition: 'all 0.2s' }} className="dropdown-item">
                      <Heart size={16} color="var(--neutral-500)" />
                      {t('header.favorites')} ({favorites.length})
                    </Link>

                    <Link to="/my-applications" onClick={() => setIsDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--neutral-700)', textDecoration: 'none', transition: 'all 0.2s' }} className="dropdown-item">
                      <FileText size={16} color="var(--neutral-500)" />
                      {t('header.myApplications')}
                    </Link>
                  </div>

                  {user.isAdmin && (
                    <Link to="/admin" onClick={() => setIsDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: 'var(--neutral-700)', textDecoration: 'none', borderTop: '1px solid var(--neutral-200)', background: 'var(--brand-50)' }}>
                      <Settings size={16} color="var(--brand-600)" />
                      <span style={{ color: 'var(--brand-700)', fontWeight: 500 }}>{t('header.adminPanel')}</span>
                    </Link>
                  )}
                  
                  <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--surface)', border: 'none', borderTop: '1px solid var(--neutral-200)', color: '#EF4444', cursor: 'pointer', textAlign: 'left', fontSize: '15px' }} className="dropdown-item">
                    <LogOut size={16} />
                    {t('header.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary cta-btn">
              <User size={16} />
              <span>{t('header.login') || "Kirish"}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
