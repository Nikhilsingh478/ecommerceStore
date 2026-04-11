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
      inputRef.current.focus();
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
    return products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 5);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border/20 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex h-16 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        
        {/* Mobile Search Bar header placeholder */}
        <div className="flex-1 md:hidden">
          <div
            className="flex items-center gap-2 rounded-[14px] bg-card px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all"
            onClick={() => setMobileSearchOpen(true)}
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-[13px] text-muted-foreground font-medium">Search...</span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl lg:px-12 md:px-6 relative group">
          <form onSubmit={handleSearch} className="flex w-full items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors focus-within:ring-2 focus-within:ring-primary/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border/30">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search for products, brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground border-none" 
            />
          </form>

          {searchQuery.trim().length >= 2 && (
            <div className="absolute top-[110%] left-6 lg:left-12 right-6 lg:right-12 rounded-2xl bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-border/40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              {liveResults.length > 0 ? (
                <div className="flex flex-col">
                  {liveResults.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border/20 last:border-0"
                    >
                      <img src={p.image} alt="" className="h-10 w-10 rounded-md object-cover bg-muted/30" />
                      <div className="text-left">
                        <p className="text-[13px] font-semibold text-foreground line-clamp-1">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand} • {formatPrice(p.offerPrice)}</p>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => handleSearch()} className="p-3 text-[13px] font-bold text-primary hover:bg-primary/5 text-center transition-colors bg-muted/20">
                    View all results
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <button onClick={() => navigate("/orders")} className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all hover:-translate-y-0.5">
            <RotateCcw className="h-[20px] w-[20px]" />
            <span className="text-[11px] font-semibold">Buy Again</span>
          </button>

          <button onClick={() => navigate("/orders")} className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all hover:-translate-y-0.5">
            <Package className="h-[20px] w-[20px]" />
            <span className="text-[11px] font-semibold">Orders</span>
          </button>

          <button onClick={() => navigate("/account")} className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all hover:-translate-y-0.5">
            <User className="h-[20px] w-[20px]" />
            <span className="text-[11px] font-semibold">Account</span>
          </button>
          
          <button onClick={() => navigate("/cart")} className="relative flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all hover:-translate-y-0.5">
            <ShoppingCart className="h-[20px] w-[20px]" />
            <span className="text-[11px] font-semibold">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] animate-in zoom-in items-center justify-center rounded-full bg-offer px-1 text-[10px] font-bold text-offer-foreground shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full Screen Search Overlay */}
      {mobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-card">
            <button onClick={() => setMobileSearchOpen(false)} className="active:scale-95 transition-transform p-1">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 rounded-full bg-muted/50 px-4 py-2 border border-border/40">
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[15px] outline-none text-foreground" 
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
               <div className="p-4">
                 <p className="text-sm font-semibold text-muted-foreground mb-4">Popular Searches</p>
                 <div className="flex flex-wrap gap-2">
                    {["Milk", "Detergent", "Tata", "Atta"].map(tag => (
                       <button 
                         key={tag}
                         onClick={() => {
                           setSearchQuery(tag);
                           navigate(`/search?q=${tag}`);
                           setMobileSearchOpen(false);
                           setSearchQuery("");
                         }}
                         className="px-4 py-1.5 rounded-full bg-card border border-border/50 text-sm font-medium text-foreground shadow-sm active:scale-95 transition-transform"
                       >
                         {tag}
                       </button>
                    ))}
                 </div>
               </div>
             ) : (
               <div className="flex flex-col">
                 <p className="px-4 pt-4 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/10 sticky top-0 backdrop-blur-md">Search Results</p>
                 {liveResults.length > 0 ? (
                   <>
                     {liveResults.map((p, i) => (
                       <button 
                         key={p.id}
                         onClick={() => {
                           navigate(`/product/${p.id}`);
                           setMobileSearchOpen(false);
                           setSearchQuery("");
                         }}
                         className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/20 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                         style={{ animationDelay: `${i * 40}ms` }}
                       >
                         <img src={p.image} alt="" className="h-12 w-12 rounded-md object-contain bg-muted/40 p-1" />
                         <div className="text-left flex-1">
                           <p className="text-sm font-semibold text-foreground line-clamp-1">{p.name}</p>
                           <p className="text-xs text-muted-foreground mt-0.5">{p.brand}</p>
                         </div>
                         <p className="text-sm font-bold text-foreground">{formatPrice(p.offerPrice)}</p>
                       </button>
                     ))}
                     <button onClick={() => handleSearch()} className="m-4 p-3 rounded-[12px] bg-primary/10 text-[13px] font-bold text-primary active:scale-95 transition-transform text-center shadow-sm">
                       View all results for "{searchQuery}"
                     </button>
                   </>
                 ) : (
                   <div className="py-20 text-center text-muted-foreground">
                     <Search className="h-10 w-10 mx-auto mb-3 opacity-20" />
                     <p>No products found for "{searchQuery}"</p>
                   </div>
                 )}
               </div>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
