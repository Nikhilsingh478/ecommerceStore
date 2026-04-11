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
      className="flex flex-col rounded-[16px] bg-card p-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 active:scale-[0.98] md:hover:-translate-y-1"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative cursor-pointer overflow-hidden rounded-xl bg-muted/40 p-4">
        <img
          src={product.image}
          alt=""
          className="aspect-square w-full object-contain transition-transform duration-500 hover:scale-110 mix-blend-multiply"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-offer/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-offer">
            {getDiscountLabel(product.discount)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1 py-2">
        <p className="truncate text-[13px] font-semibold text-foreground">{product.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-sm font-bold text-foreground">{formatPrice(product.offerPrice)}</span>
          <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
        </div>
        <div className="mt-2 h-8">
          {qty === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="flex w-full h-full items-center justify-center rounded-full bg-primary/10 text-[13px] font-bold text-primary transition-all active:scale-95"
            >
              ADD
            </button>
          ) : (
            <div 
              className="flex w-full h-full items-center justify-between rounded-full bg-muted/50 px-1 transition-all text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => decreaseQty(product.id)} className="flex h-6 w-7 items-center justify-center rounded-full bg-card shadow-[0_1px_4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="text-[12px] font-bold">{qty}</span>
              <button onClick={() => increaseQty(product.id)} className="flex h-6 w-7 items-center justify-center rounded-full bg-card shadow-[0_1px_4px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
