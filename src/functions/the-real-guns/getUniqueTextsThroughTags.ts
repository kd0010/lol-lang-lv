import { getClosingTagIndex } from '../tags/getClosingTagIndex'
import { getDeepestTags } from '../tags/getDeepestTags'
import { getParentTag } from '../tags/getParentTag'
import { lastIndexOfTag } from '../tags/lastIndexOfTag'

/**
 * **Warning!** Expensive operation.
 * 
 * Gets unique texts **through tags**, counting them.
 * Any unique texts that don't involve tags will not be gotten here.
 */
export function getUniqueTextsThroughTags(
  entryTextsWithTags: string[],
  /** Tag depth to use, meaning levels in HTML structure. */
  depth: number,
): {[text: string]: number} {
  const uniqueTexts: {[text: string]: number} = {}

  /** This object saves all texts, even non-repeating ones and overlaps. */
  const textCounts: typeof uniqueTexts = {}
  const getTextCount = (text: string): number => {
    if (text in textCounts) return textCounts[text]!

    let count = 0
    for (const entryText2 of entryTextsWithTags) {
      const foundIndex = entryText2.indexOf(text)
      if (foundIndex == -1) continue
      count++
    }

    textCounts[text] = count

    return count
  }

  let loadingCount = 0

  for (const entryText of entryTextsWithTags) {
    if (++loadingCount % 1000 == 0) console.log(`${loadingCount} / ${entryTextsWithTags.length}`) // TEMPDEV
    const deepestTags = getDeepestTags(entryText)

    for (const {
      tagName,
      openingTagIndex,
      closingTagIndex,
    } of deepestTags) {
      let currentTag = tagName
      let currentOpeningTagIdx = openingTagIndex
      let currentClosingTagIdx = closingTagIndex
      let currentText = ''
      let currentTextCount = 0
      let depthPointsAvailable = depth
      let reachedMaxDepth = true

      while (depthPointsAvailable--) {
        const currentClosingTagLength = '</'.length + currentTag.length + '>'.length

        currentText = entryText.slice(currentOpeningTagIdx, currentClosingTagIdx + currentClosingTagLength)
        currentTextCount = getTextCount(currentText)

        const parentTagName = getParentTag(entryText, currentTag, currentOpeningTagIdx)

        if (parentTagName == null) {
          if (depthPointsAvailable != 0) reachedMaxDepth = false
          break // go next entry text; have exceeded how far can go with this one
        }

        // The only time we continue is if
        // there's a parent element to jump up a level to.
        currentTag = parentTagName
        const newOpeningTagIdx = lastIndexOfTag(entryText, parentTagName, currentOpeningTagIdx)
        const newClosingTagIdx = getClosingTagIndex(entryText, parentTagName, newOpeningTagIdx)
        if (newClosingTagIdx == null) break // go next like above
        currentOpeningTagIdx = newOpeningTagIdx
        currentClosingTagIdx = newClosingTagIdx
      }

      if (reachedMaxDepth) uniqueTexts[currentText] = currentTextCount
    }
  }

  return uniqueTexts
}
