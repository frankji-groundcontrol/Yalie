import {Composition} from "remotion";
import {LocalGuideVideo} from "./LocalGuideVideo";

export const RemotionRoot = () => {
  const composition = {
    id: "LocalGuideVideo",
    durationInFrames: 480,
    fps: 30,
    width: 1920,
    height: 1080
  };

  return (
    <Composition
      id={composition.id}
      component={LocalGuideVideo}
      durationInFrames={composition.durationInFrames}
      fps={composition.fps}
      width={composition.width}
      height={composition.height}
    />
  );
};

export default RemotionRoot;
