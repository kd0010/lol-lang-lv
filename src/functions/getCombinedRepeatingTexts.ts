import { entriesWithTags } from '../constants/entriesWithTags'
import { repeatingTexts as cachedRepeatingTexts } from '../dev/repeatingTexts'
import { oneTagTexts as cachedOneTagTexts } from '../dev/oneTagTexts'
import { filterTranslateableTexts } from './the-real-guns/filterTranslateableTexts'
import { getRepeatingTextsThroughTags } from './the-real-guns/getRepeatingTextsThroughTags'
import { getUniqueTextsThroughTags } from './the-real-guns/getUniqueTextsThroughTags'

/**
 * Gets and combines repeating texts through tags from `getRepeatingTextsThroughTags`
 * and one tag texts from `getUniqueTextsThroughTags`.
 */
export function getCombinedRepeatingTexts(
  {
    minOccurances=10,
    includeTftTexts=false,
    useDevCachedObjects=false,
  }: GetCombinedRepeatingTextsOptions={}
) {
  // 1. Repeating texts
  const repeatingTexts = (useDevCachedObjects && cachedRepeatingTexts) || getRepeatingTextsThroughTags(entriesWithTags, minOccurances)
  const [tltableRepeatingTexts] = filterTranslateableTexts(repeatingTexts, { filterTftTexts: !includeTftTexts })

  // 2. Unique texts
  const htmlDepthLevel = 1
  const oneTagTexts = (useDevCachedObjects && cachedOneTagTexts) || getUniqueTextsThroughTags(entriesWithTags, htmlDepthLevel)
  const [tltableOneTagTexts] = filterTranslateableTexts(oneTagTexts, { filterTftTexts: !includeTftTexts })

  // remove gotten repeating texts in 1st step (remove duplicates)
  const adjustedTltableOneTagTexts = Object.fromEntries(Object.entries(tltableOneTagTexts).filter(([text, { occurances }]) => !(text in tltableRepeatingTexts) && occurances > minOccurances))

  // 3. Combine
  return {
    ...tltableRepeatingTexts,
    ...adjustedTltableOneTagTexts,
  }
}

export interface GetCombinedRepeatingTextsOptions {
  /** @default 10 */
  minOccurances?: number
  includeTftTexts?: boolean
  useDevCachedObjects?: boolean
}
