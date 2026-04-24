import { assetUrl } from '@/lib/asset-url'

type PosterHeaderProps = {
  clubName: string
  dateLabel: string
  onLogoClick?: () => void
  compact?: boolean
}

export function PosterHeader({ clubName, dateLabel, onLogoClick, compact = false }: PosterHeaderProps) {
  const icon = (
    <div className="h-full w-full border border-white/80 bg-white/70 p-2 shadow-[0_12px_32px_rgba(0,53,107,0.08)] backdrop-blur-sm">
      <img src={assetUrl('/yale_club_sh.jpg')} alt="Yale Club of Shanghai" className="h-full w-full object-contain" />
    </div>
  )

  const headerSpacingClassName = compact ? 'mb-8 pt-0' : 'mb-12 pt-4'
  const logoSpacingClassName = compact ? 'relative mb-4 mx-auto h-28 w-28 md:h-32 md:w-32' : 'relative mb-8 mx-auto h-32 w-32 md:h-36 md:w-36'
  const logoButtonSizeClassName = compact ? 'h-full w-full cursor-pointer transition-transform duration-200 hover:scale-[1.02]' : 'h-full w-full cursor-pointer'
  const clubTextClassName = compact
    ? 'text-xl md:text-2xl tracking-[0.18em] text-[#00356b]/70 uppercase font-medium'
    : 'text-xl md:text-2xl tracking-[0.2em] text-[#00356b]/70 uppercase font-medium'
  const dateTextClassName = compact
    ? 'text-xl md:text-2xl tracking-[0.18em] text-[#00356b]/60'
    : 'text-xl md:text-2xl tracking-[0.2em] text-[#00356b]/60'

  return (
    <>
      <header className={`${headerSpacingClassName} flex w-full items-center justify-between`}>
        <div className={clubTextClassName}>{clubName}</div>
        <div className={dateTextClassName}>{dateLabel}</div>
      </header>

      <div className={logoSpacingClassName}>
        {onLogoClick ? (
          <button type="button" onClick={onLogoClick} className={logoButtonSizeClassName} aria-label="Toggle poster view">
            {icon}
          </button>
        ) : (
          icon
        )}
      </div>

    </>
  )
}
