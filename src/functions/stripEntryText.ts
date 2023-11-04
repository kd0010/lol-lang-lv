import {
  atVariableRegex,
  calcTagWithContentsRegex,
  dollarSignVariableRegex,
  percentIVariableRegex,
  variableInDoubleCurlyBracketsRegex,
} from '../constants/regexes'
import { getTags } from './tags/getTags'

/**
 * Strips text from all the bullshit that is not translateable:
 * tags, %i's, \@'s, {{vars}} etc.
 */
export function stripEntryText(
  text: string,
): string {
  const delChar = ''
  const _atVariableRegex = new RegExp(atVariableRegex, 'g')
  const _percentIVariableRegex = new RegExp(percentIVariableRegex, 'g')
  const _variableInDoubleCurlyBracketsRegex = new RegExp(variableInDoubleCurlyBracketsRegex, 'g')
  const _dollarSignVariableRegex = new RegExp(dollarSignVariableRegex, 'g')
  const _calcTagWithContentsRegex = new RegExp(calcTagWithContentsRegex, 'g')

  let filteredText = text
    
  // delete variable texts
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

  return filteredText
}
