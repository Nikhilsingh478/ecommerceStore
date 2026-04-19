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

export const placeOrder = async (cartId: string, addressId: string, payload: Record<string, unknown>) => {
  if (!localStorage.getItem("emailId")) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }
  const res = await apiClient.post(API_ENDPOINTS.orders, payload, {
    headers: { cartId, addressId },
  });
  return res.data;
};
