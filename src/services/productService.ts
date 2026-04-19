import { apiJson } from "./apiService";
import { API_ENDPOINTS } from "@/config/api";
import { getPaginationHeaders } from "@/utils/pagination";

export const getProducts = async (pageNumber?: number) => {
  return apiJson(API_ENDPOINTS.allProducts, {
    headers: pageNumber !== undefined ? getPaginationHeaders(pageNumber) : undefined,
  });
};

export const getProductById = async (id: string | number) => {
  return apiJson(API_ENDPOINTS.productById(id));
};

export const getCategories = async () => {
  return apiJson(API_ENDPOINTS.allCategories);
};
