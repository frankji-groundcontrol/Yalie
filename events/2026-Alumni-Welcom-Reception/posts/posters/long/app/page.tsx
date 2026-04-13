'use client'

import { useState } from 'react'

import { posterContent } from '@/components/poster/poster-content'
import { CardPosterView } from '@/components/poster/poster-views/card-poster-view'
import { LongPosterView } from '@/components/poster/poster-views/long-poster-view'

type PosterViewMode = 'long' | 'card'

export default function EventPosterPage() {
  const [viewMode, setViewMode] = useState<PosterViewMode>('long')

  const handleLogoClick = () => {
    setViewMode((currentView) => (currentView === 'long' ? 'card' : 'long'))
  }

  if (viewMode === 'card') {
    return <CardPosterView content={posterContent} onLogoClick={handleLogoClick} />
  }

  return <LongPosterView content={posterContent} onLogoClick={handleLogoClick} />
}
