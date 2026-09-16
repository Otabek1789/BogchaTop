import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import CustomSelect from '../../components/CustomSelect';

export default function ChildrenTab() {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [filterGroup, setFilterGroup] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [children, setChildren] = useState([
    { id: 1, name: "Aliyev Vali", group: "Lochin", age: 5, parent: "Aliyev G'ani", phone: "+998 90 123 45 67" },
    { id: 2, name: "Karimova Madina", group: "Kichiktoy", age: 3, parent: "Karimova Ziyoda", phone: "+998 93 987 65 43" },
    { id: 3, name: "Sodiqov Jasur", group: "Quyoshcha", age: 4, parent: "Sodiqov Farhod", phone: "+998 99 111 22 33" },
    { id: 4, name: "Toshmatov Anvar", group: "Lochin", age: 6, parent: "Toshmatov O'ktam", phone: "+998 90 222 33 44" },
    { id: 5, name: "Murodova Asal", group: "Kichiktoy", age: 3, parent: "Murodova Gulnora", phone: "+998 93 333 44 55" },
    { id: 6, name: "Ismoilov Diyor", group: "Quyoshcha", age: 4, parent: "Ismoilov Bahodir", phone: "+998 94 444 55 66" },
    { id: 7, name: "Xalilova Iroda", group: "Lochin", age: 5, parent: "Xalilova Umida", phone: "+998 97 555 66 77" },
    { id: 8, name: "Olimov Bekzod", group: "Quyoshcha", age: 5, parent: "Olimov Rustam", phone: "+998 99 666 77 88" },
    { id: 9, name: "Yusupova Sevara", group: "Kichiktoy", age: 3, parent: "Yusupova Nargiza", phone: "+998 90 777 88 99" },
    { id: 10, name: "Nurmatov Aziz", group: "Lochin", age: 6, parent: "Nurmatov Akmal", phone: "+998 93 888 99 00" },
    { id: 11, name: "Qodirova Zebo", group: "Quyoshcha", age: 4, parent: "Qodirova Dildora", phone: "+998 94 999 00 11" },
    { id: 12, name: "Hasanov Sardor", group: "Kichiktoy", age: 3, parent: "Hasanov Alisher", phone: "+998 97 123 11 22" },
    { id: 13, name: "Ergasheva Laylo", group: "Lochin", age: 5, parent: "Ergasheva Dilnoza", phone: "+998 99 234 22 33" },
    { id: 14, name: "Tursunov Jahongir", group: "Quyoshcha", age: 4, parent: "Tursunov Murod", phone: "+998 90 345 33 44" },
    { id: 15, name: "Usmonova Nilufar", group: "Kichiktoy", age: 2, parent: "Usmonova Malika", phone: "+998 93 456 44 55" },
    { id: 16, name: "Botirov Sherzod", group: "Lochin", age: 6, parent: "Botirov Farrux", phone: "+998 94 567 55 66" },
    { id: 17, name: "Jalilova Shahnoza", group: "Quyoshcha", age: 4, parent: "Jalilova Nargiza", phone: "+998 97 678 66 77" },
    { id: 18, name: "Mamatov Bobur", group: "Kichiktoy", age: 3, parent: "Mamatov Sanjar", phone: "+998 99 789 77 88" },
    { id: 19, name: "Rustamova Kamola", group: "Lochin", age: 5, parent: "Rustamova Oydin", phone: "+998 90 890 88 99" },
    { id: 20, name: "Sobirov Temur", group: "Quyoshcha", age: 4, parent: "Sobirov Qodir", phone: "+998 93 901 99 00" },
  ]);

  const [formData, setFormData] = useState({ name: '', age: '', parent: '', phone: '', group: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (editingId) {
      setChildren(children.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
    } else {
      setChildren([{ ...formData, id: Date.now() }, ...children]);
    }
    closeModal();
  };

  const openEdit = (child) => {
    setFormData(child);
    setEditingId(child.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if(window.confirm(t('crm.confirmDelete'))) {
      setChildren(children.filter(c => c.id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', age: '', parent: '', phone: '', group: '' });
    setEditingId(null);
  };

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)' }}>{t('crm.childrenAndGroups')}</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} />{t('crm.addChild')}</button>
      </div>

      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--neutral-200)', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--neutral-100)', padding: '12px 16px', borderRadius: '8px' }}>
            <Search size={18} color="var(--neutral-500)" />
            <input 
              type="text" 
              placeholder={t('crm.searchPlaceholder')} 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--neutral-900)' }} 
            />
          </div>
          <div style={{ width: '220px' }}>
            <CustomSelect 
              value={filterGroup}
              onChange={setFilterGroup}
              options={[
                { value: '', label: t('crm.allGroups') },
                { value: 'lochin', label: t('crm.eagleGroup') },
                { value: 'kichiktoy', label: t('crm.kidGroup') },
                { value: 'quyoshcha', label: t('crm.sunGroup') }
              ]}
            />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--neutral-50)', color: 'var(--neutral-500)', fontSize: '14px', borderBottom: '1px solid var(--neutral-200)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>{t('crm.fullName')}</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>{t('crm.group')}</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>{t('crm.age')}</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>{t('crm.parent')}</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>{t('crm.phone')}</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>{t('crm.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {children.filter(c => {
              const matchesGroup = !filterGroup || c.group.toLowerCase() === filterGroup;
              const matchesSearch = !searchQuery || 
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                c.parent.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesGroup && matchesSearch;
            }).map(child => (
              <tr key={child.id} style={{ borderBottom: '1px solid var(--neutral-100)', color: 'var(--neutral-900)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{child.name}</td>
                <td style={{ padding: '16px 24px' }}>{child.group}</td>
                <td style={{ padding: '16px 24px' }}>{child.age}</td>
                <td style={{ padding: '16px 24px' }}>{child.parent}</td>
                <td style={{ padding: '16px 24px' }}>{child.phone}</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button onClick={() => openEdit(child)} style={{ background: 'transparent', border: 'none', color: 'var(--brand-500)', cursor: 'pointer', marginRight: '16px' }}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(child.id)} style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: 'var(--surface-warm)', padding: '32px', borderRadius: '16px', width: '400px', animation: 'fadeInUp 0.2s ease', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--neutral-900)' }}>{editingId ? t('crm.addChild') + " (" + t('crm.edit') + ")" : t('crm.addChild')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder=t('crm.fullName') style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <input type="text" value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} placeholder=t('crm.groupNameExample') style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} placeholder=t('crm.age') style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <input type="text" value={formData.parent} onChange={e => setFormData({...formData, parent: e.target.value})} placeholder=t('crm.parent') style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder=t('crm.phone') style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button onClick={closeModal} className="btn btn-outline">{t('crm.cancel')}</button>
                <button onClick={handleSave} className="btn btn-primary">{t('crm.save')}</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
