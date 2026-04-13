import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const currentRef = useRef(0);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % images.length;
        currentRef.current = next;
        return next;
      });
    }, 5000);
  }, [images.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback((index: number) => {
    currentRef.current = index;
    setCurrent(index);
    startTimer();
  }, [startTimer]);

  const nextSlide = useCallback(() => goTo((currentRef.current + 1) % images.length), [goTo, images.length]);
  const prevSlide = useCallback(() => goTo((currentRef.current - 1 + images.length) % images.length), [goTo, images.length]);

  const applyTransform = (offsetPx: number, animated: boolean) => {
    if (!trackRef.current) return;
    const base = -(currentRef.current * 100);
    trackRef.current.style.transition = animated ? "transform 350ms cubic-bezier(0.25, 1, 0.5, 1)" : "none";
    trackRef.current.style.transform = `translateX(calc(${base}% + ${offsetPx}px))`;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStartX.current = e.clientX;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (!isDragging.current && Math.abs(delta) > 5) {
      isDragging.current = true;
    }
    if (isDragging.current) {
      applyTransform(delta, false);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;

    if (isDragging.current) {
      isDragging.current = false;
      const threshold = 60;
      if (delta < -threshold) {
        const next = (currentRef.current + 1) % images.length;
        currentRef.current = next;
        setCurrent(next);
        applyTransform(0, true);
      } else if (delta > threshold) {
        const prev = (currentRef.current - 1 + images.length) % images.length;
        currentRef.current = prev;
        setCurrent(prev);
        applyTransform(0, true);
      } else {
        applyTransform(0, true);
      }
      startTimer();
    }
  };

  useEffect(() => {
    if (trackRef.current && !isDragging.current) {
      trackRef.current.style.transition = "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)";
      trackRef.current.style.transform = `translateX(-${current * 100}%)`;
    }
  }, [current]);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted md:rounded-xl shadow-sm group select-none"
      style={{ height: 200, touchAction: "pan-y", cursor: "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)`, transition: "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)" }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Banner ${i + 1}`}
            className="h-full w-full flex-shrink-0 object-cover object-top"
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

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

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 z-10 pointer-events-auto">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
