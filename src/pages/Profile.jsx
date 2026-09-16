import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(user?.avatar || null);
  
  const [formData, setFormData] = useState({
    name: user?.displayName || 'Foydalanuvchi',
    email: user?.email || 'foydalanuvchi@mail.com',
    phone: '+998 90 123 45 67',
    address: 'Toshkent shahar, Yunusobod tumani'
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ displayName: formData.name, email: formData.email, avatar });
    setIsEditing(false);
    alert(t('profile.saveSuccess'));
    navigate('/');
  };

  return (
    <div className="container animate-fade-in-up" style={{ padding: '60px 1.5rem', maxWidth: '800px', minHeight: 'calc(100vh - 80px)' }}>
      <h1 className="text-display" style={{ marginBottom: '32px' }}>{t('profile.pageTitle')}</h1>

      <div className="card" style={{ padding: '32px', background: 'var(--surface-warm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--neutral-200)' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--brand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', color: 'var(--brand-700)', fontWeight: 'bold', overflow: 'hidden' }}>
              {avatar ? (
                <img src={avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                formData.name.charAt(0).toUpperCase()
              )}
            </div>
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
            <button type="button" onClick={() => fileInputRef.current.click()} style={{ position: 'absolute', bottom: 0, right: 0, width: '36px', height: '36px', borderRadius: '50%', background: 'var(--brand-500)', border: '4px solid var(--surface-warm)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-h2" style={{ marginBottom: '4px' }}>{formData.name}</h2>
            <p style={{ color: 'var(--neutral-500)' }}>{t('profile.platformUser')}</p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--neutral-700)' }}>{t('profile.fullName')}</label>
              <div style={{ position: 'relative' }}>
                <User size={20} color="var(--neutral-400)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                  style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: isEditing ? 'var(--surface)' : 'var(--neutral-100)', color: 'var(--neutral-900)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--neutral-700)' }}>{t('profile.emailLabel')}</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="var(--neutral-400)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: isEditing ? 'var(--surface)' : 'var(--neutral-100)', color: 'var(--neutral-900)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--neutral-700)' }}>{t('profile.phoneLabel')}</label>
              <div style={{ position: 'relative' }}>
                <Phone size={20} color="var(--neutral-400)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: isEditing ? 'var(--surface)' : 'var(--neutral-100)', color: 'var(--neutral-900)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--neutral-700)' }}>{t('profile.addressLabel')}</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={20} color="var(--neutral-400)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                  style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: isEditing ? 'var(--surface)' : 'var(--neutral-100)', color: 'var(--neutral-900)' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
            {isEditing ? (
              <>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">{t('profile.cancel')}</button>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} /> {t('profile.save')}
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="btn btn-primary">{t('profile.editProfile')}</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
