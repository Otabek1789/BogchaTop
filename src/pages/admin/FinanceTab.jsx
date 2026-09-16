import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function FinanceTab() {
  const { t } = useLanguage();
  const [toast, setToast] = useState('');

  const sendReceipt = () => {
    setToast(t('crm.receiptSuccess'));
    setTimeout(() => setToast(''), 3000);
  };

  const transactions = [
    { id: 1, type: "income", name: "To'lov - Aliyev Vali", date: "05.09.2026", amount: "+ 2 500 000 UZS" },
    { id: 2, type: "expense", name: "Oziq-ovqat xarajati", date: "04.09.2026", amount: "- 1 200 000 UZS" },
    { id: 3, type: "income", name: "To'lov - Karimova Madina", date: "03.09.2026", amount: "+ 2 500 000 UZS" },
    { id: 4, type: "income", name: "To'lov - Sodiqov Jasur", date: "03.09.2026", amount: "+ 2 500 000 UZS" },
    { id: 5, type: "expense", name: "Elektr energiyasi", date: "02.09.2026", amount: "- 850 000 UZS" },
    { id: 6, type: "income", name: "To'lov - Toshmatov Anvar", date: "02.09.2026", amount: "+ 2 500 000 UZS" },
    { id: 7, type: "expense", name: "Xodimlar oyligi", date: "01.09.2026", amount: "- 18 500 000 UZS" },
    { id: 8, type: "income", name: "To'lov - Murodova Asal", date: "01.09.2026", amount: "+ 2 500 000 UZS" },
    { id: 9, type: "income", name: "To'lov - Ismoilov Diyor", date: "01.09.2026", amount: "+ 2 500 000 UZS" },
    { id: 10, type: "expense", name: "Suv to'lovi", date: "31.08.2026", amount: "- 150 000 UZS" },
    { id: 11, type: "income", name: "To'lov - Xalilova Iroda", date: "30.08.2026", amount: "+ 2 500 000 UZS" },
    { id: 12, type: "expense", name: "O'quv qurollari", date: "29.08.2026", amount: "- 1 800 000 UZS" },
    { id: 13, type: "income", name: "To'lov - Olimov Bekzod", date: "29.08.2026", amount: "+ 2 500 000 UZS" },
    { id: 14, type: "income", name: "To'lov - Yusupova Sevara", date: "28.08.2026", amount: "+ 2 500 000 UZS" },
    { id: 15, type: "expense", name: "Bog'cha remont ishlari", date: "28.08.2026", amount: "- 4 200 000 UZS" },
    { id: 16, type: "income", name: "To'lov - Nurmatov Aziz", date: "27.08.2026", amount: "+ 2 500 000 UZS" },
    { id: 17, type: "income", name: "To'lov - Qodirova Zebo", date: "26.08.2026", amount: "+ 2 500 000 UZS" },
    { id: 18, type: "expense", name: "Xo'jalik mollari", date: "25.08.2026", amount: "- 600 000 UZS" },
    { id: 19, type: "income", name: "To'lov - Hasanov Sardor", date: "25.08.2026", amount: "+ 2 500 000 UZS" },
    { id: 20, type: "income", name: "To'lov - Ergasheva Laylo", date: "24.08.2026", amount: "+ 2 500 000 UZS" }
  ];

  const chartData = [
    { name: 'Yan', kirim: 38000000, chiqim: 12000000 },
    { name: 'Fev', kirim: 42000000, chiqim: 14000000 },
    { name: 'Mar', kirim: 39000000, chiqim: 15000000 },
    { name: 'Apr', kirim: 45000000, chiqim: 11000000 },
    { name: 'May', kirim: 43000000, chiqim: 13000000 },
    { name: 'Iyun', kirim: 48000000, chiqim: 12500000 },
  ];

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)' }}>{t('crm.financeAndPayments')}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {toast && <span style={{ color: '#10B981', fontWeight: 500 }}>{toast}</span>}
          <button onClick={sendReceipt} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} />{t('crm.sendReceipt')}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#ECFDF5', padding: '24px', borderRadius: '16px', border: '1px solid #A7F3D0' }}>
          <div style={{ color: '#047857', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={16} />{t('crm.thisMonthIncome')}</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#064E3B' }}>45 000 000 UZS</div>
        </div>
        <div style={{ background: '#FEF2F2', padding: '24px', borderRadius: '16px', border: '1px solid #FECACA' }}>
          <div style={{ color: '#B91C1C', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowDownRight size={16} />{t('crm.expenses')}</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#7F1D1D' }}>12 500 000 UZS</div>
        </div>
        <div style={{ background: '#FFFBEB', padding: '24px', borderRadius: '16px', border: '1px solid #FDE68A' }}>
          <div style={{ color: '#B45309', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DollarSign size={16} />{t('crm.expected')}</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#78350F' }}>7 500 000 UZS</div>
        </div>
      </div>

      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--neutral-900)', marginBottom: '24px' }}>{t('adminExtra.financeDynamics')}</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-200)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dx={-10} tickFormatter={(val) => `${val / 1000000}M`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 600 }}
                formatter={(value) => [`${value.toLocaleString()} UZS`, '']}
                labelStyle={{ color: 'var(--neutral-500)', marginBottom: '4px' }}
                cursor={{ fill: 'var(--neutral-100)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="kirim" name={t("adminExtra.incomeLabel")} fill="#10B981" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="chiqim" name={t("adminExtra.expenseLabel")} fill="#EF4444" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--neutral-200)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--neutral-900)' }}>{t('crm.recentOps')}</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--neutral-50)', color: 'var(--neutral-500)', fontSize: '16px', borderBottom: '1px solid var(--neutral-200)' }}>
              <th style={{ padding: '24px 32px', fontWeight: 600 }}>{t('crm.desc')}</th>
              <th style={{ padding: '24px 32px', fontWeight: 600 }}>{t('crm.date')}</th>
              <th style={{ padding: '24px 32px', fontWeight: 600, textAlign: 'right' }}>{t('crm.amount')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--neutral-100)', color: 'var(--neutral-900)' }}>
                <td style={{ padding: '24px 32px', fontWeight: 500, fontSize: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: item.type === 'income' ? '#ECFDF5' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.type === 'income' ? '#10B981' : '#EF4444' }}>
                      {item.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                    </div>
                    {item.name}
                  </div>
                </td>
                <td style={{ padding: '24px 32px', color: 'var(--neutral-500)', fontSize: '16px' }}>{item.date}</td>
                <td style={{ padding: '24px 32px', textAlign: 'right', fontWeight: 700, fontSize: '18px', color: item.type === 'income' ? '#10B981' : '#EF4444' }}>
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
