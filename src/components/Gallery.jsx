import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Main Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', backgroundColor: 'var(--neutral-100)' }}>
        <img 
          src={images[currentIndex]} 
          alt="Gallery" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }} 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/happy-kids-academy.jpg';
          }}
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backdropFilter: 'blur(4px)' }}
            >
              <ChevronLeft size={20} color="#0f172a" />
            </button>
            <button 
              onClick={nextImage}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backdropFilter: 'blur(4px)' }}
            >
              <ChevronRight size={20} color="#0f172a" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                flexShrink: 0, 
                cursor: 'pointer',
                border: currentIndex === idx ? '3px solid var(--brand-500)' : '3px solid transparent',
                opacity: currentIndex === idx ? 1 : 0.6,
                transition: 'all 0.2s ease'
              }}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${idx}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/happy-kids-academy.jpg';
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
