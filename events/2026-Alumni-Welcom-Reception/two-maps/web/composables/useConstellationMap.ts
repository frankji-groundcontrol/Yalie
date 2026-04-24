import { ref, watch, type Ref, type WatchStopHandle } from "vue";
import type { AlumniProfile, JourneyMapData, JourneyStop } from "@yalie/shared";
import {
  ARC_DASH_GAP,
  ARC_DASH_LENGTH,
  ARC_DRAW_DURATION_MS,
  ATMOSPHERE_COLOR,
  BUILDER_STAR_COLOR,
  CAMERA_FLY_DURATION_MS,
  EVENT_CITY,
  EVENT_STAR_COLOR,
  GLOBE_AUTO_ROTATE_SPEED,
  GLOBE_BACKGROUND_COLOR,
  GLOBE_DEFAULT_VIEW,
  GLOBE_TEXTURE,
  ORIGIN_CITY,
  ORIGIN_STAR_COLOR,
  STAR_COLORS,
  STARFIELD_TEXTURE
} from "../components/alumni/AlumniStarData";
import { resolveJourneyAvatarState } from "../lib/alumniJourneySelection";
import { useAlumniState } from "./useAlumniState";

type JourneyProfileList = JourneyMapData["profiles"];

interface GlobePoint {
  id: string;
  lat: number;
  lng: number;
  color: string;
  radius: number;
  altitude: number;
  kind: "origin" | "event" | "journey-stop" | "builder-stop";
  order?: number;
}

interface GlobeAvatar {
  id: string;
  profileId: string;
  lat: number;
  lng: number;
  color: string;
  name: string;
  classYear: number;
  photoUrl?: string;
  opacity: number;
  scale: number;
  selected: boolean;
}

interface GlobeArc {
  id: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: [string, string];
  dashGap?: number;
  dashLength?: number;
  dashInitialGap?: number;
}

interface GlobeCoords {
  lat: number;
  lng: number;
  altitude?: number;
}

interface GlobeControls {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enablePan: boolean;
  minDistance: number;
  maxDistance: number;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
  dispose(): void;
}

interface GlobeMaterial {
  shininess?: number;
  emissiveIntensity?: number;
}

interface GlobeApi {
  width(value: number): GlobeApi;
  height(value: number): GlobeApi;
  globeImageUrl(value: string): GlobeApi;
  backgroundImageUrl(value: string): GlobeApi;
  backgroundColor(value: string): GlobeApi;
  showAtmosphere(value: boolean): GlobeApi;
  atmosphereColor(value: string): GlobeApi;
  atmosphereAltitude(value: number): GlobeApi;
  pointsData(data: GlobePoint[]): GlobeApi;
  pointLat(value: ((d: GlobePoint) => number) | string): GlobeApi;
  pointLng(value: ((d: GlobePoint) => number) | string): GlobeApi;
  pointColor(value: ((d: GlobePoint) => string) | string): GlobeApi;
  pointAltitude(value: ((d: GlobePoint) => number) | number | string): GlobeApi;
  pointRadius(value: ((d: GlobePoint) => number) | number | string): GlobeApi;
  pointsMerge(value: boolean): GlobeApi;
  htmlElementsData(data: GlobeAvatar[]): GlobeApi;
  htmlLat(value: ((d: GlobeAvatar) => number) | string): GlobeApi;
  htmlLng(value: ((d: GlobeAvatar) => number) | string): GlobeApi;
  htmlAltitude(value: ((d: GlobeAvatar) => number) | number | string): GlobeApi;
  htmlElement(value: (d: GlobeAvatar) => HTMLElement): GlobeApi;
  htmlElementVisibilityModifier(value: (el: HTMLElement, isVisible: boolean) => void): GlobeApi;
  arcsData(data: GlobeArc[]): GlobeApi;
  arcColor(value: ((d: GlobeArc) => [string, string]) | string): GlobeApi;
  arcDashLength(value: ((d: GlobeArc) => number) | number): GlobeApi;
  arcDashGap(value: ((d: GlobeArc) => number) | number): GlobeApi;
  arcDashInitialGap(value: ((d: GlobeArc) => number) | number): GlobeApi;
  arcDashAnimateTime(value: number): GlobeApi;
  arcAltitudeAutoScale(value: number): GlobeApi;
  arcStroke(value: number | null): GlobeApi;
  arcsTransitionDuration(value: number): GlobeApi;
  onPointClick(callback: (point: GlobePoint | null) => void): GlobeApi;
  onPointHover(callback: (point: GlobePoint | null) => void): GlobeApi;
  onGlobeClick(callback: (coords: GlobeCoords) => void): GlobeApi;
  controls(): GlobeControls;
  globeMaterial(): GlobeMaterial;
  pointOfView(target: GlobeCoords, transitionMs?: number): GlobeApi;
  _destructor(): void;
}

type GlobeFactory = (options?: { animateIn?: boolean }) => (container: HTMLElement) => GlobeApi;

const {
  profiles,
  selectedProfileId,
  selectedStoryStopIndex,
  hoveredProfileId,
  constellationMode,
  builderStops,
  selectProfile,
  hoverProfile,
  clearSelection,
  addBuilderStop
} = useAlumniState();

let globe: GlobeApi | null = null;
let resizeObserver: ResizeObserver | null = null;
let reducedMotion = false;
let motionQuery: MediaQueryList | null = null;
let profileList: JourneyProfileList = [];
let autoRotateResumeTimer: number | null = null;

let watchStops: WatchStopHandle[] = [];

function profileColor(profileId: string): string {
  const index = profileList.findIndex((item) => item.id === profileId);
  return STAR_COLORS[index] ?? STAR_COLORS[0];
}

function hexToRgba(hex: string, alpha: number): string {
  const raw = hex.replace("#", "");
  const value = raw.length === 3
    ? raw.split("").map((char) => `${char}${char}`).join("")
    : raw;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function pointOpacity(kind: GlobePoint["kind"]): number {
  if (kind === "journey-stop" || kind === "builder-stop") return 1;
  if (constellationMode.value === "build") return 0.36;
  if (selectedProfileId.value) return 0.45;
  return 0.95;
}

function avatarOpacity(profileId: string): number {
  if (constellationMode.value === "build") return 0.18;
  if (selectedProfileId.value) return selectedProfileId.value === profileId ? 1 : 0.24;
  if (hoveredProfileId.value) return hoveredProfileId.value === profileId ? 1 : 0.58;
  return 0.95;
}

function avatarScale(profileId: string): number {
  if (selectedProfileId.value === profileId) return 1.16;
  if (hoveredProfileId.value === profileId) return 1.06;
  return 1;
}

function currentProfileAvatars(): GlobeAvatar[] {
  return profileList.map((profile) => {
    const avatarState = resolveJourneyAvatarState(profile, {
      selectedProfileId: selectedProfileId.value,
      selectedStoryStopIndex: selectedStoryStopIndex.value
    });
    return {
      id: profile.id,
      profileId: profile.id,
      lat: avatarState.lat,
      lng: avatarState.lng,
      color: profileColor(profile.id),
      name: profile.name,
      classYear: profile.classYear,
      photoUrl: avatarState.photoUrl,
      opacity: avatarOpacity(profile.id),
      scale: avatarScale(profile.id),
      selected: selectedProfileId.value === profile.id
    };
  });
}

function createAvatarElement(data: GlobeAvatar): HTMLElement {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "alumni-avatar";
  if (data.selected) element.classList.add("is-selected");
  element.style.opacity = `${data.opacity}`;
  element.style.transform = `translate(-50%, -50%) scale(${data.scale})`;
  element.style.setProperty("--avatar-color", data.color);
  element.dataset.targetOpacity = `${data.opacity}`;
  if (constellationMode.value === "build") {
    element.style.pointerEvents = "none";
  } else {
    element.style.pointerEvents = "auto";
  }

  const img = document.createElement("img");
  img.className = "alumni-avatar-image";
  img.alt = `${data.name} avatar`;
  img.src = useAssetUrl(data.photoUrl ?? "");

  const halo = document.createElement("span");
  halo.className = "alumni-avatar-halo";

  const label = document.createElement("span");
  label.className = "alumni-avatar-label";
  label.textContent = `${data.name} '${String(data.classYear).slice(-2)}`;

  element.appendChild(halo);
  element.appendChild(img);
  element.appendChild(label);

  element.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (constellationMode.value === "build") return;
    selectProfile(data.profileId);
    const profile = profileList.find((item) => item.id === data.profileId);
    if (profile) focusProfile(profile);
  });

  element.addEventListener("mouseenter", () => {
    if (selectedProfileId.value || constellationMode.value === "build") return;
    hoverProfile(data.profileId);
  });

  element.addEventListener("mouseleave", () => {
    if (selectedProfileId.value || constellationMode.value === "build") return;
    hoverProfile(null);
  });

  return element;
}

function selectedJourneyArcs(): GlobeArc[] {
  if (constellationMode.value === "build") {
    return builderStops.value.slice(1).map((stop, index) => {
      const prev = builderStops.value[index];
      return {
        id: `builder-arc-${index}`,
        startLat: prev.coordinates.lat,
        startLng: prev.coordinates.lng,
        endLat: stop.coordinates.lat,
        endLng: stop.coordinates.lng,
        color: [hexToRgba(BUILDER_STAR_COLOR, 0.08), hexToRgba(BUILDER_STAR_COLOR, 0.78)] as [string, string],
        dashGap: ARC_DASH_GAP,
        dashLength: ARC_DASH_LENGTH,
        dashInitialGap: index * 0.11
      };
    });
  }

  const profile = profileList.find((item) => item.id === selectedProfileId.value);
  if (!profile) return [];
  const color = profileColor(profile.id);
  return profile.stops.slice(1).map((stop, index) => {
    const prev = profile.stops[index];
    return {
      id: `${profile.id}-arc-${index}`,
      startLat: prev.coordinates.lat,
      startLng: prev.coordinates.lng,
      endLat: stop.coordinates.lat,
      endLng: stop.coordinates.lng,
      color: [hexToRgba(color, 0.06), hexToRgba(color, 0.68)] as [string, string],
      dashGap: ARC_DASH_GAP,
      dashLength: ARC_DASH_LENGTH,
      dashInitialGap: index * 0.12
    };
  });
}

function currentPoints(): GlobePoint[] {
  const data: GlobePoint[] = [];

  data.push(
    {
      id: "origin-city",
      kind: "origin",
      lat: ORIGIN_CITY.lat,
      lng: ORIGIN_CITY.lng,
      color: hexToRgba(ORIGIN_STAR_COLOR, pointOpacity("origin")),
      radius: 0.38,
      altitude: 0.014
    },
    {
      id: "event-city",
      kind: "event",
      lat: EVENT_CITY.lat,
      lng: EVENT_CITY.lng,
      color: hexToRgba(EVENT_STAR_COLOR, pointOpacity("event")),
      radius: 0.34,
      altitude: 0.013
    }
  );

  if (constellationMode.value === "build") {
    builderStops.value.forEach((stop, index) => {
      data.push({
        id: `builder-stop-${index}`,
        kind: "builder-stop",
        lat: stop.coordinates.lat,
        lng: stop.coordinates.lng,
        color: hexToRgba(BUILDER_STAR_COLOR, 0.98),
        radius: 0.28,
        altitude: 0.01,
        order: index + 1
      });
    });
    return data;
  }

  const profile = profileList.find((item) => item.id === selectedProfileId.value);
  if (profile) {
    const color = profileColor(profile.id);
    profile.stops.forEach((stop, index) => {
      const isActive = index === selectedStoryStopIndex.value;
      data.push({
        id: `${profile.id}-stop-${index}`,
        kind: "journey-stop",
        lat: stop.coordinates.lat,
        lng: stop.coordinates.lng,
        color: hexToRgba(color, isActive ? 1 : 0.9),
        radius: isActive ? 0.28 : 0.2,
        altitude: isActive ? 0.014 : 0.008,
        order: index + 1
      });
    });
  }

  return data;
}

function makeBuilderStop(lat: number, lng: number): JourneyStop {
  const index = builderStops.value.length + 1;
  const city = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  const year = new Date().getFullYear();
  return {
    city,
    cityCn: city,
    coordinates: { lat: Number(lat.toFixed(4)), lng: Number(lng.toFixed(4)) },
    year,
    endYear: undefined,
    title: `Stop ${index}`,
    titleCn: `Stop ${index}`,
    story: "",
    storyCn: ""
  };
}

function refreshGlobeData(): void {
  if (!globe) return;
  globe.htmlElementsData(currentProfileAvatars());
  globe.pointsData(currentPoints());
  globe.arcsData(selectedJourneyArcs());
}

function resetView(): void {
  if (!globe) return;
  globe.pointOfView(GLOBE_DEFAULT_VIEW, reducedMotion ? 0 : CAMERA_FLY_DURATION_MS);
}

function focusProfile(profile: AlumniProfile): void {
  if (!globe || profile.stops.length === 0) return;
  const first = profile.stops[0].coordinates;
  const last = profile.stops[profile.stops.length - 1].coordinates;
  const midLat = (first.lat + last.lat) / 2;
  const midLng = (first.lng + last.lng) / 2;
  globe.pointOfView({ lat: midLat, lng: midLng, altitude: 1.5 }, reducedMotion ? 0 : CAMERA_FLY_DURATION_MS);
}

function focusStop(profile: AlumniProfile, stopIndex: number): void {
  if (!globe) return;
  const stop = profile.stops[stopIndex];
  if (!stop) return;
  globe.pointOfView(
    { lat: stop.coordinates.lat, lng: stop.coordinates.lng, altitude: 1.2 },
    reducedMotion ? 0 : CAMERA_FLY_DURATION_MS
  );
}

function clearAutoRotateResume(): void {
  if (autoRotateResumeTimer !== null) {
    window.clearTimeout(autoRotateResumeTimer);
    autoRotateResumeTimer = null;
  }
}

function setupControlsBehavior(): void {
  if (!globe || reducedMotion) return;
  const controls = globe.controls();
  const pause = () => {
    controls.autoRotate = false;
    clearAutoRotateResume();
  };
  const resume = () => {
    clearAutoRotateResume();
    autoRotateResumeTimer = window.setTimeout(() => {
      controls.autoRotate = true;
      autoRotateResumeTimer = null;
    }, 2200);
  };
  controls.addEventListener("start", pause);
  controls.addEventListener("end", resume);
}

function setupWatchers(): void {
  if (watchStops.length > 0) return;

  watchStops.push(
    watch(selectedProfileId, (profileId) => {
      refreshGlobeData();
      if (!profileId) {
        if (constellationMode.value !== "build") resetView();
        return;
      }
      const profile = profileList.find((item) => item.id === profileId);
      if (!profile) return;
      if (selectedStoryStopIndex.value !== null) {
        focusStop(profile, selectedStoryStopIndex.value);
        return;
      }
      focusProfile(profile);
    }),
    watch(selectedStoryStopIndex, (stopIndex) => {
      refreshGlobeData();
      if (!selectedProfileId.value || stopIndex === null) return;
      const profile = profileList.find((item) => item.id === selectedProfileId.value);
      if (profile) focusStop(profile, stopIndex);
    }),
    watch(hoveredProfileId, () => refreshGlobeData()),
    watch(constellationMode, (mode) => {
      refreshGlobeData();
      if (mode !== "build") resetView();
    }),
    watch(builderStops, () => refreshGlobeData(), { deep: true })
  );
}

export function useConstellationMap(mapContainer?: Ref<HTMLElement | null>) {
  const internalContainer = mapContainer ?? ref<HTMLElement | null>(null);

  async function initMap(): Promise<void> {
    const element = internalContainer.value;
    if (!element) return;

    cleanup();

    motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = motionQuery.matches;
    profileList = profiles.value;

    const module = await import("globe.gl");
    const createGlobe = module.default as unknown as GlobeFactory;
    globe = createGlobe({ animateIn: !reducedMotion })(element);

    globe
      .width(element.clientWidth)
      .height(element.clientHeight)
      .globeImageUrl(GLOBE_TEXTURE)
      .backgroundImageUrl(STARFIELD_TEXTURE)
      .backgroundColor(GLOBE_BACKGROUND_COLOR)
      .showAtmosphere(true)
      .atmosphereColor(ATMOSPHERE_COLOR)
      .atmosphereAltitude(0.14)
      .pointsData(currentPoints())
      .pointLat((d) => d.lat)
      .pointLng((d) => d.lng)
      .pointColor((d) => d.color)
      .pointAltitude((d) => d.altitude)
      .pointRadius((d) => d.radius)
      .pointsMerge(false)
      .htmlElementsData(currentProfileAvatars())
      .htmlLat((d) => d.lat)
      .htmlLng((d) => d.lng)
      .htmlAltitude(0.015)
      .htmlElement((d) => createAvatarElement(d))
      .htmlElementVisibilityModifier((el, isVisible) => {
        if (!isVisible) {
          el.style.opacity = "0";
          return;
        }
        const nextOpacity = Number.parseFloat(el.dataset.targetOpacity || "1");
        el.style.opacity = `${nextOpacity}`;
      })
      .arcsData(selectedJourneyArcs())
      .arcColor((d) => d.color)
      .arcDashLength((d) => d.dashLength ?? ARC_DASH_LENGTH)
      .arcDashGap((d) => d.dashGap ?? ARC_DASH_GAP)
      .arcDashInitialGap((d) => d.dashInitialGap ?? 0)
      .arcDashAnimateTime(reducedMotion ? 0 : ARC_DRAW_DURATION_MS)
      .arcAltitudeAutoScale(0.4)
      .arcStroke(0.28)
      .arcsTransitionDuration(0)
      .onPointClick(() => undefined)
      .onPointHover(() => undefined)
      .onGlobeClick((coords) => {
        if (constellationMode.value === "build") {
          addBuilderStop(makeBuilderStop(coords.lat, coords.lng));
          return;
        }
        if (selectedProfileId.value) clearSelection();
      });

    const material = globe.globeMaterial();
    material.shininess = 0.75;
    material.emissiveIntensity = 0.2;

    const controls = globe.controls();
    controls.enablePan = false;
    controls.minDistance = 130;
    controls.maxDistance = 420;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = GLOBE_AUTO_ROTATE_SPEED;
    setupControlsBehavior();

    resetView();

    resizeObserver = new ResizeObserver(() => {
      if (!globe || !element) return;
      globe.width(element.clientWidth).height(element.clientHeight);
    });
    resizeObserver.observe(element);

    setupWatchers();
  }

  function cleanup(): void {
    clearAutoRotateResume();
    resizeObserver?.disconnect();
    resizeObserver = null;

    globe?._destructor();
    globe = null;

    for (const stop of watchStops) stop();
    watchStops = [];

    motionQuery = null;
    reducedMotion = false;
  }

  function clearJourney(): void {
    if (selectedProfileId.value) clearSelection();
    refreshGlobeData();
  }

  async function showJourney(profile: AlumniProfile): Promise<void> {
    selectProfile(profile.id);
    refreshGlobeData();
    focusProfile(profile);
  }

  return { initMap, showJourney, clearJourney, resetView, resetMap: resetView, cleanup };
}
