import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, lazy, Suspense } from "react";
import { BookingProvider } from "@/booking/BookingContext";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { applySeoMetadata } from "@/data/seo";

import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

// Lazy-loaded components below-the-fold
const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const HowItWorks = lazy(() => import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const MobileBottomNav = lazy(() => import("@/components/MobileBottomNav").then((m) => ({ default: m.MobileBottomNav })));
const Pricing = lazy(() => import("@/components/Pricing").then((m) => ({ default: m.Pricing })));
const ServiceDetailView = lazy(() => import("@/components/ServiceDetailModal").then((m) => ({ default: m.ServiceDetailView })));
const Services = lazy(() => import("@/components/Services").then((m) => ({ default: m.Services })));
const AreaDirectory = lazy(() => import("./components/AreaDirectory").then((m) => ({ default: m.AreaDirectory })));
const AreaDetailPage = lazy(() => import("./components/AreaDetailPage").then((m) => ({ default: m.AreaDetailPage })));
const BookingPage = lazy(() => import("@/booking/BookingPage").then((m) => ({ default: m.BookingPage })));
const NotFound = lazy(() => import("@/components/NotFound").then((m) => ({ default: m.NotFound })));

const sectionIds = ["home", "how-it-works", "services", "pricing", "about", "contact"];

function HomeView({
  onBook,
  onOpenService,
}: {
  onBook: () => void;
  onOpenService: (slug: string) => void;
}) {
  return (
    <main>
      <Hero onBook={onBook} />
      <Suspense fallback={null}>
        <HowItWorks onBook={onBook} />
        <Services onBook={onBook} onOpenService={onOpenService} />
        <Pricing onBook={onBook} onOpenService={onOpenService} />
        <About />
        <Contact />
      </Suspense>
    </main>
  );
}

function MainLayout() {
  const [active, setActive] = useState("home");
  const [activeService, setActiveService] = useState<string | null>(null);
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isBooking = location.pathname.startsWith("/book");
  const navActive = isBooking ? "book" : active;

  // Redirect legacy /#book hash link to /book route
  useEffect(() => {
    if (location.hash === "#book") {
      navigate("/book", { replace: true });
    }
  }, [location.hash, navigate]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top: id === "home" ? 0 : top, behavior: "smooth" });
  }, []);

  // Synchronize hash links on direct URL navigation (e.g. /#services, /#pricing, /#about)
  useEffect(() => {
    if (location.hash && location.hash !== "#book") {
      const targetId = location.hash.replace("#", "");
      if (["services", "pricing", "about"].includes(targetId)) {
        setActive(targetId);
        setTimeout(() => scrollTo(targetId), 150);
      }
    }
  }, [location.hash, scrollTo]);

  // Apply dynamic SEO metadata on section / route changes
  useEffect(() => {
    if (isBooking) {
      applySeoMetadata("booking");
    } else if (location.pathname === "/") {
      applySeoMetadata(active);
    }
  }, [isBooking, active, location.pathname]);

  // Scroll-spy: Observe visible sections and update active navigation item
  useEffect(() => {
    if (location.pathname !== "/") return;

    const navSectionMap: Record<string, string> = {
      home: "home",
      "how-it-works": "home",
      services: "services",
      pricing: "pricing",
      about: "about",
      contact: "about",
    };

    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Prevent flickering while smooth scrolling after a navigation tap
        if (isClickScrollingRef.current) return;

        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        // Top of page: always activate 'home'
        if (window.scrollY < 80) {
          setActive("home");
          return;
        }

        // Bottom of page: always activate 'about'
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
          setActive("about");
          return;
        }

        // Find the section with the highest intersection ratio in the reading zone
        let bestId = "";
        let maxRatio = 0;
        for (const [id, ratio] of visibilityMap.entries()) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && navSectionMap[bestId]) {
          setActive(navSectionMap[bestId]);
        }
      },
      {
        rootMargin: "-70px 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (isClickScrollingRef.current) return;
      if (window.scrollY < 80) {
        setActive("home");
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActive("about");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [location.pathname]);

  const handleNavigate = useCallback(
    (id: string) => {
      const navTarget = id === "contact" ? "about" : id === "how-it-works" ? "home" : id;
      setActive(navTarget);

      // Lock scroll-spy while smooth scrolling to prevent flickering between multiple active items
      isClickScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const unlock = () => {
        isClickScrollingRef.current = false;
      };

      window.addEventListener("scrollend", unlock, { once: true });
      scrollTimeoutRef.current = window.setTimeout(unlock, 850);

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollTo(id), 120);
      } else {
        scrollTo(id);
      }
    },
    [scrollTo, navigate, location.pathname],
  );

  const handleBook = useCallback(() => {
    navigate("/book");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [navigate]);

  const handleOpenService = useCallback((slug: string) => {
    setActiveService(slug);
  }, []);

  const handleCloseService = useCallback(() => {
    setActiveService(null);
    if (location.pathname === "/") applySeoMetadata(active);
  }, [active, location.pathname]);

  return (
    <div className="min-h-screen overflow-x-clip bg-white pb-[88px] lg:pb-0">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar
        active={location.pathname === "/" ? active : ""}
        view={isBooking ? "booking" : "home"}
        onNavigate={handleNavigate}
        onBook={handleBook}
      />

      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14, scale: 0.995 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <HomeView onBook={handleBook} onOpenService={handleOpenService} />
              </motion.div>
            }
          />
          <Route
            path="/book"
            element={
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 22, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.995 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <BookingPage onExit={() => handleNavigate("home")} />
              </motion.div>
            }
          />
          <Route
            path="/book/step-:stepNum"
            element={
              <motion.div
                key="booking-step"
                initial={{ opacity: 0, y: 22, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.995 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <BookingPage onExit={() => handleNavigate("home")} />
              </motion.div>
            }
          />
          <Route path="/booking" element={<Navigate to="/book" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/pricing" element={<Navigate to="/#pricing" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/areas" element={<AreaDirectory />} />
          <Route path="/areas/:slug" element={<AreaDetailPage onBook={handleBook} />} />
          <Route path="*" element={<NotFound onBook={handleBook} />} />
        </Routes>

        {/* Service Detail SEO Modal */}
        <AnimatePresence>
          {activeService && (
            <ServiceDetailView
              slug={activeService}
              onClose={handleCloseService}
              onBook={handleBook}
              onSelectService={handleOpenService}
            />
          )}
        </AnimatePresence>
      </Suspense>

      <Suspense fallback={null}>
        <Footer onNavigate={handleNavigate} onBook={handleBook} />
      </Suspense>

      {/* Floating Mobile Bottom Navigation (<1024px) */}
      {(location.pathname === "/" || isBooking) && (
        <Suspense fallback={null}>
          <MobileBottomNav active={navActive} onNavigate={handleNavigate} onBook={handleBook} />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <MainLayout />
      </BookingProvider>
    </BrowserRouter>
  );
}
