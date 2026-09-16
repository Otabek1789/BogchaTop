import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useKindergartens } from '../context/KindergartenContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.css';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// A nice glowing custom icon for the WOW effect
const customIcon = L.divIcon({
  className: 'custom-glowing-marker',
  html: `<div class="marker-pin"></div><div class="marker-pulse"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapPage() {
  const { data: kindergartens } = useKindergartens();
  const { t, lang } = useLanguage();

  // Toshkent markazi koordinatalari
  const center = [41.311081, 69.240562];

  // Oddiy mock koordinatalar (agar bazadagi obyektda lat/lng bo'lmasa)
  // Biz har bir bog'chaga sal boshqacharoq tasodifiy (lekin markazga yaqin) koordinata beramiz
  const getCoordinates = (kg, index) => {
    if (kg.lat && kg.lng) return [kg.lat, kg.lng];
    // Toshkent atrofida tasodifiy sochish (demo uchun)
    return [
      center[0] + (Math.sin(index * 123) * 0.05),
      center[1] + (Math.cos(index * 321) * 0.05)
    ];
  };

  return (
    <div className="map-page-wrapper">
      <div className="map-header">
        <h1>{t('mapPage.title')}</h1>
        <p>{t('mapPage.subtitle')}</p>
      </div>
      
      <div className="map-container-box">
        <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '16px' }}>
          {/* Zamonaviy qoramtir yoki oq rangli chiroyli xarita dizayni */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {kindergartens.map((kg, index) => (
            <Marker key={kg.id} position={getCoordinates(kg, index)} icon={customIcon}>
              <Popup className="custom-popup">
                <div className="popup-content">
                  <img src={kg.image || 'https://via.placeholder.com/150'} alt={kg.name} className="popup-img" />
                  <h3>{kg.name}</h3>
                  <p className="popup-district">{kg.district}</p>
                  <div className="popup-meta">
                    <span className="popup-rating">⭐ {kg.rating}</span>
                    <span className="popup-price">{typeof kg.price === 'object' ? (kg.price[lang] || kg.price['uz'] || '') : kg.price}</span>
                  </div>
                  <Link to={`/bogcha/${kg.id}`} className="popup-btn">{t('mapPage.details')}</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
