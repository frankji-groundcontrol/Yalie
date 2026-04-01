export interface JourneyStop {
  city: string;
  cityCn: string;
  coordinates: { lat: number; lng: number };
  year: number;
  endYear?: number;
  title: string;
  titleCn: string;
  story: string;
  storyCn: string;
}

export interface AlumniProfile {
  id: string;
  name: string;
  nameCn?: string;
  classYear: number;
  program: string;
  track?: string;
  hometown: string;
  hometownCountry: string;
  yaleExperience: string[];
  currentRole: string;
  currentCity: string;
  currentCountry: string;
  website?: string;
  journeyHighlights: string[];
  photoUrl?: string;
  tags: string[];
  stops: JourneyStop[];
}

export interface JourneyMapData {
  title: string;
  subtitle: string;
  profiles: AlumniProfile[];
  metadata: {
    generatedAt: string;
    version: string;
    isLive: boolean;
  };
}
