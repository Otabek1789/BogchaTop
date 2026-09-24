import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import { categories, brands } from '../data/gamingData';
import { 
  Flame, 
  Sparkles, 
  Gamepad2, 
  Laptop, 
  Headphones, 
  Disc, 
  Monitor, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  RotateCcw,
  Sparkle,
  Crosshair,
  Target
} from 'lucide-react';
import './Home.css';

export default function Home() {
  const { products } = useProducts();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  // Best sellers
  const bestSellers = products.filter(p => p.bestseller).slice(0, 4);
  // Hot deals with discount
  const hotDeals = products.filter(p => p.oldPrice && p.oldPrice > p.price).slice(0, 4);

  const getCategoryName = (cat) => {
    if (lang === 'ru') return cat.nameRu || cat.nameUz;
    if (lang === 'en') return cat.nameEn || cat.nameUz;
    return cat.nameUz;
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop size={22} />;
      case 'Gamepad': return <Gamepad2 size={22} />;
      case 'Headphones': return <Headphones size={22} />;
      case 'Disc': return <Disc size={22} />;
      case 'Monitor': return <Monitor size={22} />;
      default: return <Gamepad2 size={22} />;
    }
  };

  return (
    <main className="gaming-home-page">
      {/* Hero Banner */}
      <Hero />

      {/* Categories Grid */}
      <section className="container categories-section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <Sparkles size={14} className="text-neon" /> {t('home.categories')}
            </span>
            <h2 className="section-title">{t('home.categoriesTitle')}</h2>
          </div>
          <Link to="/products" className="view-all-link">
            <span>{t('home.viewAll')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="categories-grid">
          {categories.filter(c => c.id !== 'all').map((cat) => (
            <div 
              key={cat.id} 
              className="category-card glass"
              onClick={() => navigate(`/products?category=${cat.id}`)}
            >
              <div className="category-icon-circle">
                {getCategoryIcon(cat.icon)}
              </div>
              <h3 className="category-name">{getCategoryName(cat)}</h3>
              <span className="category-browse">
                {t('home.viewAll')} <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / Best Sellers Section */}
      <section className="container products-showcase-section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <Flame size={14} color="#f59e0b" /> {t('home.bestsellers')}
            </span>
            <h2 className="section-title">{t('home.bestsellersTitle')}</h2>
          </div>
          <Link to="/products" className="view-all-link">
            <span>{t('home.viewAll')} ({products.length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Rush Mid CS2 Tactical Combat Promo Banner */}
      <section className="container game-promo-section">
        <div className="game-promo-banner glass">
          <div className="game-promo-content">
            <div className="promo-badge" style={{ background: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b', color: '#fbbf24' }}>
              <Crosshair size={14} /> CS2 TACTICAL SHOOTER
            </div>
            <h2 className="game-promo-title">
              {lang === 'ru' ? 'RUSH MID: УНИЧТОЖАЙТЕ БОТОВ И' : lang === 'en' ? 'RUSH MID: DOMINATE COMBAT & WIN' : 'RUSH MID: PISTIRMALARNI YORIB O\'TING VA'} <br />
              <span className="text-cyber">15% {lang === 'ru' ? 'СКИДКУ' : lang === 'en' ? 'DISCOUNT' : 'CHEGIRMA'}</span> {lang === 'ru' ? 'ВЫИГРЫВАЙТЕ!' : lang === 'en' ? 'NOW!' : 'YUTIB OLING!'}
            </h2>
            <p className="game-promo-desc">
              {lang === 'ru' 
                ? 'Реалистичный шутер в браузере! Выбирайте AK-47, AWP, M4A1-S или Deagle, делайте сочные Headshot-ы и получите промокод 15% на всю корзину.'
                : lang === 'en'
                ? 'High-stakes tactical browser shooter! Arm yourself with real AK-47, AWP, M4A1-S or Deagle sounds, land headshots and claim a 15% store coupon.'
                : "Haqiqiy jangovar CS2 otishmasi! AK-47, AWP, M4A1-S yoki Deagle qurollaridan foydalanib dushmanlarni boshidan (Headshot) nishonga oling va 15% lik eksklyuziv promokodni qo'lga kiriting."}
            </p>
            <div className="game-promo-actions">
              <button 
                className="btn btn-cyber"
                onClick={() => navigate('/game')}
              >
                <Flame size={18} /> {lang === 'ru' ? 'Rush Mid — Начать бой' : lang === 'en' ? 'Play Rush Mid' : 'Rush Mid — Jangni Boshlash'}
              </button>
              <span className="promo-guarantee">🎯 1,400+ {lang === 'ru' ? 'геймеров выиграли скидку' : lang === 'en' ? 'gamers won promo' : 'geymer chegirma yutib oldi'}</span>
            </div>
          </div>

          <div className="game-promo-visual">
            <div className="target-mockup pulse-glow" style={{ cursor: 'pointer' }} onClick={() => navigate('/game')}>
              <div className="inner-target">
                <Target size={34} color="#f59e0b" />
                <span style={{ color: '#fbbf24', fontWeight: 800 }}>HEADSHOT +50</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals & Discounts */}
      <section className="container products-showcase-section">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">
              <Sparkle size={14} color="#ef4444" /> {t('home.hotDeals')}
            </span>
            <h2 className="section-title">{t('home.hotDealsTitle')}</h2>
          </div>
          <Link to="/products" className="view-all-link">
            <span>{t('home.viewAll')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {hotDeals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Partners */}
      <section className="container brands-section">
        <div className="brands-title-wrap">
          <span className="section-eyebrow">{t('home.brands')}</span>
          <h3 className="brands-title">{t('home.brandsTitle')}</h3>
        </div>
        <div className="brands-scroll-wrap">
          <div className="brands-list">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="brand-pill glass"
                onClick={() => navigate(`/products?search=${encodeURIComponent(brand)}`)}
              >
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="container why-us-section">
        <div className="why-us-grid">
          <div className="why-card glass">
            <div className="why-icon-wrap" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff' }}>
              <ShieldCheck size={28} />
            </div>
            <h4>{lang === 'ru' ? '100% Оригинал и Официально' : lang === 'en' ? '100% Genuine & Official' : '100% Rasmiy va Original'}</h4>
            <p>{lang === 'ru' ? 'Каждая консоль, ноутбук и девайс имеют официальную заводскую гарантию и серийный номер.' : lang === 'en' ? 'Every console, rig and peripheral carries official manufacturer warranty with authentic serials.' : 'Har bir konsol, noutbuk va qurilma zavod muhri va seriya raqami bilan rasmiy kafolatlanadi.'}</p>
          </div>

          <div className="why-card glass">
            <div className="why-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Trophy size={28} />
            </div>
            <h4>{lang === 'ru' ? 'Киберспортивный класс' : lang === 'en' ? 'Esports Grade Hardware' : 'Kiber-Sport Sifati'}</h4>
            <p>{lang === 'ru' ? 'Клавиатуры, оптические сенсоры и экраны соответствуют мировым турнирным стандартам.' : lang === 'en' ? 'Keyboards, sensors and high-refresh displays built for professional esports competition.' : 'Klaviaturalar, sensorlar va monitorlar professional E-Sport standartlariga to\'liq javob beradi.'}</p>
          </div>

          <div className="why-card glass">
            <div className="why-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <RotateCcw size={28} />
            </div>
            <h4>{lang === 'ru' ? '14 Дней на Обмен' : lang === 'en' ? '14-Day Easy Exchange' : '14 Kunlik Qaytarish'}</h4>
            <p>{lang === 'ru' ? 'Если товар вам не подошел, мы без проблем заменим его в течение 14 дней.' : lang === 'en' ? 'If gear doesn\'t suit your setup, exchange it hassle-free within 14 days.' : 'Agar mahsulot sizga ma\'qul kelmasa yoki mos kelmasa, 14 kun ichida almashtirib beramiz.'}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
