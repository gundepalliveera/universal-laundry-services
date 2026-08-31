import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Leaf, ShoppingBag } from "lucide-react";
import { useRef } from "react";
import { FeatureCard } from "@/components/FeatureCard";
import { WaterAnimation, WaterSplash } from "@/components/WaterAnimation";
import { fadeUp, staggerParent, easeOutExpo } from "@/components/ui/Reveal";
import { featureCards } from "@/data/site";
import heroArt from "@/assets/hero-laundry.webp";
import heroArtTransparent from "@/assets/hero-laundry-transparent.webp";

const words = [
  { text: "Fresh", blue: false },
  { text: "Clothes,", blue: false },
  { text: "Happy", blue: true },
  { text: "Life.", blue: true },
];

const trustPoints = [
  "25,000+ orders delivered",
  "Same-day slots available",
  "Free re-wash guarantee",
];

export function Hero({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden pt-[62px] pb-8 sm:pt-[84px] sm:pb-12 md:pt-10 md:pb-20 lg:pt-6"
    >
      {/* soft blue gradient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_78%_8%,#eaf2ff_0%,#f7fbff_42%,#ffffff_72%)]"
      />
      <motion.div
        aria-hidden="true"
        style={{ opacity: glow }}
        className="absolute -top-24 -right-24 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(53,109,235,0.18),transparent_65%)] blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ opacity: glow }}
        className="absolute -bottom-32 -left-24 -z-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(108,179,63,0.16),transparent_65%)] blur-2xl"
      />
      <WaterAnimation count={12} droplets={3} className="-z-10" seed={11} />

      <div className="shell">
        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (>= 1024px) - Preserved 100% exact original desktop design */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
          {/* Desktop Left Column */}
          <motion.div style={{ y: textY }} className="relative">
            <motion.div variants={staggerParent(0.1)} initial="hidden" animate="show">
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-leaf-50/90 px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-leaf-700 uppercase shadow-[0_8px_20px_-14px_rgba(107,179,63,0.9)]"
              >
                <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                Fresh Clothes, Happy Life
              </motion.span>

              <h1 className="mt-5 font-display text-[64px] leading-[1.05] font-extrabold tracking-tight text-navy-950">
                {words.map((w, i) => (
                  <motion.span
                    key={w.text}
                    initial={{ opacity: 0, y: 30, rotateX: -35 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.18 + i * 0.11,
                      ease: easeOutExpo,
                    }}
                    className={
                      "mr-[0.28em] inline-block " + (w.blue ? "text-navy-600" : "")
                    }
                  >
                    {w.text}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-[17px] leading-relaxed text-navy-900/70"
              >
                Professional laundry care in Hyderabad, picked up and delivered to your doorstep.
                Wash &amp; fold, steam ironing, dry cleaning and more — handled by trained
                fabric experts across Jubilee Hills, Banjara Hills, Madhapur, and your city.
              </motion.p>

              <motion.div
                variants={staggerParent(0.09, 0.1)}
                className="mt-8 grid grid-cols-3 gap-3"
              >
                {featureCards.map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={onBook} className="btn-primary group">
                  Book an Order
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </button>
                <a href="#services" className="btn-ghost group">
                  Explore Services
                  <ArrowRight
                    className="h-4 w-4 text-navy-500 transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </a>
              </motion.div>

              <motion.ul
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-navy-900/60"
              >
                {trustPoints.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
                    {t}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* Desktop Right Column */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="relative aspect-[4/3.4] w-full">
              <WaterSplash className="inset-0 h-full w-full" />

              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[6%] overflow-hidden rounded-[42%_58%_46%_54%/54%_44%_56%_46%] border border-ice-200 bg-gradient-to-br from-ice-100 via-white to-navy-50 shadow-[0_40px_80px_-40px_rgba(15,43,120,0.45)]"
              >
                <img
                  src={heroArt}
                  alt="Laundry basket filled with freshly folded white and blue clothes beside a detergent bottle"
                  className="h-full w-full object-cover mix-blend-multiply"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </motion.div>

              {/* floating stat cards */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-8 rounded-2xl border border-ice-200 bg-white/95 px-3.5 py-2.5 shadow-[0_18px_40px_-24px_rgba(15,43,120,0.5)] backdrop-blur"
              >
                <p className="flex items-center gap-1.5 text-[13px] font-bold text-navy-900">
                  <Clock className="h-4 w-4 text-navy-600" aria-hidden="true" />
                  Express Fast 12 Hr
                </p>
                <p className="text-[11px] text-navy-900/55">24 &amp; 72 hr available</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute right-2 bottom-10 rounded-2xl border border-ice-200 bg-white/95 px-3.5 py-2.5 shadow-[0_18px_40px_-24px_rgba(15,43,120,0.5)] backdrop-blur"
              >
                <p className="text-[13px] font-bold text-leaf-700">Free Pickup</p>
                <p className="text-[11px] text-navy-900/55">In as little as 60 mins</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2 left-6 rounded-2xl border border-ice-200 bg-white/95 px-3.5 py-2.5 shadow-[0_18px_40px_-24px_rgba(15,43,120,0.5)] backdrop-blur"
              >
                <p className="text-[13px] font-bold text-navy-900">Regular 72 Hr</p>
                <p className="text-[11px] text-navy-900/55">Express 12 &amp; 24 hr</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET LAYOUT (< 1024px) - Animated and matches screenshot */}
        {/* ========================================================================= */}
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          animate="show"
          className="block lg:hidden space-y-5 sm:space-y-6"
        >
          {/* Top Leaf Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50/95 px-3 py-1.5 text-[10px] sm:text-[10.5px] font-bold tracking-[0.14em] text-leaf-700 uppercase shadow-sm">
              <Leaf className="h-3 w-3 text-leaf-600" aria-hidden="true" />
              FRESH CLOTHES, HAPPY LIFE
            </span>
          </motion.div>

          {/* Upper Hero Grid: Left text + Right Animated Laundry basket art */}
          <div className="grid grid-cols-[1.1fr_0.9fr] sm:grid-cols-[1.15fr_0.85fr] items-center gap-1 sm:gap-4">
            {/* Left text column */}
            <motion.div variants={fadeUp} className="space-y-2.5 sm:space-y-3">
              <h1 className="font-display text-[26px] xs:text-[30px] sm:text-[38px] leading-[1.08] font-extrabold tracking-tight text-navy-950">
                <span className="block text-navy-950">Fresh Clothes,</span>
                <span className="block text-navy-600">Happy Life.</span>
              </h1>

              <p className="text-[12px] sm:text-[14px] leading-relaxed text-navy-900/75">
                Professional laundry care, picked up and delivered to your doorstep.
                Wash, fold, dry cleaning, ironing and more — handled by trained
                fabric experts across your city.
              </p>

              {/* Animated Floating Express Fast 12 Hr Card */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex flex-col rounded-2xl border border-ice-200 bg-white/95 px-3 py-1.5 shadow-[0_4px_16px_-6px_rgba(15,43,120,0.15)] backdrop-blur"
              >
                <p className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] font-bold text-navy-900">
                  <Clock className="h-3.5 w-3.5 text-navy-600" aria-hidden="true" />
                  Express Fast 12 Hr
                </p>
                <p className="text-[9.5px] sm:text-[10px] text-navy-900/55 pl-5">24 &amp; 72 hr options</p>
              </motion.div>
            </motion.div>

            {/* Right animated laundry basket image with floating transparent cutout on mobile */}
            <motion.div
              variants={fadeUp}
              className="relative flex items-center justify-end -mr-1"
            >
              {/* Floating container for the basket artwork */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex items-center justify-end"
              >
                <img
                  src={heroArtTransparent}
                  alt="Universal Laundry basket filled with clean clothes and detergent"
                  className="w-[46vw] max-w-[210px] h-auto object-contain bg-transparent"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* 3 Benefit Cards Row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1"
          >
            {featureCards.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </motion.div>

          {/* Full-width Stacked CTA Buttons with tap animations & minimum 48px touch targets */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2.5 pt-1">
            <motion.button
              type="button"
              onClick={onBook}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full min-h-[48px] py-3.5 text-[14.5px] font-bold shadow-[0_12px_24px_-10px_rgba(26,83,224,0.7)]"
            >
              Book an Order
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>

            <motion.a
              href="#services"
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-navy-600 bg-white py-3 text-[14.5px] font-bold text-navy-600 transition-all hover:bg-navy-50 active:scale-[0.99]"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 text-navy-600" aria-hidden="true" />
            </motion.a>
          </motion.div>

          {/* Delivery & Pickup Info Card with responsive stats */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between rounded-2xl border border-ice-200 bg-ice-50/80 p-3 sm:p-4 shadow-sm"
          >
            {/* 12, 24 & 72 Hr Delivery */}
            <div className="flex flex-1 items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-8 w-8 xs:h-9 xs:w-9 shrink-0 items-center justify-center rounded-full bg-navy-600 text-white shadow-sm"
              >
                <Clock className="h-4 w-4" aria-hidden="true" />
              </motion.span>
              <div className="min-w-0">
                <p className="text-[11.5px] xs:text-[12px] sm:text-[13px] font-bold text-navy-950 truncate xs:whitespace-normal">12, 24 &amp; 72 Hr</p>
                <p className="text-[9.5px] xs:text-[10px] sm:text-[11px] text-navy-900/60 truncate xs:whitespace-normal">Regular &amp; Express</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="h-8 w-[1px] bg-ice-200 mx-1.5 xs:mx-2 shrink-0" aria-hidden="true" />

            {/* Free Pickup */}
            <div className="flex flex-1 items-center gap-2">
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-8 w-8 xs:h-9 xs:w-9 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-white shadow-sm"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              </motion.span>
              <div className="min-w-0">
                <p className="text-[11.5px] xs:text-[12px] sm:text-[13px] font-bold text-leaf-700 truncate xs:whitespace-normal">Free Pickup</p>
                <p className="text-[9.5px] xs:text-[10px] sm:text-[11px] text-navy-900/60 truncate xs:whitespace-normal">In as little as 60 mins</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
