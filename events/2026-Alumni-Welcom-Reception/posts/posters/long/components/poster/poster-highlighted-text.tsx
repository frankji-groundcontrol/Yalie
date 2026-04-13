type PosterHighlightedTextProps = {
  text: string
  emphasisClassName?: string
}

const aboutHighlightPhrases = [
  '重点不是展示技术本身',
  '活动重点并不是展示技术本身',
  'AI 怎么进入真实生活',
  'OpenClaw',
  'Vibe Coding',
  '把智能体当作朋友',
  '更多真实的相遇',
  '更多社区',
  '更多朋友',
].sort((a, b) => b.length - a.length)

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const highlightPattern = new RegExp(`(${aboutHighlightPhrases.map(escapeRegExp).join('|')})`, 'g')

export function PosterHighlightedText({
  text,
  emphasisClassName = 'font-semibold text-[#00356b]',
}: PosterHighlightedTextProps) {
  let cursor = 0

  return text.split(highlightPattern).map((part) => {
    if (!part) {
      return null
    }

    const key = `${part}-${cursor}`
    cursor += part.length

    const isHighlighted = aboutHighlightPhrases.includes(part)

    return isHighlighted ? (
      <span key={key} className={emphasisClassName}>
        {part}
      </span>
    ) : (
      <span key={key}>{part}</span>
    )
  })
}
