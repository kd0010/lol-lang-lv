import { AnalyzedTexts, StringtableEntries } from '../types/types'

/**
 * Turns `AnalyzedTexts` back to original `StringtableEntries` form.
 * 
 * For example, `getRepeatingTextsThroughTags` filters out non-repeating
 * texts, but returns `AnalyzedTexts`. With this function you may get
 * back original entry form, now with filtered entries.
 */
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
