import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  HeartHandshake,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
  ArrowRight,
} from "lucide-react";
import { WaterAnimation } from "@/components/WaterAnimation";
import { SectionHeading, fadeUp, staggerParent } from "@/components/ui/Reveal";

export const faqItems = [
  {
    question: "What laundry services does Universal Laundry Services provide in Hyderabad?",
    answer:
      "Universal Laundry Services provides wash & fold, wash & steam iron, premium wash, eco-friendly dry cleaning, shoe cleaning, and bag cleaning with doorstep pickup and delivery across Hyderabad.",
  },
  {
    question: "Do you provide laundry pickup and delivery in Hyderabad?",
    answer:
      "Yes, we provide convenient doorstep laundry pickup and delivery across major Hyderabad localities including Jubilee Hills, Banjara Hills, Madhapur, Kondapur, Gachibowli, HITEC City, and Manikonda. Free pickup and delivery is available on orders above ₹399.",
  },
  {
    question: "How much does laundry service cost in Hyderabad?",
    answer:
      "Everyday Wash & Fold starts at ₹80/KG, Wash & Steam Iron is ₹120/KG, Dry Cleaning starts from ₹120 per piece, and shoe/bag cleaning starts from ₹149. Transparent pricing with no hidden charges.",
  },
  {
    question: "How long does laundry service take?",
    answer:
      "Our regular turnaround time is 72 hours. Express 24-hour and super express 12-hour turnaround services are also available across Hyderabad upon request.",
  },
  {
    question: "Do you provide dry cleaning in Hyderabad?",
    answer:
      "Yes, we provide professional solvent dry cleaning for suits, silk sarees, designer lehengas, coats, jackets, and delicate fabrics with fabric-safe eco-friendly solutions.",
  },
  {
    question: "Do you clean shoes and bags?",
    answer:
      "Yes, we provide specialized deep cleaning, deodorizing, conditioning, and polishing for sports sneakers, formal leather footwear, canvas shoes, and luxury bags.",
  },
];

const serviceAreas = [
  "Jubilee Hills",
  "Banjara Hills",
  "Madhapur",
  "Kondapur",
  "Gachibowli",
  "HITEC City",
  "Manikonda",
];

const whyChoosePoints = [
  {
    title: "Hygienic laundry process",
    desc: "100% individual machine washes with sanitized drums between customer orders.",
    icon: ShieldCheck,
  },
  {
    title: "Fabric-safe cleaning",
    desc: "Gentle biodegradable detergents tailored to colors, synthetics, cottons, and woolens.",
    icon: Sparkles,
  },
  {
    title: "Professional garment care",
    desc: "Trained fabric experts inspecting every seam, collar, button, and care label.",
    icon: Layers,
  },
  {
    title: "Convenient pickup and delivery",
    desc: "Flexible doorstep collection and scheduled delivery slots right at your home or apartment.",
    icon: Truck,
  },
  {
    title: "Quality-focused service",
    desc: "Rigorous quality checks with a complimentary re-wash if you are not fully satisfied.",
    icon: HeartHandshake,
  },
  {
    title: "Multiple laundry and cleaning services",
    desc: "Wash & fold, steam ironing, dry cleaning, shoe care, and bag care in one single place.",
    icon: Clock,
  },
];

export function SeoSections({ onBook }: { onBook: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic FAQPage JSON-LD matching visible questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: Laundry Pickup & Delivery in Hyderabad + Why Choose            */}
      {/* ========================================================================= */}
      <section
        id="pickup-delivery"
        className="relative scroll-mt-24 bg-gradient-to-b from-white via-ice-50/50 to-white py-10 sm:py-14 md:py-20"
      >
        <WaterAnimation count={6} className="-z-10 opacity-50" seed={41} />
        <div className="shell px-4 sm:px-8">
          <SectionHeading
            eyebrow="Doorstep Convenience"
            title="Laundry Pickup & Delivery in Hyderabad"
            subtitle="Universal Laundry Services provides convenient laundry pickup and delivery for customers across Hyderabad. We handle everyday laundry, wash & fold, steam ironing, premium garment care, dry cleaning, shoe cleaning and bag cleaning."
          />

          {/* SECTION 2: Why Choose Universal Laundry Services? */}
          <div className="mt-10 sm:mt-14">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-navy-950 text-center">
              Why Choose Universal Laundry Services?
            </h2>
            <p className="mt-2 text-center text-[13px] sm:text-[15px] text-navy-900/65 max-w-2xl mx-auto">
              Reliable fabric care backed by hygiene protocols, transparent pricing, and punctual doorstep service.
            </p>

            <motion.div
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
            >
              {whyChoosePoints.map((point) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    variants={fadeUp}
                    className="card-soft p-4 sm:p-5 flex items-start gap-3.5 hover:border-navy-200 transition-all duration-300"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center border border-ice-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-[14px] sm:text-base font-bold text-navy-950">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-[12px] sm:text-[13px] leading-relaxed text-navy-900/70">
                        {point.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-8 text-center">
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy-600 hover:text-navy-800 transition-colors"
              >
                <span>Explore all laundry &amp; dry cleaning services</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: Laundry Service Areas in Hyderabad                             */}
      {/* ========================================================================= */}
      <section
        id="service-areas"
        className="relative scroll-mt-24 border-t border-ice-200/80 bg-white py-10 sm:py-14 md:py-16"
      >
        <div className="shell px-4 sm:px-8 text-center">
          <span className="eyebrow inline-flex">Coverage in Hyderabad</span>
          <h2 className="mt-3 text-xl xs:text-2xl sm:text-3xl font-bold text-navy-950">
            Laundry Service Areas in Hyderabad
          </h2>
          <p className="mt-2 text-[13px] sm:text-[15px] text-navy-900/65 max-w-xl mx-auto">
            We provide prompt doorstep collection and delivery across these prime Hyderabad localities:
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {serviceAreas.map((area) => (
              <a
                key={area}
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-ice-50/60 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[12px] sm:text-[13.5px] font-semibold text-navy-800 hover:border-navy-300 hover:bg-navy-50 hover:text-navy-950 transition-all duration-200"
                aria-label={`Book laundry service in ${area}, Hyderabad`}
              >
                <MapPin className="h-3.5 w-3.5 text-leaf-600 shrink-0" aria-hidden="true" />
                <span>{area}</span>
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="btn-primary min-h-[42px] px-6 py-2.5 text-xs sm:text-[13px] font-bold"
            >
              Book Pickup in Your Area
            </button>
            <a
              href="#contact"
              className="btn-ghost min-h-[42px] px-5 py-2.5 text-xs sm:text-[13px] font-bold"
            >
              Contact Local Team
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: Frequently Asked Questions                                      */}
      {/* ========================================================================= */}
      <section
        id="faq"
        className="relative scroll-mt-24 border-t border-ice-200/80 bg-gradient-to-b from-white via-ice-50/40 to-white py-10 sm:py-14 md:py-20"
      >
        <div className="shell px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center">
            <span className="eyebrow inline-flex">Clear Answers</span>
            <h2 className="mt-3 text-xl xs:text-2xl sm:text-3xl font-bold text-navy-950">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[13px] sm:text-[15px] text-navy-900/65 max-w-xl mx-auto">
              Everything you need to know about our laundry process, pricing, turnaround, and doorstep pickup.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.question}
                  className="card-soft overflow-hidden border border-ice-200 bg-white transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition-colors hover:bg-ice-50/40"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[13.5px] xs:text-[14.5px] sm:text-base font-bold text-navy-950">
                      {item.question}
                    </span>
                    <span
                      className={`h-7 w-7 rounded-full bg-ice-100 flex items-center justify-center shrink-0 text-navy-700 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-navy-100" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-ice-100">
                          <p className="text-[12.5px] xs:text-[13.5px] sm:text-[14px] leading-relaxed text-navy-900/75 pt-3">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs sm:text-[13.5px] text-navy-900/65">
              Have more questions?{" "}
              <a
                href="#contact"
                className="font-bold text-navy-600 hover:text-navy-800 underline underline-offset-2"
              >
                Contact our Hyderabad customer support team
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
