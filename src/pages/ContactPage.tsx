import {
  ChevronRight,
  Clock,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { businessConfig } from "@/data/businessConfig";
import { applySeoMetadata, routeSeoMap } from "@/data/seo";

export function ContactPage({ onBook }: { onBook: () => void }) {
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formArea, setFormArea] = useState("");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const meta = routeSeoMap.contact;
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": meta.canonical,
          url: meta.canonical,
          name: meta.title,
          description: meta.description,
          mainEntity: {
            "@type": "DryCleaningOrLaundry",
            name: businessConfig.name,
            telephone: businessConfig.displayPhone,
            email: businessConfig.email,
            url: businessConfig.canonicalBase,
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
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "21:00",
              },
            ],
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

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Universal Laundry Services! My name is ${formName || "Customer"}, from ${formArea || "Hyderabad"}. ${formMessage || "I would like to inquire about laundry pickup."} (Phone: ${formPhone})`,
    );
    window.open(`https://wa.me/${businessConfig.whatsappNumber}?text=${text}`, "_blank");
  };

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
          <span className="font-semibold text-navy-900">Contact</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100/60 via-ice-50/30 to-white py-12 sm:py-16">
        <div className="shell max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
            Get in Touch · Doorstep Support
          </span>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Contact Universal Laundry Services Hyderabad
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-navy-900/70 leading-relaxed">
            Have questions about pickup timings, special garment care, or bulk orders? Reach us directly by phone, WhatsApp, or online booking.
          </p>
        </div>
      </section>

      {/* Contact Cards & Form */}
      <section className="shell mt-12 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Direct Channels */}
          <div className="space-y-4">
            {/* Phone */}
            <div className="rounded-2xl border border-ice-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700 border border-leaf-200">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/60">Phone Support</h3>
                  <a
                    href={`tel:+91${businessConfig.phone}`}
                    className="font-display text-lg font-bold text-navy-950 hover:text-navy-600 transition-colors"
                  >
                    {businessConfig.displayPhone}
                  </a>
                </div>
              </div>
              <p className="mt-3 text-xs text-navy-900/60">
                Call us for immediate booking assistance or queries regarding scheduled pickups.
              </p>
            </div>

            {/* WhatsApp */}
            <div className="rounded-2xl border border-ice-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/60">WhatsApp Chat</h3>
                  <a
                    href={businessConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
              <p className="mt-3 text-xs text-navy-900/60">
                Quickest way to share location pins, ask turnaround questions, and reschedule slots.
              </p>
            </div>

            {/* Address */}
            <div className="rounded-2xl border border-ice-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/60">Facility Location</h3>
                  <p className="mt-1 text-sm font-semibold text-navy-950">
                    {businessConfig.address.formattedAddress}
                  </p>
                  <a
                    href={businessConfig.geo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-800"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="rounded-2xl border border-ice-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/60">Working Hours</h3>
                  <p className="text-sm font-bold text-navy-950">{businessConfig.openingHours.display}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-navy-900/60">
                Operating all 7 days of the week, including Saturday and Sunday pickups.
              </p>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="rounded-3xl border border-ice-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Send an Inquiry via WhatsApp
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-navy-900/65">
              Fill out your details to start a conversation with our customer care team.
            </p>

            <form onSubmit={handleSendWhatsApp} className="mt-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-navy-900 mb-1">
                  Your Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-ice-300 px-3.5 py-2.5 text-sm text-navy-950 focus:border-navy-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold text-navy-900 mb-1">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full rounded-xl border border-ice-300 px-3.5 py-2.5 text-sm text-navy-950 focus:border-navy-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-area" className="block text-xs font-bold text-navy-900 mb-1">
                  Locality / Neighborhood in Hyderabad
                </label>
                <input
                  id="contact-area"
                  type="text"
                  required
                  value={formArea}
                  onChange={(e) => setFormArea(e.target.value)}
                  placeholder="e.g. Jubilee Hills, Madhapur, Gachibowli..."
                  className="w-full rounded-xl border border-ice-300 px-3.5 py-2.5 text-sm text-navy-950 focus:border-navy-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-bold text-navy-900 mb-1">
                  Your Message or Request
                </label>
                <textarea
                  id="contact-msg"
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Tell us what service you require or ask any question..."
                  className="w-full rounded-xl border border-ice-300 px-3.5 py-2.5 text-sm text-navy-950 focus:border-navy-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-green w-full py-3 text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Submit via WhatsApp
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onBook}
                  className="text-xs font-bold text-navy-700 hover:text-navy-950 underline"
                >
                  Or schedule instant doorstep pickup online →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
