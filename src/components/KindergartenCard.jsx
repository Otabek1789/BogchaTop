import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, CheckCircle2, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { 
  getLocalizedLanguages, 
  getLocalizedFeatures, 
  getLocalizedAddress, 
  getLocalizedPrice 
} from '../utils/kindergartenLocalization';
import './KindergartenCard.css';

export default function KindergartenCard({ data }) {
  const { t, lang } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(data.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(data.id);
  };

  return (
    <Link to={`/bogcha/${data.id}`} className="card kg-card animate-fade-in-up" style={{ position: 'relative' }}>
      <button 
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Heart size={20} fill={favorite ? '#EF4444' : 'none'} color={favorite ? '#EF4444' : '#64748B'} />
      </button>

      <div className="kg-card-img-wrapper">
        <img 
          src={data.image} 
          alt={data.name} 
          className="kg-card-img" 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/happy-kids-academy.jpg';
          }}
        />
        <div className="kg-card-badge">{t('detail.verifiedBadge')}</div>
      </div>
      
      <div className="kg-card-content">
        <div className="kg-card-header">
          <h3 className="text-h3">{data.name}</h3>
          <div className="kg-rating">
            <Star size={16} fill="var(--accent-500)" color="var(--accent-500)" />
            <span className="rating-val">{data.rating}</span>
            <span className="rating-count">({data.reviews})</span>
          </div>
        </div>
        
        <div className="kg-info-row">
          <MapPin size={16} color="var(--neutral-500)" />
          <span>{getLocalizedAddress(data, lang)}</span>
        </div>
        
        <div className="kg-features">
          {getLocalizedFeatures(data, lang).slice(0, 3).map((feature, i) => (
            <span key={i} className="feature-tag">
              <CheckCircle2 size={12} color="var(--brand-500)" />
              {feature}
            </span>
          ))}
        </div>
        
        <div className="kg-card-footer">
          <div className="kg-price">
            <span className="price-val">{getLocalizedPrice(data, lang)}</span>
          </div>
          <div className="kg-languages">
            <Users size={16} color="var(--neutral-500)" />
            <span>{getLocalizedLanguages(data, lang).join(", ")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
