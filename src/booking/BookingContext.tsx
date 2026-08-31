import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultCart,
  serviceMap,
  DELIVERY_FEE,
  FREE_DELIVERY_ABOVE,
  type CartLine,
  type ServiceId,
} from "@/data/site";

type Pickup = {
  name: string;
  phone: string;
  // Structured address sub-fields
  flat: string;
  street: string;
  landmark: string;
  city: string;
  // Assembled full address string (used in OrderSummary / WhatsApp)
  address: string;
  pincode: string;
};

const emptyPickup: Pickup = {
  name: "",
  phone: "",
  flat: "",
  street: "",
  landmark: "",
  city: "",
  address: "",
  pincode: "",
};

export type BookingState = {
  step: number;
  pickup: Pickup;
  cart: CartLine[];
  date: string | null;
  slot: string | null;
  notes: string;
};

type Ctx = {
  step: number;
  pickup: Pickup;
  cart: CartLine[];
  date: string | null;
  slot: string | null;
  notes: string;
  qtyOf: (id: ServiceId) => number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  setStep: (s: number) => void;
  setPickup: (p: Pickup) => void;
  setQty: (id: ServiceId, qty: number) => void;
  setDate: (d: string) => void;
  setSlot: (s: string) => void;
  setNotes: (n: string) => void;
  reset: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "uls_booking_state_v1";

const initial: BookingState = {
  step: 0,
  pickup: emptyPickup,
  cart: defaultCart,
  date: null,
  slot: null,
  notes: "",
};

function loadSavedState(): BookingState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          step: typeof parsed.step === "number" ? Math.max(0, Math.min(3, parsed.step)) : 0,
          pickup:
            parsed.pickup && typeof parsed.pickup === "object"
              ? { ...emptyPickup, ...parsed.pickup }
              : emptyPickup,
          cart:
            Array.isArray(parsed.cart) && parsed.cart.length > 0
              ? parsed.cart
              : defaultCart,
          date: typeof parsed.date === "string" ? parsed.date : null,
          slot: typeof parsed.slot === "string" ? parsed.slot : null,
          notes: typeof parsed.notes === "string" ? parsed.notes : "",
        };
      }
    }
  } catch {
    // fallback
  }
  return initial;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(loadSavedState);

  // Sync state to sessionStorage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const setQty = useCallback((id: ServiceId, qty: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((l) =>
        l.id === id ? { ...l, qty: Math.max(0, Math.min(99, qty)) } : l,
      ),
    }));
  }, []);

  const reset = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setState(initial);
  }, []);

  const value = useMemo<Ctx>(() => {
    const subtotal = state.cart.reduce(
      (sum, line) => sum + (serviceMap[line.id]?.price ?? 0) * line.qty,
      0,
    );
    const itemCount = state.cart.reduce((s, l) => s + l.qty, 0);
    const deliveryFee =
      subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;

    return {
      ...state,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      itemCount,
      qtyOf: (id) => state.cart.find((l) => l.id === id)?.qty ?? 0,
      setStep: (step) => setState((p) => ({ ...p, step })),
      setPickup: (pickup) => setState((p) => ({ ...p, pickup })),
      setQty,
      setDate: (date) => setState((p) => ({ ...p, date })),
      setSlot: (slot) => setState((p) => ({ ...p, slot })),
      setNotes: (notes) => setState((p) => ({ ...p, notes })),
      reset,
    };
  }, [state, setQty, reset]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
