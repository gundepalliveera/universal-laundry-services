import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WaterAnimation } from "@/components/WaterAnimation";
import {
  SectionHeading,
  fadeUp,
  staggerParent,
} from "@/components/ui/Reveal";
import { inr, services, type Service } from "@/data/site";
import imgWashFold from "@/assets/services/wash-fold.webp";
import imgWashSteamIron from "@/assets/services/wash-steam-iron.webp";
import imgPremiumWash from "@/assets/services/premium-wash.webp";
import imgShoeCleaning from "@/assets/services/shoe-cleaning.webp";
import imgBagCleaning from "@/assets/services/bag-cleaning.webp";
import imgDryCleaning from "@/assets/services/dry-cleaning.webp";

const serviceImageMap: Record<string, string> = {
  "wash-fold": imgWashFold,
  "wash-steam-iron": imgWashSteamIron,
  "premium-wash": imgPremiumWash,
  "shoe-cleaning": imgShoeCleaning,
  "bag-cleaning": imgBagCleaning,
  "dry-cleaning": imgDryCleaning,
};

function ServiceCard({
  service,
  index,
  onSelect,
  onOpenDetails,
}: {
  service: Service;
  index: number;
  onSelect?: (id: Service["id"]) => void;
  onOpenDetails?: (slug: string) => void;
}) {
  const bgImage = serviceImageMap[service.id];

  const serviceSlugMap: Record<string, string> = {
    "wash-fold": "wash-and-fold",
    "wash-steam-iron": "steam-ironing",
    "premium-wash": "premium-wash",
    "shoe-cleaning": "shoe-cleaning",
    "bag-cleaning": "bag-cleaning",
    "dry-cleaning": "dry-cleaning",
  };

  const slug = serviceSlugMap[service.id] || service.id;

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full w-full min-w-0 flex-col justify-between overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl border border-ice-200 bg-white shadow-[0_6px_18px_-12px_rgba(15,43,120,0.12)] hover:shadow-[0_20px_40px_-16px_rgba(15,43,120,0.22)] hover:border-navy-200 transition-all duration-300 cursor-pointer"
      onClick={() => onOpenDetails?.(slug)}
    >
      {/* Top Dedicated Photo Banner */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] md:h-44 w-full overflow-hidden bg-navy-50 shrink-0">
        {bgImage && (
          <img
            src={bgImage}
            alt={
              service.id === "wash-fold"
                ? "Wash and fold laundry service in Hyderabad"
                : service.id === "wash-steam-iron"
                  ? "Wash and steam ironing service"
                  : service.id === "premium-wash"
                    ? "Premium garment washing service"
                    : service.id === "shoe-cleaning"
                      ? "Shoe cleaning service"
                      : service.id === "bag-cleaning"
                        ? "Bag cleaning service"
                        : "Dry cleaning service in Hyderabad"
            }
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-2.5 xs:p-3 sm:p-4 md:p-5">
        <div>
          <h3 className="text-[13px] xs:text-[14px] sm:text-base md:text-lg font-bold text-navy-950 leading-snug line-clamp-1 sm:line-clamp-none">
            {service.name}
          </h3>
          <p className="mt-1 text-[11px] xs:text-[11.5px] sm:text-[12.5px] md:text-[13.5px] leading-tight sm:leading-relaxed text-navy-900/65 line-clamp-2">
            {service.tagline}
          </p>
        </div>

        <div
          className="mt-2.5 xs:mt-3 sm:mt-4 border-t border-ice-100 pt-2 sm:pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <p className="text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-bold tracking-wide text-navy-900/50 uppercase">
              Starting at
            </p>
            <p className="font-display text-[13px] xs:text-[14.5px] sm:text-base md:text-lg font-extrabold text-navy-700 leading-none mt-0.5">
              {service.priceLabel ?? (
                <>
                  {inr(service.price)}
                  <span className="ml-0.5 text-[9.5px] xs:text-[10.5px] sm:text-xs font-semibold text-navy-900/50">
                    /{service.unit}
                  </span>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelect?.(service.id)}
            className="inline-flex min-h-[34px] xs:min-h-[36px] sm:min-h-[38px] w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-navy-600 hover:bg-navy-700 active:scale-95 text-white px-3 sm:px-4 py-1.5 text-[11px] xs:text-[11.5px] sm:text-xs font-bold leading-none transition-all duration-200 shadow-xs whitespace-nowrap shrink-0 text-center"
            aria-label={`Book ${service.name} in Hyderabad`}
          >
            <span className="whitespace-nowrap leading-none text-center">Book Now</span>
            <ArrowRight
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Services({
  onBook,
  onOpenService,
}: {
  onBook: () => void;
  onOpenService?: (slug: string) => void;
}) {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-ice-50 to-white py-8 sm:py-12 md:py-20"
    >
      <WaterAnimation count={8} className="-z-10 opacity-70" seed={23} />
      <div className="shell px-3 xs:px-4 sm:px-8">
        <SectionHeading
          eyebrow="What we do in Hyderabad"
          title="Our Laundry Services"
          subtitle="Six specialised laundry services in Hyderabad handled with fabric-safe detergents and trained fabric care experts."
        />

        <motion.div
          variants={staggerParent(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-6 sm:mt-10 md:mt-12 grid grid-cols-2 lg:grid-cols-3 gap-2.5 xs:gap-3.5 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              onSelect={() => onBook()}
              onOpenDetails={onOpenService}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
