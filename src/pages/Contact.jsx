import React from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section style={{ padding: '80px 0', background: 'var(--surface-warm)', textAlign: 'center', borderBottom: '1px solid var(--neutral-200)' }}>
        <div className="container">
          <h1 className="text-display" style={{ marginBottom: '24px', color: 'var(--neutral-900)' }}>{t('contact.pageTitle')}</h1>
          <p className="text-body-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
            {t('contact.pageSubtitle')}
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          
          <div className="card" style={{ padding: '40px' }}>
            <h2 className="text-h2" style={{ marginBottom: '32px' }}>{t('contact.sendMessage')}</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={e => { e.preventDefault(); toast.success(t('contact.successMessage')); }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--neutral-700)' }}>{t('contact.yourName')}</label>
                <input type="text" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--neutral-700)' }}>{t('contact.yourPhone')}</label>
                <input type="tel" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--neutral-700)' }}>{t('contact.messageText')}</label>
                <textarea rows="5" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                <Send size={18} /> {t('contact.send')}
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="text-h2" style={{ marginBottom: '8px' }}>{t('contact.contactInfo')}</h2>
            
            <div className="card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-600)' }}>
                <Phone size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--neutral-500)', fontSize: '14px', marginBottom: '4px' }}>{t('contact.phone')}</div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--neutral-900)' }}>+998 90 123 45 67</div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-600)' }}>
                <Mail size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--neutral-500)', fontSize: '14px', marginBottom: '4px' }}>{t('contact.email')}</div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--neutral-900)' }}>support@nexusgaming.uz</div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-600)' }}>
                <MapPin size={24} />
              </div>
              <div>
                <div style={{ color: 'var(--neutral-500)', fontSize: '14px', marginBottom: '4px' }}>{t('contact.address')}</div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--neutral-900)' }}>{t('contact.addressValue')}</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ background: 'var(--surface-warm)', padding: '80px 0', borderTop: '1px solid var(--neutral-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="text-h2" style={{ marginBottom: '16px' }}>{t('contact.faqTitle')}</h2>
            <p className="text-body-lg">{t('contact.faqSubtitle')}</p>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <HelpCircle size={24} color="var(--brand-500)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{t('contact.faq1Title')}</h3>
                  <p className="text-body-lg" style={{ color: 'var(--neutral-600)' }}>{t('contact.faq1Desc')}</p>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <HelpCircle size={24} color="var(--brand-500)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{t('contact.faq2Title')}</h3>
                  <p className="text-body-lg" style={{ color: 'var(--neutral-600)' }}>{t('contact.faq2Desc')}</p>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <HelpCircle size={24} color="var(--brand-500)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{t('contact.faq3Title')}</h3>
                  <p className="text-body-lg" style={{ color: 'var(--neutral-600)' }}>{t('contact.faq3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
