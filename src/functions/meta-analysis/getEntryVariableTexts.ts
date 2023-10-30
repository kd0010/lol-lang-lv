import { entryTexts } from '../../constants/entryTexts'
import {
  atVariableRegex,
  variableInDoubleCurlyBracketsRegex,
  percentIVariableRegex,
  dollarSignVariableRegex,
} from '../../constants/regexes'
import { searchTexts } from './searchTexts'

/**
 * Returns all variable-type texts from entries.
 * These can later be used to determine what texts to ignore/delete
 * for translation purposes.
 */
export function getEntryVariableTexts() {
  const atVariableTexts = searchTexts(entryTexts, atVariableRegex)
  const percentIVariableTexts = searchTexts(entryTexts, percentIVariableRegex)
  const variableInDoubleCurlyBracketsTexts = searchTexts(entryTexts, variableInDoubleCurlyBracketsRegex)
  const dollarSignTexts = searchTexts(entryTexts, dollarSignVariableRegex)

  return {
    atVariableTexts,
    percentIVariableTexts,
    variableInDoubleCurlyBracketsTexts,
    dollarSignTexts,
  }
}
