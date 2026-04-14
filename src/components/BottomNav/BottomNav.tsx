import { Home, ShoppingBag, RotateCcw, ShoppingCart, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";

const tabs = [
  { label: "Home",      icon: Home,         path: "/" },
  { label: "Orders",    icon: ShoppingBag,  path: "/orders" },
  { label: "Buy Again", icon: RotateCcw,    path: "/orders" },
  { label: "Cart",      icon: ShoppingCart, path: "/cart" },
  { label: "Account",   icon: User,         path: "/account" },
];

const BottomNav = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    /* Floating pill container — sits 12 px above the safe-area edge */
    <nav
      className="fixed inset-x-3 z-50 flex md:hidden items-center rounded-[26px] bg-card/85 backdrop-blur-2xl border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]"
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
            {/* Active pill background */}
            {isActive && (
              <span className="absolute inset-x-1.5 inset-y-1 rounded-[18px] bg-primary/10 animate-scale-in" />
            )}

            <div className="relative z-10">
              <tab.icon
                className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  isActive
                    ? "h-[22px] w-[22px] text-primary scale-110 -translate-y-0.5"
                    : "h-[21px] w-[21px] text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {tab.label === "Cart" && totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -right-2.5 -top-1.5 flex h-[16px] min-w-[16px] animate-badge-pop items-center justify-center rounded-full bg-offer px-1 text-[9px] font-black text-offer-foreground shadow-[0_1px_4px_hsl(var(--offer)/0.45)]"
                >
                  {totalItems}
                </span>
              )}
            </div>

            <span
              className={`relative z-10 text-[9.5px] font-semibold transition-all duration-300 ${
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
