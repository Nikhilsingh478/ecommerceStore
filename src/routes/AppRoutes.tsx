import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProductListing from "@/pages/ProductListing";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Account from "@/pages/Account";
import StaticPage from "@/pages/StaticPage";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/category/:category" element={<ProductListing />} />
    <Route path="/category/:category/:subcategory" element={<ProductListing />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/account" element={<Account />} />
    <Route path="/static/:page" element={<StaticPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
