import { Search, ShoppingCart, User, Package, X, ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useState, useRef, useEffect, useMemo } from "react";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/helpers";

const Header = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [mobileSearchOpen]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
      setSearchQuery("");
    }
  };

  const liveResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-[0_1px_0_0_hsl(var(--border)/0.4),0_4px_16px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[58px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">

          {/* Logo — always visible */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 shrink-0 active:scale-95 transition-transform"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary shadow-[0_2px_8px_hsl(var(--primary)/0.35)]">
              <ShoppingCart className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-[17px] font-extrabold tracking-tight text-foreground hidden sm:block">
              Swift<span className="text-primary">Cart</span>
            </span>
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-auto relative">
            <form onSubmit={handleSearch} className="flex w-full items-center gap-2.5 rounded-full bg-muted/70 px-4 py-2.5 border border-border/50 transition-all duration-300 focus-within:bg-card focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)] hover:border-border">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </form>

            {searchQuery.trim().length >= 2 && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl bg-card/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-border/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {liveResults.length > 0 ? (
                  <>
                    {liveResults.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => { navigate(`/product/${p.id}`); setSearchQuery(""); }}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/20 last:border-0"
                        style={{ animationDelay: `${i * 30}ms` }}
                      >
                        <div className="h-10 w-10 rounded-xl bg-muted/60 overflow-hidden shrink-0 flex items-center justify-center">
                          <img src={p.image} alt="" className="h-9 w-9 object-contain" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-foreground line-clamp-1">{p.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{p.brand}</p>
                        </div>
                        <span className="text-sm font-bold text-foreground shrink-0">{formatPrice(p.offerPrice)}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => handleSearch()}
                      className="flex items-center justify-center gap-2 w-full p-3 text-[13px] font-bold text-primary hover:bg-primary/5 transition-colors bg-muted/20"
                    >
                      <Search className="h-3.5 w-3.5" />
                      View all results for "{searchQuery}"
                    </button>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">No results for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile search trigger */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="md:hidden flex-1 flex items-center gap-2.5 rounded-full bg-muted/70 px-3.5 py-2 border border-border/50 text-sm text-muted-foreground font-medium active:scale-[0.98] transition-transform"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Search products...</span>
          </button>

          {/* Desktop Nav Icons */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { icon: RotateCcw, label: "Buy Again", path: "/orders" },
              { icon: Package, label: "Orders", path: "/orders" },
              { icon: User, label: "Account", path: "/account" },
            ].map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 group"
              >
                <Icon className="h-[19px] w-[19px] group-hover:scale-110 transition-transform duration-200" />
                <span className="text-[10px] font-semibold">{label}</span>
              </button>
            ))}

            <button
              onClick={() => navigate("/cart")}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 group ml-1"
            >
              <ShoppingCart className="h-[19px] w-[19px] group-hover:scale-110 transition-transform duration-200" />
              <span className="text-[10px] font-semibold">Cart</span>
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -top-0.5 right-1.5 flex h-[18px] min-w-[18px] animate-badge-pop items-center justify-center rounded-full bg-offer px-1 text-[10px] font-bold text-offer-foreground shadow-[0_1px_4px_hsl(var(--offer)/0.4)]"
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-250">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40">
            <button
              onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted active:scale-90 transition-all"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2.5 rounded-full bg-muted px-4 py-2.5 border border-border/50 focus-within:border-primary/40 focus-within:bg-card transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[15px] font-medium outline-none text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </form>
          </div>

          <div className="flex-1 overflow-y-auto">
            {searchQuery.trim().length < 2 ? (
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Popular</p>
                <div className="flex flex-wrap gap-2">
                  {["Milk", "Bread", "Tata", "Atta", "Detergent", "Eggs"].map(tag => (
                    <button
                      key={tag}
                      onClick={() => { navigate(`/search?q=${tag}`); setMobileSearchOpen(false); setSearchQuery(""); }}
                      className="px-4 py-2 rounded-full bg-card border border-border/60 text-sm font-semibold text-foreground shadow-sm active:scale-95 transition-all hover:border-primary/30 hover:bg-primary/5"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {liveResults.length > 0 ? (
                  <>
                    {liveResults.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => { navigate(`/product/${p.id}`); setMobileSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center gap-4 w-full px-5 py-3.5 hover:bg-muted/40 transition-colors border-b border-border/20 animate-fade-up"
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <div className="h-12 w-12 rounded-2xl bg-muted/60 overflow-hidden shrink-0 flex items-center justify-center border border-border/20">
                          <img src={p.image} alt="" className="h-10 w-10 object-contain" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-foreground line-clamp-1">{p.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{p.brand}</p>
                        </div>
                        <span className="text-sm font-bold text-foreground shrink-0">{formatPrice(p.offerPrice)}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => handleSearch()}
                      className="mx-5 mt-3 mb-6 flex items-center justify-center gap-2 w-[calc(100%-40px)] p-3.5 rounded-2xl bg-primary/10 text-[14px] font-bold text-primary active:scale-98 transition-transform"
                    >
                      <Search className="h-4 w-4" />
                      View all results for "{searchQuery}"
                    </button>
                  </>
                ) : (
                  <div className="py-24 flex flex-col items-center justify-center text-center">
                    <Search className="h-12 w-12 mx-auto mb-3 text-muted-foreground/20" />
                    <p className="text-base font-semibold text-foreground">No results found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
