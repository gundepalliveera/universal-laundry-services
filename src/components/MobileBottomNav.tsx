import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Home,
  Info,
  LayoutGrid,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  isBook?: boolean;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "book", label: "Book", icon: CalendarCheck, isBook: true },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "about", label: "About", icon: Info },
];

interface MobileBottomNavProps {
  active: string;
  onNavigate: (id: string) => void;
  onBook?: () => void;
}

export function MobileBottomNav({
  active,
  onNavigate,
  onBook,
}: MobileBottomNavProps) {
  const [currentActive, setCurrentActive] = useState<string>(active || "home");

  // Synchronize active item with scroll observer and route changes
  useEffect(() => {
    if (active) {
      setCurrentActive(active);
    }
  }, [active]);

  const handleSelect = (item: NavItem) => {
    setCurrentActive(item.id);
    if (item.isBook) {
      onBook?.();
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden pointer-events-none select-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {/* Floating white navigation container with smooth rounded top corners and subtle border/shadow */}
      <div className="relative w-full bg-white border-t border-ice-200/90 rounded-t-[22px] shadow-[0_-4px_24px_-4px_rgba(15,43,120,0.09)] pointer-events-auto">
        {/* SVG curved crest behind center Book button */}
        <svg
          className="absolute -top-[18px] left-1/2 -translate-x-1/2 w-[112px] h-[19px] pointer-events-none"
          viewBox="0 0 112 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0 19C16 19 28 2 56 2C84 2 96 19 112 19H0Z"
            fill="white"
          />
          <path
            d="M0 19C16 19 28 2 56 2C84 2 96 19 112 19"
            stroke="#DFEAFE"
            strokeWidth="1.2"
          />
        </svg>

        {/* 5-item grid for rock-solid centering across all mobile viewports */}
        <div className="mx-auto grid h-[68px] max-w-lg grid-cols-5 items-stretch px-1">
          {navItems.map((item) => {
            const isActive = currentActive === item.id;
            const isBook = !!item.isBook;
            const Icon = item.icon;

            // Target transform: Book floats higher when selected (-18px vs -8px); standard items float -14px when active
            const transform = isBook
              ? isActive
                ? "translateY(-18px) scale(1.06)"
                : "translateY(-8px) scale(1)"
              : isActive
                ? "translateY(-14px) scale(1.05)"
                : "translateY(0) scale(1)";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className="group relative flex flex-col items-center justify-center w-full h-full focus:outline-none min-h-[44px] cursor-pointer touch-manipulation"
                aria-label={item.isBook ? "Book a Service" : item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Floating circular icon container */}
                <div
                  style={{
                    transform,
                    transition:
                      "transform 250ms ease, box-shadow 250ms ease, background-color 250ms ease, border-color 250ms ease",
                  }}
                  className={cn(
                    "relative flex items-center justify-center rounded-full will-change-transform",
                    isBook
                      ? "h-12 w-12 bg-gradient-to-tr from-navy-700 via-navy-600 to-navy-500 text-white ring-[3.5px] ring-white"
                      : "h-11 w-11",
                    isBook &&
                      (isActive
                        ? "shadow-[0_12px_28px_-2px_rgba(26,83,224,0.65),0_4px_12px_rgba(26,83,224,0.3)]"
                        : "shadow-[0_6px_18px_-3px_rgba(26,83,224,0.45),0_2px_6px_rgba(0,0,0,0.08)]"),
                    !isBook &&
                      (isActive
                        ? "bg-white border border-ice-200/90 shadow-[0_8px_20px_-4px_rgba(26,83,224,0.3)] ring-2 ring-ice-100 text-navy-600"
                        : "bg-transparent border-transparent shadow-none ring-0 text-navy-900/40 hover:text-navy-900/60"),
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      isBook
                        ? "text-white"
                        : isActive
                          ? "text-navy-600"
                          : "text-navy-900/40",
                    )}
                    strokeWidth={isActive || isBook ? 2.2 : 1.8}
                    aria-hidden="true"
                  />
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "mt-0.5 text-[10.5px] xs:text-[11.5px] tracking-tight leading-none transition-colors duration-200 whitespace-nowrap",
                    isActive
                      ? "font-extrabold text-navy-600"
                      : isBook
                        ? "font-bold text-navy-700"
                        : "font-semibold text-navy-900/50",
                  )}
                >
                  {item.label}
                </span>

                {/* Active dot indicator */}
                <span
                  className={cn(
                    "h-1 w-1 rounded-full bg-navy-600 mt-1 transition-all duration-200",
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
