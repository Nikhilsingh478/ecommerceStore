import { useEffect, useState } from "react";
import api from "@/services/apiClient";

export const useProducts = (subCategoryId: number | string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subCategoryId) return;

    setLoading(true);
    api.get("/product", {
      headers: {
        subCategoryId: subCategoryId.toString(),
        pageNumber: "1"
      }
    }).then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [subCategoryId]);

  return { products: data, loading };
};

export const mapProduct = (item: any) => ({
  id: item.subProduct?.id?.toString() || item.id?.toString(),
  name: item.productName,
  price: item.subProduct?.sellingPrice || 0,
  mrp: item.subProduct?.mrp || 0,
  offerPrice: item.subProduct?.sellingPrice || 0,
  discount: item.subProduct?.discountPercent || 0,
  image: item.productImageId ? `http://localhost:8080/ecommerce/productimage?productImageId=${item.productImageId}` : "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop&auto=format&q=80",
  brand: item.brand?.brandName || "",
});

export interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  offerPrice: number;
  discount: number;
  image: string;
  brand: string;
}
