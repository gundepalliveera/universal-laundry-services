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
    <div className="relative py-1.5 sm:py-3 select-none">
      {/* Segmented connector rail */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 xs:inset-x-8 sm:inset-x-12 top-4 xs:top-4.5 sm:top-7 flex items-center -z-0 pointer-events-none"
      >
        {/* Segment 1 → 2 */}
        <div
          className={cn(
            "h-[2px] sm:h-[2.5px] flex-1 transition-colors duration-300",
            step >= 1 ? "bg-[#16a34a]" : "bg-gray-200",
          )}
        />
        {/* Segment 2 → 3 */}
        <div
          className={cn(
            "h-[2px] sm:h-[2.5px] flex-1 transition-colors duration-300",
            step >= 2 ? "bg-[#16a34a]" : "bg-[#bfdbfe]/80",
          )}
        />
        {/* Segment 3 → 4 */}
        <div
          className={cn(
            "h-[2px] sm:h-[2.5px] flex-1 transition-colors duration-300",
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
              className="flex flex-1 flex-col items-center text-center px-0.5"
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
                    "flex h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[11px] xs:text-[12px] sm:text-[14.5px] font-black transition-all duration-300 shadow-xs",
                    isDone
                      ? "bg-[#16a34a] text-white border-none"
                      : isActive
                      ? "bg-[#1a56db] text-white border-none shadow-[0_4px_14px_-2px_rgba(26,86,219,0.5)] ring-2 ring-[#1a56db]/30"
                      : "border-2 border-[#bfdbfe] bg-white text-[#1a56db]",
                  )}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" aria-hidden="true" />
                  ) : (
                    s.id + 1
                  )}
                </span>

                {/* Step Label */}
                <span
                  className={cn(
                    "mt-1.5 text-[9.5px] xs:text-[10.5px] sm:text-[13px] leading-tight line-clamp-2 sm:line-clamp-none max-w-[66px] xs:max-w-[78px] sm:max-w-none transition-colors",
                    isActive
                      ? "font-extrabold text-[#1a56db]"
                      : isDone
                      ? "font-bold text-[#0c1e40]"
                      : "font-semibold text-[#64748b]",
                  )}
                >
                  {isDone && <span className="text-[#16a34a] mr-0.5 font-black sm:hidden">✓</span>}
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
