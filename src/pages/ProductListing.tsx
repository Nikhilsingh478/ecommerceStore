import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import ProductCard from "@/components/ProductCard/ProductCard";
import FilterDrawer from "@/components/FilterDrawer/FilterDrawer";
import SortDrawer from "@/components/SortDrawer/SortDrawer";
import { products } from "@/data/products";

const ProductListing = () => {
  const { category, subcategory } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("popular");
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const filtered = useMemo(() => {
    let list = products;
    if (subcategory) list = list.filter((p) => p.subcategory === subcategory);
    else if (category) list = list.filter((p) => p.category === category || p.brand.toLowerCase() === category);

    if (filters.Brand?.length) list = list.filter((p) => filters.Brand.includes(p.brand.toLowerCase()));

    switch (sortValue) {
      case "price-low": list = [...list].sort((a, b) => a.offerPrice - b.offerPrice); break;
      case "price-high": list = [...list].sort((a, b) => b.offerPrice - a.offerPrice); break;
      case "discount-low": list = [...list].sort((a, b) => a.discount - b.discount); break;
      case "discount-high": list = [...list].sort((a, b) => b.discount - a.discount); break;
    }
    return list;
  }, [category, subcategory, sortValue, filters]);

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <div className="flex border-b border-border bg-card">
        <button onClick={() => setFilterOpen(true)} className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
        </button>
        <div className="w-px bg-border" />
        <button onClick={() => setSortOpen(true)} className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-foreground">
          <ArrowUpDown className="h-3.5 w-3.5" /> Sort
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 p-2">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-sm text-muted-foreground">No products found</div>
      )}

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setFilters} />
      <SortDrawer open={sortOpen} onClose={() => setSortOpen(false)} value={sortValue} onChange={setSortValue} />
      <BottomNav />
    </div>
  );
};

export default ProductListing;
