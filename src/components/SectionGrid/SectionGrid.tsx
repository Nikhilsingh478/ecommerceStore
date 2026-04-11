import { useNavigate } from "react-router-dom";

interface SectionGridProps {
  title: string;
  items: { id: string; name: string; image: string; link: string }[];
  columns?: number;
}

const SectionGrid = ({ title, items, columns = 3 }: SectionGridProps) => {
  const navigate = useNavigate();

  return (
    <section className="bg-card px-3 py-3">
      <h2 className="mb-3 text-sm font-bold text-foreground">{title}</h2>
      <div className={`grid gap-4 ${columns === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.link)}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <span className="text-center text-[10px] leading-tight text-secondary-foreground">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SectionGrid;
