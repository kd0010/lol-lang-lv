import { isSelfClosingTag } from '../../constants/SelfClosingTags'
import { entryTextsWithTags } from '../../constants/entryTextsWithTags'
import { getTags } from '../tags/getTags'

export function getEntryUniqueTags({
  excludeSelfClosingTags=false,
}: GetEntryUniqueTagsOptions={}): string[] {
  const allTags: string[] = []
  
  for (const entryText of entryTextsWithTags) {
    const tags = getTags(entryText)
    allTags.push(...tags)
  }

  let uniqueTags = [...new Set(allTags)]

  if (excludeSelfClosingTags) {
    uniqueTags = uniqueTags.filter(tagName => !isSelfClosingTag(tagName))
  }

  return uniqueTags
}

export interface GetEntryUniqueTagsOptions {
  excludeSelfClosingTags?: boolean
}
