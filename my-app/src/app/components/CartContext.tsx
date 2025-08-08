"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  cartItemId: string;
  id: number;
  name: string;
  price: number;
  variantSelected: string;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Omit<CartItem, "cartItemId">) {
    const newCartItem: CartItem = {
      ...product,
      cartItemId: crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15),
    };
    setCart((prev) => [...prev, newCartItem]);
  }

  function removeFromCart(cartItemId: string) {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
