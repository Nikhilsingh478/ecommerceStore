import { apiCall, apiJson } from "./apiService";
import { API_ENDPOINTS } from "@/config/api";

export const getCart = async () => {
  return apiJson(API_ENDPOINTS.viewCart);
};

export const addToCart = async (subProductId: string | number, quantity = 1) => {
  return apiCall(API_ENDPOINTS.addToCart, {
    method: "POST",
    body: JSON.stringify({
      subProduct: { id: subProductId },
      quantity,
    }),
  });
};

export const removeFromCart = async (subProductId: string | number) => {
  return apiCall(API_ENDPOINTS.removeFromCart, {
    method: "DELETE",
    headers: { subProductId: String(subProductId) },
  });
};
