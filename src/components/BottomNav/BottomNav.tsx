import { Home, ShoppingBag, RotateCcw, ShoppingCart, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Orders", icon: ShoppingBag, path: "/orders" },
  { label: "Buy Again", icon: RotateCcw, path: "/orders" },
  { label: "Cart", icon: ShoppingCart, path: "/cart" },
  { label: "Account", icon: User, path: "/account" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex md:hidden items-center justify-around bg-card pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 active:scale-95 transition-transform"
          >
            <tab.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
            {tab.label === "Cart" && totalItems > 0 && (
              <span className="absolute -right-1 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-offer px-1 text-[10px] font-bold text-offer-foreground">
                {totalItems}
              </span>
            )}
            <span className={`text-[10px] ${isActive ? "font-semibold text-primary" : "text-foreground/80 font-medium"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
