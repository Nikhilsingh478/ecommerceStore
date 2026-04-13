import { useNavigate } from "react-router-dom";

interface SectionGridProps {
  title: string;
  items: { id: string; name: string; image: string; link: string }[];
  columns?: number;
}

const SectionGrid = ({ title, items, columns }: SectionGridProps) => {
  const navigate = useNavigate();

  return (
    <section className="bg-background px-4 md:px-0">
      <h2 className="mb-3 text-[15px] md:text-lg font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.link)}
            className="flex flex-col items-center gap-1.5 transition-transform duration-[400ms] ease-out active:scale-[0.95] group"
          >
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[14px] bg-card p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-border/30 transition-all duration-[400ms] group-hover:border-primary/20 group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)] group-hover:-translate-y-0.5">
              <img src={item.image} alt="" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.12]" loading="lazy" decoding="async" />
            </div>
            <span className="text-center text-[11px] leading-tight font-medium text-foreground/90">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SectionGrid;
