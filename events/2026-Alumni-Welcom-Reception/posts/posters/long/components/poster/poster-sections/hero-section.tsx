import { Calendar, MapPin } from 'lucide-react'

type HeroSectionProps = {
  title: string
  subtitle: string
  chineseDate: string
  locations: string[]
  compact?: boolean
}

function parseLocation(location: string) {
  const parts = location.split(' · ')

  if (parts.length <= 2) {
    return {
      label: parts[0] ?? '',
      venue: parts[1] ?? null,
      address: null,
    }
  }

  return {
    label: parts[0] ?? '',
    venue: parts[1] ?? null,
    address: parts.slice(2).join(' · '),
  }
}

export function HeroSection({ title, subtitle, chineseDate, locations, compact = false }: HeroSectionProps) {
  const sectionClassName = compact ? 'mx-auto mb-10 max-w-5xl text-center' : 'mx-auto mb-16 max-w-4xl text-center'
  const eyebrowClassName = compact
    ? 'mb-3 text-base md:text-lg tracking-[0.28em] text-[#00356b]/50 uppercase font-semibold'
    : 'mb-3 text-base md:text-lg tracking-[0.3em] text-[#00356b]/50 uppercase font-semibold'
  const titleClassName = compact
    ? 'mb-4 text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance text-[#00356b]'
    : 'mb-4 text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance text-[#00356b]'
  const dividerWidth = compact ? 'w-12' : 'w-16'
  const subtitleClassName = compact
    ? 'mb-7 text-[2rem] md:text-[2.6rem] lg:text-[3rem] font-medium tracking-wide text-[#00356b]/80'
    : 'mb-8 text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide text-[#00356b]/80'
  const infoIconClassName = compact ? 'h-5 w-5' : 'h-6 w-6'
  const infoTextClassName = compact ? 'text-xl md:text-2xl tracking-wide font-medium' : 'text-lg md:text-xl tracking-wide font-medium'
  const locationWrapClassName = compact
    ? 'grid w-full max-w-2xl gap-3'
    : 'flex flex-col items-center gap-3'

  return (
    <section className={sectionClassName}>
      <p className={eyebrowClassName}>April Alumni Gathering</p>

      <h1 className={titleClassName}>{title}</h1>

      <div className="mb-5 flex items-center justify-center gap-4">
        <div className={`h-px ${dividerWidth} bg-[#00356b]/30`} />
        <div className="h-3 w-3 rotate-45 border border-[#00356b]/40" />
        <div className={`h-px ${dividerWidth} bg-[#00356b]/30`} />
      </div>

      <p className={subtitleClassName}>{subtitle}</p>

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2 whitespace-nowrap text-[#00356b]/70">
          <Calendar className={`${infoIconClassName} shrink-0`} />
          <span className={`${infoTextClassName} whitespace-nowrap`}>{chineseDate}</span>
        </div>
        <div className={locationWrapClassName}>
          {locations.map((location) => {
            const parsedLocation = parseLocation(location)

            return (
            <div
              key={location}
              className={compact ? 'flex items-start gap-3 border border-[#00356b]/12 bg-[#00356b]/[0.03] px-4 py-4 text-[#00356b]/70' : 'flex items-start gap-2 text-[#00356b]/70'}
            >
              <MapPin className={infoIconClassName} />
              <div className="text-left">
                <p className={compact ? 'text-lg md:text-xl tracking-[0.22em] text-[#00356b]/55 uppercase' : 'text-sm md:text-base tracking-[0.2em] text-[#00356b]/55 uppercase'}>
                  {parsedLocation.label}
                </p>
                {parsedLocation.venue ? (
                  <p className={compact ? 'mt-1 text-xl md:text-2xl tracking-wide text-[#00356b]' : 'mt-1 text-lg md:text-xl tracking-wide text-[#00356b]'}>
                    {parsedLocation.venue}
                  </p>
                ) : null}
                {parsedLocation.address ? (
                  <p className="mt-1 text-lg md:text-xl leading-relaxed text-[#00356b]/56">{parsedLocation.address}</p>
                ) : null}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
