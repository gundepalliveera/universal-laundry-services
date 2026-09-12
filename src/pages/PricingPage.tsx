import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Home,
  MessageCircle,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { businessConfig } from "@/data/businessConfig";
import { applySeoMetadata, routeSeoMap, SITE_URL } from "@/data/seo";
import { pricingPlans } from "@/data/site";

export function PricingPage({ onBook }: { onBook: () => void }) {
  useEffect(() => {
    const meta = routeSeoMap.pricing;
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
                name: "Pricing",
                item: meta.canonical,
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
          <span className="font-semibold text-navy-900">Pricing</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100/60 via-ice-50/30 to-white py-12 sm:py-16">
        <div className="shell max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
            Transparent Laundry Pricing · Hyderabad
          </span>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Transparent Laundry Prices in Hyderabad
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-navy-900/70 leading-relaxed">
            Simple, honest pricing with zero hidden charges. Wash &amp; Fold at ₹80/KG, Wash &amp; Steam Iron at ₹120/KG, and free doorstep pickup on orders above ₹399.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="btn-primary px-6 py-3.5 text-sm font-bold shadow-lg"
            >
              Book an Order
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={businessConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-leaf-300 bg-leaf-50 px-5 py-3 text-sm font-bold text-leaf-700 hover:bg-leaf-100"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Pricing Query
            </a>
          </div>
        </div>
      </section>

      {/* Turnaround Plans Grid */}
      <section className="shell mt-12 max-w-6xl">
        <div className="text-center sm:text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-950">
            Turnaround Speed Options
          </h2>
          <p className="mt-1 text-sm text-navy-900/70">
            Choose standard 72-hour delivery for maximum savings, or express 12 &amp; 24-hour options when you are in a rush.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-3xl border p-6 sm:p-8 shadow-sm transition-all ${
                plan.popular
                  ? "border-navy-600 bg-navy-950 text-white shadow-xl relative"
                  : "border-ice-200 bg-white text-navy-950"
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-leaf-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                    Express Option
                  </span>
                )}
                <h3 className={`font-display text-xl font-bold ${plan.popular ? "text-white" : "text-navy-950"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-xs ${plan.popular ? "text-navy-200" : "text-navy-900/60"}`}>
                  {plan.summary}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold">₹{plan.price}</span>
                  <span className={`text-xs ${plan.popular ? "text-navy-300" : "text-navy-900/60"}`}>
                    {plan.unit}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 border-t border-current/10 pt-6">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.popular ? "text-leaf-400" : "text-leaf-600"}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={onBook}
                className={`mt-8 w-full rounded-full py-3 text-xs sm:text-sm font-bold transition-all ${
                  plan.popular
                    ? "bg-leaf-500 text-white hover:bg-leaf-600"
                    : "bg-navy-600 text-white hover:bg-navy-700"
                }`}
              >
                Select &amp; Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Rate Table */}
      <section className="shell mt-16 max-w-5xl">
        <div className="rounded-3xl border border-ice-200 bg-white p-6 sm:p-10 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Complete Rate Chart by Service &amp; Turnaround
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm text-navy-900">
              <thead className="border-b border-ice-200 bg-ice-50/70 text-xs uppercase font-bold text-navy-800">
                <tr>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Regular (72 Hr)</th>
                  <th className="px-4 py-3">Express (24 Hr)</th>
                  <th className="px-4 py-3">Express Fast (12 Hr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ice-100">
                <tr>
                  <td className="px-4 py-3.5 font-bold text-navy-950">Wash &amp; Fold</td>
                  <td className="px-4 py-3.5 text-navy-900/70">Per KG</td>
                  <td className="px-4 py-3.5 font-semibold text-leaf-700">₹80</td>
                  <td className="px-4 py-3.5">₹150</td>
                  <td className="px-4 py-3.5">₹180</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-navy-950">Wash &amp; Steam Iron</td>
                  <td className="px-4 py-3.5 text-navy-900/70">Per KG</td>
                  <td className="px-4 py-3.5 font-semibold text-leaf-700">₹120</td>
                  <td className="px-4 py-3.5">₹200</td>
                  <td className="px-4 py-3.5">₹250</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-navy-950">Dry Cleaning</td>
                  <td className="px-4 py-3.5 text-navy-900/70">Per Piece</td>
                  <td className="px-4 py-3.5 font-semibold" colSpan={3}>
                    Starting at ₹120 / piece (standard 72–96 hr)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-navy-950">Shoe Cleaning</td>
                  <td className="px-4 py-3.5 text-navy-900/70">Per Pair</td>
                  <td className="px-4 py-3.5 font-semibold" colSpan={3}>
                    Starting at ₹149 / pair (72 hr)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-navy-950">Bag Cleaning</td>
                  <td className="px-4 py-3.5 text-navy-900/70">Per Bag</td>
                  <td className="px-4 py-3.5 font-semibold" colSpan={3}>
                    Starting at ₹149 / bag (72–96 hr)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-bold text-navy-950">Premium Wash</td>
                  <td className="px-4 py-3.5 text-navy-900/70">Per Piece</td>
                  <td className="px-4 py-3.5 font-semibold" colSpan={3}>
                    ₹80 / piece (72 hr)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl bg-ice-50 p-4 text-xs sm:text-sm text-navy-900/75 flex items-center gap-2">
            <Truck className="h-5 w-5 text-leaf-600 shrink-0" />
            <span>
              <strong>Free Doorstep Pickup &amp; Delivery:</strong> Available on all orders above ₹399 across Hyderabad. Orders below ₹399 have a flat delivery fee of ₹49.
            </span>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="shell mt-16 max-w-5xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-950 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-sky-600" />
          Frequently Asked Questions About Laundry Prices
        </h2>
        <div className="mt-6 space-y-4">
          {[
            {
              question: "How do you calculate the weight for per-KG laundry?",
              answer: "Our delivery executive weighs your garments on a digital scale at your doorstep during pickup, providing an instant receipt before processing.",
            },
            {
              question: "Are there any hidden taxes or packaging charges?",
              answer: "No. The rates shown above include standard processing, folding, and dust-proof packaging. No hidden handling or processing fees.",
            },
            {
              question: "How can I pay for my laundry order?",
              answer: "We accept UPI (PhonePe, Google Pay, Paytm), cash on delivery, and online card payments upon delivery.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-ice-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-navy-950">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/75">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
