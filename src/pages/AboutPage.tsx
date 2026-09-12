import {
  Award,
  CheckCircle2,
  ChevronRight,
  Home,
  MapPin,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { businessConfig } from "@/data/businessConfig";
import { applySeoMetadata, routeSeoMap } from "@/data/seo";

export function AboutPage({ onBook }: { onBook: () => void }) {
  useEffect(() => {
    const meta = routeSeoMap.about;
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": meta.canonical,
          url: meta.canonical,
          name: meta.title,
          description: meta.description,
          mainEntity: {
            "@type": "DryCleaningOrLaundry",
            name: businessConfig.name,
            telephone: businessConfig.displayPhone,
            address: {
              "@type": "PostalAddress",
              streetAddress: businessConfig.address.streetAddress,
              addressLocality: businessConfig.address.addressLocality,
              addressRegion: businessConfig.address.addressRegion,
              postalCode: businessConfig.address.postalCode,
              addressCountry: businessConfig.address.addressCountry,
            },
          },
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
          <span className="font-semibold text-navy-900">About Us</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100/60 via-ice-50/30 to-white py-12 sm:py-16">
        <div className="shell max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
            Neighbourhood Trust · Professional Standards
          </span>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            About Universal Laundry Services in Hyderabad
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-navy-900/70 leading-relaxed">
            Headquartered on Jubilee Hills Road No 5, Universal Laundry Services was established to bring reliable, hygienic, and convenient doorstep fabric care to households and professionals across Hyderabad.
          </p>
        </div>
      </section>

      {/* Our Story & Facility */}
      <section className="shell mt-12 max-w-4xl space-y-10">
        <div className="rounded-3xl border border-ice-200 bg-white p-6 sm:p-10 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Our Central Operations at Jubilee Hills
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/75">
            Located at <strong>{businessConfig.address.formattedAddress}</strong>, our centralized garment care facility handles everything from everyday wash &amp; fold loads to delicate silk sarees and bespoke tailored suits.
          </p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/75">
            Unlike informal neighborhood dhobis or communal laundering setups, we operate on a strict individual batch policy. Every customer&apos;s load is tagged with a unique barcode and washed in dedicated machines with temperature-controlled wash cycles and gentle, skin-safe liquid detergents.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-leaf-700 font-semibold">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>Serving Jubilee Hills, Banjara Hills, Madhapur, HITEC City, Gachibowli, and beyond.</span>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-ice-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-50 text-navy-600 border border-ice-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-navy-950">
              Segregated Hygiene
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-navy-900/70 leading-relaxed">
              Every customer&apos;s clothes are washed separately. Machines are sanitized regularly to maintain clean processing environments.
            </p>
          </div>

          <div className="rounded-2xl border border-ice-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-50 text-navy-600 border border-ice-200">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-navy-950">
              Experienced Fabric Team
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-navy-900/70 leading-relaxed">
              Trained garment handlers examine care labels, spot stains before washing, and use vacuum steam pressing to avoid fabric burn marks.
            </p>
          </div>

          <div className="rounded-2xl border border-ice-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-50 text-navy-600 border border-ice-200">
              <Recycle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-navy-950">
              Eco-Conscious Care
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-navy-900/70 leading-relaxed">
              We choose biodegradable, pH-balanced liquid detergents and odorless solvents that protect both garment fibers and sensitive skin.
            </p>
          </div>
        </div>

        {/* Hygiene Guarantees */}
        <div className="rounded-3xl border border-leaf-200 bg-leaf-50/40 p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Our Quality Commitments
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "100% individual batch processing — never combined with other clothes",
              "Free re-wash if you are not completely satisfied with the finish",
              "Moisture-proof sealed packaging ready for closet storage",
              "On-time doorstep delivery with scheduled 2-hour pickup windows",
            ].map((commitment, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-600 mt-0.5" />
                <span className="text-sm font-medium text-navy-900/80 leading-relaxed">
                  {commitment}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 to-navy-800 p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Experience the Universal Laundry Difference
            </h3>
            <p className="mt-1.5 text-sm text-navy-200">
              Schedule your first pickup today. Free pickup on orders above ₹399.
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
