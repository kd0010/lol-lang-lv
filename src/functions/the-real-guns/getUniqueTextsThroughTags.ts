import { AnalyzedTexts, StringtableEntries } from '../../types/types'
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
  entriesWithTags: StringtableEntries,
  /** Tag depth to use, meaning levels in HTML structure. */
  depth: number,
): AnalyzedTexts {
  const uniqueTexts: AnalyzedTexts = {}
  const entriesWithTagsLength = Object.keys(entriesWithTags).length

  /** This object saves all texts, even non-repeating ones and overlaps. */
  const textCounts: {[text: string]: [number, string[]]} = {}
  const getTextCount = (text: string): [number, string[]] => {
    if (text in textCounts) return textCounts[text]!

    let count = 0
    const occursInIds: string[] = []
    for (const entryId in entriesWithTags) {
      const entryText = entriesWithTags[entryId]!
      const foundIndex = entryText.indexOf(text)
      if (foundIndex == -1) continue
      occursInIds.push(entryId)
      count++
    }

    textCounts[text] = [count, occursInIds]

    return [count, occursInIds]
  }

  let loadingCount = 0

  for (const entryId in entriesWithTags) {
    const entryText = entriesWithTags[entryId]!

    if (++loadingCount % 1000 == 0) console.log(`${loadingCount} / ${entriesWithTagsLength}`) // TEMPDEV

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
      let currentOccursInIds: string[] = []
      let depthPointsAvailable = depth
      let reachedMaxDepth = true

      while (depthPointsAvailable--) {
        const currentClosingTagLength = '</'.length + currentTag.length + '>'.length

        currentText = entryText.slice(currentOpeningTagIdx, currentClosingTagIdx + currentClosingTagLength)
        
        const [count, occursInIds] = getTextCount(currentText)
        currentTextCount = count
        currentOccursInIds = occursInIds

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

      if (reachedMaxDepth) {
        uniqueTexts[currentText] = {
          text: currentText,
          occurances: currentTextCount,
          occursInIds: currentOccursInIds,
        }
      }
    }
  }

  return uniqueTexts
}
