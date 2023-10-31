/**
 * Returns unique strings that match a certain provided regex
 * from all entry texts.
 */
export function searchTexts(
  texts: string[],
  pattern: string | RegExp,
): string[] {
  let foundTexts: string[] = []

  for (const text of texts) {
    const matches = text.match(new RegExp(pattern, 'g'))
    if (matches == null) continue
    foundTexts.push(...matches)
  }

  foundTexts = [...new Set(foundTexts)] // take only unique
  return foundTexts
}
