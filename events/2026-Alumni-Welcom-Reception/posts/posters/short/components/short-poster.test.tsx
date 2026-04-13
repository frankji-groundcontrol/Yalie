import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ShortPoster } from './short-poster'

describe('ShortPoster', () => {
  it('surfaces the essential event information on a single page', () => {
    const markup = renderToStaticMarkup(<ShortPoster />)

    expect(markup).toContain('四月校友聚会')
    expect(markup).toContain('AI、生活与人生路径的相遇')
    expect(markup).toContain('2026年4月26日')
    expect(markup).toContain('陆家嘴数智港')
    expect(markup).toContain('活动流程')
    expect(markup).toContain('主讲嘉宾')
    expect(markup).toContain('期待你的参与')
    expect(markup).toContain('/qr-code.png')
  })

  it('reuses long poster visual assets and speaker portraits for a more promotional layout', () => {
    const markup = renderToStaticMarkup(<ShortPoster />)

    expect(markup).toContain('/yale_club_sh.jpg')
    expect(markup).toContain('/yale-bg1.jpg')
    expect(markup).toContain('/zhuwei.png')
    expect(markup).toContain('/cuidonghong.webp')
    expect(markup).toContain('/ziyue.png')
    expect(markup).toContain('地平线总裁')
    expect(markup).toContain('设计AI Agent出海、f-a-n事务所创始人')
  })
})
