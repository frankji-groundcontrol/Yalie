import type { AlumniProfile } from "@yalie/shared";
import { profileStageAvatar } from "../components/alumni/AlumniStageAvatars";

interface JourneySelectionState {
  selectedProfileId: string | null;
  selectedStoryStopIndex: number | null;
}

interface JourneyAvatarState {
  lat: number;
  lng: number;
  photoUrl?: string;
}

function currentProfileCoordinates(profile: AlumniProfile): { lat: number; lng: number } | null {
  const fallback = profile.stops[profile.stops.length - 1]?.coordinates ?? null;
  return profile.stops.find((stop) => stop.city === profile.currentCity)?.coordinates ?? fallback;
}

export function finalStoryStopIndex(profile: AlumniProfile): number | null {
  return profile.stops.length > 0 ? profile.stops.length - 1 : null;
}

export function resolveJourneyAvatarState(
  profile: AlumniProfile,
  state: JourneySelectionState
): JourneyAvatarState {
  const original = currentProfileCoordinates(profile);
  if (!original) {
    return { lat: 0, lng: 0, photoUrl: profile.photoUrl };
  }

  const isSelectedProfile = state.selectedProfileId === profile.id;
  if (!isSelectedProfile || state.selectedStoryStopIndex === null) {
    return { lat: original.lat, lng: original.lng, photoUrl: profile.photoUrl };
  }

  const clampedIndex = Math.max(0, Math.min(state.selectedStoryStopIndex, profile.stops.length - 1));
  const selectedStop = profile.stops[clampedIndex]?.coordinates ?? original;
  return {
    lat: selectedStop.lat,
    lng: selectedStop.lng,
    photoUrl: profileStageAvatar(profile.id, clampedIndex).imageUrl
  };
}
