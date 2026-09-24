import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import { categories, brands } from '../data/gamingData';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Grid, 
  List, 
  Check, 
  ArrowUpDown,
  Laptop,
  Gamepad2,
  Headphones,
  Disc,
  Monitor
} from 'lucide-react';
import './Kindergartens.css';

export default function Kindergartens() {
  const { products } = useProducts();
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const paramCategory = searchParams.get('category') || 'all';
  const paramSearch = searchParams.get('search') || '';

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [searchTerm, setSearchTerm] = useState(paramSearch);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(50000000); // 50m max
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    if (paramCategory) setSelectedCategory(paramCategory);
    if (paramSearch) setSearchTerm(paramSearch);
  }, [paramCategory, paramSearch]);

  // Brand toggle
  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSelectedBrands([]);
    setPriceRange(50000000);
    setInStockOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      if (sortBy === 'newest') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [products, selectedCategory, searchTerm, selectedBrands, priceRange, inStockOnly, sortBy]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + " so'm";
  };

  const getCategoryName = (cat) => {
    if (!cat) return '';
    if (lang === 'ru') return cat.nameRu || cat.nameUz;
    if (lang === 'en') return cat.nameEn || cat.nameUz;
    return cat.nameUz;
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop size={18} />;
      case 'Gamepad': return <Gamepad2 size={18} />;
      case 'Headphones': return <Headphones size={18} />;
      case 'Disc': return <Disc size={18} />;
      case 'Monitor': return <Monitor size={18} />;
      default: return <Gamepad2 size={18} />;
    }
  };

  return (
    <div className="catalog-page container">
      {/* Page Header */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">{t('catalog.title')}</h1>
          <p className="catalog-subtitle">
            {t('catalog.subtitle')}
          </p>
        </div>

        <button 
          className="mobile-filter-trigger btn btn-outline"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <SlidersHorizontal size={18} />
          <span>{t('catalog.filters')}</span>
        </button>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className={`catalog-sidebar glass ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <h3>{t('catalog.filters')}</h3>
            <div className="sidebar-header-actions">
              <button className="reset-btn" onClick={resetFilters} title={t('catalog.reset')}>
                <RotateCcw size={15} />
                <span>{t('catalog.reset')}</span>
              </button>
              <button 
                className="close-mobile-filter"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Search in sidebar */}
          <div className="filter-group">
            <label className="filter-label">{t('catalog.search')}</label>
            <div className="sidebar-search-box">
              <Search size={16} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('catalog.searchPlaceholder')}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <label className="filter-label">{t('catalog.categories')}</label>
            <div className="category-filters-list">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="cat-btn-content">
                    {getCategoryIcon(cat.icon)}
                    <span>{getCategoryName(cat)}</span>
                  </span>
                  <span className="cat-count">
                    {cat.id === 'all' 
                      ? products.length 
                      : products.filter(p => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="price-label-row">
              <label className="filter-label">{t('catalog.maxPrice')}</label>
              <span className="price-display">{formatPrice(priceRange)}</span>
            </div>
            <input 
              type="range"
              min={500000}
              max={50000000}
              step={500000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-scale">
              <span>500 ming</span>
              <span>50 mln so'm</span>
            </div>
          </div>

          {/* Brands Checklist */}
          <div className="filter-group">
            <label className="filter-label">{t('catalog.brands')}</label>
            <div className="brands-checkbox-list">
              {brands.map((brand) => {
                const isChecked = selectedBrands.includes(brand);
                return (
                  <label key={brand} className="brand-check-item">
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="custom-checkbox">
                      {isChecked && <Check size={12} />}
                    </span>
                    <span className="brand-name">{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Stock Filter Switch */}
          <div className="filter-group stock-switch-group">
            <label className="brand-check-item">
              <input 
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span className="custom-checkbox">
                {inStockOnly && <Check size={12} />}
              </span>
              <span className="brand-name">{t('catalog.inStockOnly')}</span>
            </label>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="catalog-main">
          {/* Controls Bar */}
          <div className="catalog-controls glass">
            <div className="results-counter">
              {t('catalog.found')} <strong>{filteredProducts.length}</strong> {t('catalog.items')}
            </div>

            <div className="sorting-wrap">
              <ArrowUpDown size={16} className="text-neon" />
              <label>{t('catalog.sort')}</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">{t('catalog.sortPopular')}</option>
                <option value="price_asc">{t('catalog.sortPriceAsc')}</option>
                <option value="price_desc">{t('catalog.sortPriceDesc')}</option>
                <option value="rating">{t('catalog.sortRating')}</option>
                <option value="newest">{t('catalog.sortNewest')}</option>
              </select>
            </div>
          </div>

          {/* Active filter badges */}
          {(selectedCategory !== 'all' || selectedBrands.length > 0 || inStockOnly || searchTerm) && (
            <div className="active-filters-row">
              {selectedCategory !== 'all' && (
                <span className="active-filter-tag">
                  {t('catalog.categories')}: {getCategoryName(categories.find(c => c.id === selectedCategory))}
                  <X size={14} onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {searchTerm && (
                <span className="active-filter-tag">
                  {t('catalog.search')}: "{searchTerm}"
                  <X size={14} onClick={() => setSearchTerm('')} />
                </span>
              )}
              {selectedBrands.map(b => (
                <span key={b} className="active-filter-tag">
                  {b}
                  <X size={14} onClick={() => toggleBrand(b)} />
                </span>
              ))}
              {inStockOnly && (
                <span className="active-filter-tag">
                  {t('catalog.inStockOnly')}
                  <X size={14} onClick={() => setInStockOnly(false)} />
                </span>
              )}
              <button className="clear-all-tags-btn" onClick={resetFilters}>
                {t('catalog.clearAll')}
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="catalog-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty glass">
              <div className="empty-icon-circle">
                <Search size={40} />
              </div>
              <h3>{t('catalog.emptyTitle')}</h3>
              <p>{t('catalog.emptyDesc')}</p>
              <button className="btn btn-primary" onClick={resetFilters}>
                {t('catalog.reset')}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
