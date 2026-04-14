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
    }, 4500);
  }, [images.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
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
    trackRef.current.style.transition = animated ? "transform 420ms cubic-bezier(0.25, 1, 0.5, 1)" : "none";
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
    if (!isDragging.current && Math.abs(delta) > 6) isDragging.current = true;
    if (isDragging.current) applyTransform(delta, false);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (isDragging.current) {
      isDragging.current = false;
      const threshold = 55;
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
      trackRef.current.style.transition = "transform 420ms cubic-bezier(0.25, 1, 0.5, 1)";
      trackRef.current.style.transform = `translateX(-${current * 100}%)`;
    }
  }, [current]);

  return (
    <div className="relative w-full overflow-hidden md:rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] group select-none"
      style={{ height: 220, touchAction: "pan-y", cursor: "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)`, transition: "transform 420ms cubic-bezier(0.25, 1, 0.5, 1)" }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Banner ${i + 1}`}
            width={900}
            height={440}
            className="h-full w-full flex-shrink-0 object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
            decoding={i === 0 ? "sync" : "async"}
            // @ts-ignore
            fetchpriority={i === 0 ? "high" : "low"}
            draggable={false}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Desktop arrow buttons */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm opacity-0 transition-all duration-300 md:group-hover:opacity-100 hover:bg-white hover:scale-105 active:scale-95"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm opacity-0 transition-all duration-300 md:group-hover:opacity-100 hover:bg-white hover:scale-105 active:scale-95"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 z-10 pointer-events-auto">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="flex h-6 items-center justify-center px-0.5"
          >
            <span
              className={`block rounded-full transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                i === current
                  ? "w-5 h-1.5 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                  : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
