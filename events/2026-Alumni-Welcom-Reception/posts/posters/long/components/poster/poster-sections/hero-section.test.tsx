import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { HeroSection } from './hero-section'

describe('HeroSection', () => {
  it('keeps the compact date row on one line for export-sensitive layouts', () => {
    const markup = renderToStaticMarkup(
      <HeroSection
        title="四月校友聚会"
        subtitle="AI、生活与人生路径的相遇"
        chineseDate="2026年4月26日"
        locations={["上海主会场 · 陆家嘴数智港 · 上海市浦东新区洋泾街道滨江大道257弄8号V6商墅"]}
        compact
      />,
    )

    expect(markup).toContain('flex items-center gap-2 whitespace-nowrap text-[#00356b]/70')
    expect(markup).toContain('lucide-calendar h-5 w-5 shrink-0')
    expect(markup).toContain('class="text-xl md:text-2xl tracking-wide font-medium whitespace-nowrap"')
  })

  it('treats two-part locations as label plus address so export nowrap applies to the address line', () => {
    const markup = renderToStaticMarkup(
      <HeroSection
        title="四月校友聚会"
        subtitle="AI、生活与人生路径的相遇"
        chineseDate="2026年4月26日"
        locations={["陆家嘴数智港 · 上海市浦东新区洋泾街道滨江大道257弄8号V6商墅"]}
        compact
      />,
    )

    expect(markup).toContain('陆家嘴数智港')
    expect(markup).toContain('whitespace-nowrap text-lg md:text-xl leading-relaxed text-[#00356b]/56')
    expect(markup).not.toContain('mt-1 text-xl md:text-2xl tracking-wide text-[#00356b]')
  })
})
