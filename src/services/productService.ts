import { apiJson } from "./apiService";
import { API_ENDPOINTS } from "@/config/api";

export const getAllProducts = async (pageNumber = 0) => {
  return apiJson(API_ENDPOINTS.allProducts, {
    headers: { pageNumber: String(pageNumber) },
  });
};

export const getProductsBySubCategory = async (
  subCategoryId: string | number,
  pageNumber = 0
) => {
  return apiJson(API_ENDPOINTS.product, {
    headers: {
      subCategoryId: String(subCategoryId),
      pageNumber: String(pageNumber),
    },
  });
};

export const searchProducts = async (keyword: string, pageNumber = 0) => {
  return apiJson(API_ENDPOINTS.search, {
    headers: {
      keyword,
      pageNumber: String(pageNumber),
    },
  });
};

export const getAllPrimaryCategories = async () => {
  return apiJson(API_ENDPOINTS.allPrimaryCategories);
};

export const getPrimaryCategory = async (id: string | number) => {
  return apiJson(API_ENDPOINTS.primaryCategories, {
    headers: { primaryCategoryId: String(id) },
  });
};

export const getSubCategories = async (primaryCategoryId: string | number) => {
  return apiJson(API_ENDPOINTS.subCategories, {
    headers: { primaryCategoryId: String(primaryCategoryId) },
  });
};
