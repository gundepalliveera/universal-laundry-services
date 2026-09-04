type SeoRouteMeta = {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  keywords?: string;
};

export const SITE_URL = "https://www.universallaundryservices.in";

const routeSeoMap: Record<string, SeoRouteMeta> = {
  home: {
    title: "Universal Laundry Services",
    description:
      "Professional laundry service in Hyderabad with wash & fold, steam ironing, dry cleaning, pickup and delivery. Book Universal Laundry Services today.",
    canonical: `${SITE_URL}/`,
    h1: "Fresh Clothes, Happy Life.",
    keywords:
      "laundry service in Hyderabad, laundry services Hyderabad, best laundry service in Hyderabad, laundry near me Hyderabad, wash and fold Hyderabad, dry cleaning Hyderabad, clothes washing service Hyderabad, laundry pickup and delivery Hyderabad",
  },
  about: {
    title: "About Universal Laundry Services | Laundry Service Hyderabad",
    description:
      "Learn about Universal Laundry Services in Jubilee Hills, Hyderabad. State-of-the-art fabric processing, eco-friendly detergents, and segregated hygienic washing.",
    canonical: `${SITE_URL}/about`,
    h1: "About Universal Laundry Services in Hyderabad",
    keywords:
      "about universal laundry services, laundry Jubilee Hills, laundry company Hyderabad, hygienic laundry Hyderabad",
  },
  services: {
    title: "Laundry Services in Hyderabad | Wash, Iron & Dry Cleaning",
    description:
      "Complete laundry services in Hyderabad: Wash & Fold, Steam Ironing, Dry Cleaning, Shoe Cleaning, Bag Cleaning & Premium Wash with doorstep pickup.",
    canonical: `${SITE_URL}/services`,
    h1: "Professional Laundry & Dry Cleaning Services in Hyderabad",
    keywords:
      "laundry services Hyderabad, clothes washing service Hyderabad, dry cleaning Hyderabad, steam ironing Hyderabad, shoe cleaning Hyderabad",
  },
  pricing: {
    title: "Laundry Prices in Hyderabad | Universal Laundry Services",
    description:
      "Transparent laundry and dry cleaning pricing in Hyderabad. Wash & Fold at ₹80/KG, Steam Ironing at ₹120/KG. Free pickup & delivery above ₹399.",
    canonical: `${SITE_URL}/pricing`,
    h1: "Simple, Honest Laundry Prices in Hyderabad",
    keywords:
      "laundry prices Hyderabad, wash and fold rates Hyderabad, dry cleaning cost Hyderabad, laundry price per kg Hyderabad",
  },
  "how-it-works": {
    title: "How Laundry Pickup & Delivery Works | Hyderabad",
    description:
      "Easy 4-step laundry process in Hyderabad: Schedule pickup, we collect from doorstep, hygienic wash & fold, delivered fresh to your home.",
    canonical: `${SITE_URL}/how-it-works`,
    h1: "How Laundry Pickup & Delivery Works in Hyderabad",
    keywords:
      "how laundry pickup works, laundry delivery process Hyderabad, doorstep laundry booking Hyderabad",
  },
  contact: {
    title: "Contact Universal Laundry Services | Hyderabad Laundry",
    description:
      "Contact Universal Laundry Services at Jubilee Hills, Hyderabad. Call or WhatsApp +91 9494913323 for instant doorstep laundry pickup and inquiries.",
    canonical: `${SITE_URL}/contact`,
    h1: "Contact Universal Laundry Services Hyderabad",
    keywords:
      "contact laundry Hyderabad, laundry phone number Jubilee Hills, laundry customer care Hyderabad",
  },
  "special-dry-cleaning": {
    title: "Dry Cleaning & Special Laundry Services in Hyderabad",
    description:
      "Expert dry cleaning and special garment care in Hyderabad. Gentle cleaning for suits, silk sarees, lehengas, shoes, and luxury bags.",
    canonical: `${SITE_URL}/special-dry-cleaning`,
    h1: "Special & Dry Cleaning Services in Hyderabad",
    keywords:
      "dry cleaning Hyderabad, saree dry cleaning Hyderabad, suit dry cleaning Jubilee Hills, special garment care Hyderabad",
  },
  booking: {
    title: "Book Laundry Pickup Online | Universal Laundry Services Hyderabad",
    description:
      "Schedule your laundry pickup in Hyderabad in under 2 minutes. Select services, choose date & time slot, and enjoy doorstep delivery.",
    canonical: `${SITE_URL}/book`,
    h1: "Schedule Laundry Pickup & Delivery in Hyderabad",
  },
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
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "wash-and-fold": {
    slug: "wash-and-fold",
    title: "Wash & Fold",
    metaTitle: "Wash & Fold Laundry Service in Hyderabad | Universal Laundry",
    metaDescription:
      "Everyday hygienic wash & fold service in Hyderabad. Segregated loads, premium detergents, tumble dried and neatly folded from ₹80/KG.",
    h1: "Wash & Fold Laundry Service in Hyderabad",
    tagline: "Hygienic daily clothes washing, dried and neatly stacked.",
    price: "₹80 / KG",
    turnaround: "72 Hours (Express 12/24 Hr Available)",
    whoItsFor: [
      "Everyday casual wear: T-shirts, shirts, jeans, shorts, and nightwear",
      "Household linens: Bed sheets, pillow covers, and towels",
      "Busy families, working professionals, and students across Hyderabad",
    ],
    process: [
      { step: "1. Color & Fabric Sorting", detail: "Clothes are segregated by color tone and fabric sensitivity to prevent color bleeding." },
      { step: "2. Hygienic Machine Wash", detail: "Washed in sanitized individual machines with pH-balanced, fabric-safe detergents." },
      { step: "3. Tumble Drying", detail: "Gentle moisture extraction leaving garments soft, fresh-smelling, and sanitized." },
      { step: "4. Crisp Folding & Packing", detail: "Each item is neatly folded and packed in sealed, dust-proof delivery bags." },
    ],
    benefits: [
      "100% segregated washing — never mixed with other customers' clothes",
      "Free doorstep pickup and delivery across Hyderabad neighbourhoods",
      "Affordable per-KG pricing with no hidden weight rounding",
    ],
    localContext:
      "Serving residents and working professionals across Jubilee Hills, Banjara Hills, Madhapur, Hitec City, Kondapur, and Gachibowli.",
  },
  "steam-ironing": {
    slug: "steam-ironing",
    title: "Wash & Steam Iron",
    metaTitle: "Professional Steam Ironing Service Hyderabad | Universal Laundry",
    metaDescription:
      "Full wash plus crisp steam ironing in Hyderabad. Crease-free finish, sharp collars, and fabric care from ₹120/KG.",
    h1: "Wash & Professional Steam Ironing in Hyderabad",
    tagline: "Washed clean and steam pressed to wardrobe perfection.",
    price: "₹120 / KG",
    turnaround: "72 Hours (Express Available)",
    whoItsFor: [
      "Office & formal shirts, trousers, and cotton kurtas",
      "Daily workwear requiring crisp creases and structured collars",
      "Delicate fabrics that need temperature-regulated steam pressure",
    ],
    process: [
      { step: "1. Deep Wash & Conditioning", detail: "Washed with specialized liquid fabric softeners to relax fabric fibers." },
      { step: "2. Temperature-Controlled Steam Press", detail: "Industrial vacuum steam tables apply optimal heat without scorching or shine marks." },
      { step: "3. Hanger or Neat Fold Packaging", detail: "Supplied on premium hangers or crisp poly-pack folding ready to wear." },
    ],
    benefits: [
      "Zero burns, shine marks, or collar damage guaranteed",
      "Deep steam penetration kills 99.9% of residual bacteria",
      "Keeps formal garments looking fresh and lasting longer",
    ],
    localContext:
      "Trusted by corporate professionals and business executives across Hyderabad's financial and tech corridors.",
  },
  "dry-cleaning": {
    slug: "dry-cleaning",
    title: "Dry Cleaning",
    metaTitle: "Eco-Friendly Dry Cleaning in Hyderabad | Universal Laundry",
    metaDescription:
      "Premium eco-solvent dry cleaning in Hyderabad for suits, silk sarees, lehengas, blazers, and designer wear. Starting at ₹120/piece.",
    h1: "Eco-Friendly Dry Cleaning Services in Hyderabad",
    tagline: "Specialized solvent care for your most valued garments.",
    price: "Starting ₹120 / Piece",
    turnaround: "72–96 Hours",
    whoItsFor: [
      "Suits, tuxedos, blazers, and winter coats",
      "Silk sarees, Kanjeevarams, bridal lehengas, and designer wear",
      "Curtains, heavy blankets, quilts, and upholstery fabrics",
    ],
    process: [
      { step: "1. Expert Stain Spotting", detail: "Pre-treated by certified fabric specialists for oils, wine, sweat, and ink stains." },
      { step: "2. Eco-Solvent Cleaning", detail: "Cleaned in gentle, closed-loop solvent machines that preserve delicate embellishments." },
      { step: "3. Hand-Finishing & Form Pressing", detail: "Individual hand press on specialized buck machines to restore garment shape." },
    ],
    benefits: [
      "Protects zari, sequins, embroidery, and delicate silk sheen",
      "Eco-friendly, odorless solvents gentle on skin and fabric",
      "Complimentary garment inspection and minor button reinforcement",
    ],
    localContext:
      "Convenient doorstep pickup for wedding collections, party wear, and formal wardrobes across Hyderabad.",
  },
  "shoe-cleaning": {
    slug: "shoe-cleaning",
    title: "Shoe Cleaning",
    metaTitle: "Shoe Cleaning & Sneaker Spa Hyderabad | Universal Laundry",
    metaDescription:
      "Deep shoe cleaning, deodorization, and sneaker restoration in Hyderabad. Canvas, leather, and sports shoes from ₹149/pair.",
    h1: "Professional Shoe Cleaning & Sneaker Spa in Hyderabad",
    tagline: "Deep cleaned, deodorized, and restored to like-new condition.",
    price: "Starting ₹149 / Pair",
    turnaround: "72 Hours",
    whoItsFor: [
      "Sneakers: Nike, Adidas, Jordan, Puma, Yeezy, and lifestyle footwear",
      "Formal leather oxfords, loafers, brogues, and heels",
      "Sports running shoes, gym trainers, and canvas footwear",
    ],
    process: [
      { step: "1. Dry Soil Extraction", detail: "Surface dust and grit are brushed out from soles and uppers." },
      { step: "2. Material-Safe Foam Cleaning", detail: "Specific cleaners for leather, suede, mesh, and canvas with horsehair brushes." },
      { step: "3. Midsole & Lace Brightening", detail: "Deep scrub of rubber midsoles and ultrasonic cleaning of laces." },
      { step: "4. Deodorization & Conditioning", detail: "Anti-fungal UV sanitization and leather nourishment wax." },
    ],
    benefits: [
      "Eliminates odor and prevents sole yellowing",
      "Extends sneaker lifespan and keeps premium leather supple",
      "Safe for delicate suede and knit fabrics",
    ],
    localContext:
      "Hyderabad's go-to sneaker and footwear care service with doorstep pickup in Jubilee Hills, Madhapur, and beyond.",
  },
  "bag-cleaning": {
    slug: "bag-cleaning",
    title: "Bag Cleaning",
    metaTitle: "Luxury Bag Cleaning & Restoration Hyderabad | Universal Laundry",
    metaDescription:
      "Hand-finished bag cleaning and leather conditioning in Hyderabad. Backpacks, travel bags, and designer handbags from ₹149/bag.",
    h1: "Handbag & Luxury Bag Cleaning in Hyderabad",
    tagline: "Hand-finished conditioning, polish, and restorative care.",
    price: "Starting ₹149 / Bag",
    turnaround: "72–96 Hours",
    whoItsFor: [
      "Leather and suede handbags, totes, and clutches",
      "Laptop backpacks, travel duffels, and sports bags",
      "Luxury designer bags requiring gentle conditioning",
    ],
    process: [
      { step: "1. Interior Sanitization", detail: "Lining is vacuumed, cleared of debris, and treated for odors." },
      { step: "2. Exterior Hand Cleaning", detail: "Gentle non-abrasive cleaners wipe away grime, makeup, and oil stains." },
      { step: "3. Leather Polish & Moisture Barrier", detail: "High-grade leather creams restore flexibility and water repellency." },
    ],
    benefits: [
      "Restores leather sheen and prevents color fading",
      "Sanitizes inner lining without water damage",
      "Hardware polish for zippers, buckles, and chains",
    ],
    localContext:
      "Carefully handled in Hyderabad by trained artisans with full transit insurance and sealed packaging.",
  },
  "premium-wash": {
    slug: "premium-wash",
    title: "Premium Wash",
    metaTitle: "Premium Garment Wash in Hyderabad | Universal Laundry",
    metaDescription:
      "Individual piece-by-piece gentle wash in Hyderabad with specialized fabric conditioners and gentle drying. From ₹80/piece.",
    h1: "Piece-by-Piece Premium Garment Wash in Hyderabad",
    tagline: "Specialized individual attention for your finest clothes.",
    price: "₹80 / Piece",
    turnaround: "72 Hours",
    whoItsFor: [
      "Designer shirts, fine linen trousers, and delicate tops",
      "Embellished kurtis, modal dresses, and imported fabrics",
      "Garments requiring gentle cycle and individual machine handling",
    ],
    process: [
      { step: "1. Pre-Wash Inspection", detail: "Fabric care labels and button strength verified prior to processing." },
      { step: "2. Individual Delicate Wash", detail: "Processed individually with enzyme-free, gentle detergents at 30°C." },
      { step: "3. Air Flow Drying", detail: "Drying at lower temperatures to preserve natural fabric stretch and fit." },
    ],
    benefits: [
      "Guards against shrinkage, stretching, or thread unraveling",
      "Piece-by-piece attention to detail",
      "Gentle steam press and individual protective packaging",
    ],
    localContext:
      "Ideal for Hyderabad wardrobes needing higher-tier care than standard daily wash & fold.",
  },
};

/** Dynamically updates page title, meta description, and canonical link */
export function applySeoMetadata(routeKey: string) {
  const meta = routeSeoMap[routeKey] ?? routeSeoMap.home;
  document.title = meta.title;

  // Meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement("meta");
    descTag.setAttribute("name", "description");
    document.head.appendChild(descTag);
  }
  descTag.setAttribute("content", meta.description);

  // Canonical URL
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute("href", meta.canonical);

  // OG Title & Description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", meta.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", meta.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", meta.canonical);
}
