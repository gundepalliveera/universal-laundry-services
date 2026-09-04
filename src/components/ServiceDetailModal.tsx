import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { serviceDetails, type ServiceDetail, SITE_URL } from "@/data/seo";
import { contactInfo } from "@/data/site";

export function ServiceDetailView({
  slug,
  onClose,
  onBook,
  onSelectService,
}: {
  slug: string;
  onClose: () => void;
  onBook: () => void;
  onSelectService: (s: string) => void;
}) {
  const service: ServiceDetail | undefined = serviceDetails[slug];

  useEffect(() => {
    if (service) {
      document.title = service.metaTitle;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) descTag.setAttribute("content", service.metaDescription);
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag)
        canonicalTag.setAttribute("href", `${SITE_URL}/services/${service.slug}`);
    }
  }, [service]);

  if (!service) return null;

  const otherServices = Object.values(serviceDetails).filter(
    (s) => s.slug !== service.slug,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md p-3 sm:p-6 md:p-8 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-h1"
    >
      <motion.article
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-ice-200 bg-white shadow-2xl my-auto text-navy-950"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-ice-100 bg-white/95 px-5 py-4 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-700 transition-colors hover:text-navy-950"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Services
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-ice-100 text-navy-800 transition-transform hover:scale-105 active:scale-95"
            aria-label="Close service details"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Eyebrow & H1 */}
          <div>
            <span className="eyebrow inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
              Universal Laundry Services · Hyderabad
            </span>
            <h1
              id="service-h1"
              className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-navy-950 leading-tight"
            >
              {service.h1}
            </h1>
            <p className="mt-2 text-[14.5px] sm:text-base text-navy-900/70 leading-relaxed">
              {service.tagline}
            </p>
          </div>

          {/* Pricing & Turnaround Badges */}
          <div className="flex flex-wrap items-center gap-3 border-y border-ice-100 py-3.5">
            <div className="flex items-center gap-2 rounded-xl bg-navy-50 px-3.5 py-2">
              <span className="text-xs font-semibold text-navy-900/50 uppercase">Rate:</span>
              <span className="font-display text-base font-extrabold text-navy-700">
                {service.price}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-ice-50 px-3.5 py-2">
              <Clock className="h-4 w-4 text-navy-600" aria-hidden="true" />
              <span className="text-xs font-semibold text-navy-900">
                {service.turnaround}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-leaf-50 px-3.5 py-2">
              <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
              <span className="text-xs font-bold text-leaf-700">
                Free Pickup above ₹399
              </span>
            </div>
          </div>

          {/* Who It's For */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-navy-600" />
              Who This Service Is For
            </h2>
            <ul className="mt-3 space-y-2">
              {service.whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] sm:text-[14px] text-navy-900/80">
                  <CheckCircle2 className="h-4 w-4 text-leaf-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4-Step Process */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              How We Clean Your Clothes
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {service.process.map((p) => (
                <div
                  key={p.step}
                  className="rounded-2xl border border-ice-200 bg-ice-50/60 p-3.5"
                >
                  <p className="text-[13px] font-bold text-navy-950">{p.step}</p>
                  <p className="mt-1 text-[12px] text-navy-900/65 leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-leaf-500" />
              Service Guarantees &amp; Benefits
            </h2>
            <ul className="mt-3 space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13.5px] text-navy-900/80">
                  <ShieldCheck className="h-4 w-4 text-leaf-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Hyderabad Context */}
          <div className="rounded-2xl border border-ice-200 bg-navy-50/50 p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase tracking-wide">
              <MapPin className="h-3.5 w-3.5 text-navy-600" aria-hidden="true" />
              Doorstep Service Across Hyderabad
            </p>
            <p className="mt-1.5 text-[13px] text-navy-900/75 leading-relaxed">
              {service.localContext}
            </p>
          </div>

          {/* CTA & Booking Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook();
              }}
              className="btn-primary w-full sm:w-auto flex-1 py-3.5 text-sm font-bold shadow-md"
            >
              Book {service.title} Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={`https://wa.me/91${contactInfo.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(service.title)}%20service%20in%20Hyderabad`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full sm:w-auto py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4 text-leaf-600" aria-hidden="true" />
              WhatsApp Booking
            </a>
          </div>

          {/* Internal Links to Other Services */}
          <div className="border-t border-ice-100 pt-5">
            <p className="text-xs font-bold text-navy-900/50 uppercase tracking-wider mb-3">
              Explore other laundry services in Hyderabad:
            </p>
            <div className="flex flex-wrap gap-2">
              {otherServices.map((other) => (
                <button
                  key={other.slug}
                  type="button"
                  onClick={() => onSelectService(other.slug)}
                  className="rounded-full border border-ice-200 bg-white px-3 py-1 text-xs font-semibold text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
                >
                  {other.title} →
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
