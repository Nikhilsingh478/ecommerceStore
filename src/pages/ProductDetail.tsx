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
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const similar      = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);
  const boughtTogether = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0 animate-fade-in bg-background">
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-3 bg-background/85 backdrop-blur-xl px-4 py-3.5 border-b border-border/30">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted active:scale-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="flex-1 text-[16px] font-bold text-foreground line-clamp-1">{product.name}</span>
      </div>

      <div className="hidden md:block"><Header /></div>

      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8 pt-0 md:pt-10">
        <div className="flex flex-col md:flex-row md:gap-14">

          {/* ── Product image ───────────────────── */}
          <div className="w-full md:w-5/12 animate-fade-up">
            <div className="relative md:rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-border/20 shadow-[0_2px_24px_rgba(0,0,0,0.06)] aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-[70%] w-[70%] object-contain animate-float"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 rounded-full bg-offer px-3 py-1 text-[11px] font-black text-offer-foreground shadow-[0_2px_8px_hsl(var(--offer)/0.35)]">
                  {getDiscountLabel(product.discount)}
                </div>
              )}
            </div>
          </div>

          {/* ── Product info ─────────────────────── */}
          <div className="w-full md:w-7/12 flex flex-col bg-card md:bg-transparent px-4 pt-4 pb-5 md:p-0 md:py-2 animate-fade-up" style={{ animationDelay: "80ms" }}>

            <p className="text-[12px] font-bold uppercase tracking-widest text-primary mb-1.5">{product.brand}</p>
            <h1 className="text-[20px] md:text-3xl font-extrabold text-foreground leading-tight tracking-tight">{product.name}</h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 mt-3 mb-4">
              <div className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 px-2.5 py-1">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span className="text-[12px] font-bold text-amber-700 dark:text-amber-400">4.3</span>
              </div>
              <span className="text-[12px] text-muted-foreground">1,284 ratings</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-5 pb-5 border-b border-border/40">
              <span className="text-[28px] md:text-4xl font-black text-foreground tracking-tight">{formatPrice(product.offerPrice)}</span>
              {product.mrp > product.offerPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through mb-0.5">{formatPrice(product.mrp)}</span>
                  <span className="mb-0.5 rounded-full bg-offer/10 border border-offer/20 px-2.5 py-1 text-[12px] font-black text-offer">
                    {getDiscountLabel(product.discount)}
                  </span>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex gap-3 mb-6">
              {[
                { icon: Truck,        label: "10-min delivery" },
                { icon: ShieldCheck,  label: "100% genuine" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-2xl bg-muted/60 border border-border/30 px-3 py-2">
                  <Icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4 mt-2">
              {qty === 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="rounded-full bg-primary px-12 py-4 text-[15px] font-black text-primary-foreground shadow-[0_6px_24px_hsl(var(--primary)/0.35)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all glow-primary"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex h-[54px] items-center gap-6 rounded-full bg-primary px-6 shadow-[0_6px_24px_hsl(var(--primary)/0.3)] text-primary-foreground">
                  <button onClick={() => decreaseQty(product.id)} className="p-1.5 active:scale-90 transition-transform hover:bg-white/15 rounded-full">
                    <Minus className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                  <span className="min-w-[28px] text-center text-xl font-black">{qty}</span>
                  <button onClick={() => increaseQty(product.id)} className="p-1.5 active:scale-90 transition-transform hover:bg-white/15 rounded-full">
                    <Plus className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Similar Products ─────────────────────────── */}
        {similar.length > 0 && (
          <div className="mt-10 md:mt-16 px-4 md:px-0 animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="block w-1 h-5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              <h2 className="text-[16px] md:text-xl font-extrabold text-foreground">Similar Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
              {similar.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* ── Bought Together ──────────────────────────── */}
        {boughtTogether.length > 0 && (
          <div className="mt-8 md:mt-12 px-4 md:px-0 mb-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="block w-1 h-5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              <h2 className="text-[16px] md:text-xl font-extrabold text-foreground">Frequently Bought Together</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
              {boughtTogether.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </main>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] inset-x-0 z-40 flex items-center justify-between bg-card/90 backdrop-blur-xl px-5 pt-3.5 pb-3.5 border-t border-border/30 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[22px] font-black text-foreground tracking-tight">{formatPrice(product.offerPrice)}</span>
          {product.mrp > product.offerPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>
        {qty === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="rounded-full bg-primary px-8 py-3 text-[14px] font-black text-primary-foreground shadow-[0_4px_16px_hsl(var(--primary)/0.35)] active:scale-95 transition-all hover:brightness-110"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex h-[44px] items-center gap-5 rounded-full bg-primary px-5 shadow-[0_4px_16px_hsl(var(--primary)/0.3)] text-primary-foreground">
            <button onClick={() => decreaseQty(product.id)} className="active:scale-90 transition-transform">
              <Minus className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <span className="min-w-[20px] text-center font-black">{qty}</span>
            <button onClick={() => increaseQty(product.id)} className="active:scale-90 transition-transform">
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
