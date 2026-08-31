import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Loader2, MapPin, Navigation, Phone, StickyNote, User } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { useBooking } from "@/booking/BookingContext";
import { cn } from "@/utils/cn";

type Errors = Partial<
  Record<"name" | "phone" | "flat" | "street" | "city" | "pincode", string>
>;

function digitOnly(v: string) {
  return v.replace(/\D/g, "").slice(0, 10);
}

/** Assembles the full address string from structured sub-fields */
function buildAddress(flat: string, street: string, landmark: string, city: string) {
  return [flat.trim(), street.trim(), landmark.trim(), city.trim()]
    .filter(Boolean)
    .join(", ");
}

export function PickupDetails({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack?: () => void;
}) {
  const { pickup, setPickup, notes, setNotes } = useBooking();
  const [errors, setErrors] = useState<Errors>({});
  const [shake, setShake] = useState(0);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const validate = () => {
    const e: Errors = {};
    if (pickup.name.trim().length < 3) e.name = "Enter your full name";
    const d = pickup.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(d)) e.phone = "Enter a valid 10-digit mobile number";
    if (pickup.flat.trim().length < 2) e.flat = "Enter house / flat / building number";
    if (pickup.street.trim().length < 3) e.street = "Enter street or area name";
    if (pickup.city.trim().length < 2) e.city = "Enter city name";

    const isHydPincode = /^(500|501|502)\d{3}$/.test(pickup.pincode.trim());
    const hydAreas = [
      "hyderabad", "secunderabad", "gachibowli", "hitech", "hi-tech", "madhapur",
      "kondapur", "jubilee hills", "banjara hills", "kukatpally", "kphb", "miyapur",
      "ameerpet", "begumpet", "somajiguda", "panjagutta", "mehdipatnam", "tolichowki",
      "manikonda", "uppal", "dilsukhnagar", "lb nagar", "tarnaka", "habsiguda",
      "ecil", "malkajgiri", "bowenpally", "alwal", "kompally", "shamshabad", "attapur",
    ];
    const fullAddr = buildAddress(pickup.flat, pickup.street, pickup.landmark, pickup.city).toLowerCase();
    const hasHydArea = hydAreas.some((a) => fullAddr.includes(a));
    if (!isHydPincode && !hasHydArea) {
      e.city = "Only Hyderabad city locations are accepted";
    }

    if (!/^\d{6}$/.test(pickup.pincode.trim())) e.pincode = "Enter a 6-digit pincode";
    return e;
  };

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } },
          );
          const data = await res.json();
          const addr = data.address ?? {};
          setPickup({
            ...pickup,
            flat: addr.house_number ? `${addr.house_number}` : pickup.flat,
            street: addr.road || addr.suburb || addr.neighbourhood || pickup.street,
            landmark: addr.amenity || addr.shop || addr.tourism || pickup.landmark,
            city:
              addr.city || addr.town || addr.county || addr.state_district || pickup.city,
            pincode: addr.postcode ? addr.postcode.replace(/\D/g, "").slice(0, 6) : pickup.pincode,
            address: buildAddress(
              addr.house_number ?? pickup.flat,
              addr.road || addr.suburb || pickup.street,
              addr.amenity || pickup.landmark,
              addr.city || addr.town || pickup.city,
            ),
          });
        } catch {
          setLocError("Could not fetch address. Please fill manually.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setLocError("Location access denied. Please allow location or fill manually.");
      },
      { timeout: 10000 },
    );
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      setShake((s) => s + 1);
      return;
    }
    const assembled = buildAddress(pickup.flat, pickup.street, pickup.landmark, pickup.city);
    setPickup({
      ...pickup,
      phone: digitOnly(pickup.phone),
      pincode: pickup.pincode.trim(),
      address: assembled,
    });
    onNext();
  };

  return (
    <form onSubmit={submit} noValidate aria-label="Pickup details form">
      <motion.div
        key={shake}
        initial={shake ? { x: 0 } : false}
        animate={shake ? { x: [0, -8, 8, -5, 5, 0] } : {}}
        transition={{ duration: 0.42 }}
        className="grid gap-5 sm:grid-cols-2"
      >
        {/* Full Name */}
        <Field
          id="name"
          label="Full Name"
          icon={<User className="h-4 w-4" aria-hidden="true" />}
          error={errors.name}
        >
          <input
            id="name"
            autoComplete="name"
            className={cn("field", errors.name && "field-error")}
            placeholder="Ananya Sharma"
            value={pickup.name}
            onChange={(e) => setPickup({ ...pickup, name: e.target.value })}
          />
        </Field>

        {/* Phone */}
        <Field
          id="phone"
          label="Phone Number"
          icon={<Phone className="h-4 w-4" aria-hidden="true" />}
          error={errors.phone}
        >
          <input
            id="phone"
            inputMode="numeric"
            autoComplete="tel"
            className={cn("field", errors.phone && "field-error")}
            placeholder="94949 13323"
            value={pickup.phone}
            onChange={(e) => setPickup({ ...pickup, phone: e.target.value })}
          />
        </Field>

        {/* ── Pickup Address section ──────────────────────────── */}
        <div className="sm:col-span-2">
          {/* Section header */}
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900">
              <MapPin className="h-4 w-4 text-navy-500" aria-hidden="true" />
              Pickup Address
            </span>

            {/* GPS Button */}
            <motion.button
              type="button"
              onClick={handleGPS}
              disabled={locating}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-navy-50 px-3.5 py-1.5 text-[12.5px] font-bold text-navy-700 transition-all duration-200 hover:border-navy-400 hover:bg-navy-100 disabled:opacity-60"
            >
              {locating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {locating ? "Locating…" : "Use my current location"}
            </motion.button>
          </div>

          {/* GPS error */}
          <AnimatePresence>
            {locError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[12.5px] font-medium text-red-600"
                role="alert"
              >
                {locError}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* House / Flat */}
            <Field
              id="flat"
              label="House / Flat / Building No."
              icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
              error={errors.flat}
            >
              <input
                id="flat"
                autoComplete="address-line1"
                className={cn("field", errors.flat && "field-error")}
                placeholder="Flat 402, Block B"
                value={pickup.flat}
                onChange={(e) => setPickup({ ...pickup, flat: e.target.value })}
              />
            </Field>

            {/* Street / Area */}
            <Field
              id="street"
              label="Street / Area"
              icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
              error={errors.street}
            >
              <input
                id="street"
                autoComplete="address-line2"
                className={cn("field", errors.street && "field-error")}
                placeholder="Road No 5, Jubilee Hills"
                value={pickup.street}
                onChange={(e) => setPickup({ ...pickup, street: e.target.value })}
              />
            </Field>

            {/* Landmark */}
            <Field
              id="landmark"
              label={
                <>
                  Landmark{" "}
                  <span className="font-normal text-navy-900/40">(optional)</span>
                </>
              }
              icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
            >
              <input
                id="landmark"
                autoComplete="off"
                className="field"
                placeholder="Near Apollo Hospital"
                value={pickup.landmark}
                onChange={(e) => setPickup({ ...pickup, landmark: e.target.value })}
              />
            </Field>

            {/* City */}
            <Field
              id="city"
              label="City"
              icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
              error={errors.city}
            >
              <input
                id="city"
                autoComplete="address-level2"
                className={cn("field", errors.city && "field-error")}
                placeholder="Hyderabad"
                value={pickup.city}
                onChange={(e) => setPickup({ ...pickup, city: e.target.value })}
              />
            </Field>
          </div>
        </div>

        {/* Pincode */}
        <Field
          id="pincode"
          label="Pincode"
          icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
          error={errors.pincode}
        >
          <input
            id="pincode"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            className={cn("field", errors.pincode && "field-error")}
            placeholder="500033"
            value={pickup.pincode}
            onChange={(e) =>
              setPickup({ ...pickup, pincode: e.target.value.replace(/\D/g, "") })
            }
          />
        </Field>

        {/* Delivery Notes */}
        <div className="flex flex-col justify-end">
          <label htmlFor="notes" className="field-label">
            <span className="inline-flex items-center gap-1.5">
              <StickyNote className="h-4 w-4 text-navy-400" aria-hidden="true" />
              Delivery notes{" "}
              <span className="font-normal text-navy-900/40">(optional)</span>
            </span>
          </label>
          <input
            id="notes"
            className="field"
            placeholder="Separate whites, use mild detergent…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5">
        <button type="submit" className="btn-primary group w-full sm:w-auto px-7 py-3.5">
          Next: Select Services
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </button>
        <p className="text-[13px] text-navy-900/55">
          Your details are used only for this pickup.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label: ReactNode;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-navy-400">{icon}</span>
          {label}
        </span>
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[12.5px] font-medium text-red-600"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
