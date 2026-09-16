import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, ArrowRight, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { districts } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useKindergartens } from '../context/KindergartenContext';
import CustomSelect from './CustomSelect';
import './Hero.css';

export default function Hero({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [liveResults, setLiveResults] = useState([]);
  const dropdownRef = useRef(null);
  const searchBoxRef = useRef(null);
  const { t, lang } = useLanguage();
  const { data: kindergartens } = useKindergartens();

  // Live search logic
  useEffect(() => {
    if (!searchTerm.trim() && !district) {
      setShowDropdown(false);
      setLiveResults([]);
      if (onSearch) onSearch({ searchTerm: '', district: '' });
      return;
    }

    let result = kindergartens;
    if (searchTerm.trim()) {
      result = result.filter(k => k.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (district) {
      result = result.filter(k => k.district === district);
    }

    setLiveResults(result);
    setShowDropdown(true);
    if (onSearch) onSearch({ searchTerm, district });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, district, kindergartens]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDistrict('');
    setShowDropdown(false);
    if (onSearch) onSearch({ searchTerm: '', district: '' });
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <span className="location-badge">
            <span className="dot"></span> {t('hero.location')}
          </span>
          <h1 className="text-display hero-title">
            {t('hero.title')}
          </h1>
          <p className="text-body-lg hero-subtitle">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="hero-search-wrapper" ref={searchBoxRef}>
          <form className="hero-search-box animate-fade-in-up delay-100" onSubmit={handleSubmit}>
            <div className="search-field search-input-field">
              <Search size={20} color="var(--neutral-500)" />
              <input 
                type="text" 
                placeholder={t('hero.searchPlaceholder')} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim() || district) setShowDropdown(true);
                }}
              />
              {searchTerm && (
                <button 
                  type="button" 
                  className="search-clear-btn"
                  onClick={clearSearch}
                  title="Tozalash"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="divider"></div>
            
            <div className="search-field select-field" style={{ flex: 1, paddingRight: '20px' }}>
              <MapPin size={20} color="var(--neutral-500)" style={{ flexShrink: 0 }} />
              <CustomSelect 
                variant="hero"
                value={district} 
                onChange={setDistrict}
                options={[
                  { value: "", label: t('hero.allDistricts') },
                  ...districts.map(d => ({ value: d, label: d }))
                ]}
              />
            </div>
            
            <button type="submit" className="search-submit" title={t('hero.searchBtn')}>
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Live Search Dropdown */}
          {showDropdown && (searchTerm.trim() || district) && (
            <div className="search-dropdown animate-fade-in-up" ref={dropdownRef}>
              <div className="search-dropdown-header">
                <span className="search-dropdown-count">
                  {liveResults.length} {t('heroExtra.resultsFound')}
                </span>
                {liveResults.length > 5 && (
                  <span className="search-dropdown-hint">
                    {t('heroExtra.first5Shown')}
                  </span>
                )}
              </div>
              
              {liveResults.length > 0 ? (
                <div className="search-dropdown-list">
                  {liveResults.slice(0, 5).map((kg) => (
                    <Link 
                      key={kg.id} 
                      to={`/bogcha/${kg.id}`} 
                      className="search-dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      <img 
                        src={kg.image} 
                        alt={kg.name} 
                        className="search-dropdown-img" 
                      />
                      <div className="search-dropdown-info">
                        <div className="search-dropdown-name">{kg.name}</div>
                        <div className="search-dropdown-address">
                          <MapPin size={12} />
                          {kg.address[lang] || kg.address['uz']}
                        </div>
                      </div>
                      <div className="search-dropdown-meta">
                        <div className="search-dropdown-rating">
                          <Star size={14} fill="var(--accent-500)" color="var(--accent-500)" />
                          <span>{kg.rating}</span>
                        </div>
                        <div className="search-dropdown-price">{kg.price[lang] || kg.price['uz']}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="search-dropdown-empty">
                  <Search size={24} color="var(--neutral-300)" />
                  <span>{t('heroExtra.nothingFound')}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="hero-stats animate-fade-in-up delay-200">
          <div className="stat-item">
            <strong>50+</strong> {t('header.kindergartens')}
          </div>
          <span className="dot-sep">·</span>
          <div className="stat-item">
            <strong>100%</strong> {t('hero.freeService')}
          </div>
          <span className="dot-sep">·</span>
          <div className="stat-item">
            <strong>12</strong> {t('hero.districts')}
          </div>
        </div>
      </div>
    </section>
  );
}

