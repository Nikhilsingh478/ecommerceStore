import { ArrowLeft, RotateCcw, ShoppingCart, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/store/useOrderStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers";
import BottomNav from "@/components/BottomNav/BottomNav";
import { Product } from "@/data/products";
import { useState } from "react";

const BuyAgain = () => {
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const { addToCart, getQty } = useCartStore();
  const [added, setAdded] = useState<Set<string>>(new Set());

  const allProducts = orders.flatMap((o) => o.items.map((i) => i.product));
  const seen = new Set<string>();
  const uniqueProducts: Product[] = [];
  for (const p of allProducts) {
    if (!seen.has(p.id)) {
      seen.add(p.id);
      uniqueProducts.push(p);
    }
  }

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAdded((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAdded((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0 animate-fade-in">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-white dark:bg-[#0a0a0a] border-b border-[#e2e8f0] dark:border-[#1f1f1f] px-4 py-3.5">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary active:scale-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="text-[17px] font-semibold text-foreground">Buy Again</span>
      </div>

      {uniqueProducts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 py-24 px-8 animate-scale-in">
          <div className="h-20 w-20 rounded-2xl bg-card border border-border flex items-center justify-center">
            <RotateCcw className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">Nothing to buy again yet</p>
            <p className="text-sm text-muted-foreground mt-1">Your previously ordered items will appear here</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-foreground px-8 py-3 text-sm font-medium text-background hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 md:px-6 py-4 md:py-8">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {uniqueProducts.length} item{uniqueProducts.length > 1 ? "s" : ""} from your past orders
          </p>
          <div className="flex flex-col gap-3">
            {uniqueProducts.map((product, i) => {
              const inCart = getQty(product.id) > 0;
              const justAdded = added.has(product.id);
              return (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-2xl bg-card border border-border p-4 animate-slide-right"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="h-[70px] w-[70px] shrink-0 rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden active:scale-95 transition-transform"
                  >
                    <img src={product.image} alt={product.name} className="h-14 w-14 object-contain" />
                  </button>

                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-left"
                    >
                      <p className="text-[13px] font-medium text-foreground line-clamp-2 leading-snug">
                        {product.name}
                      </p>
                    </button>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[13px] font-semibold text-foreground">{formatPrice(product.offerPrice)}</span>
                      {product.mrp > product.offerPrice && (
                        <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
                      )}
                      {product.discount > 0 && (
                        <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">{product.discount}% off</span>
                      )}
                    </div>

                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        onClick={() => handleAdd(product)}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-all active:scale-[0.97] ${
                          justAdded
                            ? "bg-green-600 text-white"
                            : inCart
                            ? "bg-secondary text-foreground border border-border"
                            : "bg-foreground text-background hover:opacity-90"
                        }`}
                      >
                        {justAdded ? (
                          <>Added!</>
                        ) : (
                          <>
                            <ShoppingCart className="h-3 w-3" strokeWidth={2} />
                            {inCart ? `In Cart (${getQty(product.id)})` : "Add to Cart"}
                          </>
                        )}
                      </button>
                      {inCart && (
                        <button
                          onClick={() => navigate("/cart")}
                          className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Go to Cart →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <Package className="h-5 w-5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-foreground">View your full order history</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Track orders and view past purchases</p>
            </div>
            <button
              onClick={() => navigate("/orders")}
              className="ml-auto text-[12px] font-semibold text-foreground bg-secondary px-3 py-1.5 rounded-lg hover:bg-border transition-colors shrink-0"
            >
              Orders
            </button>
          </div>
        </main>
      )}

      <BottomNav />
    </div>
  );
};

export default BuyAgain;
