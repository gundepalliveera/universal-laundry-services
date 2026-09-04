import { motion } from "framer-motion";
import { Home, Sparkles, Truck } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { WaterAnimation } from "@/components/WaterAnimation";

export function NotFound({ onBook }: { onBook?: () => void }) {
  useEffect(() => {
    document.title = "404 - Page Not Found | Universal Laundry Services";
  }, []);

  return (
    <main
      id="not-found"
      className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-4 py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(85%_65%_at_50%_15%,#eff6ff_0%,#ffffff_75%)]"
      />
      <WaterAnimation count={8} droplets={3} className="-z-10 opacity-60" seed={404} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card-soft relative w-full max-w-xl overflow-hidden p-6 sm:p-10 text-center shadow-xl border border-ice-200"
      >
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(108,179,63,0.18),transparent_65%)]"
        />

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3.5 py-1 text-[12px] font-bold text-leaf-700 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          404 Error
        </div>

        {/* Big 404 Typography */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-4 font-display text-7xl sm:text-8xl font-black tracking-tight text-navy-950"
        >
          4<span className="text-leaf-600">0</span>4
        </motion.div>

        {/* Heading */}
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy-950">
          Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-3 max-w-md text-[14.5px] sm:text-[15px] leading-relaxed text-navy-900/65">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="btn-primary group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold shadow-md"
          >
            <Home className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            Back to Home
          </Link>

          {onBook ? (
            <button
              type="button"
              onClick={onBook}
              className="btn-ghost inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold border border-ice-200 hover:border-navy-300"
            >
              <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
              Book a Pickup
            </button>
          ) : (
            <Link
              to="/book"
              className="btn-ghost inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold border border-ice-200 hover:border-navy-300"
            >
              <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
              Book a Pickup
            </Link>
          )}
        </div>

        {/* Quick Links Footer */}
        <div className="mt-8 border-t border-ice-100 pt-5">
          <p className="text-[12px] font-semibold text-navy-900/45 uppercase tracking-wide">
            Helpful Sections
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-bold text-navy-700">
            <Link to="/#services" className="hover:text-leaf-600 transition-colors">Services</Link>
            <span className="text-ice-300">·</span>
            <Link to="/#pricing" className="hover:text-leaf-600 transition-colors">Pricing</Link>
            <span className="text-ice-300">·</span>
            <Link to="/#how-it-works" className="hover:text-leaf-600 transition-colors">How It Works</Link>
            <span className="text-ice-300">·</span>
            <Link to="/#contact" className="hover:text-leaf-600 transition-colors">Contact</Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
