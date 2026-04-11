import { useState } from "react";
import { X } from "lucide-react";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string[]>) => void;
}

const filterTabs = ["Category", "Brand", "Discount", "Price"];
const discountOptions = ["10% & above", "20% & above", "30% & above"];
const priceOptions = ["Under ₹100", "₹100 - ₹300", "₹300 - ₹500", "Above ₹500"];

const FilterDrawer = ({ open, onClose, onApply }: FilterDrawerProps) => {
  const [activeTab, setActiveTab] = useState("Category");
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  if (!open) return null;

  const toggle = (group: string, value: string) => {
    setSelected((s) => {
      const arr = s[group] || [];
      return { ...s, [group]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const getOptions = () => {
    if (activeTab === "Category") return categories.map((c) => ({ id: c.id, label: c.name }));
    if (activeTab === "Brand") return brands.map((b) => ({ id: b.id, label: b.name }));
    if (activeTab === "Discount") return discountOptions.map((d) => ({ id: d, label: d }));
    return priceOptions.map((p) => ({ id: p, label: p }));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative max-h-[70vh] animate-slide-up rounded-t-xl bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-sm font-bold text-foreground">Filters</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <div className="flex" style={{ minHeight: 280 }}>
          <div className="w-28 shrink-0 border-r border-border bg-muted">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full px-3 py-3 text-left text-xs ${activeTab === tab ? "bg-card font-bold text-primary" : "text-secondary-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {getOptions().map((opt) => (
              <label key={opt.id} className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  checked={(selected[activeTab] || []).includes(opt.id)}
                  onChange={() => toggle(activeTab, opt.id)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary"
                />
                <span className="text-xs text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3 border-t border-border p-3">
          <button onClick={() => setSelected({})} className="flex-1 rounded-md border border-border py-2 text-xs font-semibold text-muted-foreground">
            Reset
          </button>
          <button onClick={() => { onApply(selected); onClose(); }} className="flex-1 rounded-md bg-primary py-2 text-xs font-semibold text-primary-foreground">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
