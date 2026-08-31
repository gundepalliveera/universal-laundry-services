import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Clock, Minus, Plus, ShoppingBasket, Truck } from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/booking/BookingContext";
import {
  inr,
  services,
  serviceMap,
  deliveryTiers,
  type DeliveryTierId,
  type ServiceId,
} from "@/data/site";
import { cn } from "@/utils/cn";

// Popular badge service IDs
const POPULAR_IDS: ServiceId[] = ["premium-wash"];

// ─── Qty Stepper ─────────────────────────────────────────────────────────────

function QtyStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (q: number) => void;
}) {
  const btnBase =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 active:scale-90";
  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Quantity selector"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        disabled={qty <= 0}
        aria-label="Decrease quantity"
        style={{ touchAction: "manipulation" }}
        className={cn(
          btnBase,
          qty > 0
            ? "border-navy-300 text-navy-700 hover:border-navy-600 hover:bg-navy-600 hover:text-white"
            : "border-ice-200 text-navy-300",
        )}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      <motion.span
        key={qty}
        initial={{ scale: 0.7, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 480, damping: 24 }}
        className="min-w-[1.75rem] text-center font-display text-[17px] font-extrabold text-navy-900"
        aria-live="polite"
      >
        {qty}
      </motion.span>

      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        style={{ touchAction: "manipulation" }}
        className={cn(
          btnBase,
          "border-navy-600 bg-navy-600 text-white hover:bg-navy-700 hover:border-navy-700",
        )}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Delivery Tier Tabs ───────────────────────────────────────────────────────

function DeliveryTabs({
  selected,
  onSelect,
}: {
  selected: DeliveryTierId;
  onSelect: (id: DeliveryTierId) => void;
}) {
  return (
    <div className="mb-5">
      <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-navy-800">
        <Clock className="h-4 w-4 text-navy-500" aria-hidden="true" />
        Choose your delivery time
      </p>

      <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Delivery time">
        {deliveryTiers.map((tier) => {
          const active = selected === tier.id;
          return (
            <motion.button
              key={tier.id}
              type="button"
              role="radio"
              aria-checked={active}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(tier.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 text-center transition-all duration-250",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600",
                active
                  ? "border-navy-500 bg-white shadow-[0_4px_18px_-8px_rgba(26,83,224,0.45)]"
                  : "border-ice-200 bg-white hover:border-navy-200",
              )}
            >
              {/* Blue checkmark top-right when active */}
              <AnimatePresence>
                {active && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy-600 text-white shadow"
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Clock icon */}
              <Clock
                className={cn(
                  "h-5 w-5",
                  active ? tier.iconColor : "text-navy-400",
                )}
                aria-hidden="true"
              />

              {/* Hours label */}
              <span
                className={cn(
                  "font-display text-[13px] font-extrabold leading-none tracking-tight sm:text-[15px]",
                  active ? "text-navy-900" : "text-navy-700",
                )}
              >
                {tier.hours}
              </span>

              {/* Badge pill */}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                  tier.badgeColor,
                )}
              >
                {tier.badge}
              </span>

              {/* Price */}
              <span
                className={cn(
                  "font-display text-[13px] font-extrabold sm:text-[14px]",
                  active ? tier.iconColor : "text-navy-600",
                )}
              >
                ₹{tier.basePrice}
                <span className="text-[10px] font-semibold text-navy-900/50"> /kg</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Desktop / tablet vertical card (sm+) ───────────────────────────────────

function DesktopServiceCard({
  s,
  qty,
  selected,
  price,
  tierId,
  onToggle,
  onQty,
  index,
}: {
  s: (typeof services)[0];
  qty: number;
  selected: boolean;
  price: number;
  tierId: DeliveryTierId;
  onToggle: () => void;
  onQty: (q: number) => void;
  index: number;
}) {
  const Icon = s.icon;
  const isPopular = POPULAR_IDS.includes(s.id);
  const priceColor =
    tierId === "72hr" ? "text-navy-700" : tierId === "24hr" ? "text-emerald-600" : "text-orange-500";

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${s.name} — ${inr(price)} per ${s.unit.toLowerCase()}. ${selected ? "Selected" : "Not selected"}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
      }}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600",
        selected
          ? "border-navy-400 bg-navy-50/60 shadow-[0_22px_44px_-26px_rgba(26,83,224,0.6)]"
          : "card-soft card-hover",
      )}
    >
      {/* Selected checkmark */}
      <span
        className={cn(
          "absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300",
          selected
            ? "scale-100 opacity-100 bg-leaf-500 text-white"
            : "scale-50 opacity-0 bg-transparent text-transparent",
        )}
      >
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      </span>

      {/* Icon */}
      <span
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-transform duration-300 group-hover:scale-110",
          s.accent,
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      {/* Name + popular badge */}
      <div className="flex flex-wrap items-center gap-2 pr-8">
        <h3 className="text-[16px] font-bold text-navy-950">{s.name}</h3>
        {isPopular && (
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
            POPULAR
          </span>
        )}
      </div>

      <p className="mt-1 text-[12.5px] leading-relaxed text-navy-900/55">{s.tagline}</p>

      {/* Animated price */}
      <motion.p
        key={`${s.id}-${tierId}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-2"
      >
        <span className="text-[12px] text-navy-900/50">From </span>
        <span className={cn("text-[14px] font-extrabold", priceColor)}>₹{price}</span>
        <span className="text-[12px] text-navy-900/50"> / {s.unit.toLowerCase()}</span>
      </motion.p>

      {/* Qty stepper */}
      <div
        className="mt-4 flex items-center justify-between border-t border-dashed border-ice-300 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-display text-[15px] font-extrabold text-navy-700">
          {qty > 0
            ? s.unit.toLowerCase() === "kg"
              ? `Approx. ${qty} kg`
              : `${qty} ${s.unitPlural.toLowerCase()}`
            : "Select Qty"}
        </span>
        <QtyStepper qty={qty} onChange={onQty} />
      </div>
    </motion.div>
  );
}

// ─── Service Row Card (mobile — matches screenshot exactly) ───────────────────

function ServiceRow({
  s,
  qty,
  selected,
  price,
  tierId,
  onToggle,
  onQty,
  index,
}: {
  s: (typeof services)[0];
  qty: number;
  selected: boolean;
  price: number;
  tierId: DeliveryTierId;
  onToggle: () => void;
  onQty: (q: number) => void;
  index: number;
}) {
  const Icon = s.icon;
  const isPopular = POPULAR_IDS.includes(s.id);
  const priceColor =
    tierId === "72hr"
      ? "text-navy-700"
      : tierId === "24hr"
      ? "text-emerald-600"
      : "text-orange-500";

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${s.name} — ₹${price} per ${s.unit.toLowerCase()}. ${selected ? "Selected" : "Not selected"}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative flex cursor-pointer items-center gap-4 rounded-2xl border bg-white px-4 py-3.5 transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600",
        selected
          ? "border-navy-300 shadow-[0_4px_18px_-8px_rgba(26,83,224,0.35)]"
          : "border-[#e8eef8] shadow-[0_1px_8px_-4px_rgba(15,43,120,0.10)] hover:border-navy-200",
      )}
    >
      {/* ── Left: service icon ── */}
      <span
        className={cn(
          "flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
          s.accent,
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      {/* ── Center: name / description / price ── */}
      <div className="min-w-0 flex-1">
        {/* Name row + POPULAR badge */}
        <div className="flex flex-wrap items-center gap-2 leading-tight">
          <span className="text-[15px] font-bold text-navy-950">{s.name}</span>
          {isPopular && (
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
              POPULAR
            </span>
          )}
        </div>

        {/* Description — up to 2 lines */}
        <p className="mt-0.5 text-[12px] leading-snug text-navy-900/55 line-clamp-2">
          {s.tagline}
        </p>

        {/* Price */}
        <motion.p
          key={`${s.id}-${tierId}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1"
        >
          <span className="text-[12px] text-navy-900/50">From </span>
          <span className={cn("text-[14px] font-extrabold", priceColor)}>
            ₹{price}
          </span>
          <span className="text-[12px] text-navy-900/50"> / {s.unit.toLowerCase()}</span>
        </motion.p>
      </div>

      {/* ── Right: qty controls ── */}
      <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
        <QtyStepper qty={qty} onChange={onQty} />
      </div>

      {/* ── Top-right: selected checkmark ── */}
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 480, damping: 22 }}
            className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-leaf-500 text-white shadow"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Collapsible bottom summary bar ──────────────────────────────────────────

function SummaryBar({
  itemCount,
  tierLabel,
  total,
  subtotal,
  deliveryFee,
}: {
  itemCount: number;
  tierLabel: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-ice-200 bg-white shadow-[0_4px_18px_-10px_rgba(15,43,120,0.18)]">
      {/* Summary row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        {/* Basket icon */}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50">
          <ShoppingBasket className="h-5 w-5 text-navy-600" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-navy-900">
            {itemCount > 0 ? `${itemCount} Items Selected` : "0 Items Selected"}
          </p>
          <p className="text-[11.5px] text-navy-900/50">
            {itemCount > 0
              ? `${tierLabel} delivery · ${deliveryFee === 0 ? "Free delivery" : `+₹${deliveryFee} delivery`}`
              : "Add services and quantity to see order summary"}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[11px] font-semibold text-navy-900/50 uppercase tracking-wide">
            Total Amount
          </p>
          <motion.p
            key={total}
            initial={{ scale: 0.88, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="font-display text-[20px] font-extrabold text-navy-900"
          >
            ₹{total}
          </motion.p>
        </div>

        <ChevronDown
          className={cn(
            "ml-1 h-4 w-4 shrink-0 text-navy-400 transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {/* Expandable detail */}
      <AnimatePresence>
        {open && itemCount > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ice-200"
          >
            <div className="space-y-1.5 px-4 py-3 text-[13px]">
              <div className="flex justify-between text-navy-900/60">
                <span>Subtotal</span>
                <span className="font-semibold text-navy-900">{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-navy-900/60">
                <span>Delivery</span>
                <span className={cn("font-semibold", deliveryFee === 0 ? "text-leaf-600" : "text-navy-900")}>
                  {deliveryFee === 0 ? "FREE" : inr(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-dashed border-ice-300 pt-1.5 font-bold text-navy-900">
                <span>Total</span>
                <span>{inr(total)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ServiceSelector({
  onNext,
}: {
  onBack?: () => void;
  onNext: () => void;
}) {
  const { qtyOf, setQty, itemCount, subtotal, deliveryFee, total } = useBooking();
  const [tierId, setTierId] = useState<DeliveryTierId>("72hr");

  const tier = deliveryTiers.find((t) => t.id === tierId)!;

  const effectivePrice = (id: ServiceId) =>
    Math.round(serviceMap[id].price * tier.multiplier);

  const toggle = (id: ServiceId) => {
    const qty = qtyOf(id);
    if (qty > 0) setQty(id, 0);
    else setQty(id, serviceMap[id].defaultQty || 1);
  };

  return (
    <div>
      {/* Promotional Notice */}
      <div className="mb-4 sm:mb-5 flex items-center gap-2.5 rounded-2xl border border-leaf-200 bg-leaf-50/80 px-3.5 py-2.5 text-[12.5px] sm:text-[13.5px] font-semibold text-leaf-800 shadow-sm">
        <Truck className="h-4 w-4 shrink-0 text-leaf-600" aria-hidden="true" />
        <span>Enjoy free pickup and delivery on orders above ₹300.</span>
      </div>

      {/* Delivery tier selector */}
      <DeliveryTabs selected={tierId} onSelect={setTierId} />

      {/* ── Mobile rows (< sm) ── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {services.map((s, i) => (
          <ServiceRow
            key={s.id}
            s={s}
            qty={qtyOf(s.id)}
            selected={qtyOf(s.id) > 0}
            price={effectivePrice(s.id)}
            tierId={tierId}
            onToggle={() => toggle(s.id)}
            onQty={(q) => setQty(s.id, q)}
            index={i}
          />
        ))}
      </div>

      {/* ── Desktop / tablet grid (sm+) ── */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {services.map((s, i) => (
          <DesktopServiceCard
            key={s.id}
            s={s}
            qty={qtyOf(s.id)}
            selected={qtyOf(s.id) > 0}
            price={effectivePrice(s.id)}
            tierId={tierId}
            onToggle={() => toggle(s.id)}
            onQty={(q) => setQty(s.id, q)}
            index={i}
          />
        ))}
      </div>

      {/* Collapsible summary bar */}
      <SummaryBar
        itemCount={itemCount}
        tierLabel={tier.label}
        total={total}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
      />

      {/* Navigation buttons */}
      <div className="mt-5 flex items-center justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={itemCount === 0}
          className="btn-primary group w-full sm:w-auto px-8 py-3.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          Next: Choose Time
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
