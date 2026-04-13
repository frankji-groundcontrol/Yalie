import { PosterContent } from '../poster-content'
import { PosterDivider } from '../poster-divider'
import { PosterFooter } from '../poster-footer'
import { PosterHeader } from '../poster-header'
import { PosterShell } from '../poster-shell'
import { AudienceSection } from '../poster-sections/audience-section'
import { CoCreationSection } from '../poster-sections/cocreation-section'
import { RegistrationSection } from '../poster-sections/cta-section'
import { HeroSection } from '../poster-sections/hero-section'
import { IntroductionSection } from '../poster-sections/introduction-section'
import { KeynoteSection } from '../poster-sections/keynote-section'
import { QuoteSection } from '../poster-sections/quote-section'
import { RoundtableSection } from '../poster-sections/roundtable-section'

type LongPosterViewProps = {
  content: PosterContent
  onLogoClick?: () => void
}

export function LongPosterView({ content, onLogoClick }: LongPosterViewProps) {
  return (
    <PosterShell>
      <PosterHeader clubName={content.clubName} dateLabel={content.dateLabel} onLogoClick={onLogoClick} />

      <HeroSection
        title={content.eventTitle}
        subtitle={content.eventSubtitle}
        chineseDate={content.chineseDate}
        locations={content.locations}
      />

      <IntroductionSection
        aboutLabel={content.aboutLabel}
        aboutTitle={content.aboutTitle}
        introduction={content.introduction}
        valuesTitle={content.valuesTitle}
        values={content.values}
      />

      <PosterDivider />

      <KeynoteSection speakers={content.keynoteSpeakers} />
      <RoundtableSection speakers={content.roundtableSpeakers} guestX={content.guestX} closing={content.roundtableClosing} />

      <PosterDivider />

      <CoCreationSection description={content.cocreationDescription} mapItems={content.mapItems} closing={content.mapClosing} />
      <AudienceSection
        eyebrow={content.audienceLabel}
        title={content.audienceTitle}
        intro={content.audienceIntro}
        items={content.audienceItems}
      />
      <QuoteSection quote={content.quote} />
      <RegistrationSection
        eyebrow={content.registration.eyebrow}
        title={content.registration.title}
        qrPlaceholderText={content.registration.qrPlaceholderText}
        qrInstruction={content.registration.qrInstruction}
      />
      <PosterFooter clubName={content.clubName} footerDateLabel={content.footerDateLabel} />
    </PosterShell>
  )
}
