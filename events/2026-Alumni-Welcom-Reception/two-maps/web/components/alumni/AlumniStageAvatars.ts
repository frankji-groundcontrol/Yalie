interface AvatarStage {
  label: string;
  imageUrl: string;
}

const PROFILE_STAGE_AVATARS: Record<string, AvatarStage[]> = {
  "alumni-frank-ji-2020": [
    { label: "Origins", imageUrl: "/avatars/stages/alumni-frank-ji-2020/step-1.jpg" },
    { label: "Yale Chapter", imageUrl: "/avatars/stages/alumni-frank-ji-2020/step-2.jpg" },
    { label: "Founder Era", imageUrl: "/avatars/stages/alumni-frank-ji-2020/step-3.jpg" }
  ],
  "alumni-marina-ross-1989": [
    { label: "Museum Childhood", imageUrl: "/avatars/stages/alumni-marina-ross-1989/step-1.jpg" },
    { label: "Yale Art Years", imageUrl: "/avatars/stages/alumni-marina-ross-1989/step-2.jpg" },
    { label: "Gallery Career", imageUrl: "/avatars/stages/alumni-marina-ross-1989/step-3.jpg" },
    { label: "Global Curator", imageUrl: "/avatars/stages/alumni-marina-ross-1989/step-4.jpg" }
  ],
  "alumni-daniel-park-1998": [
    { label: "Seoul Beginnings", imageUrl: "/avatars/stages/alumni-daniel-park-1998/step-1.jpg" },
    { label: "Yale Economics", imageUrl: "/avatars/stages/alumni-daniel-park-1998/step-2.jpg" },
    { label: "Finance Ascent", imageUrl: "/avatars/stages/alumni-daniel-park-1998/step-3.jpg" },
    { label: "Impact Capital", imageUrl: "/avatars/stages/alumni-daniel-park-1998/step-4.jpg" }
  ],
  "alumni-lucia-herrera-2007": [
    { label: "Engineering Roots", imageUrl: "/avatars/stages/alumni-lucia-herrera-2007/step-1.jpg" },
    { label: "Yale Engineer", imageUrl: "/avatars/stages/alumni-lucia-herrera-2007/step-2.jpg" },
    { label: "Hardware Builder", imageUrl: "/avatars/stages/alumni-lucia-herrera-2007/step-3.jpg" },
    { label: "Robotics Leader", imageUrl: "/avatars/stages/alumni-lucia-herrera-2007/step-4.jpg" }
  ],
  "alumni-owen-cheng-2014": [
    { label: "Pacific Childhood", imageUrl: "/avatars/stages/alumni-owen-cheng-2014/step-1.jpg" },
    { label: "Yale Scholar", imageUrl: "/avatars/stages/alumni-owen-cheng-2014/step-2.jpg" },
    { label: "Policy Professor", imageUrl: "/avatars/stages/alumni-owen-cheng-2014/step-3.jpg" }
  ],
  "alumni-priya-menon-2022": [
    { label: "Tech City Origins", imageUrl: "/avatars/stages/alumni-priya-menon-2022/step-1.jpg" },
    { label: "Yale Medicine", imageUrl: "/avatars/stages/alumni-priya-menon-2022/step-2.jpg" },
    { label: "Public Health", imageUrl: "/avatars/stages/alumni-priya-menon-2022/step-3.jpg" },
    { label: "Physician Founder", imageUrl: "/avatars/stages/alumni-priya-menon-2022/step-4.jpg" }
  ]
};

const FALLBACK_STAGE: AvatarStage = { label: "Life Stage", imageUrl: "/avatars/stages/origins.jpg" };

export function profileStageAvatar(profileId: string, stopIndex: number): AvatarStage {
  const stages = PROFILE_STAGE_AVATARS[profileId];
  if (!stages || stages.length === 0) return FALLBACK_STAGE;
  const clampedIndex = Math.max(0, Math.min(stopIndex, stages.length - 1));
  return stages[clampedIndex] ?? stages[0] ?? FALLBACK_STAGE;
}
