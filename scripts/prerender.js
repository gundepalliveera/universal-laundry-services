import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

// Base canonical domain
const SITE_URL = "https://universallaundryservices.com";

const routes = [
  // 1. Homepage
  {
    path: "/",
    title: "Laundry Service in Hyderabad | Doorstep Pickup & Delivery | Universal Laundry Services",
    description: "Professional laundry service in Hyderabad by Universal Laundry Services. Doorstep pickup & delivery for wash & fold, steam ironing, and dry cleaning. Easy online booking.",
    h1: "Laundry Service in Hyderabad – Fresh Clothes, Happy Life",
    breadcrumbs: [{ name: "Home", item: `${SITE_URL}/` }],
    contentHtml: `
      <main>
        <section>
          <h1>Laundry Service in Hyderabad – Fresh Clothes, Happy Life</h1>
          <p>Professional laundry care in Hyderabad, picked up and delivered to your doorstep. Wash &amp; fold, steam ironing, dry cleaning and more across Jubilee Hills, Banjara Hills, Madhapur, and your city.</p>
          <ul>
            <li>Wash &amp; Fold from ₹80/KG</li>
            <li>Wash &amp; Steam Iron from ₹120/KG</li>
            <li>Eco Dry Cleaning starting ₹120/piece</li>
            <li>Free Doorstep Pickup on orders above ₹399</li>
          </ul>
        </section>
      </main>
    `,
  },

  // 2. Services Overview
  {
    path: "/services/",
    title: "Laundry & Dry Cleaning Services in Hyderabad | Universal Laundry Services",
    description: "Explore complete garment care services in Hyderabad: Wash & Fold, Wash & Iron, Eco Dry Cleaning, Steam Pressing, and Shoe Cleaning with doorstep pickup.",
    h1: "Professional Laundry & Dry Cleaning Services in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <span>Services</span></nav>
        <h1>Professional Laundry &amp; Dry Cleaning Services in Hyderabad</h1>
        <p>From daily wash &amp; fold by the kilogram to delicate designer dry cleaning and precision steam pressing, we provide complete doorstep garment care across Hyderabad.</p>
        <section>
          <h2>Our Services</h2>
          <ul>
            <li><a href="/services/wash-and-fold/">Wash &amp; Fold Service (₹80/KG)</a></li>
            <li><a href="/services/wash-and-iron/">Wash &amp; Steam Iron Service (₹120/KG)</a></li>
            <li><a href="/services/dry-cleaning/">Dry Cleaning Service (from ₹120/piece)</a></li>
            <li><a href="/services/steam-ironing/">Steam Ironing Service (from ₹15/piece)</a></li>
            <li><a href="/services/doorstep-pickup-delivery/">Doorstep Laundry Pickup &amp; Delivery</a></li>
            <li><a href="/services/laundry/">General Laundry Service</a></li>
          </ul>
        </section>
      </main>
    `,
  },

  // 3. Service: Laundry
  {
    path: "/services/laundry/",
    title: "Laundry Service in Hyderabad | Universal Laundry Services",
    description: "Professional laundry service in Hyderabad with free doorstep pickup and delivery. Hygienic individual wash, steam ironing, and quick turnaround. Book today.",
    h1: "Laundry Service in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
      { name: "Laundry", item: `${SITE_URL}/services/laundry/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/services/">Services</a> &gt; <span>Laundry</span></nav>
        <h1>Laundry Service in Hyderabad</h1>
        <p>Hygienic everyday clothes washing with convenient doorstep pickup across Hyderabad. Every load is washed individually in dedicated machines.</p>
        <section>
          <h2>Pricing &amp; Turnaround</h2>
          <p>Starting from ₹80/KG with standard 72-hour delivery. Express 12-hour and 24-hour turnaround available.</p>
        </section>
      </main>
    `,
  },

  // 4. Service: Wash and Fold
  {
    path: "/services/wash-and-fold/",
    title: "Wash & Fold Service in Hyderabad | Universal Laundry Services",
    description: "Hygienic wash & fold laundry service in Hyderabad starting at ₹80/KG. Segregated individual washing, tumble drying, and neat folding with doorstep pickup.",
    h1: "Wash & Fold Service in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
      { name: "Wash & Fold", item: `${SITE_URL}/services/wash-and-fold/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/services/">Services</a> &gt; <span>Wash &amp; Fold</span></nav>
        <h1>Wash &amp; Fold Service in Hyderabad</h1>
        <p>Clean, fresh, and neatly stacked laundry ready for your closet. Processed in 100% segregated machine loads with pH-balanced liquid detergents.</p>
        <section>
          <h2>Process &amp; Pricing</h2>
          <p>Priced at ₹80 per KG. Sorted by color, washed, tumble dried, and packed in dust-proof bags.</p>
        </section>
      </main>
    `,
  },

  // 5. Service: Wash and Iron
  {
    path: "/services/wash-and-iron/",
    title: "Wash & Iron Service in Hyderabad | Universal Laundry Services",
    description: "Full laundry wash and professional steam ironing in Hyderabad at ₹120/KG. Wrinkle-free finish, crisp collars, and doorstep pickup. Book online today.",
    h1: "Wash & Iron Service in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
      { name: "Wash & Iron", item: `${SITE_URL}/services/wash-and-iron/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/services/">Services</a> &gt; <span>Wash &amp; Iron</span></nav>
        <h1>Wash &amp; Iron Service in Hyderabad</h1>
        <p>Complete wash followed by professional vacuum steam ironing for sharp creases, smooth collars, and clean finish without shine marks.</p>
        <section>
          <h2>Pricing</h2>
          <p>₹120 per KG for standard 72-hour delivery. Available on hangers or neatly folded.</p>
        </section>
      </main>
    `,
  },

  // 6. Service: Dry Cleaning
  {
    path: "/services/dry-cleaning/",
    title: "Dry Cleaning in Hyderabad | Universal Laundry Services",
    description: "Eco-solvent dry cleaning in Hyderabad for silk sarees, suits, lehengas, blazers, and designer wear starting at ₹120/piece. Doorstep pickup across Hyderabad.",
    h1: "Dry Cleaning in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
      { name: "Dry Cleaning", item: `${SITE_URL}/services/dry-cleaning/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/services/">Services</a> &gt; <span>Dry Cleaning</span></nav>
        <h1>Dry Cleaning in Hyderabad</h1>
        <p>Gentle eco-solvent care for silk sarees, suits, lehengas, blazers, and designer garments. Protects delicate embroidery and fabric sheen.</p>
        <section>
          <h2>Pricing</h2>
          <p>Starting at ₹120 per piece with 72 to 96 hours turnaround.</p>
        </section>
      </main>
    `,
  },

  // 7. Service: Steam Ironing
  {
    path: "/services/steam-ironing/",
    title: "Steam Ironing Service in Hyderabad | Universal Laundry Services",
    description: "Professional vacuum steam ironing service in Hyderabad. Crisp creases, smooth collars, and zero burn marks with doorstep pickup and delivery. Book now.",
    h1: "Steam Ironing Service in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
      { name: "Steam Ironing", item: `${SITE_URL}/services/steam-ironing/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/services/">Services</a> &gt; <span>Steam Ironing</span></nav>
        <h1>Steam Ironing Service in Hyderabad</h1>
        <p>Industrial vacuum steam pressing that delivers crisp collars and smooth creases without scorching or shiny marks on dark fabrics.</p>
      </main>
    `,
  },

  // 8. Service: Doorstep Pickup & Delivery
  {
    path: "/services/doorstep-pickup-delivery/",
    title: "Doorstep Laundry Pickup & Delivery in Hyderabad | Universal Laundry Services",
    description: "Convenient doorstep laundry pickup and delivery in Hyderabad. Free pickup on orders above ₹399. Flexible morning & evening slots across West & Central Hyderabad.",
    h1: "Doorstep Laundry Pickup & Delivery in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services/` },
      { name: "Doorstep Pickup & Delivery", item: `${SITE_URL}/services/doorstep-pickup-delivery/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/services/">Services</a> &gt; <span>Doorstep Pickup</span></nav>
        <h1>Doorstep Laundry Pickup &amp; Delivery in Hyderabad</h1>
        <p>Schedule your laundry pickup online in 2 minutes. Free pickup on all orders above ₹399 across Hyderabad neighborhoods.</p>
      </main>
    `,
  },

  // 9. Central Hyderabad Landing Page
  {
    path: "/laundry-service-hyderabad/",
    title: "Laundry Service in Hyderabad | Universal Laundry Services",
    description: "Professional laundry, dry cleaning, wash & fold, and steam ironing in Hyderabad. Doorstep pickup and fast delivery across West, Central & IT corridors. Book online today.",
    h1: "Laundry Service in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Hyderabad Laundry Service", item: `${SITE_URL}/laundry-service-hyderabad/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <span>Hyderabad</span></nav>
        <h1>Laundry Service in Hyderabad</h1>
        <p>Universal Laundry Services provides premium garment care for families, professionals, and businesses throughout Hyderabad with scheduled doorstep pickup and delivery.</p>
        <section>
          <h2>Neighborhoods We Serve</h2>
          <ul>
            <li><a href="/laundry-service-jubilee-hills/">Laundry Service in Jubilee Hills</a></li>
            <li><a href="/laundry-service-banjara-hills/">Laundry Service in Banjara Hills</a></li>
            <li><a href="/laundry-service-madhapur/">Laundry Service in Madhapur</a></li>
            <li><a href="/laundry-service-hitec-city/">Laundry Service in HITEC City</a></li>
            <li><a href="/laundry-service-gachibowli/">Laundry Service in Gachibowli</a></li>
            <li><a href="/laundry-service-kondapur/">Laundry Service in Kondapur</a></li>
            <li><a href="/laundry-service-manikonda/">Laundry Service in Manikonda</a></li>
            <li><a href="/laundry-service-kukatpally/">Laundry Service in Kukatpally</a></li>
            <li><a href="/laundry-service-miyapur/">Laundry Service in Miyapur</a></li>
            <li><a href="/laundry-service-kokapet/">Laundry Service in Kokapet</a></li>
            <li><a href="/laundry-service-narsingi/">Laundry Service in Narsingi</a></li>
          </ul>
        </section>
      </main>
    `,
  },

  // 10-20: 11 Verified Localities
  {
    path: "/laundry-service-jubilee-hills/",
    title: "Laundry Service in Jubilee Hills, Hyderabad | Universal Laundry Services",
    description: "Reliable laundry service in Jubilee Hills, Hyderabad. Doorstep pickup for wash & fold, steam iron, and designer dry cleaning along Road No. 1–45 and Film Nagar.",
    h1: "Laundry Service in Jubilee Hills, Hyderabad",
    localityName: "Jubilee Hills",
  },
  {
    path: "/laundry-service-banjara-hills/",
    title: "Laundry Service in Banjara Hills, Hyderabad | Universal Laundry Services",
    description: "Expert laundry and dry cleaning in Banjara Hills, Hyderabad. Doorstep collection along Road No. 1–14, Taj Krishna, and Care Hospital. Free delivery on ₹399+.",
    h1: "Laundry Service in Banjara Hills, Hyderabad",
    localityName: "Banjara Hills",
  },
  {
    path: "/laundry-service-madhapur/",
    title: "Laundry Service in Madhapur, Hyderabad | Universal Laundry Services",
    description: "Top-rated laundry service in Madhapur, Hyderabad. Wash & fold, steam iron, and dry cleaning for tech professionals in Ayyappa Society, Kavuri Hills, and 100ft Road.",
    h1: "Laundry Service in Madhapur, Hyderabad",
    localityName: "Madhapur",
  },
  {
    path: "/laundry-service-hitec-city/",
    title: "Laundry Service in HITEC City, Hyderabad | Universal Laundry Services",
    description: "Doorstep laundry service in HITEC City, Hyderabad. Fast pickup & delivery for IT professionals near Cyber Towers, Mindspace, and Cyber Gateway. Book in 2 mins.",
    h1: "Laundry Service in HITEC City, Hyderabad",
    localityName: "HITEC City",
  },
  {
    path: "/laundry-service-gachibowli/",
    title: "Laundry Service in Gachibowli, Hyderabad | Universal Laundry Services",
    description: "Professional laundry service in Gachibowli, Hyderabad. Doorstep pickup in Financial District, Telecom Nagar, and golf view gated societies. Book wash & fold online.",
    h1: "Laundry Service in Gachibowli, Hyderabad",
    localityName: "Gachibowli",
  },
  {
    path: "/laundry-service-kondapur/",
    title: "Laundry Service in Kondapur, Hyderabad | Universal Laundry Services",
    description: "Reliable laundry service in Kondapur, Hyderabad. Doorstep pickup near Botanical Garden Rd, Raghava Colony, and Shilpa Park. Clean clothes delivered in 72 hrs.",
    h1: "Laundry Service in Kondapur, Hyderabad",
    localityName: "Kondapur",
  },
  {
    path: "/laundry-service-manikonda/",
    title: "Laundry Service in Manikonda, Hyderabad | Universal Laundry Services",
    description: "Affordable, hygienic laundry service in Manikonda, Hyderabad. Doorstep pickup in Puppalaguda, Secretariat Colony, and Lanco Hills. Free delivery above ₹399.",
    h1: "Laundry Service in Manikonda, Hyderabad",
    localityName: "Manikonda",
  },
  {
    path: "/laundry-service-kukatpally/",
    title: "Laundry Service in Kukatpally, Hyderabad | Universal Laundry Services",
    description: "Doorstep laundry service in Kukatpally & KPHB Colony, Hyderabad. Bulk wash & fold, steam ironing, and dry cleaning delivered in 72 hours. Book online.",
    h1: "Laundry Service in Kukatpally, Hyderabad",
    localityName: "Kukatpally",
  },
  {
    path: "/laundry-service-miyapur/",
    title: "Laundry Service in Miyapur, Hyderabad | Universal Laundry Services",
    description: "Hygienic doorstep laundry in Miyapur, Hyderabad. Wash & fold, steam iron, and blanket dry cleaning near Allwyn X Roads and Miyapur Metro. Free pickup above ₹399.",
    h1: "Laundry Service in Miyapur, Hyderabad",
    localityName: "Miyapur",
  },
  {
    path: "/laundry-service-kokapet/",
    title: "Laundry Service in Kokapet, Hyderabad | Universal Laundry Services",
    description: "Premium laundry and dry cleaning in Kokapet, Hyderabad. Doorstep pickup for luxury villas and high-rises in Neopolis and Golden Mile. Book premium care.",
    h1: "Laundry Service in Kokapet, Hyderabad",
    localityName: "Kokapet",
  },
  {
    path: "/laundry-service-narsingi/",
    title: "Laundry Service in Narsingi, Hyderabad | Universal Laundry Services",
    description: "Doorstep laundry service in Narsingi, Hyderabad. Wash & fold, steam ironing, and dry cleaning near ORR Junction and Alkapur Township. Book online in 2 mins.",
    h1: "Laundry Service in Narsingi, Hyderabad",
    localityName: "Narsingi",
  },

  // 21. Pricing
  {
    path: "/pricing/",
    title: "Laundry Pricing in Hyderabad | Wash & Fold ₹80/KG | Universal Laundry Services",
    description: "Transparent laundry prices in Hyderabad. Wash & Fold at ₹80/KG, Wash & Steam Iron at ₹120/KG. Free doorstep pickup & delivery on orders above ₹399.",
    h1: "Transparent Laundry Prices in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Pricing", item: `${SITE_URL}/pricing/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <span>Pricing</span></nav>
        <h1>Transparent Laundry Prices in Hyderabad</h1>
        <p>Simple, honest pricing with zero hidden charges. Wash &amp; Fold at ₹80/KG, Wash &amp; Steam Iron at ₹120/KG, and free doorstep pickup on orders above ₹399.</p>
      </main>
    `,
  },

  // 22. About
  {
    path: "/about/",
    title: "About Universal Laundry Services | Hyderabad Garment Care",
    description: "Learn about Universal Laundry Services at Jubilee Hills Road No 5, Hyderabad. Hygienic segregated washing, eco-friendly detergents, and dependable doorstep service.",
    h1: "About Universal Laundry Services in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "About Us", item: `${SITE_URL}/about/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <span>About Us</span></nav>
        <h1>About Universal Laundry Services in Hyderabad</h1>
        <p>Headquartered on Jubilee Hills Road No 5, Universal Laundry Services was established to bring reliable, hygienic, and convenient doorstep fabric care to households across Hyderabad.</p>
      </main>
    `,
  },

  // 23. Contact
  {
    path: "/contact/",
    title: "Contact Universal Laundry Services | Hyderabad Laundry Pickup",
    description: "Contact Universal Laundry Services in Jubilee Hills, Hyderabad. Call or WhatsApp +91 94949 13323 for doorstep laundry pickup and inquiries across Hyderabad.",
    h1: "Contact Universal Laundry Services Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Contact", item: `${SITE_URL}/contact/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <span>Contact</span></nav>
        <h1>Contact Universal Laundry Services Hyderabad</h1>
        <p>Reach us by phone at +91 94949 13323 or via WhatsApp for fast doorstep laundry pickup across Hyderabad.</p>
      </main>
    `,
  },

  // 24. Book
  {
    path: "/book/",
    title: "Book Laundry Pickup Online | Universal Laundry Services Hyderabad",
    description: "Schedule your laundry pickup in Hyderabad in under 2 minutes. Select services, pick your date & time slot, and enjoy doorstep delivery.",
    h1: "Schedule Laundry Pickup & Delivery in Hyderabad",
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Book", item: `${SITE_URL}/book/` },
    ],
    contentHtml: `
      <main>
        <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <span>Book</span></nav>
        <h1>Schedule Laundry Pickup &amp; Delivery in Hyderabad</h1>
        <p>Book doorstep laundry collection across Hyderabad in under two minutes.</p>
      </main>
    `,
  },
];

async function prerender() {
  const templatePath = path.resolve(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("dist/index.html not found! Run vite build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, "utf-8");
  console.log(`Starting static prerendering for ${routes.length} canonical routes...`);

  for (const route of routes) {
    const canonicalUrl = `${SITE_URL}${route.path}`;
    let html = baseHtml;

    // 1. Replace Title
    html = html.replace(
      /<title>.*?<\/title>/i,
      `<title>${escapeHtml(route.title)}</title>`
    );

    // 2. Replace Meta Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // 3. Replace Canonical
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // 4. Replace OG Tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // 5. Replace Twitter Tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
    );

    // 6. Injected static HTML for crawlers inside #root
    let bodyMarkup = route.contentHtml;
    if (!bodyMarkup && route.localityName) {
      bodyMarkup = `
        <main>
          <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/laundry-service-hyderabad/">Hyderabad</a> &gt; <span>${route.localityName}</span></nav>
          <h1>${route.h1}</h1>
          <p>${route.description}</p>
          <section>
            <h2>Doorstep Services in ${route.localityName}</h2>
            <ul>
              <li><a href="/services/wash-and-fold/">Wash &amp; Fold in ${route.localityName}</a></li>
              <li><a href="/services/wash-and-iron/">Wash &amp; Steam Iron in ${route.localityName}</a></li>
              <li><a href="/services/dry-cleaning/">Dry Cleaning in ${route.localityName}</a></li>
              <li><a href="/services/steam-ironing/">Steam Ironing in ${route.localityName}</a></li>
            </ul>
          </section>
        </main>
      `;
    }

    if (bodyMarkup) {
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root"><div class="prerender-seo">${bodyMarkup}</div></div>`
      );
    }

    // Determine target directory and file
    const cleanPath = route.path.replace(/^\/|\/$/g, "");
    const targetDir = cleanPath ? path.resolve(distDir, cleanPath) : distDir;
    fs.mkdirSync(targetDir, { recursive: true });
    const targetFile = path.resolve(targetDir, "index.html");

    fs.writeFileSync(targetFile, html, "utf-8");
    console.log(`✓ Prerendered ${route.path} -> ${path.relative(distDir, targetFile)}`);
  }

  console.log(`All ${routes.length} canonical routes prerendered successfully with HTTP 200 static HTML!`);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

prerender();
