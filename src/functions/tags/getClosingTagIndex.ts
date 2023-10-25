import { getOpeningTagRegex } from '../../constants/regexes'

/**
 * Finds closing tag index taking into account multiple dom levels,
 * or determines that it is not present.
 */
export function getClosingTagIndex(
  text: string,
  tagName: string,
  position: number=0,
): number | null {
  position = Math.min(text.length - 1, position)
  position = Math.max(0, position)
  const targetClosingTagSt = '</' + tagName + '>'
  const targetOpeningTagRegex = getOpeningTagRegex(tagName)
  
  let hasFoundOpeningTag = false
  let falsePositiveLevel = -1
  let doRecordTag = false
  let tag = ''
  for (let letterIdx = position; letterIdx < text.length; letterIdx++) {
    const letter = text[letterIdx]!

    if (letter == '<') {
      doRecordTag = true
      tag = '<'
    } else if (doRecordTag) {
      tag += letter
    }

    // See if is opening tag...
    if (targetOpeningTagRegex.test(tag)) {
      hasFoundOpeningTag = true
      falsePositiveLevel++
      tag = ''
      doRecordTag = false
    }

    // See if is closing tag...
    if (tag == targetClosingTagSt) {
      if (falsePositiveLevel == 0) {
        return letterIdx - (targetClosingTagSt.length - 1)
      } else {
        if (hasFoundOpeningTag) falsePositiveLevel--
        tag = ''
        doRecordTag = false
      }
    }
  }

  return null
}
