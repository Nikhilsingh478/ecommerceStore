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

  const savings = items.reduce((acc, item) =>
    acc + (item.product.mrp - item.product.offerPrice) * item.qty, 0);

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
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] animate-fade-in pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">

      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex md:hidden items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3.5 border-b border-[#E2E8F0]">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F1F5F9] active:scale-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-[#0F172A]" />
        </button>
        <div className="flex-1">
          <span className="text-[17px] font-semibold text-[#0F172A]">Cart</span>
          {items.length > 0 && (
            <span className="ml-1.5 text-[13px] text-[#64748B]">({items.length})</span>
          )}
        </div>
      </div>

      <div className="hidden md:block"><Header /></div>

      <main className="flex-1 w-full mx-auto max-w-2xl px-0 md:px-6 flex flex-col pt-0 md:pt-10 md:pb-16">
        <h1 className="hidden md:block text-3xl font-semibold text-[#0F172A] tracking-tight mb-8">
          Cart <span className="text-[#64748B] text-2xl font-normal">({items.length})</span>
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 py-24 px-8 animate-scale-in">
            <div className="h-20 w-20 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-[#94A3B8]" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-[#0F172A]">Your cart is empty</p>
              <p className="text-sm text-[#64748B] mt-1">Add items to get started</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="rounded-xl bg-[#0F172A] px-8 py-3 text-sm font-medium text-white hover:bg-[#1E293B] active:scale-[0.97] transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            {/* Items */}
            <div className="flex flex-col gap-2 px-4 md:px-0 py-2">
              {items.map((item, i) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-2xl bg-white border border-[#F1F5F9] p-4 animate-slide-right"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="h-[70px] w-[70px] shrink-0 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-14 w-14 object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#0F172A] line-clamp-2 leading-snug">
                      {item.product.name}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[13px] font-semibold text-[#0F172A]">{formatPrice(item.product.offerPrice)}</span>
                      <span className="text-[10px] text-[#94A3B8] line-through">{formatPrice(item.product.mrp)}</span>
                    </div>

                    {/* Stepper */}
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-0.5">
                        <button
                          onClick={() => decreaseQty(item.product.id)}
                          className="flex h-6 w-6 items-center justify-center rounded-lg bg-white border border-[#E2E8F0] active:scale-90 transition-transform"
                        >
                          <Minus className="h-3 w-3 text-[#0F172A]" strokeWidth={2.5} />
                        </button>
                        <span className="px-2.5 text-[12px] font-semibold text-[#0F172A]">{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item.product.id)}
                          className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0F172A] text-white active:scale-90 transition-transform"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 active:scale-90 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-[#94A3B8] hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>

                  <span className="shrink-0 text-[13px] font-semibold text-[#0F172A]">
                    {formatPrice(item.product.offerPrice * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Savings */}
            {savings > 0 && (
              <div className="mx-4 md:mx-0 mt-2 flex items-center gap-2 rounded-xl bg-green-50 border border-green-100 px-4 py-2.5 animate-fade-up">
                <span className="text-[12px] font-medium text-green-700">
                  You save {formatPrice(savings)} on this order
                </span>
              </div>
            )}

            {/* Summary + Checkout */}
            <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:relative md:bottom-auto z-40 mx-4 md:mx-0 mt-4 rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider mb-0.5">Total</p>
                  <p className="text-[22px] font-semibold text-[#0F172A] tracking-tight">{formatPrice(totalPrice())}</p>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="flex items-center justify-center min-w-[140px] rounded-xl bg-[#0F172A] px-8 py-3.5 text-[14px] font-medium text-white hover:bg-[#1E293B] active:scale-[0.97] transition-all disabled:opacity-60 disabled:scale-100"
                >
                  {isCheckingOut ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Success overlay */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm animate-fade-in">
          <div className="flex flex-col items-center p-10 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_rgba(15,23,42,0.10)] animate-scale-in mx-6 text-center">
            <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-[#0F172A] mb-2">Order Confirmed</h2>
            <p className="text-[#64748B] text-sm leading-relaxed max-w-[200px]">
              Your items are being packed and will arrive shortly.
            </p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Cart;
