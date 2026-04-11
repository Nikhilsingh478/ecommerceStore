import { ArrowLeft, ChevronRight, ShoppingBag, Wallet, Phone, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav/BottomNav";

const menuItems = [
  { label: "Orders", icon: ShoppingBag, path: "/orders" },
  { label: "Wallet", icon: Wallet, path: "#" },
  { label: "Contact Us", icon: Phone, path: "#" },
  { label: "Logout", icon: LogOut, path: "#" },
];

const policyLinks = [
  { label: "About Us", path: "/static/about" },
  { label: "Privacy Policy", path: "/static/privacy" },
  { label: "Terms & Conditions", path: "/static/terms" },
  { label: "Refund Policy", path: "/static/refund" },
];

const Account = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card px-3 py-2.5 shadow-sm">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5 text-foreground" /></button>
        <span className="text-sm font-medium text-foreground">Account</span>
      </div>

      <div className="bg-card p-4">
        <p className="text-sm font-medium text-foreground">+91 98765 43210</p>
        <p className="text-xs text-muted-foreground">My Account</p>
      </div>

      <div className="mt-2 bg-card">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex w-full items-center gap-3 border-b border-border px-4 py-3.5 last:border-b-0"
          >
            <item.icon className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-left text-sm text-foreground">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="mt-2 bg-card">
        {policyLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => navigate(link.path)}
            className="flex w-full items-center justify-between border-b border-border px-4 py-3 last:border-b-0"
          >
            <span className="text-xs text-muted-foreground">{link.label}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Account;
