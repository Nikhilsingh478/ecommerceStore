import { useEffect, useState } from "react";

interface SplashScreenProps {
  onDone: () => void;
}

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(() => onDone(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "linear-gradient(160deg, #f0fdf4 0%, #ffffff 50%, #f0f9ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
        opacity: phase === "exit" ? 0 : 1,
        pointerEvents: phase === "exit" ? "none" : "all",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease",
          transform: phase === "enter" ? "scale(0.7) translateY(12px)" : "scale(1) translateY(0)",
          opacity: phase === "enter" ? 0 : 1,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(22,163,74,0.35), 0 4px 16px rgba(22,163,74,0.2)",
          }}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0f172a",
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1.1,
            }}
          >
            Swift<span style={{ color: "#16a34a" }}>Cart</span>
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "#64748b",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
              letterSpacing: "0.01em",
              transition: "opacity 0.5s ease 0.25s",
              opacity: phase === "enter" ? 0 : 1,
            }}
          >
            Your daily essentials, delivered fast
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "opacity 0.5s ease 0.4s",
          opacity: phase === "enter" ? 0 : 0.45,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#16a34a",
            animation: "swiftcart-pulse 1.2s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#16a34a",
            animation: "swiftcart-pulse 1.2s ease-in-out 0.2s infinite",
          }}
        />
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#16a34a",
            animation: "swiftcart-pulse 1.2s ease-in-out 0.4s infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes swiftcart-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
