import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { WaterAnimation } from "@/components/WaterAnimation";
import { Reveal, SectionHeading, fadeUp, staggerParent } from "@/components/ui/Reveal";
import { inr, pricingPlans } from "@/data/site";
import { cn } from "@/utils/cn";
import imgPremiumWash from "@/assets/services/premium-wash.webp";
import imgShoeCleaning from "@/assets/services/shoe-cleaning.webp";
import imgBagCleaning from "@/assets/services/bag-cleaning.webp";
import imgDryCleaning from "@/assets/services/dry-cleaning.webp";
import imgDryCleaningPant from "@/assets/services/dry-cleaning-pant.webp";
import imgDryCleaningWhiteShirt from "@/assets/services/dry-cleaning-white-shirt.webp";

const specialCleaningItems = [
  { name: "Premium Wash", price: "₹80", unit: "per piece", desc: "Gentle piece-by-piece fabric care", image: imgPremiumWash },
  { name: "Shoe Cleaning", price: "Starting ₹149", unit: "per pair", desc: "Deep cleaned & deodorised", image: imgShoeCleaning },
  { name: "Bag Cleaning", price: "Starting ₹149", unit: "per bag", desc: "Hand-finished conditioning & polish", image: imgBagCleaning },
  { name: "Dry Cleaning Shirt", price: "₹120", unit: "per piece", desc: "Solvent care with crisp finish", image: imgDryCleaning },
  { name: "Dry Cleaning Pant", price: "₹120", unit: "per piece", desc: "Crease-resistant gentle press", image: imgDryCleaningPant },
  { name: "Dry Cleaning White Shirt", price: "₹120", unit: "per piece", desc: "Special brighteners & stain treatment", image: imgDryCleaningWhiteShirt },
];

export function Pricing({
  onBook,
  onOpenService,
}: {
  onBook: () => void;
  onOpenService?: (slug: string) => void;
}) {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-ice-50 to-white py-8 sm:py-12 md:py-20"
    >
      <WaterAnimation count={7} className="-z-10 opacity-60" seed={57} />
      <div className="shell px-3 xs:px-4 sm:px-8">
        <SectionHeading
          eyebrow="Transparent rates in Hyderabad"
          title="Simple, Honest Laundry"
          highlight="Pricing"
          subtitle="No hidden charges. Regular 72-hr turnaround, or Express 12/24-hr on request. Free pickup & delivery above ₹399 across Hyderabad."
        />

        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-6 sm:mt-10 md:mt-12 grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-4 md:gap-6"
        >
          {pricingPlans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={cn(
                "relative flex h-full w-full min-w-0 flex-col justify-between rounded-xl xs:rounded-2xl sm:rounded-3xl border p-2 xs:p-2.5 sm:p-5 md:p-7 transition-all duration-300",
                plan.popular
                  ? "border-navy-600 bg-gradient-to-b from-navy-700 to-navy-950 text-white shadow-[0_30px_60px_-30px_rgba(15,43,120,0.85)]"
                  : "card-soft card-hover",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 xs:-top-3 left-1/2 -translate-x-1/2 rounded-full bg-leaf-500 px-1.5 xs:px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[7.5px] xs:text-[9.5px] sm:text-[11px] font-extrabold tracking-wide text-white uppercase shadow-md whitespace-nowrap">
                  <span className="hidden sm:inline">Popular Choice</span>
                  <span className="sm:hidden">Popular</span>
                </span>
              )}
              
              <div>
                <h3
                  className={cn(
                    "text-[10.5px] xs:text-[12.5px] sm:text-base md:text-xl font-bold leading-snug",
                    plan.popular ? "text-white" : "text-navy-950",
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "mt-0.5 xs:mt-1 sm:mt-1.5 text-[8.5px] xs:text-[10px] sm:text-[12.5px] md:text-[14px] leading-tight sm:leading-relaxed line-clamp-2 md:line-clamp-none",
                    plan.popular ? "text-navy-100" : "text-navy-900/65",
                  )}
                >
                  {plan.summary}
                </p>
                <div className="mt-2 xs:mt-3 sm:mt-5 md:mt-6 flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-1">
                  <span
                    className={cn(
                      "font-display text-base xs:text-xl sm:text-2xl md:text-4xl font-extrabold leading-none",
                      plan.popular ? "text-white" : "text-navy-700",
                    )}
                  >
                    {inr(plan.price)}
                  </span>
                  <span
                    className={cn(
                      "text-[7.5px] xs:text-[9.5px] sm:text-xs md:text-[13px] font-semibold leading-tight",
                      plan.popular ? "text-navy-100" : "text-navy-900/50",
                    )}
                  >
                    {plan.unit}
                  </span>
                </div>

                <ul className="mt-2 xs:mt-3 sm:mt-5 md:mt-6 space-y-1 xs:space-y-1.5 sm:space-y-2.5 md:space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-1 xs:gap-1.5 sm:gap-2 text-[8px] xs:text-[9.5px] sm:text-[12.5px] md:text-[14px] leading-tight sm:leading-normal">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4.5 sm:w-4.5 shrink-0 items-center justify-center rounded-full",
                          plan.popular
                            ? "bg-leaf-500/25 text-leaf-300"
                            : "bg-leaf-50 text-leaf-600",
                        )}
                      >
                        <Check className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3.5 sm:w-3.5 stroke-[2.5]" aria-hidden="true" />
                      </span>
                      <span className={plan.popular ? "text-navy-100" : "text-navy-900/75"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={onBook}
                className={cn(
                  "group mt-3 xs:mt-4 sm:mt-6 md:mt-7 w-full min-h-[32px] xs:min-h-[36px] sm:min-h-[44px] py-1.5 xs:py-2 sm:py-3 px-1 xs:px-2.5 sm:px-4 text-[9.5px] xs:text-[11px] sm:text-sm md:text-[15px] font-bold rounded-full transition-all inline-flex items-center justify-center gap-1 active:scale-95 leading-none text-center",
                  plan.popular ? "btn-green shadow-md" : "btn-ghost border border-ice-300",
                )}
              >
                <span className="whitespace-nowrap leading-none text-center">Select</span>
                <ArrowRight
                  className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </motion.article>
          ))}
        </motion.div>

        {/* Special Services & Rate Breakdown */}
        <Reveal delay={0.15} className="mt-10 sm:mt-14">
          <div className="card-soft overflow-hidden p-2.5 xs:p-3 sm:p-6 md:p-8">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left justify-between gap-3 sm:gap-4 border-b border-ice-200 pb-4 sm:pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="text-[10px] xs:text-[11.5px] font-bold tracking-wider text-leaf-700 uppercase">
                  Complete Rate Card · Hyderabad
                </span>
                <h3 className="text-lg xs:text-xl font-bold text-navy-950 sm:text-2xl mt-0.5">
                  Special &amp; Dry Cleaning Services
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-leaf-50 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-leaf-700">
                <span>Free Pickup &amp; Delivery above ₹399</span>
              </div>
            </div>

            <motion.div
              variants={staggerParent(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-3 gap-2.5 xs:gap-3.5 sm:gap-4 md:gap-5 lg:gap-6"
            >
              {specialCleaningItems.map((item) => {
                const itemSlugMap: Record<string, string> = {
                  "Premium Wash": "premium-wash",
                  "Shoe Cleaning": "shoe-cleaning",
                  "Bag Cleaning": "bag-cleaning",
                  "Dry Cleaning Shirt": "dry-cleaning",
                  "Dry Cleaning Pant": "dry-cleaning",
                  "Dry Cleaning White Shirt": "dry-cleaning",
                };
                const slug = itemSlugMap[item.name] || "dry-cleaning";

                return (
                  <motion.article
                    key={item.name}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    onClick={() => onOpenService?.(slug)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ice-200 bg-white shadow-sm transition-all duration-300 hover:border-navy-200 hover:shadow-[0_18px_40px_-16px_rgba(15,43,120,0.18)] cursor-pointer"
                  >
                    {/* Photo Banner */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/10] md:h-44 w-full overflow-hidden bg-navy-50 shrink-0">
                      <img
                        src={item.image}
                        alt={
                          item.name === "Premium Wash"
                            ? "Premium garment washing service"
                            : item.name === "Shoe Cleaning"
                              ? "Shoe cleaning service"
                              : item.name === "Bag Cleaning"
                                ? "Bag cleaning service"
                                : "Dry cleaning service in Hyderabad"
                        }
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"
                      />
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-1 flex-col justify-between p-2.5 xs:p-3 sm:p-4 md:p-5">
                      <div>
                        <h4 className="text-[13px] xs:text-[14px] sm:text-base md:text-lg font-bold text-navy-950 leading-snug line-clamp-1 sm:line-clamp-none">
                          {item.name}
                        </h4>
                        <p className="mt-1 text-[11px] xs:text-[11.5px] sm:text-[12.5px] md:text-[13.5px] leading-tight sm:leading-relaxed text-navy-900/65 line-clamp-2">
                          {item.desc}
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
                            {item.price}
                            <span className="ml-0.5 text-[9.5px] xs:text-[10.5px] sm:text-xs font-semibold text-navy-900/50">
                              /{item.unit.replace(/^per\s*/i, "")}
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onBook()}
                          className="inline-flex min-h-[34px] xs:min-h-[36px] sm:min-h-[38px] w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-navy-600 hover:bg-navy-700 active:scale-95 text-white px-3 sm:px-4 py-1.5 text-[11px] xs:text-[11.5px] sm:text-xs font-bold leading-none transition-all duration-200 shadow-xs whitespace-nowrap shrink-0 text-center"
                          aria-label={`Book ${item.name} in Hyderabad`}
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
              })}
            </motion.div>

            <div className="mt-5 sm:mt-6 rounded-2xl border border-ice-200 bg-ice-50/60 p-3.5 sm:p-4 text-center sm:flex sm:items-center sm:justify-between sm:text-left gap-3">
              <p className="text-[12.5px] xs:text-[13.5px] font-medium text-navy-900/75">
                ✨ <strong className="text-navy-900">All Dry Cleaning Services Available in Hyderabad:</strong> Suits, sarees, lehengas, blankets, curtains &amp; designer wear.
              </p>
              <button
                type="button"
                onClick={onBook}
                className="btn-primary inline-flex items-center justify-center gap-1.5 min-h-[42px] w-full sm:w-auto mt-3 sm:mt-0 text-xs sm:text-[13px] px-5 py-2.5 whitespace-nowrap shrink-0 text-center font-bold leading-none"
              >
                <span className="whitespace-nowrap leading-none">Book Now</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 text-center text-[13.5px] text-navy-900/60">
          All prices are inclusive of taxes · Detergent &amp; packaging included ·
          Free re-wash if unsatisfied · Express services (12hr/24hr) available across Hyderabad upon request
        </Reveal>
      </div>
    </section>
  );
}
