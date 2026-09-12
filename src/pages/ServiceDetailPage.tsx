import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  Home,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { businessConfig } from "@/data/businessConfig";
import { applySeoMetadata, serviceDetails, SITE_URL } from "@/data/seo";
import { NotFound } from "@/components/NotFound";

export function ServiceDetailPage({ onBook }: { onBook: () => void }) {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const slug = serviceSlug?.replace(/\/$/, "") || "";
  const service = serviceDetails[slug];

  useEffect(() => {
    if (service) {
      const canonical = `${SITE_URL}/services/${service.slug}/`;
      const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            name: service.title,
            description: service.metaDescription,
            provider: {
              "@type": "DryCleaningOrLaundry",
              name: businessConfig.name,
              telephone: businessConfig.displayPhone,
              url: businessConfig.canonicalBase,
            },
            areaServed: {
              "@type": "City",
              name: "Hyderabad",
            },
            offers: {
              "@type": "Offer",
              price: service.price,
              priceCurrency: "INR",
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${SITE_URL}/services/`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: service.title,
                item: canonical,
              },
            ],
          },
          ...(service.faqs && service.faqs.length > 0
            ? [
                {
                  "@type": "FAQPage",
                  mainEntity: service.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                },
              ]
            : []),
        ],
      };

      applySeoMetadata({
        title: service.metaTitle,
        description: service.metaDescription,
        canonical,
        jsonLd: schemaData,
      });

      window.scrollTo(0, 0);
    }
  }, [service]);

  if (!service) {
    return <NotFound onBook={onBook} />;
  }

  const otherServices = Object.values(serviceDetails).filter(
    (s) => s.slug !== service.slug,
  );

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-ice-200/70 bg-ice-50/50 py-3"
      >
        <div className="shell flex items-center gap-2 text-xs font-medium text-navy-900/60">
          <Link
            to="/"
            className="flex items-center gap-1 transition-colors hover:text-navy-900"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-navy-400" aria-hidden="true" />
          <Link
            to="/services/"
            className="transition-colors hover:text-navy-900"
          >
            Services
          </Link>
          <ChevronRight className="h-3 w-3 text-navy-400" aria-hidden="true" />
          <span className="font-semibold text-navy-900 truncate">
            {service.title}
          </span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100/60 via-ice-50/30 to-white py-12 sm:py-16">
        <div className="shell max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
            Hyderabad Doorstep Laundry Care
          </span>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            {service.h1}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-navy-900/70 leading-relaxed">
            {service.tagline}
          </p>

          {/* Key Specs Bar */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-navy-800">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-sky-600" aria-hidden="true" />
              <span>{service.price}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Clock className="h-4 w-4 text-navy-600" aria-hidden="true" />
              <span>{service.turnaround}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
              <span>Free Pickup above ₹399</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="btn-primary group px-6 py-3.5 text-sm font-bold shadow-lg"
            >
              Book {service.title} Pickup
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href={businessConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-leaf-300 bg-leaf-50 px-5 py-3 text-sm font-bold text-leaf-700 transition-colors hover:bg-leaf-100"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a
              href={`tel:+91${businessConfig.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-ice-200 bg-white px-5 py-3 text-sm font-bold text-navy-700 transition-colors hover:bg-ice-50"
            >
              <Phone className="h-4 w-4 text-navy-600" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="shell mt-12 max-w-4xl space-y-12">
        {/* Suitable For */}
        <div className="rounded-3xl border border-ice-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-950">
            Recommended Garments &amp; Use Cases
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.whoItsFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-600 mt-0.5" />
                <span className="text-sm font-medium text-navy-900/80 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process Steps */}
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-950 text-center sm:text-left">
            How Our {service.title} Process Works
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-ice-200 bg-ice-50/50 p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-display text-base font-bold text-navy-900">
                  {step.step}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Benefits */}
        <div className="rounded-3xl border border-leaf-200 bg-leaf-50/40 p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-950 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-leaf-600" />
            Why Choose Universal Laundry Services
          </h2>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-leaf-500 mt-2 shrink-0" />
                <span className="text-sm sm:text-base font-medium text-navy-900/85">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs sm:text-sm text-navy-900/60 italic">
            {service.localContext}
          </p>
        </div>

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-sky-600" />
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-ice-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-base font-bold text-navy-950">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/75">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Area Link Hub */}
        <div className="rounded-3xl border border-ice-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="font-display text-lg font-bold text-navy-950">
            Available for Doorstep Pickup Across Hyderabad Neighborhoods
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-navy-900/70">
            We provide fast scheduled collection and delivery in your area:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {businessConfig.verifiedLocalities.map((loc) => (
              <Link
                key={loc.slug}
                to={`/laundry-service-${loc.slug}/`}
                className="rounded-full border border-ice-200 bg-ice-50 px-3.5 py-1.5 text-xs font-semibold text-navy-800 transition-colors hover:border-navy-400 hover:bg-white"
              >
                {service.title} in {loc.name}
              </Link>
            ))}
            <Link
              to="/laundry-service-hyderabad/"
              className="rounded-full border border-sky-300 bg-sky-50 px-3.5 py-1.5 text-xs font-bold text-sky-800 transition-colors hover:bg-sky-100"
            >
              All Hyderabad Areas →
            </Link>
          </div>
        </div>

        {/* Explore Other Services */}
        <div className="border-t border-ice-200 pt-8">
          <h3 className="font-display text-lg font-bold text-navy-950">
            Explore Other Garment Care Services
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {otherServices.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}/`}
                className="group rounded-2xl border border-ice-200 bg-white p-4 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
              >
                <h4 className="font-display text-sm font-bold text-navy-900 group-hover:text-navy-600">
                  {s.title}
                </h4>
                <p className="mt-1 text-xs text-navy-900/60 line-clamp-2">
                  {s.tagline}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-leaf-700">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Booking Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 to-navy-800 p-6 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Ready for clean, fresh clothes?
            </h3>
            <p className="mt-1 text-sm text-navy-200">
              Schedule your pickup in under 2 minutes. Free pickup above ₹399.
            </p>
          </div>
          <button
            type="button"
            onClick={onBook}
            className="btn-green shrink-0 px-8 py-4 text-sm font-bold shadow-lg"
          >
            Book an Order
          </button>
        </div>
      </section>
    </main>
  );
}
