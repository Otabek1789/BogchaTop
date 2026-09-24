import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { Package, Trash2, Phone, MapPin, Eye, X, CheckCircle, Clock, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApplicationsTab() {
  const { orders, updateOrderStatus, deleteOrder } = useProducts();
  const { t } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Status -> "${newStatus}"`);
  };

  const handleDelete = (orderId) => {
    if (window.confirm(`Buyurtma #${orderId} ni o'chirmoqchimisiz?`)) {
      deleteOrder(orderId);
      toast.error("Buyurtma o'chirildi");
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const statusOptions = [
    { id: 'all', label: t('home.viewAll') },
    { id: 'Yangi', label: t('orders.new') },
    { id: 'Tayyorlanmoqda', label: t('orders.processing') },
    { id: 'Yetkazilmoqda', label: t('orders.shipping') },
    { id: 'Bajarildi', label: t('orders.completed') },
    { id: 'Bekor qilindi', label: t('orders.cancelled') }
  ];

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)' }}>
            {t('admin.orders').toUpperCase()}
          </h2>
          <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '2px' }}>
            {t('orders.subtitle')}
          </p>
        </div>

        {/* Filter status */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {statusOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterStatus(opt.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--neutral-200)',
                background: filterStatus === opt.id ? 'var(--neon-cyan)' : 'var(--surface-warm)',
                color: filterStatus === opt.id ? '#000' : 'var(--neutral-700)',
                fontWeight: 700,
                fontSize: '12.5px',
                cursor: 'pointer'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between' }}>
          <strong style={{ color: 'var(--neutral-900)' }}>
            {t('admin.orders')} ({filteredOrders.length} {t('admin.items')})
          </strong>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead style={{ background: 'var(--surface)', color: 'var(--neutral-500)' }}>
              <tr>
                <th style={{ padding: '14px 16px' }}>ID / Sana</th>
                <th style={{ padding: '14px 16px' }}>{t('admin.customer')}</th>
                <th style={{ padding: '14px 16px' }}>{t('catalog.items')}</th>
                <th style={{ padding: '14px 16px' }}>{t('admin.amount')}</th>
                <th style={{ padding: '14px 16px' }}>{t('admin.payment')}</th>
                <th style={{ padding: '14px 16px' }}>{t('admin.status')}</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>{t('admin.action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <strong style={{ color: '#00f0ff', fontFamily: 'var(--font-gaming)' }}>{order.id}</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>{order.date}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{order.customerName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--neutral-500)' }}>
                      <Phone size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {order.customerPhone}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--neutral-400)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <MapPin size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {order.address}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', maxWidth: '220px' }}>
                    <div style={{ fontSize: '12.5px', color: 'var(--neutral-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {order.items && order.items.map(it => `${it.name} (x${it.quantity})`).join(', ')}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--neutral-500)' }}>
                      {order.items ? `${order.items.length} xil tovar` : ''}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <strong style={{ color: '#10b981', fontFamily: 'var(--font-gaming)', fontSize: '15px' }}>
                      {formatPrice(order.totalAmount)}
                    </strong>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: '12.5px', color: 'var(--neutral-700)' }}>{order.paymentMethod}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid var(--neutral-300)',
                        background: 'var(--surface)',
                        color: 'var(--neutral-900)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Yangi">Yangi</option>
                      <option value="Tayyorlanmoqda">Tayyorlanmoqda</option>
                      <option value="Yetkazilmoqda">Yetkazilmoqda</option>
                      <option value="Bajarildi">Bajarildi</option>
                      <option value="Bekor qilindi">Bekor qilindi</option>
                    </select>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        style={{ padding: '6px', background: 'var(--neutral-100)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'var(--neutral-700)' }}
                        title="Tafsilotlar"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        style={{ padding: '6px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--neutral-500)' }}>
                    Bu toifada hech qanday buyurtma mavjud emas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '520px', background: 'var(--surface-warm)', border: '1px solid var(--neutral-200)', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--neutral-900)' }}>
                  Buyurtma #{selectedOrder.id}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--neutral-500)' }}>{selectedOrder.date}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--neutral-500)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div><strong>Mijoz:</strong> {selectedOrder.customerName}</div>
              <div><strong>Telefon:</strong> {selectedOrder.customerPhone}</div>
              <div><strong>Manzil:</strong> {selectedOrder.address}</div>
              <div><strong>To'lov usuli:</strong> {selectedOrder.paymentMethod}</div>
              {selectedOrder.notes && <div><strong>Izoh:</strong> {selectedOrder.notes}</div>}
              <div><strong>Status:</strong> <span style={{ color: '#00f0ff', fontWeight: 700 }}>{selectedOrder.status}</span></div>

              <div style={{ marginTop: '10px' }}>
                <strong>Buyurtma qilingan mahsulotlar:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {selectedOrder.items && selectedOrder.items.map((it, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface)', padding: '8px 12px', borderRadius: '8px' }}>
                      <img src={it.image} alt={it.name} style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, fontSize: '13px' }}>
                        <div>{it.name}</div>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '11px' }}>{it.quantity} dona × {formatPrice(it.price)}</div>
                      </div>
                      <strong style={{ color: '#10b981' }}>{formatPrice(it.price * it.quantity)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--neutral-200)', paddingTop: '12px', marginTop: '8px' }}>
                <span>Jami summa:</span>
                <strong style={{ fontSize: '18px', color: '#00f0ff', fontFamily: 'var(--font-gaming)' }}>
                  {formatPrice(selectedOrder.totalAmount)}
                </strong>
              </div>
            </div>

            <button onClick={() => setSelectedOrder(null)} className="btn btn-primary" style={{ width: '100%' }}>
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
