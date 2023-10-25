import { getEntryTextsWithTags } from '../functions/getEntryTexts'
import { getUniqueTags } from '../functions/meta-analysis/getUniqueTags'

/**
 * Gets repeating texts **through tags**, counting them.
 * Any repeating texts that don't involve tags will not be gotten here.
 */
export function getRepeatingTextsThroughTags_FAIL(): {[text: string]: number} {
  const repeatingTexts: {[text: string]: number} = {}
  const entryTextsWithTags = getEntryTextsWithTags()

  // For each tag and its full contents,
  // search a repeating string sequence.
  // Look outwards onto parent tag;
  // try to find a repeating sequence that is bigger.
  // Look for repetition and discard what doesn't repeat.
  const uniqueTags = getUniqueTags()

  const getTextCount = (text: string) => {
    let count = 0
    for (const entryText2 of entryTextsWithTags) {
      const foundIndex = entryText2.indexOf(text)
      if (foundIndex == -1) continue
      count++
    }
    return count
  }

  const getOriginalText = (entryText: string, outerHtml: string): string => {
    let modifiedEntryText = entryText.toLowerCase()
    let modifiedOuterHtml = outerHtml.toLowerCase().replaceAll('"', '\'')
    let beginIdx = modifiedEntryText.indexOf(modifiedOuterHtml)
    if (beginIdx == -1) {
      modifiedOuterHtml = modifiedOuterHtml.replaceAll('</li>', '')
      beginIdx = modifiedEntryText.indexOf(modifiedOuterHtml)
    }
    if (beginIdx == -1) {
      modifiedOuterHtml = modifiedOuterHtml.replaceAll('<postscriptleft>', '')
      modifiedOuterHtml = modifiedOuterHtml.replaceAll('</postscriptleft>', '')
      modifiedEntryText = modifiedEntryText.replaceAll('<postscriptleft>', '')
      modifiedEntryText = modifiedEntryText.replaceAll('</postscriptleft>', '')
      beginIdx = modifiedEntryText.indexOf(modifiedOuterHtml)
    }
    if (beginIdx == -1) {
      console.log('failure in getOriginalText()')
      console.log('modifiedEntryText', modifiedEntryText)
      console.log('modifiedOuterHtml', modifiedOuterHtml)
      throw 'there must be a match'
    }
    const endIdx = beginIdx + outerHtml.length
    return entryText.slice(beginIdx, endIdx)
  }

  for (const tagName of uniqueTags) {
    if (tagName != 'mainText') continue // TEMP
    console.log('\ntagName', tagName) // TEMP
    if (tagName.includes('@')) continue // skip tags that are not supported by DOM API

    for (const entryText of entryTextsWithTags.slice(500, 550)) { // TEMP
    // for (const entryText of entryTextsWithTags) {
      const rootDiv = document.createElement('div')
      rootDiv.id = 'root'
      rootDiv.innerHTML = entryText
      
      const targetElems = rootDiv.querySelectorAll(tagName)

      for (const targetElem of targetElems) {
        let currentElem = targetElem
        let currentText = ''
        let currentTextCount = 0
        let previousText = ''
        let previousTextCount = 0

        do {
          currentText = currentElem.outerHTML
          console.log('currentText', currentText) // TEMP

          // Determine the count of current text
          if (currentText in repeatingTexts) { // get the already counted text
            currentTextCount = repeatingTexts[currentText]!
          } else { // expensive action...
            // TEMP SECTION BEGIN
            const originalText = getOriginalText(entryText, currentText)
            if (tagName == 'mainText' && entryText.includes('mainText')) {
            }
            // TEMP SECTION END
            currentTextCount = getTextCount(currentText)
            // TEMP SECTION BEGIN
            // if (currentText.includes('<maintext>')) {
            //   console.log('currentText', currentText) // TEMP
            //   console.log('currentTextCount', currentTextCount) // TEMP
            //   throw 'TEMP' // TEMP
            // }
            // TEMP SECTION END
          }

          // Targeting repetition
          if (currentTextCount > 1) {
            if (
              currentElem.parentElement == null ||
              currentElem.parentElement.id == 'root'
            ) {
              repeatingTexts[currentText] = currentTextCount
              break // stop looking for repeating text; go next entry text
            }

            // Go next loop, looking for bigger text to match
            currentElem = currentElem.parentElement
            previousText = currentText
            previousTextCount = currentTextCount
            currentTextCount = 0
            continue
          } else if (previousTextCount > 1) {
            // This clause would occur in the case that
            // we went parent element, but found out that it doesn't repeat.
            // Then we just save previous text.
            repeatingTexts[previousText] = previousTextCount
            break // stop looking for repeating text; go next entry text
          }

          break
        } while (true)
      }
    }
  }

  return repeatingTexts
}
