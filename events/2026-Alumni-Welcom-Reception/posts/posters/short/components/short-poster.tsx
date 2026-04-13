'use client'

import { ArrowRight, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { posterContent, type PosterSpeaker } from '../lib/poster-content'
import { CARD_EXPORT_WIDTH, clampExportWidth, getExportWidthBounds } from './card-export'
import { useCardExport } from './use-card-export'

function NotebookHoles() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center gap-10 md:gap-14">
      {['left', 'middle', 'right'].map((hole) => (
        <div
          key={hole}
          className="h-4.5 w-4.5 rounded-full border-2 border-[#00356b]/70 bg-[#00356b] shadow-[0_0_0_4px_rgba(245,246,248,0.98),inset_0_1px_1px_rgba(255,255,255,0.16)]"
        />
      ))}
    </div>
  )
}

function CardWrapper({ children, className = '', exportId, exportTitle, style }: { children: React.ReactNode; className?: string; exportId?: string; exportTitle?: string; style?: React.CSSProperties }) {
  return (
    <section
      data-card-export-id={exportId}
      data-card-export-title={exportTitle}
      style={style}
      className={`relative overflow-hidden rounded-[1.35rem] border-2 border-[#00356b]/32 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,252,0.94))] shadow-[0_22px_70px_rgba(0,53,107,0.1)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[url('/yale-bg1.jpg')] bg-cover bg-center opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,247,252,0.75))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 border-b-2 border-[#00356b]/24 bg-[linear-gradient(180deg,rgba(232,239,249,0.95),rgba(255,255,255,0.75))]" />
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-3 md:px-7">
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#00356b]/58 md:text-sm">{posterContent.clubName}</span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#00356b]/58 md:text-sm">{posterContent.dateLabel}</span>
      </div>
      <NotebookHoles />
      <div className="pointer-events-none absolute inset-x-0 top-12 bottom-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_34px,rgba(0,53,107,0.065)_34px,rgba(0,53,107,0.065)_35px)] opacity-70" />
      <div className="relative px-6 pb-6 pt-12 md:px-7 md:pb-7 md:pt-14">
        {children}
      </div>
    </section>
  )
}

function SpeakerThumbnail({ speaker }: { speaker: PosterSpeaker }) {
  return (
    <article className="flex items-center gap-3 border border-white/10 bg-white/7 px-3 py-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-white/18 bg-white/85">
        <img src={speaker.image} alt={speaker.alt} className={`h-full w-full ${speaker.imageClassName ?? 'object-cover'}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white md:text-base">{speaker.name}</p>
        <p className="mt-1 text-xs leading-5 text-white/72 md:text-sm">{speaker.title}</p>
      </div>
    </article>
  )
}

function AgendaRow({
  time,
  title,
  description,
  children,
}: {
  time: string
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <article className="border border-white/12 bg-white/7 px-4 py-4">
      <div className="grid gap-4 lg:grid-cols-[180px_1fr] lg:items-start">
        <div>
          <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d58d] md:text-sm">{time}</p>
          <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{title}</h3>
          {description ? <p className="mt-2 text-sm leading-7 text-white/78 md:text-base">{description}</p> : null}
        </div>
        <div>{children}</div>
      </div>
    </article>
  )
}

function PosterContent() {
  return (
    <>
      <div className="text-center">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 md:gap-8">
          <div className="text-left">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#00356b] md:text-6xl lg:text-7xl">{posterContent.eventTitle}</h1>
            <p className="mt-1 text-base font-medium tracking-[0.12em] text-[#00356b]/72 md:text-lg">{posterContent.clubName}</p>
            <p className="mt-1 text-xl leading-8 text-[#00356b]/72 md:text-2xl md:leading-9">{posterContent.eventSubtitle}</p>
          </div>
          <div className="h-20 w-px bg-[#00356b]/20" />
          <div className="h-44 w-44 shrink-0 border border-white/80 bg-white/72 p-3 shadow-[0_12px_32px_rgba(0,53,107,0.08)] backdrop-blur-sm md:h-52 md:w-52">
            <img src="/yale_club_sh.jpg" alt="Yale Club of Shanghai" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>

      <div className="mt-4 -mx-6 -mb-6 md:-mx-7 md:-mb-7 bg-[#00356b] px-6 py-6 text-white md:px-8 md:py-7">
        <div className="pointer-events-none absolute inset-0 bg-[url('/yale-bg1.jpg')] bg-cover bg-center opacity-[0.05]" />
        <div className="relative z-10">
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4d58d] md:text-base">{posterContent.chineseDate} · 活动流程</div>
          <div className="mt-6 space-y-3">
            <AgendaRow
              time={posterContent.agendaItems[0].time}
              title={posterContent.agendaItems[0].title}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {posterContent.locationCards.map((loc) => (
                  <div key={loc.name} className="border border-white/12 bg-white/7 px-4 py-3">
                    <p className="text-sm font-semibold text-white md:text-base">{loc.name} · {loc.venue}</p>
                    <p className="mt-1 text-xs leading-5 text-white/60 md:text-sm">{loc.address}</p>
                  </div>
                ))}
              </div>
            </AgendaRow>

            <AgendaRow
              time={posterContent.agendaItems[1].time}
              title={posterContent.agendaItems[1].title}
              description={posterContent.agendaItems[1].description}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {posterContent.keynoteSpeakers.map((speaker) => (
                  <SpeakerThumbnail key={speaker.name} speaker={speaker} />
                ))}
              </div>
            </AgendaRow>

            <AgendaRow
              time={posterContent.agendaItems[2].time}
              title={posterContent.agendaItems[2].title}
              description={posterContent.agendaItems[2].description}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {posterContent.roundtableSpeakers.map((speaker) => (
                  <SpeakerThumbnail key={speaker.name} speaker={speaker} />
                ))}
                <article className="flex items-center gap-3 border border-dashed border-white/18 bg-white/7 px-3 py-3 md:col-span-2">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-white/18 bg-white/12 text-2xl font-semibold text-[#f4d58d]">X</div>
                  <div>
                    <p className="text-sm font-semibold text-white md:text-base">{posterContent.guestX.name}</p>
                    <p className="mt-1 text-xs leading-5 text-white/72 md:text-sm">{posterContent.guestX.title}</p>
                  </div>
                </article>
              </div>
            </AgendaRow>

            <AgendaRow
              time={posterContent.agendaItems[3].time}
              title={posterContent.agendaItems[3].title}
              description={posterContent.agendaItems[3].description}
            >
              <div className="grid gap-3 md:grid-cols-2">
                <img src="/map-1-journey.png" alt="人生路径地图截图" className="w-full border border-white/14 bg-white/8" />
                <img src="/map-2-local.png" alt="在地生活地图截图" className="w-full border border-white/14 bg-white/8" />
              </div>
            </AgendaRow>
          </div>

          <div className="mt-8 border-t border-white/12 pt-8">
            <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-stretch">
              <div className="justify-self-center flex flex-col justify-center border border-dashed border-white/22 bg-white/8 p-5 text-center backdrop-blur-sm h-full">
                <p className="text-xs uppercase tracking-[0.32em] text-white/56">Registration</p>
                <div className="mt-4 flex h-52 w-52 items-center justify-center border border-white/16 bg-white/92 text-[#00356b] shadow-inner shadow-[#00356b]/8 md:h-60 md:w-60">
                  <div>
                    <p className="text-2xl font-semibold md:text-3xl">{posterContent.qrTitle}</p>
                    <p className="mt-3 text-sm leading-7 text-[#00356b]/62">{posterContent.qrInstruction}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4d58d] md:text-base">如果你满足以下任何一项，期待你的参与</p>
                <div className="flex-1 grid gap-3 sm:grid-cols-2">
                  {posterContent.audienceItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 border border-white/12 bg-white/7 px-4 py-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 bg-[#f4d58d]" />
                      <p className="text-sm leading-7 text-white/84 md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t border-white/12 pt-4">
                  <div className="border border-white/12 bg-white/7 px-5 py-4">
                    <div className="flex items-center gap-4">
                      <p className="text-base font-semibold text-[#f4d58d] md:text-lg">2026.4.26</p>
                      <p className="text-base font-semibold text-white md:text-lg">1:30 PM</p>
                      <p className="text-base font-semibold text-white/72 md:text-lg">开始签到</p>
                    </div>
                    <div className="mt-4">
                      <div className="border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-sm font-semibold text-white md:text-base">陆家嘴数智港</p>
                        <p className="mt-1 text-xs leading-5 text-white/60 md:text-sm">上海市浦东新区洋泾街道滨江大道257弄8号V6商墅</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer className="mt-8 flex items-center justify-center gap-4 pb-2 text-[11px] uppercase tracking-[0.28em] text-[#00356b]/52 md:text-sm">
      <div className="h-px w-12 bg-[#00356b]/15 md:w-20" />
      <span>{posterContent.clubName}</span>
      <span>{posterContent.footerDateLabel}</span>
      <div className="h-px w-12 bg-[#00356b]/15 md:w-20" />
    </footer>
  )
}

export function ShortPoster() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [exportWidth, setExportWidth] = useState<number>(CARD_EXPORT_WIDTH)
  const [exportWidthInput, setExportWidthInput] = useState(String(CARD_EXPORT_WIDTH))
  const [availableWidth, setAvailableWidth] = useState<number>(CARD_EXPORT_WIDTH)
  const [previewMode, setPreviewMode] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const { clearExportError, errorMessage, exportAllCards, isExporting } = useCardExport({
    exportWidth,
    rootRef,
  })
  const previewShellStyle = previewMode ? { maxWidth: `${exportWidth}px`, width: `${exportWidth}px` } : undefined
  const shellWidthClassName = previewMode ? '' : 'max-w-6xl'
  const widthBounds = getExportWidthBounds(availableWidth)

  useEffect(() => {
    const frame = frameRef.current

    if (!frame) {
      return
    }

    const updateWidth = () => {
      setAvailableWidth(Math.floor(frame.clientWidth))
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(frame)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const clampedWidth = clampExportWidth(exportWidth, availableWidth)

    if (clampedWidth !== exportWidth) {
      setExportWidth(clampedWidth)
      setExportWidthInput(String(clampedWidth))
    }
  }, [availableWidth, exportWidth])

  const commitExportWidth = () => {
    const parsedWidth = Number(exportWidthInput)
    const clampedWidth = clampExportWidth(parsedWidth, availableWidth)

    setExportWidth(clampedWidth)
    setExportWidthInput(String(clampedWidth))
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f6f8] px-4 py-5 text-[#00356b] md:px-8 md:py-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[#00356b]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-[#00356b]" />
      <div className="pointer-events-none absolute left-8 top-0 h-full w-px bg-gradient-to-b from-[#00356b]/20 via-[#00356b]/5 to-transparent" />
      <div className="pointer-events-none absolute right-8 top-0 h-full w-px bg-gradient-to-b from-[#00356b]/20 via-[#00356b]/5 to-transparent" />

      <div ref={frameRef} className="relative z-10 mx-auto max-w-6xl px-2 md:px-6">
        <div className="mb-6 flex w-full items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#00356b]/45">Card Export</p>
            <p className="mt-2 text-base text-[#00356b]/65">先预览窄版卡片，再按当前宽度直接导出节点，避免整图裁切带来的坐标和清晰度误差。</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <label className="flex items-center gap-2 text-sm text-[#00356b]/72">
              <span>导出宽度</span>
              <input
                type="number"
                inputMode="numeric"
                min={widthBounds.min}
                max={widthBounds.max}
                step={10}
                value={exportWidthInput}
                onChange={(event) => setExportWidthInput(event.target.value)}
                onBlur={commitExportWidth}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    commitExportWidth()
                  }
                }}
                className="w-28 rounded-full border border-[#00356b]/18 bg-white px-3 py-2 text-sm text-[#00356b]"
              />
            </label>
            <p className="text-xs text-[#00356b]/50">范围 {widthBounds.min}px - {widthBounds.max}px</p>
            <button
              type="button"
              onClick={() => setPreviewMode((current) => !current)}
              className="inline-flex items-center justify-center rounded-full border border-[#00356b]/18 bg-white px-5 py-3 text-sm font-medium text-[#00356b] transition hover:bg-[#00356b]/[0.05]"
            >
              {previewMode ? '关闭预览' : '预览导出宽度'}
            </button>
            <button
              type="button"
              onClick={() => {
                clearExportError()
                void exportAllCards()
              }}
              disabled={isExporting}
              className="inline-flex items-center justify-center rounded-full border border-[#00356b]/18 bg-[#00356b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#00294f] disabled:cursor-wait disabled:bg-[#00356b]/55"
            >
              {isExporting ? '导出中…' : `导出 ${exportWidth}px PNG`}
            </button>
          </div>
        </div>

        {errorMessage ? <p className="mb-6 text-sm text-[#8b1e1e]">{errorMessage}</p> : null}

        <div ref={rootRef} className={`flex w-full flex-col items-center ${previewMode ? 'gap-5' : ''}`.trim()}>
          <CardWrapper
            exportId="short-poster"
            exportTitle={posterContent.eventTitle}
            className={shellWidthClassName}
            style={previewShellStyle}
          >
            <PosterContent />
          </CardWrapper>
        </div>
        <Footer />
      </div>
    </main>
  )
}