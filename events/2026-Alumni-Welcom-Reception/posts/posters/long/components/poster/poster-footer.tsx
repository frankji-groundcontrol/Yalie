type PosterFooterProps = {
  clubName: string
  footerDateLabel: string
}

export function PosterFooter({ clubName, footerDateLabel }: PosterFooterProps) {
  return (
    <footer className="mt-6 flex items-center gap-6">
      <div className="h-px w-20 bg-[#00356b]/20" />
      <p className="text-lg md:text-xl tracking-[0.2em] text-[#00356b]/50 uppercase font-medium">{clubName} · {footerDateLabel}</p>
      <div className="h-px w-20 bg-[#00356b]/20" />
    </footer>
  )
}
