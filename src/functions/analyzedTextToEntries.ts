import { AnalyzedTexts, StringtableEntries } from '../types/types'

export function analyzedTextsToEntries(
  analyzedTexts: AnalyzedTexts
): StringtableEntries {
  const entries: StringtableEntries = {}

  for (const text in analyzedTexts) {
    const analyzedText = analyzedTexts[text]!
    
    // Simulate a normal entries object
    // by making an entry for each entry ID possible.
    for (const entryId of analyzedText.occursInIds) {
      entries[entryId] = analyzedText.text
    }
  }

  return entries
}
