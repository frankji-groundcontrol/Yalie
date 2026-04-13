import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ShortPoster } from './short-poster'

describe('ShortPoster', () => {
  it('surfaces the essential event information on a single page', () => {
    const markup = renderToStaticMarkup(<ShortPoster />)

    expect(markup).toContain('四月校友聚会')
    expect(markup).toContain('AI、生活与人生路径的相遇')
    expect(markup).toContain('2026年4月26日')
    expect(markup).toContain('上海主会场')
    expect(markup).toContain('活动流程')
    expect(markup).toContain('主讲嘉宾')
    expect(markup).toContain('适合谁来')
    expect(markup).toContain('报名二维码')
    expect(markup).toContain('扫描二维码或点击阅读原文进行报名')
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
