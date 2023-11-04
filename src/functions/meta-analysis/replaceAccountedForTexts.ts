import { flipObj } from 'rift-js-utils/object'
import { entries } from '../../constants/entries'
import { AnalyzedTexts, StringtableEntries } from '../../types/interfaces'
import { stripEntryText } from '../stripEntryText'
import { filterTranslateableTexts } from '../the-real-guns/filterTranslateableTexts'

/**
 * Modifies the original entries object,
 * removing all texts that have been analyzed and provided
 * in this function's parameters.
 * Also removes tags and other untranslateable stuff
 * for ease of use for meta-analysis.
 */
export function replaceAccountedForTexts(
  returnStrippedTexts: boolean,
  ...multipleAnalyzedTexts: AnalyzedTexts[]
): StringtableEntries {
  const modifiedEntries: StringtableEntries = {}
  const delChar: string = ''

  for (const analyzedTexts of multipleAnalyzedTexts) {
    for (const text in analyzedTexts) {
      const analyzedText = analyzedTexts[text]!
      
      for (const entryId of analyzedText.occursInIds) {
        if (!(entryId in entries)) continue
        const entryText = entries[entryId]!
        const modifiedEntryText = entryText.replaceAll(analyzedText.text, delChar)
        modifiedEntries[entryId] = modifiedEntryText
      }
    }
  }

  // filter stuff that isn't trasnlateable out
  let [tltableModifiedEntries] = filterTranslateableTexts(flipObj(modifiedEntries))

  tltableModifiedEntries = flipObj(tltableModifiedEntries) // flip back

  // strip texts from tags etc. for easier viewing onto
  // what translateable texts have not been accounted for
  if (returnStrippedTexts) {
    for (const entryId in tltableModifiedEntries) {
      const text = tltableModifiedEntries[entryId]!
      const strippedText = stripEntryText(text)
      tltableModifiedEntries[entryId] = strippedText
    }
  }

  return tltableModifiedEntries
}
