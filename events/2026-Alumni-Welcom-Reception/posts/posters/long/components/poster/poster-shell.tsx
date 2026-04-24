import { ReactNode } from 'react'

import { assetUrl } from '@/lib/asset-url'

type PosterShellProps = {
  children: ReactNode
}

const backgroundImages = [
  '/yale-bg1.jpg',
  '/yale-bg2.jpg',
  '/yale-bg3.jpg',
  '/yale-bg4.jpg',
]

const backgroundOffsets = ['40px', 'calc(100vw - 40px)', 'calc(200vw - 120px)', 'calc(300vw - 200px)']

export function PosterShell({ children }: PosterShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f6f8] text-[#00356b] relative">
      <div className="fixed inset-0 bg-[#f5f6f8] z-0" />

      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className="absolute z-[1] opacity-[0.05]"
          style={{
            backgroundImage: `url("${assetUrl(image)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            top: backgroundOffsets[index],
            left: '40px',
            right: '40px',
            height: 'calc(100vw - 80px)',
          }}
        />
      ))}

      <div className="absolute top-0 left-0 right-0 h-2 bg-[#00356b] z-20" />
      <div className="absolute top-0 left-8 h-full w-px bg-gradient-to-b from-[#00356b]/20 via-[#00356b]/5 to-transparent z-[2]" />
      <div className="absolute top-0 right-8 h-full w-px bg-gradient-to-b from-[#00356b]/20 via-[#00356b]/5 to-transparent z-[2]" />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 md:px-12 md:py-16">{children}</div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#00356b] z-20" />
    </main>
  )
}
