"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CartItem, Product } from "@/types/products";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getStorageKey = (id?: string) =>
    id ? `cart-${id}` : "cart-guest";

  // ---------------- LOAD USER + CART ----------------
  useEffect(() => {
    const loadUserAndCart = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user || null;
      setUser(currentUser);

      const key = getStorageKey(currentUser?.id);
      const saved = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      setItems(saved ? JSON.parse(saved) : []);
    };

    loadUserAndCart();

    const { data: listener } = supabase.auth.onAuthStateChange(async () => {
      await loadUserAndCart();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // ---------------- SAVE CART ----------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = getStorageKey(user?.id);
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, user]);

  // ---------------- FUNCTIONS ----------------
  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        toast.success("Updated quantity in cart");
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success("Successfully added to cart");
      return [...prev, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
