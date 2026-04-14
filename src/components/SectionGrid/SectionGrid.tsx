import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionGridProps {
  title: string;
  items: { id: string; name: string; image: string; link: string }[];
  columns?: number;
  showAll?: boolean;
}

const SectionGrid = ({ title, items, showAll = false }: SectionGridProps) => {
  const navigate = useNavigate();

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <div className="flex items-center gap-2.5">
          <span className="block w-1 h-5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
          <h2 className="text-[15px] md:text-[17px] font-extrabold text-foreground tracking-tight">{title}</h2>
        </div>
        {showAll && (
          <button className="flex items-center gap-1 text-[12px] font-bold text-primary active:scale-95 transition-transform">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 md:gap-4 px-4 md:px-0">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => navigate(item.link)}
            className="flex flex-col items-center gap-1.5 group animate-fade-up"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-muted/80 to-muted/40 p-3 border border-border/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-350 ease-out group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] group-hover:scale-[1.04] group-hover:-translate-y-0.5 group-hover:border-primary/20 active:scale-95">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.1]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="text-center text-[11px] leading-tight font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SectionGrid;
