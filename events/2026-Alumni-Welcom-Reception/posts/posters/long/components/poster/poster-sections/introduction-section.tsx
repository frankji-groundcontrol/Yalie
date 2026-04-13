import { Handshake, PenLine, Route } from 'lucide-react'

import { PosterHighlightedText } from '../poster-highlighted-text'
import { PosterSectionHeading } from '../poster-section-heading'

const valueCardMeta = [
  {
    label: 'Self-Expression',
    icon: PenLine,
  },
  {
    label: 'Clarity of Path',
    icon: Route,
  },
  {
    label: 'Community Connection',
    icon: Handshake,
  },
] as const

type IntroductionSectionProps = {
  aboutLabel: string
  aboutTitle: string
  introduction: string[]
  valuesTitle: string
  values: string[]
}

export function IntroductionSection({
  aboutLabel,
  aboutTitle,
  introduction,
  valuesTitle,
  values,
}: IntroductionSectionProps) {
  return (
    <section className="mb-16 max-w-3xl">
      <PosterSectionHeading eyebrow={aboutLabel} title={aboutTitle} />

      <div className="space-y-4 text-xl md:text-2xl leading-relaxed text-[#00356b]/70">
        {introduction.map((paragraph) => (
          <p key={paragraph}>
            <PosterHighlightedText text={paragraph} />
          </p>
        ))}
      </div>

      <div className="mt-6 border-2 border-[#00356b]/10 bg-white/50 p-6 backdrop-blur-sm">
        <p className="mb-3 text-base md:text-lg uppercase tracking-widest text-[#00356b]/50 font-medium">{valuesTitle}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((item, index) => {
            const meta = valueCardMeta[index]
            const Icon = meta.icon

            return (
              <div key={item} className="border border-[#00356b]/12 bg-[#00356b]/[0.03] p-5 text-center transition-colors duration-200 hover:bg-[#00356b]/[0.05]">
                <div className="mb-4 flex items-center justify-center gap-2 text-[#00356b]">
                  <Icon className="h-5 w-5 shrink-0" />
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#00356b]/45">{meta.label}</p>
                </div>
                <p className="font-puhuiti-75 text-xl md:text-2xl leading-relaxed text-[#00356b]/82">{item}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
