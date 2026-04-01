export type GuideCategory =
  | "food"
  | "culture"
  | "art"
  | "nature"
  | "practical"
  | "nightlife";

export interface GuideLocation {
  id: string;
  name: string;
  nameCn: string;
  category: GuideCategory;
  description: string;
  descriptionCn: string;
  address: string;
  addressCn: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tips: string[];
  tipsCn: string[];
  photoUrl?: string;
  rating?: number;
  addedBy?: string;
}

export interface ArtWalk {
  id: string;
  name: string;
  nameCn: string;
  description: string;
  descriptionCn: string;
  stops: string[];
  durationMinutes: number;
  distanceKm: number;
}

export interface LocalGuideMapData {
  title: string;
  titleCn: string;
  subtitle: string;
  subtitleCn: string;
  locations: GuideLocation[];
  walks: ArtWalk[];
  metadata: {
    generatedAt: string;
    version: string;
    isLive: boolean;
  };
}
