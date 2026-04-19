import { BASE_URL, API_ENDPOINTS } from "@/config/api";

export const getProductImage = (id: string | number): string =>
  `${BASE_URL}${API_ENDPOINTS.productImage(id)}`;
