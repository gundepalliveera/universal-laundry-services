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

export type DeliveryTier = {
  id: DeliveryTierId;
  hours: string;
  label: string;
  badge: "Regular" | "Express" | "Express Fast";
  badgeColor: string;
  iconColor: string;
  basePrice: number;        // Wash & Fold kg price — used as the "from" indicator
  multiplier: number;       // Applied to all service base prices
  description: string;
};

export const deliveryTiers: DeliveryTier[] = [
  {
    id: "72hr",
    hours: "72 HOURS",
    label: "72 Hours",
    badge: "Regular",
    badgeColor: "bg-navy-600 text-white",
    iconColor: "text-navy-600",
    basePrice: 80,
    multiplier: 1,
    description: "Best for normal needs",
  },
  {
    id: "24hr",
    hours: "24 HOURS",
    label: "24 Hours",
    badge: "Express",
    badgeColor: "bg-emerald-500 text-white",
    iconColor: "text-emerald-500",
    basePrice: 150,
    multiplier: 1.875,      // 150/80
    description: "Fast & reliable",
  },
  {
    id: "12hr",
    hours: "12 HOURS",
    label: "12 Hours",
    badge: "Express Fast",
    badgeColor: "bg-orange-500 text-white",
    iconColor: "text-orange-500",
    basePrice: 180,
    multiplier: 2.25,       // 180/80
    description: "Super fast delivery",
  },
];

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

export type CartLine = { id: ServiceId; qty: number };

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
    body: "Doorstep service on all orders above ₹300.",
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
      "Free pickup & delivery above ₹300",
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

export const FREE_DELIVERY_ABOVE = 300;
export const DELIVERY_FEE = 49;

/** Next 7 pickup days, formatted like "10 May 2024, Friday" */
export function getPickupDays(count = 7) {
  const out: { key: string; day: number; month: string; label: string; weekday: string; short: string }[] =
    [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      key: d.toISOString().slice(0, 10),
      day: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      weekday: d.toLocaleDateString("en-IN", { weekday: "long" }),
      short: d.toLocaleDateString("en-IN", { weekday: "short" }),
      label: `${d.getDate()} ${d.toLocaleDateString("en-IN", {
        month: "long",
      })} ${d.getFullYear()}, ${d.toLocaleDateString("en-IN", {
        weekday: "long",
      })}`,
    });
  }
  return out;
}
