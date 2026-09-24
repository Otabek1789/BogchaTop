import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, ShoppingBag, Heart, User, Shield, LogOut, Moon, Sun, Globe, Zap, Package, Cpu, Volume2, VolumeX, Crosshair, Check, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useGamer } from '../context/GamerContext';
import { soundFX, WEAPONS_LIST } from '../utils/soundFX';
import toast from 'react-hot-toast';
import './Header.css';

export default function Header({ isAdmin }) {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { level, rankBadge } = useGamer();
  const [soundOn, setSoundOn] = useState(() => soundFX.isEnabled());
  const [isWeaponMenuOpen, setIsWeaponMenuOpen] = useState(false);
  const [currentWeapon, setCurrentWeapon] = useState(() => soundFX.getWeapon());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const weaponMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (weaponMenuRef.current && !weaponMenuRef.current.contains(event.target)) {
        setIsWeaponMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleSound = (e) => {
    e.stopPropagation();
    const newState = soundFX.toggleSound();
    setSoundOn(newState);
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <div className="logo-icon-gaming">
            <Gamepad2 size={22} color="#00f0ff" />
          </div>
          <span className="logo-text">
            NEXUS<span className="logo-accent">GAMING</span>
          </span>
        </Link>
        
        {/* Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/products" className="nav-link">{t('nav.catalog')}</Link>
          <Link to="/builder" className="nav-link builder-nav-link">
            <Cpu size={15} color="#00f0ff" />
            <span>PC Builder</span>
            <span className="nav-builder-badge">PRO</span>
          </Link>
          <Link to="/game" className="nav-link reflex-link" title="Rush Mid CS2 Jangovar Arena (-15% Promokod)">
            <Crosshair size={15} className="text-neon" />
            <span>{t('nav.reflex')}</span>
            <span className="nav-promo-badge">-15%</span>
          </Link>
          <Link to="/favorites" className="nav-link" style={{ position: 'relative' }}>
            <Heart size={16} />
            <span>{t('nav.favorites')}</span>
            {favorites.length > 0 && (
              <span className="nav-count-badge">{favorites.length}</span>
            )}
          </Link>
          <Link to="/orders" className="nav-link">
            <Package size={16} />
            <span>{t('nav.orders')}</span>
          </Link>
        </nav>
        
        {/* Actions */}
        <div className="header-actions">
          {/* Weapon Sound Selector Container */}
          <div className="weapon-sound-container" ref={weaponMenuRef}>
            <button 
              className={`sound-toggle-btn ${isWeaponMenuOpen ? 'active' : ''} ${!soundOn ? 'muted' : ''}`}
              onClick={() => setIsWeaponMenuOpen(prev => !prev)}
              aria-label="Kiber-qurollar ovozi"
              title="Qurol ovozini almashtirish (AK-47, M4A1-S, AWP, Deagle...)"
            >
              {soundOn ? (
                <>
                  <Crosshair size={14} color="#00f0ff" />
                  <span className="weapon-active-label">
                    {WEAPONS_LIST.find(w => w.id === currentWeapon)?.name.split(' ')[0] || 'AK-47'}
                  </span>
                </>
              ) : (
                <>
                  <VolumeX size={15} color="#ef4444" />
                  <span className="weapon-active-label muted">OFF</span>
                </>
              )}
            </button>

            {/* Weapon Arsenal Dropdown */}
            {isWeaponMenuOpen && (
              <div className="weapon-dropdown-menu">
                <div className="weapon-dropdown-header">
                  <div className="weapon-header-title">
                    <Crosshair size={16} color="#00f0ff" />
                    <span>{t('arsenal.title')}</span>
                  </div>
                  <button 
                    type="button"
                    className={`weapon-mute-toggle ${soundOn ? 'sound-active' : 'sound-muted'}`}
                    onClick={handleToggleSound}
                    title={soundOn ? "Mute" : "Unmute"}
                  >
                    {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    <span>{soundOn ? t('arsenal.soundOn') : t('arsenal.soundOff')}</span>
                  </button>
                </div>

                <p className="weapon-dropdown-subtitle">
                  {t('arsenal.subtitle')}
                </p>

                <div className="weapons-grid-list">
                  {WEAPONS_LIST.map((weapon) => {
                    const isSelected = currentWeapon === weapon.id && soundOn;
                    return (
                      <div 
                        key={weapon.id} 
                        className={`weapon-card-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          soundFX.setWeapon(weapon.id);
                          setCurrentWeapon(weapon.id);
                          setSoundOn(true);
                          toast.success(`${t('arsenal.equippedToast')} ${weapon.name} 💥`, {
                            duration: 2000,
                            style: {
                              background: '#090d16',
                              color: weapon.color || '#00f0ff',
                              border: `1px solid ${weapon.color || '#00f0ff'}`,
                              fontWeight: 700
                            }
                          });
                        }}
                      >
                        <div className="weapon-card-top">
                          <div className="weapon-badge-name">
                            <span className="weapon-icon-dot" style={{ background: weapon.color }}></span>
                            <strong className="weapon-item-title">{weapon.name}</strong>
                          </div>
                          <span className="weapon-game-tag">{weapon.game}</span>
                        </div>

                        <div className="weapon-card-bottom">
                          <span className="weapon-desc-text">{weapon.desc}</span>
                          {isSelected ? (
                            <span className="weapon-equipped-badge">
                              <Check size={12} /> {t('arsenal.active')}
                            </span>
                          ) : (
                            <span className="weapon-select-hint">{t('arsenal.select')}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button 
            className="cart-btn"
            onClick={() => {
              soundFX.playClick();
              setIsCartOpen(true);
            }}
            aria-label="Savat"
            title={t('cart.title')}
          >
            <ShoppingBag size={18} />
            {totalItemsCount > 0 && (
              <span className="cart-count-badge animate-bounce">{totalItemsCount}</span>
            )}
          </button>

          {/* Language Switcher */}
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${lang === 'uz' ? 'active' : ''}`}
              onClick={() => { soundFX.playClick(); setLang('uz'); }}
            >
              UZ
            </button>
            <button 
              className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
              onClick={() => { soundFX.playClick(); setLang('ru'); }}
            >
              RU
            </button>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => { soundFX.playClick(); setLang('en'); }}
            >
              EN
            </button>
          </div>
          
          {/* Theme Toggle */}
          <button 
            className="theme-toggle" 
            onClick={() => { soundFX.playClick(); toggleTheme(); }}
            aria-label="Rejimni almashtirish"
            title={theme === 'dark' ? 'Kunduzgi rejim (Light)' : 'Tungi rejim (Dark)'}
          >
            {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6366f1" />}
          </button>
          
          {/* User Account / Profile */}
          <div className="profile-container" ref={dropdownRef}>
            {user ? (
              <button 
                className="profile-btn" 
                onClick={() => { soundFX.playClick(); setIsDropdownOpen(!isDropdownOpen); }}
                aria-label="Foydalanuvchi menyusi"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="profile-avatar" />
                ) : (
                  <div className="profile-avatar-placeholder">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'G'}
                  </div>
                )}
                <span className="profile-name">{user.displayName || 'Gamer'}</span>
                <span className="profile-lvl-tag">{rankBadge} Lvl {level}</span>
              </button>
            ) : (
              <div className="auth-btns">
                <Link to="/login" className="btn-signup">{t('nav.login')}</Link>
              </div>
            )}

            {isDropdownOpen && user && (
              <div className="profile-dropdown glass">
                <div className="dropdown-user-info">
                  <p className="user-name">{user.displayName || 'Gamer'}</p>
                  <p className="user-email">{user.email}</p>
                </div>
                <div className="dropdown-divider"></div>
                <Link 
                  to="/profile" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User size={15} />
                  <span>{t('nav.profile')}</span>
                </Link>
                <Link 
                  to="/orders" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Package size={15} />
                  <span>{t('nav.orders')}</span>
                </Link>
                {user.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="dropdown-item admin-link-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Shield size={15} />
                    <span>{t('nav.admin')}</span>
                    <span className="dropdown-badge-admin">Admin</span>
                  </Link>
                )}
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={15} />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
