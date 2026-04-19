import { apiCall, apiJson } from "./apiService";
import { API_ENDPOINTS } from "@/config/api";
import { getPaginationHeaders } from "@/utils/pagination";

export const getOrders = async (pageNumber?: number) => {
  return apiJson(API_ENDPOINTS.orders, {
    headers: pageNumber !== undefined ? getPaginationHeaders(pageNumber) : undefined,
  });
};

export const placeOrder = async (payload: Record<string, unknown>) => {
  return apiCall(API_ENDPOINTS.placeOrder, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
