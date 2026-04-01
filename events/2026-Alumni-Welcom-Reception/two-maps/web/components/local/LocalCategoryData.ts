import type { GuideCategory } from "@yalie/shared";

export type IconSegment = {
  d: string;
  fill?: "currentColor" | "none";
  stroke?: "currentColor" | "none";
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
  strokeLinejoin?: "round" | "bevel" | "miter";
};

export type CategoryVisual = {
  color: string;
  label: string;
  floatDuration: string;
  icon: IconSegment[];
};

export const CATEGORY_ORDER: GuideCategory[] = ["food", "culture", "art", "nature", "practical", "nightlife"];

export const CATEGORY_COLORS: Record<GuideCategory, string> = {
  food: "#D35400",
  culture: "#7BA7BC",
  art: "#C4922A",
  nature: "#5A7A4A",
  practical: "#4A5568",
  nightlife: "#8B7355"
};

export const categoryVisuals: Record<GuideCategory, CategoryVisual> = {
  food: {
    color: "var(--warm-stone)",
    label: "Food",
    floatDuration: "9.5s",
    icon: [
      { d: "M12 6C13.4 4.8 14.6 4.7 16.2 4.9C15.3 6.4 14.2 7 12.6 7.2", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" },
      { d: "M12 7.3C8.2 7.3 5 10.1 5 13.8C5 17.6 8 20.3 12 20.3C16 20.3 19 17.6 19 13.8C19 10.1 15.8 7.3 12 7.3Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
      { d: "M12 10.3V16.5", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" }
    ]
  },
  culture: {
    color: "var(--suit-charcoal)",
    label: "Culture",
    floatDuration: "10.5s",
    icon: [
      { d: "M6 11V9.6C6 6.8 8.7 4.6 12 4.6C15.3 4.6 18 6.8 18 9.6V11", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
      { d: "M3.2 13.2H20.8V16.6H3.2Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "miter" },
      { d: "M8 13.2V11H16V13.2", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }
    ]
  },
  art: {
    color: "var(--magritte-sky)",
    label: "Art",
    floatDuration: "8.6s",
    icon: [
      { d: "M4 4H20V20H4Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
      { d: "M8 8H16V16H8Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
      { d: "M11 12H13", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }
    ]
  },
  nature: {
    color: "var(--apple-green)",
    label: "Nature",
    floatDuration: "11.4s",
    icon: [
      { d: "M12 4L6 12H18L12 4Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "miter" },
      { d: "M12 8L7 15H17L12 8Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "miter" },
      { d: "M12 15V20", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }
    ]
  },
  practical: {
    color: "var(--twilight-slate)",
    label: "Practical",
    floatDuration: "9.8s",
    icon: [
      { d: "M12 21S18 14.8 18 10.8A6 6 0 1 0 6 10.8C6 14.8 12 21 12 21Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "round" },
      { d: "M12 8L14.8 9.2L12.8 12L10 13.2L11.8 10.4L12 8Z", fill: "currentColor", stroke: "none" }
    ]
  },
  nightlife: {
    color: "var(--night-shadow)",
    label: "Nightlife",
    floatDuration: "10.9s",
    icon: [
      { d: "M14.5 4A5.5 5.5 0 1 0 20 9.5A4 4 0 1 1 14.5 4Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "round" },
      { d: "M9 7V15.5A2.5 2.5 0 1 1 7 13.2 M9 10L14 9.1V14", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }
    ]
  }
};

export function renderIconSegments(icon: IconSegment[]): string {
  return icon
    .map((segment) => {
      const fill = segment.fill === "currentColor" ? "#fff" : (segment.fill ?? "none");
      const stroke = segment.stroke === "currentColor" ? "#fff" : (segment.stroke ?? "none");
      const strokeWidth = segment.strokeWidth ?? 0;
      const strokeLinecap = segment.strokeLinecap ?? "round";
      const strokeLinejoin = segment.strokeLinejoin ?? "round";

      return `<path d="${segment.d}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="${strokeLinejoin}" />`;
    })
    .join("");
}
