import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  PackageCheck,
  Home,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import { WaterAnimation } from "@/components/WaterAnimation";
import { Reveal, SectionHeading, easeOutExpo } from "@/components/ui/Reveal";
import { howItWorks } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  calendar: CalendarCheck,
  package: PackageCheck,
  droplets: Droplets,
  home: Home,
};

function StepCard({
  item,
  i,
}: {
  item: (typeof howItWorks)[number];
  i: number;
}) {
  const Icon = iconMap[item.icon];
  const delay = 0.18 + i * 0.42;
  return (
    <div className="relative flex flex-col items-center text-center md:items-center">
      {/* circle */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay, ease: easeOutExpo }}
        className="relative"
      >
        <motion.span
          initial={{ scale: 0.85, opacity: 0.25 }}
          whileInView={{ scale: [0.85, 1.35, 1], opacity: [0.25, 0.55, 0.25] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, delay, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-navy-200/70"
          aria-hidden="true"
        />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-navy-100 bg-white shadow-[0_18px_36px_-20px_rgba(26,83,224,0.65)] md:h-[88px] md:w-[88px]">
          <motion.span
            initial={{ scale: 0.6, rotate: -12 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: delay + 0.22, ease: easeOutExpo }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-navy-500 to-navy-700 text-white md:h-14 md:w-14"
          >
            <Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
          </motion.span>
        </span>
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.7 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: delay + 0.35 }}
          className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-leaf-500 text-[11px] font-extrabold text-white shadow"
        >
          {i + 1}
        </motion.span>
      </motion.div>

      {/* text */}
      <motion.h3
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: delay + 0.3, ease: easeOutExpo }}
        className="mt-5 text-[17px] font-bold text-navy-950 md:text-lg"
      >
        {item.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: delay + 0.42, ease: easeOutExpo }}
        className="mt-2 max-w-[220px] text-[13.5px] leading-relaxed text-navy-900/60"
      >
        {item.body}
      </motion.p>
    </div>
  );
}

export function HowItWorks({ onBook }: { onBook: () => void }) {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden py-8 sm:py-12 md:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#eff6ff_0%,#ffffff_70%)]"
      />
      <WaterAnimation count={10} className="-z-10 opacity-80" seed={41} />

      <div className="shell">
        {/* Header - on mobile has dotted lines matching screenshot */}
        <div className="text-center">
          {/* Mobile Dotted Title */}
          <div className="flex md:hidden items-center justify-center gap-3">
            <span className="h-[2px] w-10 border-t-2 border-dashed border-navy-300" aria-hidden="true" />
            <h2 className="font-display text-2xl font-extrabold text-navy-950">How It Works</h2>
            <span className="h-[2px] w-10 border-t-2 border-dashed border-navy-300" aria-hidden="true" />
          </div>
          <p className="mt-1 text-[13px] text-navy-900/60 md:hidden">
            Simple steps to get your laundry done
          </p>

          {/* Desktop Heading */}
          <div className="hidden md:block">
            <SectionHeading
              eyebrow="Simple process"
              title="How It"
              highlight="Works"
              subtitle="Four effortless steps between you and a cupboard full of fresh, perfectly folded clothes."
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE HORIZONTAL FLOW (< 768px) - Animated and interactive */}
        {/* ========================================================= */}
        <div className="relative mt-8 sm:mt-10 md:hidden max-w-sm mx-auto px-1 sm:px-2">
          {/* Animated Connecting Line on Mobile */}
          <div
            aria-hidden="true"
            className="absolute top-5 sm:top-6 left-6 right-6 h-[2px] -z-0 bg-[repeating-linear-gradient(90deg,#c7dbfd_0_6px,transparent_6px_12px)]"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-navy-600 via-sky-400 to-leaf-500 shadow-[0_0_8px_rgba(26,83,224,0.6)]"
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-1">
            {/* Step 1: Book */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 15 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.05, ease: easeOutExpo }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-11 w-11 xs:h-12 xs:w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border-2 border-navy-200 bg-white text-navy-600 shadow-[0_8px_16px_-8px_rgba(26,83,224,0.4)]"
                >
                  <CalendarCheck className="h-5 w-5 sm:h-6 sm:w-6 text-navy-600" aria-hidden="true" />
                </motion.span>
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-navy-600 text-[9px] font-extrabold text-white shadow-sm">
                  1
                </span>
              </div>
              <span className="mt-1.5 text-[10.5px] xs:text-[11.5px] font-bold text-navy-950">Book</span>
              <span className="text-[8.5px] text-navy-900/50">Schedule</span>
            </motion.div>

            {/* Moving Arrow 1 */}
            <motion.div
              animate={{ x: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-3.5 sm:mt-4 text-navy-400 shrink-0"
            >
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </motion.div>

            {/* Step 2: Pickup */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 15 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <motion.span
                  animate={{ y: [0, -3, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="flex h-11 w-11 xs:h-12 xs:w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border-2 border-leaf-200 bg-leaf-50/90 text-leaf-600 shadow-[0_8px_16px_-8px_rgba(107,179,63,0.4)]"
                >
                  <PackageCheck className="h-5 w-5 sm:h-6 sm:w-6 text-leaf-600" aria-hidden="true" />
                </motion.span>
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-leaf-600 text-[9px] font-extrabold text-white shadow-sm">
                  2
                </span>
              </div>
              <span className="mt-1.5 text-[10.5px] xs:text-[11.5px] font-bold text-navy-950">Pickup</span>
              <span className="text-[8.5px] text-navy-900/50">At doorstep</span>
            </motion.div>

            {/* Moving Arrow 2 */}
            <motion.div
              animate={{ x: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="mt-3.5 sm:mt-4 text-navy-400 shrink-0"
            >
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </motion.div>

            {/* Step 3: Clean */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 15 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.25, ease: easeOutExpo }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <motion.span
                  animate={{ y: [0, -3, 0], scale: [1, 1.04, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="flex h-11 w-11 xs:h-12 xs:w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border-2 border-navy-200 bg-white text-navy-600 shadow-[0_8px_16px_-8px_rgba(26,83,224,0.4)]"
                >
                  <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-navy-600" aria-hidden="true" />
                </motion.span>
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-navy-600 text-[9px] font-extrabold text-white shadow-sm">
                  3
                </span>
              </div>
              <span className="mt-1.5 text-[10.5px] xs:text-[11.5px] font-bold text-navy-950">Clean</span>
              <span className="text-[8.5px] text-navy-900/50">Hygienic care</span>
            </motion.div>

            {/* Moving Arrow 3 */}
            <motion.div
              animate={{ x: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="mt-3.5 sm:mt-4 text-navy-400 shrink-0"
            >
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </motion.div>

            {/* Step 4: Deliver */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 15 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.35, ease: easeOutExpo }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  className="flex h-11 w-11 xs:h-12 xs:w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border-2 border-leaf-200 bg-leaf-50/90 text-leaf-600 shadow-[0_8px_16px_-8px_rgba(107,179,63,0.4)]"
                >
                  <Home className="h-5 w-5 sm:h-6 sm:w-6 text-leaf-600" aria-hidden="true" />
                </motion.span>
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-leaf-600 text-[9px] font-extrabold text-white shadow-sm">
                  4
                </span>
              </div>
              <span className="mt-1.5 text-[10.5px] xs:text-[11.5px] font-bold text-navy-950">Deliver</span>
              <span className="text-[8.5px] text-navy-900/50">Fresh &amp; crisp</span>
            </motion.div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP / TABLET FLOW (>= 768px) - Original rich design */}
        {/* ========================================================= */}
        <div className="relative mt-14 hidden md:block">
          {/* horizontal dotted connector (desktop / tablet) */}
          <div
            aria-hidden="true"
            className="absolute top-10 right-[12%] left-[12%] md:top-11"
          >
            <div className="h-[3px] w-full rounded-full bg-[repeating-linear-gradient(90deg,#c7dbfd_0_10px,transparent_10px_20px)]" />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.9, ease: "easeInOut", delay: 0.25 }}
              className="absolute top-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-navy-600 via-navy-400 to-leaf-400 shadow-[0_0_12px_rgba(26,83,224,0.45)]"
            />
            <motion.span
              initial={{ left: 0, opacity: 0 }}
              whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.9, ease: "easeInOut", delay: 0.25 }}
              className="absolute -top-[7px] h-[13px] w-[13px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(53,109,235,0.25)]"
            />
          </div>

          <ol className="relative grid gap-4 md:grid-cols-4">
            {howItWorks.map((item, i) => (
              <li key={item.step} className="flex justify-center">
                <div className="w-full">
                  <StepCard item={item} i={i} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.15} className="mt-10 sm:mt-14 flex justify-center">
          <button type="button" onClick={onBook} className="btn-green group w-full sm:w-auto">
            Book an Order
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

