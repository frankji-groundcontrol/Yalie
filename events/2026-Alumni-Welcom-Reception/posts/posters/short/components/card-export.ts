export const CARD_EXPORT_WIDTH = 500
export const CARD_EXPORT_PIXEL_RATIO = 2
export const CARD_EXPORT_SELECTOR = '[data-card-export-id]'

export type CardExportTarget = {
  element: Element
  id: string
  title: string
}

export function getExportWidthBounds(availableWidth: number) {
  const safeMax = Math.max(1, Math.floor(availableWidth))
  const min = Math.min(CARD_EXPORT_WIDTH, safeMax)

  return { min, max: safeMax }
}

export function clampExportWidth(requestedWidth: number, availableWidth: number) {
  const { min, max } = getExportWidthBounds(availableWidth)
  const safeWidth = Math.floor(requestedWidth)

  if (!Number.isFinite(safeWidth)) {
    return min
  }

  return Math.min(max, Math.max(min, safeWidth))
}

export function getCardExportTargets(container: ParentNode): CardExportTarget[] {
  return Array.from(container.querySelectorAll(CARD_EXPORT_SELECTOR))
    .map((element) => {
      const id = element.getAttribute('data-card-export-id')?.trim() ?? ''
      const title = element.getAttribute('data-card-export-title')?.trim() || id

      if (!id) {
        return null
      }

      return { element, id, title }
    })
    .filter((target): target is CardExportTarget => target !== null)
}

export function buildCardExportFileName(title: string, index: number, fallbackId?: string) {
  const order = String(index).padStart(2, '0')
  const source = title.trim() || fallbackId?.trim() || 'card'
  const slug = source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'card'

  return `${order}-${slug}.png`
}

export function buildCardExportOptions(height: number, width = CARD_EXPORT_WIDTH) {
  return {
    backgroundColor: '#ffffff',
    cacheBust: true,
    fontEmbedCSS: '',
    canvasHeight: height * CARD_EXPORT_PIXEL_RATIO,
    canvasWidth: width * CARD_EXPORT_PIXEL_RATIO,
    height,
    pixelRatio: CARD_EXPORT_PIXEL_RATIO,
    style: {
      maxWidth: `${width}px`,
      width: `${width}px`,
    },
    width,
  }
}