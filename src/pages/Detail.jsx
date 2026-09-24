import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Check, 
  Share2, 
  MessageSquare,
  Sparkles,
  Send
} from 'lucide-react';

const TELEGRAM_BOT_TOKEN = '8682232515:AAE_r0XFh0SyhJ7ec3w0JItfAgJCAB8OL-4';
const TELEGRAM_CHAT_ID = '7373118052';
import { useProducts } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, reviews, addReview } = useProducts();
  const { t } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const product = products.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState(user?.displayName || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const [quickPhone, setQuickPhone] = useState('+998 ');

  if (!product) {
    return (
      <div className="container not-found-wrap">
        <h2>{t('catalog.emptyTitle')}</h2>
        <p>{t('catalog.emptyDesc')}</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          {t('product.back')}
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(product.id);
  const productReviews = reviews[product.id] || [];
  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error("Iltimos, fikringizni yozing");
      return;
    }
    addReview(product.id, {
      user: reviewName.trim() || 'Gamer',
      rating: reviewRating,
      comment: reviewComment.trim()
    });
    setReviewComment('');
    toast.success("Sharhingiz muvaffaqiyatli qo'shildi! Rahmat! 🎮");
  };

  const handleQuickBuy = (e) => {
    e.preventDefault();
    if (quickPhone.length < 9) {
      toast.error("Iltimos, to'liq telefon raqamingizni kiriting");
      return;
    }
    toast.success("Tezkor xarid arizangiz qabul qilindi! Operatorimiz 5 daqiqada bog'lanadi.");
    setIsQuickBuyOpen(false);
  };

  const handleTelegramOrder = async () => {
    const priceFormatted = new Intl.NumberFormat('uz-UZ').format(product.price) + " so'm";
    const caption = [
      `🛒 *Yangi buyurtma!*`,
      ``,
      `📦 *Tovar:* ${product.name}`,
      `🏷️ *Brend:* ${product.brand}`,
      `💰 *Narxi:* ${priceFormatted}`,
      product.oldPrice ? `~~${new Intl.NumberFormat('uz-UZ').format(product.oldPrice)} so'm~~` : null,
      product.stock > 0 ? `✅ *Mavjud:* ${product.stock} dona` : `❌ Mavjud emas`,
      ``,
      `📝 *Tavsif:* ${product.description || 'Malumot yo\'q'}`,
      ``,
      `🌐 *Sayt:* BogchaTop Gaming Store`,
    ].filter(Boolean).join('\n');

    try {
      const imageUrl = gallery[activeImageIndex] || product.image;
      // Try sending with photo first
      const photoRes = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            photo: imageUrl,
            caption,
            parse_mode: 'Markdown',
          }),
        }
      );
      const photoData = await photoRes.json();

      if (!photoData.ok) {
        // Fallback: send as text message if photo fails
        await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: caption + `\n🖼️ Rasm: ${imageUrl}`,
              parse_mode: 'Markdown',
            }),
          }
        );
      }

      toast.success('✅ Tovar ma\'lumoti Telegramga yuborildi!');
    } catch (err) {
      toast.error('Telegramga yuborishda xato yuz berdi');
      console.error(err);
    }
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="detail-page container">
      {/* Back button */}
      <div className="detail-nav-bar">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>{t('product.back')}</span>
        </button>
        <div className="breadcrumb">
          <Link to="/">{t('nav.home')}</Link> / <Link to="/products">{t('nav.catalog')}</Link> / <span>{product.name}</span>
        </div>
      </div>

      {/* Main Product Info Grid */}
      <div className="detail-main-grid">
        {/* Gallery */}
        <div className="detail-gallery-wrap">
          <div className="main-image-box glass">
            <img 
              src={gallery[activeImageIndex] || product.image} 
              alt={product.name}
              className="main-img" 
            />
            {product.badge && (
              <span className="detail-badge badge-neon">{product.badge}</span>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="thumbnails-row">
              {gallery.map((img, idx) => (
                <div 
                  key={idx}
                  className={`thumb-box ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Preview ${idx}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info */}
        <div className="detail-info-wrap">
          <div className="detail-brand-row">
            <span className="detail-brand">{product.brand}</span>
            <div className="detail-rating">
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <span>{product.rating || 5.0}</span>
              <span className="rating-cnt">({productReviews.length + (product.reviewsCount || 0)} {t('product.reviews')})</span>
            </div>
          </div>

          <h1 className="detail-title">{product.name}</h1>

          {/* Price Row */}
          <div className="detail-price-box">
            <div className="price-main">{formatPrice(product.price)}</div>
            {product.oldPrice && (
              <div className="price-old">{formatPrice(product.oldPrice)}</div>
            )}
            {discountPercent > 0 && (
              <span className="discount-tag">-{discountPercent}% OFF</span>
            )}
          </div>

          {/* Stock */}
          <div className="detail-stock-row">
            {product.stock > 0 ? (
              <span className="stock-badge in">
                <Check size={14} /> {t('product.inStock')} ({product.stock})
              </span>
            ) : (
              <span className="stock-badge out">
                {t('product.outOfStock')}
              </span>
            )}
          </div>

          <p className="detail-desc">{product.description}</p>

          {/* Action Row */}
          <div className="detail-actions-box">
            <div className="qty-selector">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                -
              </button>
              <span className="qty-number">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>

            <button 
              className="btn btn-cyber add-cart-large"
              onClick={() => {
                addToCart(product, quantity);
                setIsCartOpen(true);
              }}
            >
              <ShoppingBag size={20} />
              <span>{t('product.addToCart')}</span>
            </button>

            <button 
              className={`detail-fav-btn ${isFav ? 'active' : ''}`}
              onClick={() => toggleFavorite(product.id)}
              title={t('nav.favorites')}
            >
              <Heart size={20} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : 'currentColor'} />
            </button>
          </div>

          {/* Quick Buy One Click + Telegram */}
          <div className="quick-buy-box">
            <button 
              className="btn btn-outline quick-buy-trigger"
              onClick={() => setIsQuickBuyOpen(true)}
            >
              <Zap size={18} color="#00f0ff" />
              <span>{t('product.buyNow')}</span>
            </button>

            <button
              className="btn btn-telegram"
              onClick={handleTelegramOrder}
              title="Telegramda buyurtma qilish"
            >
              <Send size={18} />
              <span>Telegramda buyurtma</span>
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="detail-benefits-grid">
            <div className="benefit-item glass">
              <ShieldCheck size={20} color="#10b981" />
              <div>
                <strong>{t('product.warranty')}</strong>
                <small>{t('product.genuine')}</small>
              </div>
            </div>
            <div className="benefit-item glass">
              <Truck size={20} color="#00f0ff" />
              <div>
                <strong>{t('product.delivery')}</strong>
                <small>{t('product.support')}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Reviews Tabs */}
      <div className="detail-tabs-section">
        <div className="specs-card glass">
          <h3 className="section-tab-title">
            <Zap size={20} className="text-neon" />
            <span>{t('product.specs')}</span>
          </h3>

          {product.specs ? (
            <div className="specs-table">
              {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                <div key={idx} className="spec-row">
                  <span className="spec-name">{specKey}</span>
                  <span className="spec-value">{specVal}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-specs">Standart komplektatsiya.</p>
          )}
        </div>

        {/* Customer Reviews Box */}
        <div className="reviews-card glass">
          <h3 className="section-tab-title">
            <MessageSquare size={20} className="text-neon" />
            <span>{t('product.reviews')} ({productReviews.length})</span>
          </h3>

          {/* Review submission form */}
          <form className="add-review-form" onSubmit={handleReviewSubmit}>
            <div className="review-inputs-row">
              <input 
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder={t('product.yourName')}
              />
              <div className="star-select">
                <span>Bahoyingiz:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="star-btn"
                    onClick={() => setReviewRating(star)}
                  >
                    <Star 
                      size={18} 
                      fill={star <= reviewRating ? '#fbbf24' : 'none'} 
                      color={star <= reviewRating ? '#fbbf24' : '#64748b'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea 
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder={t('product.yourReview')}
              required
            />

            <button type="submit" className="btn btn-primary review-submit-btn">
              {t('product.sendReview')}
            </button>
          </form>

          {/* Reviews list */}
          <div className="reviews-list">
            {productReviews.length > 0 ? (
              productReviews.map((rev) => (
                <div key={rev.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {rev.user ? rev.user.charAt(0).toUpperCase() : 'G'}
                      </div>
                      <div>
                        <strong className="reviewer-name">{rev.user}</strong>
                        <div className="review-date">{rev.date}</div>
                      </div>
                    </div>
                    <div className="review-stars">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="no-reviews">Bu tovar uchun hali sharh qoldirilmagan.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2 className="related-title">{t('product.related')}</h2>
          <div className="products-grid">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Quick Buy Modal */}
      {isQuickBuyOpen && (
        <div className="modal-backdrop" onClick={() => setIsQuickBuyOpen(false)}>
          <div className="quick-modal glass" onClick={e => e.stopPropagation()}>
            <h3>Tezkor 1-klikda buyurtma</h3>
            <p className="quick-modal-desc">
              <strong>{product.name}</strong> uchun telefon raqamingizni qoldiring, 5 daqiqada bog'lanamiz:
            </p>
            <form onSubmit={handleQuickBuy}>
              <input 
                type="tel" 
                value={quickPhone}
                onChange={e => setQuickPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                required
              />
              <div className="modal-actions">
                <button type="submit" className="btn btn-cyber">
                  Arizani yuborish
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setIsQuickBuyOpen(false)}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
