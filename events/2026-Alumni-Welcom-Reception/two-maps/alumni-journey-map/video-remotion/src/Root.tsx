import {Composition, registerRoot} from "remotion";
import {AlumniJourneyVideo} from "./AlumniJourneyVideo";

const compositionConfig = {
  id: "AlumniJourneyVideo",
  durationInFrames: 540,
  fps: 30,
  width: 1920,
  height: 1080
};

export const RemotionRoot = () => {
  return (
    <Composition
      id={compositionConfig.id}
      component={AlumniJourneyVideo}
      durationInFrames={compositionConfig.durationInFrames}
      fps={compositionConfig.fps}
      width={compositionConfig.width}
      height={compositionConfig.height}
    />
  );
};

registerRoot(RemotionRoot);

export default RemotionRoot;
