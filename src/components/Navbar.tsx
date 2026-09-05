import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { contactInfo } from "@/data/site";
import { cn } from "@/utils/cn";

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar({
  active,
  onNavigate,
  onBook,
  view,
}: {
  active: string;
  onNavigate: (id: string) => void;
  onBook: () => void;
  view: "home" | "booking";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  const handleBook = () => {
    setOpen(false);
    onBook();
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || view === "booking" || open
          ? "border-b border-ice-200/80 bg-white/95 shadow-[0_10px_30px_-18px_rgba(15,43,120,0.18)] backdrop-blur-xl"
          : "border-b border-ice-100/60 bg-white/90 backdrop-blur-md",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto w-full max-w-7xl px-3 sm:px-8 flex items-center justify-between gap-1.5 xs:gap-2 transition-all duration-300",
          scrolled ? "h-[56px] sm:h-[66px] md:h-[70px]" : "h-[60px] sm:h-[72px] md:h-[76px]",
        )}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => go("home")}
          className="shrink-0 rounded-xl text-left transition-transform duration-300 hover:scale-[1.02] focus:outline-none"
          aria-label="Universal Laundry Services — go to home"
        >
          <Logo markClassName="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11" />
        </button>

        {/* Desktop Navigation Links (>=1024px) */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = view === "home" && active === link.id;
            return (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative rounded-lg px-3.5 py-2 text-[14.5px] font-semibold transition-colors duration-300",
                    isActive
                      ? "text-navy-700"
                      : "text-navy-900/70 hover:text-navy-800",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-[2.5px] origin-left rounded-full bg-navy-600 transition-transform duration-300",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Actions & Mobile Buttons */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
          {/* Phone Pill Button - compact on mobile */}
          <a
            href={`tel:+91${contactInfo.phone}`}
            className="inline-flex h-8 xs:h-9 sm:h-10 items-center gap-1 xs:gap-1.5 sm:gap-2 rounded-full border border-ice-200 bg-white px-2 xs:px-3 sm:px-4 text-[10.5px] xs:text-[12px] sm:text-sm font-bold text-navy-900 shadow-sm transition-all duration-300 hover:border-navy-300 hover:scale-105 shrink-0"
            aria-label={`Call ${contactInfo.phone}`}
          >
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-leaf-600 fill-leaf-600/10 shrink-0" aria-hidden="true" />
            <span>{contactInfo.phone}</span>
          </a>

          {/* Desktop Book CTA Button */}
          <button
            type="button"
            onClick={handleBook}
            className="btn-primary hidden px-5 py-2.5 text-sm lg:inline-flex"
          >
            Book an Order
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-8.5 w-8.5 min-h-[38px] min-w-[38px] xs:min-h-[44px] xs:min-w-[44px] items-center justify-center rounded-xl text-navy-900 transition-colors lg:hidden focus:outline-none shrink-0"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="h-5.5 w-5.5 xs:h-6 xs:w-6 text-navy-900" aria-hidden="true" />
            ) : (
              <Menu className="h-5.5 w-5.5 xs:h-6 xs:w-6 text-navy-900" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ice-200 bg-white/98 backdrop-blur-xl lg:hidden"
          >
            <ul className="shell flex flex-col gap-1.5 py-5">
              {navLinks.map((link, i) => {
                const isActive = view === "home" && active === link.id;
                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                  >
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      className={cn(
                        "w-full rounded-2xl px-4 py-3 text-left text-[15px] font-bold transition-colors",
                        isActive
                          ? "bg-navy-600 text-white"
                          : "text-navy-900 hover:bg-ice-50 active:bg-ice-100",
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="mt-3 pt-2"
              >
                <button
                  type="button"
                  onClick={handleBook}
                  className="btn-primary w-full py-3.5 text-base font-bold shadow-md"
                >
                  <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
                  Book Order
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
