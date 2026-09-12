import { businessConfig } from "@/data/businessConfig";

export const SITE_URL = businessConfig.canonicalBase;

export type SeoRouteMeta = {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  keywords?: string;
  breadcrumbs?: { name: string; item: string }[];
  jsonLd?: object | object[];
};

export type ServiceDetail = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  price: string;
  turnaround: string;
  whoItsFor: string[];
  process: { step: string; detail: string }[];
  benefits: string[];
  localContext: string;
  faqs?: { question: string; answer: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  laundry: {
    slug: "laundry",
    title: "Laundry Service",
    metaTitle: "Laundry Service in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Professional laundry service in Hyderabad with free doorstep pickup and delivery. Hygienic individual wash, steam ironing, and quick turnaround. Book today.",
    h1: "Laundry Service in Hyderabad",
    tagline: "Hygienic everyday clothes washing with convenient doorstep pickup across Hyderabad.",
    price: "From ₹80 / KG",
    turnaround: "72 Hours (Express 12 & 24 Hr Available)",
    whoItsFor: [
      "Everyday casual and office attire: shirts, t-shirts, trousers, and jeans",
      "Household linens: bedsheets, pillowcases, and bath towels",
      "Busy households, working professionals, and students across Hyderabad",
    ],
    process: [
      { step: "1. Doorstep Collection", detail: "Our executive weighs and tags your garments at your home or apartment." },
      { step: "2. Color & Fabric Segregation", detail: "Whites, lights, darks, and delicate items are separated into distinct loads." },
      { step: "3. Hygienic Machine Wash", detail: "Cleaned in dedicated individual machines with fabric-safe liquid detergents." },
      { step: "4. Tumble Dry & Crisp Fold", detail: "Moisture-controlled tumble drying followed by neat folding and dust-proof packing." },
    ],
    benefits: [
      "100% individual batch wash — your garments are never mixed with other orders",
      "Free doorstep pickup and delivery on all orders above ₹399",
      "Transparent weighing with simple per-KG rates",
      "Fast 72-hour turnaround with express delivery available",
    ],
    localContext:
      "Serving residents across Jubilee Hills, Banjara Hills, Madhapur, HITEC City, Gachibowli, Kondapur, and surrounding Hyderabad neighborhoods.",
    faqs: [
      {
        question: "How does your laundry service in Hyderabad work?",
        answer: "Select your service online, choose a date and time slot, and our delivery executive will collect your clothes from your doorstep. We wash, dry, fold, and deliver them back within 72 hours.",
      },
      {
        question: "Is there a minimum order for doorstep laundry pickup?",
        answer: "Doorstep pickup and delivery is free on all orders above ₹399. A small delivery charge of ₹49 applies for orders below ₹399.",
      },
      {
        question: "Do you wash my clothes with other people's clothes?",
        answer: "Never. Every customer order is washed individually in dedicated machines to ensure complete hygiene.",
      },
    ],
  },
  "wash-and-fold": {
    slug: "wash-and-fold",
    title: "Wash & Fold",
    metaTitle: "Wash & Fold Service in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Hygienic wash & fold laundry service in Hyderabad starting at ₹80/KG. Segregated individual washing, tumble drying, and neat folding with doorstep pickup.",
    h1: "Wash & Fold Service in Hyderabad",
    tagline: "Clean, fresh, and neatly stacked laundry ready for your closet.",
    price: "₹80 / KG",
    turnaround: "72 Hours (Express 12 & 24 Hr Available)",
    whoItsFor: [
      "Everyday casual wear: T-shirts, shirts, jeans, shorts, and sleepwear",
      "Bed linens, pillow covers, and soft bath towels",
      "Families and working professionals who want to eliminate weekly washing chores",
    ],
    process: [
      { step: "1. Sorting & Inspection", detail: "Clothes are segregated by color tone and fabric sensitivity to prevent color bleeding." },
      { step: "2. Hygienic Machine Wash", detail: "Washed in sanitized individual machines with pH-balanced, fabric-safe detergents." },
      { step: "3. Tumble Drying", detail: "Gentle moisture extraction leaving garments soft, fresh-smelling, and completely dry." },
      { step: "4. Crisp Folding & Packing", detail: "Each item is neatly folded and packed in sealed, dust-proof delivery bags." },
    ],
    benefits: [
      "100% segregated washing — never mixed with other customers' clothes",
      "Free doorstep pickup and delivery across Hyderabad for orders over ₹399",
      "Affordable per-KG pricing with no hidden weight rounding",
      "Protects fabrics from outdoor pollution, dust, and drying harshness",
    ],
    localContext:
      "Popular among residents in Jubilee Hills, Banjara Hills, Madhapur, HITEC City, Kondapur, and Gachibowli.",
    faqs: [
      {
        question: "What is included in the Wash & Fold service?",
        answer: "Our Wash & Fold service includes sorting by color, machine washing with fabric-safe detergents, thorough tumble drying, and neat hand folding.",
      },
      {
        question: "How much does Wash & Fold cost in Hyderabad?",
        answer: "Our Wash & Fold service is priced at ₹80 per KG for standard 72-hour delivery.",
      },
      {
        question: "Are clothes sun-dried or machine-dried?",
        answer: "All garments are dried in commercial humidity-controlled dryers to protect fabric fibers from sun damage and outdoor dust.",
      },
    ],
  },
  "wash-and-iron": {
    slug: "wash-and-iron",
    title: "Wash & Steam Iron",
    metaTitle: "Wash & Iron Service in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Full laundry wash and professional steam ironing in Hyderabad at ₹120/KG. Wrinkle-free finish, crisp collars, and doorstep pickup. Book online today.",
    h1: "Wash & Iron Service in Hyderabad",
    tagline: "Washed clean and steam pressed to wardrobe perfection.",
    price: "₹120 / KG",
    turnaround: "72 Hours (Express Available)",
    whoItsFor: [
      "Office & formal shirts, trousers, chinos, and cotton kurtas",
      "Daily workwear requiring crisp creases and structured collars",
      "Fabrics that benefit from vacuum steam pressure rather than high-heat flat irons",
    ],
    process: [
      { step: "1. Deep Wash & Conditioning", detail: "Washed with gentle liquid detergents and conditioners to relax garment fibers." },
      { step: "2. Precision Steam Pressing", detail: "Industrial vacuum steam tables apply optimal pressure without shine marks or scorching." },
      { step: "3. Wardrobe Packaging", detail: "Supplied crisp-folded or on hangers according to your personal preference." },
    ],
    benefits: [
      "Smooth, scorch-free finish with zero shine marks on dark fabrics",
      "Deep steam penetration refreshes fabric fibers and removes wrinkles",
      "Keeps formal garments looking crisp, structured, and lasting longer",
      "Convenient doorstep delivery ready to hang in your closet",
    ],
    localContext:
      "Trusted by corporate executives, doctors, and business professionals across Hyderabad's financial and tech corridors.",
    faqs: [
      {
        question: "How is steam ironing different from regular dry ironing?",
        answer: "Steam ironing uses pressurized moisture and vacuum suction to relax fibers, eliminating stubborn wrinkles without scorching, burning, or leaving shiny marks.",
      },
      {
        question: "Can I choose hanger delivery for my shirts?",
        answer: "Yes, you can request hanger packaging or crisp poly-pack folding when scheduling your order.",
      },
      {
        question: "What is the per-KG price for Wash & Steam Iron?",
        answer: "Our standard 72-hour Wash & Steam Iron service is priced at ₹120 per KG.",
      },
    ],
  },
  "dry-cleaning": {
    slug: "dry-cleaning",
    title: "Dry Cleaning",
    metaTitle: "Dry Cleaning in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Eco-solvent dry cleaning in Hyderabad for silk sarees, suits, lehengas, blazers, and designer wear starting at ₹120/piece. Doorstep pickup across Hyderabad.",
    h1: "Dry Cleaning in Hyderabad",
    tagline: "Gentle solvent care for your delicate, ethnic, and designer garments.",
    price: "Starting ₹120 / Piece",
    turnaround: "72–96 Hours",
    whoItsFor: [
      "Suits, tuxedos, blazers, and winter overcoats",
      "Silk sarees, Kanjeevarams, bridal lehengas, and designer couture",
      "Heavy curtains, quilts, and special fabric upholstery",
    ],
    process: [
      { step: "1. Pre-Inspection & Spot Treatment", detail: "Careful examination of fabric care labels and targeted spot treatment for food and oil stains." },
      { step: "2. Gentle Solvent Cleaning", detail: "Processed in specialized, closed-loop dry cleaning machines using odorless, fabric-safe solvents." },
      { step: "3. Hand-Finishing & Form Pressing", detail: "Individual hand press on specialized form finishers to restore garment shape and silhouette." },
    ],
    benefits: [
      "Protects zari work, sequins, embroidery, and natural silk luster",
      "Eco-friendly, odorless solvents gentle on sensitive skin and fabrics",
      "Complimentary garment inspection and careful button protection",
      "Sealed breathable garment covers for safe closet storage",
    ],
    localContext:
      "Doorstep pickup for wedding collections, party wear, and formal wardrobes across Jubilee Hills, Banjara Hills, and West Hyderabad.",
    faqs: [
      {
        question: "Which garments should be dry cleaned instead of washed?",
        answer: "Garments made of pure silk, wool, velvet, raw linen, structured suits, and items with heavy embroidery or delicate beading should always be dry cleaned.",
      },
      {
        question: "Do you offer dry cleaning for heavy bridal lehengas and sherwanis?",
        answer: "Yes, our team has extensive experience caring for intricate bridal lehengas, sherwanis, and wedding sarees.",
      },
      {
        question: "What is the turnaround time for dry cleaning in Hyderabad?",
        answer: "Standard dry cleaning takes 72 to 96 hours to allow thorough solvent cleaning, natural drying, and hand-finishing.",
      },
    ],
  },
  "steam-ironing": {
    slug: "steam-ironing",
    title: "Steam Ironing",
    metaTitle: "Steam Ironing Service in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Professional vacuum steam ironing service in Hyderabad. Crisp creases, smooth collars, and zero burn marks with doorstep pickup and delivery. Book now.",
    h1: "Steam Ironing Service in Hyderabad",
    tagline: "Industrial vacuum steam pressing for a crisp, wrinkle-free wardrobe.",
    price: "From ₹15 / Piece",
    turnaround: "48–72 Hours",
    whoItsFor: [
      "Formal shirts, trousers, skirts, and blazers already washed at home",
      "Delicate silk sarees and linen kurtas needing professional pressing",
      "Bed covers and table linens requiring crease-free presentation",
    ],
    process: [
      { step: "1. Fabric Assessment", detail: "Garments are sorted according to fabric heat tolerance (cotton, silk, linen, synthetics)." },
      { step: "2. Vacuum Steam Pressing", detail: "High-pressure steam penetrates fabric layers while the vacuum table pulls moisture through instantly." },
      { step: "3. Immediate Cooling & Packing", detail: "Garments cool into crisp shape immediately, locking in the wrinkle-free finish." },
    ],
    benefits: [
      "No fabric shine marks or scorching on dark cottons and polyester blends",
      "Sharp creases on formal trousers and crisp collar lines",
      "Pressurized steam removes deep creases faster and safer than domestic irons",
      "Available on hangers or folded neatly for quick closet storage",
    ],
    localContext:
      "Convenient for working professionals across Madhapur, HITEC City, Gachibowli, and Jubilee Hills.",
    faqs: [
      {
        question: "Can I give only clothes for steam ironing without washing?",
        answer: "Yes, we accept clean garments specifically for steam ironing and deliver them crisp and wrinkle-free.",
      },
      {
        question: "Does steam ironing cause burn marks on delicate fabrics?",
        answer: "No. Industrial steam pressing uses vacuum tables and regulated steam temperatures, eliminating direct metallic heat that causes scorch or shine marks.",
      },
      {
        question: "How are ironed shirts delivered?",
        answer: "Shirts can be delivered neatly folded with collar supports in protective poly-packs or on hangers upon request.",
      },
    ],
  },
  "doorstep-pickup-delivery": {
    slug: "doorstep-pickup-delivery",
    title: "Doorstep Pickup & Delivery",
    metaTitle: "Doorstep Laundry Pickup & Delivery in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Convenient doorstep laundry pickup and delivery in Hyderabad. Free pickup on orders above ₹399. Flexible morning & evening slots across West & Central Hyderabad.",
    h1: "Doorstep Laundry Pickup & Delivery in Hyderabad",
    tagline: "Fresh, clean clothes delivered right back to your door without the travel hassle.",
    price: "Free on orders above ₹399 (₹49 for smaller orders)",
    turnaround: "Standard 72 Hours (Express Options Available)",
    whoItsFor: [
      "Apartment and villa residents looking for reliable laundry scheduling",
      "Busy IT professionals who cannot visit a laundromat during regular hours",
      "Families with large weekly laundry loads like bedsheets and curtains",
    ],
    process: [
      { step: "1. Online or WhatsApp Booking", detail: "Choose your service, pickup date, and convenient 2-hour time slot." },
      { step: "2. Prompt Doorstep Collection", detail: "Our executive arrives at your address with laundry bags and digital weighing scales." },
      { step: "3. Central Processing", detail: "Garments are cleaned in segregated machines at our central Jubilee Hills facility." },
      { step: "4. Scheduled Delivery", detail: "Neatly packed, fresh clothes are delivered to your door at your confirmed time." },
    ],
    benefits: [
      "Free pickup and delivery across Hyderabad on orders over ₹399",
      "Multiple convenient morning (8 AM – 11 AM) and evening (6 PM – 9 PM) slots",
      "Real-time WhatsApp updates on order pickup, processing, and dispatch",
      "Digital payments accepted via UPI, cash, or cards upon delivery",
    ],
    localContext:
      "Covering Jubilee Hills, Banjara Hills, Madhapur, HITEC City, Gachibowli, Kondapur, Manikonda, Kukatpally, Miyapur, Kokapet, and Narsingi.",
    faqs: [
      {
        question: "How do I schedule a doorstep laundry pickup?",
        answer: "You can book directly on our website in under two minutes or message us on WhatsApp at +91 94949 13323.",
      },
      {
        question: "Do I need to weigh my clothes before the executive arrives?",
        answer: "No need to pre-weigh. Our delivery executive brings a calibrated digital weighing scale and weighs the garments in your presence.",
      },
      {
        question: "What if I am not available at home during delivery?",
        answer: "You can reschedule your delivery slot easily via WhatsApp or arrange for secure handover with your apartment security or neighbour.",
      },
    ],
  },
  "shoe-cleaning": {
    slug: "shoe-cleaning",
    title: "Shoe Cleaning",
    metaTitle: "Shoe Cleaning & Sneaker Spa in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Deep shoe cleaning, deodorization, and sneaker care in Hyderabad starting at ₹149/pair. Safe for leather, canvas, and sports shoes with doorstep pickup.",
    h1: "Shoe Cleaning & Sneaker Spa in Hyderabad",
    tagline: "Deep cleaned, deodorized, and restored to like-new condition.",
    price: "Starting ₹149 / Pair",
    turnaround: "72 Hours",
    whoItsFor: [
      "Sneakers: sports trainers, running shoes, and lifestyle footwear",
      "Formal leather oxfords, brogues, and loafers",
      "Canvas slip-ons and casual gym shoes",
    ],
    process: [
      { step: "1. Dry Soil Removal", detail: "Loose surface dust and mud are brushed out from soles and uppers." },
      { step: "2. Material-Safe Foam Cleaning", detail: "Hand-brushed with specific non-abrasive cleaners for mesh, canvas, or leather." },
      { step: "3. Midsole & Lace Brightening", detail: "Gentle scrub of rubber midsoles and clean wash of shoe laces." },
      { step: "4. Deodorization & Conditioning", detail: "Natural odor neutralizers applied along with leather conditioning cream where applicable." },
    ],
    benefits: [
      "Refreshes foot odor and brightens midsoles",
      "Gentle hand scrubbing protects stitching and delicate upper mesh",
      "Extends footwear lifespan and maintains leather flexibility",
    ],
    localContext: "Doorstep shoe collection across Hyderabad neighborhoods.",
  },
  "bag-cleaning": {
    slug: "bag-cleaning",
    title: "Bag Cleaning",
    metaTitle: "Handbag & Backpack Cleaning in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Hand-finished bag cleaning and leather conditioning in Hyderabad from ₹149/bag. Care for backpacks, duffel bags, and designer handbags with doorstep pickup.",
    h1: "Handbag & Backpack Cleaning in Hyderabad",
    tagline: "Hand-finished cleaning, conditioning, and restorative care.",
    price: "Starting ₹149 / Bag",
    turnaround: "72–96 Hours",
    whoItsFor: [
      "Daily work backpacks, laptop sleeves, and gym duffels",
      "Leather and fabric handbags, totes, and clutches",
      "Travel luggage bags and weekend carry-ons",
    ],
    process: [
      { step: "1. Interior Vacuum & Sanitization", detail: "Lining is vacuumed to remove dust and treated for inner freshness." },
      { step: "2. Exterior Surface Cleaning", detail: "Gentle surface wiping removes grease, grime, and daily handling marks." },
      { step: "3. Conditioning & Hardware Polish", detail: "Leather conditioning cream applied and metal zippers polished." },
    ],
    benefits: [
      "Cleans inner compartments without water saturation damage",
      "Preserves leather suppleness and color richness",
      "Sealed packaging for safe return transit",
    ],
    localContext: "Handled with care across Hyderabad with convenient doorstep pickup.",
  },
  "premium-wash": {
    slug: "premium-wash",
    title: "Premium Wash",
    metaTitle: "Premium Garment Wash in Hyderabad | Universal Laundry Services",
    metaDescription:
      "Piece-by-piece gentle garment wash in Hyderabad at ₹80/piece. Special fabric conditioners, delicate cycles, and individual attention with doorstep pickup.",
    h1: "Piece-by-Piece Premium Garment Wash in Hyderabad",
    tagline: "Specialized individual attention for your finest clothes.",
    price: "₹80 / Piece",
    turnaround: "72 Hours",
    whoItsFor: [
      "Designer shirts, fine linen trousers, and delicate summer dresses",
      "Embellished kurtis, modal tops, and imported cotton garments",
      "Clothes requiring gentle cycle wash and individual machine handling",
    ],
    process: [
      { step: "1. Pre-Wash Inspection", detail: "Care labels and button stitching are verified prior to processing." },
      { step: "2. Individual Delicate Wash", detail: "Washed individually with gentle liquid conditioners at lower wash temperatures." },
      { step: "3. Low-Heat Air Flow Drying", detail: "Drying at controlled lower temperatures to protect fabric stretch and shape." },
    ],
    benefits: [
      "Protects against shrinkage, stretching, or thread unraveling",
      "Piece-by-piece attention to detail",
      "Gentle steam press and individual protective packaging",
    ],
    localContext: "Ideal for Hyderabad wardrobes needing higher-tier care than standard daily wash & fold.",
  },
};

export const routeSeoMap: Record<string, SeoRouteMeta> = {
  home: {
    title: "Laundry Service in Hyderabad | Doorstep Pickup & Delivery | Universal Laundry Services",
    description:
      "Professional laundry service in Hyderabad by Universal Laundry Services. Doorstep pickup & delivery for wash & fold, steam ironing, and dry cleaning. Easy online booking.",
    canonical: `${SITE_URL}/`,
    h1: "Laundry Service in Hyderabad – Fresh Clothes, Happy Life",
  },
  services: {
    title: "Laundry & Dry Cleaning Services in Hyderabad | Universal Laundry Services",
    description:
      "Explore complete garment care services in Hyderabad: Wash & Fold, Wash & Iron, Eco Dry Cleaning, Steam Pressing, and Shoe Cleaning with doorstep pickup.",
    canonical: `${SITE_URL}/services/`,
    h1: "Professional Laundry & Dry Cleaning Services in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
    ],
  },
  pricing: {
    title: "Laundry Pricing in Hyderabad | Wash & Fold ₹80/KG | Universal Laundry Services",
    description:
      "Transparent laundry prices in Hyderabad. Wash & Fold at ₹80/KG, Wash & Steam Iron at ₹120/KG. Free doorstep pickup & delivery on orders above ₹399.",
    canonical: `${SITE_URL}/pricing/`,
    h1: "Transparent Laundry Prices in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Pricing", item: `${SITE_URL}/pricing/` },
    ],
  },
  about: {
    title: "About Universal Laundry Services | Hyderabad Garment Care",
    description:
      "Learn about Universal Laundry Services at Jubilee Hills Road No 5, Hyderabad. Hygienic segregated washing, eco-friendly detergents, and dependable doorstep service.",
    canonical: `${SITE_URL}/about/`,
    h1: "About Universal Laundry Services in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "About Us", item: `${SITE_URL}/about/` },
    ],
  },
  contact: {
    title: "Contact Universal Laundry Services | Hyderabad Laundry Pickup",
    description:
      "Contact Universal Laundry Services in Jubilee Hills, Hyderabad. Call or WhatsApp +91 94949 13323 for doorstep laundry pickup and inquiries across Hyderabad.",
    canonical: `${SITE_URL}/contact/`,
    h1: "Contact Universal Laundry Services Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Contact", item: `${SITE_URL}/contact/` },
    ],
  },
  booking: {
    title: "Book Laundry Pickup Online | Universal Laundry Services Hyderabad",
    description:
      "Schedule your laundry pickup in Hyderabad in under 2 minutes. Select services, pick your date & time slot, and enjoy doorstep delivery.",
    canonical: `${SITE_URL}/book/`,
    h1: "Schedule Laundry Pickup & Delivery in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Book", item: `${SITE_URL}/book/` },
    ],
  },
};

/** Client-side SEO updater */
export function applySeoMetadata(
  metaOrKey:
    | string
    | {
        title: string;
        description: string;
        canonical: string;
        jsonLd?: object | object[];
      },
) {
  if (typeof document === "undefined") return;

  const meta =
    typeof metaOrKey === "string"
      ? routeSeoMap[metaOrKey] ?? routeSeoMap.home
      : metaOrKey;

  document.title = meta.title;

  // Meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement("meta");
    descTag.setAttribute("name", "description");
    document.head.appendChild(descTag);
  }
  descTag.setAttribute("content", meta.description);

  // Canonical tag
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute("href", meta.canonical);

  // Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", meta.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", meta.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", meta.canonical);

  // Dynamic JSON-LD injection if provided
  if (meta.jsonLd) {
    let scriptTag = document.querySelector("#dynamic-jsonld") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "dynamic-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(meta.jsonLd);
  }
}
