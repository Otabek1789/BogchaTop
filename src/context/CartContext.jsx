import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(() => {
    try {
      return localStorage.getItem('nexus_promo_code') || '';
    } catch (_) {
      return '';
    }
  });

  const [discountPercent, setDiscountPercent] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_discount_percent');
      return saved ? Number(saved) : 0;
    } catch (_) {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_cart', JSON.stringify(cartItems));
    } catch (_) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_promo_code', promoCode);
      localStorage.setItem('nexus_discount_percent', discountPercent.toString());
    } catch (_) {}
  }, [promoCode, discountPercent]);

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      toast.success(`"${product.name}" savatda yangilandi (+${qty})`);
      setCartItems(prev =>
        prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        )
      );
    } else {
      toast.success(`"${product.name}" savatga qo'shildi! 🎮`);
      setCartItems(prev => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          brand: product.brand,
          category: product.category,
          quantity: qty
        }
      ]);
    }
  };

  const removeFromCart = (productId) => {
    toast.error("Mahsulot savatdan o'chirildi");
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GAMER15' || cleanCode === 'GAMERPRO15' || cleanCode === 'CYBER15') {
      setPromoCode(cleanCode);
      setDiscountPercent(15);
      toast.success("15% Chegirma muvaffaqiyatli qo'llandi! 🎉");
      return { success: true, discount: 15 };
    } else if (cleanCode === 'CYBER10' || cleanCode === 'NEXUS10') {
      setPromoCode(cleanCode);
      setDiscountPercent(10);
      toast.success("10% Chegirma qo'llandi! 🚀");
      return { success: true, discount: 10 };
    } else {
      toast.error("Noto'g'ri promokod kiritildi");
      return { success: false, error: "Promokod mavjud emas" };
    }
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      promoCode,
      discountPercent,
      applyPromoCode,
      totalItemsCount,
      subtotal,
      discountAmount,
      finalTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
