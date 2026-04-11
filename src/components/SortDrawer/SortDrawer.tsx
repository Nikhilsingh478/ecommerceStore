import { X } from "lucide-react";

interface SortDrawerProps {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { id: "popular", label: "Popular" },
  { id: "latest", label: "Latest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "discount-low", label: "Discount: Low to High" },
  { id: "discount-high", label: "Discount: High to Low" },
];

const SortDrawer = ({ open, onClose, value, onChange }: SortDrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative animate-slide-up rounded-t-xl bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-sm font-bold text-foreground">Sort By</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <div className="p-3">
          {sortOptions.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 py-2.5">
              <input
                type="radio"
                name="sort"
                checked={value === opt.id}
                onChange={() => { onChange(opt.id); onClose(); }}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-xs text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortDrawer;
