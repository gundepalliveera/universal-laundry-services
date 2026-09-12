import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { businessConfig } from "@/data/businessConfig";
import { hyderabadHubData } from "@/data/localitiesData";
import { applySeoMetadata, SITE_URL } from "@/data/seo";

export function HyderabadLandingPage({ onBook }: { onBook: () => void }) {
  useEffect(() => {
    const canonical = `${SITE_URL}/laundry-service-hyderabad/`;
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "DryCleaningOrLaundry",
          "@id": `${canonical}#business`,
          name: businessConfig.name,
          url: canonical,
          telephone: businessConfig.displayPhone,
          priceRange: businessConfig.priceRange,
          address: {
            "@type": "PostalAddress",
            streetAddress: businessConfig.address.streetAddress,
            addressLocality: businessConfig.address.addressLocality,
            addressRegion: businessConfig.address.addressRegion,
            postalCode: businessConfig.address.postalCode,
            addressCountry: businessConfig.address.addressCountry,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: businessConfig.geo.latitude,
            longitude: businessConfig.geo.longitude,
          },
          areaServed: businessConfig.verifiedLocalities.map((loc) => ({
            "@type": "AdministrativeArea",
            name: `${loc.name}, Hyderabad`,
          })),
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
              name: "Laundry Service in Hyderabad",
              item: canonical,
            },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: hyderabadHubData.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    };

    applySeoMetadata({
      title: hyderabadHubData.title,
      description: hyderabadHubData.metaDescription,
      canonical,
      jsonLd: schemaData,
    });

    window.scrollTo(0, 0);
  }, []);

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
          <span className="font-semibold text-navy-900">Hyderabad Laundry Service</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100/60 via-ice-50/30 to-white py-12 sm:py-16">
        <div className="shell max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 uppercase tracking-wider">
            <MapPin className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
            Hyderabad City Local Hub
          </span>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            {hyderabadHubData.h1}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-navy-900/70 leading-relaxed">
            {hyderabadHubData.tagline}
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base text-navy-900/65 leading-relaxed">
            {hyderabadHubData.intro}
          </p>

          {/* Value Highlights */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-navy-800">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-sky-600" />
              <span>Wash &amp; Fold from ₹80/KG</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Clock className="h-4 w-4 text-navy-600" />
              <span>72 Hr Standard / Express 12–24 Hr</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Truck className="h-4 w-4 text-leaf-600" />
              <span>Free Doorstep Pickup Above ₹399</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="btn-primary px-6 py-3.5 text-sm font-bold shadow-lg"
            >
              Book Hyderabad Pickup
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

      {/* Services Breakdown in Hyderabad */}
      <section className="shell mt-12 max-w-5xl">
        <div className="text-center sm:text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-950">
            Our Laundry &amp; Garment Care Services in Hyderabad
          </h2>
          <p className="mt-2 text-sm text-navy-900/70">
            Tailored wash, fold, pressing, and dry-cleaning solutions for Hyderabad households.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hyderabadHubData.serviceOverview.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-ice-200 bg-white p-5 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
            >
              <h3 className="font-display text-lg font-bold text-navy-950">
                <Link to={item.path} className="hover:text-navy-600">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-navy-900/70 leading-relaxed">
                {item.description}
              </p>
              <Link
                to={item.path}
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-leaf-700 hover:text-leaf-800"
              >
                Learn more <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 11 Priority Locality Grid */}
      <section className="shell mt-16 max-w-5xl">
        <div className="rounded-3xl border border-ice-200 bg-ice-50/70 p-6 sm:p-10 shadow-sm">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-leaf-700 uppercase tracking-wider">
              Local Service Areas
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy-950">
              Verified Hyderabad Neighborhoods We Serve
            </h2>
            <p className="mt-2 text-sm text-navy-900/70">
              We offer daily scheduled doorstep collection and return delivery in these 11 key zones:
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessConfig.verifiedLocalities.map((loc) => (
              <Link
                key={loc.slug}
                to={`/laundry-service-${loc.slug}/`}
                className="group rounded-2xl border border-ice-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-navy-500 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-navy-950 group-hover:text-navy-600">
                    {loc.name}
                  </h3>
                  <ChevronRight className="h-4 w-4 text-navy-400 group-hover:text-navy-700 transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1.5 text-xs text-navy-900/60 leading-snug">
                  {loc.landmark}
                </p>
                <span className="mt-3 inline-block text-[11px] font-bold text-leaf-700">
                  View {loc.name} service details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="shell mt-16 max-w-5xl">
        <div className="rounded-3xl border border-leaf-200 bg-leaf-50/40 p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-navy-950 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-leaf-600" />
            Why Hyderabad Residents Choose Universal Laundry Services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "100% Individual Load Washing: We never combine your clothes with other customers' garments.",
              "Central Jubilee Hills Hub: Fast logistics and punctual doorstep arrival across West & Central Hyderabad.",
              "Eco-Friendly Detergents: Fabric-safe, gentle liquid detergents that protect fibers and natural skin.",
              "Clear Digital Weighing: Clothes are weighed at your door so you pay only for what you wash.",
              "Sealed Dust-Proof Packaging: Garments return protected against city dust and transit humidity.",
              "Seven Days a Week: Morning and evening pickup slots suited to your daily routine.",
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-600 mt-0.5" />
                <span className="text-sm font-medium text-navy-900/80 leading-relaxed">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hyderabad FAQs */}
      <section className="shell mt-16 max-w-5xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-950 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-sky-600" />
          Hyderabad Laundry FAQs
        </h2>
        <div className="mt-6 space-y-4">
          {hyderabadHubData.faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-ice-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-navy-950">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/75">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="shell mt-16 max-w-5xl">
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 to-navy-800 p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Schedule Your Doorstep Laundry Pickup
            </h3>
            <p className="mt-2 text-sm text-navy-200 max-w-xl">
              Enjoy fresh, professionally washed and ironed clothes without leaving home. Free pickup on orders above ₹399.
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
