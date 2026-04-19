import { useState, useEffect, useCallback } from "react";
import { getAddresses, addAddress as apiAddAddress, deleteAddress as apiDeleteAddress } from "@/services/addressService";
import { Address } from "@/store/useAddressStore"; // Use its interface if available

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    if (!localStorage.getItem("emailId")) {
      setLoading(false);
      return;
    }
    try {
      const res = await getAddresses();
      setAddresses(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      console.error("Failed to load addresses", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = async (payload: any) => {
    try {
      await apiAddAddress(payload);
      await fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const removeAddress = async (id: string | number) => {
    try {
      await apiDeleteAddress(id);
      await fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  return { addresses, addAddress, removeAddress, loading };
};
