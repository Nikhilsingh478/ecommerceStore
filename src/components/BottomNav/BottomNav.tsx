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
    <nav className="fixed inset-x-0 bottom-0 z-50 flex md:hidden bg-card/85 backdrop-blur-2xl border-t border-border/30 shadow-[0_-1px_0_0_hsl(var(--border)/0.3),0_-8px_32px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "calc(0.375rem + env(safe-area-inset-bottom))" }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path ||
          (tab.path !== "/" && location.pathname.startsWith(tab.path));

        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 pt-2 pb-1 active:scale-90 transition-transform duration-150"
          >
            {/* Active pill indicator */}
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-b-full bg-primary animate-pop-in" />
            )}

            <div className="relative">
              <tab.icon
                className={`h-[22px] w-[22px] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  isActive
                    ? "text-primary scale-[1.15] -translate-y-0.5"
                    : "text-muted-foreground scale-100"
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {tab.label === "Cart" && totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -right-2 -top-1 flex h-[16px] min-w-[16px] animate-badge-pop items-center justify-center rounded-full bg-offer px-1 text-[9px] font-bold text-offer-foreground shadow-[0_1px_4px_hsl(var(--offer)/0.4)]"
                >
                  {totalItems}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] font-semibold transition-all duration-300 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
