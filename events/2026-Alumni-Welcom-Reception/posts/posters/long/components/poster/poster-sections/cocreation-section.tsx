import { Map as MapIcon, Route, Sparkles } from 'lucide-react'

import { PosterMapItem } from '../poster-content'
import { PosterSectionHeading } from '../poster-section-heading'

type CoCreationSectionProps = {
  description: string
  mapItems: PosterMapItem[]
  closing: string
}

export function CoCreationSection({ description, mapItems, closing }: CoCreationSectionProps) {
  return (
    <section className="mb-16 w-full max-w-4xl">
      <PosterSectionHeading eyebrow="Co-creation with AI" title="OpenClaw 共创" />

      <div className="mb-8 border-l-4 border-[#00356b] bg-white/50 p-6 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-[#00356b]/10">
            <Sparkles className="h-6 w-6 text-[#00356b]" />
          </div>
          <h3 className="text-xl font-medium text-[#00356b]">轻量共创</h3>
        </div>
        <p className="text-lg md:text-xl leading-relaxed text-[#00356b]/70">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {mapItems.map((item) => {
          const Icon = item.kind === 'journey' ? Route : MapIcon

          return (
            <div key={item.title} className="border border-[#00356b]/15 bg-[#00356b]/5 p-6">
              <div className="mb-3 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-[#00356b]/10">
                  <Icon className="h-6 w-6 text-[#00356b]" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-[#00356b]">{item.title}</h3>
              </div>
              <p className="mb-4 text-base md:text-lg leading-relaxed text-[#00356b]/60">{item.description}</p>
              <img src={item.image} alt={item.alt} className="w-full rounded border border-[#00356b]/20 opacity-50" />
            </div>
          )
        })}
      </div>

      <p className="mt-6 text-center text-base md:text-lg font-medium leading-relaxed text-[#00356b]/82">{closing}</p>
    </section>
  )
}
