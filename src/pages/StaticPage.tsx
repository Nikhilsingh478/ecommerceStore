import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav/BottomNav";

const pages: Record<string, { title: string; content: string }> = {
  about: { title: "About Us", content: "We are a leading online grocery and daily essentials delivery service, committed to bringing quality products at the best prices to your doorstep." },
  privacy: { title: "Privacy Policy", content: "Your privacy is important to us. We collect only necessary information to process your orders and improve your shopping experience. We never share your personal data with third parties without your consent." },
  terms: { title: "Terms & Conditions", content: "By using our services, you agree to our terms and conditions. All products are subject to availability. Prices may change without notice. Delivery times are estimates and may vary." },
  refund: { title: "Refund Policy", content: "We offer hassle-free returns and refunds within 7 days of delivery. Products must be in their original condition. Refunds will be processed within 5-7 business days." },
};

const StaticPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const data = pages[page || ""] || { title: "Page Not Found", content: "The page you are looking for does not exist." };

  return (
    <div className="min-h-screen bg-background pb-16 flex flex-col animate-in fade-in duration-300">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card px-4 py-3 shadow-sm">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5 text-foreground" /></button>
        <span className="text-sm font-medium text-foreground">{data.title}</span>
      </div>
      <div className="bg-card p-4">
        <p className="text-sm leading-relaxed text-foreground">{data.content}</p>
      </div>
      <BottomNav />
    </div>
  );
};

export default StaticPage;
