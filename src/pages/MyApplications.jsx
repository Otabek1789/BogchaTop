import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, ShoppingBag, ArrowRight, Phone, MapPin } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

export default function MyApplications() {
  const { orders, updateOrderStatus } = useProducts();
  const { user } = useAuth();
  const { t } = useLanguage();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Yangi':
        return <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {t('orders.new')}</span>;
      case 'Tayyorlanmoqda':
      case 'Jarayonda':
        return <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Package size={14} /> {t('orders.processing')}</span>;
      case 'Yetkazilmoqda':
        return <span style={{ background: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff', border: '1px solid rgba(0, 240, 255, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Truck size={14} /> {t('orders.shipping')}</span>;
      case 'Bajarildi':
        return <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} /> {t('orders.completed')}</span>;
      case 'Bekor qilindi':
        return <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}><XCircle size={14} /> {t('orders.cancelled')}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Buyurtmani bekor qilmoqchimisiz?")) {
      updateOrderStatus(orderId, 'Bekor qilindi');
      toast.success("Buyurtma bekor qilindi");
    }
  };

  return (
    <div className="container" style={{ padding: '40px 1.5rem 80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-h1" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)' }}>
          {t('orders.title')}
        </h1>
        <p style={{ color: 'var(--neutral-400)', marginTop: '4px' }}>
          {t('orders.subtitle')}
        </p>
      </div>

      {orders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="glass"
              style={{
                borderRadius: '16px',
                padding: '24px',
                background: 'var(--surface-warm)',
                border: '1px solid var(--card-border)'
              }}
            >
              {/* Order Top Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '16px', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-gaming)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>
                      {order.id}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--neutral-400)' }}>
                      • {order.date}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--neutral-400)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span><Phone size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {order.customerPhone}</span>
                    <span><MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {order.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getStatusBadge(order.status)}
                  {order.status === 'Yangi' && (
                    <button 
                      onClick={() => handleCancelOrder(order.id)}
                      style={{ background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      {t('orders.cancelBtn', 'Bekor qilish')}
                    </button>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {order.items && order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--neutral-100)', padding: '10px 14px', borderRadius: '10px' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--neutral-900)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--neutral-400)' }}>
                        {item.quantity} dona × {formatPrice(item.price)}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-gaming)', fontWeight: 700, fontSize: '1.05rem', color: '#34d399' }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Payment Method */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--neutral-200)', paddingTop: '14px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-400)' }}>
                  {t('orders.paymentMethod', "To'lov usuli:")} <strong style={{ color: 'var(--neutral-900)' }}>{order.paymentMethod}</strong>
                  {order.paymentStatus && (
                    <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', background: order.paymentStatus === 'Paid' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)', color: order.paymentStatus === 'Paid' ? '#34d399' : '#fbbf24' }}>
                      {order.paymentStatus === 'Paid' ? t('orders.paid', 'To\'langan') : t('orders.pending', 'Kutilmoqda')}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--neutral-400)', fontSize: '0.9rem' }}>{t('orders.totalPayment', "Jami to'lov:")}</span>
                  <span style={{ fontFamily: 'var(--font-gaming)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass" style={{ textAlign: 'center', padding: '80px 24px', borderRadius: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Package size={40} />
          </div>
          <h2 style={{ color: 'var(--neutral-900)', fontSize: '1.6rem', marginBottom: '10px' }}>
            {t('orders.empty')}
          </h2>
          <p style={{ color: 'var(--neutral-400)', maxWidth: '420px', margin: '0 auto 24px' }}>
            {t('cart.emptyDesc')}
          </p>
          <Link to="/products" className="btn btn-primary">
            <span>{t('cart.explore')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
