import { PosterSectionHeading } from '../poster-section-heading'

type AudienceSectionProps = {
  eyebrow: string
  title: string
  intro: string
  items: string[]
}

export function AudienceSection({ eyebrow, title, intro, items }: AudienceSectionProps) {
  return (
    <section className="mb-16 w-full max-w-3xl">
      <PosterSectionHeading eyebrow={eyebrow} title={title} />

      <div className="bg-[#00356b] p-8 text-white">
        <p className="mb-5 text-lg md:text-xl text-white/70">{intro}</p>
        <div className="space-y-4 text-lg md:text-xl text-white/90">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="mt-2.5 h-2 w-2 shrink-0 bg-white/60" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
