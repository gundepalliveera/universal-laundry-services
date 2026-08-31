import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { groupedAreas } from "@/data/areas";

export function AreaDirectory() {
  return (
    <main className="pt-[64px] sm:pt-[72px] md:pt-[76px] pb-16">
      <section className="bg-navy-900 py-16 text-center text-white sm:py-24">
        <div className="shell max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-extrabold sm:text-5xl"
          >
            Service Areas in Hyderabad
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-navy-200"
          >
            Universal Laundry Services offers premium wash & fold, dry cleaning, and ironing across all major localities in Hyderabad.
          </motion.p>
        </div>
      </section>

      <section className="shell mt-12 sm:mt-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {groupedAreas.map((group, i) => (
            <motion.div
              key={group.zone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-soft rounded-3xl border p-6 sm:p-8"
            >
              <h2 className="flex items-center gap-2 text-xl font-bold text-navy-950">
                <MapPin className="h-5 w-5 text-leaf-600" aria-hidden="true" />
                {group.zone}
              </h2>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {group.areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      to={`/areas/${area.slug}`}
                      className="group flex items-center justify-between rounded-xl p-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-ice-100 hover:text-navy-950"
                    >
                      {area.name}
                      <ArrowRight className="h-4 w-4 -translate-x-2 text-transparent transition-all duration-300 group-hover:translate-x-0 group-hover:text-navy-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
