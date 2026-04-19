import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/config/api";

export const getOrders = async (pageNumber = 0) => {
  const res = await apiClient.get(API_ENDPOINTS.orders, {
    headers: { pageNumber: String(pageNumber) },
  });
  return res.data;
};

export const getOrderDetails = async (orderId: string | number) => {
  const res = await apiClient.get(API_ENDPOINTS.orderDetails, {
    headers: { orderId: String(orderId) },
  });
  return res.data;
};

export const getInvoice = async (orderId: string | number) => {
  const res = await apiClient.get(API_ENDPOINTS.invoice, {
    headers: { orderId: String(orderId) },
  });
  return res.data;
};

export const cancelOrder = async (orderId: string | number) => {
  const res = await apiClient.put(
    API_ENDPOINTS.cancelOrder,
    {},
    { headers: { orderId: String(orderId) } },
  );
  return res.data;
};

export const placeOrder = async (payload: Record<string, unknown>) => {
  const res = await apiClient.post(API_ENDPOINTS.orders, payload);
  return res.data;
};
