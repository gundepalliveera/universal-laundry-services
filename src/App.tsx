import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, lazy, Suspense } from "react";
import { BookingProvider } from "@/booking/BookingContext";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { applySeoMetadata } from "@/data/seo";

import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

// Core homepage components bundled directly to prevent Suspense fallback flash & layout shifts
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";

// Secondary and deep-link views kept code-split
const ServiceDetailView = lazy(() => import("@/components/ServiceDetailModal").then((m) => ({ default: m.ServiceDetailView })));
const BookingPage = lazy(() => import("@/booking/BookingPage").then((m) => ({ default: m.BookingPage })));
const NotFound = lazy(() => import("@/components/NotFound").then((m) => ({ default: m.NotFound })));

// Dedicated SEO Pages
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage })));
const ServicesOverviewPage = lazy(() => import("@/pages/ServicesOverviewPage").then((m) => ({ default: m.ServicesOverviewPage })));
const HyderabadLandingPage = lazy(() => import("@/pages/HyderabadLandingPage").then((m) => ({ default: m.HyderabadLandingPage })));
const LocalityDetailPage = lazy(() => import("@/pages/LocalityDetailPage").then((m) => ({ default: m.LocalityDetailPage })));
const PricingPage = lazy(() => import("@/pages/PricingPage").then((m) => ({ default: m.PricingPage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })));

import { SeoSections } from "@/components/SeoSections";

function LegacyAreaRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/laundry-service-${slug}/` : "/laundry-service-hyderabad/"} replace />;
}

const sectionIds = ["home", "how-it-works", "services", "pricing", "pickup-delivery", "service-areas", "faq", "about", "contact"];

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
      <HowItWorks onBook={onBook} />
      <Services onBook={onBook} onOpenService={onOpenService} />
      <Pricing onBook={onBook} onOpenService={onOpenService} />
      <SeoSections onBook={onBook} />
      <About />
      <Contact />
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
    <div
      className={`min-h-screen overflow-x-clip bg-white ${
        isBooking ? "" : "pb-[88px] lg:pb-0"
      }`}
    >
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
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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
          {/* Core Services Routes */}
          <Route path="/services" element={<ServicesOverviewPage onBook={handleBook} />} />
          <Route path="/services/" element={<ServicesOverviewPage onBook={handleBook} />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage onBook={handleBook} />} />
          <Route path="/services/:serviceSlug/" element={<ServiceDetailPage onBook={handleBook} />} />

          {/* Local SEO & Locality Routes */}
          <Route path="/laundry-service-hyderabad" element={<HyderabadLandingPage onBook={handleBook} />} />
          <Route path="/laundry-service-hyderabad/" element={<HyderabadLandingPage onBook={handleBook} />} />
          <Route path="/laundry-service-:localitySlug" element={<LocalityDetailPage onBook={handleBook} />} />
          <Route path="/laundry-service-:localitySlug/" element={<LocalityDetailPage onBook={handleBook} />} />

          {/* Dedicated Section Pages */}
          <Route path="/pricing" element={<PricingPage onBook={handleBook} />} />
          <Route path="/pricing/" element={<PricingPage onBook={handleBook} />} />
          <Route path="/about" element={<AboutPage onBook={handleBook} />} />
          <Route path="/about/" element={<AboutPage onBook={handleBook} />} />
          <Route path="/contact" element={<ContactPage onBook={handleBook} />} />
          <Route path="/contact/" element={<ContactPage onBook={handleBook} />} />

          {/* Booking Routes */}
          <Route path="/booking" element={<Navigate to="/book" replace />} />
          <Route path="/booking/" element={<Navigate to="/book" replace />} />

          {/* Legacy 301 Redirects */}
          <Route path="/special-dry-cleaning" element={<Navigate to="/services/dry-cleaning/" replace />} />
          <Route path="/special-dry-cleaning/" element={<Navigate to="/services/dry-cleaning/" replace />} />
          <Route path="/areas" element={<Navigate to="/laundry-service-hyderabad/" replace />} />
          <Route path="/areas/" element={<Navigate to="/laundry-service-hyderabad/" replace />} />
          <Route path="/areas/:slug" element={<LegacyAreaRedirect />} />

          {/* 404 Fallback */}
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

      <Footer onNavigate={handleNavigate} onBook={handleBook} />

      {/* Floating Mobile Bottom Navigation (<1024px, home only) */}
      {location.pathname === "/" && (
        <MobileBottomNav active={active} onNavigate={handleNavigate} onBook={handleBook} />
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
