import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Check, Zap } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart, cartItems } = useCart();
  const { t } = useLanguage();

  const isFav = favorites.includes(product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Extract first 2 specs for quick preview
  const quickSpecs = product.specs 
    ? Object.entries(product.specs).slice(0, 2)
    : [];

  return (
    <div className="product-card card">
      {/* Badges & Wishlist */}
      <div className="product-card-top">
        <div className="badges-group">
          {product.badge && (
            <span className={`card-badge ${product.badge.includes('HOT') ? 'badge-hot' : product.badge.includes('ESPORTS') || product.badge.includes('FLAGSHIP') ? 'badge-neon' : 'badge-brand'}`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="card-badge badge-sale">-{discountPercent}%</span>
          )}
        </div>

        <button 
          className={`wishlist-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label="Sevimlilarga qo'shish"
          title={isFav ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
        >
          <Heart size={18} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : 'currentColor'} />
        </button>
      </div>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="product-img-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img" 
          loading="lazy"
        />
        <div className="img-glow-overlay"></div>
      </Link>

      {/* Card Body */}
      <div className="product-card-body">
        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          <div className="product-rating">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{product.rating || 5.0}</span>
            <span className="reviews-cnt">({product.reviewsCount || 0})</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title" title={product.name}>{product.name}</h3>
        </Link>

        {/* Quick specs pill tags */}
        {quickSpecs.length > 0 && (
          <div className="quick-specs">
            {quickSpecs.map(([key, val], idx) => (
              <span key={idx} className="spec-pill" title={`${key}: ${val}`}>
                <Zap size={11} className="text-neon" />
                <span className="spec-val">{val}</span>
              </span>
            ))}
          </div>
        )}

        {/* Stock & Guarantee */}
        <div className="stock-info">
          {product.stock > 0 ? (
            <span className="in-stock">
              <span className="stock-dot"></span> {t('misc.inStock')} ({product.stock})
            </span>
          ) : (
            <span className="out-of-stock">
              <span className="stock-dot-red"></span> {t('misc.outOfStock')}
            </span>
          )}
        </div>

        {/* Footer: Price and Add To Cart */}
        <div className="product-card-footer">
          <div className="price-wrap">
            <div className="current-price">{formatPrice(product.price)}</div>
            {product.oldPrice && (
              <div className="old-price">{formatPrice(product.oldPrice)}</div>
            )}
          </div>

          <button 
            className={`add-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            title={isInCart ? "Savatga yana qo'shish" : "Savatga qo'shish"}
          >
            {isInCart ? <Check size={18} /> : <ShoppingBag size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
