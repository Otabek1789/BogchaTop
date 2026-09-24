import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { Star, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewsTab() {
  const { reviews, products, deleteReview } = useProducts();
  const { t } = useLanguage();

  const allReviews = Object.entries(reviews).flatMap(([prodId, revs]) => 
    (Array.isArray(revs) ? revs : []).map(rev => {
      const prod = products.find(p => p.id === prodId);
      return { 
        ...rev, 
        productName: prod ? prod.name : 'Gaming Gear', 
        prodId 
      };
    })
  ).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  const handleDelete = (prodId, revId) => {
    if (window.confirm("Bu mijoz sharhini o'chirmoqchimisiz?")) {
      deleteReview(prodId, revId);
      toast.error("Sharh o'chirildi");
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ fontFamily: 'var(--font-gaming)' }}>
          {t('admin.reviews').toUpperCase()}
        </h2>
        <p style={{ color: 'var(--neutral-500)' }}>
          {t('admin.panelSubtitle')}
        </p>
      </div>

      <div className="card card-static" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead style={{ background: 'var(--surface)' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Sana</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Tovar</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Geymer</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Baho</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Sharh matni</th>
              <th style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid var(--neutral-200)' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map(rev => (
              <tr key={rev.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                <td style={{ padding: '16px', color: 'var(--neutral-500)', fontSize: '12px' }}>
                  {rev.date}
                </td>
                <td style={{ padding: '16px', fontWeight: 600, color: '#00f0ff' }}>{rev.productName}</td>
                <td style={{ padding: '16px', fontWeight: 600 }}>{rev.user || rev.name}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < (rev.rating || 5) ? "#fbbf24" : "transparent"} color={i < (rev.rating || 5) ? "#fbbf24" : "var(--neutral-300)"} />
                    ))}
                  </div>
                </td>
                <td style={{ padding: '16px', maxWidth: '380px', color: 'var(--neutral-700)' }}>
                  {rev.comment}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleDelete(rev.prodId, rev.id)} 
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    title="O'chirish"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {allReviews.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--neutral-500)' }}>
                  Hozircha hech qanday sharh kelib tushmagan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
