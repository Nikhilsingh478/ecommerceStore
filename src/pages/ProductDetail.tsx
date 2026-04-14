import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Star, Truck, ShieldCheck } from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import Header from "@/components/Header/Header";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, getDiscountLabel } from "@/utils/helpers";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product  = products.find((p) => p.id === id);
  const { addToCart, increaseQty, decreaseQty } = useCartStore();
  const qty = useCartStore((s) => s.getQty(id || ""));

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-[#64748B]">Product not found</p>
      </div>
    );
  }

  const similar        = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);
  const boughtTogether = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0 animate-fade-in">

      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3.5 border-b border-[#E2E8F0]">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F1F5F9] active:scale-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-[#0F172A]" />
        </button>
        <span className="flex-1 text-[16px] font-semibold text-[#0F172A] line-clamp-1">{product.name}</span>
      </div>

      <div className="hidden md:block"><Header /></div>

      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8 pt-0 md:pt-10">
        <div className="flex flex-col md:flex-row md:gap-16">

          {/* Image */}
          <div className="w-full md:w-5/12 animate-fade-up">
            <div className="relative aspect-square bg-white border border-[#F1F5F9] md:rounded-2xl md:shadow-sm overflow-hidden flex items-center justify-center p-8">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain animate-float"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-700">
                  {getDiscountLabel(product.discount)}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-7/12 flex flex-col bg-white md:bg-transparent px-5 pt-5 pb-6 md:p-0 md:py-2 animate-fade-up" style={{ animationDelay: "60ms" }}>

            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748B] mb-2">{product.brand}</p>
            <h1 className="text-[22px] md:text-3xl font-semibold text-[#0F172A] leading-tight tracking-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3 mb-5">
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/60 px-2.5 py-1">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span className="text-[12px] font-semibold text-amber-700">4.3</span>
              </div>
              <span className="text-[12px] text-[#64748B]">1,284 ratings</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 pb-5 border-b border-[#F1F5F9]">
              <span className="text-[30px] md:text-4xl font-semibold text-[#0F172A] tracking-tight">{formatPrice(product.offerPrice)}</span>
              {product.mrp > product.offerPrice && (
                <>
                  <span className="text-lg text-[#94A3B8] line-through mb-0.5">{formatPrice(product.mrp)}</span>
                  <span className="mb-0.5 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-medium text-green-700">
                    {getDiscountLabel(product.discount)}
                  </span>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex gap-3 mt-5 mb-6">
              {[
                { icon: Truck,       label: "10-min delivery" },
                { icon: ShieldCheck, label: "100% genuine"    },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2">
                  <Icon className="h-4 w-4 text-[#64748B] shrink-0" strokeWidth={1.8} />
                  <span className="text-[12px] font-medium text-[#0F172A]">{label}</span>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              {qty === 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="rounded-xl bg-[#0F172A] px-10 py-3.5 text-[15px] font-medium text-white hover:bg-[#1E293B] active:scale-[0.98] transition-all"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex h-[52px] items-center gap-6 rounded-xl bg-[#0F172A] px-5 text-white">
                  <button onClick={() => decreaseQty(product.id)} className="p-1.5 active:scale-90 transition-transform hover:bg-white/10 rounded-lg">
                    <Minus className="h-5 w-5" strokeWidth={2} />
                  </button>
                  <span className="min-w-[24px] text-center text-lg font-semibold">{qty}</span>
                  <button onClick={() => increaseQty(product.id)} className="p-1.5 active:scale-90 transition-transform hover:bg-white/10 rounded-lg">
                    <Plus className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <div className="mt-10 md:mt-16 px-4 md:px-0 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <h2 className="text-[17px] font-semibold text-[#0F172A] tracking-tight mb-5">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {similar.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Bought Together */}
        {boughtTogether.length > 0 && (
          <div className="mt-8 md:mt-12 px-4 md:px-0 mb-6 animate-fade-up" style={{ animationDelay: "160ms" }}>
            <h2 className="text-[17px] font-semibold text-[#0F172A] tracking-tight mb-5">Frequently Bought Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {boughtTogether.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </main>

      {/* ✅ FIXED Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-xl px-5 pt-3 pb-[calc(0.9rem+env(safe-area-inset-bottom))] border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div>
          <span className="text-[20px] font-semibold text-[#0F172A] tracking-tight">{formatPrice(product.offerPrice)}</span>
          {product.mrp > product.offerPrice && (
            <span className="ml-2 text-sm text-[#94A3B8] line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>

        {qty === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="rounded-xl bg-[#0F172A] px-7 py-2.5 text-[14px] font-medium text-white hover:bg-[#1E293B] active:scale-[0.97] transition-all"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex h-[42px] items-center gap-5 rounded-xl bg-[#0F172A] px-5 text-white">
            <button onClick={() => decreaseQty(product.id)} className="active:scale-90 transition-transform">
              <Minus className="h-4 w-4" strokeWidth={2} />
            </button>
            <span className="min-w-[20px] text-center font-semibold">{qty}</span>
            <button onClick={() => increaseQty(product.id)} className="active:scale-90 transition-transform">
              <Plus className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;