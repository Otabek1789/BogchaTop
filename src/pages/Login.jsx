import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { Mail, KeyRound, AlertCircle, ArrowLeft, Moon, Sun, Globe, User, ShieldCheck } from 'lucide-react';
import './Auth.css';

export default function Login({ defaultRegister = false }) {
  const { loginWithEmail, registerWithEmail, sendOTP, verifyOTP, signInWithGoogle } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // UI States
  const [isRegister, setIsRegister] = useState(defaultRegister);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Forgot Password / OTP Direct Login States
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = enter email, 2 = enter code
  const [forgotCode, setForgotCode] = useState('');

  // Status
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsRegister(defaultRegister);
    setIsForgotPassword(false);
    setForgotStep(1);
    setForgotCode('');
    setError('');
    setMessage('');
  }, [defaultRegister]);

  useEffect(() => {
    const handlePopState = () => {
      setIsRegister(window.location.pathname === '/register');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const togglePanel = (toRegister) => {
    setIsRegister(toRegister);
    setIsForgotPassword(false);
    setForgotStep(1);
    setForgotCode('');
    setError('');
    setMessage('');
    try {
      window.history.replaceState(null, '', toRegister ? '/register' : '/login');
    } catch (_) {}
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('auth.fillEmailPass', "Iltimos, email va parolingizni kiriting"));
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      const result = await loginWithEmail(email, password);
      if (result && result.success) {
        toast.success(t('auth.loginSuccess', "Muvaffaqiyatli kirdingiz!"));
        navigate(result.isAdmin ? '/admin' : '/');
      } else {
        setError(result?.error || t('auth.invalidCredentials', "Email yoki parol noto'g'ri"));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(t('auth.serverError', "Server bilan ulanishda xatolik."));
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError(t('auth.fillAllFields', "Iltimos, barcha maydonlarni to'ldiring"));
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const result = await registerWithEmail(name, email, password);
      if (result && result.success) {
        toast.success(t('auth.registerSuccess', "Muvaffaqiyatli ro'yxatdan o'tdingiz!"));
        navigate(result.isAdmin ? '/admin' : '/');
      } else {
        setError(result?.error || t('auth.invalidCredentials', "Ro'yxatdan o'tishda xatolik"));
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(t('auth.serverError', "Server bilan ulanishda xatolik."));
    } finally {
      setLoading(false);
    }
  };

  const openForgotPassword = (e) => {
    e.preventDefault();
    setIsForgotPassword(true);
    setForgotStep(1);
    setForgotCode('');
    setError('');
    setMessage('');
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (forgotStep === 1) {
      if (!email) {
        setError(t('auth.enterEmailFirst', "Iltimos, elektron pochtangizni kiriting"));
        return;
      }
      setError('');
      setMessage('');
      setLoading(true);

      const result = await sendOTP(email);
      if (result.success) {
        toast.success(result.message || t('auth.codeSent', "Tasdiqlash kodi pochtangizga yuborildi!"));
        setMessage(result.message || t('auth.codeSent', "Email pochtangizga tasdiqlash kodi yuborildi:"));
        setForgotStep(2);
      } else {
        setError(result.error || t('auth.serverError', "Kod yuborishda xatolik yuz berdi"));
      }
      setLoading(false);
    } else {
      if (!forgotCode) {
        setError(t('auth.enterCode', "Iltimos, tasdiqlash kodini kiriting"));
        return;
      }
      setError('');
      setMessage('');
      setLoading(true);

      const result = await verifyOTP(email, forgotCode);
      if (result.success) {
        toast.success(t('auth.loginSuccess', "Muvaffaqiyatli kirdingiz!"));
        navigate(result.isAdmin ? '/admin' : '/');
      } else {
        setError(result.error || t('auth.invalidCredentials', "Kod noto'g'ri. Qaytadan tekshiring."));
      }
      setLoading(false);
    }
  };

  const handleSocialMock = async (platform) => {
    if (platform === 'Google' && signInWithGoogle) {
      setLoading(true);
      setError('');
      const res = await signInWithGoogle();
      if (res.success) {
        navigate(res.isAdmin ? '/admin' : '/');
      } else {
        setError(res.error || t('auth.serverError', "Xatolik yuz berdi"));
      }
      setLoading(false);
      return;
    }
    
    toast.error(`${platform} ` + (t('auth.socialNotReady') || 'orqali kirish hozircha tayyor emas'));
  };

  return (
    <div className="auth-wrapper">
      
      {/* Absolute Header Controls */}
      <div className="auth-back-action">
        <Link to="/" className="auth-icon-btn" title={t('auth.goBack', "Ortga")}>
          <ArrowLeft size={20} />
        </Link>
      </div>
      
      <div className="auth-header-actions">
        <div className="auth-lang-switcher">
          <button 
            type="button"
            className={`auth-lang-btn ${lang === 'uz' ? 'active' : ''}`} 
            onClick={() => setLang('uz')}
          >
            UZ
          </button>
          <button 
            type="button"
            className={`auth-lang-btn ${lang === 'ru' ? 'active' : ''}`} 
            onClick={() => setLang('ru')}
          >
            RU
          </button>
          <button 
            type="button"
            className={`auth-lang-btn ${lang === 'en' ? 'active' : ''}`} 
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
        <button className="auth-icon-btn" onClick={toggleTheme} title={t('auth.toggleTheme', "Mavzuni o'zgartirish")}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      <div className={`auth-container ${isRegister ? 'active' : ''}`}>
        
        {/* LOGIN FORM (Right) */}
        <div className="auth-form-box login">
          {isForgotPassword ? (
            <form onSubmit={handleForgotSubmit}>
              <h1>{t('auth.forgotPassword', "Parolni tiklash")}</h1>
              
              {error && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              
              {message && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                  <AlertCircle size={16} /> {message}
                </div>
              )}

              {forgotStep === 1 ? (
                <>
                  <p style={{ margin: '15px 0 20px', color: 'var(--neutral-600)', fontSize: '14px', lineHeight: '1.5' }}>
                    {t('auth.forgotDesc', "Gmail pochtangizni kiriting. Sizga 6 xonali tasdiqlash kodi yuboriladi va u orqali avtomatik saytga kirasiz.")}
                  </p>
                  <div className="auth-input-box">
                    <input 
                      type="email" 
                      placeholder={t('auth.email', "Email manzilingiz")} 
                      required 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      autoFocus
                    />
                    <Mail size={20} />
                  </div>
                  <button type="submit" className="auth-btn" disabled={loading} style={{ marginTop: '16px' }}>
                    {loading ? t('auth.wait', 'Yuborilmoqda...') : t('auth.sendCodeBtn', "Kodni yuborish")}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setIsForgotPassword(false); setError(''); setMessage(''); }} 
                    style={{ background: 'none', border: 'none', color: 'var(--brand-500)', marginTop: '20px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                  >
                    ← {t('auth.backToLogin', "Kirish sahifasiga qaytish")}
                  </button>
                </>
              ) : (
                <>
                  <p style={{ margin: '15px 0 20px', color: 'var(--neutral-600)', fontSize: '14px', lineHeight: '1.5' }}>
                    {t('auth.codeSentTo', "Tasdiqlash kodi quyidagi pochtaga yuborildi:")} <br />
                    <strong style={{ color: 'var(--neutral-900)' }}>{email}</strong>
                  </p>
                  <div className="auth-input-box">
                    <input 
                      type="text" 
                      placeholder={t('auth.verifyCode', "Tasdiqlash kodi")} 
                      required 
                      maxLength={6}
                      value={forgotCode} 
                      onChange={e => setForgotCode(e.target.value)} 
                      style={{ letterSpacing: '4px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }} 
                      autoFocus
                    />
                    <ShieldCheck size={20} />
                  </div>
                  <button type="submit" className="auth-btn" disabled={loading} style={{ marginTop: '16px' }}>
                    {loading ? t('auth.checking', 'Tekshirilmoqda...') : t('auth.verifyAndLoginBtn', "Tasdiqlash va saytga kirish")}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setForgotStep(1); setForgotCode(''); setError(''); setMessage(''); }} 
                    style={{ background: 'none', border: 'none', color: 'var(--neutral-500)', marginTop: '20px', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
                  >
                    ← {t('auth.changeEmail', "Boshqa email kiritish")}
                  </button>
                </>
              )}
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <h1>{t('auth.loginHeading', "Kirish")}</h1>
              
              {error && !isRegister && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              
              {message && !isRegister && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                  <AlertCircle size={16} /> {message}
                </div>
              )}

              <div className="auth-input-box">
                <input type="email" placeholder={t('auth.email', "Email manzilingiz")} required value={email} onChange={e => setEmail(e.target.value)} />
                <Mail size={20} />
              </div>
              <div className="auth-input-box">
                <input type="password" placeholder={t('auth.password', "Parolingiz")} required value={password} onChange={e => setPassword(e.target.value)} />
                <KeyRound size={20} />
              </div>
              <div className="auth-forgot-link">
                <a href="#" onClick={openForgotPassword}>{t('auth.forgotPassword', "Parolni unutdingizmi?")}</a>
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? t('auth.wait', 'Yuborilmoqda...') : t('auth.loginBtn', 'Tizimga kirish')}
              </button>
              <p>{t('auth.orLoginSocial', "yoki ijtimoiy tarmoqlar orqali kiring")}</p>
              <div className="auth-social-icons">
                <button type="button" onClick={() => handleSocialMock('Google')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                <button type="button" onClick={() => handleSocialMock('Facebook')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color: '#1877F2'}}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button type="button" onClick={() => handleSocialMock('Apple')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.052 1.527-.074 2.124-.984 3.96-.984 1.815 0 2.383.984 3.96.958 1.628-.027 2.65-1.524 3.633-2.983 1.144-1.674 1.616-3.298 1.637-3.385-.037-.015-3.176-1.216-3.21-4.858-.029-3.045 2.492-4.508 2.607-4.577-1.428-2.086-3.627-2.37-4.437-2.417-2.032-.128-4.047 1.13-5.078 1.13zm1.186-5.834c.813-.984 1.36-2.355 1.21-3.712-1.155.047-2.585.77-3.419 1.74-.666.772-1.32 2.164-1.144 3.498 1.295.101 2.544-.537 3.353-1.526z"/>
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* REGISTER FORM (Left) */}
        <div className="auth-form-box register">
          <form onSubmit={handleRegisterSubmit}>
            <h1>{t('auth.registrationHeading', "Ro'yxatdan o'tish")}</h1>
            
            {error && isRegister && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {message && isRegister && (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '10px', borderRadius: '8px', margin: '15px 0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                <AlertCircle size={16} /> {message}
              </div>
            )}

            <div className="auth-input-box">
              <input type="text" placeholder={t('auth.username', "Ismingiz")} required value={name} onChange={e => setName(e.target.value)} />
              <User size={20} />
            </div>
            <div className="auth-input-box">
              <input type="email" placeholder={t('auth.email', "Email manzilingiz")} required value={email} onChange={e => setEmail(e.target.value)} />
              <Mail size={20} />
            </div>
            <div className="auth-input-box">
              <input type="password" placeholder={t('auth.password', "Parolingiz")} required value={password} onChange={e => setPassword(e.target.value)} />
              <KeyRound size={20} />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? t('auth.wait', 'Iltimos, kuting...') : t('auth.registerBtn', "Ro'yxatdan o'tish")}
            </button>
            <p>{t('auth.orRegisterSocial', "yoki quyidagilar orqali ro'yxatdan o'ting")}</p>
            <div className="auth-social-icons">
              <button type="button" onClick={() => handleSocialMock('Google')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button type="button" onClick={() => handleSocialMock('Facebook')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color: '#1877F2'}}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button type="button" onClick={() => handleSocialMock('Apple')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.052 1.527-.074 2.124-.984 3.96-.984 1.815 0 2.383.984 3.96.958 1.628-.027 2.65-1.524 3.633-2.983 1.144-1.674 1.616-3.298 1.637-3.385-.037-.015-3.176-1.216-3.21-4.858-.029-3.045 2.492-4.508 2.607-4.577-1.428-2.086-3.627-2.37-4.437-2.417-2.032-.128-4.047 1.13-5.078 1.13zm1.186-5.834c.813-.984 1.36-2.355 1.21-3.712-1.155.047-2.585.77-3.419 1.74-.666.772-1.32 2.164-1.144 3.498 1.295.101 2.544-.537 3.353-1.526z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* TOGGLE PANELS */}
        <div className="auth-toggle-box">
          <div className="auth-toggle-panel toggle-left">
            <h1>{t('auth.helloWelcome', "Xush kelibsiz!")}</h1>
            <p>{t('auth.dontHaveAccount', "Profilingiz yo'qmi? Hoziroq ro'yxatdan o'ting")}</p>
            <button className="auth-btn" onClick={() => togglePanel(true)}>{t('auth.registerBtn', "Ro'yxatdan o'tish")}</button>
          </div>

          <div className="auth-toggle-panel toggle-right">
            <h1>{t('auth.welcomeBack', "Qaytganingizdan xursandmiz!")}</h1>
            <p>{t('auth.alreadyHaveAccount', "Profilingiz bormi? Tizimga kiring")}</p>
            <button className="auth-btn" onClick={() => togglePanel(false)}>{t('auth.loginBtn', "Tizimga kirish")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
