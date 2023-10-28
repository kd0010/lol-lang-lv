import { SelfClosingTags } from '../../constants/SelfClosingTags'
import { getTagIndices } from './getTagIndices'
import { getTags } from './getTags'

/**
 * Ignores self-closing tags and other tags with no closing tag.
 */
export function getDeepestTags(
  text: string,
): DeepestTag[] {
  const deepestTags: DeepestTag[] = []
  const uniqueTags = getTags(text, {includeUniqueOnly: true})
  const uniqueTagIndices = uniqueTags.map(tagName => getTagIndices(text, tagName)).flat()

  for (const tagName of uniqueTags) {
    if (tagName in SelfClosingTags) continue

    const tagIndices = getTagIndices(text, tagName)
    for (const [openingTagIdx, closingTagIdx] of tagIndices) {
      if (closingTagIdx == null) continue

      // Just make sure that between opening and closing tag indices
      // there are no other tag indices for provided text.
      let isTagDeepest = true
      for (const [openingTagIdx2, closingTagIdx2] of uniqueTagIndices) {
        if (closingTagIdx2 == null) continue // such tags are ignored

        if (openingTagIdx2 > openingTagIdx && openingTagIdx2 < closingTagIdx) {
          isTagDeepest = false
        } else if (closingTagIdx2 > openingTagIdx && closingTagIdx2 < closingTagIdx) {
          isTagDeepest = false
        }
      }

      if (isTagDeepest) {
        deepestTags.push({
          tagName,
          openingTagIndex: openingTagIdx,
          closingTagIndex: closingTagIdx,
        })
      }
    }
  }

  return deepestTags
}

export interface DeepestTag {
  tagName: string
  openingTagIndex: number
  closingTagIndex: number
}
