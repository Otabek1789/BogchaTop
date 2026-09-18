import React, { useState } from 'react';
import { Search, CheckCircle, Map as MapIcon, List } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useKindergartens } from '../context/KindergartenContext';
import KindergartenCard from '../components/KindergartenCard';
import CustomSelect from '../components/CustomSelect';
import { getLocalizedLanguages, getLocalizedAddress } from '../utils/kindergartenLocalization';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Kindergartens() {
  const { t, lang } = useLanguage();
  const { data: kindergartens } = useKindergartens();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMapView, setIsMapView] = useState(false);
  const [districtFilter, setDistrictFilter] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(5000000);

  // Extract unique districts and languages for filter dropdowns
  const uniqueDistricts = [...new Set(kindergartens.map(k => k.district))];
  const uniqueLangs = [...new Set(kindergartens.flatMap(k => getLocalizedLanguages(k, lang)))];

  const filtered = kindergartens.filter(k => {
    const priceStr = typeof k.price === 'object' ? (k.price.uz || '') : (k.price || '');
    const priceNum = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;

    const matchSearch = k.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        getLocalizedAddress(k, lang).toLowerCase().includes(searchTerm.toLowerCase());
    const matchDistrict = districtFilter ? k.district === districtFilter : true;
    const kgLangs = getLocalizedLanguages(k, lang);
    const matchLang = langFilter ? kgLangs.includes(langFilter) || (k.languages['uz'] || []).includes(langFilter) : true;
    const matchPrice = priceNum <= priceFilter;

    return matchSearch && matchDistrict && matchLang && matchPrice;
  });

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section style={{ padding: '80px 0', background: 'var(--brand-gradient)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h1 className="text-display" style={{ marginBottom: '24px' }}>
            {t('kindergartens.pageTitle')}
          </h1>
          <p className="text-body-lg" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 40px auto' }}>
            {t('kindergartens.pageSubtitle')}
          </p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input 
              type="text" 
              placeholder={t('kindergartens.searchPlaceholder')} 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '20px 24px 20px 56px', borderRadius: '999px', border: 'none', fontSize: '1.1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', outline: 'none', color: '#0f172a' }}
            />
            <Search size={24} color="#64748b" style={{ position: 'absolute', left: '20px', top: '20px' }} />
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '40px 1.5rem 80px 1.5rem' }}>
        {/* Filters Panel */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', background: 'var(--surface-warm)', padding: '24px', borderRadius: '16px', border: '1px solid var(--neutral-200)' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--neutral-700)' }}>{t('kgFilters.district')}</label>
            <CustomSelect 
              value={districtFilter} 
              onChange={setDistrictFilter}
              options={[
                { value: '', label: t('kgFilters.all') },
                ...uniqueDistricts.map(d => ({ value: d, label: d }))
              ]}
              style={{ background: 'var(--surface)' }}
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--neutral-700)' }}>{t('kgFilters.language')}</label>
            <CustomSelect 
              value={langFilter} 
              onChange={setLangFilter}
              options={[
                { value: '', label: t('kgFilters.all') },
                ...uniqueLangs.map(l => ({ value: l, label: l }))
              ]}
              style={{ background: 'var(--surface)' }}
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '500', color: 'var(--neutral-700)' }}>
              <span>{t('kgFilters.priceUpTo')}</span>
              <span style={{ color: 'var(--brand-600)', fontWeight: 600 }}>{priceFilter.toLocaleString()} UZS</span>
            </label>
            <input 
              type="range" 
              min="500000" 
              max="5000000" 
              step="100000"
              value={priceFilter}
              onChange={e => setPriceFilter(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-500)', height: '8px', borderRadius: '4px', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 className="text-h2">{t('kindergartens.allKindergartens')} ({filtered.length})</h2>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'var(--neutral-100)', padding: '4px', borderRadius: '8px' }}>
              <button 
                onClick={() => setIsMapView(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: 'none', background: !isMapView ? 'var(--surface-warm)' : 'transparent', borderRadius: '6px', cursor: 'pointer', boxShadow: !isMapView ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', fontWeight: !isMapView ? '600' : '400', color: !isMapView ? 'var(--brand-600)' : 'var(--neutral-600)', transition: 'all 0.2s' }}
              >
                <List size={18} /> {t('kgFilters.listView')}
              </button>
              <button 
                onClick={() => setIsMapView(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: 'none', background: isMapView ? 'var(--surface-warm)' : 'transparent', borderRadius: '6px', cursor: 'pointer', boxShadow: isMapView ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', fontWeight: isMapView ? '600' : '400', color: isMapView ? 'var(--brand-600)' : 'var(--neutral-600)', transition: 'all 0.2s' }}
              >
                <MapIcon size={18} /> {t('kgFilters.mapView')}
              </button>
            </div>
          </div>
        </div>

        {isMapView ? (
          <div style={{ height: '600px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--neutral-200)', zIndex: 0, position: 'relative' }}>
            <MapContainer center={[41.311081, 69.240562]} zoom={11} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map(kg => kg.coordinates && (
                <Marker key={kg.id} position={kg.coordinates}>
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{kg.name}</h4>
                      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>{getLocalizedAddress(kg, lang)}</p>
                      <a href={`/bogcha/${kg.id}`} style={{ display: 'inline-block', background: 'var(--brand-500)', color: 'white', padding: '4px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '12px' }}>
                        {t('kgFilters.details')}
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
              <>
                {filtered.map(kg => (
                  <KindergartenCard key={kg.id} data={kg} />
                ))}
                {filtered.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--neutral-500)' }}>
                    {t('kindergartens.notFound')}
                  </div>
                )}
              </>
          </div>
        )}
      </section>

      <section style={{ background: 'var(--surface-warm)', padding: '80px 0', borderTop: '1px solid var(--neutral-200)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 className="text-h2" style={{ marginBottom: '24px' }}>{t('kindergartens.whyUs')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle color="var(--brand-500)" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t('kindergartens.verified')}</h3>
                  <p className="text-body-lg">{t('kindergartens.verifiedDesc')}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle color="var(--brand-500)" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t('kindergartens.realReviews')}</h3>
                  <p className="text-body-lg">{t('kindergartens.realReviewsDesc')}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle color="var(--brand-500)" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t('kindergartens.convenient')}</h3>
                  <p className="text-body-lg">{t('kindergartens.convenientDesc')}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: 'var(--brand-50)', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
            <h3 className="text-h3" style={{ marginBottom: '16px', color: 'var(--brand-700)' }}>{t('kindergartens.haveKg')}</h3>
            <p className="text-body-lg" style={{ marginBottom: '24px' }}>{t('kindergartens.haveKgDesc')}</p>
            <button className="btn btn-primary" style={{ width: '100%' }}>{t('kindergartens.register')}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
