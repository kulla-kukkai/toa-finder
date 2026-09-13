import { distanceInMeters } from './distance';

const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter';

// How far around the person we look, in meters.
const SEARCH_RADIUS_M = 1500;

function buildQuery(lat, lon, radius) {
  return `
    [out:json][timeout:25];
    (
      node["amenity"="toilets"](around:${radius},${lat},${lon});
      way["amenity"="toilets"](around:${radius},${lat},${lon});
      relation["amenity"="toilets"](around:${radius},${lat},${lon});
    );
    out center tags;
  `;
}

function elementCoords(element) {
  if (typeof element.lat === 'number' && typeof element.lon === 'number') {
    return { lat: element.lat, lon: element.lon };
  }
  if (element.center) {
    return { lat: element.center.lat, lon: element.center.lon };
  }
  return null;
}

function describeAccess(tags) {
  if (tags.fee === 'yes') return 'Paid';
  if (tags.fee === 'no') return 'Free';
  if (tags.access === 'customers') return 'Customers only';
  if (tags.access === 'private') return 'Private';
  return 'Unknown';
}

function normalizeElement(element, userLat, userLon) {
  const coords = elementCoords(element);
  if (!coords) return null;

  const tags = element.tags || {};

  return {
    id: `${element.type}/${element.id}`,
    lat: coords.lat,
    lon: coords.lon,
    name: tags.name || 'Public toilet',
    access: describeAccess(tags),
    wheelchair: tags.wheelchair === 'yes',
    openingHours: tags.opening_hours || null,
    operator: tags.operator || null,
    distanceMeters: distanceInMeters(userLat, userLon, coords.lat, coords.lon),
  };
}

/**
 * Queries the Overpass API (a free, keyless read layer over OpenStreetMap)
 * for toilets near the given coordinates, closest first.
 */
export async function fetchNearbyToilets(lat, lon, radius = SEARCH_RADIUS_M) {
  const response = await fetch(OVERPASS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: buildQuery(lat, lon, radius),
  });

  if (!response.ok) {
    throw new Error(`Overpass API responded with ${response.status}`);
  }

  const data = await response.json();
  const elements = Array.isArray(data.elements) ? data.elements : [];

  return elements
    .map((el) => normalizeElement(el, lat, lon))
    .filter(Boolean)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}
