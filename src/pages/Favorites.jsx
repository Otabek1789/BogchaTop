import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { useKindergartens } from '../context/KindergartenContext';
import KindergartenCard from '../components/KindergartenCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const { data: kindergartens } = useKindergartens();

  const favoriteKindergartens = kindergartens.filter(kg => favorites.includes(kg.id));

  return (
    <div className="animate-fade-in-up">
      <section style={{ padding: '80px 0', background: 'var(--brand-gradient)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h1 className="text-display" style={{ marginBottom: '24px' }}>
            {t('favorites.pageTitle')}
          </h1>
          <p className="text-body-lg" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto' }}>
            {t('favorites.pageSubtitle')}
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 1.5rem' }}>
        {favoriteKindergartens.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {favoriteKindergartens.map(kg => (
              <KindergartenCard key={kg.id} data={kg} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Heart size={64} color="var(--neutral-300)" style={{ margin: '0 auto 24px auto' }} />
            <h2 className="text-h2" style={{ marginBottom: '16px', color: 'var(--neutral-700)' }}>
              {t('favorites.emptyTitle')}
            </h2>
            <p className="text-body-lg" style={{ color: 'var(--neutral-500)', marginBottom: '32px' }}>
              {t('favorites.emptyDesc')}
            </p>
            <Link to="/kindergartens" className="btn btn-primary">
              {t('favorites.viewKindergartens')}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
