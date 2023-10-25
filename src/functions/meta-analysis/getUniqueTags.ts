import { entryTextsWithTags } from '../../constants/entryTextsWithTags'
import { getTags } from '../tags/getTags'

export function getUniqueTags(): string[] {
  const allTags: string[] = []
  
  for (const entryText of entryTextsWithTags) {
    const tags = getTags(entryText)
    allTags.push(...tags)
  }

  const uniqueTags = [...new Set(allTags)]

  return uniqueTags
}
