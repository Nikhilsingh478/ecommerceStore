import { useNavigate } from "react-router-dom";

interface SectionGridProps {
  title: string;
  items: { id: string; name: string; image: string; link: string }[];
  showAll?: boolean;
}

const SectionGrid = ({ title, items, showAll }: SectionGridProps) => {
  const navigate = useNavigate();

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h2 className="text-[17px] font-semibold text-foreground tracking-tight">{title}</h2>
        {showAll && (
          <button className="text-[13px] font-medium text-[#2563EB] active:opacity-60 transition-opacity hover:underline underline-offset-2">
            See all
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 px-4 md:px-0">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => navigate(item.link)}
            className="flex flex-col items-center gap-2.5 group animate-fade-up"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="w-full aspect-square rounded-2xl bg-card border border-border shadow-sm overflow-hidden transition-all duration-200 group-hover:shadow-md group-hover:scale-[1.03] group-active:scale-95">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <span className="text-center text-[11px] leading-tight font-medium text-muted-foreground px-0.5 group-hover:text-foreground transition-colors">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SectionGrid;
