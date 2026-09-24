import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function Favorites() {
  const { favorites } = useFavorites();
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const handleAddAllToCart = () => {
    favoriteProducts.forEach(prod => {
      addToCart(prod, 1);
    });
    setIsCartOpen(true);
    toast.success(t('favorites.addedAllToast', "Barcha sevimlilar savatga qo'shildi! 🎮"));
  };

  return (
    <div className="container" style={{ padding: '40px 1.5rem 80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="text-h1" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)' }}>
            {t('favorites.title')}
          </h1>
          <p style={{ color: 'var(--neutral-400)', marginTop: '4px' }}>
            {t('favorites.subtitle')} ({favoriteProducts.length} {t('catalog.items', 'ta tovar')})
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <button 
            className="btn btn-cyber"
            onClick={handleAddAllToCart}
          >
            <ShoppingBag size={18} />
            <span>{t('favorites.addAll')}</span>
          </button>
        )}
      </div>

      {favoriteProducts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="glass" style={{ textAlign: 'center', padding: '80px 24px', borderRadius: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Heart size={40} />
          </div>
          <h2 style={{ color: 'var(--neutral-900)', fontSize: '1.6rem', marginBottom: '10px' }}>
            {t('favorites.emptyTitle')}
          </h2>
          <p style={{ color: 'var(--neutral-400)', maxWidth: '420px', margin: '0 auto 24px' }}>
            {t('favorites.emptyDesc')}
          </p>
          <Link to="/products" className="btn btn-primary">
            <span>{t('favorites.explore')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
