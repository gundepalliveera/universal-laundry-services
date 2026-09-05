import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Navigation,
  Pencil,
  Phone,
  ShieldCheck,
  Shirt,
  Truck,
  User,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/booking/BookingContext";
import { WaterAnimation } from "@/components/WaterAnimation";
import { inr, formatPickupDate, serviceMap, getServiceRate, WHATSAPP_NUMBER } from "@/data/site";
import { cn } from "@/utils/cn";

export function OrderSummary({ onEdit }: { onEdit: (s: number) => void }) {
  const navigate = useNavigate();
  const {
    pickup,
    cart,
    date,
    slot,
    notes,
    total,
    subtotal,
    discount,
    deliveryFee,
    itemCount,
    selectedDuration,
    setSelectedDuration,
    setQty,
    orderConfirmed,
    setOrderConfirmed,
    reset,
  } = useBooking();
  const [placing, setPlacing] = useState(false);
  const [orderId] = useState(
    () => `ULS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`,
  );
  const dateInfo = formatPickupDate(date);
  const dayLabel = dateInfo.shortWithDay;

  const displayPhone = pickup.phone.startsWith("+91")
    ? `+91 ${pickup.phone.replace(/^\+91\s*/, "")}`
    : `+91 ${pickup.phone}`;

  // Declare lines before confirm() so the closure always has access to it
  const lines = cart.filter((l) => (Number(l.qty) || 0) > 0);

  // Pre-compute weight string used in both confirm() and the WhatsApp button
  const computeWeightString = () => {
    let totalKg = 0;
    let totalPieces = 0;
    lines.forEach((l) => {
      const s = serviceMap[l.id];
      const qty = Number(l.qty) || 0;
      if (s.unit.toLowerCase() === "kg") totalKg += qty;
      else totalPieces += qty;
    });
    const parts = [];
    if (totalKg > 0) parts.push(`${totalKg} kg`);
    if (totalPieces > 0) parts.push(`${totalPieces} pieces`);
    return parts.length > 0 ? parts.join(" + ") : "—";
  };

  const handleEdit = (s: number) => {
    setOrderConfirmed(false);
    onEdit(s);
  };

  const confirm = () => {
    if (placing) return;
    setPlacing(true);
    try {
      setTimeout(() => {
        setPlacing(false);
        setOrderConfirmed(true);
        // Build WhatsApp message
        const lineDetails = lines
          .map((l) => {
            const s = serviceMap[l.id];
            const itemDuration = l.duration || selectedDuration || "72 Hours";
            const rate = getServiceRate(itemDuration, s.name, s.price);
            const qty = Number(l.qty) || 0;
            const serviceTotal = qty * rate;
            return `• ${s.name} (${itemDuration}) — ${qty} ${qty === 1 ? s.unit : s.unitPlural} × ₹${rate} = ₹${serviceTotal}`;
          })
          .join("\n");
      const addressString = `${pickup.address}${pickup.pincode ? ", " + pickup.pincode : ""}`;
      const locationLink =
        pickup.latitude !== undefined && pickup.longitude !== undefined
          ? `https://maps.google.com/?q=${pickup.latitude},${pickup.longitude}`
          : `https://maps.google.com/?q=${encodeURIComponent(addressString)}`;
      const weightString = computeWeightString();

      const msg = [
        `*First name:* ${pickup.name}`,
        `*Phone number:* ${displayPhone}`,
        `*Address:* ${addressString}`,
        `*Location Link:* ${locationLink}`,
        ...(pickup.distanceKm !== undefined
          ? [`*Distance from Hub:* ${pickup.distanceKm} KM (${pickup.serviceAvailable ? "Service Available" : "Service Not Available"})`]
          : []),
        `*Type of service:*`,
        lineDetails,
        "",
        `*Weight approximate:* ${weightString}`,
        ...(notes ? [`*Notes:* ${notes}`] : []),
        "",
        `*Pick up date:* ${dayLabel}`,
        `*Time slot:* ${slot ?? "—"}`,
        "",
        `*Subtotal:* ${inr(subtotal)}`,
        ...(discount > 0 ? [`*10% Discount:* -${inr(discount)}`] : []),
        `*Pickup & Delivery:* ${deliveryFee === 0 ? "FREE" : inr(deliveryFee)}`,
        `*TOTAL:* ${inr(total)}`,
        "",
        `Minimum order above ₹399 for free pick up and delivery.`,
        `Only Hyderabad city location acceptable.`,
      ].join("\n");
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 1700);
    } catch {
      setPlacing(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {orderConfirmed ? (
        <motion.div
          key="confirmed"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="card-soft relative overflow-hidden p-5 xs:p-8 text-center sm:p-12"
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
            className="mx-auto flex h-20 w-20 xs:h-24 xs:w-24 items-center justify-center rounded-full bg-leaf-500 shadow-[0_24px_50px_-22px_rgba(107,179,63,0.95)]"
          >
            <svg viewBox="0 0 52 52" className="h-10 w-10 xs:h-12 xs:w-12" aria-hidden="true">
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
            className="mt-5 xs:mt-6 text-2xl font-black text-navy-950 sm:text-3xl"
          >
            Order Confirmed!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mx-auto mt-2 max-w-md text-[13.5px] xs:text-[15px] leading-relaxed text-navy-900/65"
          >
            Thank you for choosing Universal Laundry Services.
          </motion.p>

          {/* Key Confirmation Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-2 xs:gap-2.5 sm:grid-cols-4 sm:gap-3 text-left"
          >
            {[
              { label: "Order ID", value: orderId },
              { label: "Pickup Date", value: dayLabel },
              { label: "Pickup Time", value: slot ?? "—" },
              { label: "Total Amount", value: inr(total) },
            ].map((x) => (
              <div key={x.label} className="rounded-2xl border border-ice-200 bg-white p-3 xs:p-3.5 shadow-xs">
                <p className="text-[10px] xs:text-[11px] font-bold tracking-wide text-navy-900/45 uppercase truncate">
                  {x.label}
                </p>
                <p className="mt-1 font-display text-[13px] xs:text-[14.5px] font-black text-[#0c1e40] truncate">
                  {x.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons: Back to Home & Track Order */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 flex flex-col xs:flex-row items-center justify-center gap-2.5 sm:gap-3"
          >
            <button
              type="button"
              onClick={() => {
                reset();
                navigate("/");
              }}
              className="btn-primary w-full xs:w-auto px-6 py-3.5 text-sm font-bold shadow-md cursor-pointer"
            >
              Back to Home
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                [
                  `*Order ID:* ${orderId}`,
                  `*First name:* ${pickup.name}`,
                  `*Phone number:* ${displayPhone}`,
                  `*Address:* ${pickup.address}${pickup.pincode ? ", " + pickup.pincode : ""}`,
                  `*Pick up date:* ${dayLabel}`,
                  `*Time slot:* ${slot ?? "—"}`,
                  `*TOTAL:* ${inr(total)}`,
                  `Please share tracking updates for this order.`,
                ].join("\n"),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green w-full xs:w-auto px-6 py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Truck className="h-4 w-4" aria-hidden="true" />
              <span>Track Order</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.5 }}
            className="mt-6 flex flex-wrap justify-center gap-2.5"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-navy-800">
              <Truck className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
              Live tracking shared on WhatsApp
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-navy-800">
              <ShieldCheck className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
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
        >
          {/* ══════════════════════════════════════════════════════════════════
              MOBILE-ONLY CLEAN ORDER SUMMARY (<640px)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="sm:hidden space-y-3.5">
            <h2 className="text-xl font-black text-[#0c1e40] tracking-tight">Order Summary</h2>

            {/* 1. Pickup Address Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 xs:p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#0c1e40]">
                  <MapPin className="h-4 w-4 text-[#1a56db]" aria-hidden="true" />
                  Pickup Address
                </span>
                <button
                  type="button"
                  onClick={() => handleEdit(0)}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1a56db] hover:text-blue-800 cursor-pointer"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" />
                  Edit
                </button>
              </div>
              <div className="pt-2 text-[12.5px] xs:text-[13px] text-gray-700 space-y-0.5">
                <p className="font-bold text-[#0c1e40]">{pickup.name}</p>
                <p className="text-gray-500 font-medium">{displayPhone}</p>
                <p className="leading-snug">{pickup.address}</p>
                {pickup.pincode && <p className="text-gray-500 font-medium">Pincode: {pickup.pincode}</p>}
              </div>
            </div>

            {/* 2. Pickup Date Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 xs:p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#0c1e40]">
                  <CalendarDays className="h-4 w-4 text-[#1a56db]" aria-hidden="true" />
                  Pickup Date
                </span>
                <button
                  type="button"
                  onClick={() => handleEdit(2)}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1a56db] hover:text-blue-800 cursor-pointer"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" />
                  Edit
                </button>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <p className="text-[13.5px] xs:text-[14px] font-bold text-[#0c1e40]">{dayLabel}</p>
                {dateInfo.relativeTag && (
                  <span className="rounded-full bg-leaf-50 px-2 py-0.5 text-[10px] font-bold text-leaf-700 border border-leaf-200">
                    {dateInfo.relativeTag}
                  </span>
                )}
              </div>
            </div>

            {/* 3. Pickup Time Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 xs:p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#0c1e40]">
                  <Clock className="h-4 w-4 text-[#1a56db]" aria-hidden="true" />
                  Pickup Time
                </span>
                <button
                  type="button"
                  onClick={() => handleEdit(2)}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1a56db] hover:text-blue-800 cursor-pointer"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" />
                  Edit
                </button>
              </div>
              <div className="pt-2">
                <p className="text-[13.5px] xs:text-[14px] font-bold text-[#0c1e40]">{slot ?? "—"}</p>
              </div>
            </div>

            {/* 4. Selected Services Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 xs:p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#0c1e40]">
                  <Shirt className="h-4 w-4 text-[#1a56db]" aria-hidden="true" />
                  Selected Services
                </span>
                <button
                  type="button"
                  onClick={() => handleEdit(1)}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1a56db] hover:text-blue-800 cursor-pointer"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" />
                  Edit
                </button>
              </div>

              <div className="pt-2.5 space-y-2.5">
                {lines.map((l) => {
                  const s = serviceMap[l.id];
                  const itemDuration = l.duration || selectedDuration || "72 Hours";
                  const rate = getServiceRate(itemDuration, s.name, s.price);
                  const qty = Number(l.qty) || 0;
                  const serviceTotal = qty * rate;

                  return (
                    <div
                      key={l.id}
                      className="rounded-xl border border-gray-100 bg-[#f8fafc] p-2.5 xs:p-3 space-y-1 text-[12px]"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-bold text-[#0c1e40] text-[13px] xs:text-[13.5px]">{s.name}</p>
                          <p className="text-gray-500 font-medium text-[11px]">{itemDuration}</p>
                        </div>
                        <p className="font-black text-[#0c1e40] text-[14px] xs:text-[14.5px] shrink-0">
                          {inr(serviceTotal)}
                        </p>
                      </div>
                      <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-200/60 text-[11px] xs:text-[11.5px]">
                        <span>Quantity: <strong className="text-[#0c1e40]">{qty} {s.unit.toUpperCase()}</strong></span>
                        <span>Rate: <strong className="text-[#0c1e40]">₹{rate}/{s.unit.toLowerCase()}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Financial Breakdown Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 xs:p-4 shadow-xs space-y-2 text-[13px] xs:text-[13.5px]">
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
                <span className={cn("font-bold", deliveryFee === 0 ? "text-[#16a34a]" : "text-[#0c1e40]")}>
                  {deliveryFee === 0 ? "FREE" : inr(deliveryFee)}
                </span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-2 flex items-center justify-between">
                <span className="font-bold text-[#0c1e40] text-[14.5px] xs:text-[15px]">TOTAL</span>
                <span className="font-display text-[20px] xs:text-[22px] font-black text-[#16a34a]">{inr(total)}</span>
              </div>

              <div className="mt-2 rounded-xl bg-blue-50/70 border border-blue-100 p-2.5 flex items-center justify-between text-[11px] xs:text-[11.5px]">
                <span className="font-bold text-[#0c1e40]">Payment Method</span>
                <span className="font-extrabold text-[#16a34a]">Pay After Delivery (Cash / UPI)</span>
              </div>
            </div>

            {/* 6. Touch-Friendly Place Order Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={confirm}
                disabled={lines.length === 0 || placing}
                className="w-full py-4 rounded-2xl bg-[#16a34a] hover:bg-[#15803d] active:scale-98 text-white text-[15.5px] xs:text-[16px] font-black tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Processing Order…
                  </>
                ) : (
                  <>
                    Place Order
                    <CheckCircle2 className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              DESKTOP/TABLET VIEW (>=640px) — 100% PRESERVED
              ══════════════════════════════════════════════════════════════════ */}
          <div className="hidden sm:grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
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
                    onClick={() => handleEdit(0)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-ice-50 px-3 py-1.5 text-[12.5px] font-bold text-navy-700 transition-all duration-300 hover:scale-105 hover:border-navy-300 hover:bg-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </button>
                </div>
                <dl className="mt-5 space-y-4 text-[14px]">
                  <Row icon={<User className="h-4 w-4" aria-hidden="true" />} label="Customer name" value={pickup.name} />
                  <Row icon={<Phone className="h-4 w-4" aria-hidden="true" />} label="Phone number" value={displayPhone} />
                  <Row
                    icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
                    label="Address"
                    value={pickup.address}
                  />
                  <Row icon={<MapPin className="h-4 w-4" aria-hidden="true" />} label="Pincode" value={pickup.pincode} />
                  {pickup.distanceKm !== undefined && (
                    <Row
                      icon={<Navigation className="h-4 w-4" aria-hidden="true" />}
                      label="Hub distance"
                      value={`${pickup.distanceKm} KM (${pickup.serviceAvailable ? "Service Available" : "Service Not Available"})`}
                    />
                  )}
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
                    onClick={() => handleEdit(2)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-ice-50 px-3 py-1.5 text-[12.5px] font-bold text-navy-700 transition-all duration-300 hover:scale-105 hover:border-navy-300 hover:bg-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </button>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-ice-200 bg-ice-50/70 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[11.5px] font-semibold tracking-wide text-navy-900/45 uppercase">
                        Pickup Date
                      </p>
                      {dateInfo.relativeTag && (
                        <span className="rounded-full bg-leaf-50 px-2 py-0.5 text-[10px] font-bold text-leaf-700 border border-leaf-200">
                          {dateInfo.relativeTag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[14.5px] font-bold text-navy-900">
                      {dateInfo.dateOnly}
                    </p>
                    <p className="mt-0.5 text-[12px] text-navy-900/55">
                      {dateInfo.shortWithDay}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ice-200 bg-ice-50/70 p-4">
                    <p className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-wide text-navy-900/45 uppercase">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      Pickup Time
                    </p>
                    <p className="mt-1 text-[14.5px] font-bold text-navy-900">{slot ?? "—"}</p>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[12.5px] text-navy-900/55">
                  <Truck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
                  Turnaround: {selectedDuration} · Free pickup & delivery above ₹399
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[17px] font-bold text-navy-950">Your Order</h3>
                    <p className="mt-1 text-[13px] text-navy-900/55">
                      {itemCount} units · {lines.length} services selected
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEdit(1)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ice-200 bg-ice-50 px-3 py-1.5 text-[12.5px] font-bold text-navy-700 transition-all duration-300 hover:scale-105 hover:border-navy-300 hover:bg-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </button>
                </div>

                {/* Service Duration Switcher Bar */}
                <div className="mt-4 rounded-2xl border border-ice-200 bg-ice-50/70 p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="flex items-center gap-1.5 text-[12px] font-bold text-navy-900/65 uppercase tracking-wide">
                      <Clock className="h-3.5 w-3.5 text-navy-600" aria-hidden="true" />
                      Service Duration:
                    </span>
                    <span className="text-[12.5px] font-extrabold text-navy-900">
                      {selectedDuration}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Service Duration">
                    {(["72 Hours", "24 Hours", "12 Hours"] as const).map((dur) => {
                      const active = selectedDuration === dur;
                      return (
                        <button
                          key={dur}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setSelectedDuration(dur)}
                          className={cn(
                            "rounded-xl py-2 px-1 text-center text-[12px] font-bold transition-all duration-200 cursor-pointer",
                            active
                              ? "bg-navy-600 text-white shadow-sm ring-2 ring-navy-600 ring-offset-1"
                              : "bg-white text-navy-700 border border-ice-200 hover:border-navy-300 hover:bg-ice-50",
                          )}
                        >
                          {dur}
                        </button>
                      );
                    })}
                  </div>
                </div>

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
                    <div className="mt-4 space-y-3">
                      <AnimatePresence initial={false}>
                        {lines.map((line) => {
                          const s = serviceMap[line.id];
                          const Icon = s.icon;
                          const itemDuration = line.duration || selectedDuration || "72 Hours";
                          const rate = getServiceRate(itemDuration, s.name, s.price);
                          const qty = Number(line.qty) || 0;
                          const serviceTotal = qty * rate;

                          return (
                            <motion.div
                              key={line.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35 }}
                              className="rounded-2xl border border-ice-200 bg-white p-4 shadow-sm space-y-3"
                            >
                              {/* Service Header Row */}
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}
                                  >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                  <div className="min-w-0">
                                    <span className="text-[11px] font-semibold text-navy-900/50 uppercase tracking-wide">
                                      Service:
                                    </span>
                                    <p className="truncate text-[14.5px] font-bold text-navy-950">
                                      {s.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <span className="text-[11px] font-semibold text-navy-900/50 uppercase tracking-wide">
                                    Service Total:
                                  </span>
                                  <p className="font-display text-[16px] font-extrabold text-navy-900">
                                    ₹{serviceTotal}
                                  </p>
                                </div>
                              </div>

                              {/* Details Grid: Duration, Quantity, Rate */}
                              <div className="grid grid-cols-3 gap-2 border-t border-ice-100 pt-2.5 text-[12px]">
                                <div>
                                  <span className="block text-[10.5px] font-semibold text-navy-900/50 uppercase">
                                    Service Duration:
                                  </span>
                                  <span className="font-bold text-navy-900">
                                    {itemDuration}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-[10.5px] font-semibold text-navy-900/50 uppercase">
                                    Quantity:
                                  </span>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="font-bold text-navy-900">
                                      {qty} {s.unit.toUpperCase()}
                                    </span>
                                    <div className="inline-flex items-center gap-1 ml-auto sm:ml-1">
                                      <button
                                        type="button"
                                        onClick={() => setQty(line.id, qty - 1, itemDuration)}
                                        aria-label={`Decrease ${s.name} quantity`}
                                        className="flex h-5 w-5 items-center justify-center rounded-full border border-ice-200 bg-ice-50 text-navy-700 hover:bg-ice-100 text-[11px] font-bold"
                                      >
                                        -
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setQty(line.id, qty + 1, itemDuration)}
                                        aria-label={`Increase ${s.name} quantity`}
                                        className="flex h-5 w-5 items-center justify-center rounded-full border border-navy-600 bg-navy-600 text-white hover:bg-navy-700 text-[11px] font-bold"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <span className="block text-[10.5px] font-semibold text-navy-900/50 uppercase">
                                    Rate:
                                  </span>
                                  <span className="font-bold text-navy-900">
                                    ₹{rate} per {s.unit.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

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
                      <div className="flex items-center justify-between border-t border-dashed border-ice-300 pt-3">
                        <span className="font-display text-[15px] font-bold text-navy-900">
                          TOTAL
                        </span>
                        <motion.span
                          key={total}
                          initial={{ scale: 0.9, opacity: 0.3 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 420, damping: 22 }}
                          className="font-display text-2xl font-extrabold text-navy-900"
                        >
                          {inr(total)}
                        </motion.span>
                      </div>
                      <div className="mt-2 flex items-center justify-between rounded-2xl border border-navy-100 bg-navy-50/70 px-4 py-3">
                        <span className="font-display text-[13.5px] font-bold text-navy-900">
                          Payment Method
                        </span>
                        <span className="font-display text-[13px] font-extrabold text-leaf-700">
                          Pay After Delivery (Cash / UPI)
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={confirm}
                        disabled={lines.length === 0 || placing}
                        className="btn-green group w-full py-4 text-base font-bold shadow-[0_16px_34px_-14px_rgba(107,179,63,0.8)] hover:shadow-[0_20px_40px_-12px_rgba(107,179,63,0.9)] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                      >
                        {placing ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                            <span>Processing Order…</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm Order</span>
                            <CheckCircle2
                              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-5 flex items-center justify-center gap-2 text-[13px] font-semibold text-navy-900/55">
                      <ShieldCheck className="h-4 w-4 text-leaf-600" aria-hidden="true" />
                      Your order is safe and secure
                    </p>
                  </>
                )}
              </div>
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
