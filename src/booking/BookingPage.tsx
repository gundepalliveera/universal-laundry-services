import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Sparkles, Truck, X } from "lucide-react";
import { useBooking } from "@/booking/BookingContext";
import { BookingStepper } from "@/booking/BookingStepper";
import { PickupDetails } from "@/booking/PickupDetails";
import { ServiceSelector } from "@/booking/ServiceSelector";
import { TimeSelector } from "@/booking/TimeSelector";
import { OrderSummary } from "@/booking/OrderSummary";
import { WaterAnimation } from "@/components/WaterAnimation";
import { inr, serviceMap, servicePrices } from "@/data/site";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";

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
    title: "Choose your pickup time",
    sub: "Select a convenient date and time for pickup.",
  },
  {
    title: "Order Summary",
    sub: "Check the details, then confirm your pickup.",
  },
];

export function BookingPage({ onExit }: { onExit: () => void }) {
  const {
    step,
    setStep,
    subtotal,
    discount,
    deliveryFee,
    total,
    cart,
    selectedDuration,
    handleBack: ctxHandleBack,
    navigateToStep,
    reset,
  } = useBooking();
  const [dir, setDir] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ stepNum?: string }>();
  const navigate = useNavigate();

  // Determine target step from URL param (path /book/step-2 or query /book?step=2)
  useEffect(() => {
    const rawStep = params.stepNum || searchParams.get("step");
    if (rawStep) {
      const parsed = parseInt(rawStep, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 4) {
        const target = parsed - 1;
        if (target !== step) {
          setDir(target > step ? 1 : -1);
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
    // Use PUSH navigation so each booking step creates a real browser history entry
    setSearchParams({ step: (next + 1).toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onBackClick = () => {
    if (step === 0) {
      reset();
      onExit();
      return;
    }
    setDir(-1);
    ctxHandleBack();
    const nextStep = step - 1;
    // Pop history entry if available so duplicate history entries are not created
    if (
      window.history.state &&
      typeof window.history.state.idx === "number" &&
      window.history.state.idx > 0
    ) {
      navigate(-1);
    } else {
      setSearchParams({ step: (nextStep + 1).toString() });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onExitClick = () => {
    reset();
    onExit();
  };

  const onStepClick = (targetStep: number) => {
    if (targetStep === step) return;
    if (targetStep < step) {
      setDir(-1);
      navigateToStep(targetStep);
      setSearchParams({ step: (targetStep + 1).toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      go(targetStep);
    }
  };

  const meta = stepMeta[step];

  return (
    <main
      id="booking"
      className="relative overflow-x-clip pt-2 sm:pt-4 md:pt-6 pb-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(90%_60%_at_50%_0%,#eff6ff_0%,#ffffff_65%)]"
      />
      <WaterAnimation count={9} droplets={2} className="-z-10 opacity-70" seed={303} />

      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl px-3 xs:px-4 sm:px-8">
        <div className="relative mb-2.5 sm:mb-4 px-0.5">
          {/* Back button — top-left */}
          <button
            type="button"
            onClick={onBackClick}
            aria-label={step === 0 ? "Exit booking" : `Back to step ${step}`}
            className="inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14.5px] font-bold text-[#1a56db] hover:text-blue-800 transition-colors cursor-pointer mb-1.5"
          >
            <ArrowLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.5]" aria-hidden="true" />
            Back
          </button>

          {/* Close / exit booking — top-right */}
          <button
            type="button"
            onClick={onExitClick}
            aria-label="Close booking and return to home"
            className="absolute top-0 right-0 flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-ice-200 bg-white text-navy-400 shadow-xs transition-all duration-200 hover:border-navy-300 hover:text-navy-800 hover:scale-105 cursor-pointer"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" aria-hidden="true" />
          </button>

          <BookingStepper step={step} onStepClick={onStepClick} />
        </div>

        <div
          className={cn(
            "grid gap-4 sm:gap-6",
            step > 0 && step < 3 ? "lg:grid-cols-[1fr_336px]" : "w-full",
          )}
        >
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: dir * 46, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -36, scale: 0.99 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="rounded-2xl sm:rounded-3xl border border-[#e2e8f0] bg-white p-3.5 xs:p-4.5 sm:p-6 shadow-xs">
                  <header className="mb-3.5 sm:mb-5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-[#16a34a] text-[10.5px] sm:text-xs font-black tracking-wider uppercase">
                      <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" aria-hidden="true" />
                      STEP {step + 1} OF 4
                    </div>
                    <h1 className="mt-1.5 text-xl xs:text-2xl font-black text-[#0c1e40] sm:text-[28px] tracking-tight">
                      {meta.title}
                    </h1>
                    <p className="mt-0.5 sm:mt-1 text-[12.5px] xs:text-[13.5px] sm:text-[14px] text-gray-500 font-medium">
                      {meta.sub}
                    </p>
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

          {/* desktop sidebar summary — hidden on mobile and on Step 1 & Step 4 */}
          <AnimatePresence>
            {step > 0 && step < 3 && (
              <motion.aside
                initial={{ opacity: 0, x: 34 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 34 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block lg:sticky lg:top-28 lg:self-start"
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
                          const itemDuration = l.duration || selectedDuration || "72 Hours";
                          const rate = servicePrices[itemDuration]?.[s.name] ?? s.price;
                          const qty = Number(l.qty) || 0;
                          const lineTotal = qty * rate;
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
                                {inr(lineTotal)}
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
                    {discount > 0 && (
                      <div className="flex justify-between text-leaf-700">
                        <span className="font-medium">10% Discount</span>
                        <span className="font-bold">-{inr(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-navy-900/60">Pickup &amp; Delivery</span>
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
                    <div className="flex items-center justify-between border-t border-dashed border-ice-300 pt-2">
                      <span className="font-display text-[15px] font-bold text-navy-900">
                        TOTAL
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
