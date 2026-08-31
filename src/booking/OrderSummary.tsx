import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/booking/BookingContext";
import { WaterAnimation } from "@/components/WaterAnimation";
import { inr, getPickupDays, serviceMap, WHATSAPP_NUMBER } from "@/data/site";

export function OrderSummary({ onBack, onEdit }: { onBack: () => void; onEdit: (s: number) => void }) {
  const { pickup, cart, date, slot, notes, total, itemCount } =
    useBooking();
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(
    () => `ULS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`,
  );
  const days = getPickupDays(7);
  const dayLabel = days.find((d) => d.key === date)?.label ?? "—";

  // Declare lines before confirm() so the closure always has access to it
  const lines = cart.filter((l) => l.qty > 0);

  // Pre-compute weight string used in both confirm() and the WhatsApp button
  const computeWeightString = () => {
    let totalKg = 0;
    let totalPieces = 0;
    lines.forEach((l) => {
      const s = serviceMap[l.id];
      if (s.unit.toLowerCase() === "kg") totalKg += l.qty;
      else totalPieces += l.qty;
    });
    const parts = [];
    if (totalKg > 0) parts.push(`${totalKg} kg`);
    if (totalPieces > 0) parts.push(`${totalPieces} pieces`);
    return parts.length > 0 ? parts.join(" + ") : "—";
  };

  const confirm = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      // Build WhatsApp message
      const lineDetails = lines
        .map((l) => {
          const s = serviceMap[l.id];
          return `• ${s.name} — ${l.qty} ${l.qty === 1 ? s.unit : s.unitPlural}`;
        })
        .join("\n");
      const addressString = `${pickup.address}${pickup.pincode ? ", " + pickup.pincode : ""}`;
      const locationLink = `https://maps.google.com/?q=${encodeURIComponent(addressString)}`;
      const weightString = computeWeightString();

      const msg = [
        `*First name:* ${pickup.name}`,
        `*Phone number:* +91 ${pickup.phone}`,
        `*Address:* ${addressString}`,
        `*Location Link:* ${locationLink}`,
        `*Type of service:*`,
        lineDetails,
        "",
        `*Weight approximate:* ${weightString}`,
        ...(notes ? [`*Notes:* ${notes}`] : []),
        "",
        `*Pick up date:* ${dayLabel}`,
        `*Time slot:* ${slot ?? "—"}`,
        "",
        `Minimum order above ₹300 for free pick up and delivery.`,
        `Only Hyderabad city location acceptable.`
      ].join("\n");
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank", "noreferrer");
    }, 1700);
  };

  return (
    <AnimatePresence mode="wait">
      {placed ? (
        <motion.div
          key="confirmed"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="card-soft relative overflow-hidden p-8 text-center sm:p-12"
        >
          <WaterAnimation count={10} className="-z-10 opacity-70" seed={202} />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(70%_60%_at_50%_0%,#e4f8d2_0%,#ffffff_70%)]"
          />
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-leaf-500 shadow-[0_24px_50px_-22px_rgba(107,179,63,0.95)]"
          >
            <svg viewBox="0 0 52 52" className="h-12 w-12" aria-hidden="true">
              <motion.path
                d="M14 27l8 8 16-17"
                fill="none"
                stroke="white"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 text-2xl font-extrabold text-navy-950 sm:text-3xl"
          >
            Order Confirmed!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-navy-900/65"
          >
            Thank you {pickup.name.split(" ")[0]}! Your pickup is scheduled for{" "}
            <span className="font-semibold text-navy-800">{dayLabel}</span> between{" "}
            <span className="font-semibold text-navy-800">{slot}</span>. Our executive
            will reach your doorstep on time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mx-auto mt-7 grid max-w-lg gap-3 sm:grid-cols-3"
          >
            {[
              { label: "Order ID", value: orderId },
              { label: "Amount payable", value: inr(total) },
              { label: "Items", value: `${itemCount} units` },
            ].map((x) => (
              <div key={x.label} className="rounded-2xl border border-ice-200 bg-white p-4">
                <p className="text-[11px] font-semibold tracking-wide text-navy-900/45 uppercase">
                  {x.label}
                </p>
                <p className="mt-1 font-display text-[15px] font-extrabold text-navy-800">
                  {x.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* WhatsApp Direct Chat Button */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-7 flex justify-center"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                [
                  `*First name:* ${pickup.name}`,
                  `*Phone number:* +91 ${pickup.phone}`,
                  `*Address:* https://maps.google.com/?q=${encodeURIComponent(`${pickup.address}${pickup.pincode ? ", " + pickup.pincode : ""}`)}`,
                  `*Type of service:*`,
                  lines
                    .map((l) => {
                      const s = serviceMap[l.id];
                      return `• ${s.name} — ${l.qty} ${l.qty === 1 ? s.unit : s.unitPlural} × ${inr(s.price)} = ${inr(s.price * l.qty)}`;
                    })
                    .join("\n"),
                  "",
                  `*Weight approximate:* ${computeWeightString()}`,
                  ...(notes ? [`*Notes:* ${notes}`] : []),
                  "",
                  `*Pick up date:* ${dayLabel}`,
                  `*Time slot:* ${slot ?? "—"}`,
                  "",
                  `Minimum order above ₹300 for free pick up and delivery.`,
                  `Only Hyderabad city location acceptable.`
                ].join("\n"),
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-green group inline-flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-lg"
            >
              <span>Open Order on WhatsApp (9494913323)</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.5 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-ice-200 bg-white px-4 py-2 text-[13px] font-semibold text-navy-800">
              <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
              Live tracking shared on WhatsApp
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ice-200 bg-white px-4 py-2 text-[13px] font-semibold text-navy-800">
              <ShieldCheck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
              Free re-wash guarantee
            </span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="summary"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
        >
          {/* ---------- left ---------- */}
          <div className="space-y-6">
            <div className="card-soft p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="flex items-center gap-2 text-[17px] font-bold text-navy-950">
                  <User className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
                  Pickup Details
                </h3>
                <button
                  type="button"
                  onClick={() => onEdit(0)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-ice-50 px-3 py-1.5 text-[12.5px] font-bold text-navy-700 transition-all duration-300 hover:scale-105 hover:border-navy-300 hover:bg-white"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  Edit
                </button>
              </div>
              <dl className="mt-5 space-y-4 text-[14px]">
                <Row icon={<User className="h-4 w-4" aria-hidden="true" />} label="Customer name" value={pickup.name} />
                <Row icon={<Phone className="h-4 w-4" aria-hidden="true" />} label="Phone number" value={`+91 ${pickup.phone}`} />
                <Row
                  icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
                  label="Address"
                  value={pickup.address}
                />
                <Row icon={<MapPin className="h-4 w-4" aria-hidden="true" />} label="Pincode" value={pickup.pincode} />
                {notes ? (
                  <Row
                    icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />}
                    label="Notes"
                    value={notes}
                  />
                ) : null}
              </dl>
            </div>

            <div className="card-soft p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="flex items-center gap-2 text-[17px] font-bold text-navy-950">
                  <CalendarDays className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
                  Pickup Date &amp; Time
                </h3>
                <button
                  type="button"
                  onClick={() => onEdit(2)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-ice-50 px-3 py-1.5 text-[12.5px] font-bold text-navy-700 transition-all duration-300 hover:scale-105 hover:border-navy-300 hover:bg-white"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  Edit
                </button>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-ice-200 bg-ice-50/70 p-4">
                  <p className="text-[11.5px] font-semibold tracking-wide text-navy-900/45 uppercase">
                    Date
                  </p>
                  <p className="mt-1 text-[14.5px] font-bold text-navy-900">{dayLabel}</p>
                </div>
                <div className="rounded-2xl border border-ice-200 bg-ice-50/70 p-4">
                  <p className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-wide text-navy-900/45 uppercase">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Time slot
                  </p>
                  <p className="mt-1 text-[14.5px] font-bold text-navy-900">{slot ?? "—"}</p>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-[12.5px] text-navy-900/55">
                <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
                Free pickup & delivery above ₹300 · Delivery in {lines.length ? "72–96 hrs" : "—"}
              </p>
            </div>
          </div>

          {/* ---------- right ---------- */}
          <div className="card-soft relative overflow-hidden p-6 sm:p-7">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(60%_100%_at_50%_0%,#eff6ff,transparent)]"
            />
            <div className="relative">
              <h3 className="text-[17px] font-bold text-navy-950">Your Order</h3>
              <p className="mt-1 text-[13px] text-navy-900/55">
                {itemCount} units · {lines.length} services selected
              </p>

              {placing ? (
                <div className="mt-6 space-y-3" aria-busy="true" aria-live="polite">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="skeleton h-14 rounded-2xl" />
                  ))}
                  <div className="skeleton h-12 w-2/3 rounded-2xl" />
                  <p className="pt-2 text-center text-[13px] font-semibold text-navy-900/60">
                    Placing your order…
                  </p>
                </div>
              ) : (
                <>
                  <ul className="mt-5 divide-y divide-ice-200">
                    <AnimatePresence initial={false}>
                      {lines.map((line) => {
                        const s = serviceMap[line.id];
                        const Icon = s.icon;
                        return (
                          <motion.li
                            key={line.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35 }}
                            className="flex items-center gap-4 py-3.5"
                          >
                            <span
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white`}
                            >
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[14.5px] font-bold text-navy-950">
                                {s.name}{" "}
                                <span className="font-semibold text-navy-900/45">
                                  ({line.qty} {line.qty === 1 ? s.unit : s.unitPlural})
                                </span>
                              </span>
                              <span className="text-[12.5px] text-navy-900/50">
                                {s.unitPlural}
                              </span>
                            </span>
                            <span className="font-display text-[15px] font-extrabold text-navy-900">
                              {line.qty} {s.unit.toLowerCase()}
                            </span>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>

                  {lines.length === 0 && (
                    <p className="mt-6 rounded-2xl border border-dashed border-ice-300 p-5 text-center text-[13.5px] text-navy-900/55">
                      No services selected yet.{" "}
                      <button
                        type="button"
                        onClick={() => onEdit(1)}
                        className="font-bold text-navy-700 underline"
                      >
                        Add services
                      </button>
                    </p>
                  )}

                  <div className="mt-5 space-y-3 border-t border-dashed border-ice-300 pt-5 text-[14px]">
                    <div className="mt-2 flex items-center justify-between rounded-2xl border border-navy-100 bg-navy-50/70 px-4 py-3.5">
                      <span className="font-display text-[15px] font-bold text-navy-900">
                        Payment
                      </span>
                      <span className="font-display text-[14px] font-extrabold text-leaf-700">
                        Calculated at pickup
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={onBack} className="btn-ghost">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={confirm}
                      disabled={lines.length === 0}
                      className="btn-green group flex-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:flex-none"
                    >
                      Confirm Order
                      <CheckCircle2
                        className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <p className="mt-5 flex items-center justify-center gap-2 text-[13px] font-semibold text-navy-900/55">
                    <Lock className="h-4 w-4 text-leaf-600" aria-hidden="true" />
                    Your order is safe and secure
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ice-100 text-navy-500">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[11.5px] font-semibold tracking-wide text-navy-900/45 uppercase">
          {label}
        </dt>
        <dd className="mt-0.5 leading-relaxed break-words text-navy-900">{value}</dd>
      </div>
    </div>
  );
}
