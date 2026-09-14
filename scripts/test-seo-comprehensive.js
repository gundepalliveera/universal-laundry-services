import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

console.log("==================================================");
console.log("STARTING COMPREHENSIVE SEO & PRODUCTION VERIFICATION");
console.log("==================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`PASS: ${message}`);
    passed++;
  } else {
    console.error(`FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify dist/index.html exists
const indexPath = path.join(distDir, "index.html");
assert(fs.existsSync(indexPath), "dist/index.html exists");

const indexHtml = fs.readFileSync(indexPath, "utf-8");

// Requirement 1: Single Homepage H1
const h1Matches = indexHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
assert(h1Matches.length === 1, `Exactly ONE <h1> exists (found ${h1Matches.length})`);
assert(
  h1Matches[0] && h1Matches[0].includes("Laundry Services in Hyderabad"),
  `H1 content is 'Laundry Services in Hyderabad' (found: ${h1Matches[0]?.trim()})`
);
assert(
  !h1Matches.some((h) => h.includes("Fresh Clothes, Happy Life")),
  "'Fresh Clothes, Happy Life.' is not an H1"
);
assert(
  indexHtml.includes("Fresh Clothes, Happy Life"),
  "'Fresh Clothes, Happy Life.' exists as tagline/subheading"
);

// Requirement 2: Hero Content
const expectedHero =
  "Universal Laundry Services provides professional laundry pickup and delivery in Hyderabad, including wash & fold, steam ironing, premium wash, dry cleaning, shoe cleaning and bag cleaning.";
assert(
  indexHtml.includes(
    "Universal Laundry Services provides professional laundry pickup and delivery in Hyderabad, including wash &amp; fold, steam ironing, premium wash, dry cleaning, shoe cleaning and bag cleaning."
  ) || indexHtml.includes(expectedHero),
  "Hero content matches the exact required text with brand name"
);

// Requirement 3: Page Title
const titleMatch = indexHtml.match(/<title>([^<]+)<\/title>/i);
assert(
  titleMatch &&
    titleMatch[1].trim() ===
      "Universal Laundry Services | Laundry Service in Hyderabad",
  `Page title matches: '${titleMatch?.[1]}'`
);

// Requirement 4: Meta Description
const descMatch = indexHtml.match(
  /<meta\s+name="description"\s+content="([^"]+)"\s*\/?>/i
);
assert(
  descMatch &&
    (descMatch[1] ===
      "Universal Laundry Services provides professional laundry pickup and delivery in Hyderabad, including wash & fold, steam ironing, premium wash, dry cleaning, shoe cleaning and bag cleaning." ||
      descMatch[1] ===
        "Universal Laundry Services provides professional laundry pickup and delivery in Hyderabad, including wash &amp; fold, steam ironing, premium wash, dry cleaning, shoe cleaning and bag cleaning."),
  "Meta description matches exact required text"
);

// Requirement 5: Canonical URL
const canonicalMatch = indexHtml.match(
  /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i
);
assert(
  canonicalMatch &&
    canonicalMatch[1] === "https://www.universallaundryservices.com/",
  `Canonical URL is strictly 'https://www.universallaundryservices.com/' (found: ${canonicalMatch?.[1]})`
);

// Requirement 6: Robots Meta
const robotsMatch = indexHtml.match(
  /<meta\s+name="robots"\s+content="([^"]+)"\s*\/?>/i
);
assert(
  robotsMatch && robotsMatch[1].includes("index, follow"),
  "Robots meta is 'index, follow'"
);

// Requirement 7: Open Graph
assert(
  indexHtml.includes(
    '<meta property="og:title" content="Universal Laundry Services | Laundry Service in Hyderabad"'
  ),
  "Open Graph og:title matches brand-first format"
);
assert(
  indexHtml.includes(
    '<meta property="og:description" content="Professional laundry pickup and delivery services in Hyderabad."'
  ),
  "Open Graph og:description matches"
);
assert(
  indexHtml.includes(
    '<meta property="og:url" content="https://www.universallaundryservices.com/"'
  ),
  "Open Graph og:url matches canonical"
);
assert(
  indexHtml.includes('<meta property="og:type" content="website"'),
  "Open Graph og:type is website"
);
assert(
  indexHtml.includes(
    '<meta property="og:site_name" content="Universal Laundry Services"'
  ),
  "Open Graph og:site_name is Universal Laundry Services"
);
assert(
  indexHtml.includes(
    '<meta property="og:image" content="https://www.universallaundryservices.com/og-image.webp"'
  ),
  "Open Graph og:image points to existing webp image"
);

// Requirement 8: Twitter/X Cards
assert(
  indexHtml.includes(
    '<meta name="twitter:card" content="summary_large_image"'
  ),
  "Twitter card is summary_large_image"
);
assert(
  indexHtml.includes(
    '<meta name="twitter:title" content="Universal Laundry Services | Laundry Service in Hyderabad"'
  ),
  "Twitter title matches brand-first format"
);
assert(
  indexHtml.includes(
    '<meta name="twitter:description" content="Professional laundry pickup and delivery services in Hyderabad."'
  ),
  "Twitter description matches"
);
assert(
  indexHtml.includes(
    '<meta name="twitter:image" content="https://www.universallaundryservices.com/og-image.webp"'
  ),
  "Twitter image points to existing webp image"
);

// Requirement 9 & 10: Service descriptions & image alts in source
const servicesSource = fs.readFileSync(
  path.join(projectRoot, "src/components/Services.tsx"),
  "utf-8"
);
const siteSource = fs.readFileSync(
  path.join(projectRoot, "src/data/site.ts"),
  "utf-8"
);
const serviceNames = [
  "Wash & Fold",
  "Wash & Steam Iron",
  "Premium Wash",
  "Shoe Cleaning",
  "Bag Cleaning",
  "Dry Cleaning",
];
for (const s of serviceNames) {
  assert(
    siteSource.includes(`"${s}"`) || siteSource.includes(`'${s}'`),
    `Service definition includes semantic service: ${s}`
  );
}
assert(
  servicesSource.includes("<h3") && servicesSource.includes("{service.name}"),
  "Services component renders services with semantic <h3> headings"
);

const requiredAlts = [
  "Wash and fold laundry service in Hyderabad",
  "Wash and steam ironing service",
  "Premium garment washing service",
  "Shoe cleaning service",
  "Bag cleaning service",
  "Dry cleaning service in Hyderabad",
];
for (const alt of requiredAlts) {
  assert(
    servicesSource.includes(alt),
    `Services component includes required alt: "${alt}"`
  );
}

// Requirement 8 & 11: H2 Headings
const expectedH2s = [
  "Our Laundry Services",
  "Laundry Pickup & Delivery in Hyderabad",
  "Why Choose Universal Laundry Services?",
  "How Our Laundry Service Works",
  "Laundry Service Areas in Hyderabad",
  "Frequently Asked Questions",
  "Contact Universal Laundry Services",
];
for (const h2 of expectedH2s) {
  const cleanH2 = h2.replace(/&/g, "&amp;");
  assert(
    indexHtml.includes(h2) || indexHtml.includes(cleanH2),
    `H2 present: '${h2}'`
  );
}

const valuePoints = [
  "Hygienic laundry process",
  "Fabric-safe cleaning",
  "Professional garment care",
  "Convenient pickup and delivery",
  "Quality-focused service",
  "Multiple laundry and cleaning services",
];
for (const pt of valuePoints) {
  assert(indexHtml.includes(pt), `Value point present: "${pt}"`);
}

// Requirement 10: Service Areas
const areas = [
  "Jubilee Hills",
  "Banjara Hills",
  "Madhapur",
  "Kondapur",
  "Gachibowli",
  "HITEC City",
  "Manikonda",
];
for (const a of areas) {
  assert(indexHtml.includes(a), `Service area mentioned: ${a}`);
}

// Requirement 11: FAQ Section
const faqs = [
  "What laundry services does Universal Laundry Services provide in Hyderabad?",
  "Do you provide laundry pickup and delivery in Hyderabad?",
  "How much does laundry service cost in Hyderabad?",
  "How long does laundry service take?",
  "Do you provide dry cleaning in Hyderabad?",
  "Do you clean shoes and bags?",
];
for (const q of faqs) {
  assert(indexHtml.includes(q), `FAQ question present: "${q}"`);
}

// Requirement 12, 13, 14, 15: Structured Data
const jsonLdMatches =
  indexHtml.match(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi
  ) || [];
assert(
  jsonLdMatches.length >= 3,
  `At least 3 JSON-LD script tags found (found ${jsonLdMatches.length})`
);

let hasLocalBusiness = false;
let hasWebSite = false;
let hasOrganization = false;

for (const script of jsonLdMatches) {
  const jsonText = script
    .replace(/<script[^>]*>/i, "")
    .replace(/<\/script>/i, "")
    .trim();
  try {
    const data = JSON.parse(jsonText);
    const type = data["@type"];
    if (
      type === "LocalBusiness" ||
      type === "DryCleaningOrLaundry" ||
      (Array.isArray(type) && type.includes("LocalBusiness"))
    ) {
      hasLocalBusiness = true;
      assert(
        data.name === "Universal Laundry Services",
        "LocalBusiness name is 'Universal Laundry Services'"
      );
      assert(
        data.url === "https://www.universallaundryservices.com/",
        "LocalBusiness URL is canonical 'https://www.universallaundryservices.com/'"
      );
      assert(
        data.telephone === "+919494913323",
        "LocalBusiness telephone is verified real number"
      );
      assert(
        data.address && data.address.addressLocality === "Hyderabad",
        "LocalBusiness address locality is Hyderabad"
      );
    }
    if (type === "WebSite") {
      hasWebSite = true;
      assert(
        data.name === "Universal Laundry Services",
        "WebSite name is 'Universal Laundry Services'"
      );
      assert(
        data.url === "https://www.universallaundryservices.com/",
        "WebSite URL is 'https://www.universallaundryservices.com/'"
      );
    }
    if (type === "Organization") {
      hasOrganization = true;
      assert(
        data.name === "Universal Laundry Services",
        "Organization name is 'Universal Laundry Services'"
      );
      assert(
        data.url === "https://www.universallaundryservices.com/",
        "Organization URL is 'https://www.universallaundryservices.com/'"
      );
    }
  } catch (err) {
    assert(false, `JSON-LD parsing failed: ${err.message}`);
  }
}
assert(hasLocalBusiness, "LocalBusiness JSON-LD schema validated");
assert(hasWebSite, "WebSite JSON-LD schema validated");
assert(hasOrganization, "Organization JSON-LD schema validated");

// Requirement 18: Robots.txt
const robotsTxtPath = path.join(distDir, "robots.txt");
assert(fs.existsSync(robotsTxtPath), "dist/robots.txt exists");
const robotsTxt = fs.readFileSync(robotsTxtPath, "utf-8");
assert(
  robotsTxt.includes("User-agent: *") &&
    robotsTxt.includes("Allow: /") &&
    robotsTxt.includes(
      "Sitemap: https://www.universallaundryservices.com/sitemap.xml"
    ),
  "robots.txt has exact required directives"
);

// Requirement 19: Sitemap.xml
const sitemapPath = path.join(distDir, "sitemap.xml");
assert(fs.existsSync(sitemapPath), "dist/sitemap.xml exists");
const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
assert(
  sitemapXml.includes(
    "<loc>https://www.universallaundryservices.com/</loc>"
  ),
  "sitemap.xml includes root canonical URL"
);
assert(
  !sitemapXml.includes("http://localhost"),
  "sitemap.xml does NOT contain localhost"
);
assert(
  !sitemapXml.includes("universal-laundry-services.vercel.app"),
  "sitemap.xml does NOT contain old vercel domain"
);

// Requirement 21: Check for Vercel preview domain
assert(
  !indexHtml.includes("universal-laundry-services.vercel.app"),
  "dist/index.html does not reference old vercel domain"
);

// Requirement 24: Mobile 2-column styling verified in Services.tsx
assert(
  servicesSource.includes("grid-cols-2"),
  "Services section preserves mobile 2-column grid layout (grid-cols-2)"
);

console.log("==================================================");
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("ALL TESTS COMPLETED SUCCESSFULLY!");
}
