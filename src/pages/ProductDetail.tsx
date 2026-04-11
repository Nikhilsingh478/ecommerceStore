import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Carousel from "@/components/Carousel/Carousel";
import ProductCard from "@/components/ProductCard/ProductCard";
import Header from "@/components/Header/Header";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, getDiscountLabel } from "@/utils/helpers";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart, increaseQty, decreaseQty } = useCartStore();
  const qty = useCartStore((s) => s.getQty(id || ""));

  if (!product) return <div className="p-8 text-center text-muted-foreground">Product not found</div>;

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const boughtTogether = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col pb-28 md:pb-0 animate-in fade-in duration-300 bg-background">
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="md:hidden sticky top-0 z-40 flex items-center gap-3 bg-card px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="text-sm font-medium text-foreground">Product Details</span>
      </div>

      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8 pt-0 md:pt-10 md:pb-16">
        <div className="flex flex-col md:flex-row md:gap-12">
          {/* Left Column - Image */}
          <div className="w-full md:w-1/2">
            <div className="md:rounded-[24px] md:overflow-hidden md:shadow-[0_2px_12px_rgba(0,0,0,0.03)] md:border md:border-border/40 bg-card">
              <Carousel images={[product.image, product.image]} />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-1/2 flex flex-col md:py-4 animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both" style={{ animationDelay: '100ms' }}>
            <div className="bg-card p-4 md:p-0 md:bg-transparent shadow-[0_4px_16px_rgba(0,0,0,0.02)] md:shadow-none rounded-b-3xl">
              <h1 className="text-lg md:text-3xl font-bold text-foreground">{product.name}</h1>
              <p className="mt-1 md:mt-2 text-sm md:text-base text-secondary-foreground">{product.brand}</p>
              
              <div className="mt-3 md:mt-6 flex items-center gap-3">
                <span className="text-xl md:text-3xl font-bold text-foreground">{formatPrice(product.offerPrice)}</span>
                <span className="text-sm md:text-lg text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
                <span className="rounded bg-success/10 px-2 py-1 text-[10px] md:text-xs font-bold text-success">
                  {getDiscountLabel(product.discount)}
                </span>
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex mt-10 items-center gap-6">
                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-primary px-12 py-3.5 text-base font-bold text-primary-foreground shadow-[0_4px_12px_rgba(var(--primary),0.2)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex h-[52px] items-center gap-6 rounded-full bg-primary px-5 py-2 shadow-[0_4px_12px_rgba(var(--primary),0.2)] text-primary-foreground transition-all">
                    <button onClick={() => decreaseQty(product.id)} className="p-1.5 active:scale-95 transition-transform hover:bg-primary-foreground/10 rounded-full"><Minus className="h-5 w-5" /></button>
                    <span className="min-w-[24px] text-center text-lg font-bold">{qty}</span>
                    <button onClick={() => increaseQty(product.id)} className="p-1.5 active:scale-95 transition-transform hover:bg-primary-foreground/10 rounded-full"><Plus className="h-5 w-5" /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-6 md:mt-16 bg-background px-4 md:px-0">
          <h2 className="mb-4 text-base md:text-xl font-bold text-foreground">
            {similar.length > 0 ? "Similar Products" : ""}
          </h2>
          {similar.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {similar.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>

        {/* Bought Together */}
        {boughtTogether.length > 0 && (
          <div className="mt-4 md:mt-12 bg-background px-4 md:px-0 mb-4 md:mb-0">
            <h2 className="mb-4 text-base md:text-xl font-bold text-foreground">Frequently Bought Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {boughtTogether.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky bottom bar */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-card px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <div>
          <span className="text-xl font-bold text-foreground">{formatPrice(product.offerPrice)}</span>
          <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
        </div>
        {qty === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_4px_12px_rgba(var(--primary),0.2)] active:scale-95 transition-all"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex h-[42px] items-center gap-4 rounded-full bg-primary px-4 py-2 shadow-[0_4px_12px_rgba(var(--primary),0.2)] text-primary-foreground transition-all">
            <button onClick={() => decreaseQty(product.id)} className="p-1 active:scale-95 transition-transform"><Minus className="h-5 w-5" /></button>
            <span className="min-w-[20px] text-center text-sm font-bold">{qty}</span>
            <button onClick={() => increaseQty(product.id)} className="p-1 active:scale-95 transition-transform"><Plus className="h-5 w-5" /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
