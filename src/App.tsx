import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { BookingProvider, useBooking } from "@/booking/BookingContext";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { applySeoMetadata } from "@/data/seo";

import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

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
  const [view, setView] = useState<"home" | "booking">("home");
  const [active, setActive] = useState("home");
  const [activeService, setActiveService] = useState<string | null>(null);
  const { setStep, reset } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();

  // Apply dynamic SEO metadata on section / view changes
  useEffect(() => {
    if (location.pathname === "/") {
      if (view === "booking") {
        applySeoMetadata("booking");
      } else {
        applySeoMetadata(active);
      }
    }
  }, [view, active, location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" || view !== "home") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.6, 1] },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [view, location.pathname]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top: id === "home" ? 0 : top, behavior: "smooth" });
  }, []);

  const handleNavigate = useCallback(
    (id: string) => {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollTo(id), 100);
      } else {
        if (view !== "home") {
          setView("home");
          setTimeout(() => scrollTo(id), 90);
        } else {
          scrollTo(id);
        }
      }
    },
    [view, scrollTo, navigate, location.pathname],
  );

  const handleBook = useCallback(() => {
    reset();
    setStep(0);
    if (location.pathname !== "/") navigate("/");
    setView("booking");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [reset, setStep, navigate, location.pathname]);

  const handleOpenService = useCallback((slug: string) => {
    setActiveService(slug);
  }, []);

  const handleCloseService = useCallback(() => {
    setActiveService(null);
    if (view === "home" && location.pathname === "/") applySeoMetadata(active);
  }, [view, active, location.pathname]);

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
        view={location.pathname === "/" ? view : "home"}
        onNavigate={handleNavigate}
        onBook={handleBook}
      />

      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes>
          <Route
            path="/"
            element={
              <AnimatePresence mode="wait">
                {view === "home" ? (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14, scale: 0.995 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <HomeView onBook={handleBook} onOpenService={handleOpenService} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking"
                    initial={{ opacity: 0, y: 22, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.995 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <BookingPage onExit={() => handleNavigate("home")} />
                  </motion.div>
                )}
              </AnimatePresence>
            }
          />
          <Route path="/areas" element={<AreaDirectory />} />
          <Route path="/areas/:slug" element={<AreaDetailPage onBook={handleBook} />} />
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
      {location.pathname === "/" && view === "home" && (
        <Suspense fallback={null}>
          <MobileBottomNav active={active} onNavigate={handleNavigate} onBook={handleBook} />
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
