import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, CheckCircle2, Phone, ArrowLeft, Users, Clock, X, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import { useKindergartens } from '../context/KindergartenContext';
import KindergartenCard from '../components/KindergartenCard';
import Gallery from '../components/Gallery';
import { 
  getLocalizedDescription, 
  getLocalizedLanguages, 
  getLocalizedFeatures, 
  getLocalizedAddress, 
  getLocalizedPrice 
} from '../utils/kindergartenLocalization';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const { data: kindergartens, reviews, addReview, submitApplication } = useKindergartens();
  
  const data = kindergartens.find(k => k.id === id);
  const kgReviews = reviews[id] || [];

  const [showAppModal, setShowAppModal] = useState(false);
  const [appForm, setAppForm] = useState({ parentName: '', phone: '', childName: '', childAge: '' });
  
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });

  // Disable scroll when modal is open
  useEffect(() => {
    if (showAppModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showAppModal]);

  const handleApply = (e) => {
    e.preventDefault();
    submitApplication({ kindergartenId: id, kindergartenName: data.name, ...appForm });
    setShowAppModal(false);
    toast.success(t('detailExtra.appSuccess'));
    setAppForm({ parentName: '', phone: '', childName: '', childAge: '' });
  };

  const handleReview = (e) => {
    e.preventDefault();
    addReview(id, reviewForm);
    toast.success(t('detailExtra.reviewSuccess'));
    setReviewForm({ name: '', rating: 5, comment: '' });
  };

  // Pick 3 random recommendations (memoized to avoid re-shuffle on re-render)
  const recommendations = useMemo(() => 
    kindergartens
      .filter(k => k.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3),
    [id, kindergartens]
  );

  if (!data) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>{t('detail.notFound')}</h2>
        <Link to="/" className="btn btn-outline" style={{ marginTop: '20px' }}>{t('detail.backHome')}</Link>
      </div>
    );
  }

  const defaultGallery = [
    data.image,
    "/ai-1.jpg",
    "/ai-2.jpg",
    "/ai-3.jpg",
    "/ai-4.jpg"
  ];
  const imagesToUse = data.images || defaultGallery;

  return (
    <>
      <div className="detail-page animate-fade-in-up">
        <div className="detail-header-bg">
          <img src={data.image} alt={data.name} className="detail-hero-img" />
          <div className="overlay"></div>
          <div className="container header-content-wrapper">
            <Link to="/" className="back-btn">
              <ArrowLeft size={20} />
              <span>{t('detail.back')}</span>
            </Link>
            <div className="title-area">
              <span className="badge badge-brand" style={{ marginBottom: '16px' }}>{t('detail.verified')}</span>
              <h1 className="text-display" style={{ color: 'white', marginBottom: '16px' }}>{data.name}</h1>
              <div className="meta-info">
                <span className="meta-item">
                  <MapPin size={18} /> {getLocalizedAddress(data, lang)}
                </span>
                <span className="meta-item">
                  <Star size={18} color="var(--accent-500)" fill="var(--accent-500)" /> {data.rating} ({data.reviews} {t('detail.reviews')})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container detail-content">
          <div className="main-col">
            <section className="detail-section card" style={{ padding: '24px', background: 'var(--surface-warm)' }}>
              <h2 className="text-h2" style={{ marginBottom: '24px' }}>{t('detailExtra.photoGallery')}</h2>
              <Gallery images={imagesToUse} />
            </section>

            <section className="detail-section card">
              <h2 className="text-h2">{t('detail.about')}</h2>
              <p className="text-body-lg" style={{ marginTop: '16px' }}>{getLocalizedDescription(data, lang)}</p>
              <p className="text-body-lg" style={{ marginTop: '16px' }}>
                {t('detail.aboutDesc')}
              </p>
            </section>

            <section className="detail-section card">
              <h2 className="text-h2">{t('detail.features')}</h2>
              <div className="features-grid">
                {getLocalizedFeatures(data, lang).map((feature, i) => (
                  <div key={i} className="feature-item">
                    <CheckCircle2 size={20} color="var(--brand-600)" />
                    <span>{feature}</span>
                  </div>
                ))}
                <div className="feature-item">
                  <CheckCircle2 size={20} color="var(--brand-600)" />
                  <span>{t('detail.cctv')}</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={20} color="var(--brand-600)" />
                  <span>{t('detail.psychologist')}</span>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="detail-section card">
              <h2 className="text-h2" style={{ marginBottom: '24px' }}>{t('detailExtra.leaveReview')}</h2>
              <p style={{ color: 'var(--neutral-500)', marginBottom: '16px' }}>{t('detailExtra.reviewNote')}</p>

              <form onSubmit={handleReview} style={{ background: 'var(--surface-warm)', padding: '24px', borderRadius: '16px', border: '1px solid var(--neutral-200)' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <input required type="text" placeholder={t('detailExtra.yourName')} value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0 16px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Star size={24} color={star <= reviewForm.rating ? "var(--accent-500)" : "var(--neutral-400)"} fill={star <= reviewForm.rating ? "var(--accent-500)" : "transparent"} style={{ transition: 'all 0.2s' }} />
                      </button>
                    ))}
                    <span style={{ marginLeft: '8px', fontWeight: '600', color: 'var(--neutral-700)' }}>
                      {reviewForm.rating}/5
                    </span>
                  </div>
                </div>
                <textarea required placeholder={t('detailExtra.writeReview')} value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', minHeight: '100px', marginBottom: '16px', background: 'var(--surface)', color: 'var(--neutral-900)', resize: 'vertical' }}></textarea>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', gap: '8px' }}>
                  <Send size={16} /> {t('detailExtra.send')}
                </button>
              </form>
            </section>
          </div>

          <div className="sidebar-col">
            <div className="card sticky-sidebar">
              <div className="price-box">
                <span className="price-label">{t('detail.monthlyFee')}</span>
                <div className="price-value">{getLocalizedPrice(data, lang)}</div>
              </div>
              
              <div className="sidebar-info-list">
                <div className="sidebar-info-item">
                  <div className="icon-box"><Users size={20} /></div>
                  <div>
                    <strong>{t('detail.langs')}</strong>
                    <div>{getLocalizedLanguages(data, lang).join(", ")}</div>
                  </div>
                </div>
                <div className="sidebar-info-item">
                  <div className="icon-box"><Clock size={20} /></div>
                  <div>
                    <strong>{t('detail.workHours')}</strong>
                    <div>{t('detail.workHoursDesc')}</div>
                  </div>
                </div>
              </div>

              <button onClick={() => toast(t('detail.contact') + ': ' + (data.phone || '+998 90 123 45 67'), { icon: '📞' })} className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }}>
                <Phone size={18} />
                {t('detail.contact')}
              </button>
              <button onClick={() => setShowAppModal(true)} className="btn btn-outline" style={{ width: '100%', marginTop: '12px', fontWeight: 'bold' }}>
                {t('detailExtra.applyBtn')}
              </button>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '60px 1.5rem', borderTop: '1px solid var(--neutral-200)', marginTop: '40px' }}>
          <h2 className="text-h2" style={{ marginBottom: '32px' }}>{t('detail.recommendations')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {recommendations.map(kg => (
              <KindergartenCard key={kg.id} data={kg} />
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal (Rendered via Portal to escape transforms) */}
      {showAppModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div className="animate-fade-in-up" style={{ background: 'var(--surface)', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '500px', position: 'relative', border: '1px solid var(--neutral-200)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <button onClick={() => setShowAppModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-500)' }}>
              <X size={24} />
            </button>
            <h2 className="text-h2" style={{ marginBottom: '8px', color: 'var(--neutral-900)' }}>{t('detailExtra.applyTitle')}</h2>
            <p style={{ color: 'var(--neutral-500)', marginBottom: '24px' }}>{data.name} — {t('detailExtra.applyDesc')}</p>
            
            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--neutral-900)' }}>{t('detailExtra.parentName')}</label>
                <input required type="text" placeholder={t('detailExtra.parentNamePh')} value={appForm.parentName} onChange={e => setAppForm({...appForm, parentName: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--neutral-900)' }}>{t('detailExtra.phonePh')}</label>
                <input required type="tel" placeholder="+998" value={appForm.phone} onChange={e => setAppForm({...appForm, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--neutral-900)' }}>{t('detailExtra.childName')}</label>
                  <input required type="text" placeholder={t('detailExtra.childNamePh')} value={appForm.childName} onChange={e => setAppForm({...appForm, childName: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--neutral-900)' }}>{t('detailExtra.childAge')}</label>
                  <input required type="number" min="2" max="7" placeholder={t('detailExtra.childAgePh')} value={appForm.childAge} onChange={e => setAppForm({...appForm, childAge: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>{t('detailExtra.submitApp')}</button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
