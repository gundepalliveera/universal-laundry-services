import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Info,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useBooking } from "@/booking/BookingContext";
import { getPickupDays, timeSlots } from "@/data/site";
import { cn } from "@/utils/cn";

const slotMetadata: Record<
  string,
  { period: string; badge: string; badgeColor: string; activeBadgeColor: string }
> = {
  "09:00 AM - 11:00 AM": {
    period: "Morning",
    badge: "High Demand",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    activeBadgeColor: "bg-amber-100/90 text-amber-900 border-amber-300",
  },
  "10:00 AM - 12:00 PM": {
    period: "Morning",
    badge: "Popular Slot",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    activeBadgeColor: "bg-purple-100/90 text-purple-900 border-purple-300",
  },
  "12:00 PM - 02:00 PM": {
    period: "Afternoon",
    badge: "Available",
    badgeColor: "bg-leaf-50 text-leaf-700 border-leaf-200",
    activeBadgeColor: "bg-leaf-100/90 text-leaf-900 border-leaf-300",
  },
  "02:00 PM - 04:00 PM": {
    period: "Afternoon",
    badge: "Available",
    badgeColor: "bg-leaf-50 text-leaf-700 border-leaf-200",
    activeBadgeColor: "bg-leaf-100/90 text-leaf-900 border-leaf-300",
  },
  "04:00 PM - 06:00 PM": {
    period: "Evening",
    badge: "Fast Slot",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    activeBadgeColor: "bg-sky-100/90 text-sky-900 border-sky-300",
  },
  "06:00 PM - 08:00 PM": {
    period: "Evening",
    badge: "Popular Slot",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    activeBadgeColor: "bg-purple-100/90 text-purple-900 border-purple-300",
  },
};

export function TimeSelector({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { date, slot, setDate, setSlot, pickup } = useBooking();
  const [showMoreDates, setShowMoreDates] = useState(false);

  // Full pool of 8 pickup days
  const days = useMemo(() => getPickupDays(8), []);

  // If collapsed, display only 1 row (first 4 days); if expanded, display all 8 days
  const visibleDays = showMoreDates ? days : days.slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* ── 1. Date Selection Grid (1 Row by Default + More Option) ────── */}
      <section aria-labelledby="pickup-date-heading">
        <div className="flex items-center justify-between">
          <h3
            id="pickup-date-heading"
            className="flex items-center gap-2 text-[15px] font-bold text-navy-950"
          >
            <CalendarDays className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
            Select Pickup Date
          </h3>

          {/* More Options / Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMoreDates((v) => !v)}
            aria-expanded={showMoreDates}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] sm:text-[12.5px] font-bold text-navy-700 hover:text-navy-950 hover:bg-navy-50 transition-colors"
          >
            <span>{showMoreDates ? "Show Less" : "+ More Options"}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-navy-500 transition-transform duration-200",
                showMoreDates && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Date cards grid: 1 clean row (4 cards) by default, expands to full grid on "+ More Options" */}
        <motion.div
          layout
          role="radiogroup"
          aria-labelledby="pickup-date-heading"
          className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2.5"
        >
          <AnimatePresence initial={false}>
            {visibleDays.map((d, i) => {
              const active = date === d.key;
              const isToday = i === 0;
              const isTomorrow = i === 1;
              const dayTag = isToday ? "Today" : isTomorrow ? "Tomorrow" : d.weekday;

              return (
                <motion.button
                  key={d.key}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={`${dayTag}, ${d.day} ${d.month}. ${active ? "Selected" : ""}`}
                  onClick={() => setDate(d.key)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "group relative flex flex-col items-center justify-between rounded-xl sm:rounded-2xl border p-1.5 sm:p-2.5 text-center transition-all duration-200 cursor-pointer min-h-[72px] sm:min-h-[82px]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600",
                    active
                      ? "border-navy-600 bg-navy-600 text-white shadow-[0_6px_18px_-5px_rgba(26,83,224,0.55)] ring-2 ring-navy-600 ring-offset-1"
                      : "border-ice-200 bg-white hover:border-navy-300 hover:bg-ice-50/50 shadow-sm text-navy-900",
                  )}
                >
                  {/* Active Checkmark Pill (top-right) */}
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 24 }}
                        className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full bg-leaf-500 text-white shadow-sm"
                      >
                        <Check className="h-2 w-2 sm:h-3 sm:w-3" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Day Tag / Today / Tomorrow */}
                  <span
                    className={cn(
                      "rounded-full px-1 py-0.5 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wide leading-none truncate max-w-full",
                      active
                        ? "bg-white/20 text-white"
                        : isToday
                        ? "bg-leaf-50 text-leaf-700 border border-leaf-200"
                        : isTomorrow
                        ? "bg-sky-50 text-navy-700 border border-sky-200"
                        : "text-navy-900/55",
                    )}
                  >
                    {dayTag}
                  </span>

                  {/* Date Number */}
                  <span
                    className={cn(
                      "font-display text-base xs:text-lg sm:text-xl font-extrabold leading-none my-0.5",
                      active ? "text-white" : "text-navy-950",
                    )}
                  >
                    {d.day}
                  </span>

                  {/* Month & Short Weekday */}
                  <span
                    className={cn(
                      "text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold leading-none truncate max-w-full",
                      active ? "text-navy-100" : "text-navy-900/50",
                    )}
                  >
                    {d.month} · {d.short}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── 2. Time Slot Grid ─────────────────────────────────────────────── */}
      <section aria-labelledby="pickup-slot-heading">
        <div className="flex items-center justify-between">
          <h3
            id="pickup-slot-heading"
            className="flex items-center gap-2 text-[15px] font-bold text-navy-950"
          >
            <Clock className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
            Select Pickup Time Slot
          </h3>
          <span className="text-[11.5px] font-semibold text-navy-900/45">
            2-Hour Windows
          </span>
        </div>

        {/* Time slot cards grid: Desktop 3 cols, Tablet 2 cols, Mobile 2 cols */}
        <div
          role="radiogroup"
          aria-labelledby="pickup-slot-heading"
          className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3.5"
        >
          {timeSlots.map((t) => {
            const active = slot === t;
            const detail = slotMetadata[t] || {
              period: "Standard",
              badge: "Available",
              badgeColor: "bg-ice-100 text-navy-700 border-ice-200",
              activeBadgeColor: "bg-navy-100 text-navy-800 border-navy-300",
            };

            return (
              <motion.button
                key={t}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={`${t}, ${detail.period}, ${detail.badge}. ${active ? "Selected" : ""}`}
                onClick={() => setSlot(t)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border p-3 sm:p-3.5 text-left transition-all duration-200 cursor-pointer min-h-[96px] sm:min-h-[104px]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600",
                  active
                    ? "border-navy-600 bg-navy-50/90 shadow-[0_4px_18px_-6px_rgba(26,83,224,0.35)] ring-2 ring-navy-600 ring-offset-1"
                    : "border-ice-200 bg-white hover:border-navy-300 hover:bg-ice-50/40 shadow-sm",
                )}
              >
                {/* Top header row: Period & Radio indicator */}
                <div className="flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 text-[10.5px] sm:text-[11.5px] font-bold text-navy-900/60 uppercase tracking-wide">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-navy-500" aria-hidden="true" />
                    {detail.period}
                  </span>
                  <span
                    className={cn(
                      "flex h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                      active
                        ? "border-navy-600 bg-navy-600 text-white"
                        : "border-ice-300 bg-white group-hover:border-navy-400",
                    )}
                  >
                    {active && <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />}
                  </span>
                </div>

                {/* Time Range */}
                <div className="my-1 sm:my-1.5">
                  <p className="font-display text-[12.5px] sm:text-[14px] font-bold text-navy-950 leading-snug">
                    {t}
                  </p>
                </div>

                {/* Demand / Availability Badge */}
                <div>
                  <span
                    className={cn(
                      "inline-block rounded-md border px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold leading-none",
                      active ? detail.activeBadgeColor : detail.badgeColor,
                    )}
                  >
                    {detail.badge}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── 3. Info Notice ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-start gap-3 rounded-2xl border border-leaf-200 bg-leaf-50/80 p-3.5 sm:p-4"
      >
        <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-leaf-600" aria-hidden="true" />
        <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-leaf-800">
          Our executive will arrive at{" "}
          <span className="font-bold text-leaf-950">
            {pickup.address ? `${pickup.address.slice(0, 42)}${pickup.address.length > 42 ? "…" : ""}` : "your address"}
          </span>{" "}
          within the chosen slot. You will get an instant WhatsApp confirmation.
        </p>
      </motion.div>

      {/* ── 4. Bottom Selection Summary & Navigation Bar ─────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-ice-200 bg-ice-50/70 p-4 sm:p-5">
        <p className="text-[13.5px] sm:text-[14px] font-semibold text-navy-900/75 text-center sm:text-left">
          {date && slot ? (
            <>
              Selected:{" "}
              <span className="font-display font-extrabold text-navy-900">
                {days.find((d) => d.key === date)?.label} · {slot}
              </span>
            </>
          ) : (
            "Pick a date and a time slot to continue"
          )}
        </p>
        <div className="flex w-full sm:w-auto items-center justify-end gap-2.5 sm:gap-3">
          <button type="button" onClick={onBack} className="btn-ghost flex-none">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!date || !slot}
            className="btn-primary group flex-1 sm:flex-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            Next: Order Summary
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
