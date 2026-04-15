import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Home from "@/pages/Home";
import ProductListing from "@/pages/ProductListing";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import BuyAgain from "@/pages/BuyAgain";
import Account from "@/pages/Account";
import StaticPage from "@/pages/StaticPage";
import NotFound from "@/pages/NotFound";

const ShareTarget = () => {
  const [params] = useSearchParams();
  const query = params.get("text") || params.get("title") || params.get("url") || "";
  return <Navigate to={`/search?q=${encodeURIComponent(query)}`} replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<ProductListing />} />
    <Route path="/search" element={<ProductListing />} />
    <Route path="/category/:category" element={<ProductListing />} />
    <Route path="/category/:category/:subcategory" element={<ProductListing />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/buy-again" element={<BuyAgain />} />
    <Route path="/account" element={<Account />} />
    <Route path="/share-target" element={<ShareTarget />} />
    <Route path="/static/:page" element={<StaticPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
