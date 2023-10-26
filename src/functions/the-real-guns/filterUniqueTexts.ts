import {
  atVariableRegex,
  calcTagWithContentsRegex,
  dollarSignVariableRegex,
  percentIVariableRegex,
  variableInDoubleCurlyBracketsRegex,
  wordsRegex,
} from '../../constants/regexes'
import { getTags } from '../tags/getTags'

export function filterUniqueTexts<T>(
  uniqueTexts: {[text: string]: T},
): [{[text: string]: T}, {[text: string]: T}] {
  const cleanUniqueTexts: {[text: string]: T} = {}
  const dirtyUniqueTexts: {[text: string]: T} = {}
  const delChar = ''
  const _atVariableRegex = new RegExp(atVariableRegex, 'g')
  const _percentIVariableRegex = new RegExp(percentIVariableRegex, 'g')
  const _variableInDoubleCurlyBracketsRegex = new RegExp(variableInDoubleCurlyBracketsRegex, 'g')
  const _dollarSignVariableRegex = new RegExp(dollarSignVariableRegex, 'g')
  const _calcTagWithContentsRegex = new RegExp(calcTagWithContentsRegex, 'g')

  for (const uniqueText in uniqueTexts) {
    const value = uniqueTexts[uniqueText]!
    let filteredText = uniqueText
    
    // Delete variable texts
    filteredText = filteredText.replaceAll(_atVariableRegex, delChar)
    filteredText = filteredText.replaceAll(_percentIVariableRegex, delChar)
    filteredText = filteredText.replaceAll(_variableInDoubleCurlyBracketsRegex, delChar)
    filteredText = filteredText.replaceAll(_dollarSignVariableRegex, delChar)
    // before tag removal, delete all calc tags and their content
    filteredText = filteredText.replaceAll(_calcTagWithContentsRegex, delChar)

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

    if (hasWords) cleanUniqueTexts[uniqueText] = value
    else dirtyUniqueTexts[uniqueText] = value
  }

  return [cleanUniqueTexts, dirtyUniqueTexts]
}
