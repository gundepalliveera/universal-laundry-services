import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

const bookingSteps = [
  { id: 0, label: "Pickup Details", hint: "Where should we come?" },
  { id: 1, label: "Select Services", hint: "What do you need?" },
  { id: 2, label: "Choose Time", hint: "When works best?" },
  { id: 3, label: "Order Summary", hint: "Review & confirm" },
];

export function BookingStepper({
  step,
  onStepClick,
}: {
  step: number;
  onStepClick: (s: number) => void;
}) {
  const progress = (step / (bookingSteps.length - 1)) * 100;

  return (
    <div className="relative">
      {/* progress rail */}
      <div aria-hidden="true" className="absolute inset-x-0 top-5 sm:top-6">
        <div className="mx-auto h-[3px] w-[80%] rounded-full bg-ice-200" />
        <motion.div
          className="mx-auto h-[3px] w-[80%] origin-left rounded-full bg-gradient-to-r from-navy-600 to-leaf-400"
          initial={false}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: -3 }}
        />
      </div>

      <ol className="relative flex items-start justify-between gap-1 sm:gap-2">
        {bookingSteps.map((s) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <li key={s.id} className="flex flex-1 flex-col items-center text-center">
              <button
                type="button"
                disabled={s.id > step}
                onClick={() => onStepClick(s.id)}
                aria-current={active ? "step" : undefined}
                aria-label={`Step ${s.id + 1}: ${s.label}`}
                className="group relative flex flex-col items-center focus:outline-none"
              >
                <motion.span
                  animate={
                    active ? { scale: [1, 1.08, 1] } : { scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 text-[13px] sm:text-[15px] font-extrabold transition-all duration-400",
                    done && "border-leaf-500 bg-leaf-500 text-white",
                    active &&
                      "border-navy-600 bg-navy-600 text-white shadow-[0_14px_28px_-14px_rgba(26,83,224,0.9)]",
                    !done && !active && "border-ice-300 bg-white text-navy-300",
                  )}
                >
                  {done ? <Check className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> : s.id + 1}
                </motion.span>
                <span
                  className={cn(
                    "mt-2 sm:mt-3 text-[11px] sm:text-[14px] font-bold transition-colors leading-tight line-clamp-2",
                    active || done ? "text-navy-900" : "text-navy-900/45",
                  )}
                >
                  {s.label}
                </span>
                <span className="mt-0.5 hidden text-[11.5px] text-navy-900/45 md:block">
                  {s.hint}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
