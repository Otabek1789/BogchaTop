import React from 'react';
import { Users, Activity, ShieldCheck, DollarSign, Bell } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function DashboardTab() {
  const { t } = useLanguage();

  const statCards = [
    { title: t('crm.totalChildren'), value: "142", icon: <Users size={24} color="#3B82F6" />, bg: "#EFF6FF" },
    { title: t('crm.emptySeats'), value: "8", icon: <Activity size={24} color="#10B981" />, bg: "#ECFDF5" },
    { title: t('crm.staff'), value: "24", icon: <ShieldCheck size={24} color="#F59E0B" />, bg: "#FFFBEB" },
    { title: t('crm.monthlyIncome'), value: "45M UZS", icon: <DollarSign size={24} color="#8B5CF6" />, bg: "#F5F3FF" },
  ];

  const chartData = [
    { name: 'Yanvar', income: 38000000 },
    { name: 'Fevral', income: 42000000 },
    { name: 'Mart', income: 39000000 },
    { name: 'Aprel', income: 45000000 },
    { name: 'May', income: 43000000 },
    { name: 'Iyun', income: 48000000 },
  ];

  const pieData = [
    { name: 'Davlat bog\'chalari', value: 45 },
    { name: 'Xususiy bog\'chalar', value: 30 },
    { name: 'Ingliz tiliga ixtisoslashgan', value: 15 },
    { name: 'Sportga ixtisoslashgan', value: 10 },
  ];
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)' }}>{t('crm.dashboard')}</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {statCards.map((stat, i) => (
          <div key={i} style={{ background: 'var(--surface-warm)', padding: '24px', borderRadius: '16px', border: '1px solid var(--neutral-200)', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ color: 'var(--neutral-500)', fontSize: '14px', marginBottom: '4px' }}>{stat.title}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--neutral-900)' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--neutral-900)', marginBottom: '24px' }}>{t('crm.financeChart')} (Tushum dinamikasi)</h3>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dx={-10} tickFormatter={(val) => `${val / 1000000}M`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-200)" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: 'var(--neutral-900)', fontWeight: 600 }}
                    formatter={(value) => [`${value.toLocaleString()} UZS`, 'Tushum']}
                    labelStyle={{ color: 'var(--neutral-500)', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--neutral-900)', marginBottom: '24px' }}>Bog'chalar Turlari Bo'yicha Analitika</h3>
            <div style={{ height: '250px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--neutral-900)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="var(--brand-500)"/> {t('crm.quickNotifs')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--neutral-100)', borderRadius: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--neutral-900)' }}>🎂 {t('crm.birthday')}</strong>
              <span style={{ color: 'var(--neutral-600)', fontSize: '14px' }}>{t('crm.birthdayDesc')}</span>
            </div>
            <div style={{ padding: '16px', background: 'var(--neutral-100)', borderRadius: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--neutral-900)' }}>💰 {t('crm.paymentReminder')}</strong>
              <span style={{ color: 'var(--neutral-600)', fontSize: '14px' }}>{t('crm.paymentDesc')}</span>
            </div>
            <div style={{ padding: '16px', background: 'var(--neutral-100)', borderRadius: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--neutral-900)' }}>⚠️ Yangi Ariza: Yashnobod</strong>
              <span style={{ color: 'var(--neutral-600)', fontSize: '14px' }}>Yashnoboddagi bog'cha filialiga 3 ta yangi ota-ona ariza qoldirdi. Hozir tekshiring.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
