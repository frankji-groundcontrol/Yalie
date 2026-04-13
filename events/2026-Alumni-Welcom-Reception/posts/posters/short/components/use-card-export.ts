'use client'

import { RefObject, useCallback, useState } from 'react'

import { toPng } from 'html-to-image'

import {
  buildCardExportFileName,
  buildCardExportOptions,
  getCardExportTargets,
} from './card-export'

type UseCardExportOptions = {
  exportWidth: number
  rootRef: RefObject<HTMLElement | null>
  onBeforeCapture?: () => Promise<void> | void
  onAfterCapture?: () => Promise<void> | void
}

function waitForNextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })
}

function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  link.click()
}

export function useCardExport({ exportWidth, rootRef, onBeforeCapture, onAfterCapture }: UseCardExportOptions) {
  const [isExporting, setIsExporting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const exportAllCards = useCallback(async () => {
    if (!rootRef.current || isExporting) {
      return
    }

    setIsExporting(true)
    setErrorMessage(null)

    try {
      await onBeforeCapture?.()
      await waitForNextFrame()
      await waitForNextFrame()

      const targets = getCardExportTargets(rootRef.current)

      if (!targets.length) {
        throw new Error('No card export targets were found.')
      }

      for (const [index, target] of targets.entries()) {
        const element = target.element

        if (!(element instanceof HTMLElement)) {
          continue
        }

        const dataUrl = await toPng(element, buildCardExportOptions(element.scrollHeight, exportWidth))
        downloadDataUrl(dataUrl, buildCardExportFileName(target.title, index + 1, target.id))
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Card export failed.')
    } finally {
      await onAfterCapture?.()
      setIsExporting(false)
    }
  }, [exportWidth, isExporting, onAfterCapture, onBeforeCapture, rootRef])

  return {
    clearExportError: () => setErrorMessage(null),
    errorMessage,
    exportAllCards,
    isExporting,
  }
}