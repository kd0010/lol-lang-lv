import { StringtableEntries, AnalyzedTexts } from '../../types/types'
import { getEntryUniqueTags } from '../meta-analysis/getEntryUniqueTags'
import { getClosingTagIndex } from '../tags/getClosingTagIndex'
import { getParentTag } from '../tags/getParentTag'
import { getTagIndices } from '../tags/getTagIndices'
import { lastIndexOfTag } from '../tags/lastIndexOfTag'

/**
 * **Warning!** Expensive operation.
 * 
 * Gets repeating texts **through tags**, counting them.
 * Any repeating texts that don't involve tags will not be gotten here.
 */
export function getRepeatingTextsThroughTags(
  entriesWithTags: StringtableEntries,
  repeatsAtLeastTimes: number=2,
): AnalyzedTexts {
  if (repeatsAtLeastTimes < 2) throw 'repeatsAtLeastTimes must be at least 2'

  const repeatingTexts: AnalyzedTexts = {}

  // For each tag and its full contents,
  // search a repeating string sequence.
  // Look outwards onto parent tag;
  // try to find a repeating sequence that is bigger.
  // Look for repetition and discard what doesn't repeat.
  const uniqueTags = getEntryUniqueTags({excludeSelfClosingTags: true})

  /** This object saves all texts, even non-repeating ones and overlaps. */
  const textAnalyses: {[text: string]: [number, string[]]} = {}
  const analyzeText = (text: string): [number, string[]] => {
    if (text in textAnalyses) return textAnalyses[text]!

    let count = 0
    let occursInIds: string[] = []
    for (const entryId in entriesWithTags) {
      const entryText = entriesWithTags[entryId]!
      const foundIndex = entryText.indexOf(text)
      if (foundIndex == -1) continue
      occursInIds.push(entryId)
      count++
    }

    textAnalyses[text] = [count, occursInIds]

    return [count, occursInIds]
  }
  const significantCharAmount: number = 200
  const examplesCache: {[text: string]: string} = {}
  const getExample = (text: string, occurdsInIds: string[]): string => {
    if (text in examplesCache) return examplesCache[text]!
    let suitableExample = ''
    for (const entryId of occurdsInIds) {
      const text = entriesWithTags[entryId]
      if (text == null) continue
      suitableExample = text
      if (suitableExample.length >= significantCharAmount) break
    }
    suitableExample = surroundRepeatingTextInEmojis(suitableExample, text, '➡️', '⬅️')
    examplesCache[text] = suitableExample
    return suitableExample
  }
  const surroundRepeatingTextInEmojis = (example: string, repeatingText: string, beginEmoji: string, endEmoji: string): string => {
    const beginIdx = example.indexOf(repeatingText)
    if (beginIdx == null) return repeatingText
    const endIdx = beginIdx + repeatingText.length
    return example.slice(0, beginIdx) + beginEmoji + example.slice(beginIdx, endIdx) + endEmoji + example.slice(endIdx)
  }

  for (const tagName of uniqueTags) {
    console.log('\ntagName', tagName) // TEMPDEV

    // for (const entryId in Object.fromEntries(Object.entries(entriesWithTags).slice(500, 550))) { // TEMPDEV
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

          const [count, occursInIds] = analyzeText(currentText)
          currentTextCount = count
          currentOccursInIds = occursInIds

          if (currentTextCount >= repeatsAtLeastTimes) {
            const parentTagName = getParentTag(entryText, currentTag, currentOpeningTagIdx)

            if (parentTagName == null) {
              repeatingTexts[currentText] = {
                text: currentText,
                occurances: currentTextCount,
                occursInIds: currentOccursInIds,
                example: getExample(currentText, currentOccursInIds),
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
              example: getExample(previousText, previousOccursInIds),
            }
          }

          break
        } while (true)
      }
    }
  }

  return repeatingTexts
}
