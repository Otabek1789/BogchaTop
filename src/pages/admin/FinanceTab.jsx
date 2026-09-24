import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DollarSign, ArrowUpRight, ArrowDownRight, FileText, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import toast from 'react-hot-toast';

export default function FinanceTab() {
  const { t } = useLanguage();

  const downloadReport = () => {
    toast.success("Moliya hisoboti (PDF/Excel) yuklab olindi! 📊");
  };

  const transactions = [
    { id: 1, type: "income", name: "PlayStation 5 Pro sotuvi - Javohir T.", date: "21.02.2025", amount: "+ 9 800 000 UZS", method: "Click" },
    { id: 2, type: "expense", name: "Razer ulgurji partiya importi", date: "20.02.2025", amount: "- 18 500 000 UZS", method: "Bank" },
    { id: 3, type: "income", name: "Razer Viper V3 Pro - Azizbek R.", date: "20.02.2025", amount: "+ 1 950 000 UZS", method: "Payme" },
    { id: 4, type: "income", name: "ASUS ROG SCAR 18 sotuvi - Shoxrux M.", date: "19.02.2025", amount: "+ 42 500 000 UZS", method: "Naqd" },
    { id: 5, type: "expense", name: "Kuryerlik va yetkazib berish xizmati", date: "18.02.2025", amount: "- 2 400 000 UZS", method: "Bank" },
    { id: 6, type: "income", name: "Samsung Odyssey G9 Monitor - Bekzod O.", date: "18.02.2025", amount: "+ 18 900 000 UZS", method: "Click" },
    { id: 7, type: "income", name: "Black Myth: Wukong Litsenziyalari", date: "17.02.2025", amount: "+ 4 680 000 UZS", method: "Payme" }
  ];

  const chartData = [
    { name: 'Sentabr', kirim: 68000000, chiqim: 22000000 },
    { name: 'Oktabr', kirim: 92000000, chiqim: 31000000 },
    { name: 'Noyabr', kirim: 145000000, chiqim: 55000000 },
    { name: 'Dekabr', kirim: 230000000, chiqim: 85000000 },
    { name: 'Yanvar', kirim: 178000000, chiqim: 64000000 },
    { name: 'Fevral', kirim: 215000000, chiqim: 72000000 },
  ];

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)' }}>
            {t('admin.finance').toUpperCase()}
          </h2>
          <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '2px' }}>
            {t('admin.panelSubtitle')}
          </p>
        </div>

        <button onClick={downloadReport} className="btn btn-cyber" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} /> Hisobotni yuklash
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '22px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <div style={{ color: '#10b981', fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={16} /> Bu oydagi savdo tushumi
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--neutral-900)' }}>215 000 000 UZS</div>
        </div>

        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '22px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
          <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowDownRight size={16} /> Xarajatlar (Ulgurji import & logistika)
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--neutral-900)' }}>72 000 000 UZS</div>
        </div>

        <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '22px', borderRadius: '16px', border: '1px solid rgba(0, 240, 255, 0.25)' }}>
          <div style={{ color: '#00f0ff', fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DollarSign size={16} /> Sof foyda (Marja)
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--neutral-900)' }}>143 000 000 UZS</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '20px' }}>
          Oylik Daromad va Xarajat Taqqoslanishi
        </h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-200)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dx={-10} tickFormatter={(val) => `${val / 1000000}M`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface-warm)', borderRadius: '8px', border: '1px solid var(--neutral-200)' }}
                formatter={(value) => [`${value.toLocaleString()} UZS`, '']}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="kirim" name="Savdo tushumi" fill="#00f0ff" radius={[4, 4, 0, 0]} barSize={22} />
              <Bar dataKey="chiqim" name="Xarajatlar" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--neutral-200)' }}>
          <strong style={{ color: 'var(--neutral-900)' }}>So'nggi moliyaviy operatsiyalar</strong>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', color: 'var(--neutral-500)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Sana</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Operatsiya tafsiloti</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>To'lov usuli</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Summa</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tr => (
              <tr key={tr.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--neutral-500)' }}>{tr.date}</td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--neutral-900)' }}>{tr.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--neutral-700)' }}>{tr.method}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: tr.type === 'income' ? '#10b981' : '#ef4444' }}>
                  {tr.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
