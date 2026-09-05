import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Layers,
  Minus,
  Plus,
  Shirt,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/booking/BookingContext";
import { CompactStickyBottomBar } from "@/booking/CompactStickyBottomBar";
import {
  inr,
  serviceMap,
  getServiceRate,
  services,
  type DeliveryTierId,
  type ServiceId,
} from "@/data/site";
import { cn } from "@/utils/cn";

// Popular badge service IDs
const POPULAR_IDS: ServiceId[] = ["premium-wash"];

// ─── Touch-Friendly Quantity Stepper (Matches Screenshot) ───────────────────

function QtyStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (q: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-1.5 xs:gap-2 select-none"
      role="group"
      aria-label="Quantity selector"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(0, qty - 1))}
        disabled={qty <= 0}
        aria-label="Decrease quantity"
        style={{ touchAction: "manipulation" }}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-150 active:scale-90",
          qty > 0
            ? "border-gray-200 bg-[#f8fafc] text-gray-700 hover:border-gray-400"
            : "border-gray-200 bg-[#f8fafc]/60 text-gray-300 cursor-not-allowed opacity-60",
        )}
      >
        <Minus className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
      </button>

      <span
        className="min-w-[1.5rem] xs:min-w-[1.75rem] text-center font-display text-[16px] xs:text-[17px] font-extrabold text-[#0c1e40]"
        aria-live="polite"
      >
        {qty}
      </span>

      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        style={{ touchAction: "manipulation" }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a56db] text-white shadow-xs transition-all duration-150 active:scale-90 hover:bg-[#1e40af]"
      >
        <Plus className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Duration Selection (3 equal-width cards in ONE ROW on mobile) ───────────

function DurationCards({
  selectedDuration,
  onSelectDuration,
  isSteamIronActive,
}: {
  selectedDuration: string;
  onSelectDuration: (durationLabel: string) => void;
  isSteamIronActive: boolean;
}) {
  const durationOptions = [
    {
      id: "72hr" as DeliveryTierId,
      hours: "72 HOURS",
      label: "72 Hours",
      badge: "REGULAR",
      badgeClass: "bg-[#1a56db] text-white",
      price: isSteamIronActive ? 120 : 80,
    },
    {
      id: "24hr" as DeliveryTierId,
      hours: "24 HOURS",
      label: "24 Hours",
      badge: "EXPRESS",
      badgeClass: "bg-[#059669] text-white",
      price: isSteamIronActive ? 200 : 150,
    },
    {
      id: "12hr" as DeliveryTierId,
      hours: "12 HOURS",
      label: "12 Hours",
      badge: "EXPRESS FAST",
      badgeClass: "bg-[#ea580c] text-white",
      price: isSteamIronActive ? 250 : 180,
    },
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-[#1a56db] text-[#1a56db]">
          <Clock className="h-2.5 w-2.5 stroke-[2.5]" aria-hidden="true" />
        </div>
        <h2 className="text-[13.5px] xs:text-[14.5px] sm:text-[15px] font-bold text-[#0c1e40]">
          Choose your delivery time
        </h2>
      </div>

      <div
        className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3"
        role="radiogroup"
        aria-label="Choose your delivery time"
      >
        {durationOptions.map((opt) => {
          const active = selectedDuration === opt.label;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelectDuration(opt.label)}
              className={cn(
                "relative flex flex-col items-center justify-between rounded-xl sm:rounded-2xl border-2 px-1 py-2.5 xs:px-2 xs:py-3 sm:px-3 sm:py-4 text-center transition-all duration-200 cursor-pointer w-full min-w-0",
                active
                  ? "border-[#1a56db] bg-[#eff6ff] shadow-xs ring-1 ring-[#1a56db]/20"
                  : "border-[#e2e8f0] bg-white hover:border-gray-300",
              )}
            >
              {/* Checkmark badge on active card */}
              {active && (
                <span className="absolute -top-1.5 -right-1.5 xs:-top-2 xs:-right-2 flex h-4 w-4 xs:h-5 xs:w-5 items-center justify-center rounded-full bg-[#1a56db] text-white shadow-xs">
                  <Check className="h-2.5 w-2.5 xs:h-3 xs:w-3 stroke-[3]" aria-hidden="true" />
                </span>
              )}

              {/* Clock Icon */}
              <Clock className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 text-[#1a56db] stroke-[2] mb-1" aria-hidden="true" />

              {/* Hours Title */}
              <span className="font-display text-[11px] xs:text-[12.5px] sm:text-[14.5px] font-black tracking-tight text-[#0c1e40] uppercase leading-none truncate max-w-full">
                {opt.hours}
              </span>

              {/* Badge */}
              <span
                className={cn(
                  "my-1.5 rounded-full px-1.5 xs:px-2 py-0.5 text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider leading-none shadow-xs truncate max-w-full",
                  opt.badgeClass,
                )}
              >
                {opt.badge}
              </span>

              {/* Dynamic Price */}
              <p className="font-display leading-none">
                <span className="text-[13px] xs:text-[14px] sm:text-[16px] font-black text-[#1a56db]">
                  ₹{opt.price}
                </span>{" "}
                <span className="text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] text-gray-500 font-semibold">
                  /kg
                </span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Primary Service Card (Matches Screenshot) ───────────────────────────────

function PrimaryServiceCard({
  s,
  qty,
  price,
  onQty,
  onFocus,
}: {
  s: (typeof services)[0];
  qty: number;
  price: number;
  onQty: (q: number) => void;
  onFocus: () => void;
}) {
  const isWashFold = s.id === "wash-fold";

  return (
    <div
      onClick={onFocus}
      className={cn(
        "rounded-2xl border transition-all duration-200 p-3.5 xs:p-4 bg-white flex items-center justify-between gap-3 shadow-xs",
        qty > 0 ? "border-gray-300" : "border-[#e2e8f0] hover:border-gray-300",
      )}
    >
      {/* Left icon with custom rounded badge */}
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-xs",
          isWashFold ? "bg-[#1a56db]" : "bg-[#0284c7]",
        )}
      >
        {isWashFold ? (
          <Shirt className="h-6 w-6 stroke-[2]" aria-hidden="true" />
        ) : (
          <Layers className="h-6 w-6 stroke-[2]" aria-hidden="true" />
        )}
      </div>

      {/* Middle info */}
      <div className="min-w-0 flex-1">
        <h3 className="text-[14.5px] xs:text-[15px] sm:text-base font-bold text-[#0c1e40] leading-tight">
          {s.name}
        </h3>
        <p className="mt-0.5 text-[11.5px] xs:text-[12px] text-gray-500 font-medium leading-snug">
          {s.tagline}
        </p>
        <p className="mt-1 text-[11.5px] xs:text-[12px] text-gray-500 font-medium">
          From{" "}
          <span className="text-[14px] xs:text-[14.5px] font-black text-[#1a56db]">
            ₹{price}
          </span>{" "}
          /kg
        </p>
      </div>

      {/* Right Stepper */}
      <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
        <QtyStepper qty={qty} onChange={onQty} />
      </div>
    </div>
  );
}

// ─── Special Service Card (Collapsible secondary care) ───────────────────────

function SpecialServiceCard({
  s,
  qty,
  price,
  onQty,
}: {
  s: (typeof services)[0];
  qty: number;
  price: number;
  onQty: (q: number) => void;
}) {
  const Icon = s.icon;
  const isPopular = POPULAR_IDS.includes(s.id);

  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3 xs:p-3.5 flex items-center justify-between gap-3 shadow-xs">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-xs",
          s.accent,
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4 className="text-[13.5px] font-bold text-[#0c1e40] truncate">
            {s.name}
          </h4>
          {isPopular && (
            <span className="rounded-full bg-purple-100 px-1.5 py-0.2 text-[8.5px] font-extrabold text-purple-700">
              POPULAR
            </span>
          )}
        </div>
        <p className="text-[11.5px] font-extrabold text-[#1a56db]">
          ₹{price} / {s.unit.toLowerCase()}
        </p>
      </div>

      <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
        <QtyStepper qty={qty} onChange={onQty} />
      </div>
    </div>
  );
}

// ─── Main ServiceSelector Component ──────────────────────────────────────────

export function ServiceSelector({
  onNext,
}: {
  onNext: () => void;
}) {
  const {
    qtyOf,
    setQty,
    itemCount,
    discount,
    total,
    selectedDuration,
    setSelectedDuration,
  } = useBooking();

  const [focusedService, setFocusedService] = useState<string>("Wash & Fold");
  const [showMoreServices, setShowMoreServices] = useState(false);

  // Dynamic check: Is Wash & Steam Iron currently active?
  const steamIronQty = qtyOf("wash-steam-iron");
  const washFoldQty = qtyOf("wash-fold");
  const isSteamIronActive =
    (steamIronQty > 0 && washFoldQty === 0) || focusedService === "Wash & Steam Iron";

  // Calculate dynamic price per service based on selectedDuration
  const getDynamicPrice = (id: ServiceId) => {
    const s = serviceMap[id];
    return getServiceRate(selectedDuration, s.name, s.price);
  };

  const primaryServices = services.filter(
    (s) => s.id === "wash-fold" || s.id === "wash-steam-iron",
  );

  const specialServices = services.filter(
    (s) => s.id !== "wash-fold" && s.id !== "wash-steam-iron",
  );

  return (
    <div className="pb-32 sm:pb-4">
      {/* ── DISCOUNT BANNER (Matches Screenshot with 3D Gift Box) ── */}
      <div className="mb-5 rounded-2xl bg-[#eff6ff] border border-[#dbeafe] p-3.5 sm:p-4 flex items-center gap-3.5">
        {/* 3D Gift Box Icon Illustration */}
        <div className="flex h-12 w-12 xs:h-14 xs:w-14 shrink-0 items-center justify-center">
          <svg viewBox="0 0 64 64" className="h-12 w-12 xs:h-14 xs:w-14 drop-shadow-md" fill="none">
            {/* Box Body */}
            <rect x="12" y="24" width="40" height="32" rx="4" fill="#EF4444" />
            <rect x="12" y="24" width="40" height="7" fill="#DC2626" />
            {/* Lid */}
            <rect x="9" y="18" width="46" height="10" rx="3" fill="#F87171" />
            {/* Vertical Ribbon */}
            <rect x="28" y="18" width="8" height="38" fill="#FBBF24" />
            {/* Horizontal Ribbon */}
            <rect x="12" y="36" width="40" height="7" fill="#FBBF24" />
            <rect x="9" y="22" width="46" height="4" fill="#F59E0B" />
            {/* Bow loops */}
            <path
              d="M32 18 C26 9 16 9 22 18 Z"
              fill="#FCD34D"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            <path
              d="M32 18 C38 9 48 9 42 18 Z"
              fill="#FCD34D"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            <circle cx="32" cy="18" r="3.5" fill="#F59E0B" />
          </svg>
        </div>

        {/* Text and Badge */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#1a56db] leading-tight">
            GET 10% OFF
          </h3>
          <p className="text-[12px] xs:text-[12.5px] sm:text-[13px] text-gray-600 font-medium leading-tight mt-0.5">
            Orders above ₹1,000 get an automatic 10% discount.
          </p>
          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] text-[#15803d] px-2.5 py-0.5 text-[11px] font-bold">
              <Truck className="h-3.5 w-3.5" aria-hidden="true" />
              Free delivery above ₹399
            </span>
          </div>
        </div>
      </div>

      {/* ── DURATION SELECTION (3 equal-width cards in ONE ROW on mobile) ── */}
      <DurationCards
        selectedDuration={selectedDuration}
        onSelectDuration={setSelectedDuration}
        isSteamIronActive={isSteamIronActive}
      />

      {/* ── PRIMARY SERVICE CARDS ── */}
      <div className="space-y-3 sm:space-y-4">
        {primaryServices.map((s) => (
          <PrimaryServiceCard
            key={s.id}
            s={s}
            qty={qtyOf(s.id)}
            price={getDynamicPrice(s.id)}
            onQty={(q) => setQty(s.id, q, selectedDuration)}
            onFocus={() => setFocusedService(s.name)}
          />
        ))}
      </div>

      {/* ── SPECIAL CARE & DRY CLEANING (Secondary Care) ── */}
      <div className="mt-5 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setShowMoreServices((v) => !v)}
          className="flex w-full items-center justify-between text-left text-[13px] font-bold text-gray-600 hover:text-[#0c1e40] transition-colors py-1 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            Special Care &amp; Dry Cleaning
            <span className="text-[11px] font-normal text-gray-400">
              ({specialServices.length} additional services)
            </span>
          </span>
          <span className="text-xs font-bold text-[#1a56db] bg-[#eff6ff] border border-[#dbeafe] rounded-lg px-2.5 py-1">
            {showMoreServices ? "Hide" : "Show More"}
          </span>
        </button>

        <AnimatePresence>
          {showMoreServices && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-3 space-y-2.5"
            >
              {specialServices.map((s) => (
                <SpecialServiceCard
                  key={s.id}
                  s={s}
                  qty={qtyOf(s.id)}
                  price={getDynamicPrice(s.id)}
                  onQty={(q) => setQty(s.id, q, selectedDuration)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DESKTOP NEXT BUTTON (sm+ screens) ── */}
      <div className="mt-6 hidden sm:flex items-center justify-between border-t border-gray-200 pt-5">
        <div>
          {itemCount > 0 ? (
            <p className="text-sm font-bold text-[#0c1e40]">
              {itemCount} units selected · Total:{" "}
              <span className="text-[#16a34a] font-black text-lg">{inr(total)}</span>
              {discount > 0 && (
                <span className="ml-2 text-xs font-extrabold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                  10% OFF Applied (-{inr(discount)})
                </span>
              )}
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              Please select at least 1 service quantity to continue
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={itemCount === 0}
          className="btn-primary group px-8 py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
          <ArrowRight
            className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ── FLOATING COMPACT STICKY BOTTOM BAR (Mobile) ── */}
      <CompactStickyBottomBar onContinue={onNext} buttonLabel="Continue" />
    </div>
  );
}
