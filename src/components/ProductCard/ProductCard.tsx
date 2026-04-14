import { Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, getDiscountLabel } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, increaseQty, decreaseQty } = useCartStore();
  const qty = useCartStore((s) => s.getQty(product.id));
  const navigate = useNavigate();

  return (
    <div
      className="group flex flex-col rounded-[20px] bg-card overflow-hidden border border-border/30 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-350 ease-out active:scale-[0.97] md:hover:-translate-y-2 md:hover:shadow-[0_12px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] md:hover:border-border/50 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/60 dark:from-slate-900/60 dark:to-slate-800/40 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-3 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.1]"
          loading="lazy"
          decoding="async"
        />

        {/* Discount badge */}
        {product.discount > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-offer px-2.5 py-0.5 text-[10px] font-black tracking-wide text-offer-foreground shadow-[0_2px_6px_hsl(var(--offer)/0.35)]">
            {getDiscountLabel(product.discount)}
          </span>
        )}
      </div>

      {/* Info ───────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-3 gap-2">
        <p className="line-clamp-2 text-[12.5px] font-semibold leading-snug text-foreground">{product.name}</p>

        <div className="flex items-baseline gap-1.5 mt-auto">
          <span className="text-[14px] font-black text-foreground tracking-tight">{formatPrice(product.offerPrice)}</span>
          {product.mrp > product.offerPrice && (
            <span className="text-[10.5px] text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>

        {/* Add / Stepper */}
        <div className="h-[34px] mt-0.5">
          {qty === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="flex w-full h-full items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground text-[12px] font-black shadow-[0_2px_12px_hsl(var(--primary)/0.35)] transition-all duration-300 active:scale-95 md:hover:shadow-[0_4px_20px_hsl(var(--primary)/0.4)] md:hover:brightness-110"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={3} />
              ADD
            </button>
          ) : (
            <div
              className="flex w-full h-full items-center justify-between rounded-full border-2 border-primary/25 bg-primary/8 px-0.5 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => decreaseQty(product.id)}
                className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_1px_6px_hsl(var(--primary)/0.3)] active:scale-90 transition-transform"
              >
                <Minus className="h-3 w-3" strokeWidth={3} />
              </button>
              <span className="text-[13px] font-black text-primary">{qty}</span>
              <button
                onClick={() => increaseQty(product.id)}
                className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_1px_6px_hsl(var(--primary)/0.3)] active:scale-90 transition-transform"
              >
                <Plus className="h-3 w-3" strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
