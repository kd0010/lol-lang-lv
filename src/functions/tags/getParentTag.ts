import { SelfClosingTags } from '../../constants/SelfClosingTags'
import { getClosingTagIndex } from './getClosingTagIndex'
import { getPreviousTag } from './getPreviousTag'
import { indexOfTag } from './indexOfTag'
import { lastIndexOfTag } from './lastIndexOfTag'

/**
 * Starts searching for `targetTagName` from `position`.
 * Returns the parent tag name without its brackets.
 */
export function getParentTag(
  contents: string,
  targetTagName: string,
  position: number=0,
): string | null {
  let targetOpeningTagIndex = indexOfTag(contents, targetTagName, position)
  let targetClosingTagIndex = getClosingTagIndex(contents, targetTagName, targetOpeningTagIndex)
  if (targetOpeningTagIndex == -1) return null
  if (targetClosingTagIndex == null) {
    // self-closing tags route
    targetClosingTagIndex = targetOpeningTagIndex + targetTagName.length + '>'.length
  }
  if (targetClosingTagIndex == null) return null

  // Mission:
  // encounter an earlier opening tag
  // whose closing tag includes target tag
  // (to know that it is a parent tag)
  const ignoreTagBracket = 1
  let currentSearchBeginPosition = targetOpeningTagIndex - ignoreTagBracket
  let parentTag = ''
  while (currentSearchBeginPosition > 0) {
    const candidateTagName = getPreviousTag(contents, currentSearchBeginPosition)
    if (candidateTagName == null) break

    const candidateTagIndex = lastIndexOfTag(contents, candidateTagName, currentSearchBeginPosition)
    if (candidateTagIndex == -1) break

    // skip over tags that can't be parent tags
    if (candidateTagName in SelfClosingTags) {
      currentSearchBeginPosition = candidateTagIndex - 1
      continue
    }

    // find closing tag and ensure it is after target tag
    const candidateClosingTagIndex = getClosingTagIndex(contents, candidateTagName, candidateTagIndex)
    if (candidateClosingTagIndex == null) {
      currentSearchBeginPosition = candidateTagIndex - 1
      continue
    }

    if (candidateClosingTagIndex > targetClosingTagIndex) {
      parentTag = candidateTagName
      break // found it!
    } else {
      currentSearchBeginPosition = candidateTagIndex - 1
      continue
    }
  }

  return parentTag || null
}
