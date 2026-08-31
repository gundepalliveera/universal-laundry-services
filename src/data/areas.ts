interface AreaInfo {
  name: string;
  slug: string;
  zone: string;
  nearby: string[];
}

const rawZones = [
  {
    zone: "Central Hyderabad",
    areas: [
      "Abids", "Koti", "Nampally", "Basheerbagh", "Himayatnagar", "Lakdikapul", 
      "Khairatabad", "Somajiguda", "Punjagutta", "Saifabad", "Masab Tank", 
      "Domalguda", "Narayanguda", "Chikkadpally", "RTC X Roads", "Musheerabad"
    ]
  },
  {
    zone: "West Hyderabad",
    areas: [
      "Chandanagar", "Miyapur", "Madinaguda", "Hafeezpet", "Kondapur", 
      "Kothaguda", "Serilingampally", "Lingampally", "BHEL", "Beeramguda", 
      "Ameenpur", "Bachupally", "Nizampet", "Pragathi Nagar", "Kukatpally", 
      "KPHB", "Moosapet", "Hyder Nagar", "JNTU"
    ]
  },
  {
    zone: "HITEC City & IT Corridor",
    areas: [
      "HITEC City", "Madhapur", "Gachibowli", "Financial District", 
      "Nanakramguda", "Raidurg", "Khajaguda", "Manikonda", "Puppalaguda", 
      "Narsingi", "Kokapet", "Tellapur", "Osman Nagar", "Gopanapally"
    ]
  },
  {
    zone: "North Hyderabad",
    areas: [
      "Secunderabad", "Begumpet", "Paradise", "Patny", "Bowenpally", "Alwal", 
      "Old Bowenpally", "Suchitra", "Kompally", "Jeedimetla", "Quthbullapur", 
      "Chintal", "Shapur Nagar", "Yapral", "Sainikpuri", "Malkajgiri", 
      "Neredmet", "Karkhana", "Trimulgherry", "Marredpally"
    ]
  },
  {
    zone: "East Hyderabad",
    areas: [
      "Uppal", "Habsiguda", "Tarnaka", "Nacharam", "Mallapur", "Boduppal", 
      "Peerzadiguda", "Nagole", "Ramanthapur", "Amberpet", "Vidyanagar", 
      "Lalapet", "Moula Ali", "ECIL", "Kapra", "Kushaiguda", "LB Nagar", 
      "Dilsukhnagar", "Kothapet", "Chaitanyapuri", "Vanasthalipuram", "Hayathnagar"
    ]
  },
  {
    zone: "South Hyderabad",
    areas: [
      "Mehdipatnam", "Tolichowki", "Attapur", "Rajendranagar", "Bandlaguda", 
      "Chandrayangutta", "Falaknuma", "Bahadurpura", "Karwan", "Gudimalkapur", 
      "Langar Houz", "Shaikpet", "Humayun Nagar", "Lakdi Ka Pul", "Aramghar", "Shamshabad"
    ]
  },
  {
    zone: "Banjara Hills & Jubilee Hills",
    areas: [
      "Banjara Hills", "Jubilee Hills", "Film Nagar", "Srinagar Colony", 
      "Yousufguda", "Krishna Nagar"
    ]
  },
  {
    zone: "Growing Areas & Suburbs",
    areas: [
      "Kollur", "Mokila", "Patancheru", "Isnapur", "Shankarpalli", 
      "Gandipet", "Tukkuguda", "Adibatla", "Pocharam", "Ghatkesar"
    ]
  }
];

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Flatten into a single array with generated slugs and cross-links
const allAreas: AreaInfo[] = [];

rawZones.forEach((z) => {
  z.areas.forEach((areaName, index) => {
    // Pick 3 nearby areas from the same zone for internal linking
    const nearby = [
      z.areas[(index + 1) % z.areas.length],
      z.areas[(index + 2) % z.areas.length],
      z.areas[(index + 3) % z.areas.length],
    ];

    allAreas.push({
      name: areaName,
      slug: toSlug(areaName),
      zone: z.zone,
      nearby,
    });
  });
});

// Helper to get zone data grouped
export const groupedAreas = rawZones.map(z => ({
  zone: z.zone,
  areas: z.areas.map(a => ({ name: a, slug: toSlug(a) }))
}));

// Helper to find a specific area by slug
export const getAreaBySlug = (slug: string) => allAreas.find(a => a.slug === slug);
