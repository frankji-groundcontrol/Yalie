import { describe, expect, it } from 'vitest'

import {
  CARD_EXPORT_WIDTH,
  CARD_EXPORT_PIXEL_RATIO,
  buildCardExportOptions,
  buildCardExportFileName,
  clampExportWidth,
  getCardExportTargets,
  getExportWidthBounds,
} from './card-export'

describe('getCardExportTargets', () => {
  it('returns cards in document order with stable ids and titles', () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <section data-card-export-id="hero" data-card-export-title="欢迎页"></section>
      <section data-card-export-id="about" data-card-export-title="About This Event"></section>
      <section data-card-export-id="registration" data-card-export-title="报名二维码"></section>
    `

    expect(getCardExportTargets(container)).toEqual([
      { element: container.children[0], id: 'hero', title: '欢迎页' },
      { element: container.children[1], id: 'about', title: 'About This Event' },
      { element: container.children[2], id: 'registration', title: '报名二维码' },
    ])
  })

  it('ignores nodes without a stable export id', () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <section data-card-export-title="No Id"></section>
      <section data-card-export-id="about"></section>
    `

    expect(getCardExportTargets(container)).toEqual([
      { element: container.children[1], id: 'about', title: 'about' },
    ])
  })
})

describe('buildCardExportFileName', () => {
  it('uses a readable slug and zero-padded order', () => {
    expect(buildCardExportFileName('About This Event', 1)).toBe('01-about-this-event.png')
  })

  it('falls back to the stable id when the title is empty', () => {
    expect(buildCardExportFileName('', 12, 'registration')).toBe('12-registration.png')
  })

  it('keeps the shared fixed export width constant', () => {
    expect(CARD_EXPORT_WIDTH).toBe(500)
  })

  it('builds export options from the measured card height', () => {
    expect(buildCardExportOptions(356, 320)).toEqual({
      backgroundColor: '#ffffff',
      cacheBust: true,
      canvasHeight: 356 * CARD_EXPORT_PIXEL_RATIO,
      canvasWidth: 320 * CARD_EXPORT_PIXEL_RATIO,
      fontEmbedCSS: '',
      height: 356,
      pixelRatio: CARD_EXPORT_PIXEL_RATIO,
      style: { maxWidth: '320px', width: '320px' },
      width: 320,
    })
  })

  it('uses 500px as the minimum when the available width is larger', () => {
    expect(getExportWidthBounds(840)).toEqual({ min: 500, max: 840 })
  })

  it('collapses the bounds when the available width is smaller than 500px', () => {
    expect(getExportWidthBounds(420)).toEqual({ min: 420, max: 420 })
  })

  it('clamps user input into the allowed width range', () => {
    expect(clampExportWidth(320, 840)).toBe(500)
    expect(clampExportWidth(1200, 840)).toBe(840)
    expect(clampExportWidth(640, 840)).toBe(640)
  })

  it('builds export options with the default width when none is provided', () => {
    expect(buildCardExportOptions(356)).toEqual({
      backgroundColor: '#ffffff',
      cacheBust: true,
      canvasHeight: 356 * CARD_EXPORT_PIXEL_RATIO,
      canvasWidth: CARD_EXPORT_WIDTH * CARD_EXPORT_PIXEL_RATIO,
      fontEmbedCSS: '',
      height: 356,
      pixelRatio: CARD_EXPORT_PIXEL_RATIO,
      style: { maxWidth: `${CARD_EXPORT_WIDTH}px`, width: `${CARD_EXPORT_WIDTH}px` },
      width: CARD_EXPORT_WIDTH,
    })
  })
})
