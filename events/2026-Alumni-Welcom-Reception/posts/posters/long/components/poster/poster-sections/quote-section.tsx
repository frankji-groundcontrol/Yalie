type QuoteSectionProps = {
  quote: string
}

export function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <section className="mb-14 max-w-3xl">
      <div className="relative px-4 py-6">
        <div className="absolute -left-2 top-2 text-6xl leading-none text-[#00356b]/18 font-serif">&ldquo;</div>
        <p className="text-pretty text-center text-lg md:text-xl leading-relaxed tracking-wide text-[#00356b]/92 font-medium">{quote}</p>
        <div className="absolute -right-2 bottom-2 text-6xl leading-none text-[#00356b]/18 font-serif">&rdquo;</div>
      </div>
    </section>
  )
}
