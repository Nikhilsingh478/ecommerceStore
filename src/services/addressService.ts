import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/config/api";

const checkAuth = () => {
  if (!localStorage.getItem("emailId")) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }
};

export const getAddresses = async () => {
  checkAuth();
  const res = await apiClient.get(API_ENDPOINTS.address);
  return res.data;
};

export const addAddress = async (payload: Record<string, unknown>) => {
  checkAuth();
  const res = await apiClient.post(API_ENDPOINTS.address, payload);
  return res.data;
};

export const updateAddress = async (payload: Record<string, unknown>) => {
  checkAuth();
  const res = await apiClient.put(API_ENDPOINTS.address, payload);
  return res.data;
};

export const deleteAddress = async (addressId: string | number) => {
  checkAuth();
  const res = await apiClient.delete(API_ENDPOINTS.address, {
    headers: { addressId: String(addressId) },
  });
  return res.data;
};
