import { PosterSpeaker } from './poster-content'

type PosterSpeakerCardProps = {
  speaker: PosterSpeaker
}

export function PosterSpeakerCard({ speaker }: PosterSpeakerCardProps) {
  return (
    <div className="border-2 border-[#00356b]/10 bg-white/50 p-5 backdrop-blur-sm">
      <div className={`relative float-left mr-4 mb-2 h-28 w-28 ${speaker.frameClassName ?? ''}`.trim()}>
        <img
          src={speaker.image}
          alt={speaker.alt}
          className={`h-full w-full border-2 border-[#00356b] ${speaker.imageClassName ?? 'object-cover'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00356b]/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-1.5">
          <h3 className="text-xl font-medium leading-tight text-white">{speaker.name}</h3>
        </div>
      </div>

      <p className="mb-2 text-2xl md:text-3xl font-medium text-[#00356b]">{speaker.title}</p>
      <p className="text-xl md:text-2xl leading-relaxed text-[#00356b]/70">{speaker.bio}</p>
      <div className="clear-both" />
    </div>
  )
}
