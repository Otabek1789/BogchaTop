import React, { useState } from 'react';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import CustomSelect from '../../components/CustomSelect';

export default function AttendanceTab() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState('children');
  const [filterGroup, setFilterGroup] = useState('lochin');

  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: "Aliyev Vali", status: "present" },
    { id: 2, name: "Karimova Madina", status: "absent" },
    { id: 3, name: "Sodiqov Jasur", status: "present" },
    { id: 4, name: "Toshmatov Anvar", status: "present" },
    { id: 5, name: "Murodova Asal", status: "present" },
    { id: 6, name: "Ismoilov Diyor", status: "absent" },
    { id: 7, name: "Xalilova Iroda", status: "present" },
    { id: 8, name: "Olimov Bekzod", status: "none" },
    { id: 9, name: "Yusupova Sevara", status: "present" },
    { id: 10, name: "Nurmatov Aziz", status: "present" },
    { id: 11, name: "Qodirova Zebo", status: "absent" },
    { id: 12, name: "Hasanov Sardor", status: "present" },
    { id: 13, name: "Ergasheva Laylo", status: "present" },
    { id: 14, name: "Tursunov Jahongir", status: "none" },
    { id: 15, name: "Usmonova Nilufar", status: "present" },
    { id: 16, name: "Botirov Sherzod", status: "present" },
    { id: 17, name: "Jalilova Shahnoza", status: "absent" },
    { id: 18, name: "Mamatov Bobur", status: "present" },
    { id: 19, name: "Rustamova Kamola", status: "present" },
    { id: 20, name: "Sobirov Temur", status: "present" }
  ]);

  const updateStatus = (id, newStatus) => {
    setAttendanceList(attendanceList.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)' }}>{t('crm.attendance')}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--neutral-100)', padding: '4px', borderRadius: '8px' }}>
          <button 
            onClick={() => setActiveView('children')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeView === 'children' ? 'var(--surface-warm)' : 'transparent', color: activeView === 'children' ? 'var(--neutral-900)' : 'var(--neutral-500)', fontWeight: 500, cursor: 'pointer', boxShadow: activeView === 'children' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}
          >{t('crm.children')}</button>
          <button 
            onClick={() => setActiveView('staff')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeView === 'staff' ? 'var(--surface-warm)' : 'transparent', color: activeView === 'staff' ? 'var(--neutral-900)' : 'var(--neutral-500)', fontWeight: 500, cursor: 'pointer', boxShadow: activeView === 'staff' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}
          >{t('crm.staff')}</button>
        </div>
      </div>

      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--neutral-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--neutral-700)' }}>
            <Calendar size={20} />
            <span style={{ fontWeight: 600 }}>{t('crm.today')} {new Date().toLocaleDateString('uz-UZ')}</span>
          </div>
          <div style={{ width: '200px' }}>
            <CustomSelect 
              value={filterGroup}
              onChange={setFilterGroup}
              options={[
                { value: 'lochin', label: t('crm.eagleGroup') },
                { value: 'kichiktoy', label: t('crm.kidGroup') }
              ]}
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {attendanceList.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--neutral-50)', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
              <div style={{ fontWeight: 500, color: 'var(--neutral-900)' }}>{item.name}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => updateStatus(item.id, 'present')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '50%', border: 'none', background: item.status === 'present' ? '#10B981' : 'var(--neutral-200)', color: item.status === 'present' ? 'white' : 'var(--neutral-500)', cursor: 'pointer', transition: '0.2s', width: '40px', height: '40px' }} title={t('crm.arrived')}>
                  <CheckCircle2 size={24} />
                </button>
                <button onClick={() => updateStatus(item.id, 'absent')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '50%', border: 'none', background: item.status === 'absent' ? '#EF4444' : 'var(--neutral-200)', color: item.status === 'absent' ? 'white' : 'var(--neutral-500)', cursor: 'pointer', transition: '0.2s', width: '40px', height: '40px' }} title={t('crm.notArrived')}>
                  <XCircle size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
