import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  getQty: (productId: string) => number;
  totalItems: () => number;
  totalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) =>
        set((s) => {
          const existing = s.items.find((i) => i.product.id === product.id);
          if (existing) return { items: s.items.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
          return { items: [...s.items, { product, qty: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.product.id !== productId) })),
      increaseQty: (productId) =>
        set((s) => ({ items: s.items.map((i) => i.product.id === productId ? { ...i, qty: i.qty + 1 } : i) })),
      decreaseQty: (productId) =>
        set((s) => {
          const item = s.items.find((i) => i.product.id === productId);
          if (item && item.qty <= 1) return { items: s.items.filter((i) => i.product.id !== productId) };
          return { items: s.items.map((i) => i.product.id === productId ? { ...i, qty: i.qty - 1 } : i) };
        }),
      getQty: (productId) => get().items.find((i) => i.product.id === productId)?.qty || 0,
      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.offerPrice * i.qty, 0),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "swiftcart-cart",
    }
  )
);
