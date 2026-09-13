// Small geo helpers used to sort and label results.

const EARTH_RADIUS_M = 6371000;

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Distance between two lat/lon points, in meters, using the haversine formula.
 */
export function distanceInMeters(fromLat, fromLon, toLat, toLon) {
  const dLat = toRadians(toLat - fromLat);
  const dLon = toRadians(toLon - fromLon);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(fromLat)) *
      Math.cos(toRadians(toLat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_M * c;
}

/**
 * Turns a raw meter count into something a person would actually say.
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters / 10) * 10} m away`;
  }
  return `${(meters / 1000).toFixed(1)} km away`;
}
