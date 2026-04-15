import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./useCartStore";
import { Address } from "./useAddressStore";

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  paymentMethod: "COD" | "Online";
  total: number;
  savings: number;
  placedAt: string;
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered";
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((s) => ({ orders: [order, ...s.orders] })),
    }),
    { name: "swiftcart-orders" }
  )
);
