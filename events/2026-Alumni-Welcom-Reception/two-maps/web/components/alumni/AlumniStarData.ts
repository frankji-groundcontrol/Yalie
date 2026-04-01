/**
 * Static constants for the Constellation of Lives alumni journey map.
 * City coordinates, star colors, and category visual data.
 */

export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "New Haven": { lat: 41.3083, lng: -72.9279 },
  "Shanghai": { lat: 31.2304, lng: 121.4737 },
  "Beijing": { lat: 39.9042, lng: 116.4074 },
  "Boston": { lat: 42.3601, lng: -71.0589 },
  "New York": { lat: 40.7128, lng: -74.006 },
  "London": { lat: 51.5074, lng: -0.1278 },
  "Seoul": { lat: 37.5665, lng: 126.978 },
  "Hong Kong": { lat: 22.3193, lng: 114.1694 },
  "Singapore": { lat: 1.3521, lng: 103.8198 },
  "Monterrey": { lat: 25.6866, lng: -100.3161 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "Shenzhen": { lat: 22.5431, lng: 114.0579 },
  "Vancouver": { lat: 49.2827, lng: -123.1207 },
  "Toronto": { lat: 43.6532, lng: -79.3832 },
  "Bengaluru": { lat: 12.9716, lng: 77.5946 },
  "Mumbai": { lat: 19.076, lng: 72.8777 },
  "Dubai": { lat: 25.2048, lng: 55.2708 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Chicago": { lat: 41.8781, lng: -87.6298 },
  "Washington DC": { lat: 38.9072, lng: -77.0369 },
  "Seattle": { lat: 47.6062, lng: -122.3321 },
  "Sydney": { lat: -33.8688, lng: 151.2093 },
  "Paris": { lat: 48.8566, lng: 2.3522 },
  "Berlin": { lat: 52.52, lng: 13.405 },
  "Zurich": { lat: 47.3769, lng: 8.5417 },
  "Taipei": { lat: 25.033, lng: 121.5654 },
  "Hangzhou": { lat: 30.2741, lng: 120.1551 },
  "Nanjing": { lat: 32.0603, lng: 118.7969 },
  "Melbourne": { lat: -37.8136, lng: 144.9631 }
};

/** New Haven = shared origin star */
export const ORIGIN_CITY = CITY_COORDS["New Haven"];

/** Shanghai = reunion/event star */
export const EVENT_CITY = CITY_COORDS["Shanghai"];

/**
 * Star color assigned per alumni profile (index-based).
 * Uses the Dal\u00ed warm palette with enough contrast on Positron tiles.
 * Hex values only \u2014 CSS var() cannot be used in Leaflet JS options.
 */
export const STAR_COLORS: string[] = [
  "#E1A030", // Melting Orange \u2014 Frank Ji
  "#96B2DF", // Port Lligat Azure \u2014 Marina Ross
  "#D35400", // Catalan Sunset \u2014 Daniel Park
  "#5A7A4A", // Apple Green \u2014 Lucia Herrera
  "#E1B662", // Catalan Gold \u2014 Owen Cheng
  "#7BA7BC"  // Magritte Sky \u2014 Priya Menon
];

/** Glow color for the shared origin (New Haven) star */
export const ORIGIN_STAR_COLOR = "#E1B662";

/** Glow color for the event/reunion (Shanghai) star */
export const EVENT_STAR_COLOR = "#D35400";

/** Glow color for the "Map Your Journey" invitation star */
export const BUILDER_STAR_COLOR = "#96B2DF";

export const GLOBE_DEFAULT_VIEW = { lat: 25, lng: 10, altitude: 2.15 };

export const CAMERA_FLY_DURATION_MS = 1400;

export const ARC_DRAW_DURATION_MS = 2800;

export const ARC_DASH_LENGTH = 0.25;

export const ARC_DASH_GAP = 1.15;

export const ATMOSPHERE_COLOR = "#6A9FD8";

export const GLOBE_BACKGROUND_COLOR = "#02050f";

export const GLOBE_AUTO_ROTATE_SPEED = 0.2;

export const GLOBE_TEXTURE = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg";
export const STARFIELD_TEXTURE = "https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png";
