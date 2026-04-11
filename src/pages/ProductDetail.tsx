import { useParams } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Carousel from "@/components/Carousel/Carousel";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, getDiscountLabel } from "@/utils/helpers";
import BottomNav from "@/components/BottomNav/BottomNav";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart, increaseQty, decreaseQty } = useCartStore();
  const qty = useCartStore((s) => s.getQty(id || ""));

  if (!product) return <div className="p-8 text-center text-muted-foreground">Product not found</div>;

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const boughtTogether = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card px-3 py-2.5 shadow-sm">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="text-sm font-medium text-foreground">Product Details</span>
      </div>

      <Carousel images={[product.image, product.image]} />

      <div className="bg-card p-3">
        <h1 className="text-base font-semibold text-foreground">{product.name}</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.brand}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.offerPrice)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
          <span className="rounded bg-success/10 px-1.5 py-0.5 text-[10px] font-bold text-success">
            {getDiscountLabel(product.discount)}
          </span>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-2 bg-card p-3">
          <h2 className="mb-3 text-sm font-bold text-foreground">Similar Products</h2>
          <div className="grid grid-cols-2 gap-2">
            {similar.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {boughtTogether.length > 0 && (
        <div className="mt-2 bg-card p-3">
          <h2 className="mb-3 text-sm font-bold text-foreground">Frequently Bought Together</h2>
          <div className="grid grid-cols-2 gap-2">
            {boughtTogether.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {/* Sticky bottom bar */}
      <div className="fixed bottom-14 left-0 right-0 z-40 flex items-center justify-between border-t border-border bg-card px-4 py-2.5 shadow-lg">
        <div>
          <span className="text-lg font-bold text-foreground">{formatPrice(product.offerPrice)}</span>
          <span className="ml-1.5 text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
        </div>
        {qty === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-md bg-primary px-3 py-1.5">
            <button onClick={() => decreaseQty(product.id)}><Minus className="h-4 w-4 text-primary-foreground" /></button>
            <span className="min-w-[20px] text-center text-sm font-bold text-primary-foreground">{qty}</span>
            <button onClick={() => increaseQty(product.id)}><Plus className="h-4 w-4 text-primary-foreground" /></button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ProductDetail;
