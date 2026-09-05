import type { LucideIcon } from "lucide-react";
import {
  Crown,
  Footprints,
  Layers,
  Shirt,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export type ServiceId =
  | "wash-fold"
  | "wash-steam-iron"
  | "premium-wash"
  | "shoe-cleaning"
  | "bag-cleaning"
  | "dry-cleaning";

export type Service = {
  id: ServiceId;
  name: string;
  tagline: string;
  detail: string;
  price: number;
  unit: string;
  unitPlural: string;
  icon: LucideIcon;
  accent: string;
  defaultQty: number;
  turnaround: string;
  priceLabel?: string;
};

export type DeliveryTierId = "72hr" | "24hr" | "12hr";

export const servicePrices: Record<string, Record<string, number>> = {
  "72 Hours": {
    "Wash & Fold": 80,
    "Wash & Steam Iron": 120,
  },
  "12 Hours": {
    "Wash & Fold": 180,
    "Wash & Steam Iron": 250,
  },
  "24 Hours": {
    "Wash & Fold": 150,
    "Wash & Steam Iron": 200,
  },
};

export function normalizeDuration(duration?: string | null): string {
  if (!duration) return "72 Hours";
  const s = String(duration).trim().toLowerCase();
  if (s.includes("12")) return "12 Hours";
  if (s.includes("24")) return "24 Hours";
  return "72 Hours";
}

export function getServiceRate(
  selectedDuration: string,
  selectedService: string,
  basePrice: number = 0,
): number {
  const norm = normalizeDuration(selectedDuration);
  const rate = servicePrices[norm]?.[selectedService];
  if (rate !== undefined) {
    return rate;
  }
  // SPECIAL SERVICES such as Premium Wash, Shoe Cleaning, Bag Cleaning, and Dry Cleaning
  // must continue using their existing prices and calculation logic.
  return basePrice;
}

export const services: Service[] = [

  {
    id: "wash-fold",
    name: "Wash & Fold",
    tagline: "Clean, wash, dry and neatly folded.",
    detail:
      "Sorted by colour and fabric, washed in hygienic machines, tumble dried and folded into neat stacks.",
    price: 80,
    unit: "KG",
    unitPlural: "KG",
    icon: Shirt,
    accent: "from-navy-600 to-navy-800",
    defaultQty: 5,
    turnaround: "72 hrs",
  },
  {
    id: "wash-steam-iron",
    name: "Wash & Steam Iron",
    tagline: "Washed clean and steam pressed to perfection.",
    detail:
      "Full wash followed by professional steam ironing — crisp collars, sharp creases, fresh fragrance.",
    price: 120,
    unit: "KG",
    unitPlural: "KG",
    icon: Layers,
    accent: "from-sky-500 to-navy-700",
    defaultQty: 3,
    turnaround: "72 hrs",
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    tagline: "Gentle premium care for your finest garments.",
    detail:
      "Piece-by-piece premium wash with special fabric-safe detergents and meticulous handling.",
    price: 80,
    unit: "Piece",
    unitPlural: "Pieces",
    icon: Crown,
    accent: "from-amber-500 to-navy-700",
    defaultQty: 2,
    turnaround: "72 hrs",
  },
  {
    id: "shoe-cleaning",
    name: "Shoe Cleaning",
    tagline: "Deep clean for all types of shoes.",
    detail:
      "Sneakers, leather formals and sports shoes — deep cleaned, deodorised and laces brightened.",
    price: 149,
    unit: "Pair",
    unitPlural: "Pairs",
    icon: Footprints,
    accent: "from-emerald-500 to-navy-700",
    defaultQty: 1,
    turnaround: "72 hrs",
    priceLabel: "Starting ₹149",
  },
  {
    id: "bag-cleaning",
    name: "Bag Cleaning",
    tagline: "Special care for your luxury bags.",
    detail:
      "Hand-finished cleaning for leather, suede and canvas bags with conditioning and polish.",
    price: 149,
    unit: "Bag",
    unitPlural: "Bags",
    icon: ShoppingBag,
    accent: "from-purple-500 to-navy-700",
    defaultQty: 1,
    turnaround: "72 hrs",
    priceLabel: "Starting ₹149",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    tagline: "Expert care for delicate & designer fabrics.",
    detail:
      "Eco-solvent dry cleaning for suits, silk sarees, lehengas, coats and bridal couture.",
    price: 120,
    unit: "Piece",
    unitPlural: "Pieces",
    icon: Sparkles,
    accent: "from-blue-500 to-indigo-800",
    defaultQty: 2,
    turnaround: "72 hrs",
    priceLabel: "Starting ₹120",
  },
];

export const serviceMap: Record<ServiceId, Service> = services.reduce(
  (acc, s) => ({ ...acc, [s.id]: s }),
  {} as Record<ServiceId, Service>,
);

export type CartLine = { id: ServiceId; qty: number; duration?: string };

export const defaultCart: CartLine[] = [
  { id: "wash-fold", qty: 0 },
  { id: "wash-steam-iron", qty: 0 },
  { id: "premium-wash", qty: 0 },
  { id: "shoe-cleaning", qty: 0 },
  { id: "bag-cleaning", qty: 0 },
  { id: "dry-cleaning", qty: 0 },
];

export const featureCards = [
  {
    title: "100% Hygienic Process",
    body: "Segregated loads, sanitised machines and sealed packaging.",
    icon: "shield",
  },
  {
    title: "Quality Guaranteed",
    body: "Free re-wash if you are not happy with the finish.",
    icon: "badge",
  },
  {
    title: "Free Pickup & Delivery",
    body: "Doorstep service on all orders above ₹399.",
    icon: "truck",
  },
] as const;

export const howItWorks = [
  {
    step: "01",
    title: "Book Order",
    body: "Schedule a pickup at your convenience.",
    icon: "calendar",
  },
  {
    step: "02",
    title: "We Pickup",
    body: "Our executive will pickup your laundry.",
    icon: "package",
  },
  {
    step: "03",
    title: "We Clean",
    body: "Your clothes are cleaned with care & precision.",
    icon: "droplets",
  },
  {
    step: "04",
    title: "We Deliver",
    body: "Fresh, clean clothes delivered to your door.",
    icon: "home",
  },
] as const;

export const timeSlots = [
  "09:00 AM - 11:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
];

export const pricingPlans = [
  {
    name: "Regular — 72 Hours",
    price: 80,
    unit: "per KG (Wash & Fold)",
    summary: "Everyday laundry at the best price.",
    features: [
      "Wash & Fold — ₹80/KG",
      "Wash & Steam Iron — ₹120/KG",
      "Free pickup & delivery above ₹399",
      "72 hour turnaround",
    ],
    popular: false,
  },
  {
    name: "Express — 24 Hours",
    price: 150,
    unit: "per KG (Wash & Fold)",
    summary: "Next-day turnaround for your laundry.",
    features: [
      "Wash & Fold — ₹150/KG",
      "Wash & Steam Iron — ₹200/KG",
      "Available upon request",
      "Free re-wash guarantee",
    ],
    popular: false,
  },
  {
    name: "Express Fast — 12 Hours",
    price: 180,
    unit: "per KG (Wash & Fold)",
    summary: "Urgent orders ready in just 12 hours.",
    features: [
      "Wash & Fold — ₹180/KG",
      "Wash & Steam Iron — ₹250/KG",
      "Available upon request",
      "Priority express handling",
    ],
    popular: true,
  },
];


export const contactInfo = {
  phone: "9494913323",
  whatsapp: "9494913323",
  email: "care@universallaundryservices.in",
  address: "Jubilee Hills Road No 5, Hyderabad - 500033",
  hours: "Open all days · 8:00 AM to 9:00 PM",
  website: "www.universallaundryservices.in",
};

export const WHATSAPP_NUMBER = "919494913323";

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const FREE_DELIVERY_ABOVE = 399;
export const DELIVERY_FEE = 49;

export function parseSlotStartHour(slot: string): number {
  const match = slot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const isPM = match[3].toUpperCase() === "PM";
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  return hours;
}

export function isSlotAvailable(
  slot: string,
  dateKey: string,
  now: Date = new Date(),
): boolean {
  if (!dateKey) return false;
  const parts = dateKey.split("-").map(Number);
  if (parts.length !== 3) return true;
  const [year, month, day] = parts;

  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();

  // Past dates are not available
  if (
    year < todayYear ||
    (year === todayYear && month < todayMonth) ||
    (year === todayYear && month === todayMonth && day < todayDay)
  ) {
    return false;
  }

  // Future dates have all slots available
  if (
    year > todayYear ||
    (year === todayYear && month > todayMonth) ||
    (year === todayYear && month === todayMonth && day > todayDay)
  ) {
    return true;
  }

  // Today: check if current time has passed slot start time
  const startHour = parseSlotStartHour(slot);
  const curHour = now.getHours();
  const curMin = now.getMinutes();

  if (curHour > startHour || (curHour === startHour && curMin > 0)) {
    return false;
  }
  return true;
}

export function getAvailableSlots(
  dateKey: string,
  now: Date = new Date(),
): string[] {
  return timeSlots.filter((slot) => isSlotAvailable(slot, dateKey, now));
}

export function formatPickupDate(dateKey: string | null | undefined): {
  dateOnly: string;
  shortWithDay: string;
  fullLabel: string;
  relativeTag: string;
  dayNum: number;
  monthShort: string;
} {
  if (!dateKey) {
    return {
      dateOnly: "—",
      shortWithDay: "—",
      fullLabel: "—",
      relativeTag: "",
      dayNum: 0,
      monthShort: "",
    };
  }

  const parts = dateKey.split("-").map(Number);
  if (parts.length !== 3) {
    return {
      dateOnly: dateKey,
      shortWithDay: dateKey,
      fullLabel: dateKey,
      relativeTag: "",
      dayNum: 0,
      monthShort: "",
    };
  }

  const [year, month, day] = parts;
  const d = new Date(year, month - 1, day);
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const tomorrowKey = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

  let rawMonthShort = d.toLocaleDateString("en-IN", { month: "short" });
  if (rawMonthShort === "Sep") rawMonthShort = "Sept";
  const weekdayShort = d.toLocaleDateString("en-IN", { weekday: "short" });
  const weekdayLong = d.toLocaleDateString("en-IN", { weekday: "long" });
  const monthLong = d.toLocaleDateString("en-IN", { month: "long" });

  const relativeTag = dateKey === todayKey ? "Today" : dateKey === tomorrowKey ? "Tomorrow" : "";

  return {
    dateOnly: `${rawMonthShort} ${day}`,
    shortWithDay: `${rawMonthShort} ${day} · ${weekdayShort}`,
    fullLabel: `${day} ${monthLong} ${year}, ${weekdayLong}`,
    relativeTag,
    dayNum: day,
    monthShort: rawMonthShort,
  };
}

/** Next pickup days formatted dynamically, using local timezone dates */
export function getPickupDays(count = 7, now: Date = new Date()) {
  const out: {
    key: string;
    day: number;
    month: string;
    label: string;
    weekday: string;
    short: string;
    relativeTag: string;
  }[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dayNum = String(d.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${dayNum}`;

    let monthShort = d.toLocaleDateString("en-IN", { month: "short" });
    if (monthShort === "Sep") monthShort = "Sept";
    const weekdayLong = d.toLocaleDateString("en-IN", { weekday: "long" });
    const weekdayShort = d.toLocaleDateString("en-IN", { weekday: "short" });
    const monthLong = d.toLocaleDateString("en-IN", { month: "long" });

    out.push({
      key,
      day: d.getDate(),
      month: monthShort,
      weekday: weekdayLong,
      short: weekdayShort,
      relativeTag: i === 0 ? "Today" : i === 1 ? "Tomorrow" : weekdayLong,
      label: `${d.getDate()} ${monthLong} ${d.getFullYear()}, ${weekdayLong}`,
    });
  }
  return out;
}

export function getDefaultDateAndSlot(now: Date = new Date()): {
  date: string;
  slot: string;
} {
  const days = getPickupDays(7, now);
  const todayKey = days[0].key;
  const todayAvailable = getAvailableSlots(todayKey, now);

  if (todayAvailable.length > 0) {
    return {
      date: todayKey,
      slot: todayAvailable[0],
    };
  }

  // If there are no remaining slots today: move to tomorrow
  const tomorrowKey = days[1].key;
  const tomorrowAvailable = getAvailableSlots(tomorrowKey, now);
  return {
    date: tomorrowKey,
    slot: tomorrowAvailable[0] || timeSlots[0],
  };
}
