import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGamer } from '../context/GamerContext';
import { soundFX } from '../utils/soundFX';
import { 
  User, Mail, Phone, MapPin, Save, Camera, Shield, Package, Heart, 
  Award, Zap, Crown, Flame, CheckCircle2, Lock, ArrowRight, Sparkles, Cpu, Crosshair
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { 
    xp, level, currentLevelXp, nextLevelXp, progressPercent, 
    rankTitle, rankBadge, discountPercent, unlockedBadges, allBadges, completedQuests 
  } = useGamer();

  const [avatar, setAvatar] = useState(user?.photoURL || null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.displayName || 'Gamer Yahyo',
    email: user?.email || 'gamer@nexusgaming.uz',
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
    soundFX.playClick();
    updateUser({ displayName: formData.name, email: formData.email, photoURL: avatar });
    toast.success("Profil ma'lumotlari muvaffaqiyatli saqlandi! ✨");
  };

  return (
    <div className="container animate-fade-in-up" style={{ padding: '40px 1.5rem 80px', maxWidth: '900px', minHeight: 'calc(100vh - 80px)' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 className="text-h1" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)', margin: 0 }}>
          GEYMER PASPORTI & PROFIL
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/builder" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px' }}>
            <Cpu size={15} color="#00f0ff" /> PC Builder
          </Link>
          <Link to="/game" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
            <Crosshair size={15} /> Rush Mid
          </Link>
        </div>
      </div>

      {/* GAMER PASSPORT / LEVEL & XP CARD */}
      <div className="card glass" style={{ 
        padding: '28px', 
        marginBottom: '28px',
        background: 'radial-gradient(circle at 90% 10%, rgba(0, 240, 255, 0.15) 0%, rgba(112, 0, 255, 0.1) 40%, var(--surface-warm) 80%)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '84px', 
                height: '84px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #00f0ff, #7000ff)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '32px', 
                color: '#000', 
                fontWeight: 'bold', 
                overflow: 'hidden',
                border: '3px solid #00f0ff',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
              }}>
                {avatar ? (
                  <img src={avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  formData.name.charAt(0).toUpperCase()
                )}
              </div>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
              <button 
                type="button" 
                onClick={() => fileInputRef.current.click()} 
                style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', background: 'var(--neon-cyan)', border: '2px solid #0b0f19', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Rasmni yangilash"
              >
                <Camera size={13} />
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--neutral-900)', margin: 0 }}>{formData.name}</h2>
                <span style={{ 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))', 
                  color: '#fbbf24', 
                  border: '1px solid rgba(245, 158, 11, 0.4)', 
                  padding: '3px 10px', 
                  borderRadius: '12px', 
                  fontSize: '12px', 
                  fontWeight: 800 
                }}>
                  {rankBadge} {rankTitle}
                </span>
                {user?.isAdmin && (
                  <span style={{ background: 'rgba(139,92,246,0.2)', color: '#c084fc', border: '1px solid rgba(139,92,246,0.4)', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                    🛡️ ADMIN
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--neutral-400)', fontSize: '13.5px', margin: '4px 0 0' }}>{formData.email}</p>
            </div>
          </div>

          {/* Level Stats Pill */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.4)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '12px 20px', 
            textAlign: 'right' 
          }}>
            <span style={{ fontSize: '11px', color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Umumiy Tajriba</span>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#00f0ff', fontFamily: 'var(--font-gaming)' }}>
              {xp} <span style={{ fontSize: '13px', color: 'var(--neutral-400)' }}>XP</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--neutral-400)', marginBottom: '6px', fontWeight: 600 }}>
            <span>{level}-Daraja (Level {level})</span>
            <span>Keyingi Levelgacha: <strong>{nextLevelXp - currentLevelXp} XP</strong> qoldi</span>
          </div>
          <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #00f0ff 0%, #7000ff 100%)', 
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)',
              borderRadius: '10px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Perks & Discount Banner */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '12px 16px', 
          background: 'rgba(16, 185, 129, 0.1)', 
          border: '1px solid rgba(16, 185, 129, 0.3)', 
          borderRadius: '10px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '13.5px', fontWeight: 600 }}>
            <Sparkles size={16} />
            <span>Sizning shaxsiy sodiqlik chegirmangiz: <strong>{discountPercent > 0 ? `${discountPercent}% chegirma aktiv` : '5-Levelda 5% ochiladi'}</strong></span>
          </div>
          <span style={{ fontSize: '12px', color: '#6ee7b7' }}>Har qanday xariddan +XP beriladi!</span>
        </div>
      </div>

      {/* ACHIEVEMENTS / BADGES GRID */}
      <div className="card" style={{ padding: '28px', marginBottom: '28px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} color="#fbbf24" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Geymer Yutuqlari ({unlockedBadges.length}/{allBadges.length})</h3>
          </div>
          <span style={{ fontSize: '12.5px', color: 'var(--neutral-400)' }}>Yutuqlar ochilganda +150 XP beriladi</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
          {allBadges.map((b) => {
            const isUnlocked = unlockedBadges.includes(b.id);
            return (
              <div 
                key={b.id} 
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: isUnlocked ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)', 
                  border: isUnlocked ? `1px solid ${b.color}40` : '1px solid var(--card-border)',
                  opacity: isUnlocked ? 1 : 0.45,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '10px', 
                  background: isUnlocked ? `${b.color}20` : 'rgba(255, 255, 255, 0.05)', 
                  border: `1px solid ${isUnlocked ? b.color : 'transparent'}`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: isUnlocked ? b.color : '#64748b',
                  flexShrink: 0
                }}>
                  {isUnlocked ? <CheckCircle2 size={20} /> : <Lock size={16} />}
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px', color: isUnlocked ? 'var(--neutral-900)' : 'var(--neutral-500)' }}>
                    {b.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--neutral-400)', margin: 0, lineHeight: 1.4 }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT PERSONAL INFO FORM */}
      <div className="card" style={{ padding: '28px', background: 'var(--surface-warm)', border: '1px solid var(--card-border)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 20px', color: 'var(--neutral-900)' }}>
          Shaxsiy Ma'lumotlar & Manzil
        </h3>

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-400)', marginBottom: '6px' }}>
                Gamer Taxallusi (Ism)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', padding: '10px 14px' }}>
                <User size={18} color="var(--neon-cyan)" />
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ background: 'transparent', border: 'none', color: 'var(--neutral-900)', outline: 'none', width: '100%', fontSize: '14px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-400)', marginBottom: '6px' }}>
                Elektron pochta
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', padding: '10px 14px' }}>
                <Mail size={18} color="var(--neon-cyan)" />
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ background: 'transparent', border: 'none', color: 'var(--neutral-900)', outline: 'none', width: '100%', fontSize: '14px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-400)', marginBottom: '6px' }}>
                Telefon raqam
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', padding: '10px 14px' }}>
                <Phone size={18} color="var(--neon-cyan)" />
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ background: 'transparent', border: 'none', color: 'var(--neutral-900)', outline: 'none', width: '100%', fontSize: '14px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-400)', marginBottom: '6px' }}>
                Yetkazib berish manzili
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', borderRadius: '10px', padding: '10px 14px' }}>
                <MapPin size={18} color="var(--neon-cyan)" />
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ background: 'transparent', border: 'none', color: 'var(--neutral-900)', outline: 'none', width: '100%', fontSize: '14px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/orders" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Package size={14} /> Buyurtmalarim
              </Link>
              <Link to="/favorites" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Heart size={14} /> Sevimlilar
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="btn btn-cyber" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  <Shield size={14} /> Admin Panel
                </Link>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
              <Save size={16} /> Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

