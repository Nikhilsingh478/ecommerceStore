import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-primary px-3 py-2">
      <div
        className="flex items-center gap-2 rounded-md bg-primary-foreground/20 px-3 py-2"
        onClick={() => navigate("/")}
      >
        <Search className="h-4 w-4 text-primary-foreground/70" />
        <span className="text-sm text-primary-foreground/70">Search for products...</span>
      </div>
    </header>
  );
};

export default Header;
