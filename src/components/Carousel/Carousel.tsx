import { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden bg-card" style={{ height: 180 }}>
      <div
        className="flex h-full transition-transform duration-300"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img 
            key={i} 
            src={img} 
            alt={`Banner ${i + 1}`} 
            className={`h-full w-full flex-shrink-0 object-cover transition-transform duration-[4000ms] ease-out ${i === current ? "scale-[1.03]" : "scale-100"}`} 
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {images.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/40"}`} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
