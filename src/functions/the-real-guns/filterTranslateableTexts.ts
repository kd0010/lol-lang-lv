import { wordsRegex } from '../../constants/regexes'
import { isTftTag } from '../../constants/TftTags'
import { stripEntryText } from '../stripEntryText'
import { getTags } from '../tags/getTags'

export function filterTranslateableTexts<T>(
  texts: {[text: string]: T},
  {
    filterTftTexts=false,
  }: FilterTranslateableTextsOptions={},
): [{[text: string]: T}, {[text: string]: T}] {
  const cleanTexts: {[text: string]: T} = {}
  const dirtyTexts: {[text: string]: T} = {}

  for (const text in texts) {
    // Skip over TFT texts, if opt'd for
    if (filterTftTexts) {
      const tags = getTags(text, {includeUniqueOnly: true})
      if (tags.some(isTftTag)) continue
    }

    const strippedText = stripEntryText(text)

    // Check whether it still has any real content left
    const hasWords = wordsRegex.test(strippedText)

    const value = texts[text]!

    if (hasWords) cleanTexts[text] = value
    else dirtyTexts[text] = value
  }

  return [cleanTexts, dirtyTexts]
}

export interface FilterTranslateableTextsOptions {
  filterTftTexts?: boolean
}
