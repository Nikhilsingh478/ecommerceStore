import { useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, ChevronLeft } from "lucide-react";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import ProductCard from "@/components/ProductCard/ProductCard";
import FilterDrawer from "@/components/FilterDrawer/FilterDrawer";
import SortDrawer from "@/components/SortDrawer/SortDrawer";
import { products } from "@/data/products";

const ProductListing = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("popular");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const filtered = useMemo(() => {
    let list = products;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
      );
    } else if (subcategory) {
      list = list.filter((p) => p.subcategory === subcategory);
    } else if (category) {
      list = list.filter((p) => p.category === category || p.brand.toLowerCase() === category);
    }
    if (filters.Category?.length) list = list.filter((p) => filters.Category.includes(p.category));
    if (filters.Brand?.length)    list = list.filter((p) => filters.Brand.includes(p.brand));
    if (filters.Discount?.length) {
      const min = Math.min(...filters.Discount.map(d => parseInt(d)));
      list = list.filter(p => p.discount >= min);
    }
    if (filters.Price?.length) {
      list = list.filter(p => filters.Price.some(b => {
        if (b === "Under ₹100")    return p.offerPrice < 100;
        if (b === "₹100 - ₹300")  return p.offerPrice >= 100 && p.offerPrice <= 300;
        if (b === "₹300 - ₹500")  return p.offerPrice > 300 && p.offerPrice <= 500;
        if (b === "Above ₹500")   return p.offerPrice > 500;
        return false;
      }));
    }
    switch (sortValue) {
      case "price-low":     list = [...list].sort((a, b) => a.offerPrice - b.offerPrice); break;
      case "price-high":    list = [...list].sort((a, b) => b.offerPrice - a.offerPrice); break;
      case "discount-low":  list = [...list].sort((a, b) => a.discount - b.discount); break;
      case "discount-high": list = [...list].sort((a, b) => b.discount - a.discount); break;
    }
    return list;
  }, [category, subcategory, sortValue, filters, query]);

  const rawTitle = query ? `"${query}"` : (subcategory || category || "All Products");
  const title = typeof rawTitle === "string" ? rawTitle.replace(/-/g, " ") : rawTitle;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="hidden md:block"><Header /></div>

      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-3 bg-white/90 dark:bg-[#080808]/95 backdrop-blur-xl px-4 py-3.5 border-b border-border">
        <button onClick={() => navigate(-1)} className="active:scale-90 transition-transform -ml-1">
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
        <span className="text-[17px] font-semibold text-foreground capitalize">{title}</span>
      </div>

      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8 flex flex-col pt-0 md:pt-8 animate-fade-in">

        {/* Desktop title */}
        <div className="hidden md:flex flex-col pb-6 border-b border-border mb-6">
          <h1 className="text-3xl font-semibold text-foreground capitalize tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">{filtered.length} products found</p>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between px-4 md:px-0 py-3 md:py-0 md:mb-6">
          <p className="md:hidden text-[13px] text-muted-foreground">{filtered.length} items</p>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setSortOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-card border border-border px-4 py-2 text-[13px] font-medium text-foreground active:scale-95 transition-transform hover:bg-secondary"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
              Sort
            </button>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-card border border-border px-4 py-2 text-[13px] font-medium text-foreground active:scale-95 transition-transform hover:bg-secondary"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
              Filter
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-4 md:px-0">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-4">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" strokeWidth={1.7} />
            </div>
            <h3 className="text-base font-semibold text-foreground">No products found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">Try adjusting your filters</p>
          </div>
        )}
      </main>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setFilters} />
      <SortDrawer open={sortOpen} onClose={() => setSortOpen(false)} value={sortValue} onChange={setSortValue} />
      <BottomNav />
    </div>
  );
};

export default ProductListing;
