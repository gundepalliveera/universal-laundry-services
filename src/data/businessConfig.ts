/**
 * Universal Laundry Services — Central Business Configuration
 * Single source of truth for NAP, official domain, contact details,
 * verified coordinates, and service areas in Hyderabad.
 */

export const businessConfig = {
  name: "Universal Laundry Services",
  legalName: "Universal Laundry Services",
  brandTagline: "Fresh Clothes, Happy Life",
  domain: "https://www.universallaundryservices.com",
  canonicalBase: "https://www.universallaundryservices.com",
  email: "care@universallaundryservices.com",
  phone: "9494913323",
  displayPhone: "+91 94949 13323",
  whatsappNumber: "919494913323",
  whatsappUrl: "https://wa.me/919494913323",
  address: {
    streetAddress: "Jubilee Hills Road No 5",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500033",
    addressCountry: "IN",
    formattedAddress: "Jubilee Hills Road No 5, Hyderabad - 500033, Telangana, India",
  },
  // Verified from customer Google Maps pin: https://maps.app.goo.gl/xQ3MGfGv9S1iSoJZ7?g_st=aw
  geo: {
    latitude: 17.4323769,
    longitude: 78.4224014,
    googleMapsUrl: "https://maps.app.goo.gl/xQ3MGfGv9S1iSoJZ7?g_st=aw",
  },
  openingHours: {
    days: "Monday to Sunday (All 7 Days)",
    opens: "08:00",
    closes: "21:00",
    display: "Open all days · 8:00 AM to 9:00 PM",
  },
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card, Debit Card, Net Banking",
  socialProfiles: {
    whatsapp: "https://wa.me/919494913323",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  // 11 Genuine Priority Service Neighborhoods in Hyderabad
  verifiedLocalities: [
    { name: "Jubilee Hills", slug: "jubilee-hills", landmark: "Road No. 1 to 45, Film Nagar, Checkpost" },
    { name: "Banjara Hills", slug: "banjara-hills", landmark: "Road No. 1 to 14, Taj Krishna, Care Hospital" },
    { name: "Madhapur", slug: "madhapur", landmark: "Ayyappa Society, Kavuri Hills, Durgam Cheruvu" },
    { name: "HITEC City", slug: "hitec-city", landmark: "Cyber Towers, Mindspace, Cyber Gateway" },
    { name: "Gachibowli", slug: "gachibowli", landmark: "Financial District, Telecom Nagar, IIIT Junction" },
    { name: "Kondapur", slug: "kondapur", landmark: "Botanical Garden Rd, Raghava Colony, Shilpa Park" },
    { name: "Manikonda", slug: "manikonda", landmark: "Puppalaguda, Secretariat Colony, Lanco Hills" },
    { name: "Kukatpally", slug: "kukatpally", landmark: "KPHB Colony, JNTU, Malaysian Township" },
    { name: "Miyapur", slug: "miyapur", landmark: "Allwyn X Roads, Mayuri Nagar, Miyapur Metro" },
    { name: "Kokapet", slug: "kokapet", landmark: "Neopolis, Golden Mile, Luxury Gated Villas" },
    { name: "Narsingi", slug: "narsingi", landmark: "ORR Junction, Alkapur Township, Puppalguda Rd" },
  ],
} as const;

export type BusinessConfig = typeof businessConfig;
