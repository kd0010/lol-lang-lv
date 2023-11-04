import { entries } from '../../constants/entries'
import { htmlCharacterEntityRegex, wordsRegex } from '../../constants/regexes'
import { stripEntryText } from '../stripEntryText'
import { writeFileSync } from 'fs'

/**
 * !! WARNING — espensive operation; execution takes hours.
 */
export function getRepeatingPhrases({
  phraseWordAmountCap=5,
  minOccurances=5,
  includeGeneratedTypeTexts=false,
}: GetRepeatingPhrasesOptions={}) {
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
        console.log('---')
        console.log('letter', letter)
        console.log('word', word)
      }
    }
  }
  
  const removeUselessLetters = (text: string) => {
    return text.replaceAll(/[\.,!?:%\(\)“”/\d\+–—…" \*#​{}\[\]�~><	\|•=\r﻿″]/g, '')
  }

  let modifiedEntryTexts: string[] = []
  for (const entryId in entries) {
    let text = entries[entryId]!
    if (!includeGeneratedTypeTexts && entryId.includes('generatedtip')) continue

    text = stripEntryText(text)
    text = removeUselessLetters(text)
    text = text.toLowerCase()
    text = text.replaceAll(new RegExp(htmlCharacterEntityRegex, 'g'), '')
    let words = text.split(' ').filter(word => word != '' && wordsRegex.test(word))
    let newText = words.join(' ')
    if (newText != '') modifiedEntryTexts.push(newText)
  }
  modifiedEntryTexts = [...new Set(modifiedEntryTexts)]

  let loadingCount = 0
  for (const modifiedText of modifiedEntryTexts) {
    const words = modifiedText.split(' ')

    if (loadingCount == 0 || loadingCount % 1000 == 0) console.log(`${loadingCount++} / ${modifiedEntryTexts.length}`)

    for (
      let baseWordIdx = 0;
      baseWordIdx < words.length;
      baseWordIdx++
    ) {
      let currentPhrase = ''
      let currentPhraseArr: string[] = []
      let currentWordCount = 0

      for (
        let nextWordIndex = baseWordIdx;
        nextWordIndex < words.length;
        nextWordIndex++
      ) {
        if (++currentWordCount > phraseWordAmountCap) break

        const word = words[nextWordIndex]!
        if (currentPhrase != '') currentPhrase += ' '
        currentPhrase += word
        currentPhraseArr.push(word)

        if (phrases[currentPhrase] != null) continue // small (huge) optimization

        // search the wide fields of entry texts for a matching phrase
        let currentPhraseOccurances = 0
        for (const modifiedText of modifiedEntryTexts) {
          if (modifiedText.includes(currentPhrase)) currentPhraseOccurances++
        }
        phrases[currentPhrase] = currentPhraseOccurances
      }
    }
  }

  const filteredPhrases: typeof phrases = {}
  for (const phrase in phrases) {
    const phraseCount = phrases[phrase]!
    if (phraseCount < minOccurances) continue
    filteredPhrases[phrase] = phraseCount
  }

  writeFileSync('repeatingPhrases.json', JSON.stringify(filteredPhrases))

  return filteredPhrases
}

export interface GetRepeatingPhrasesOptions {
  phraseWordAmountCap?: number
  minOccurances?: number
  includeGeneratedTypeTexts?: boolean
}
