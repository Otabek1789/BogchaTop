import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Cpu, Monitor, Layers, Server, HardDrive, Wind, Zap, Box, 
  CheckCircle2, AlertTriangle, ShoppingCart, RotateCcw, Sparkles, 
  Trash2, Plus, ArrowRight, Activity, Flame, ShieldAlert, Award
} from 'lucide-react';
import { pcBuilderCategories, pcComponents, calculateBenchmarkFPS } from '../data/pcBuilderData';
import { useCart } from '../context/CartContext';
import { useGamer } from '../context/GamerContext';
import { useLanguage } from '../context/LanguageContext';
import { soundFX } from '../utils/soundFX';
import toast from 'react-hot-toast';
import './PCBuilder.css';

export default function PCBuilder() {
  const { addToCart, setIsCartOpen } = useCart();
  const { addXP, unlockBadge } = useGamer();
  const { t } = useLanguage();

  // State of selected parts: { cpu: item, gpu: item, ... }
  const [selectedParts, setSelectedParts] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_pc_builder_parts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (_) {}
    return {
      cpu: pcComponents.cpu[0], // Ryzen 7 7800X3D default
      gpu: pcComponents.gpu[1], // RTX 4080 Super default
      motherboard: pcComponents.motherboard[1], // MSI B650 default
      ram: pcComponents.ram[0],
      storage: pcComponents.storage[0],
      cooler: pcComponents.cooler[0],
      psu: pcComponents.psu[0],
      case: pcComponents.case[0]
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_pc_builder_parts', JSON.stringify(selectedParts));
    } catch (_) {}
  }, [selectedParts]);

  const [activeCategory, setActiveCategory] = useState(null);

  // Lock body scroll and close on Escape when modal is active
  useEffect(() => {
    if (activeCategory) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveCategory(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeCategory]);

  const getIcon = (catId) => {
    switch (catId) {
      case 'cpu': return <Cpu size={20} />;
      case 'gpu': return <Monitor size={20} />;
      case 'motherboard': return <Layers size={20} />;
      case 'ram': return <Server size={20} />;
      case 'storage': return <HardDrive size={20} />;
      case 'cooler': return <Wind size={20} />;
      case 'psu': return <Zap size={20} />;
      case 'case': return <Box size={20} />;
      default: return <Cpu size={20} />;
    }
  };

  // Calculations
  const totalPrice = Object.values(selectedParts).reduce((sum, item) => sum + (item ? item.price : 0), 0);
  const totalTDP = Object.values(selectedParts).reduce((sum, item) => sum + (item ? (item.tdp || 0) : 0), 0);
  const selectedPSU = selectedParts.psu;
  const psuWattage = selectedPSU ? selectedPSU.wattage : 0;
  const minRecommendedPSU = Math.round(totalTDP * 1.35);

  // Compatibility Check
  let compatibilityIssues = [];
  if (selectedParts.cpu && selectedParts.motherboard) {
    if (selectedParts.cpu.socket !== selectedParts.motherboard.socket) {
      compatibilityIssues.push(`Soket mos emas: Protsessor (${selectedParts.cpu.socket}) va Ona plata (${selectedParts.motherboard.socket}) bir-biriga to'g'ri kelmaydi!`);
    }
  }
  if (selectedPSU && psuWattage < totalTDP + 100) {
    compatibilityIssues.push(`Quvvat yetarli emas: Tizim sarfi ~${totalTDP}W, tavsiya etiladigan quvvat bloki kamida ${minRecommendedPSU}W bo'lishi lozim!`);
  }

  const isCompatible = compatibilityIssues.length === 0;

  // FPS Benchmarks
  const benchmarks = calculateBenchmarkFPS(selectedParts.cpu, selectedParts.gpu);

  // Actions
  const handleSelectPart = (category, item) => {
    soundFX.playClick(1400);
    setSelectedParts(prev => ({ ...prev, [category]: item }));
    setActiveCategory(null);
    toast.success(`${item.name} tanlandi!`, {
      style: { background: '#111827', color: '#00f0ff', border: '1px solid #00f0ff' }
    });
  };

  const handleRemovePart = (category, e) => {
    e.stopPropagation();
    soundFX.playClick(800);
    setSelectedParts(prev => ({ ...prev, [category]: null }));
  };

  const handleLoadRecommended = () => {
    soundFX.playPowerUp();
    setSelectedParts({
      cpu: pcComponents.cpu[1], // Core i9-14900K
      gpu: pcComponents.gpu[0], // RTX 4090
      motherboard: pcComponents.motherboard[0], // Z790 Dark Hero
      ram: pcComponents.ram[1], // 64GB
      storage: pcComponents.storage[0], // 990 Pro 2TB
      cooler: pcComponents.cooler[0], // NZXT Kraken Elite
      psu: pcComponents.psu[0], // 1000W
      case: pcComponents.case[0] // Lian Li O11
    });
    toast.success("Flagman 'NEXUS CYBER GOD' PC to'plami yuklandi! 🚀");
  };

  const handleReset = () => {
    soundFX.playClick(600);
    setSelectedParts({
      cpu: null,
      gpu: null,
      motherboard: null,
      ram: null,
      storage: null,
      cooler: null,
      psu: null,
      case: null
    });
    toast("Konfiguratsiya tozalandi");
  };

  const handleAddToCartAll = () => {
    const chosenItems = Object.values(selectedParts).filter(Boolean);
    if (chosenItems.length === 0) {
      toast.error("Iltimos, avval detallarni tanlang!");
      return;
    }

    soundFX.playPowerUp();

    // Add each chosen component to real CartContext
    chosenItems.forEach(part => {
      addToCart({
        id: `pc-${part.id}`,
        name: `[PC Qism] ${part.name}`,
        price: part.price,
        image: part.image,
        category: 'pc_builder',
        specs: { 'Turi': part.badge || 'Komponent' }
      });
    });

    addXP(200, "PC Builder To'plami");
    unlockBadge('pc_architect');

    toast.success(`🎉 ${chosenItems.length} ta PC qismlari savatga qo'shildi! (+200 XP)`, {
      duration: 4000,
      style: {
        background: '#0a0e17',
        color: '#00f0ff',
        border: '2px solid #00f0ff',
        boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)',
        fontWeight: 800
      }
    });

    setIsCartOpen(true);
  };

  return (
    <div className="pc-builder-page">
      {/* Hero Header */}
      <div className="builder-hero">
        <div className="builder-hero-content">
          <div className="builder-badge">
            <Sparkles size={15} />
            <span>{t('builder.badge')}</span>
          </div>
          <h1 className="builder-title">
            {t('builder.title1')} <span className="neon-gradient-text">{t('builder.titleAccent')}</span> {t('builder.title2')}
          </h1>
          <p className="builder-subtitle">
            {t('builder.subtitle')}
          </p>

          <div className="builder-quick-actions">
            <button className="builder-preset-btn" onClick={handleLoadRecommended}>
              <Flame size={16} color="#fbbf24" />
              <span>{t('builder.loadRecommended')}</span>
            </button>
            <button className="builder-reset-btn" onClick={handleReset}>
              <RotateCcw size={15} />
              <span>{t('builder.reset')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Builder Layout */}
      <div className="builder-container">
        {/* Left Column: Slots Grid */}
        <div className="builder-slots-col">
          <div className="slots-header">
            <h2>{t('builder.components')} ({Object.values(selectedParts).filter(Boolean).length}/8)</h2>
            <span className="slots-hint">{t('builder.slotsHint')}</span>
          </div>

          <div className="slots-grid">
            {pcBuilderCategories.map((cat) => {
              const part = selectedParts[cat.id];
              return (
                <div 
                  key={cat.id} 
                  className={`slot-card ${part ? 'filled' : 'empty'}`}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveCategory(cat.id);
                  }}
                >
                  <div className="slot-icon-box">
                    {getIcon(cat.id)}
                  </div>

                  <div className="slot-info">
                    <span className="slot-category-name">{cat.name}</span>
                    {part ? (
                      <>
                        <h4 className="slot-part-name">{part.name}</h4>
                        <div className="slot-part-meta">
                          {part.badge && <span className="slot-part-badge">{part.badge}</span>}
                          {part.socket && <span className="slot-spec-pill">Soket: {part.socket}</span>}
                          {part.vram && <span className="slot-spec-pill">{part.vram}</span>}
                          {part.tdp && <span className="slot-spec-pill">⚡ {part.tdp}W</span>}
                        </div>
                      </>
                    ) : (
                      <p className="slot-empty-text">{t('builder.emptySlot')}</p>
                    )}
                  </div>

                  <div className="slot-action-box">
                    {part ? (
                      <div className="slot-price-actions">
                        <span className="slot-price">{part.price.toLocaleString()} {t('misc.sum')}</span>
                        <button 
                          className="slot-remove-btn" 
                          onClick={(e) => handleRemovePart(cat.id, e)}
                          title="Remove"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ) : (
                      <button className="slot-add-btn">
                        <Plus size={16} />
                        <span>{t('arsenal.select')}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Telemetry, Benchmarks & Checkout */}
        <div className="builder-telemetry-col">
          {/* Total Price Card */}
          <div className="telemetry-card total-card glass">
            <div className="total-header">
              <span>{t('builder.totalPrice')}</span>
              <span className="total-currency">UZS</span>
            </div>
            <div className="total-price-display">
              {totalPrice.toLocaleString()} <span className="so-m">{t('misc.sum')}</span>
            </div>

            {/* Compatibility status */}
            <div className={`compatibility-badge ${isCompatible ? 'compat-ok' : 'compat-error'}`}>
              {isCompatible ? (
                <>
                  <CheckCircle2 size={18} color="#10b981" />
                  <div>
                    <strong>{t('builder.compatOk')}</strong>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={20} color="#ef4444" />
                  <div>
                    <strong>{t('builder.compatWarning')}</strong>
                    {compatibilityIssues.map((issue, idx) => (
                      <p key={idx}>{issue}</p>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Power Wattage Gauge */}
            <div className="wattage-box">
              <div className="wattage-labels">
                <span>{t('builder.estWattage')}</span>
                <strong>~{totalTDP}W / {psuWattage ? `${psuWattage}W` : 'PSU —'}</strong>
              </div>
              <div className="wattage-progress-bar">
                <div 
                  className="wattage-progress-fill" 
                  style={{ 
                    width: `${Math.min(100, (totalTDP / (psuWattage || 1000)) * 100)}%`,
                    background: (psuWattage && totalTDP > psuWattage) ? '#ef4444' : 'linear-gradient(90deg, #00f0ff, #3b82f6)'
                  }}
                />
              </div>
              <small className="wattage-hint">PSU: ≥ {minRecommendedPSU}W</small>
            </div>

            {/* Add to Cart Button */}
            <button 
              className="builder-checkout-btn" 
              onClick={handleAddToCartAll}
              disabled={!isCompatible || Object.values(selectedParts).filter(Boolean).length === 0}
            >
              <ShoppingCart size={18} />
              <span>{t('builder.addBuildToCart')}</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* FPS Benchmarks Card */}
          <div className="telemetry-card benchmarks-card glass">
            <div className="benchmark-title-box">
              <Activity size={18} color="#00f0ff" />
              <h3>{t('builder.benchmarkTitle')}</h3>
            </div>
            <div className="verdict-banner">
              {benchmarks.verdict}
            </div>

            <div className="benchmark-items">
              <div className="bench-game-row">
                <div className="game-label">
                  <strong>Counter-Strike 2</strong>
                  <span>1440p Competitive Max</span>
                </div>
                <div className="fps-indicator">
                  <span className="fps-number">{benchmarks.cs2}</span>
                  <span className="fps-unit">FPS</span>
                </div>
              </div>
              <div className="bench-bar">
                <div className="bench-fill" style={{ width: `${Math.min(100, (benchmarks.cs2 / 500) * 100)}%`, background: '#f59e0b' }} />
              </div>

              <div className="bench-game-row">
                <div className="game-label">
                  <strong>Cyberpunk 2077</strong>
                  <span>4K Ultra Ray Tracing</span>
                </div>
                <div className="fps-indicator">
                  <span className="fps-number">{benchmarks.cyberpunk4k}</span>
                  <span className="fps-unit">FPS</span>
                </div>
              </div>
              <div className="bench-bar">
                <div className="bench-fill" style={{ width: `${Math.min(100, (benchmarks.cyberpunk4k / 120) * 100)}%`, background: '#ef4444' }} />
              </div>

              <div className="bench-game-row">
                <div className="game-label">
                  <strong>GTA V / GTA VI Ready</strong>
                  <span>4K Max Settings</span>
                </div>
                <div className="fps-indicator">
                  <span className="fps-number">{benchmarks.gtaV4k}</span>
                  <span className="fps-unit">FPS</span>
                </div>
              </div>
              <div className="bench-bar">
                <div className="bench-fill" style={{ width: `${Math.min(100, (benchmarks.gtaV4k / 180) * 100)}%`, background: '#10b981' }} />
              </div>

              <div className="bench-game-row">
                <div className="game-label">
                  <strong>Dota 2 / Valorant</strong>
                  <span>Pro Esports Refresh</span>
                </div>
                <div className="fps-indicator">
                  <span className="fps-number">{benchmarks.dota2}</span>
                  <span className="fps-unit">FPS</span>
                </div>
              </div>
              <div className="bench-bar">
                <div className="bench-fill" style={{ width: `${Math.min(100, (benchmarks.dota2 / 400) * 100)}%`, background: '#00f0ff' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Selection Modal */}
      {activeCategory && typeof document !== 'undefined' && createPortal(
        <div className="modal-overlay" onClick={() => setActiveCategory(null)}>
          <div className="selection-modal glass" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-box">
                {getIcon(activeCategory)}
                <h3>{pcBuilderCategories.find(c => c.id === activeCategory)?.name} - {t('builder.selectPartModalTitle')}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveCategory(null)}>✕</button>
            </div>

            <div className="modal-parts-list">
              {(pcComponents[activeCategory] || []).map((part) => {
                const isSelected = selectedParts[activeCategory]?.id === part.id;
                return (
                  <div 
                    key={part.id} 
                    className={`modal-part-card ${isSelected ? 'active-selection' : ''}`}
                    onClick={() => handleSelectPart(activeCategory, part)}
                  >
                    <img src={part.image} alt={part.name} className="modal-part-img" />
                    <div className="modal-part-details">
                      <div className="modal-part-top">
                        <span className="modal-part-brand">{part.brand}</span>
                        {part.badge && <span className="modal-part-badge">{part.badge}</span>}
                      </div>
                      <h4 className="modal-part-title">{part.name}</h4>
                      <p className="modal-part-desc">{part.description}</p>
                      
                      <div className="modal-part-specs">
                        {part.socket && <span className="spec-tag">Soket: {part.socket}</span>}
                        {part.cores && <span className="spec-tag">{part.cores}</span>}
                        {part.vram && <span className="spec-tag">{part.vram}</span>}
                        {part.capacity && <span className="spec-tag">{part.capacity}</span>}
                        {part.speed && <span className="spec-tag">{part.speed}</span>}
                        {part.wattage && <span className="spec-tag">Quvvat: {part.wattage}W</span>}
                        {part.tdp && <span className="spec-tag">TDP: {part.tdp}W</span>}
                      </div>
                    </div>

                    <div className="modal-part-action">
                      <div className="modal-price">{part.price.toLocaleString()} so'm</div>
                      <button className={`modal-choose-btn ${isSelected ? 'chosen' : ''}`}>
                        {isSelected ? 'Tanlangan ✓' : 'Tanlash'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
