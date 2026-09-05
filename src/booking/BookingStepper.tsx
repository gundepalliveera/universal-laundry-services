import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

const bookingSteps = [
  { id: 0, label: "Pickup Details" },
  { id: 1, label: "Select Services" },
  { id: 2, label: "Choose Time" },
  { id: 3, label: "Order Summary" },
];

export function BookingStepper({
  step,
  onStepClick,
}: {
  step: number;
  onStepClick: (s: number) => void;
}) {
  return (
    <div className="relative py-2 sm:py-3">
      {/* Segmented connector rail matching screenshot */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 sm:inset-x-12 top-6 sm:top-7 flex items-center -z-0 pointer-events-none"
      >
        {/* Segment 1 → 2 */}
        <div
          className={cn(
            "h-[2.5px] flex-1 transition-colors duration-300",
            step >= 1 ? "bg-[#16a34a]" : "bg-gray-200",
          )}
        />
        {/* Segment 2 → 3 */}
        <div
          className={cn(
            "h-[2.5px] flex-1 transition-colors duration-300",
            step >= 2 ? "bg-[#16a34a]" : "bg-[#bfdbfe]/80",
          )}
        />
        {/* Segment 3 → 4 */}
        <div
          className={cn(
            "h-[2.5px] flex-1 transition-colors duration-300",
            step >= 3 ? "bg-[#16a34a]" : "bg-[#bfdbfe]/80",
          )}
        />
      </div>

      <ol className="relative z-10 flex items-start justify-between">
        {bookingSteps.map((s) => {
          const isDone = step > s.id;
          const isActive = step === s.id;

          return (
            <li
              key={s.id}
              className="flex flex-1 flex-col items-center text-center"
            >
              <button
                type="button"
                disabled={s.id > step}
                onClick={() => onStepClick(s.id)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${s.id + 1}: ${s.label}`}
                className="group flex flex-col items-center focus:outline-none cursor-pointer disabled:cursor-default"
              >
                {/* Step Circle */}
                <span
                  className={cn(
                    "flex h-8.5 w-8.5 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[13px] sm:text-[14.5px] font-black transition-all duration-300 shadow-xs",
                    isDone
                      ? "bg-[#16a34a] text-white border-none"
                      : isActive
                      ? "bg-[#1a56db] text-white border-none shadow-[0_4px_14px_-2px_rgba(26,86,219,0.5)]"
                      : "border-2 border-[#bfdbfe] bg-white text-[#1a56db]",
                  )}
                >
                  {isDone ? (
                    <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                  ) : (
                    s.id + 1
                  )}
                </span>

                {/* Step Label */}
                <span
                  className={cn(
                    "mt-2 text-[11px] sm:text-[13px] leading-tight line-clamp-1 sm:line-clamp-none max-w-[76px] xs:max-w-[85px] sm:max-w-none transition-colors",
                    isActive
                      ? "font-extrabold text-[#1a56db]"
                      : isDone
                      ? "font-bold text-[#0c1e40]"
                      : "font-semibold text-[#64748b]",
                  )}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
