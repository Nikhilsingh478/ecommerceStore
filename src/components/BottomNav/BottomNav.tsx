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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card py-1 shadow-lg">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className="relative flex flex-col items-center gap-0.5 px-2 py-1"
          >
            <tab.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
            {tab.label === "Cart" && totalItems > 0 && (
              <span className="absolute -right-1 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-offer px-1 text-[10px] font-bold text-offer-foreground">
                {totalItems}
              </span>
            )}
            <span className={`text-[10px] ${isActive ? "font-semibold text-primary" : "text-muted-foreground"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
