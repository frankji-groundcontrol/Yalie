import { PosterSpeaker } from '../poster-content'
import { PosterSectionHeading } from '../poster-section-heading'
import { PosterSpeakerCard } from '../poster-speaker-card'

type RoundtableSectionProps = {
  speakers: PosterSpeaker[]
  guestX: {
    name: string
    title: string
    description: string
  }
  closing: string
}

export function RoundtableSection({ speakers, guestX, closing }: RoundtableSectionProps) {
  return (
    <section className="mb-16 w-full max-w-4xl">
      <PosterSectionHeading eyebrow="Roundtable Guests" title="开放分享与圆桌对话" description="四位嘉宾 + 两个空位留给你" large />

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {speakers.map((speaker) => (
          <PosterSpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </div>

      <div className="border-2 border-[#00356b]/15 bg-[#00356b]/5 p-6">
        <div className="mb-3 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#00356b]/10">
            <span className="text-2xl font-medium text-[#00356b]">X</span>
          </div>
          <div>
            <h3 className="text-2xl font-medium tracking-wide text-[#00356b]">{guestX.name}</h3>
            <p className="text-lg tracking-wide text-[#00356b]/60 font-medium">{guestX.title}</p>
          </div>
        </div>
        <p className="text-lg md:text-xl leading-relaxed text-[#00356b]/70">{guestX.description}</p>
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-lg md:text-xl font-medium leading-relaxed text-[#00356b]/72">{closing}</p>
    </section>
  )
}
