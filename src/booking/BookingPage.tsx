import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Sparkles, Truck, X } from "lucide-react";
import { useBooking } from "@/booking/BookingContext";
import { BookingStepper } from "@/booking/BookingStepper";
import { PickupDetails } from "@/booking/PickupDetails";
import { ServiceSelector } from "@/booking/ServiceSelector";
import { TimeSelector } from "@/booking/TimeSelector";
import { OrderSummary } from "@/booking/OrderSummary";
import { WaterAnimation } from "@/components/WaterAnimation";
import { inr, serviceMap } from "@/data/site";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

const stepMeta = [
  {
    title: "Tell us where to pick up",
    sub: "We only need the basics to send our pickup executive your way.",
  },
  {
    title: "Select your services",
    sub: "Add quantities and watch your order total update instantly.",
  },
  {
    title: "Choose pickup date & time",
    sub: "Pick a slot that fits your day — we will be there on time.",
  },
  {
    title: "Review your order",
    sub: "Check the details, then confirm your pickup.",
  },
];

export function BookingPage({ onExit }: { onExit: () => void }) {
  const { step, setStep, subtotal, deliveryFee, total, cart } = useBooking();
  const [dir, setDir] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ stepNum?: string }>();

  // Determine target step from URL param (path /book/step-2 or query /book?step=2)
  useEffect(() => {
    const rawStep = params.stepNum || searchParams.get("step");
    if (rawStep) {
      const parsed = parseInt(rawStep, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 4) {
        const target = parsed - 1;
        if (target !== step) {
          setStep(target);
        }
      }
    } else {
      // Sync current step to query params so refresh preserves it
      setSearchParams({ step: (step + 1).toString() }, { replace: true });
    }
  }, [params.stepNum, searchParams, step, setStep, setSearchParams]);

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    setSearchParams({ step: (next + 1).toString() }, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const meta = stepMeta[step];

  return (
    <main
      id="booking"
      className="relative overflow-x-clip pt-3 sm:pt-4 md:pt-6 pb-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(90%_60%_at_50%_0%,#eff6ff_0%,#ffffff_65%)]"
      />
      <WaterAnimation count={9} droplets={2} className="-z-10 opacity-70" seed={303} />

      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card-soft relative overflow-hidden p-4 sm:p-6"
        >
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(108,179,63,0.18),transparent_65%)]"
          />

          {/* Back button — top-left */}
          <button
            type="button"
            onClick={() => (step === 0 ? onExit() : go(step - 1))}
            aria-label={step === 0 ? "Exit booking" : `Back to step ${step}`}
            className="mb-3 sm:mb-4 inline-flex items-center gap-2 text-[13.5px] font-bold text-navy-700 transition-all duration-200 hover:gap-3 hover:text-navy-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          {/* Close / exit booking — top-right corner */}
          <button
            type="button"
            onClick={onExit}
            aria-label="Close booking and return to home"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-9 w-9 items-center justify-center rounded-full border border-ice-200 bg-white text-navy-500 shadow-sm transition-all duration-200 hover:border-navy-300 hover:text-navy-800 hover:scale-105"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <BookingStepper step={step} onStepClick={go} />
        </motion.div>

        <div className="mt-4 sm:mt-6 grid gap-5 sm:gap-6 lg:grid-cols-[1fr_336px]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: dir * 46, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -36, scale: 0.99 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-soft p-5 sm:p-7">
                  <header className="mb-6">
                    <span className="eyebrow">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Step {step + 1} of 4
                    </span>
                    <h1 className="mt-2.5 text-2xl font-extrabold text-navy-950 sm:text-[28px]">
                      {meta.title}
                    </h1>
                    <p className="mt-1.5 text-[14px] text-navy-900/60">{meta.sub}</p>
                  </header>

                  {/* Step 1 */}
                  {step === 0 && <PickupDetails onNext={() => go(1)} />}

                  {/* Step 2 */}
                  {step === 1 && <ServiceSelector onNext={() => go(2)} />}

                  {/* Step 3 */}
                  {step === 2 && <TimeSelector onNext={() => go(3)} />}

                  {/* Step 4 */}
                  {step === 3 && <OrderSummary onEdit={go} />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>


          {/* sticky mini summary — hidden on the final summary step */}
          <AnimatePresence>
            {step < 3 && (
              <motion.aside
                initial={{ opacity: 0, x: 34 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 34 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:sticky lg:top-28 lg:self-start"
                aria-label="Running order summary"
              >
                <div className="card-soft p-6">
                  <h2 className="text-[16px] font-bold text-navy-950">Order Summary</h2>
                  <ul className="mt-4 space-y-3">
                    <AnimatePresence initial={false}>
                      {cart
                        .filter((l) => l.qty > 0)
                        .map((l) => {
                          const s = serviceMap[l.id];
                          return (
                            <motion.li
                              key={l.id}
                              layout
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 12, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center justify-between gap-3 text-[13.5px]"
                            >
                              <span className="truncate text-navy-900/75">
                                {s.name}{" "}
                                <span className="font-semibold text-navy-900/45">
                                  × {l.qty}
                                </span>
                              </span>
                              <span className="font-bold text-navy-900">
                                {inr(s.price * l.qty)}
                              </span>
                            </motion.li>
                          );
                        })}
                    </AnimatePresence>
                    {cart.every((l) => l.qty === 0) && (
                      <li className="rounded-2xl border border-dashed border-ice-300 px-3 py-4 text-center text-[13px] text-navy-900/50">
                        Your bag is empty
                      </li>
                    )}
                  </ul>

                  <div className="mt-5 space-y-2.5 border-t border-dashed border-ice-300 pt-4 text-[13.5px]">
                    <div className="flex justify-between">
                      <span className="text-navy-900/60">Subtotal</span>
                      <span className="font-bold text-navy-900">{inr(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-900/60">Delivery Charges</span>
                      <span
                        className={
                          deliveryFee === 0
                            ? "font-extrabold text-leaf-600"
                            : "font-bold text-navy-900"
                        }
                      >
                        {deliveryFee === 0 ? "FREE" : inr(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-display text-[15px] font-bold text-navy-900">
                        Total Amount
                      </span>
                      <motion.span
                        key={total}
                        initial={{ scale: 0.9, opacity: 0.3 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 420, damping: 22 }}
                        className="font-display text-xl font-extrabold text-navy-700"
                      >
                        {inr(total)}
                      </motion.span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-ice-200 pt-4 text-[12.5px] text-navy-900/60">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
                      100% hygienic process
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
                      Free pickup &amp; delivery
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-leaf-600" aria-hidden="true" />
                      Pay after delivery
                    </li>
                  </ul>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
