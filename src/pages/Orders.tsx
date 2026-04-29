import { ArrowLeft, Package, MapPin, Banknote, Smartphone, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/helpers";
import BottomNav from "@/components/BottomNav/BottomNav";

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-50 text-emerald-700 dark:bg-blue-900/30 dark:text-blue-400",
  Packed:    "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Shipped:   "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Delivered: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const Orders = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { addToCart } = useCart();

  const handleBuyAgain = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    order.items.forEach((item) => addToCart(item.product));
    navigate("/cart");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background animate-fade-in pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-background dark:bg-[#0a0a0a] border-b border-border dark:border-[#1f1f1f] px-4 py-3.5">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary active:scale-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="text-[17px] font-semibold text-foreground">My Orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 py-24 px-8 animate-scale-in">
          <div className="h-20 w-20 rounded-2xl bg-card border border-border flex items-center justify-center">
            <Package className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-1">Your placed orders will appear here</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-foreground px-8 py-3 text-sm font-medium text-background hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 md:px-6 py-4 md:py-8 flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-border bg-card overflow-hidden animate-slide-right">
              {/* Order header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Order #{order.id.slice(-6)}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    {new Date(order.placedAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    {order.paymentMethod === "COD"
                      ? <Banknote className="h-3.5 w-3.5" />
                      : <Smartphone className="h-3.5 w-3.5" />
                    }
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="px-4 py-3 flex flex-col gap-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="h-12 w-12 shrink-0 rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden active:scale-95 transition-transform"
                    >
                      <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-contain" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground line-clamp-1">{item.product.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Qty: {item.qty} × {formatPrice(item.product.offerPrice)}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-foreground shrink-0">
                      {formatPrice(item.product.offerPrice * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="mx-4 mb-3 rounded-xl bg-background border border-border px-3 py-2.5 flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-foreground">{order.address.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city}, {order.address.state} - {order.address.pincode}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background">
                <div>
                  <span className="text-[11px] text-muted-foreground">Order Total </span>
                  <span className="text-[14px] font-bold text-foreground">{formatPrice(order.total)}</span>
                  {order.savings > 0 && (
                    <span className="ml-2 text-[11px] font-medium text-green-600 dark:text-green-400">
                      saved {formatPrice(order.savings)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleBuyAgain(order.id)}
                  className="flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-[12px] font-semibold text-background hover:opacity-90 active:scale-[0.97] transition-all"
                >
                  <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
                  Buy Again
                </button>
              </div>
            </div>
          ))}
        </main>
      )}

      <BottomNav />
    </div>
  );
};

export default Orders;
