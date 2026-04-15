import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [current, setCurrent]   = useState(0);
  const timerRef   = useRef<NodeJS.Timeout | null>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
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

  const goTo = useCallback((i: number) => {
    currentRef.current = i;
    setCurrent(i);
    startTimer();
  }, [startTimer]);

  const next = useCallback(() => goTo((currentRef.current + 1) % images.length), [goTo, images.length]);
  const prev = useCallback(() => goTo((currentRef.current - 1 + images.length) % images.length), [goTo, images.length]);

  const applyTransform = (offsetPx: number, animated: boolean) => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = animated ? "transform 420ms cubic-bezier(0.25,1,0.5,1)" : "none";
    trackRef.current.style.transform  = `translateX(calc(${-(currentRef.current * 100)}% + ${offsetPx}px))`;
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
      if (delta < -55) {
        const n = (currentRef.current + 1) % images.length;
        currentRef.current = n; setCurrent(n); applyTransform(0, true);
      } else if (delta > 55) {
        const p = (currentRef.current - 1 + images.length) % images.length;
        currentRef.current = p; setCurrent(p); applyTransform(0, true);
      } else {
        applyTransform(0, true);
      }
      startTimer();
    }
  };

  useEffect(() => {
    if (!trackRef.current || isDragging.current) return;
    trackRef.current.style.transition = "transform 420ms cubic-bezier(0.25,1,0.5,1)";
    trackRef.current.style.transform  = `translateX(-${current * 100}%)`;
  }, [current]);

  return (
    <div
      className="relative w-full overflow-hidden md:rounded-2xl select-none shadow-[0_4px_32px_rgba(0,0,0,0.12)] group"
      style={{ height: "clamp(200px, 42vw, 380px)", touchAction: "pan-y", cursor: "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Slides */}
      <div ref={trackRef} className="flex h-full will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)`, transition: "transform 420ms cubic-bezier(0.25,1,0.5,1)" }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative h-full w-full flex-shrink-0 overflow-hidden">
            <img
              src={img}
              alt={`Banner ${i + 1}`}
              width={900} height={440}
              className={`h-full w-full object-cover object-center will-change-transform ${
                i === current ? "animate-ken-burns" : ""
              }`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              // @ts-ignore
              fetchpriority={i === 0 ? "high" : "low"}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Rich gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none" />

      {/* Desktop arrows */}
      {[
        { dir: "prev", pos: "left-4", action: prev, Icon: ChevronLeft },
        { dir: "next", pos: "right-4", action: next, Icon: ChevronRight },
      ].map(({ dir, pos, action, Icon }) => (
        <button
          key={dir}
          onClick={action}
          className={`hidden md:flex absolute ${pos} top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-800 shadow-[0_4px_16px_rgba(0,0,0,0.18)] opacity-0 transition-all duration-300 md:group-hover:opacity-100 hover:scale-110 active:scale-95`}
          aria-label={dir}
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-auto">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="flex h-6 items-center justify-center px-0.5"
          >
            <span className={`block rounded-full transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              i === current
                ? "w-6 h-[6px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
                : "w-[6px] h-[6px] bg-white/55 hover:bg-white/80"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
