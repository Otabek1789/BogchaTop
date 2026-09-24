import React from 'react';
import { DollarSign, ShoppingBag, Package, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { salesStats } from '../../data/gamingData';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function DashboardTab() {
  const { products, orders } = useProducts();
  const { t, lang } = useLanguage();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 420000000;
  const totalOrdersCount = orders.length + 152;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + " so'm";
  };

  const statCards = [
    { 
      title: t('admin.totalRevenue'), 
      value: formatPrice(totalRevenue), 
      sub: "+18.4%",
      icon: <DollarSign size={24} color="#00f0ff" />, 
      bg: "rgba(0, 240, 255, 0.12)" 
    },
    { 
      title: t('admin.totalOrders'), 
      value: `${totalOrdersCount} ${t('admin.items')}`, 
      sub: `+12 ${t('admin.newBadge')}`,
      icon: <ShoppingBag size={24} color="#8b5cf6" />, 
      bg: "rgba(139, 92, 246, 0.12)" 
    },
    { 
      title: t('admin.gamingProducts'), 
      value: `${products.length} ${t('admin.items')}`, 
      sub: "6 active",
      icon: <Package size={24} color="#10b981" />, 
      bg: "rgba(16, 185, 129, 0.12)" 
    },
    { 
      title: t('admin.avgCheck'), 
      value: formatPrice(avgOrderValue), 
      sub: "High conversion",
      icon: <TrendingUp size={24} color="#f59e0b" />, 
      bg: "rgba(245, 158, 11, 0.12)" 
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="animate-fade-in-up">
      {/* Page Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 className="text-h2" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-gaming)' }}>
            {t('admin.panelTitle')}
          </h2>
          <p style={{ color: 'var(--neutral-500)', fontSize: '14px', marginTop: '2px' }}>
            {t('admin.panelSubtitle')}
          </p>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {statCards.map((stat, i) => (
          <div 
            key={i} 
            style={{ 
              background: 'var(--surface-warm)', 
              padding: '22px', 
              borderRadius: '16px', 
              border: '1px solid var(--neutral-200)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '18px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ color: 'var(--neutral-500)', fontSize: '13px', fontWeight: 600 }}>{stat.title}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--neutral-900)', margin: '3px 0' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Sales Dynamic Area Chart */}
        <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '20px' }}>
            {t('admin.monthlySales')}
          </h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesStats.monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGamingRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#7000ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--neutral-500)', fontSize: 12 }} dx={-10} tickFormatter={(val) => `${val / 1000000}M`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-200)" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-warm)', borderRadius: '10px', border: '1px solid var(--neutral-200)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                  formatter={(value) => [`${formatPrice(value)}`, t('admin.amount')]}
                  labelStyle={{ color: 'var(--neutral-600)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorGamingRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Pie Chart */}
        <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '20px' }}>
            {t('admin.categoryShare')}
          </h3>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesStats.categoryShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesStats.categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-warm)', borderRadius: '8px', border: '1px solid var(--neutral-200)' }}
                  formatter={(value) => [`${value}%`, '%']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
            {salesStats.categoryShare.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neutral-600)' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></span>
                  {item.name}
                </span>
                <strong style={{ color: 'var(--neutral-900)' }}>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--neutral-900)' }}>
            {t('admin.recentOrders')}
          </h3>
          <span style={{ fontSize: '13px', color: 'var(--neutral-500)' }}>
            {orders.length} {t('admin.items')}
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-500)' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>{t('admin.customer')}</th>
                <th style={{ padding: '12px' }}>{t('catalog.items')}</th>
                <th style={{ padding: '12px' }}>{t('admin.amount')}</th>
                <th style={{ padding: '12px' }}>{t('admin.payment')}</th>
                <th style={{ padding: '12px' }}>{t('admin.status')}</th>
                <th style={{ padding: '12px' }}>Sana</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((ord) => (
                <tr key={ord.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#00f0ff' }}>{ord.id}</td>
                  <td style={{ padding: '12px' }}>
                    <strong style={{ color: 'var(--neutral-900)' }}>{ord.customerName}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--neutral-500)' }}>{ord.customerPhone}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--neutral-700)', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ord.items && ord.items.map(it => `${it.name} (x${it.quantity})`).join(', ')}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#34d399' }}>
                    {formatPrice(ord.totalAmount)}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--neutral-700)' }}>
                    {ord.paymentMethod}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '3px 8px', 
                      borderRadius: '6px', 
                      fontSize: '11.5px', 
                      fontWeight: 700,
                      background: ord.status === 'Bajarildi' ? 'rgba(16,185,129,0.15)' : ord.status === 'Yetkazilmoqda' ? 'rgba(0,240,255,0.15)' : 'rgba(59,130,246,0.15)',
                      color: ord.status === 'Bajarildi' ? '#10b981' : ord.status === 'Yetkazilmoqda' ? '#00f0ff' : '#3b82f6'
                    }}>
                      {ord.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--neutral-500)', fontSize: '12px' }}>{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
