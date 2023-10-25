import { entryTextsWithTags } from '../../constants/entryTextsWithTags'
import { getTags } from '../tags/getTags'

export function getTagCounts(): {[tag: string]: number} {
  const tagCounts: {[tag: string]: number} = {}
  
  for (const entryText of entryTextsWithTags) {
    const tags = getTags(entryText)

    for (const tag of tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    }
  }

  return tagCounts
}
