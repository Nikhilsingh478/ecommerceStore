import { apiCall, apiJson } from "./apiService";
import { API_ENDPOINTS } from "@/config/api";

export const getAddresses = async () => {
  return apiJson(API_ENDPOINTS.address);
};

export const addAddress = async (payload: Record<string, unknown>) => {
  return apiCall(API_ENDPOINTS.address, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateAddress = async (payload: Record<string, unknown>) => {
  return apiCall(API_ENDPOINTS.address, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const deleteAddress = async (addressId: string | number) => {
  return apiCall(API_ENDPOINTS.address, {
    method: "DELETE",
    headers: { addressId: String(addressId) },
  });
};
