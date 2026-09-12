import {
  ArrowRight,
  ChevronRight,
  Clock,
  Home,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { businessConfig } from "@/data/businessConfig";
import { applySeoMetadata, routeSeoMap, serviceDetails, SITE_URL } from "@/data/seo";

export function ServicesOverviewPage({ onBook }: { onBook: () => void }) {
  useEffect(() => {
    const meta = routeSeoMap.services;
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": meta.canonical,
          url: meta.canonical,
          name: meta.title,
          description: meta.description,
          breadcrumb: {
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
                item: meta.canonical,
              },
            ],
          },
        },
        {
          "@type": "OfferCatalog",
          name: "Laundry & Dry Cleaning Services in Hyderabad",
          itemListElement: Object.values(serviceDetails).map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.metaDescription,
              url: `${SITE_URL}/services/${s.slug}/`,
            },
          })),
        },
      ],
    };

    applySeoMetadata({
      title: meta.title,
      description: meta.description,
      canonical: meta.canonical,
      jsonLd: schemaData,
    });

    window.scrollTo(0, 0);
  }, []);

  const coreServices = [
    serviceDetails["wash-and-fold"],
    serviceDetails["wash-and-iron"],
    serviceDetails["dry-cleaning"],
    serviceDetails["steam-ironing"],
    serviceDetails["doorstep-pickup-delivery"],
    serviceDetails["laundry"],
  ].filter(Boolean);

  const specialtyServices = [
    serviceDetails["premium-wash"],
    serviceDetails["shoe-cleaning"],
    serviceDetails["bag-cleaning"],
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-ice-200/70 bg-ice-50/50 py-3">
        <div className="shell flex items-center gap-2 text-xs font-medium text-navy-900/60">
          <Link to="/" className="flex items-center gap-1 transition-colors hover:text-navy-900">
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-navy-400" aria-hidden="true" />
          <span className="font-semibold text-navy-900">Services</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100/60 via-ice-50/30 to-white py-12 sm:py-16">
        <div className="shell max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
            Hyderabad Professional Fabric Care
          </span>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Professional Laundry &amp; Dry Cleaning Services in Hyderabad
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-navy-900/70 leading-relaxed">
            From daily wash &amp; fold by the kilogram to delicate designer dry cleaning and precision steam pressing, we provide complete doorstep garment care across Hyderabad.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="btn-primary px-6 py-3.5 text-sm font-bold shadow-lg"
            >
              Book Pickup Now
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={businessConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-leaf-300 bg-leaf-50 px-5 py-3 text-sm font-bold text-leaf-700 hover:bg-leaf-100"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a
              href={`tel:+91${businessConfig.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-ice-200 bg-white px-5 py-3 text-sm font-bold text-navy-700 hover:bg-ice-50"
            >
              <Phone className="h-4 w-4 text-navy-600" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="shell mt-12 max-w-6xl">
        <div className="text-center sm:text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-950">
            Core Laundry &amp; Dry Cleaning Services
          </h2>
          <p className="mt-2 text-sm text-navy-900/70">
            Each load is washed individually in hygienic machines and packed in dust-proof bags.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col justify-between rounded-3xl border border-ice-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-ice-100 px-3 py-1 text-xs font-bold text-navy-800">
                    {service.price}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-navy-900/60">
                    <Clock className="h-3.5 w-3.5 text-navy-500" />
                    {service.turnaround.split("(")[0].trim()}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-navy-950">
                  <Link
                    to={`/services/${service.slug}/`}
                    className="hover:text-navy-600 transition-colors"
                  >
                    {service.title}
                  </Link>
                </h3>

                <p className="mt-2 text-sm text-navy-900/70 leading-relaxed">
                  {service.tagline}
                </p>

                <ul className="mt-4 space-y-2 border-t border-ice-100 pt-4">
                  {service.benefits.slice(0, 2).map((b, i) => (
                    <li key={i} className="text-xs text-navy-900/75 flex items-start gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-leaf-500 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-ice-100 flex items-center justify-between">
                <Link
                  to={`/services/${service.slug}/`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-navy-700 hover:text-navy-950"
                >
                  View Details
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={onBook}
                  className="rounded-full bg-navy-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-navy-700"
                >
                  Book Pickup
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Specialty Services */}
      <section className="shell mt-16 max-w-6xl">
        <div className="text-center sm:text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-950">
            Specialty Care Services
          </h2>
          <p className="mt-2 text-sm text-navy-900/70">
            Specialized cleaning for sneakers, luxury bags, and couture fabrics.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {specialtyServices.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col justify-between rounded-3xl border border-ice-200 bg-white p-6 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
            >
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-ice-100 px-3 py-1 text-xs font-bold text-navy-800">
                  {service.price}
                </span>

                <h3 className="mt-3 font-display text-lg font-bold text-navy-950">
                  <Link to={`/services/${service.slug}/`} className="hover:text-navy-600">
                    {service.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-navy-900/70 leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ice-100 flex items-center justify-between">
                <Link
                  to={`/services/${service.slug}/`}
                  className="text-xs font-bold text-navy-700 hover:text-navy-950"
                >
                  Learn More →
                </Link>
                <button
                  type="button"
                  onClick={onBook}
                  className="rounded-full bg-navy-50 px-3.5 py-1.5 text-xs font-bold text-navy-800 hover:bg-navy-100"
                >
                  Book
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Service Areas Link Hub */}
      <section className="shell mt-16 max-w-6xl">
        <div className="rounded-3xl border border-ice-200 bg-ice-50/60 p-6 sm:p-10">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-950">
            Doorstep Laundry Coverage Across Hyderabad
          </h2>
          <p className="mt-2 text-sm text-navy-900/70">
            Select your neighborhood for local pickup schedules and dedicated service details:
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {businessConfig.verifiedLocalities.map((loc) => (
              <Link
                key={loc.slug}
                to={`/laundry-service-${loc.slug}/`}
                className="rounded-full border border-ice-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-navy-800 shadow-sm transition-colors hover:border-navy-500 hover:bg-navy-50"
              >
                Laundry Service in {loc.name}
              </Link>
            ))}
            <Link
              to="/laundry-service-hyderabad/"
              className="rounded-full border border-sky-400 bg-sky-100 px-4 py-2 text-xs sm:text-sm font-bold text-sky-900 transition-colors hover:bg-sky-200"
            >
              Hyderabad Overview Page →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
