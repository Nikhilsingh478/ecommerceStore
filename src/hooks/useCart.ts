import { useState, useEffect } from "react";
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart } from "@/services/cartService";

export const getImage = (id: string | number | undefined) => {
  if (!id) return "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop&auto=format&q=80";
  return `http://localhost:8080/ecommerce/productimage?productImageId=${id}`;
};

export function mapCartItem(item: any) {
  return {
    product: {
      id: item.subProduct?.id?.toString() || item.subProduct?.subProductId?.toString() || "",
      name: item.subProduct?.productName || "Product",
      price: item.sellingPricePerUnit || 0,
      offerPrice: item.sellingPricePerUnit || 0,
      mrp: item.sellingPricePerUnit || 0,
      image: getImage(item.subProduct?.productImageList?.[0]?.id),
    },
    qty: item.quantity || 1,
    cartId: item.cart?.id || item.cart?.cartId || "",
  };
}

let globalCartItems: any[] = [];
let globalCartId: string = "";
let listeners: Array<(items: any[], cartId: string) => void> = [];

export const refreshCart = async () => {
  try {
    const data = await getCart();
    const arr = Array.isArray(data) ? data : (data?.items || data?.cartItems || []);
    const mapped = arr.map(mapCartItem);
    globalCartItems = mapped;
    if (mapped.length > 0) {
      globalCartId = mapped[0].cartId?.toString();
    }
    listeners.forEach((l) => l(mapped, globalCartId));
  } catch (err) {
    console.error("Cart fetch failed", err);
  }
};

export const useCart = () => {
  const [items, setItems] = useState<any[]>(globalCartItems);
  const [cartId, setCartId] = useState<string>(globalCartId);

  useEffect(() => {
    const handler = (newItems: any[], newCartId: string) => {
      setItems(newItems);
      setCartId(newCartId);
    };
    listeners.push(handler);
    if (!globalCartItems.length) {
      if (localStorage.getItem("emailId")) {
        refreshCart();
      }
    }
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  const addToCart = async (product: any, qty = 1) => {
    try {
      if (!product || !product.id) return;
      await apiAddToCart(product.id, qty);
      await refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  const increaseQty = async (productId: string | number) => {
    try {
      await apiAddToCart(productId, 1);
      await refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (productId: string | number) => {
    const item = items.find((i) => i.product?.id === productId?.toString());
    if (!item) return;
    if (item.qty <= 1) {
      return removeFromCart(productId);
    }
    try {
      await apiAddToCart(productId, -1);
      await refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId: string | number) => {
    try {
      await apiRemoveFromCart(productId);
      await refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  const getQty = (productId: string | number) => {
    return items.find((i) => i.product?.id === productId?.toString())?.qty || 0;
  };

  const totalItems = () => items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = () => items.reduce((sum, i) => sum + (i.product?.offerPrice || 0) * i.qty, 0);

  const clearCart = () => {
    globalCartItems = [];
    globalCartId = "";
    listeners.forEach((l) => l([], ""));
  };

  return {
    items,
    cartId,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    getQty,
    totalItems,
    totalPrice,
    clearCart,
  };
};
