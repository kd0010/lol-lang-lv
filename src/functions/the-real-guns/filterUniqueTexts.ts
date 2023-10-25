import {
  atVariableRegex,
  calcTagWithContentsRegex,
  dollarSignVariableRegex,
  percentIVariableRegex,
  variableInDoubleCurlyBracketsRegex,
  wordsRegex,
} from '../../constants/regexes'
import { getTags } from '../tags/getTags'

export function filterUniqueTexts(
  uniqueTexts: {[text: string]: number},
): {[text: string]: number} {
  const filteredUniqueTexts: {[text: string]: number} = {}
  const delChar = ''

  for (const originalText in uniqueTexts) {
    const textCount = uniqueTexts[originalText]!
    let filteredText = originalText
    
    // Delete variable texts
    filteredText = filteredText.replaceAll(atVariableRegex, delChar)
    filteredText = filteredText.replaceAll(percentIVariableRegex, delChar)
    filteredText = filteredText.replaceAll(variableInDoubleCurlyBracketsRegex, delChar)
    filteredText = filteredText.replaceAll(dollarSignVariableRegex, delChar)
    // before tag removal, delete all calc tags and their content
    filteredText = filteredText.replaceAll(calcTagWithContentsRegex, delChar)

    // Delete tags
    const tagTexts = getTags(filteredText, {
      includeAttributes: true,
      includeEndingTags: true,
      includeTagBrackets: true,
    })
    const tagsRegex = new RegExp('(' + tagTexts.join('|') + ')', 'g')
    filteredText = filteredText.replaceAll(tagsRegex, delChar)

    // Check whether it still has any real content left
    const hasWords = wordsRegex.test(filteredText)

    if (!hasWords) continue
    filteredUniqueTexts[originalText] = textCount
  }

  return filteredUniqueTexts
}
