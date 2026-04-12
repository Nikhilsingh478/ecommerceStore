import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % images.length), 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const nextSlide = () => {
    setCurrent((c) => (c + 1) % images.length);
    startTimer();
  };

  const prevSlide = () => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
    startTimer();
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-muted md:rounded-xl shadow-sm group" 
      style={{ height: 200, touchAction: "pan-y" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img 
            key={i} 
            src={img} 
            alt={`Banner ${i + 1}`} 
            className={`h-full w-full flex-shrink-0 object-cover object-top transition-transform duration-[7000ms] ease-out select-none ${i === current ? "scale-[1.04]" : "scale-100"}`} 
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            draggable={false}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Desktop Arrows */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm opacity-0 transition-all duration-300 md:group-hover:opacity-100 hover:bg-background active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm opacity-0 transition-all duration-300 md:group-hover:opacity-100 hover:bg-background active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startTimer(); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
