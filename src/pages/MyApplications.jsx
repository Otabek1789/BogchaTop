import React, { useState } from 'react';
import { useKindergartens } from '../context/KindergartenContext';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Calendar, Clock, CheckCircle, XCircle, Coffee, BookOpen, Moon, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MyApplications.css';

export default function MyApplications() {
  const { applications } = useKindergartens();
  const { t } = useLanguage();
  const [expandedAppId, setExpandedAppId] = useState(null);

  const myApps = applications || [];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <span style={{ background: '#DEF7EC', color: '#03543F', padding: '4px 12px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} /> {t('myApps.approved')}</span>;
      case 'rejected':
        return <span style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '4px 12px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}><XCircle size={14} /> {t('myApps.rejected')}</span>;
      default:
        return <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 12px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {t('myApps.pending')}</span>;
    }
  };

  const timelineEvents = [
    { time: '08:00', title: t('myApps.arrival'), desc: t('myApps.arrivedDesc'), icon: <CheckCircle size={16} />, color: 'var(--brand-500)' },
    { time: '09:00', title: t('myApps.breakfast'), desc: t('myApps.breakfastDesc'), icon: <Coffee size={16} />, color: '#F59E0B' },
    { time: '10:30', title: t('myApps.lessonTime'), desc: t('myApps.lessonDesc'), icon: <BookOpen size={16} />, color: '#3B82F6' },
    { time: '11:45', title: t('myApps.playTime'), desc: t('myApps.playDesc'), icon: <Activity size={16} />, color: '#10B981' },
    { time: '13:00', title: t('myApps.lunch'), desc: t('myApps.lunchDesc'), icon: <Coffee size={16} />, color: '#F59E0B' },
    { time: '14:00', title: t('myApps.napTime'), desc: t('myApps.napDesc'), icon: <Moon size={16} />, color: '#8B5CF6' },
  ];

  return (
    <div className="container animate-fade-in-up" style={{ padding: '60px 1.5rem', minHeight: 'calc(100vh - 80px)' }}>
      <h1 className="text-display" style={{ marginBottom: '32px' }}>{t('myApps.pageTitle')}</h1>

      {myApps.length === 0 ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center', background: 'var(--surface-warm)' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--neutral-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
            <FileText size={40} color="var(--neutral-400)" />
          </div>
          <h2 className="text-h2" style={{ marginBottom: '16px', color: 'var(--neutral-900)' }}>{t('myApps.noApps')}</h2>
          <p style={{ color: 'var(--neutral-500)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>{t('myApps.noAppsDesc')}</p>
          <Link to="/kindergartens" className="btn btn-primary">{t('myApps.viewKindergartens')}</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {myApps.map((app) => (
            <div key={app.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--surface-warm)', border: '1px solid var(--neutral-200)', transition: 'transform 0.2s', cursor: 'pointer' }} onClick={() => app.status === 'approved' && setExpandedAppId(expandedAppId === app.id ? null : app.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 className="text-h3" style={{ marginBottom: '8px' }}>
                    <Link to={`/bogcha/${app.kindergartenId}`} style={{ color: 'var(--brand-600)', textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                      {app.kindergartenName}
                    </Link>
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--neutral-500)', fontSize: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(app.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  {getStatusBadge(app.status)}
                </div>
              </div>

              <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--neutral-200)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--neutral-500)', marginBottom: '4px' }}>{t('myApps.yourChild')}</div>
                  <div style={{ fontWeight: 500, color: 'var(--neutral-900)' }}>{app.childName} ({app.childAge} {t('myApps.yearsOld')})</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--neutral-500)', marginBottom: '4px' }}>{t('myApps.yourName')}</div>
                  <div style={{ fontWeight: 500, color: 'var(--neutral-900)' }}>{app.parentName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--neutral-500)', marginBottom: '4px' }}>{t('myApps.yourPhone')}</div>
                  <div style={{ fontWeight: 500, color: 'var(--neutral-900)' }}>{app.phone}</div>
                </div>
              </div>

              {app.status === 'approved' && expandedAppId === app.id && (
                <div className="timeline-container animate-fade-in-up">
                    <h4 style={{ marginBottom: '20px', color: 'var(--neutral-900)', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '10px' }}>
                     📅 {t('myApps.dailySchedule')}
                  </h4>
                  <div className="timeline">
                    {timelineEvents.map((event, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-time">{event.time}</div>
                        <div className="timeline-marker" style={{ background: event.color }}>
                          {event.icon}
                        </div>
                        <div className="timeline-content">
                          <h5>{event.title}</h5>
                          <p>{event.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {app.status === 'approved' && expandedAppId !== app.id && (
                <div style={{ textAlign: 'center', color: 'var(--brand-500)', fontSize: '14px', fontWeight: 500, marginTop: '8px' }}>
                  {t('myApps.clickToView')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
