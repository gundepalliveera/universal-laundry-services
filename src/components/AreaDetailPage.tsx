import { motion } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { HowItWorks } from "@/components/HowItWorks";
import { NotFound } from "@/components/NotFound";
import { getAreaBySlug } from "@/data/areas";

export function AreaDetailPage({ onBook }: { onBook: () => void }) {
  const { slug } = useParams();
  const area = slug ? getAreaBySlug(slug) : null;

  useEffect(() => {
    if (area) {
      document.title = `Laundry Service in ${area.name} | Universal Laundry Services`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          `Professional laundry service, dry cleaning, and ironing in ${area.name}, Hyderabad. Free doorstep pickup and delivery. Book today!`,
        );
      }
      window.scrollTo(0, 0);
    }
  }, [area]);

  if (!area) {
    return <NotFound onBook={onBook} />;
  }

  return (
    <main className="pt-[64px] sm:pt-[72px] md:pt-[76px] pb-16">
      {/* Area Hero */}
      <section className="bg-navy-900 py-16 text-center text-white sm:py-24">
        <div className="shell max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-navy-800"
          >
            <MapPin className="h-6 w-6 text-leaf-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl"
          >
            Premium Laundry & Dry Cleaning in {area.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-navy-200"
          >
            Enjoy professional wash & fold, steam ironing, and dry cleaning services right at your doorstep in {area.name}. We collect, clean, and deliver within 72 hours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <button type="button" onClick={onBook} className="btn-primary px-8 py-4 text-base">
              Book Pickup in {area.name}
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Checklist */}
      <section className="shell mt-16 max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-navy-950">Why choose us in {area.name}?</h2>
            <p className="mt-4 text-navy-900/60 leading-relaxed">
              We understand that finding a reliable laundry service in {area.zone} can be a hassle. Universal Laundry Services brings top-tier fabric care directly to you.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Free doorstep pickup and delivery on orders above ₹399",
                "Hygienic, individual wash processes",
                "Eco-friendly dry cleaning solutions",
                "Expert care for premium & designer wear",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                  <span className="text-[15px] font-semibold text-navy-800">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-ice-50 p-8 border border-ice-200">
            <h3 className="text-xl font-bold text-navy-950">Services Available</h3>
            <div className="mt-6 space-y-3">
              {[
                `Wash & Fold in ${area.name}`,
                `Wash & Steam Iron in ${area.name}`,
                `Dry Cleaning in ${area.name}`,
                `Premium Wash in ${area.name}`,
                `Shoe & Bag Cleaning in ${area.name}`,
              ].map((service) => (
                <div key={service} className="rounded-xl bg-white px-4 py-3 shadow-sm text-sm font-bold text-navy-700">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Re-use existing HowItWorks component */}
      <div className="mt-12">
        <HowItWorks onBook={onBook} />
      </div>

      {/* Internal Linking / Nearby Areas */}
      <section className="shell mt-16 border-t border-ice-200 pt-16">
        <h3 className="text-2xl font-bold text-navy-950 text-center">We also serve nearby areas</h3>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {area.nearby.map((nearbyArea) => {
            const slug = nearbyArea.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            return (
              <Link
                key={slug}
                to={`/areas/${slug}`}
                className="rounded-full border border-ice-200 bg-white px-5 py-2.5 text-[14px] font-semibold text-navy-800 transition-all hover:border-navy-300 hover:bg-navy-50 hover:text-navy-950"
              >
                Laundry in {nearbyArea}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
