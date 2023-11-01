import { entryTexts } from '../../constants/entryTexts'
import { wordsRegex } from '../../constants/regexes'
import { stripEntryText } from '../stripEntryText'

export function getRepeatingPhrases(
  phraseWordAmountCap: number=5,
  minOccurances: number=5,
) {
  const phrases: {[phrase: string]: number} = {}

  const dev_analyzeWordLetters = (word: string) => {
    const safeChars = `&;'-óéüçíşãöğİáúèñ`
    
    for (const letter of word) {
      if (
        !/[A-z]/.test(letter) &&
        !(
          safeChars.includes(letter) ||
          safeChars.includes(letter.toLowerCase())
        )
      ) {
        console.log('---') // TEMP
        console.log('letter', letter) // TEMP
        console.log('word', word) // TEMP
      }
    }
  }
  
  const removeUselessLetters = (word: string) => {
    return word.replaceAll(/[\.,!?:%\(\)“”/\d\+–—…" \*#​{}\[\]�~><	\|•=\r﻿]/g, '')
  }

  for (const text of entryTexts) {
    const onlyWordsText = stripEntryText(text)
    const words = onlyWordsText.split(' ').filter(text => text != '')

    for (let word of words) {
      if (!wordsRegex.test(word)) continue
      word = removeUselessLetters(word)

      // ...
    }
  }

  return phrases
}
