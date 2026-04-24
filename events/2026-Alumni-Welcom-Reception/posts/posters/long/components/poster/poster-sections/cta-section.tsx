type RegistrationSectionProps = {
  eyebrow: string
  title: string
  qrPlaceholderText: string
  qrInstruction: string
}

export function RegistrationSection({ eyebrow, title, qrPlaceholderText, qrInstruction }: RegistrationSectionProps) {
  return (
    <section className="mb-16 w-full max-w-3xl">
      <p className="mb-3 text-lg md:text-xl tracking-[0.3em] text-[#00356b]/50 uppercase font-semibold">{eyebrow}</p>
      <h2 className="mb-6 text-5xl md:text-6xl font-medium text-[#00356b]">{title}</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="aspect-square w-full max-w-[260px] border border-dashed border-[#00356b]/25 bg-[#00356b]/[0.03] p-4">
          <img src="/qr-code.jpg" alt="报名二维码" className="h-full w-full object-contain" />
        </div>
        <p className="text-xl md:text-2xl text-[#00356b]/62">{qrInstruction}</p>
      </div>
    </section>
  )
}
