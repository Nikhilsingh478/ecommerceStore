import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  type: "Home" | "Work" | "Other";
}

interface AddressState {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],
      addAddress: (addr) =>
        set((s) => ({
          addresses: [
            ...s.addresses,
            { ...addr, id: Date.now().toString() },
          ],
        })),
      removeAddress: (id) =>
        set((s) => ({ addresses: s.addresses.filter((a) => a.id !== id) })),
    }),
    { name: "swiftcart-addresses" }
  )
);
