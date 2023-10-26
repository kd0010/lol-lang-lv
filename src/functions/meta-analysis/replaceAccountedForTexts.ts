import { entries } from '../../constants/entries'
import { AnalyzedTexts, StringtableEntries } from '../../types/types'

/**
 * Modifies the original entries object,
 * removing all texts that have been analyzed and provided
 * in this function's parameters.
 * Also removes tags and other untranslateable stuff
 * for ease of use for meta-analysis.
 */
export function replaceAccountedForTexts(
  ...multipleAnalyzedTexts: AnalyzedTexts[]
): StringtableEntries {
  const modifiedEntries: StringtableEntries = {}
  const delChar: string = ''

  for (const analyzedTexts of multipleAnalyzedTexts) {
    for (const text in analyzedTexts) {
      const analyzedText = analyzedTexts[text]!
      
      for (const entryId of analyzedText.occursInIds) {
        if (!(entryId in entries)) continue
        const entryText = entries[entryId as keyof typeof entries]
        const modifiedEntryText = entryText.replaceAll(analyzedText.text, delChar)
        modifiedEntries[entryId] = modifiedEntryText
      }
    }
  }

  return modifiedEntries
}
