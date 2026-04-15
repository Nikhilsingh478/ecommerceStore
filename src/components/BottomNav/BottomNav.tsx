import { Home, ShoppingBag, RotateCcw, ShoppingCart, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";

const tabs = [
  { label: "Home",      icon: Home,         path: "/" },
  { label: "Orders",    icon: ShoppingBag,  path: "/orders" },
  { label: "Buy Again", icon: RotateCcw,    path: "/buy-again" },
  { label: "Cart",      icon: ShoppingCart, path: "/cart" },
  { label: "Account",   icon: User,         path: "/account" },
];

const BottomNav = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav
      className="fixed inset-x-4 z-50 flex md:hidden items-center rounded-[24px] bg-card/95 backdrop-blur-xl border border-border shadow-[0_4px_24px_rgba(15,23,42,0.10),0_1px_4px_rgba(15,23,42,0.04)]"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      {tabs.map((tab) => {
        const isActive =
          tab.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(tab.path);

        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-3 active:scale-90 transition-transform duration-150"
          >
            {isActive && (
              <span className="absolute inset-x-2 inset-y-1 rounded-[18px] bg-secondary animate-scale-in" />
            )}

            <div className="relative z-10">
              <tab.icon
                className={`transition-all duration-250 ${
                  isActive
                    ? "h-[21px] w-[21px] text-foreground -translate-y-px"
                    : "h-[20px] w-[20px] text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2.2 : 1.7}
              />
              {tab.label === "Cart" && totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -right-2 -top-1.5 flex h-[15px] min-w-[15px] animate-badge-pop items-center justify-center rounded-full bg-[#2563EB] px-1 text-[9px] font-bold text-white"
                >
                  {totalItems}
                </span>
              )}
            </div>

            <span
              className={`relative z-10 text-[9.5px] font-medium transition-colors duration-250 ${
                isActive ? "text-foreground" : "text-muted-foreground"
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
