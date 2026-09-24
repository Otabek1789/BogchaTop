import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Phone, Mail, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t, lang } = useLanguage();

  const getAddress = () => {
    if (lang === 'ru') return 'г. Ташкент, ул. Навои, 28';
    if (lang === 'en') return 'Tashkent, Navoiy street, 28';
    return "Toshkent sh., Navoiy ko'chasi, 28-uy";
  };

  return (
    <footer className="gaming-footer">
      <div className="container footer-container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <div className="logo-icon-gaming">
                <Gamepad2 size={22} color="#00f0ff" />
              </div>
              <span className="logo-text">
                NEXUS<span className="logo-accent">GAMING</span>
              </span>
            </Link>
            <p className="footer-desc">
              {t('footer.desc')}
            </p>
            <div className="footer-contacts">
              <div className="contact-row">
                <Phone size={16} className="text-neon" />
                <span>+998 (71) 200-45-45</span>
              </div>
              <div className="contact-row">
                <Mail size={16} className="text-neon" />
                <span>support@nexusgaming.uz</span>
              </div>
              <div className="contact-row">
                <MapPin size={16} className="text-neon" />
                <span>{getAddress()}</span>
              </div>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.catalog')}</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=pc_laptops">{t('footer.pcLaptops')}</Link></li>
              <li><Link to="/products?category=consoles">{t('footer.consoles')}</Link></li>
              <li><Link to="/products?category=peripherals">{t('footer.peripherals')}</Link></li>
              <li><Link to="/products?category=games">{t('footer.games')}</Link></li>
              <li><Link to="/products?category=monitors">{t('footer.monitors')}</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.useful')}</h4>
            <ul className="footer-links">
              <li><Link to="/game">{t('nav.reflex')} (-15%)</Link></li>
              <li><Link to="/favorites">{t('nav.favorites')}</Link></li>
              <li><Link to="/orders">{t('nav.orders')}</Link></li>
              <li><Link to="/admin">{t('nav.admin')}</Link></li>
              <li><Link to="/contact">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">{t('footer.newsletterTitle')}</h4>
            <p className="newsletter-desc">
              {t('footer.newsletterDesc')}
            </p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert(t('footer.subscribedMsg')); }}>
              <input type="email" placeholder={t('footer.emailPlaceholder')} required />
              <button type="submit" className="newsletter-btn">
                <Send size={16} />
              </button>
            </form>
            <div className="payment-badges-row">
              <span className="pay-badge">CLICK</span>
              <span className="pay-badge">PAYME</span>
              <span className="pay-badge">UZCARD</span>
              <span className="pay-badge">HUMO</span>
              <span className="pay-badge">VISA</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="footer-bottom-links">
            <Link to="/contact">{t('footer.privacy')}</Link>
            <Link to="/contact">{t('footer.terms')}</Link>
            <span className="made-with">{t('footer.madeWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
