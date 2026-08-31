import { motion } from "framer-motion";
import { Award, Leaf, Recycle, ShieldCheck } from "lucide-react";
import { WaterAnimation } from "@/components/WaterAnimation";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal, fadeUp, staggerParent } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Hygiene first, always",
    body: "Every order is washed in segregated loads, and machines are sanitised between customers.",
  },
  {
    icon: Award,
    title: "Trained fabric experts",
    body: "A team of 40+ laundry professionals trained on 60+ fabric types and care labels.",
  },
  {
    icon: Recycle,
    title: "Eco-conscious cleaning",
    body: "Biodegradable detergents and water-recycling systems across all our units.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden py-8 sm:py-12 md:py-20"
    >
      <WaterAnimation count={8} className="-z-10 opacity-60" seed={73} />
      <div className="shell grid items-center gap-8 sm:gap-12 lg:gap-14 lg:grid-cols-2">
        <div>
          <div className="text-center lg:text-left">
            <span className="eyebrow inline-flex">About us</span>
            <h2 className="mt-3 font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold text-navy-950 leading-tight">
              A neighbourhood laundry with{" "}
              <span className="text-navy-600">professional standards</span>
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-base leading-relaxed text-navy-900/70">
              Universal Laundry Services is located at Jubilee Hills Road No 5, Hyderabad. We run state-of-the-art processing units and serve neighbourhoods across Hyderabad with the same promise — fresh clothes, happy life.
            </p>
          </div>

          {/* 3 Pillars in a responsive 3-column row on mobile/tablet, stack on desktop left */}
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 sm:mt-8 grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-3 lg:grid-cols-1 lg:gap-4"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="card-soft card-hover flex flex-col lg:flex-row items-center lg:items-start gap-1.5 xs:gap-2 lg:gap-4 p-2.5 xs:p-3 sm:p-4 lg:p-5 text-center lg:text-left justify-start"
              >
                <span className="inline-flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-xl lg:rounded-2xl border border-ice-200 bg-ice-50 text-navy-600 shadow-sm">
                  <p.icon className="h-4 w-4 xs:h-4.5 xs:w-4.5 lg:h-5 lg:w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[10px] xs:text-[11.5px] sm:text-[13.5px] lg:text-[15.5px] font-bold text-navy-950 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[8.5px] xs:text-[10px] sm:text-[12px] lg:text-[13.5px] leading-tight sm:leading-relaxed text-navy-900/60 line-clamp-2 lg:line-clamp-none">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Reveal delay={0.12} y={36}>
          <div className="relative mt-4 lg:mt-0">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] border border-navy-600/80 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-5 xs:p-6 sm:p-8 text-white shadow-[0_30px_70px_-30px_rgba(15,43,120,0.85)]">
              {/* Soft radial glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-sky-500/20 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-leaf-500/20 blur-2xl"
              />
              <WaterAnimation count={9} droplets={2} seed={99} className="opacity-40" />

              <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-5 py-2 sm:py-4 text-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LogoMark className="h-24 w-24 xs:h-28 xs:w-28 sm:h-36 sm:w-36 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl xs:text-2xl font-extrabold tracking-[0.06em] text-white">
                    UNIVERSAL
                  </h3>
                  <p className="font-display text-[9.5px] xs:text-[11px] font-bold tracking-[0.2em] text-sky-300">
                    LAUNDRY SERVICES
                  </p>
                  <p className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-leaf-400/40 bg-leaf-500/20 px-3 sm:px-4 py-1 sm:py-1.5 text-[10.5px] sm:text-[12px] font-bold text-leaf-300 backdrop-blur-sm">
                    <Leaf className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    Fresh Clothes, Happy Life
                  </p>
                </div>
                <p className="max-w-xs text-[12px] sm:text-[13.5px] leading-relaxed text-navy-100/75">
                  Serving Hyderabad families, working professionals, hostels, salons
                  and boutique hotels across Jubilee Hills &amp; beyond.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
