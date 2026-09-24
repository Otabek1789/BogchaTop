import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { categories, brands } from '../../data/gamingData';
import { Plus, Trash2, Edit2, Search, Check, X, Package, ExternalLink, Image } from 'lucide-react';
import toast from 'react-hot-toast';

export default function KindergartensTab() {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStock } = useProducts();
  const { lang, t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const defaultFormState = {
    name: '',
    brand: 'Sony PlayStation',
    category: 'consoles',
    price: '',
    oldPrice: '',
    stock: 10,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
    description: '',
    specs: {
      'Kafolat': '12 oy rasmiy kafolat'
    }
  };

  const [formData, setFormData] = useState(defaultFormState);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(defaultFormState);
    setShowAddForm(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingId(prod.id);
    setFormData({
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      price: prod.price,
      oldPrice: prod.oldPrice || '',
      stock: prod.stock,
      badge: prod.badge || '',
      image: prod.image,
      description: prod.description || '',
      specs: prod.specs || { 'Kafolat': '12 oy rasmiy' }
    });
    setShowAddForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      toast.error("Iltimos, tovar nomi va narxini kiriting");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock)
    };

    if (editingId) {
      updateProduct(editingId, payload);
      toast.success("Mahsulot ma'lumotlari muvaffaqiyatli yangilandi! ✨");
    } else {
      addProduct(payload);
      toast.success("Yangi gaming mahsulot qo'shildi! 🎮");
    }

    setShowAddForm(false);
    setEditingId(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`"${name}" mahsulotini o'chirmoqchimisiz?`)) {
      deleteProduct(id);
      toast.error("Mahsulot o'chirildi");
    }
  };

  const filteredProducts = products.filter(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)' }}>
            {t('admin.products').toUpperCase()}
          </h2>
          <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '2px' }}>
            {t('catalog.subtitle')}
          </p>
        </div>

        <button 
          onClick={handleOpenAdd} 
          className="btn btn-cyber" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px' }}
        >
          <Plus size={18} /> {t('admin.addProductBtn')}
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface-warm)', border: '1px solid var(--neutral-200)', borderRadius: '10px', padding: '10px 14px' }}>
          <Search size={18} color="var(--neutral-500)" />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('admin.searchProductPlaceholder')}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--neutral-900)', fontSize: '14px' }}
          />
        </div>

        <select 
          value={filterCategory} 
          onChange={e => setFilterCategory(e.target.value)}
          style={{ background: 'var(--surface-warm)', border: '1px solid var(--neutral-200)', borderRadius: '10px', padding: '10px 16px', color: 'var(--neutral-900)', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
        >
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {lang === 'ru' ? (c.nameRu || c.nameUz) : lang === 'en' ? (c.nameEn || c.nameUz) : c.nameUz}
            </option>
          ))}
        </select>
      </div>

      {/* Add / Edit Form Modal / Box */}
      {showAddForm && (
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            marginBottom: '28px', 
            padding: '24px', 
            borderRadius: '16px', 
            background: 'var(--surface-warm)', 
            border: '2px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--neutral-900)' }}>
              {editingId ? "Tovarni tahrirlash" : "Yangi gaming tovar qo'shish"}
            </h3>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              style={{ background: 'transparent', border: 'none', color: 'var(--neutral-500)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Tovar nomi *
              </label>
              <input 
                required 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                placeholder="Masalan: PlayStation 5 Pro 2TB"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Brend
              </label>
              <select 
                value={formData.brand} 
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }}
              >
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Toifa
              </label>
              <select 
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }}
              >
                {categories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.nameUz}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Narxi (UZS) *
              </label>
              <input 
                required 
                type="number"
                value={formData.price} 
                onChange={e => setFormData({ ...formData, price: e.target.value })} 
                placeholder="Masalan: 9800000"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Eski narxi (Chegirma uchun, ixtiyoriy)
              </label>
              <input 
                type="number"
                value={formData.oldPrice} 
                onChange={e => setFormData({ ...formData, oldPrice: e.target.value })} 
                placeholder="Masalan: 10900000"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Omborda soni (Stok)
              </label>
              <input 
                type="number"
                value={formData.stock} 
                onChange={e => setFormData({ ...formData, stock: e.target.value })} 
                placeholder="10"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Yorliq (Badge)
              </label>
              <input 
                value={formData.badge} 
                onChange={e => setFormData({ ...formData, badge: e.target.value })} 
                placeholder="NEW, HOT DEAL, ESPORTS"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
                Rasm havolasi (URL)
              </label>
              <input 
                value={formData.image} 
                onChange={e => setFormData({ ...formData, image: e.target.value })} 
                placeholder="https://images.unsplash.com/..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-600)', marginBottom: '6px' }}>
              Batafsil tavsif
            </label>
            <textarea 
              rows={3}
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })} 
              placeholder="Mahsulot afzalliklari, qo'llab-quvvatlaydigan texnologiyalari..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '14px' }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline">
              Bekor qilish
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? "O'zgarishlarni saqlash" : "Tovarni saqlash"}
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ color: 'var(--neutral-900)', fontSize: '15px' }}>
            {t('admin.products')} ({filteredProducts.length} {t('admin.items')})
          </strong>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead style={{ background: 'var(--surface)', color: 'var(--neutral-500)' }}>
              <tr>
                <th style={{ padding: '14px 16px' }}>{t('catalog.searchPlaceholder')}</th>
                <th style={{ padding: '14px 16px' }}>{t('catalog.brands')} & {t('catalog.categories')}</th>
                <th style={{ padding: '14px 16px' }}>{t('admin.amount')}</th>
                <th style={{ padding: '14px 16px' }}>Stock</th>
                <th style={{ padding: '14px 16px' }}>Badge</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>{t('admin.action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(prod => (
                <tr key={prod.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', background: '#0a0e17' }} 
                      />
                      <div>
                        <strong style={{ color: 'var(--neutral-900)', display: 'block' }}>{prod.name}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--neutral-500)' }}>ID: {prod.id}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ color: 'var(--neutral-900)', fontWeight: 600 }}>{prod.brand}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>
                      {categories.find(c => c.id === prod.category)?.nameUz || prod.category}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-gaming)' }}>
                      {formatPrice(prod.price)}
                    </div>
                    {prod.oldPrice && (
                      <div style={{ fontSize: '11px', color: 'var(--neutral-400)', textDecoration: 'line-through' }}>
                        {formatPrice(prod.oldPrice)}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 700,
                        background: prod.stock > 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                        color: prod.stock > 0 ? '#10b981' : '#ef4444'
                      }}
                      title="Stok holatini o'zgartirish"
                    >
                      {prod.stock > 0 ? `Mavjud (${prod.stock} ta)` : 'Tugagan'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {prod.badge && (
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800, background: 'rgba(0,240,255,0.12)', color: '#00f0ff', border: '1px solid rgba(0,240,255,0.3)' }}>
                        {prod.badge}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenEdit(prod)}
                        style={{ padding: '6px', background: 'var(--neutral-100)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'var(--neutral-700)' }}
                        title="Tahrirlash"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(prod.id, prod.name)}
                        style={{ padding: '6px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
