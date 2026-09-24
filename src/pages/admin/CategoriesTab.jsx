import React, { useState, useEffect } from 'react';
import { categories as initialCategories, brands as initialBrands } from '../../data/gamingData';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { Plus, Edit2, Check, X, Layers, Tag, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CategoriesTab() {
  const { products } = useProducts();
  const { t, lang } = useLanguage();
  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return initialCategories;
  });

  const [brandsList, setBrandsList] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_brands');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return initialBrands.map(b => ({ name: b, active: true, count: products.filter(p => p.brand === b).length }));
  });

  const [newCatName, setNewCatName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('nexus_categories', JSON.stringify(categoriesList));
    } catch (_) {}
  }, [categoriesList]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_brands', JSON.stringify(brandsList));
    } catch (_) {}
  }, [brandsList]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      nameUz: newCatName,
      nameRu: newCatName,
      nameEn: newCatName,
      icon: 'Gamepad'
    };
    setCategoriesList([...categoriesList, newCat]);
    setNewCatName('');
    toast.success(`Yangi toifa qo'shildi: ${newCatName}`);
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setBrandsList([...brandsList, { name: newBrandName, active: true, count: 0 }]);
    setNewBrandName('');
    toast.success(`Yangi brend qo'shildi: ${newBrandName}`);
  };

  const toggleBrandActive = (brandName) => {
    setBrandsList(prev => prev.map(b => b.name === brandName ? { ...b, active: !b.active } : b));
  };

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: 0 }}>
          {t('admin.categories').toUpperCase()}
        </h2>
        <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '4px' }}>
          {t('admin.panelSubtitle')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px' }}>
        {/* Categories Manager */}
        <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
                Katalog Toifalari ({categoriesList.length} ta)
              </h3>
            </div>
          </div>

          {/* Add category form */}
          <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Yangi toifa nomi (masalan: Gaming Stullar)..."
              style={{ flex: 1, padding: '10px 14px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', color: 'var(--neutral-900)', fontSize: '13.5px', outline: 'none' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '13px' }}>
              <Plus size={16} /> Qo'shish
            </button>
          </form>

          {/* Categories List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categoriesList.map((cat) => {
              const productCount = cat.id === 'all' 
                ? products.length 
                : products.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--neutral-100)', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--neutral-900)' }}>
                      {cat.nameUz}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--neutral-500)', marginTop: '2px' }}>
                      ID: {cat.id} • Ruscha: {cat.nameRu} • Inglizcha: {cat.nameEn}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '20px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--neon-cyan)', fontSize: '12px', fontWeight: 800 }}>
                      {productCount} ta tovar
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brands Manager */}
        <div className="card" style={{ padding: '24px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.12)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tag size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
                Hamkor Brendlar ({brandsList.length} ta)
              </h3>
            </div>
          </div>

          {/* Add brand form */}
          <form onSubmit={handleAddBrand} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="Yangi brend nomi (masalan: Corsair)..."
              style={{ flex: 1, padding: '10px 14px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', color: 'var(--neutral-900)', fontSize: '13.5px', outline: 'none' }}
            />
            <button type="submit" className="btn btn-cyber" style={{ padding: '10px 18px', fontSize: '13px' }}>
              <Plus size={16} /> Qo'shish
            </button>
          </form>

          {/* Brands List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {brandsList.map((brand) => (
              <div key={brand.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--neutral-100)', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={16} color="var(--neon-cyan)" />
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--neutral-900)' }}>{brand.name}</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--neutral-500)', marginLeft: '8px' }}>({brand.count} ta mahsulot)</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleBrandActive(brand.name)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: brand.active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: brand.active ? '#10b981' : '#ef4444',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {brand.active ? 'Faol 🟢' : 'Nofaol 🔴'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
