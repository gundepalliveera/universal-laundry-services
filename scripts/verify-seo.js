import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const expectedRoutes = [
  '/',
  '/services/',
  '/services/laundry/',
  '/services/wash-and-fold/',
  '/services/wash-and-iron/',
  '/services/dry-cleaning/',
  '/services/steam-ironing/',
  '/services/doorstep-pickup-delivery/',
  '/laundry-service-hyderabad/',
  '/laundry-service-jubilee-hills/',
  '/laundry-service-banjara-hills/',
  '/laundry-service-madhapur/',
  '/laundry-service-hitec-city/',
  '/laundry-service-gachibowli/',
  '/laundry-service-kondapur/',
  '/laundry-service-manikonda/',
  '/laundry-service-kukatpally/',
  '/laundry-service-miyapur/',
  '/laundry-service-kokapet/',
  '/laundry-service-narsingi/',
  '/pricing/',
  '/about/',
  '/contact/',
  '/book/'
];

let totalPassed = 0;
let totalFailed = 0;

console.log('--- STARTING SEO VERIFICATION CHECK ---');

for (const route of expectedRoutes) {
  const clean = route.replace(/^\/|\/$/g, '');
  const filePath = clean ? path.join(distDir, clean, 'index.html') : path.join(distDir, 'index.html');

  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: Missing file for ${route} at ${filePath}`);
    totalFailed++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  // 1. Check title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`FAIL [${route}]: Missing or empty <title>`);
    totalFailed++;
  }

  // 2. Check canonical
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i);
  if (!canonicalMatch || !canonicalMatch[1].startsWith('https://universallaundryservices.com/')) {
    console.error(`FAIL [${route}]: Invalid or missing canonical: ${canonicalMatch?.[1]}`);
    totalFailed++;
  }

  // 3. Check meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"\s*\/?>/i);
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`FAIL [${route}]: Missing or empty meta description`);
    totalFailed++;
  }

  // 4. Check H1 count (must be exactly 1)
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length !== 1) {
    console.error(`FAIL [${route}]: Expected exactly 1 <h1>, found ${h1Matches.length}`);
    totalFailed++;
  }

  // 5. Check JSON-LD
  const jsonLdMatches = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  if (jsonLdMatches.length === 0) {
    console.error(`FAIL [${route}]: No JSON-LD scripts found`);
    totalFailed++;
  } else {
    for (const tag of jsonLdMatches) {
      const content = tag.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
      try {
        JSON.parse(content);
      } catch (err) {
        console.error(`FAIL [${route}]: JSON-LD parse error: ${err.message}`);
        totalFailed++;
      }
    }
  }

  // 6. Check for forbidden fake marketing phrases
  const forbiddenPhrases = [
    'universallaundryservices.in',
    '99.9%',
    'hospital-grade',
    'certified specialists'
  ];
  for (const phrase of forbiddenPhrases) {
    if (html.includes(phrase)) {
      console.error(`FAIL [${route}]: Contains forbidden phrase "${phrase}"`);
      totalFailed++;
    }
  }

  totalPassed++;
}

// Check robots.txt
const robotsPath = path.join(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  if (robots.includes('https://universallaundryservices.com/sitemap.xml')) {
    console.log('✓ robots.txt verified with correct Sitemap URL');
  } else {
    console.error('FAIL: robots.txt missing canonical sitemap URL');
    totalFailed++;
  }
} else {
  console.error('FAIL: robots.txt not found in dist/');
  totalFailed++;
}

// Check sitemap.xml
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  if (sitemap.includes('https://universallaundryservices.com/')) {
    console.log('✓ sitemap.xml verified with canonical domain');
  }
  for (const route of expectedRoutes) {
    const loc = `https://universallaundryservices.com${route}`;
    if (!sitemap.includes(loc)) {
      console.error(`FAIL: sitemap.xml missing route ${loc}`);
      totalFailed++;
    }
  }
} else {
  console.error('FAIL: sitemap.xml not found in dist/');
  totalFailed++;
}

console.log(`\n--- SEO VERIFICATION SUMMARY ---`);
console.log(`Passed Routes Checked: ${totalPassed} / ${expectedRoutes.length}`);
console.log(`Failures: ${totalFailed}`);

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('ALL SEO AUDIT AND VERIFICATION CHECKS PASSED PERFECTLY!');
}
