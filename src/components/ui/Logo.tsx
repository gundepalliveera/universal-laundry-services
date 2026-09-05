import { cn } from "@/utils/cn";

/** Hand-built SVG recreation of the Universal Laundry Services badge. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Universal Laundry Services logo"
      className={cn("h-11 w-11", className)}
    >
      <defs>
        <linearGradient id="uls-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a53e0" />
          <stop offset="100%" stopColor="#0f2b78" />
        </linearGradient>
        <linearGradient id="uls-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#356deb" />
          <stop offset="100%" stopColor="#90b5f8" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="58" fill="url(#uls-ring)" />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="#6cb33f"
        strokeWidth="2.2"
      />
      <circle cx="60" cy="60" r="46" fill="#0a1e55" />

      {/* bubbles */}
      <g fill="#356deb">
        <circle cx="76" cy="30" r="4.4" />
        <circle cx="88" cy="38" r="3" />
        <circle cx="82" cy="46" r="2.2" />
        <circle cx="94" cy="48" r="2" />
        <circle cx="70" cy="40" r="2.6" />
      </g>

      {/* washing machine */}
      <g>
        <rect x="30" y="30" width="34" height="44" rx="3.5" fill="#dbe8fd" />
        <rect x="33" y="33" width="28" height="7" rx="2" fill="#0a1e55" />
        <circle cx="37" cy="36.5" r="1.3" fill="#dbe8fd" />
        <circle cx="41.5" cy="36.5" r="1.3" fill="#dbe8fd" />
        <circle cx="46" cy="36.5" r="1.3" fill="#dbe8fd" />
        <circle cx="50" cy="59" r="11" fill="#ffffff" stroke="#0a1e55" strokeWidth="3" />
        <path
          d="M41.5 60c3-3.4 6-3.4 8.5 0s5.5 3.4 8.5 0v5a8.5 8.5 0 0 1-17 0z"
          fill="#356deb"
        />
      </g>

      {/* laundry basket */}
      <g>
        <path d="M66 56h30l-4.5 26H70.5z" fill="#ffffff" />
        <g fill="#0a1e55">
          <circle cx="72" cy="63" r="1.5" />
          <circle cx="80" cy="63" r="1.5" />
          <circle cx="88" cy="63" r="1.5" />
          <circle cx="76" cy="70" r="1.5" />
          <circle cx="84" cy="70" r="1.5" />
          <circle cx="74" cy="77" r="1.5" />
          <circle cx="82" cy="77" r="1.5" />
        </g>
        <g fill="#6cb33f">
          <ellipse cx="72" cy="53" rx="7" ry="4.4" />
          <ellipse cx="82" cy="51" rx="8" ry="5" />
          <ellipse cx="91" cy="54" rx="6" ry="4" />
        </g>
        <rect x="65" y="55" width="32" height="3.4" rx="1.7" fill="#0a1e55" />
      </g>

      {/* water wave */}
      <path
        d="M18 82c12 8 24 4 34-1 12-6 26-6 38 1 5 3 9 6 12 9-14 6-30 8-48 6-14-1.6-26-6-36-15z"
        fill="url(#uls-wave)"
      />
      <path
        d="M24 88c11 6 24 8 38 7 12-.9 22-4 30-9-9 9-21 14-35 14-13 0-24-5-33-12z"
        fill="#90b5f8"
        opacity="0.85"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  light = false,
}: {
  className?: string;
  markClassName?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2 xs:gap-3", className)}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[13.5px] xs:text-[15px] font-extrabold tracking-[0.05em] sm:tracking-[0.06em] sm:text-base",
            light ? "text-white" : "text-navy-900",
          )}
        >
          UNIVERSAL
        </span>
        <span
          className={cn(
            "mt-0.5 sm:mt-1 font-display text-[8.5px] xs:text-[9.5px] font-bold tracking-[0.12em] sm:tracking-[0.14em] sm:text-[10.5px]",
            light ? "text-navy-100" : "text-navy-600",
          )}
        >
          LAUNDRY SERVICES
        </span>
      </span>
    </span>
  );
}
