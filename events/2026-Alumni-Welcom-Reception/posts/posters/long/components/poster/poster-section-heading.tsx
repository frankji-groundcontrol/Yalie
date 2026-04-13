type PosterSectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  large?: boolean
}

export function PosterSectionHeading({ eyebrow, title, description, large = false }: PosterSectionHeadingProps) {
  return (
    <div className="text-center mb-10">
      <p className="mb-2 text-base md:text-lg tracking-[0.4em] text-[#00356b]/40 uppercase font-medium">{eyebrow}</p>
      <h2 className={large ? 'text-3xl md:text-4xl font-medium text-[#00356b]' : 'text-2xl md:text-3xl font-medium text-[#00356b]'}>
        {title}
      </h2>
      {description ? <p className="mt-2 text-xl md:text-2xl text-[#00356b]/50">{description}</p> : null}
    </div>
  )
}
