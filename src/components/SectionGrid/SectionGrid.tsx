import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionGridProps {
  title: string;
  items: { id: string; name: string; image: string; link: string }[];
  columns?: number;
  showAll?: boolean;
}

/* Vivid pastel gradients — one per slot, cycling */
const TILE_GRADIENTS = [
  ["#E0F2FE", "#BAE6FD"],   // sky
  ["#DCFCE7", "#BBF7D0"],   // green
  ["#FEF9C3", "#FDE68A"],   // yellow
  ["#FCE7F3", "#FBCFE8"],   // pink
  ["#EDE9FE", "#DDD6FE"],   // violet
  ["#FFEDD5", "#FED7AA"],   // orange
  ["#CCFBF1", "#99F6E4"],   // teal
  ["#E0E7FF", "#C7D2FE"],   // indigo
];

const TILE_SHADOWS = [
  "rgba(14,165,233,0.15)",
  "rgba(34,197,94,0.15)",
  "rgba(234,179,8,0.15)",
  "rgba(236,72,153,0.15)",
  "rgba(139,92,246,0.15)",
  "rgba(249,115,22,0.15)",
  "rgba(20,184,166,0.15)",
  "rgba(99,102,241,0.15)",
];

const SectionGrid = ({ title, items, showAll = false }: SectionGridProps) => {
  const navigate = useNavigate();

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <div className="flex items-center gap-2.5">
          <span className="block w-1 h-5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
          <h2 className="text-[15px] md:text-[17px] font-extrabold text-foreground tracking-tight">{title}</h2>
        </div>
        {showAll && (
          <button className="flex items-center gap-1 text-[12px] font-bold text-primary active:scale-95 transition-transform hover:gap-2">
            See all <ArrowRight className="h-3.5 w-3.5 transition-all" />
          </button>
        )}
      </div>

      {/* Circular colored tiles */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-5 px-4 md:px-0">
        {items.map((item, i) => {
          const [from, to] = TILE_GRADIENTS[i % TILE_GRADIENTS.length];
          const shadow     = TILE_SHADOWS[i % TILE_SHADOWS.length];

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.link)}
              className="flex flex-col items-center gap-2 group animate-fade-up"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <div
                className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[22px] p-3 transition-all duration-300 ease-out group-hover:scale-[1.07] group-hover:-translate-y-1 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${from}, ${to})`,
                  boxShadow: `0 4px 16px ${shadow}`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.12]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-center text-[11px] leading-tight font-semibold text-foreground/80 group-hover:text-foreground transition-colors px-0.5">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SectionGrid;
