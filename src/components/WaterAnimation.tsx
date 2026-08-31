import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/utils/cn";

type Bubble = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Lightweight, GPU friendly water/laundry ambience:
 * rising bubbles + drifting droplets. Pure CSS animations.
 */
export function WaterAnimation({
  count = 10,
  className,
  droplets = 0,
  opacity = 1,
  seed = 7,
}: {
  count?: number;
  className?: string;
  droplets?: number;
  opacity?: number;
  seed?: number;
}) {
  const bubbles = useMemo<Bubble[]>(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => {
      const size = 6 + Math.round(rand() * 20);
      return {
        left: Math.round(rand() * 96),
        size,
        delay: +(rand() * 9).toFixed(2),
        duration: +(8 + rand() * 8).toFixed(2),
        drift: Math.round((rand() - 0.5) * 50),
        opacity: 0.25 + rand() * 0.4,
      };
    });
  }, [count, seed]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full border border-white/70 bg-gradient-to-br from-white/80 to-navy-200/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animation: `bubbleUp ${b.duration}s linear ${b.delay}s infinite`,
            ["--drift" as string]: `${b.drift}px`,
            willChange: "transform, opacity",
          }}
        />
      ))}
      {Array.from({ length: droplets }).map((_, i) => (
        <span
          key={`d-${i}`}
          className="absolute top-0 h-3 w-[3px] rounded-full bg-gradient-to-b from-transparent via-navy-300 to-navy-500/70"
          style={{
            left: `${12 + i * 21}%`,
            animation: `droplet ${5 + i}s ease-in ${i * 1.4}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

/** Soft animated water splash used behind the hero art. */
export function WaterSplash({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className={cn("pointer-events-none absolute", className)}
    >
      <motion.path
        d="M60 250c40-70 120-110 210-96"
        fill="none"
        stroke="#90b5f8"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.75 }}
        transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
      />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{ originX: "200px", originY: "200px" }}
      >
        <circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="#c7dbfd"
          strokeWidth="2"
          strokeDasharray="5 14"
        />
      </motion.g>
      <motion.g
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M300 96c10-26 34-30 34-30s2 26-18 38c-8 5-16 3-16-8z"
          fill="#a9e37a"
          opacity="0.9"
        />
      </motion.g>
    </svg>
  );
}
