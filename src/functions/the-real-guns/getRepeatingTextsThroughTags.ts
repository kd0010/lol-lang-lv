import { StringtableEntries, AnalyzedTexts } from '../../types/types'
import { getEntryUniqueTags } from '../meta-analysis/getEntryUniqueTags'
import { getClosingTagIndex } from '../tags/getClosingTagIndex'
import { getParentTag } from '../tags/getParentTag'
import { getTagIndices } from '../tags/getTagIndices'
import { lastIndexOfTag } from '../tags/lastIndexOfTag'

/**
 * Gets repeating texts **through tags**, counting them.
 * Any repeating texts that don't involve tags will not be gotten here.
 */
export function getRepeatingTextsThroughTags(
  entriesWithTags: StringtableEntries,
): AnalyzedTexts {
  const repeatingTexts: AnalyzedTexts = {}

  // For each tag and its full contents,
  // search a repeating string sequence.
  // Look outwards onto parent tag;
  // try to find a repeating sequence that is bigger.
  // Look for repetition and discard what doesn't repeat.
  const uniqueTags = getEntryUniqueTags()

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

  for (const tagName of uniqueTags) {
    // console.log('\ntagName', tagName) // TEMPDEV

    for (const entryId in entriesWithTags) {
      const entryText = entriesWithTags[entryId]!
      // there could be more than 1 tag of this `tagName`.
      const tagIndices = getTagIndices(entryText, tagName)

      for (const [openingTagIdx, closingTagIdx] of tagIndices) {
        if (closingTagIdx == null) continue // not gonna look for such repeating contents atm

        let currentTag = tagName
        let currentOpeningTagIdx = openingTagIdx
        let currentClosingTagIdx = closingTagIdx
        let currentText = ''
        let currentTextCount = 0
        let currentOccursInIds: string[] = []
        let previousText = ''
        let previousTextCount = 0
        let previousOccursInIds: string[] = []

        do {
          const currentClosingTagLength = '</'.length + currentTag.length + '>'.length

          currentText = entryText.slice(currentOpeningTagIdx, currentClosingTagIdx + currentClosingTagLength)

          const [count, occursInIds] = getTextCount(currentText)
          currentTextCount = count
          currentOccursInIds = occursInIds

          if (currentTextCount > 1) {
            const parentTagName = getParentTag(entryText, currentTag, currentOpeningTagIdx)

            if (parentTagName == null) {
              repeatingTexts[currentText] = {
                text: currentText,
                occurances: currentTextCount,
                occursInIds: currentOccursInIds,
              }
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
            //
            previousText = currentText
            previousTextCount = currentTextCount
            previousOccursInIds = currentOccursInIds
            currentText = ''
            currentTextCount = 0
            currentOccursInIds = []
          } else if (previousTextCount > 1) {
            // This clause would occur in the case that
            // we went parent element, but found out that it doesn't repeat.
            // Then we just save previous text.
            repeatingTexts[previousText] = {
              text: previousText,
              occurances: previousTextCount,
              occursInIds: previousOccursInIds,
            }
          }

          break
        } while (true)
      }
    }
  }

  return repeatingTexts
}
