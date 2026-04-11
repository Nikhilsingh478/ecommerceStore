import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav/BottomNav";

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col animate-in fade-in duration-300 pb-16 bg-background">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card px-4 py-3 shadow-sm">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5 text-foreground" /></button>
        <span className="text-sm font-medium text-foreground">My Orders</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
        <Package className="h-12 w-12 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No orders yet</p>
        <button onClick={() => navigate("/")} className="rounded-lg bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground shadow-sm active:scale-95 transition-all">
          Start Shopping
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Orders;
