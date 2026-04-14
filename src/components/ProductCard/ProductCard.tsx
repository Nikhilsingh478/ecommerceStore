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
      className="flex flex-col rounded-2xl bg-card border border-border/40 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out active:scale-[0.97] md:hover:-translate-y-1.5 md:hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:hover:border-border/60 group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/60 to-muted/30 p-4 pb-3">
        <img
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="aspect-square w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08]"
          loading="lazy"
          decoding="async"
        />
        {product.discount > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-offer px-2 py-0.5 text-[10px] font-bold tracking-wide text-offer-foreground shadow-[0_1px_4px_hsl(var(--offer)/0.3)]">
            {getDiscountLabel(product.discount)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-2.5 pt-2">
        <p className="line-clamp-2 text-[12.5px] font-semibold leading-snug text-foreground">{product.name}</p>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-[14px] font-extrabold text-foreground tracking-tight">{formatPrice(product.offerPrice)}</span>
          {product.mrp > product.offerPrice && (
            <span className="text-[11px] text-muted-foreground line-through font-medium">{formatPrice(product.mrp)}</span>
          )}
        </div>

        {/* Add to cart */}
        <div className="mt-1.5 h-8">
          {qty === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="flex w-full h-full items-center justify-center gap-1 rounded-full bg-primary text-primary-foreground text-[12px] font-bold shadow-[0_2px_8px_hsl(var(--primary)/0.3)] transition-all duration-300 active:scale-95 md:hover:shadow-[0_4px_16px_hsl(var(--primary)/0.35)] md:hover:brightness-110"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={3} />
              ADD
            </button>
          ) : (
            <div
              className="flex w-full h-full items-center justify-between rounded-full bg-primary/10 border border-primary/20 px-0.5 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => decreaseQty(product.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm active:scale-90 transition-transform"
              >
                <Minus className="h-3 w-3" strokeWidth={3} />
              </button>
              <span className="text-[13px] font-extrabold text-primary">{qty}</span>
              <button
                onClick={() => increaseQty(product.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm active:scale-90 transition-transform"
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
