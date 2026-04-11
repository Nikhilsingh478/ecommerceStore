import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers";
import BottomNav from "@/components/BottomNav/BottomNav";

const Cart = () => {
  const navigate = useNavigate();
  const { items, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCartStore();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card px-3 py-2.5 shadow-sm">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5 text-foreground" /></button>
        <span className="text-sm font-medium text-foreground">Cart ({items.length} items)</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
          <button onClick={() => navigate("/")} className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col gap-2 p-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 rounded-lg bg-card p-3 shadow-sm">
                <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-md object-cover" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-xs font-medium text-foreground">{item.product.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">{formatPrice(item.product.offerPrice)}</span>
                    <span className="text-[10px] text-muted-foreground line-through">{formatPrice(item.product.mrp)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="flex items-center rounded border border-border">
                      <button onClick={() => decreaseQty(item.product.id)} className="px-2 py-1"><Minus className="h-3 w-3 text-foreground" /></button>
                      <span className="px-2 text-xs font-bold text-foreground">{item.qty}</span>
                      <button onClick={() => increaseQty(item.product.id)} className="px-2 py-1"><Plus className="h-3 w-3 text-foreground" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)}><Trash2 className="h-4 w-4 text-destructive" /></button>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground">{formatPrice(item.product.offerPrice * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 z-40 flex items-center justify-between border-t border-border bg-card px-4 py-3 shadow-lg">
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-foreground">{formatPrice(totalPrice())}</p>
            </div>
            <button className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
              Checkout
            </button>
          </div>
        </>
      )}
      <BottomNav />
    </div>
  );
};

export default Cart;
