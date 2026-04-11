import { Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, getDiscountLabel } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, increaseQty, decreaseQty, getQty } = useCartStore();
  const qty = useCartStore((s) => s.getQty(product.id));
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-card shadow-sm">
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="absolute left-1 top-1 rounded bg-offer px-1.5 py-0.5 text-[10px] font-bold text-offer-foreground">
            {getDiscountLabel(product.discount)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2">
        <p className="line-clamp-2 text-xs font-medium text-foreground">{product.name}</p>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-foreground">{formatPrice(product.offerPrice)}</span>
          <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
        </div>
        {qty === 0 ? (
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="mt-auto flex items-center justify-center rounded-md border border-primary py-1.5 text-xs font-semibold text-primary active:bg-primary/5"
          >
            ADD
          </button>
        ) : (
          <div className="mt-auto flex items-center justify-between rounded-md border border-primary">
            <button onClick={() => decreaseQty(product.id)} className="px-2 py-1.5 text-primary">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs font-bold text-primary">{qty}</span>
            <button onClick={() => increaseQty(product.id)} className="px-2 py-1.5 text-primary">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
