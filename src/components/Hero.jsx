import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flame, Zap, Shield, Truck, Headphones, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

export default function Hero() {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <section className="gaming-hero">
      {/* Background Glows */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          {/* Eyebrow badge */}
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span className="badge-text">{t('hero.badge')}</span>
            <Flame size={16} color="#f59e0b" />
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            {t('hero.title1')} <br />
            <span className="text-cyber">{t('hero.title2')}</span> {t('hero.title3')}
          </h1>

          <p className="hero-desc">
            {t('hero.desc')}
          </p>

          {/* Search Form */}
          <form className="hero-search-form" onSubmit={handleSearch}>
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
              />
            </div>
            <button type="submit" className="btn btn-cyber hero-search-btn">
              <span>{t('hero.searchBtn')}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick tags */}
          <div className="hero-quick-tags">
            <span className="tags-label">{t('hero.popular')}</span>
            {['PlayStation 5 Pro', 'RTX 4090 PC', 'Razer Viper V3', 'Black Myth: Wukong', 'OLED G9'].map((tag, idx) => (
              <button 
                key={idx} 
                className="tag-pill"
                onClick={() => navigate(`/products?search=${encodeURIComponent(tag)}`)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button 
              className="btn btn-primary cta-btn"
              onClick={() => navigate('/products')}
            >
              <span>{t('hero.catalogBtn')}</span>
              <ArrowRight size={18} />
            </button>
            <button 
              className="btn btn-outline cta-btn reflex-cta"
              onClick={() => navigate('/game')}
            >
              <Zap size={18} color="currentColor" />
              <span>{t('hero.reflexBtn')}</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Card Showcase */}
        <div className="hero-visual">
          <div className="visual-card-main glass">
            <div className="featured-tag">
              <Zap size={14} />
              <span>{t('hero.weekHit')}</span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80" 
              alt="PlayStation 5 Pro"
              className="visual-img"
            />
            <div className="visual-info">
              <span className="visual-brand">SONY PLAYSTATION</span>
              <h3 className="visual-title">PlayStation 5 Pro 2TB Digital Edition</h3>
              <div className="visual-price-row">
                <span className="visual-price">9,800,000 so'm</span>
                <span className="visual-discount">{t('hero.discountTag')}</span>
              </div>
              <button 
                className="btn btn-cyber visual-btn"
                onClick={() => navigate('/product/prod-1')}
              >
                {t('hero.viewDetails')}
              </button>
            </div>
          </div>

          {/* Floating mini stats badges */}
          <div className="floating-badge badge-1 glass">
            <Shield size={18} color="#10b981" />
            <div>
              <strong>{t('hero.warrantyTag')}</strong>
              <small>{t('hero.fullWarranty')}</small>
            </div>
          </div>

          <div className="floating-badge badge-2 glass">
            <Truck size={18} color="#00f0ff" />
            <div>
              <strong>{t('hero.courier')}</strong>
              <small>{t('hero.nationwide')}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Strip */}
      <div className="container">
        <div className="hero-features-strip glass">
          <div className="feature-item">
            <div className="feature-icon-wrap">
              <Truck size={22} color="#00f0ff" />
            </div>
            <div>
              <h4>{t('hero.fastDelivery')}</h4>
              <p>{t('hero.fastDeliveryDesc')}</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrap">
              <Shield size={22} color="#10b981" />
            </div>
            <div>
              <h4>{t('hero.originalQuality')}</h4>
              <p>{t('hero.originalQualityDesc')}</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrap">
              <Zap size={22} color="#8b5cf6" />
            </div>
            <div>
              <h4>{t('hero.esports')}</h4>
              <p>{t('hero.esportsDesc')}</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrap">
              <Headphones size={22} color="#ec4899" />
            </div>
            <div>
              <h4>{t('hero.aiSupport')}</h4>
              <p>{t('hero.aiSupportDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
