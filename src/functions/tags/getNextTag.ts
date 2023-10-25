/**
 * Takes a string and finds the next **opening** tag
 * from `position`. Ignores closing tags.
 * Returns the tag name without its brackets,
 * or `null` if no tag could be found.
 */
export function getNextTag(
  contents: string,
  position: number=0,
): string | null {
  let doRecordTag = false
  let tag = ''
  for (let i = position; i < contents.length; i++) {
    const letter = contents[i]
    if (letter == '<') {
      doRecordTag = true
    } else if (doRecordTag) {
      if (letter == ' ' || letter == '>') return tag
      if (letter == '/') {
        doRecordTag = false // ignore closing tags
        tag = ''
      } else {
        tag += letter
      }
    }
  }
  return null
}
