import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Easing} from "remotion";
import type {LocalGuideMapData} from "@yalie/shared";
import sampleData from "../../data/templates/sample.json";

const data = sampleData as LocalGuideMapData;
type Category = LocalGuideMapData["locations"][number]["category"];
type GuideLocation = LocalGuideMapData["locations"][number];

const palette = {
  dreamWhite: "#EBE8E5",
  magritteSky: "#7BA7BC",
  twilightSlate: "#4A5568",
  nightShadow: "#1A1F2E",
  streetlampAmber: "#C4922A",
  surrealistBlack: "#1A1410"
} as const;

const skylinePath =
  "M0 280 L84 280 L84 244 L118 244 L118 280 L180 280 L180 236 L214 236 L214 280 L262 280 L262 188 L286 188 L286 144 L304 144 L304 108 L322 144 L322 188 L346 188 L346 280 L426 280 L426 230 L464 230 L464 280 L528 280 L528 212 L568 212 L568 280 L626 280 L626 224 L654 224 L654 280 L732 280 L732 208 L774 208 L774 280 L834 280 L834 168 L860 142 L890 110 L920 142 L946 168 L946 280 L1012 280 L1012 134 L1036 134 L1036 96 L1062 96 L1062 134 L1088 134 L1088 280 L1160 280 L1160 198 L1192 198 L1192 280 L1260 280 L1260 182 L1302 182 L1302 280 L1362 280 L1362 220 L1394 220 L1394 280 L1464 280 L1464 236 L1500 236 L1500 280 L1584 280 L1584 226 L1622 226 L1622 280 L1702 280 L1702 246 L1734 246 L1734 280 L1814 280 L1814 232 L1846 232 L1846 280 L1920 280 L1920 360 L0 360 Z";

const categoryTimeline: Array<{category: Category; start: number; ids: string[]}> = [
  {category: "food", start: 210, ids: ["loc-xintiandi-foodhall"]},
  {category: "art", start: 240, ids: ["loc-rockbund-art", "loc-m50-creative-park"]},
  {category: "culture", start: 270, ids: ["loc-shanghai-museum-east"]},
  {category: "practical", start: 300, ids: ["loc-ruijin-hospital", "loc-bank-of-china-lujiazui", "loc-longyang-metro-hub"]},
  {category: "nightlife", start: 330, ids: ["loc-jingan-jazz-house"]},
  {category: "nature", start: 360, ids: ["loc-fuxing-park"]}
];

const locationById = new Map(data.locations.map((location) => [location.id, location]));
const bounds = data.locations.reduce(
  (acc, location) => ({
    minLat: Math.min(acc.minLat, location.coordinates.lat),
    maxLat: Math.max(acc.maxLat, location.coordinates.lat),
    minLng: Math.min(acc.minLng, location.coordinates.lng),
    maxLng: Math.max(acc.maxLng, location.coordinates.lng)
  }),
  {minLat: Number.POSITIVE_INFINITY, maxLat: Number.NEGATIVE_INFINITY, minLng: Number.POSITIVE_INFINITY, maxLng: Number.NEGATIVE_INFINITY}
);

const projectPoint = (location: GuideLocation) => ({
  x: interpolate(location.coordinates.lng, [bounds.minLng, bounds.maxLng], [260, 1660], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }),
  y: interpolate(location.coordinates.lat, [bounds.minLat, bounds.maxLat], [770, 210], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })
});

const route = data.walks.find((walk) => walk.id === "walk-bund-west-art-loop") ?? data.walks[0];
const routeStops = (route?.stops ?? [])
  .map((id) => locationById.get(id))
  .filter((location): location is GuideLocation => Boolean(location))
  .map((location) => ({id: location.id, ...projectPoint(location)}));
const routeLengths = routeStops.slice(1).map((stop, index) => {
  const previous = routeStops[index];
  return previous ? Math.hypot(stop.x - previous.x, stop.y - previous.y) : 0;
});
const cumulativeRoute = routeStops.map((_, stopIndex) => routeLengths.slice(0, stopIndex).reduce((sum, length) => sum + length, 0));
const totalRouteLength = routeLengths.reduce((sum, length) => sum + length, 0);

const CategoryIcon = ({category, color}: {category: Category; color: string}) => {
  switch (category) {
    case "food":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
          <path d="M7 3V11" />
          <path d="M10 3V11" />
          <path d="M7 7H10" />
          <path d="M8.5 11V21" />
          <path d="M16 3C14.2 5.6 14.2 9.4 16 12V21" />
        </svg>
      );
    case "art":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
          <rect x={3.5} y={4} width={17} height={15} rx={1.5} />
          <path d="M6.5 15L10.2 11.3L13.4 14.3L17.5 10.2L20.5 13.2" />
          <circle cx={9} cy={8.3} r={1.2} />
        </svg>
      );
    case "culture":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
          <path d="M4 8L12 4L20 8" />
          <path d="M6 8V17" />
          <path d="M10 8V17" />
          <path d="M14 8V17" />
          <path d="M18 8V17" />
          <path d="M3 17H21" />
          <path d="M2 20H22" />
        </svg>
      );
    case "nature":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
          <path d="M19 5C12.8 5 8.4 8 6.5 12.4C5.6 14.6 5.6 17 6.2 19C8.2 18.4 10.6 17.5 12.8 16.2C17.3 13.7 20 10 19 5Z" />
          <path d="M6.5 19C10 15 12.8 12.7 17 10" />
        </svg>
      );
    case "practical":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
          <circle cx={12} cy={12} r={8} />
          <path d="M12 4V8" />
          <path d="M20 12H16" />
          <path d="M12 20V16" />
          <path d="M4 12H8" />
          <path d="M12 8L15 12L12 16L9 12Z" />
        </svg>
      );
    case "nightlife":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
          <path d="M15.6 4.5C10.9 5.2 7.8 9.7 8.6 14.4C9.1 17.3 11.2 19.8 14 20.6C10.1 21.4 6.1 18.9 5.3 15C4.3 10.1 7.6 5.3 12.5 4.3C13.6 4.1 14.7 4.1 15.6 4.5Z" />
          <circle cx={17.8} cy={8.3} r={1} fill={color} stroke="none" />
        </svg>
      );
  }
};

const SkylineLayer = ({frame, revealStart, revealEnd, idPrefix, bottomOffset = 0}: {frame: number; revealStart: number; revealEnd: number; idPrefix: string; bottomOffset?: number}) => {
  const revealWidth = interpolate(frame, [revealStart, revealEnd], [0, 1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const cloudShift = interpolate(frame, [revealStart, revealEnd + 120], [0, -340], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return (
    <div style={{position: "absolute", left: 0, right: 0, bottom: bottomOffset, height: 360}}>
      <svg viewBox="0 0 1920 360" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${idPrefix}-cloud-gradient`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.magritteSky} />
            <stop offset="52%" stopColor={palette.dreamWhite} />
            <stop offset="100%" stopColor={palette.magritteSky} />
          </linearGradient>
          <clipPath id={`${idPrefix}-skyline-shape`}>
            <path d={skylinePath} />
          </clipPath>
          <clipPath id={`${idPrefix}-reveal`}>
            <rect x="0" y="0" width={revealWidth} height="360" />
          </clipPath>
        </defs>
        <path d={skylinePath} fill={palette.nightShadow} />
        <g clipPath={`url(#${idPrefix}-skyline-shape)`}>
          <g clipPath={`url(#${idPrefix}-reveal)`}>
            <rect x={cloudShift - 300} y={0} width={2520} height={360} fill={`url(#${idPrefix}-cloud-gradient)`} />
            <g fill={palette.dreamWhite} opacity={0.34}>
              <ellipse cx={260 + cloudShift} cy={92} rx={88} ry={36} />
              <ellipse cx={530 + cloudShift} cy={148} rx={124} ry={46} />
              <ellipse cx={895 + cloudShift} cy={110} rx={108} ry={42} />
              <ellipse cx={1328 + cloudShift} cy={152} rx={152} ry={54} />
              <ellipse cx={1692 + cloudShift} cy={108} rx={96} ry={34} />
              <ellipse cx={2050 + cloudShift} cy={156} rx={146} ry={50} />
            </g>
          </g>
        </g>
      </svg>
      <div style={{position: "absolute", left: 0, right: 0, bottom: 0, height: 96, background: palette.nightShadow}} />
    </div>
  );
};

export const LocalGuideVideo = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleOpacity = Math.min(
    interpolate(frame, [0, 25], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
    interpolate(frame, [70, 89], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})
  );
  const titleY = interpolate(frame, [0, 25], [34, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const skylineOpacity = interpolate(frame, [84, 96], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const activeCategory = categoryTimeline.find((item) => frame >= item.start && frame <= item.start + 29)?.category;

  const routeDrawProgress = interpolate(frame, [390, 435], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const drawnLength = totalRouteLength * routeDrawProgress;
  const routePolyline = routeStops.map((stop) => `${stop.x},${stop.y}`).join(" ");

  const outroFrame = Math.max(0, frame - 450);
  const outroOpacity = interpolate(outroFrame, [0, 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const paintingSettle = spring({fps, frame: outroFrame, config: {damping: 200, stiffness: 120, mass: 1.05}});

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #7BA7BC 0%, #9BBDD0 30%, #D4DFE6 60%, #EBE8E5 100%)",
        color: palette.surrealistBlack,
        overflow: "hidden"
      }}
    >
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap');"}</style>
      <div style={{position: "absolute", inset: 0, opacity: skylineOpacity}}>
        <SkylineLayer frame={frame} revealStart={90} revealEnd={196} idPrefix="main" />
      </div>

      <Sequence from={0} durationInFrames={90} name="Title Sequence">
        <AbsoluteFill style={{justifyContent: "center", alignItems: "center", transform: `translateY(${titleY}px)`, opacity: titleOpacity}}>
          <div style={{textAlign: "center", maxWidth: 1320, padding: "0 80px"}}>
            <h1 style={{fontFamily: "'Cormorant Garamond', serif", fontSize: 68, lineHeight: 1.08, fontWeight: 700, color: palette.surrealistBlack, margin: 0}}>
              Shanghai Local Guide Map
            </h1>
            <div style={{width: 260, height: 2, background: palette.streetlampAmber, margin: "18px auto 20px"}} />
            <p style={{fontFamily: "'Inter', sans-serif", fontSize: 26, lineHeight: 1.35, margin: 0, color: palette.twilightSlate}}>
              Useful places and cultural stops for alumni arriving in Shanghai
            </p>
            <p style={{fontFamily: "'Noto Sans SC', sans-serif", fontSize: 26, lineHeight: 1.35, margin: "8px 0 0", color: palette.twilightSlate}}>
              为来沪校友准备的实用地点与文化体验清单
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={90} durationInFrames={120} name="Skyline Reveal">
        <AbsoluteFill style={{padding: "76px 92px"}}>
          <div
            style={{
              alignSelf: "flex-start",
              clipPath: `inset(0 ${interpolate(frame, [96, 132], [100, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}% 0 0)`
            }}
          >
            <p style={{fontFamily: "'Inter', sans-serif", fontSize: 22, letterSpacing: "0.08em", margin: 0, color: palette.twilightSlate}}>MAGRITTE MOMENT</p>
            <p style={{fontFamily: "'Cormorant Garamond', serif", fontSize: 42, margin: "8px 0 0", color: palette.surrealistBlack}}>Clouds imprisoned in the skyline</p>
            <div style={{width: 110, height: 2, background: palette.streetlampAmber, marginTop: 12}} />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={210} durationInFrames={180} name="Location Pins">
        <AbsoluteFill>
          <div style={{position: "absolute", top: 52, left: 92, display: "flex", gap: 10}}>
            {categoryTimeline.map((item) => (
              <div
                key={item.category}
                style={{
                  padding: "9px 14px",
                  borderRadius: 999,
                  border: `1px solid ${activeCategory === item.category ? palette.streetlampAmber : "rgba(26, 31, 46, 0.25)"}`,
                  background: "rgba(235, 232, 229, 0.86)",
                  color: activeCategory === item.category ? palette.surrealistBlack : palette.twilightSlate,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  textTransform: "capitalize"
                }}
              >
                {item.category}
              </div>
            ))}
          </div>
          {categoryTimeline.flatMap((item) =>
            item.ids.map((id, index) => {
              const location = locationById.get(id);
              if (!location) {
                return null;
              }
              const point = projectPoint(location);
              const enterStart = item.start + index * 8;
              const entrance = interpolate(frame, [enterStart, enterStart + 18], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad)
              });
              if (frame < enterStart) {
                return null;
              }
              const pinY = interpolate(entrance, [0, 1], [-110, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
              const cardInset = interpolate(frame, [enterStart + 8, enterStart + 20], [100, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp"
              });
              const cardLeft = point.x > 1340 ? -322 : 42;
              return (
                <div key={id} style={{position: "absolute", left: point.x, top: point.y, transform: `translate(-50%, ${pinY}px)`}}>
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50% 50% 50% 0",
                      transform: "rotate(-45deg)",
                      background: "rgba(235, 232, 229, 0.96)",
                      border: `2px solid ${palette.magritteSky}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div style={{transform: "rotate(45deg)", marginTop: -2}}>
                      <CategoryIcon category={item.category} color={palette.nightShadow} />
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: cardLeft,
                      top: -8,
                      width: 280,
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: "1px solid rgba(26, 31, 46, 0.2)",
                      background: "rgba(235, 232, 229, 0.95)",
                      clipPath: `inset(0 ${cardInset}% 0 0)`
                    }}
                  >
                    <p style={{fontFamily: "'Noto Sans SC', sans-serif", fontSize: 24, margin: 0, color: palette.surrealistBlack, fontWeight: 700}}>
                      {location.nameCn}
                    </p>
                    <p style={{fontFamily: "'Inter', sans-serif", fontSize: 15, margin: "2px 0 0", color: palette.twilightSlate}}>{location.name}</p>
                  </div>
                </div>
              );
            })
          )}
        </AbsoluteFill>
      </Sequence>

      <Sequence from={390} durationInFrames={60} name="Art Walk Route">
        <AbsoluteFill>
          <svg width="100%" height="100%" viewBox="0 0 1920 1080">
            {routePolyline && (
              <polyline
                points={routePolyline}
                fill="none"
                stroke={palette.magritteSky}
                strokeWidth={3}
                strokeLinejoin="miter"
                strokeLinecap="butt"
                strokeDasharray={totalRouteLength || 1}
                strokeDashoffset={(totalRouteLength || 1) * (1 - routeDrawProgress)}
              />
            )}
            {routeStops.map((stop, stopIndex) => {
              const reachedAt = cumulativeRoute[stopIndex] ?? Number.POSITIVE_INFINITY;
              const reached = drawnLength >= reachedAt;
              return (
                <circle
                  key={stop.id}
                  cx={stop.x}
                  cy={stop.y}
                  r={reached ? 6 : 4}
                  fill={reached ? palette.streetlampAmber : palette.dreamWhite}
                  stroke={palette.nightShadow}
                  strokeWidth={1.5}
                />
              );
            })}
          </svg>
          <div
            style={{
              position: "absolute",
              left: 92,
              bottom: 118,
              padding: "10px 14px",
              background: "rgba(235, 232, 229, 0.9)",
              border: "1px solid rgba(26, 31, 46, 0.18)",
              clipPath: `inset(0 ${interpolate(frame, [392, 412], [100, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}% 0 0)`
            }}
          >
            <p style={{fontFamily: "'Inter', sans-serif", fontSize: 20, margin: 0, color: palette.surrealistBlack}}>Bund to West Art Loop · 11.5 km · 3.5 hours</p>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={450} durationInFrames={30} name="Outro">
        <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
          <div
            style={{
              width: 980,
              height: 560,
              background: palette.nightShadow,
              border: `2px solid ${palette.streetlampAmber}`,
              padding: 16,
              boxShadow: "0 26px 48px rgba(26, 20, 16, 0.32)",
              transform: `translateY(${interpolate(paintingSettle, [0, 1], [48, 0])}px) scale(${interpolate(paintingSettle, [0, 1], [0.94, 1])})`
            }}
          >
            <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "linear-gradient(180deg, #7BA7BC 0%, #9BBDD0 30%, #D4DFE6 60%, #EBE8E5 100%)"}}>
              <SkylineLayer frame={220} revealStart={90} revealEnd={196} idPrefix="painting" bottomOffset={-24} />
              <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: "absolute", inset: 0}}>
                {routePolyline && <polyline points={routePolyline} fill="none" stroke={palette.magritteSky} strokeWidth={2.4} strokeLinejoin="miter" strokeLinecap="butt" />}
              </svg>
            </div>
          </div>

          <div style={{position: "absolute", textAlign: "center", opacity: outroOpacity}}>
            <h2 style={{fontFamily: "'Cormorant Garamond', serif", fontSize: 54, lineHeight: 1.1, fontWeight: 600, color: palette.surrealistBlack, margin: 0}}>
              Explore Shanghai, Together
            </h2>
            <p style={{fontFamily: "'Noto Sans SC', sans-serif", fontSize: 28, margin: "10px 0 0", color: palette.twilightSlate}}>探索上海，一起出发</p>
            <p style={{fontFamily: "'Inter', sans-serif", fontSize: 19, margin: "12px 0 0", color: palette.twilightSlate}}>
              Yale Alumni Welcome Reception · April 2026
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
