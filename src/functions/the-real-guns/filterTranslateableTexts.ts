import { isTftTag } from '../../constants/TftTags'
import { isTranslateableText } from '../isTranslateableText'
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

    const value = texts[text]!

    if (isTranslateableText(text)) cleanTexts[text] = value
    else dirtyTexts[text] = value
  }

  return [cleanTexts, dirtyTexts]
}

export interface FilterTranslateableTextsOptions {
  filterTftTexts?: boolean
}
