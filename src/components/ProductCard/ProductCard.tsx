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
      className="group flex flex-col rounded-2xl bg-white border border-[#F1F5F9] shadow-sm overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-px active:scale-[0.98]"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F8FAFC] p-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          loading="lazy"
          decoding="async"
        />
        {product.discount > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
            {getDiscountLabel(product.discount)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-[#0F172A]">
          {product.name}
        </p>

        <div className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-semibold text-[#0F172A]">{formatPrice(product.offerPrice)}</span>
          {product.mrp > product.offerPrice && (
            <span className="text-[11px] text-[#94A3B8] line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>

        {/* CTA */}
        <div
          className="mt-auto h-[34px]"
          onClick={(e) => e.stopPropagation()}
        >
          {qty === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="flex w-full h-full items-center justify-center gap-1.5 rounded-xl bg-[#0F172A] text-white text-[12px] font-medium transition-all duration-200 hover:bg-[#1E293B] active:scale-[0.97]"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Add
            </button>
          ) : (
            <div className="flex w-full h-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-0.5">
              <button
                onClick={() => decreaseQty(product.id)}
                className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-white border border-[#E2E8F0] shadow-sm active:scale-90 transition-transform"
              >
                <Minus className="h-3 w-3 text-[#0F172A]" strokeWidth={2.5} />
              </button>
              <span className="text-[13px] font-semibold text-[#0F172A]">{qty}</span>
              <button
                onClick={() => increaseQty(product.id)}
                className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-[#0F172A] text-white active:scale-90 transition-transform"
              >
                <Plus className="h-3 w-3" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
