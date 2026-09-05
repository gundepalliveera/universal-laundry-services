import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/booking/BookingContext";
import { inr, serviceMap } from "@/data/site";
import { cn } from "@/utils/cn";

export function CompactStickyBottomBar({
  onContinue,
  disabled = false,
  buttonLabel = "Continue",
}: {
  onContinue: () => void;
  disabled?: boolean;
  buttonLabel?: string;
}) {
  const {
    cart,
    selectedDuration,
    subtotal,
    discount,
    deliveryFee,
    total,
    itemCount,
  } = useBooking();

  const [showDetails, setShowDetails] = useState(false);

  // If no items selected, do not show bar
  if (itemCount === 0) return null;

  const selectedLines = cart.filter((l) => (Number(l.qty) || 0) > 0);

  // Summary line: e.g. "2 KG • Wash & Fold"
  const summaryText =
    selectedLines.length > 0
      ? selectedLines
          .map((l) => {
            const s = serviceMap[l.id];
            const unit = s?.unit?.toUpperCase() || "KG";
            return `${l.qty} ${unit} • ${s?.name || "Service"}`;
          })
          .join(", ")
      : "";

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-gray-200/90 bg-white/98 backdrop-blur-xl px-3.5 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] rounded-t-3xl transition-all pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {/* Expandable Order Breakdown */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mb-2.5 pb-2.5 border-b border-gray-100 text-xs space-y-1.5"
          >
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-[#0c1e40]">{inr(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#16a34a] font-bold">
                <span>10% Discount</span>
                <span>-{inr(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Pickup &amp; Delivery</span>
              <span
                className={cn(
                  "font-bold",
                  deliveryFee === 0 ? "text-[#16a34a]" : "text-[#0c1e40]",
                )}
              >
                {deliveryFee === 0 ? "FREE" : inr(deliveryFee)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-2">
        {/* Left Column: Line items, duration, and View Details */}
        <div className="min-w-0 flex-1">
          <p className="text-[13px] xs:text-[13.5px] font-black text-[#0c1e40] truncate leading-tight">
            {summaryText}
          </p>
          <p className="text-[11.5px] text-gray-500 font-medium mt-0.5 leading-none">
            {selectedDuration}
          </p>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#1a56db] hover:text-blue-800 mt-0.5 cursor-pointer"
            aria-expanded={showDetails}
          >
            <span>View Details</span>
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                showDetails && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-gray-200 shrink-0 mx-1.5 xs:mx-2.5" />

        {/* Middle Column: Total label + amount */}
        <div className="shrink-0 text-left">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none">
            Total
          </span>
          <p className="font-display text-[20px] xs:text-[22px] font-black text-[#16a34a] leading-tight mt-0.5">
            {inr(total)}
          </p>
        </div>

        {/* Right Column: Continue CTA Button */}
        <div className="shrink-0 pl-1">
          <button
            type="button"
            onClick={onContinue}
            disabled={disabled}
            className="h-11 px-4 xs:px-5 rounded-2xl bg-[#1a56db] hover:bg-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[13.5px] xs:text-[14px] flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>{buttonLabel}</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
