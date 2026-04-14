import { useState } from "react";
import { ArrowLeft, Trash2, Plus, Minus, CheckCircle, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers";
import BottomNav from "@/components/BottomNav/BottomNav";
import Header from "@/components/Header/Header";

const Cart = () => {
  const navigate = useNavigate();
  const { items, increaseQty, decreaseQty, removeFromCart, totalPrice, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const savings = items.reduce((acc, item) => acc + (item.product.mrp - item.product.offerPrice) * item.qty, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate("/orders"), 2800);
    }, 1600);
  };

  return (
    <div className="flex min-h-screen flex-col animate-fade-in bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex md:hidden items-center gap-3 bg-background/85 backdrop-blur-xl px-4 py-3.5 border-b border-border/30">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted active:scale-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1">
          <span className="text-[17px] font-extrabold text-foreground tracking-tight">My Cart</span>
          {items.length > 0 && (
            <span className="ml-2 text-[13px] text-muted-foreground font-medium">({items.length} items)</span>
          )}
        </div>
      </div>

      <div className="hidden md:block"><Header /></div>

      <main className="flex-1 w-full mx-auto max-w-2xl px-0 md:px-6 flex flex-col pt-0 md:pt-10 md:pb-16">
        <h1 className="hidden md:block text-3xl font-extrabold text-foreground tracking-tight mb-8">
          My Cart <span className="text-muted-foreground text-2xl font-medium">({items.length})</span>
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 py-24 px-8 animate-scale-in">
            <div className="h-24 w-24 rounded-3xl bg-muted/60 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-foreground mb-1">Cart is empty</p>
              <p className="text-sm text-muted-foreground">Add items to get started</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-[0_4px_16px_hsl(var(--primary)/0.3)] active:scale-95 transition-all hover:brightness-110"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            {/* Items list */}
            <div className="flex flex-col gap-2.5 px-4 md:px-0 py-2">
              {items.map((item, i) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 rounded-2xl bg-card p-3 border border-border/30 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.02)] animate-slide-right"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Product image */}
                  <div className="h-[72px] w-[72px] shrink-0 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center overflow-hidden border border-border/20">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-14 w-14 object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className="text-[13px] font-semibold text-foreground line-clamp-2 leading-tight">{item.product.name}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[14px] font-black text-foreground">{formatPrice(item.product.offerPrice)}</span>
                      <span className="text-[10px] text-muted-foreground line-through">{formatPrice(item.product.mrp)}</span>
                    </div>

                    {/* Stepper + delete */}
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center rounded-full bg-muted/70 border border-border/40 px-0.5 py-0.5">
                        <button
                          onClick={() => decreaseQty(item.product.id)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-[0_1px_4px_rgba(0,0,0,0.08)] active:scale-90 transition-transform"
                        >
                          <Minus className="h-3 w-3 text-foreground" strokeWidth={2.5} />
                        </button>
                        <span className="px-3 text-[12px] font-black text-foreground">{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item.product.id)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-[0_1px_4px_rgba(0,0,0,0.08)] active:scale-90 transition-transform"
                        >
                          <Plus className="h-3 w-3 text-foreground" strokeWidth={2.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-destructive/10 active:scale-90 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive/70" />
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <span className="shrink-0 text-[13px] font-black text-foreground">
                    {formatPrice(item.product.offerPrice * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Savings badge */}
            {savings > 0 && (
              <div className="mx-4 md:mx-0 mt-2 flex items-center gap-2 rounded-2xl bg-offer/8 border border-offer/20 px-4 py-2.5 animate-fade-up">
                <span className="text-offer text-[12px] font-black">🎉 You save {formatPrice(savings)} on this order!</span>
              </div>
            )}

            {/* Summary + Checkout */}
            <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:relative md:bottom-auto z-40 mx-4 md:mx-0 mt-4 rounded-2xl bg-card border border-border/40 shadow-[0_8px_40px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">Total</p>
                  <p className="text-[22px] font-black text-foreground tracking-tight">{formatPrice(totalPrice())}</p>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="flex items-center justify-center min-w-[148px] rounded-full bg-primary px-8 py-3.5 text-[14px] font-black text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.35)] active:scale-95 transition-all hover:brightness-110 disabled:opacity-70 disabled:scale-100"
                >
                  {isCheckingOut ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  ) : (
                    "Checkout →"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Success overlay */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col items-center p-10 bg-card rounded-3xl border border-border/40 shadow-[0_24px_80px_rgba(0,0,0,0.15)] animate-scale-in mx-6 text-center">
            <div className="relative mb-6">
              <div className="h-24 w-24 rounded-full bg-offer/10 flex items-center justify-center animate-pulse-glow">
                <CheckCircle className="h-12 w-12 text-offer" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight">Order Confirmed!</h2>
            <p className="text-muted-foreground text-sm max-w-[220px] leading-relaxed">
              Your items are being packed and will be on their way shortly.
            </p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Cart;
