import {AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import type {AlumniProfile, JourneyMapData} from "@yalie/shared";
import sampleData from "../../data/templates/sample.json";

const data = sampleData as JourneyMapData;

const fontStyles = {
  heading: "'Cormorant Garamond', 'Georgia', serif",
  body: "'Inter', 'Helvetica Neue', sans-serif"
};

const palette = {
  dreamWhite: "#EBE8E5",
  catalanGold: "#E1B662",
  daliBrown: "#9B6845",
  warmStone: "#8B7355",
  surrealBlack: "#1A1410"
};

const buildJourneyPath = (index: number, width: number) => {
  const startX = 240 + index * 35;
  const endX = width - 300 - index * 28;
  const anchorY = 860 - (index % 3) * 28;
  const midX = width * 0.5;
  const midY = 700 + (index % 2) * 30;
  const d = `M ${startX} ${anchorY} C ${startX + 150} ${anchorY - 150}, ${midX - 120} ${midY}, ${midX} ${midY} S ${endX - 140} ${anchorY - 120}, ${endX} ${anchorY}`;
  return {d, startX, endX, anchorY, midX, midY};
};

const JourneyPath = ({
  profile,
  index,
  width,
  height,
  dashOffset,
  opacity
}: {
  profile: AlumniProfile;
  index: number;
  width: number;
  height: number;
  dashOffset: number;
  opacity: number;
}) => {
  const pathLength = 1400;
  const {d, startX, endX, anchorY, midX, midY} = buildJourneyPath(index, width);
  return (
    <svg width={width} height={height} style={{position: "absolute", inset: 0, overflow: "visible", opacity}}>
      <path d={d} stroke={palette.catalanGold} strokeWidth={6} fill="none" style={{strokeDasharray: pathLength, strokeDashoffset: dashOffset, opacity: 0.52, filter: `drop-shadow(0 0 6px ${palette.catalanGold})`}} />
      <path d={d} stroke={palette.catalanGold} strokeWidth={3} fill="none" style={{strokeDasharray: pathLength, strokeDashoffset: dashOffset, filter: `drop-shadow(0 0 3px ${palette.catalanGold})`}} />
      <circle cx={startX} cy={anchorY} r={6} fill={palette.catalanGold} />
      <circle cx={midX} cy={midY} r={7} fill={palette.dreamWhite} stroke={palette.catalanGold} strokeWidth={2} />
      <circle cx={endX} cy={anchorY} r={6} fill={palette.catalanGold} />
      <text x={startX - 14} y={anchorY + 28} fill={palette.dreamWhite} style={{fontFamily: fontStyles.body, fontSize: 18, opacity: 0.85}}>{profile.hometown}</text>
      <text x={midX - 22} y={midY - 18} fill={palette.dreamWhite} style={{fontFamily: fontStyles.body, fontSize: 17, opacity: 0.9}}>Yale</text>
      <text x={endX - 20} y={anchorY + 28} fill={palette.dreamWhite} style={{fontFamily: fontStyles.body, fontSize: 18, opacity: 0.85}}>{profile.currentCity}</text>
    </svg>
  );
};

const TitleScene = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {extrapolateRight: "clamp"});
  const fadeOut = interpolate(frame, [70, 89], [1, 0], {extrapolateLeft: "clamp"});
  const opacity = Math.min(fadeIn, fadeOut);
  const translateY = interpolate(frame, [0, 25], [20, 0], {extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "center", textAlign: "center", opacity, transform: `translateY(${translateY}px)`}}>
      <h1 style={{margin: 0, fontFamily: fontStyles.heading, fontSize: 72, fontWeight: 700, color: palette.surrealBlack, letterSpacing: 0.4}}>{data.title}</h1>
      <p style={{marginTop: 18, fontFamily: fontStyles.body, fontSize: 28, fontWeight: 400, color: palette.warmStone}}>{data.subtitle}</p>
    </AbsoluteFill>
  );
};

const ProfilesScene = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const profiles = data.profiles;
  if (profiles.length === 0) {
    return null;
  }
  const profileDuration = 50;
  const index = Math.min(profiles.length - 1, Math.floor(frame / profileDuration));
  const profile = profiles[index]!;
  const localFrame = frame - index * profileDuration;
  const entrance = spring({fps, frame: localFrame, config: {damping: 12, stiffness: 200, mass: 0.8}});
  const translateX = interpolate(entrance, [0, 1], [400, 0]);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(localFrame, [0, 6, 40, 49], [0, 1, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const dashOffset = interpolate(localFrame, [0, 40], [1400, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <AbsoluteFill>
      <JourneyPath profile={profile} index={index} width={width} height={height} dashOffset={dashOffset} opacity={1} />
      <AbsoluteFill style={{justifyContent: "center", padding: "0 180px"}}>
        <div style={{width: 1120, minHeight: 360, borderRadius: 16, border: `1px solid ${palette.daliBrown}`, backgroundColor: "rgba(235, 232, 229, 0.92)", boxShadow: "0 20px 60px rgba(26, 20, 16, 0.3)", padding: 40, opacity, transform: `translateX(${translateX}px) scale(${scale})`}}>
          <h2 style={{margin: 0, fontFamily: fontStyles.heading, fontSize: 52, fontWeight: 700, color: palette.surrealBlack}}>{profile.name}</h2>
          <p style={{margin: "14px 0 0", fontFamily: fontStyles.body, fontSize: 24, fontWeight: 400, color: palette.warmStone}}>{profile.program} ({profile.classYear})</p>
          <p style={{margin: "14px 0 0", fontFamily: fontStyles.body, fontSize: 22, fontWeight: 500, color: palette.surrealBlack}}>{profile.currentRole}</p>
          <p style={{margin: "16px 0 0", fontFamily: fontStyles.body, fontSize: 20, fontWeight: 500, color: palette.catalanGold}}>{profile.hometown} → {profile.currentCity}, {profile.currentCountry}</p>
          {profile.website ? <p style={{margin: "18px 0 0", fontFamily: fontStyles.body, fontSize: 16, color: palette.warmStone}}>Website: {profile.website}</p> : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const AllPathsScene = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const pulse = Math.sin(frame * 0.15) * 0.2 + 0.8;
  return (
    <AbsoluteFill>
      {data.profiles.map((profile, index) => (
        <JourneyPath profile={profile} index={index} width={width} height={height} dashOffset={0} opacity={pulse} />
      ))}
      <AbsoluteFill style={{justifyContent: "flex-end", alignItems: "center", paddingBottom: 120}}>
        <p style={{fontFamily: fontStyles.body, fontSize: 30, color: palette.dreamWhite, textShadow: `0 0 18px ${palette.catalanGold}`}}>From Yale to every horizon</p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OutroScene = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], {extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "center", textAlign: "center", opacity}}>
      <h2 style={{margin: 0, fontFamily: fontStyles.heading, fontSize: 58, fontWeight: 600, color: palette.surrealBlack}}>See you in Shanghai</h2>
      <p style={{marginTop: 16, fontFamily: fontStyles.body, fontSize: 24, color: palette.warmStone}}>2026 Alumni Welcome Reception - Shanghai</p>
    </AbsoluteFill>
  );
};

export const AlumniJourneyVideo = () => {
  const {height} = useVideoConfig();
  return (
    <AbsoluteFill style={{fontFamily: fontStyles.body}}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');"}</style>
      <AbsoluteFill style={{background: "linear-gradient(160deg, #EBE8E5 0%, #E1B662 35%, #9B6845 70%, #1A1410 100%)"}} />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(235,232,229,0.12) 0%, rgba(225,182,98,0.18) 66%, rgba(26,20,16,0.2) 100%)"}} />
      <div style={{position: "absolute", left: 0, top: 720, width: "100%", height: height - 720, background: "linear-gradient(180deg, rgba(155,104,69,0.22) 0%, rgba(26,20,16,0.48) 100%)"}} />
      <div style={{position: "absolute", left: 0, top: 720, width: "100%", height: 2, background: "rgba(225,182,98,0.7)", boxShadow: "0 0 18px rgba(225,182,98,0.6)"}} />

      <Sequence from={0} durationInFrames={90} name="Title">
        <TitleScene />
      </Sequence>
      <Sequence from={90} durationInFrames={300} name="Profiles">
        <ProfilesScene />
      </Sequence>
      <Sequence from={390} durationInFrames={60} name="AllPathsReveal">
        <AllPathsScene />
      </Sequence>
      <Sequence from={450} durationInFrames={90} name="Outro">
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
