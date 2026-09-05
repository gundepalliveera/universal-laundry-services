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
  normalizeDuration,
  getServiceRate,
  getAvailableSlots,
  getDefaultDateAndSlot,
  timeSlots,
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
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  distanceKm?: number;
  serviceAvailable?: boolean;
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
  latitude: undefined,
  longitude: undefined,
  accuracy: undefined,
  distanceKm: undefined,
  serviceAvailable: undefined,
};

export type BookingState = {
  step: number;
  pickup: Pickup;
  cart: CartLine[];
  date: string | null;
  slot: string | null;
  notes: string;
  selectedDuration: string;
  orderConfirmed: boolean;
};

type Ctx = {
  step: number;
  pickup: Pickup;
  cart: CartLine[];
  date: string | null;
  slot: string | null;
  notes: string;
  selectedDuration: string;
  orderConfirmed: boolean;
  qtyOf: (id: ServiceId) => number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  setStep: (s: number) => void;
  setPickup: (p: Pickup | ((prev: Pickup) => Pickup)) => void;
  setQty: (id: ServiceId, qty: number, duration?: string) => void;
  setSelectedDuration: (d: string) => void;
  setItemDuration: (id: ServiceId, duration: string) => void;
  getItemRate: (line: CartLine) => number;
  getItemTotal: (line: CartLine) => number;
  setDate: (d: string) => void;
  setSlot: (s: string) => void;
  setNotes: (n: string) => void;
  setOrderConfirmed: (c: boolean) => void;
  navigateToStep: (targetStep: number) => void;
  handleBack: () => void;
  reset: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "uls_booking_state_v1";

const defInitial = getDefaultDateAndSlot();

const initial: BookingState = {
  step: 0,
  pickup: emptyPickup,
  cart: defaultCart.map((l) => ({ ...l, qty: 0 })),
  date: defInitial.date,
  slot: defInitial.slot,
  notes: "",
  selectedDuration: "72 Hours",
  orderConfirmed: false,
};

function loadSavedState(): BookingState {
  const def = getDefaultDateAndSlot();
  const fallback: BookingState = {
    ...initial,
    date: def.date,
    slot: def.slot,
    orderConfirmed: false,
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        let validDate: string | null = null;
        let validSlot: string | null = null;

        if (typeof parsed.date === "string" && parsed.date) {
          const availableForDate = getAvailableSlots(parsed.date);
          if (availableForDate.length > 0) {
            validDate = parsed.date;
            if (
              typeof parsed.slot === "string" &&
              availableForDate.includes(parsed.slot)
            ) {
              validSlot = parsed.slot;
            } else {
              validSlot = availableForDate[0];
            }
          }
        } else if (parsed.date === undefined) {
          validDate = def.date;
          validSlot = def.slot;
        }

        return {
          step: typeof parsed.step === "number" ? Math.max(0, Math.min(3, parsed.step)) : 0,
          pickup:
            parsed.pickup && typeof parsed.pickup === "object"
              ? { ...emptyPickup, ...parsed.pickup }
              : emptyPickup,
          cart:
            Array.isArray(parsed.cart) && parsed.cart.length > 0
              ? parsed.cart
              : defaultCart.map((l) => ({ ...l, qty: 0 })),
          date: validDate,
          slot: validSlot,
          notes: typeof parsed.notes === "string" ? parsed.notes : "",
          selectedDuration:
            typeof parsed.selectedDuration === "string" && parsed.selectedDuration
              ? normalizeDuration(parsed.selectedDuration)
              : "72 Hours",
          orderConfirmed: false,
        };
      }
    }
  } catch {
    // fallback
  }
  return fallback;
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

  const setQty = useCallback((id: ServiceId, qty: number, duration?: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((l) =>
        l.id === id
          ? {
              ...l,
              qty: Math.max(0, Math.min(99, qty)),
              ...(duration ? { duration: normalizeDuration(duration) } : {}),
            }
          : l,
      ),
    }));
  }, []);

  const setSelectedDuration = useCallback((duration: string) => {
    const norm = normalizeDuration(duration);
    setState((prev) => ({
      ...prev,
      selectedDuration: norm,
      cart: prev.cart.map((line) => ({
        ...line,
        duration: norm,
      })),
    }));
  }, []);

  const setItemDuration = useCallback((id: ServiceId, duration: string) => {
    const norm = normalizeDuration(duration);
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((l) => (l.id === id ? { ...l, duration: norm } : l)),
    }));
  }, []);

  const getItemRate = useCallback(
    (line: CartLine) => {
      const s = serviceMap[line.id];
      if (!s) return 0;
      const dur = line.duration || state.selectedDuration || "72 Hours";
      return getServiceRate(dur, s.name, s.price);
    },
    [state.selectedDuration],
  );

  const getItemTotal = useCallback(
    (line: CartLine) => {
      const rate = getItemRate(line);
      const qty = Number(line.qty) || 0;
      return qty * rate;
    },
    [getItemRate],
  );

  const setDate = useCallback((date: string) => {
    const availableSlots = getAvailableSlots(date);
    const firstAvailable = availableSlots[0] || timeSlots[0];
    setState((p) => ({
      ...p,
      date,
      slot: firstAvailable,
    }));
  }, []);

  const setSlot = useCallback((slot: string) => {
    setState((p) => ({ ...p, slot }));
  }, []);

  const setOrderConfirmed = useCallback((orderConfirmed: boolean) => {
    setState((p) => ({ ...p, orderConfirmed }));
  }, []);

  const reset = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    const def = getDefaultDateAndSlot();
    setState({
      step: 0,
      pickup: emptyPickup,
      cart: defaultCart.map((l) => ({ ...l, qty: 0 })),
      date: def.date,
      slot: def.slot,
      notes: "",
      selectedDuration: "72 Hours",
      orderConfirmed: false,
    });
  }, []);

  const navigateToStep = useCallback((targetStep: number) => {
    setState((prev) => {
      return {
        ...prev,
        step: targetStep,
        orderConfirmed: false,
      };
    });
  }, []);

  const handleBack = useCallback(() => {
    setState((prev) => {
      if (prev.step === 3) {
        // Step 4 → Step 3:
        // - Keep selected services, quantities, duration, pickup date & time for editing
        return {
          ...prev,
          step: 2,
          orderConfirmed: false,
        };
      }
      if (prev.step === 2) {
        // Step 3 → Step 2:
        // - Return to Select Services
        // - Preserve pickup details, selected services, quantities, duration, and date/slot
        return {
          ...prev,
          step: 1,
          orderConfirmed: false,
        };
      }
      if (prev.step === 1) {
        // Step 2 → Step 1:
        // - Return to Pickup Details
        // - Preserve name, phone, address, GPS location, services, and duration
        return {
          ...prev,
          step: 0,
          orderConfirmed: false,
        };
      }
      return prev;
    });
  }, []);

  const subtotal = useMemo(() => {
    return state.cart.reduce((sum, line) => {
      const qty = Number(line.qty) || 0;
      if (qty <= 0) return sum;
      const s = serviceMap[line.id];
      if (!s) return sum;
      const dur = line.duration || state.selectedDuration || "72 Hours";
      const rate = getServiceRate(dur, s.name, s.price);
      return sum + qty * rate;
    }, 0);
  }, [state.cart, state.selectedDuration]);

  const itemCount = useMemo(() => {
    return state.cart.reduce((sum, l) => sum + (Number(l.qty) || 0), 0);
  }, [state.cart]);

  const discount = subtotal >= 1000 ? Math.round(subtotal * 0.1) : 0;

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;

  const total = subtotal - discount + deliveryFee;

  const value = useMemo<Ctx>(() => {
    return {
      ...state,
      subtotal,
      discount,
      deliveryFee,
      total,
      itemCount,
      qtyOf: (id) => state.cart.find((l) => l.id === id)?.qty ?? 0,
      setStep: (step) => setState((p) => ({ ...p, step })),
      setPickup: (updater) =>
        setState((p) => ({
          ...p,
          pickup: typeof updater === "function" ? updater(p.pickup) : updater,
        })),
      setQty,
      setSelectedDuration,
      setItemDuration,
      getItemRate,
      getItemTotal,
      setDate,
      setSlot,
      setNotes: (notes) => setState((p) => ({ ...p, notes })),
      setOrderConfirmed,
      navigateToStep,
      handleBack,
      reset,
    };
  }, [
    state,
    subtotal,
    discount,
    deliveryFee,
    total,
    itemCount,
    setQty,
    setSelectedDuration,
    setItemDuration,
    getItemRate,
    getItemTotal,
    setDate,
    setSlot,
    setOrderConfirmed,
    navigateToStep,
    handleBack,
    reset,
  ]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
