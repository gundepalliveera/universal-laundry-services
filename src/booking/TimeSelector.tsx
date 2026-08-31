import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Info,
} from "lucide-react";
import { useMemo } from "react";
import { useBooking } from "@/booking/BookingContext";
import { getPickupDays, timeSlots } from "@/data/site";
import { cn } from "@/utils/cn";

export function TimeSelector({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { date, slot, setDate, setSlot, pickup } = useBooking();
  const days = useMemo(() => getPickupDays(7), []);

  return (
    <div>
      <section aria-labelledby="pickup-date-heading">
        <h3
          id="pickup-date-heading"
          className="flex items-center gap-2 text-[15px] font-bold text-navy-950"
        >
          <CalendarDays className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
          Select pickup date
        </h3>
        <div
          role="radiogroup"
          aria-labelledby="pickup-date-heading"
          className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-7"
        >
          {days.map((d, i) => {
            const active = date === d.key;
            return (
              <motion.button
                key={d.key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setDate(d.key)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "relative flex min-w-[92px] shrink-0 flex-col items-center rounded-2xl border px-3 py-3.5 transition-all duration-300",
                  active
                    ? "border-navy-600 bg-navy-600 text-white shadow-[0_18px_34px_-20px_rgba(26,83,224,0.9)]"
                    : "card-soft card-hover text-navy-900",
                )}
              >
                <span
                  className={cn(
                    "text-[11px] font-bold tracking-wide uppercase",
                    active ? "text-navy-100" : "text-navy-900/45",
                  )}
                >
                  {i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.short}
                </span>
                <span className="font-display text-xl font-extrabold">{d.day}</span>
                <span
                  className={cn(
                    "text-[11.5px] font-semibold",
                    active ? "text-navy-100" : "text-navy-900/50",
                  )}
                >
                  {d.month}
                </span>
                {active && (
                  <motion.span
                    layoutId="date-check"
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-leaf-500 text-white"
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="pickup-slot-heading" className="mt-9">
        <h3
          id="pickup-slot-heading"
          className="flex items-center gap-2 text-[15px] font-bold text-navy-950"
        >
          <Clock className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
          Select pickup time slot
        </h3>
        <div
          role="radiogroup"
          aria-labelledby="pickup-slot-heading"
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {timeSlots.map((t, i) => {
            const active = slot === t;
            return (
              <motion.button
                key={t}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSlot(t)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -3 }}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
                  active
                    ? "border-navy-400 bg-navy-50 text-navy-900 ring-4 ring-navy-100"
                    : "card-soft card-hover",
                )}
              >
                <span>
                  <span className="block text-[14.5px] font-bold">{t}</span>
                  <span className="text-[12px] text-navy-900/50">
                    {i < 2 ? "Morning · high demand" : i < 4 ? "Afternoon slot" : "Evening slot"}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    active
                      ? "scale-100 border-navy-600 bg-navy-600 text-white"
                      : "scale-90 border-ice-300 bg-white",
                  )}
                >
                  {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-7 flex items-start gap-3 rounded-2xl border border-leaf-200 bg-leaf-50 p-4"
      >
        <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-leaf-600" aria-hidden="true" />
        <p className="text-[13px] leading-relaxed text-leaf-700">
          Our executive will arrive at{" "}
          <span className="font-bold">
            {pickup.address ? `${pickup.address.slice(0, 42)}${pickup.address.length > 42 ? "…" : ""}` : "your address"}
          </span>{" "}
          within the chosen slot. You will get a WhatsApp confirmation instantly.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-ice-200 bg-ice-50/70 p-5">
        <p className="text-[14px] font-semibold text-navy-900/70">
          {date && slot ? (
            <>
              Selected:{" "}
              <span className="font-display text-navy-800">
                {days.find((d) => d.key === date)?.label} · {slot}
              </span>
            </>
          ) : (
            "Pick a date and a time slot to continue"
          )}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={onBack} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!date || !slot}
            className="btn-primary group disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
