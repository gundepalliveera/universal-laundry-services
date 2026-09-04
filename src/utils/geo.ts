/**
 * Universal Laundry Services - Geographic Distance & Service Radius Calculation
 *
 * Hub: Jubilee Hills Road No. 5, Hyderabad
 * Service Radius: Maximum 20 KM
 */

export const LAUNDRY_HUB = {
  name: "Jubilee Hills Road No. 5, Hyderabad",
  shortName: "Jubilee Hills Rd No. 5",
  address: "Jubilee Hills Road No 5, Hyderabad - 500033",
  latitude: 17.4325,
  longitude: 78.4073,
  maxRadiusKm: 20,
} as const;

export type ServiceAvailabilityResult = {
  available: boolean;
  distanceKm: number;
  maxRadiusKm: number;
  status: "Service Available" | "Service Not Available";
  message: string;
};

/**
 * Calculates great-circle distance between two GPS coordinates using the Haversine formula.
 * @returns Distance in kilometers rounded to 1 decimal place.
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number = LAUNDRY_HUB.latitude,
  lon2: number = LAUNDRY_HUB.longitude,
): number {
  const R = 6371; // Earth's mean radius in kilometers
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Return rounded to 1 decimal place (e.g., 6.4 km)
  return Math.round(distance * 10) / 10;
}

/**
 * Checks if customer's GPS latitude and longitude fall within the 20 KM laundry hub service radius.
 *
 * IF distance <= 20 KM -> Service Available
 * ELSE -> Service Not Available
 */
export function checkServiceAvailability(
  customerLat: number,
  customerLon: number,
): ServiceAvailabilityResult {
  const distanceKm = calculateDistance(customerLat, customerLon);
  const available = distanceKm <= LAUNDRY_HUB.maxRadiusKm;

  return {
    available,
    distanceKm,
    maxRadiusKm: LAUNDRY_HUB.maxRadiusKm,
    status: available ? "Service Available" : "Service Not Available",
    message: available
      ? `Service Available — ${distanceKm} KM from Jubilee Hills Road No. 5 Hub (Within 20 KM limit)`
      : `Service Not Available — ${distanceKm} KM from Jubilee Hills Road No. 5 Hub (Exceeds 20 KM maximum radius)`,
  };
}
