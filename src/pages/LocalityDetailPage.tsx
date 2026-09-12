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
import { Link, useParams } from "react-router-dom";
import { businessConfig } from "@/data/businessConfig";
import { getLocalityBySlug, LocalityInfo } from "@/data/localitiesData";
import { applySeoMetadata, SITE_URL } from "@/data/seo";
import { NotFound } from "@/components/NotFound";

export function LocalityDetailPage({ onBook }: { onBook: () => void }) {
  const { localitySlug } = useParams<{ localitySlug: string }>();
  const slug = localitySlug?.replace(/\/$/, "") || "";
  const locality: LocalityInfo | undefined = getLocalityBySlug(slug);

  useEffect(() => {
    if (locality) {
      const canonical = `${SITE_URL}/laundry-service-${locality.slug}/`;
      const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "DryCleaningOrLaundry",
            "@id": `${canonical}#business`,
            name: `${businessConfig.name} - ${locality.name}`,
            url: canonical,
            telephone: businessConfig.displayPhone,
            priceRange: businessConfig.priceRange,
            address: {
              "@type": "PostalAddress",
              streetAddress: businessConfig.address.streetAddress,
              addressLocality: locality.name,
              addressRegion: "Telangana",
              postalCode: businessConfig.address.postalCode,
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: businessConfig.geo.latitude,
              longitude: businessConfig.geo.longitude,
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: `${locality.name}, Hyderabad`,
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
                name: "Hyderabad",
                item: `${SITE_URL}/laundry-service-hyderabad/`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: locality.name,
                item: canonical,
              },
            ],
          },
          {
            "@type": "FAQPage",
            mainEntity: locality.faqs.map((faq) => ({
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
        title: locality.title,
        description: locality.metaDescription,
        canonical,
        jsonLd: schemaData,
      });

      window.scrollTo(0, 0);
    }
  }, [locality]);

  if (!locality) {
    return <NotFound onBook={onBook} />;
  }

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
          <Link to="/laundry-service-hyderabad/" className="transition-colors hover:text-navy-900">
            Hyderabad
          </Link>
          <ChevronRight className="h-3 w-3 text-navy-400" aria-hidden="true" />
          <span className="font-semibold text-navy-900">{locality.name}</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100/60 via-ice-50/30 to-white py-12 sm:py-16">
        <div className="shell max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 uppercase tracking-wider">
            <MapPin className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
            {locality.name} · {locality.zone}
          </span>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            {locality.h1}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-navy-900/70 leading-relaxed">
            {locality.tagline}
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base text-navy-900/65 leading-relaxed">
            {locality.intro}
          </p>

          {/* Quick Specs */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-navy-800">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-sky-600" />
              <span>Wash &amp; Fold ₹80/KG</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Clock className="h-4 w-4 text-navy-600" />
              <span>72 Hr Standard / Express Slots</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-ice-200 bg-white px-3.5 py-2 shadow-sm">
              <Truck className="h-4 w-4 text-leaf-600" />
              <span>Free Pickup in {locality.name}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="btn-primary px-6 py-3.5 text-sm font-bold shadow-lg"
            >
              Book Pickup in {locality.name}
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

      {/* Neighborhood Details & Logistics */}
      <section className="shell mt-12 max-w-4xl space-y-10">
        {/* Neighborhood Profile */}
        <div className="rounded-3xl border border-ice-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-950">
            Fabric Care Tailored for {locality.name}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-navy-900/75 leading-relaxed">
            {locality.neighborhoodProfile}
          </p>

          <div className="mt-6 border-t border-ice-100 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/50">
              Key Localities &amp; Landmarks Covered in {locality.name}:
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {locality.landmarks.map((landmark, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-ice-50 px-3 py-1 text-xs font-semibold text-navy-800"
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Services in Locality */}
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Popular Laundry &amp; Dry Cleaning Services in {locality.name}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {locality.popularServices.map((srv, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-ice-200 bg-white p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-display text-base font-bold text-navy-950">
                    <Link to={srv.path} className="hover:text-navy-600">
                      {srv.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-navy-900/70 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <Link
                  to={srv.path}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-leaf-700 hover:text-leaf-800"
                >
                  View service details <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Doorstep Pickup & Turnaround Info */}
        <div className="rounded-3xl border border-ice-200 bg-ice-50/50 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-leaf-600" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-950">
              Pickup &amp; Delivery Logistics in {locality.name}
            </h2>
          </div>
          <p className="mt-3 text-sm sm:text-base text-navy-900/75 leading-relaxed">
            {locality.pickupDeliveryInfo}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-ice-200 bg-white p-4">
              <h3 className="text-xs font-bold text-navy-900/60 uppercase">Morning Pickup</h3>
              <p className="mt-1 text-sm font-semibold text-navy-950">08:00 AM – 11:00 AM</p>
              <p className="text-xs text-navy-900/50">Hand over before leaving for office</p>
            </div>
            <div className="rounded-xl border border-ice-200 bg-white p-4">
              <h3 className="text-xs font-bold text-navy-900/60 uppercase">Evening Delivery</h3>
              <p className="mt-1 text-sm font-semibold text-navy-950">06:00 PM – 09:00 PM</p>
              <p className="text-xs text-navy-900/50">Receive fresh clothes after work hours</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="rounded-3xl border border-leaf-200 bg-leaf-50/40 p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-950 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-leaf-600" />
            Why {locality.name} Residents Trust Us
          </h2>
          <ul className="mt-4 space-y-3">
            {locality.whyChooseHere.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-600 mt-0.5" />
                <span className="text-sm font-medium text-navy-900/80 leading-relaxed">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-950 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-sky-600" />
            Frequently Asked Questions for {locality.name}
          </h2>
          <div className="mt-6 space-y-4">
            {locality.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-ice-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-bold text-navy-950">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/75">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Verified Localities */}
        <div className="border-t border-ice-200 pt-8">
          <h3 className="font-display text-lg font-bold text-navy-950">
            Nearby Service Areas in West &amp; Central Hyderabad
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-navy-900/60">
            We also provide scheduled doorstep pickup in surrounding neighborhoods:
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {locality.nearbyLocalities.map((near) => (
              <Link
                key={near.slug}
                to={`/laundry-service-${near.slug}/`}
                className="rounded-full border border-ice-200 bg-ice-50 px-4 py-2 text-xs font-semibold text-navy-800 hover:border-navy-400 hover:bg-white transition-colors"
              >
                Laundry Service in {near.name}
              </Link>
            ))}
            <Link
              to="/laundry-service-hyderabad/"
              className="rounded-full border border-sky-300 bg-sky-50 px-4 py-2 text-xs font-bold text-sky-900 hover:bg-sky-100 transition-colors"
            >
              All Hyderabad Areas →
            </Link>
          </div>
        </div>

        {/* Bottom Booking CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 to-navy-800 p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Ready to book your laundry pickup in {locality.name}?
            </h3>
            <p className="mt-1.5 text-sm text-navy-200">
              Schedule online in under 2 minutes. Free delivery on orders above ₹399.
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
