// Central API configuration
// Override via VITE_API_URL in .env
export const BASE_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8080/ecommerce";

export const API_ENDPOINTS = {
  // Auth
  login: "/login",
  register: "/register",

  // Products
  allProducts: "/allproduct",
  productById: (id: string | number) => `/product?productId=${id}`,
  productImage: (id: string | number) => `/productimage?productImageId=${id}`,

  // Categories
  allCategories: "/allcategory",

  // Cart
  cart: "/cart",
  addToCart: "/cart/add",
  removeFromCart: (id: string | number) => `/cart/remove?productId=${id}`,

  // Orders
  orders: "/orders",
  placeOrder: "/order/place",
} as const;
