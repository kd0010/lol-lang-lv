import { entryTexts } from '../../constants/entries'
import {
  atVariableRegex,
  variableInDoubleCurlyBracketsRegex,
  percentIVariableRegex,
  dollarSignVariableRegex,
} from '../../constants/regexes'
import { getUniqueTexts } from './getUniqueTexts'

/**
 * Returns all variable-type texts from entries.
 * These can later be used to determine what texts to ignore/delete
 * for translation purposes.
 */
export function getVariableTexts() {
  const atVariableTexts = getUniqueTexts(entryTexts, atVariableRegex)
  const percentIVariableTexts = getUniqueTexts(entryTexts, percentIVariableRegex)
  const variableInDoubleCurlyBracketsTexts = getUniqueTexts(entryTexts, variableInDoubleCurlyBracketsRegex)
  const dollarSignTexts = getUniqueTexts(entryTexts, dollarSignVariableRegex)

  return {
    atVariableTexts,
    percentIVariableTexts,
    variableInDoubleCurlyBracketsTexts,
    dollarSignTexts,
  }
}
