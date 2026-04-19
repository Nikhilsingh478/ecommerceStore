import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/config/api";

export const getCart = async () => {
  const res = await apiClient.get(API_ENDPOINTS.viewCart);
  return res.data;
};

export const addToCart = async (subProductId: string | number, quantity = 1) => {
  const res = await apiClient.post(API_ENDPOINTS.addToCart, {
    subProduct: { id: subProductId },
    quantity,
  });
  return res.data;
};

export const removeFromCart = async (subProductId: string | number) => {
  const res = await apiClient.delete(API_ENDPOINTS.removeFromCart, {
    headers: { subProductId: String(subProductId) },
  });
  return res.data;
};
