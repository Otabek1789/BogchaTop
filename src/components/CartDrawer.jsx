import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useGamer } from '../context/GamerContext';
import { soundFX } from '../utils/soundFX';
import toast from 'react-hot-toast';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    promoCode,
    applyPromoCode,
    discountPercent,
    subtotal,
    discountAmount,
    finalTotal
  } = useCart();

  const { addOrder } = useProducts();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { level, rankTitle, rankBadge, discountPercent: gamerDiscount, addXP, unlockBadge } = useGamer();
  const navigate = useNavigate();

  const [promoInput, setPromoInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Effective discount considering promo code or Gamer Loyalty discount
  const effectiveDiscount = Math.max(discountPercent, gamerDiscount);
  const effectiveDiscountAmount = Math.round((subtotal * effectiveDiscount) / 100);
  const effectiveTotal = subtotal - effectiveDiscountAmount;

  // Form states
  const [name, setName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Click');
  const [notes, setNotes] = useState('');

  if (!isCartOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    soundFX.playClick();
    applyPromoCode(promoInput);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Iltimos, ismingizni kiriting");
      return;
    }
    if (phone.length < 9) {
      toast.error("Iltimos, to'liq telefon raqamingizni kiriting");
      return;
    }
    if (!address.trim()) {
      toast.error("Yetkazib berish manzilini kiriting");
      return;
    }

    soundFX.playPowerUp();

    const newOrder = addOrder({
      customerName: name,
      customerPhone: phone,
      customerEmail: user?.email || `${name.toLowerCase().replace(/\s+/g, '_')}@client.uz`,
      address,
      items: cartItems,
      totalAmount: effectiveTotal,
      paymentMethod,
      notes: notes || 'Tez yetkazish'
    });

    addXP(300, "Xarid buyurtmasi");
    unlockBadge('first_order');

    clearCart();
    setOrderSuccess(newOrder);
    setIsCheckingOut(false);
    toast.success(`Buyurtma qabul qilindi! ID: ${newOrder.id} (+300 XP) 🎉`);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer glass" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-group">
            <ShoppingBag size={22} className="text-neon" />
            <h2 className="cart-title">
              {orderSuccess ? t('cart.orderSuccessTitle') : t('cart.title')}
            </h2>
            {!orderSuccess && <span className="cart-badge-count">{cartItems.length}</span>}
          </div>
          <button 
            className="cart-close-btn" 
            onClick={() => {
              if (orderSuccess) setOrderSuccess(null);
              setIsCartOpen(false);
            }}
            aria-label="Yopish"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Screen */}
        {orderSuccess ? (
          <div className="order-success-screen">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} color="#10b981" />
            </div>

            <div className="success-xp-badge">
              <Sparkles size={14} color="#fbbf24" />
              <span>+300 XP Berildi!</span>
            </div>

            <h3 className="success-title">{t('cart.orderSuccessTitle')}</h3>

            <div className="order-id-box">
              <span className="order-id-label">{t('cart.orderNumber')}</span>
              <strong className="order-id-code">{orderSuccess.id}</strong>
            </div>

            <p className="order-desc">
              {t('cart.orderContactPrompt')} <br />
              <strong className="order-phone-highlight">({orderSuccess.customerPhone})</strong>
            </p>
            
            <div className="order-success-actions">
              <button 
                className="btn btn-primary order-action-btn"
                onClick={() => {
                  setOrderSuccess(null);
                  setIsCartOpen(false);
                  navigate('/orders');
                }}
              >
                {t('cart.myOrdersBtn')}
              </button>
              <button 
                className="btn btn-outline order-action-btn secondary"
                onClick={() => {
                  setOrderSuccess(null);
                  setIsCartOpen(false);
                  navigate('/products');
                }}
              >
                {t('cart.continueShoppingBtn')}
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="cart-empty">
            <div className="empty-icon-wrap">
              <ShoppingBag size={48} />
            </div>
            <h3>{t('cart.emptyTitle')}</h3>
            <p>{t('cart.emptyDesc')}</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/products');
              }}
            >
              {t('cart.explore')}
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout Form */
          <form className="checkout-form" onSubmit={handleSubmitOrder}>
            <div className="checkout-header">
              <button 
                type="button" 
                className="back-to-cart-btn"
                onClick={() => setIsCheckingOut(false)}
              >
                {t('cart.back')}
              </button>
              <h3>{t('cart.checkoutTitle')}</h3>
            </div>

            <div className="checkout-inputs">
              <div className="form-group">
                <label>{t('cart.fullName')}</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sardor Aliyev"
                  required
                />
              </div>

              <div className="form-group">
                <label>{t('cart.phone')}</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  required
                />
              </div>

              <div className="form-group">
                <label>{t('cart.deliveryAddress')}</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Toshkent, Chilonzor 9"
                  required
                />
              </div>

              <div className="form-group">
                <label>{t('cart.paymentType')}</label>
                <div className="payment-options">
                  {['Click', 'Payme', 'Cash / Card (Courier)'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      className={`payment-chip ${paymentMethod === method ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>{t('cart.orderNotes')}</label>
                <textarea 
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="..."
                />
              </div>
            </div>

            <div className="checkout-summary-box">
              <div className="checkout-sum-row">
                <span>{t('cart.items')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {effectiveDiscount > 0 && (
                <div className="checkout-sum-row discount">
                  <span>
                    {gamerDiscount > discountPercent
                      ? `${rankBadge} Gamer Lvl ${level} (${effectiveDiscount}%):`
                      : `${t('cart.discount')} (${effectiveDiscount}%):`}
                  </span>
                  <span>-{formatPrice(effectiveDiscountAmount)}</span>
                </div>
              )}
              <div className="checkout-sum-row total">
                <span>{t('cart.total')}</span>
                <span className="total-val">{formatPrice(effectiveTotal)}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-cyber submit-order-btn">
              {t('cart.confirmOrder')} ({formatPrice(effectiveTotal)})
            </button>
          </form>
        ) : (
          /* Normal Cart List */
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-info">
                    <span className="cart-item-brand">{item.brand}</span>
                    <h4 className="cart-item-title">{item.name}</h4>
                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                  </div>

                  <div className="cart-item-actions">
                    <button 
                      className="trash-btn"
                      onClick={() => {
                        soundFX.playClick(500);
                        removeFromCart(item.id);
                      }}
                      title="O'chirish"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="qty-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => {
                          soundFX.playClick(900);
                          updateQuantity(item.id, item.quantity - 1);
                        }}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => {
                          soundFX.playClick(1100);
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo code & Summary Footer */}
            <div className="cart-footer">
              {/* Promo input */}
              <form className="promo-form" onSubmit={handleApplyPromo}>
                <div className="promo-input-wrap">
                  <Tag size={16} className="promo-icon" />
                  <input 
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder={t('cart.promoPlaceholder')}
                  />
                  <button type="submit" className="promo-apply-btn">{t('cart.apply')}</button>
                </div>
              </form>

              {promoCode && (
                <div className="promo-applied-badge">
                  <Tag size={14} />
                  <span>Promokod {promoCode}: <strong>{discountPercent}% chegirma</strong> qo'llandi!</span>
                </div>
              )}

              {gamerDiscount > 0 && !promoCode && (
                <div className="promo-applied-badge" style={{ borderColor: 'rgba(124, 58, 237, 0.4)', background: 'rgba(124, 58, 237, 0.15)', color: '#c084fc' }}>
                  <Zap size={14} color="#00f0ff" />
                  <span>{rankBadge} {rankTitle} (Lvl {level}): <strong>{gamerDiscount}% Shaxsiy Chegirma</strong> faol!</span>
                </div>
              )}

              {/* Calculations */}
              <div className="cart-calc">
                <div className="calc-row">
                  <span>{t('cart.items')}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {effectiveDiscount > 0 && (
                  <div className="calc-row discount-row">
                    <span>
                      {gamerDiscount > discountPercent
                        ? `${rankBadge} Gamer Lvl ${level} (${effectiveDiscount}%):`
                        : `${t('cart.discount')} (${effectiveDiscount}%):`}
                    </span>
                    <span>-{formatPrice(effectiveDiscountAmount)}</span>
                  </div>
                )}
                <div className="calc-row">
                  <span>{t('cart.delivery')}</span>
                  <span className="free-delivery">{t('cart.free')}</span>
                </div>
                <div className="calc-row total-row">
                  <span>{t('cart.total')}</span>
                  <span className="total-amount">{formatPrice(effectiveTotal)}</span>
                </div>
              </div>

              {/* Checkout trigger button */}
              <button 
                className="btn btn-cyber checkout-trigger-btn"
                onClick={() => {
                  soundFX.playClick();
                  setIsCheckingOut(true);
                }}
              >
                <span>{t('cart.checkout')}</span>
                <ArrowRight size={18} />
              </button>

              <div className="guarantee-note">
                <ShieldCheck size={16} color="#10b981" />
                <span>100% Original mahsulotlar va 12 oy kafolat</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
