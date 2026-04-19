import { apiCall, apiJson } from "./apiService";
import { API_ENDPOINTS } from "@/config/api";

export const getCart = async () => {
  return apiJson(API_ENDPOINTS.cart);
};

export const addToCart = async (productId: string | number, qty = 1) => {
  return apiCall(API_ENDPOINTS.addToCart, {
    method: "POST",
    body: JSON.stringify({ productId, qty }),
  });
};

export const removeFromCart = async (productId: string | number) => {
  return apiCall(API_ENDPOINTS.removeFromCart(productId), { method: "DELETE" });
};
