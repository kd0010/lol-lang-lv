import { letterCharsRegex } from '../../constants/regexes'

/**
 * Takes a string and finds the previous **opening** tag
 * from `position`. Ignores closing tags.
 * Returns the tag name without its brackets,
 * or `null` if no tag could be found.
 */
export function getPreviousTag(
  contents: string,
  position: number=contents.length - 1,
): string | null {
  let doRecordTag = false
  let tag = ''
  for (let i = position; i >= 0; i--) {
    const letter = contents[i]
    if (letter == '>' && doRecordTag) {
      // reset recording
      tag = ''
    } else if (letter == '>') { // the ending tag
      doRecordTag = true
    } else if (doRecordTag) {
      if (letter == '/') {
        doRecordTag = false // ignore closing tags
        tag = ''
      } else if (letter == ' ') {
        // just moved on from an attribute, re-record
        tag = ''
      }
      else if (letter == '<' && letterCharsRegex.test(tag)) return tag
      else tag = letter + tag
    }
  }
  return null
}
