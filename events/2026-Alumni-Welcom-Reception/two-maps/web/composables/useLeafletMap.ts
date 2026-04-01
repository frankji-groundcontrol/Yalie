import { ref, type Ref } from "vue";
import type L from "leaflet";
import type { ArtWalk, GuideCategory, GuideLocation } from "@yalie/shared";
import { CATEGORY_COLORS, categoryVisuals, renderIconSegments } from "../components/local/LocalCategoryData";
import { useLocalGuideState } from "./useLocalGuideState";

type ClusterGroupLike = L.Layer & {
  clearLayers: () => void;
  addLayer: (layer: L.Layer) => void;
  zoomToShowLayer: (layer: L.Layer, callback: () => void) => void;
};

type WalkWithGeometry = ArtWalk & {
  routeGeometry?: [number, number][];
};

const { data, filteredLocations, activeLocationId, selectedLocation, activeWalk, activeWalkId, openLocationDetail } = useLocalGuideState();

let map: L.Map | null = null;
let clusterGroup: ClusterGroupLike | null = null;
let markerMap: Map<string, L.Marker> = new Map();
let walkLayerGroup: L.FeatureGroup | null = null;
let resizeObserver: ResizeObserver | null = null;
let leafletLib: typeof import("leaflet").default | null = null;

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createMarkerIcon(category: GuideCategory): L.DivIcon | null {
  if (!leafletLib) {
    return null;
  }

  const color = CATEGORY_COLORS[category];
  const pathsHtml = renderIconSegments(categoryVisuals[category].icon);

  return leafletLib.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="${color}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
      <g transform="translate(5,5) scale(0.75)">${pathsHtml}</g>
    </svg>`,
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38]
  });
}

function createClusterIcon(cluster: { getChildCount: () => number }): L.DivIcon | null {
  if (!leafletLib) {
    return null;
  }

  const count = cluster.getChildCount();
  const size = count < 10 ? 36 : count < 25 ? 44 : 52;

  return leafletLib.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:rgba(74,85,104,0.88);border:2px solid #7BA7BC;display:flex;align-items:center;justify-content:center;color:#E2E8F0;font-size:${size < 40 ? 12 : 14}px;font-weight:600;font-family:Inter,sans-serif;box-shadow:0 0 10px rgba(123,167,188,0.35)">${count}</div>`,
    className: "",
    iconSize: [size, size]
  });
}

function buildPopupHtml(location: GuideLocation): string {
  const rating = typeof location.rating === "number"
    ? `<span style="margin-left:6px;font-size:12px;color:#888">${location.rating.toFixed(1)}</span>`
    : "";

  return `
    <div style="font-family:Inter,sans-serif;max-width:220px">
      <strong style="font-size:14px;display:block">${escapeHtml(location.nameCn)}</strong>
      <span style="font-size:12px;color:#666">${escapeHtml(location.name)}</span>
      <span style="display:inline-block;margin-top:6px;padding:2px 8px;font-size:11px;border-radius:2px;background:${CATEGORY_COLORS[location.category]};color:#fff">${escapeHtml(categoryVisuals[location.category].label)}</span>
      ${rating}
      <button onclick="document.dispatchEvent(new CustomEvent('show-detail',{detail:'${escapeHtml(location.id)}'}))" style="display:block;margin-top:8px;font-size:12px;color:#4A5568;background:none;border:none;cursor:pointer;text-decoration:underline;padding:0">View details</button>
    </div>
  `;
}

function updateWalkRoute(): void {
  if (!map || !leafletLib) {
    return;
  }

  if (walkLayerGroup) {
    map.removeLayer(walkLayerGroup);
    walkLayerGroup = null;
  }

  if (!activeWalk.value || !activeWalkId.value) {
    return;
  }

  const locationsById = new Map(data.value.locations.map((location) => [location.id, location]));
  const walkStops = activeWalk.value.stops
    .map((id) => locationsById.get(id))
    .filter((location): location is GuideLocation => Boolean(location));

  if (walkStops.length < 2) {
    return;
  }

  const routeData: WalkWithGeometry = activeWalk.value;
  const routeCoords = routeData.routeGeometry
    ? routeData.routeGeometry
    : walkStops.map((location) => [location.coordinates.lat, location.coordinates.lng] as [number, number]);

  const layers: L.Layer[] = [];
  const polyline = leafletLib.polyline(routeCoords, {
    color: "#7BA7BC",
    weight: 3.5,
    dashArray: "10 8",
    opacity: 0.9,
    lineJoin: "round"
  });
  layers.push(polyline);

  for (const [index, location] of walkStops.entries()) {
    const num = index + 1;
    const stopMarker = leafletLib.marker([location.coordinates.lat, location.coordinates.lng], {
      icon: leafletLib.divIcon({
        html: `<div style="position:relative">
          <div style="width:24px;height:24px;border-radius:50%;background:#7BA7BC;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;font-family:Inter,sans-serif;box-shadow:0 2px 8px rgba(26,31,46,0.35)">${num}</div>
          <div style="position:absolute;left:30px;top:2px;white-space:nowrap;background:rgba(26,31,46,0.88);color:#E2E8F0;padding:2px 8px;font-size:12px;font-family:Inter,sans-serif;border-radius:2px;pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,0.2)">${location.nameCn}</div>
        </div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      }),
      zIndexOffset: 1000
    });

    stopMarker.bindPopup(
      `<div style="font-family:Inter,sans-serif"><strong>Stop ${num}: ${location.nameCn}</strong><br/><span style="font-size:12px;color:#666">${location.name}</span></div>`,
      { maxWidth: 220, className: "walk-stop-popup" }
    );
    layers.push(stopMarker);
  }

  walkLayerGroup = leafletLib.featureGroup(layers);
  walkLayerGroup.addTo(map);

  const bounds = walkLayerGroup.getBounds();
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }
}

function updateMarkers(): void {
  if (!clusterGroup || !leafletLib || !map) {
    return;
  }

  clusterGroup.clearLayers();
  markerMap.clear();

  for (const location of filteredLocations.value) {
    const markerIcon = createMarkerIcon(location.category);
    if (!markerIcon) {
      continue;
    }

    const marker = leafletLib.marker([location.coordinates.lat, location.coordinates.lng], { icon: markerIcon });
    marker.bindPopup(buildPopupHtml(location), { closeButton: false, offset: [0, -18] });
    marker.on("click", () => {
      openLocationDetail(location.id);
    });

    markerMap.set(location.id, marker);
    clusterGroup.addLayer(marker);
  }

  const boundsSource = filteredLocations.value.length ? filteredLocations.value : data.value.locations;
  const bounds = leafletLib.latLngBounds(
    boundsSource.map((location) => [location.coordinates.lat, location.coordinates.lng] as [number, number])
  );

  if (bounds.isValid()) {
    map.fitBounds(bounds.pad(0.18), { maxZoom: 14, animate: false });
  }

  updateWalkRoute();
}

function focusMarkerFromCard(locationId: string): void {
  if (!map || !clusterGroup) {
    return;
  }

  const marker = markerMap.get(locationId);
  if (!marker) {
    return;
  }

  activeLocationId.value = locationId;
  clusterGroup.zoomToShowLayer(marker, () => {
    map?.panTo(marker.getLatLng(), { animate: true, duration: 0.6 });
    marker.openPopup();
  });

  const location = data.value.locations.find((loc) => loc.id === locationId);
  if (location) {
    selectedLocation.value = location;
  }
}

function resetMap(): void {
  if (!map || !leafletLib) {
    return;
  }

  const boundsSource = filteredLocations.value.length ? filteredLocations.value : data.value.locations;
  const bounds = leafletLib.latLngBounds(
    boundsSource.map((location) => [location.coordinates.lat, location.coordinates.lng] as [number, number])
  );

  if (bounds.isValid()) {
    map.fitBounds(bounds.pad(0.18), { maxZoom: 14, animate: true });
  }
}

function cleanup(): void {
  if (walkLayerGroup && map) {
    map.removeLayer(walkLayerGroup);
  }

  clusterGroup?.clearLayers();
  map?.remove();
  map = null;
  clusterGroup = null;
  walkLayerGroup = null;
  markerMap.clear();

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
}

export function useLeafletMap(mapContainer?: Ref<HTMLElement | null>) {
  const internalContainer = mapContainer ?? ref<HTMLElement | null>(null);

  async function initMap(): Promise<void> {
    if (!internalContainer.value) {
      return;
    }

    const leaf = (await import("leaflet")).default;
    await import("leaflet.markercluster");
    leafletLib = leaf;

    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    if (map) {
      clusterGroup?.clearLayers();
      map.remove();
      map = null;
      markerMap.clear();
      walkLayerGroup = null;
    }

    const element = internalContainer.value;
    if ("_leaflet_id" in element) {
      Reflect.deleteProperty(element as Record<string, unknown>, "_leaflet_id");
    }

    map = leaf.map(element, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true
    });

    leaf.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
      detectRetina: true
    }).addTo(map);

    const clusterFactory = (leaf as typeof leaf & {
      markerClusterGroup: (options: {
        disableClusteringAtZoom: number;
        spiderfyOnMaxZoom: boolean;
        showCoverageOnHover: boolean;
        maxClusterRadius: number;
        spiderfyDistanceMultiplier: number;
        chunkedLoading: boolean;
        iconCreateFunction: (cluster: { getChildCount: () => number }) => L.DivIcon | null;
      }) => ClusterGroupLike;
    }).markerClusterGroup;

    clusterGroup = clusterFactory({
      disableClusteringAtZoom: 15,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      maxClusterRadius: 60,
      spiderfyDistanceMultiplier: 1.5,
      chunkedLoading: true,
      iconCreateFunction: (cluster) => createClusterIcon(cluster)
    });

    map.addLayer(clusterGroup);
    updateMarkers();

    resizeObserver = new ResizeObserver(() => {
      map?.invalidateSize();
    });
    resizeObserver.observe(element);
  }

  return {
    initMap,
    updateMarkers,
    updateWalkRoute,
    focusMarkerFromCard,
    resetMap,
    cleanup
  };
}
