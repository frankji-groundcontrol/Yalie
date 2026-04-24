'use client'

import { useEffect, useRef, useState } from 'react'

import { Handshake, Map as MapIcon, PenLine, Route, Sparkles } from 'lucide-react'

import { assetUrl } from '@/lib/asset-url'
import { PosterContent, PosterSpeaker } from '../poster-content'
import { PosterFooter } from '../poster-footer'
import { PosterHeader } from '../poster-header'
import { PosterHighlightedText } from '../poster-highlighted-text'
import { PosterShell } from '../poster-shell'
import { HeroSection } from '../poster-sections/hero-section'
import { CARD_EXPORT_WIDTH, clampExportWidth, getExportWidthBounds } from './card-export'
import { useCardExport } from './use-card-export'

type CardPosterViewProps = {
  content: PosterContent
  onLogoClick?: () => void
}

type InfoCardProps = {
  exportId: string
  eyebrow: string
  title: string
  children: React.ReactNode
  className?: string
  backgroundImage?: string
}

type CompactSpeakerCardProps = {
  speaker: PosterSpeaker
}

const valueCardMeta = [
  { label: 'Self-Expression', icon: PenLine },
  { label: 'Clarity of Path', icon: Route },
  { label: 'Community Connection', icon: Handshake },
] as const

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

function CampusBackdrop({ imagePath, opacity = 0.24 }: { imagePath: string; opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${assetUrl(imagePath)}")`,
        opacity,
      }}
    />
  )
}

function InfoCard({ exportId, eyebrow, title, children, className, backgroundImage = '/yale-bg2.jpg' }: InfoCardProps) {
  return (
    <section
      data-card-export-id={exportId}
      data-card-export-title={title}
      className={`relative overflow-hidden rounded-[1.35rem] border-2 border-[#00356b]/32 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,252,0.94))] shadow-[0_22px_70px_rgba(0,53,107,0.1)] ${className ?? ''}`.trim()}
    >
      <CampusBackdrop imagePath={backgroundImage} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,247,252,0.75))]" />
      <NotebookHoles />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 border-b-2 border-[#00356b]/24 bg-[linear-gradient(180deg,rgba(232,239,249,0.95),rgba(255,255,255,0.75))]" />
      <div className="pointer-events-none absolute inset-x-0 top-12 bottom-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_34px,rgba(0,53,107,0.065)_34px,rgba(0,53,107,0.065)_35px)] opacity-70" />

      <div className="relative px-6 pb-6 pt-16 md:px-7 md:pb-7 md:pt-17">
        <p className="mb-3 text-base md:text-lg tracking-[0.35em] uppercase text-[#00356b]/45">{eyebrow}</p>
        <h2 className="mb-4 text-4xl md:text-5xl font-medium text-[#00356b]">{title}</h2>
        {children}
      </div>
    </section>
  )
}

function CompactSpeakerCard({ speaker }: CompactSpeakerCardProps) {
  return (
    <article className="border border-[#00356b]/12 bg-[#00356b]/[0.03] p-4 transition-colors duration-200 hover:bg-[#00356b]/[0.05]">
      <div className={`relative float-left mr-4 mb-2 h-24 w-24 ${speaker.frameClassName ?? ''}`.trim()}>
        <img
          src={assetUrl(speaker.image)}
          alt={speaker.alt}
          className={`h-full w-full border-2 border-[#00356b] ${speaker.imageClassName ?? 'object-cover'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00356b]/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-1.5">
          <h3 className="text-base font-medium leading-tight text-white">{speaker.name}</h3>
        </div>
      </div>

      <p className="mb-2 text-xl md:text-2xl font-medium text-[#00356b]">{speaker.title}</p>
      <p className="text-lg md:text-xl leading-relaxed text-[#00356b]/72">{speaker.bio}</p>
      <div className="clear-both" />
    </article>
  )
}

export function CardPosterView({ content, onLogoClick }: CardPosterViewProps) {
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
  const fullSpanClassName = 'md:col-span-2 xl:col-span-3'
  const dualGridClassName = 'md:grid-cols-2'
  const tripleGridClassName = 'md:grid-cols-3'
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
    <PosterShell>
      <div ref={frameRef} className="w-full max-w-6xl">
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
        <section
          data-card-export-id="hero"
          data-card-export-title={content.eventTitle}
          className={`relative mb-10 w-full overflow-hidden rounded-[1.45rem] border-2 border-[#00356b]/32 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,246,252,0.92))] shadow-[0_24px_80px_rgba(0,53,107,0.1)] ${shellWidthClassName}`.trim()}
          style={previewShellStyle}
        >
          <CampusBackdrop imagePath="/yale-bg1.jpg" opacity={0.26} />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(242,246,252,0.73))]" />
          <NotebookHoles />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 border-b-2 border-[#00356b]/24 bg-[linear-gradient(180deg,rgba(232,239,249,0.95),rgba(255,255,255,0.72))]" />
          <div className="pointer-events-none absolute inset-x-0 top-12 bottom-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_34px,rgba(0,53,107,0.06)_34px,rgba(0,53,107,0.06)_35px)] opacity-60" />

          <div className="relative px-6 pb-7 pt-16 md:px-8 md:pb-8 md:pt-17">
            <PosterHeader clubName={content.clubName} dateLabel={content.dateLabel} onLogoClick={onLogoClick} compact />
            <HeroSection
              title={content.eventTitle}
              subtitle={content.eventSubtitle}
              chineseDate={content.chineseDate}
              locations={content.locations}
              compact
            />
          </div>
        </section>

        <div
          className={`grid w-full gap-6 ${shellWidthClassName} md:grid-cols-2 xl:grid-cols-3`.trim()}
          style={previewShellStyle}
        >
          <InfoCard exportId="about" eyebrow={content.aboutLabel} title={content.aboutTitle} className={fullSpanClassName} backgroundImage="/yale-bg2.jpg">
            <div className="relative overflow-hidden border border-[#00356b]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(239,246,255,0.52))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#00356b]/12" />
            <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-full border border-[#00356b]/10" />
            <div className="pointer-events-none absolute -left-10 bottom-8 h-24 w-24 rounded-full bg-[#00356b]/[0.04] blur-2xl" />

            <div className={`relative grid gap-4 md:gap-5 ${dualGridClassName}`.trim()}>
              {content.introduction.map((paragraph, index) => {
                const paragraphClassName = [
                  `md:col-span-2 border-l-4 border-[#00356b] bg-white/88 p-5 text-[1.45rem] leading-relaxed text-[#00356b]/84 shadow-[0_18px_40px_rgba(0,53,107,0.08)] md:p-6 md:text-[1.75rem]`,
                  'border border-[#00356b]/20 bg-[#00356b]/50 p-5 text-xl leading-relaxed text-white/92 shadow-[0_20px_50px_rgba(0,53,107,0.16)] md:min-h-[220px] md:text-2xl',
                  'border border-[#00356b]/12 bg-[#00356b] p-5 text-xl leading-relaxed text-white/92 shadow-[0_20px_50px_rgba(0,53,107,0.18)] md:min-h-[220px] md:text-2xl',
                  `md:col-span-2 border-t border-[#00356b]/15 bg-white/72 px-5 pb-5 pt-6 text-xl leading-relaxed text-[#00356b]/78 md:px-6 md:pb-6 md:text-2xl`,
                ][index]
                const emphasisClassName = index === 1 || index === 2 ? 'font-semibold text-white' : 'font-semibold text-[#00356b]'

                return (
                  <article key={paragraph} className={paragraphClassName}>
                    <p>
                      <PosterHighlightedText text={paragraph} emphasisClassName={emphasisClassName} />
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
          </InfoCard>

          <InfoCard exportId="values" eyebrow="We Care About" title="我们更在意什么？" className={fullSpanClassName} backgroundImage="/yale-bg3.jpg">
            <div className={`grid gap-4 ${tripleGridClassName}`.trim()}>
            {content.values.map((value, index) => {
              const meta = valueCardMeta[index]
              const Icon = meta.icon

              return (
                <div key={value} className="border border-[#00356b]/12 bg-[#00356b]/[0.03] p-5 text-center transition-colors duration-200 hover:bg-[#00356b]/[0.05]">
                  <div className="mb-4 flex items-center justify-center gap-2 text-[#00356b]">
                    <Icon className="h-5 w-5 shrink-0" />
                     <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-[#00356b]/45">{meta.label}</p>
                   </div>
                  <p className="font-puhuiti-75 text-2xl md:text-[1.75rem] leading-relaxed text-[#00356b]/82">{value}</p>
                </div>
              )
            })}
          </div>
          </InfoCard>

          <InfoCard exportId="keynote-speakers" eyebrow="Keynote Speakers" title="主题演讲嘉宾" className={fullSpanClassName} backgroundImage="/yale-bg1.jpg">
            <div className={`grid gap-4 ${dualGridClassName}`.trim()}>
            {content.keynoteSpeakers.map((speaker) => (
              <CompactSpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
          </InfoCard>

          <InfoCard exportId="roundtable" eyebrow="Roundtable" title="开放分享与圆桌对话" className={fullSpanClassName} backgroundImage="/yale-bg4.jpg">
            <div className={`grid gap-4 ${dualGridClassName}`.trim()}>
            {content.roundtableSpeakers.map((speaker) => (
              <CompactSpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
          <div className="mt-4 border border-dashed border-[#00356b]/25 bg-[#00356b]/[0.025] p-4">
            <h3 className="text-lg font-medium text-[#00356b]">{content.guestX.name}</h3>
            <p className="mt-1 text-lg uppercase tracking-[0.25em] text-[#00356b]/45">{content.guestX.title}</p>
            <p className="mt-3 text-lg md:text-xl leading-relaxed text-[#00356b]/72">{content.guestX.description}</p>
          </div>
          <p className="mt-4 text-lg md:text-xl font-medium leading-relaxed text-[#00356b]/80">{content.roundtableClosing}</p>
          </InfoCard>

          <InfoCard exportId="cocreation" eyebrow="Co-creation with AI" title="OpenClaw 共创 × 两张地图" className={fullSpanClassName} backgroundImage="/yale-bg2.jpg">
          <div className="mb-6 flex items-center gap-3 text-[#00356b]">
            <div className="flex h-10 w-10 items-center justify-center bg-[#00356b]/10">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-xl md:text-2xl font-medium">轻量共创</p>
          </div>
          <p className="mb-6 text-xl md:text-2xl leading-relaxed text-[#00356b]/72">{content.cocreationDescription}</p>

          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#00356b]/12" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#00356b]/40">Two Maps</p>
            <div className="h-px flex-1 bg-[#00356b]/12" />
          </div>

          <div className={`grid gap-4 ${dualGridClassName}`.trim()}>
            {content.mapItems.map((item) => {
              const Icon = item.kind === 'journey' ? Route : MapIcon

              return (
                <article key={item.title} className="border border-[#00356b]/12 bg-[#00356b]/[0.03] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#00356b]/10 text-[#00356b]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-[#00356b]">{item.title}</h3>
                  </div>
                  <p className="mb-4 text-lg md:text-xl leading-relaxed text-[#00356b]/68">{item.description}</p>
                  <img src={assetUrl(item.image)} alt={item.alt} className="w-full border border-[#00356b]/18 opacity-70" />
                </article>
              )
            })}
          </div>
          <p className="mt-4 text-center text-xl md:text-2xl font-medium leading-relaxed text-[#00356b]/82">{content.mapClosing}</p>
          </InfoCard>

          <InfoCard exportId="audience" eyebrow={content.audienceLabel} title={content.audienceTitle} className={fullSpanClassName} backgroundImage="/yale-bg3.jpg">
          <div className="bg-[#00356b] px-6 py-7 text-white md:px-7">
            <p className="mb-5 text-xl md:text-2xl text-white/70">{content.audienceIntro}</p>
            <div className="space-y-4 text-xl md:text-2xl leading-relaxed text-white/92">
              {content.audienceItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-2.5 h-2 w-2 shrink-0 bg-white/60" />
                  <p className="whitespace-nowrap">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6 px-4 py-6 md:px-6">
            <div className="absolute -left-2 top-2 text-6xl leading-none text-[#00356b]/18 font-serif">&ldquo;</div>
            <div className="absolute -right-2 bottom-2 text-6xl leading-none text-[#00356b]/18 font-serif">&rdquo;</div>
            <div className="flex justify-center">
              <p className="max-w-3xl text-pretty text-center text-xl md:text-2xl leading-relaxed tracking-wide text-[#00356b]/92 font-medium">
                {content.quote}
              </p>
            </div>
          </div>
          </InfoCard>

          <InfoCard exportId="registration" eyebrow={content.registration.eyebrow} title={content.registration.title} className={fullSpanClassName} backgroundImage="/yale-bg4.jpg">
          <div className="flex flex-col items-center gap-4">
            <div className="aspect-square w-full max-w-[220px] border border-dashed border-[#00356b]/25 bg-[#00356b]/[0.03] p-4">
              <img src={assetUrl('/qr-code.jpg')} alt="报名二维码" className="h-full w-full object-contain" />
            </div>
            <p className="text-lg md:text-xl text-[#00356b]/62">{content.registration.qrInstruction}</p>
          </div>
          </InfoCard>
        </div>
      </div>
      </div>

      <PosterFooter clubName={content.clubName} footerDateLabel={content.footerDateLabel} />
    </PosterShell>
  )
}
