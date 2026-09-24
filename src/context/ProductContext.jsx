import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialOrders } from '../data/gamingData';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialOrders;
    } catch (e) {
      return initialOrders;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_reviews');
      return saved ? JSON.parse(saved) : {
        'prod-1': [
          { id: 'rev-1', user: 'Shoxrux_Cyber', rating: 5, comment: 'PS5 Pro aqlbovar qilmas darajada tez! 4K 120 FPS da grafikasi shunchaki fantastika.', date: '2025-02-15' },
          { id: 'rev-2', user: 'Temur_Gamer', rating: 5, comment: '2TB SSD juda qulay bo\'ldi, barcha o\'yinlarim bemalol sig\'di.', date: '2025-02-18' }
        ],
        'prod-2': [
          { id: 'rev-3', user: 'Doston_IT', rating: 5, comment: 'RTX 4090 monster! Har qanday o\'yinda ultra sozlamalarda 150+ FPS.', date: '2025-02-10' }
        ],
        'prod-3': [
          { id: 'rev-4', user: 'CS2_Pro_Uz', rating: 5, comment: '54 gramm! Qo\'lda deyarli sezilmaydi, aym aniqligi ancha oshdi.', date: '2025-02-12' }
        ]
      };
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('nexus_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nexus_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nexus_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Product CRUD
  const addProduct = (prod) => {
    const newProd = {
      ...prod,
      id: prod.id || `prod-${Date.now()}`,
      rating: prod.rating || 5.0,
      reviewsCount: prod.reviewsCount || 0,
      badge: prod.badge || 'NEW'
    };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleProductStock = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, stock: p.stock > 0 ? 0 : 10 };
      }
      return p;
    }));
  };

  // Orders CRUD
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('uz-UZ', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      status: 'Yangi',
      paymentStatus: orderData.paymentStatus || 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // Reviews CRUD
  const addReview = (productId, review) => {
    setReviews(prev => {
      const current = prev[productId] || [];
      return {
        ...prev,
        [productId]: [
          {
            ...review,
            id: `rev-${Date.now()}`,
            date: new Date().toISOString().split('T')[0]
          },
          ...current
        ]
      };
    });
  };

  const deleteReview = (productId, reviewId) => {
    setReviews(prev => {
      if (!prev[productId]) return prev;
      return {
        ...prev,
        [productId]: prev[productId].filter(r => r.id !== reviewId)
      };
    });
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductStock,
      orders,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      reviews,
      addReview,
      deleteReview,

      // Aliases for compatibility
      data: products,
      addKindergarten: addProduct,
      updateKindergarten: updateProduct,
      deleteKindergarten: deleteProduct,
      applications: orders,
      submitApplication: addOrder,
      updateApplicationStatus: updateOrderStatus,
      deleteApplication: deleteOrder
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}

// Backwards compatibility hook
export function useKindergartens() {
  return useContext(ProductContext);
}
export { ProductContext as KindergartenContext };
export { ProductProvider as KindergartenProvider };
