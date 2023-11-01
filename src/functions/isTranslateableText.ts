import { wordsRegex } from '../constants/regexes'
import { stripEntryText } from './stripEntryText'

/**
 * First, strips the text from all tags, variables etc.,
 * then checks whether has any words.
 */
export function isTranslateableText(
  text: string,
) {
  return wordsRegex.test(stripEntryText(text))
}
