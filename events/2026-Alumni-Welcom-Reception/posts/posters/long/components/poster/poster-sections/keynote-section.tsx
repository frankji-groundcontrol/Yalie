import { PosterSpeaker } from '../poster-content'
import { PosterSectionHeading } from '../poster-section-heading'
import { PosterSpeakerCard } from '../poster-speaker-card'

type KeynoteSectionProps = {
  speakers: PosterSpeaker[]
}

export function KeynoteSection({ speakers }: KeynoteSectionProps) {
  return (
    <section className="mb-16 w-full max-w-4xl">
      <PosterSectionHeading eyebrow="Keynote Speakers" title="主题演讲嘉宾" />

      <div className="grid gap-8 md:grid-cols-2">
        {speakers.map((speaker) => (
          <PosterSpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </div>
    </section>
  )
}
