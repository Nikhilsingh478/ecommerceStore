import { apiCall, apiJson } from "./apiService";
import { API_ENDPOINTS } from "@/config/api";

export const getOrders = async (pageNumber = 0) => {
  return apiJson(API_ENDPOINTS.orders, {
    headers: { pageNumber: String(pageNumber) },
  });
};

export const getOrderDetails = async (orderId: string | number) => {
  return apiJson(API_ENDPOINTS.orderDetails, {
    headers: { orderId: String(orderId) },
  });
};

export const getInvoice = async (orderId: string | number) => {
  return apiCall(API_ENDPOINTS.invoice, {
    headers: { orderId: String(orderId) },
  });
};

export const cancelOrder = async (orderId: string | number) => {
  return apiCall(API_ENDPOINTS.cancelOrder, {
    method: "PUT",
    headers: { orderId: String(orderId) },
  });
};

export const placeOrder = async (payload: Record<string, unknown>) => {
  return apiCall(API_ENDPOINTS.orders, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
