import { useState, useEffect } from "react";
import { getAllPrimaryCategories, getSubCategories, getProductsBySubCategory } from "@/services/productService";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  discount: number;
  offerPrice: number;
  image: string;
  brand: string;
  description?: string;
}

const checkAuth = () => {
  if (!localStorage.getItem("emailId")) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }
};

export const getImage = (id: string | number | undefined) => {
  if (!id) return "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop&auto=format&q=80";
  return `http://localhost:8080/ecommerce/productimage?productImageId=${id}`;
};

export function mapProduct(apiProduct: any): Product {
  return {
    id: apiProduct.subProductId?.toString() || apiProduct.id?.toString(),
    name: apiProduct.productName,
    price: apiProduct.sellingPrice,
    mrp: apiProduct.sellingPrice,
    offerPrice: apiProduct.sellingPrice,
    discount: 0,
    image: getImage(apiProduct.productImageList?.[0]?.id),
    brand: apiProduct.brand?.brandName || "",
    category: "",
    subcategory: "",
  };
}

let cachedProducts: Product[] = [];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(cachedProducts);
  const [loading, setLoading] = useState(!cachedProducts.length);

  useEffect(() => {
    if (cachedProducts.length > 0) return;
    
    const fetchAll = async () => {
      try {
        checkAuth();
        const primaryCats = await getAllPrimaryCategories();
        const allProducts: Product[] = [];

        for (const pCat of primaryCats) {
          const subCats = await getSubCategories(pCat.primaryCategoryId);
          for (const sCat of subCats) {
            const prods = await getProductsBySubCategory(sCat.subCategoryId);
            const mappedProds = prods.map((p: any) => {
              const mapped = mapProduct(p);
              mapped.category = pCat.primaryCategoryName || "";
              mapped.subcategory = sCat.subCategoryName || "";
              return mapped;
            });
            allProducts.push(...mappedProds);
          }
        }
        cachedProducts = allProducts;
        setProducts(allProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { products, loading };
};
