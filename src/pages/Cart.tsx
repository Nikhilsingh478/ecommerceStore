import { useState } from "react";
import { ArrowLeft, Trash2, Plus, Minus, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers";
import BottomNav from "@/components/BottomNav/BottomNav";

const Cart = () => {
  const navigate = useNavigate();
  const { items, increaseQty, decreaseQty, removeFromCart, totalPrice, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setSuccess(true);
      clearCart();
      
      setTimeout(() => {
        navigate("/orders");
      }, 2500);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col animate-in fade-in duration-300 pb-16 md:pb-0 bg-background">
      <div className="sticky top-0 z-40 flex md:hidden items-center gap-3 bg-card px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5 text-foreground" /></button>
        <span className="text-sm font-medium text-foreground">Cart ({items.length} items)</span>
      </div>

      <main className="flex-1 w-full mx-auto max-w-3xl md:px-6 lg:px-8 flex flex-col pt-0 md:pt-8 bg-background">
        <h1 className="hidden md:block text-2xl font-bold text-foreground mb-6">Your Cart ({items.length} items)</h1>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
            <button onClick={() => navigate("/")} className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-6 w-full">
            <div className="flex flex-col gap-3 p-4 md:p-0">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 rounded-[16px] bg-card p-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-transform active:scale-[0.98]">
                <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-xl bg-muted/40 p-2 object-contain mix-blend-multiply" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-xs font-medium text-foreground">{item.product.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">{formatPrice(item.product.offerPrice)}</span>
                    <span className="text-[10px] text-muted-foreground line-through">{formatPrice(item.product.mrp)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="flex items-center rounded-full bg-muted/50 px-1 py-1">
                      <button onClick={() => decreaseQty(item.product.id)} className="flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-[0_1px_4px_rgba(0,0,0,0.1)] active:scale-95"><Minus className="h-3 w-3 text-foreground" /></button>
                      <span className="px-3 text-[12px] font-bold text-foreground">{item.qty}</span>
                      <button onClick={() => increaseQty(item.product.id)} className="flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-[0_1px_4px_rgba(0,0,0,0.1)] active:scale-95"><Plus className="h-3 w-3 text-foreground" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-2 active:scale-95"><Trash2 className="h-4 w-4 text-destructive/80" /></button>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground">{formatPrice(item.product.offerPrice * item.qty)}</span>
              </div>
            ))}
            </div>

            <div className="sticky bottom-0 md:relative z-40 flex items-center justify-between bg-card px-5 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] md:shadow-[0_2px_12px_rgba(0,0,0,0.03)] md:rounded-[16px]">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-foreground">{formatPrice(totalPrice())}</p>
              </div>
              <button 
                onClick={handleCheckout} 
                disabled={isCheckingOut}
                className="rounded-full bg-primary flex items-center justify-center min-w-[140px] px-8 py-2.5 text-sm font-bold text-primary-foreground active:scale-95 transition-all shadow-[0_4px_12px_rgba(var(--primary),0.2)] disabled:opacity-70 disabled:scale-100"
              >
                {isCheckingOut ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"></div>
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center p-8 bg-card rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-500 delay-150 fill-mode-both">
            <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground text-center">Your items are being packed and will be shipped shortly.</p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Cart;
