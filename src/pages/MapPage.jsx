import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useKindergartens } from '../context/KindergartenContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
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
const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `<div class="user-dot"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [map, position]);
  return null;
}

export default function MapPage() {
  const { data: kindergartens } = useKindergartens();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [userPos, setUserPos] = useState(null);

  const defaultCenter = [41.311081, 69.240562];

  // Obtain user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.warn('Geolocation not supported');
    }
  }, []);

  // Oddiy mock koordinatalar (agar bazadagi obyektda lat/lng bo'lmasa)
  // Biz har bir bog'chaga sal boshqacharoq tasodifiy (lekin markazga yaqin) koordinata beramiz
  const getCoordinates = (kg, index) => {
    if (kg.lat && kg.lng) return [kg.lat, kg.lng];
    // Toshkent atrofida tasodifiy sochish (demo uchun)
    return [
      defaultCenter[0] + (Math.sin(index * 123) * 0.05),
      defaultCenter[1] + (Math.cos(index * 321) * 0.05)
    ];
  };

  return (
    <div className="map-page-wrapper">
      <div className="map-header">
        <h1>{t('mapPage.title')}</h1>
        <p>{t('mapPage.subtitle')}</p>
      </div>
      
      <div className="map-container-box">
        <MapContainer center={userPos || defaultCenter} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '16px' }}>
          <RecenterMap position={userPos} />
          {/* User location marker */}
          {userPos && <Marker position={userPos} icon={userLocationIcon} />}
          {/* Zamonaviy qoramtir yoki oq rangli chiroyli xarita dizayni */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {kindergartens.map((kg, index) => (
            <Marker
              key={kg.id}
              position={getCoordinates(kg, index)}
              icon={customIcon}
              eventHandlers={{ click: () => navigate(`/bogcha/${kg.id}`) }}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <img src={kg.image || 'https://via.placeholder.com/150'} alt={kg.name} className="popup-img" />
                  <h3>{kg.name}</h3>
                  <p className="popup-district">{kg.district}</p>
                  <div className="popup-meta">
                    <span className="popup-rating">⭐ {kg.rating}</span>
                    <span className="popup-price">{typeof kg.price === 'object' ? kg.price[lang] || kg.price['uz'] || '' : kg.price}</span>
                  </div>
                  <a href={`/bogcha/${kg.id}`} className="popup-btn">
                    {t('kgFilters.details') || "Batafsil"}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
