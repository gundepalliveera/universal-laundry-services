import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronUp,
  Home,
  Info,
  LayoutGrid,
  Menu,
  Phone,
  Sparkles,
  Tag,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const mainNavItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "about", label: "About", icon: Info },
];

type MoreMenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  action?: "book";
};

const moreMenuItems: MoreMenuItem[] = [
  { id: "how-it-works", label: "How It Works", icon: Waves },
  { id: "pricing", label: "Special & Dry Cleaning", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "__book__", label: "Book an Order", icon: Sparkles, action: "book" },
];

export function MobileBottomNav({
  active,
  onNavigate,
  onBook,
}: {
  active: string;
  onNavigate: (id: string) => void;
  onBook?: () => void;
}) {
  const [moreOpen, setMoreOpen] = useState(false);

  const handleMain = (id: string) => {
    setMoreOpen(false);
    onNavigate(id);
  };

  const handleMore = (item: MoreMenuItem) => {
    setMoreOpen(false);
    if (item.action === "book") {
      onBook?.();
    } else {
      onNavigate(item.id);
    }
  };

  const isMoreActive = !mainNavItems.some((n) => n.id === active);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setMoreOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* More Menu Popup */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            key="more-menu"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[calc(72px+env(safe-area-inset-bottom,0px)+8px)] right-0 left-0 mx-3 xs:mx-4 sm:mx-6 z-50 lg:hidden"
          >
            <div className="rounded-2xl border border-ice-200 bg-white shadow-[0_-4px_32px_-8px_rgba(15,43,120,0.16),0_4px_24px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Menu header */}
              <div className="flex items-center justify-between border-b border-ice-100 px-4 py-3">
                <span className="text-[12px] font-bold uppercase tracking-widest text-navy-900/50">
                  More
                </span>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-ice-100 text-navy-700"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Menu items */}
              <div className="py-1">
                {moreMenuItems.map((item, i) => {
                  const Icon = item.icon;
                  const isBook = item.action === "book";
                  return (
                    <motion.button
                      key={item.id + i}
                      type="button"
                      onClick={() => handleMore(item)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18 }}
                      className={cn(
                        "flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors duration-150 active:bg-ice-50",
                        isBook
                          ? "text-navy-700 hover:bg-navy-50 border-t border-ice-100 mt-1"
                          : "text-navy-900 hover:bg-ice-50",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          isBook
                            ? "bg-navy-600 text-white shadow-sm"
                            : "bg-ice-100 text-navy-600",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span
                        className={cn(
                          "text-[14px] font-semibold leading-tight",
                          isBook && "text-navy-700",
                        )}
                      >
                        {item.label}
                      </span>
                      {isBook && (
                        <span className="ml-auto rounded-full bg-navy-600/10 px-2 py-0.5 text-[10px] font-bold text-navy-600 uppercase tracking-wider">
                          Book
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <nav
        aria-label="Mobile bottom navigation"
        className="fixed bottom-0 inset-x-0 z-50 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* Top border + subtle shadow */}
        <div className="flex h-[72px] w-full items-stretch border-t border-ice-200 bg-white shadow-[0_-2px_16px_-4px_rgba(15,43,120,0.1)]">

          {/* Main 4 items */}
          {mainNavItems.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMain(item.id)}
                className="relative flex flex-1 flex-col items-center justify-center gap-1 px-1 transition-colors duration-150 active:bg-ice-50 focus:outline-none"
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active top indicator line */}
                {isActive && (
                  <motion.span
                    layoutId="mobileNavTopIndicator"
                    className="absolute top-0 left-3 right-3 h-[2.5px] rounded-b-full bg-navy-600"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  className={cn(
                    "h-[22px] w-[22px] transition-colors duration-150",
                    isActive ? "text-navy-600" : "text-navy-900/40",
                  )}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-[11.5px] xs:text-[12px] font-semibold leading-none transition-colors duration-150",
                    isActive ? "text-navy-600" : "text-navy-900/45",
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More button */}
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-1 px-1 transition-colors duration-150 active:bg-ice-50 focus:outline-none",
            )}
            aria-expanded={moreOpen}
            aria-haspopup="menu"
          >
            {(moreOpen || isMoreActive) && (
              <motion.span
                layoutId="mobileNavTopIndicator"
                className="absolute top-0 left-3 right-3 h-[2.5px] rounded-b-full bg-navy-600"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <Menu
                className={cn(
                  "h-[22px] w-[22px] transition-colors duration-150",
                  moreOpen || isMoreActive ? "text-navy-600" : "text-navy-900/40",
                )}
                strokeWidth={moreOpen || isMoreActive ? 2.2 : 1.8}
                aria-hidden="true"
              />
            </motion.span>
            <span
              className={cn(
                "text-[11.5px] xs:text-[12px] font-semibold leading-none transition-colors duration-150",
                moreOpen || isMoreActive ? "text-navy-600" : "text-navy-900/45",
              )}
            >
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
