import { entries } from '../../constants/entries'
import { htmlCharacterEntityRegex, wordsRegex } from '../../constants/regexes'
import { stripEntryText } from '../stripEntryText'
import { writeFileSync } from 'fs'

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
  
  const removeUselessLetters = (text: string) => {
    return text.replaceAll(/[\.,!?:%\(\)“”/\d\+–—…" \*#​{}\[\]�~><	\|•=\r﻿″]/g, '')
  }

  let modifiedEntryTexts: string[] = []
  // let t_ = 500 // TEMP
  for (const entryId in entries) {
    let text = entries[entryId]!
    if (entryId.includes('generatedtip')) continue // TEMP?

    text = stripEntryText(text)
    text = removeUselessLetters(text)
    text = text.toLowerCase()
    text = text.replaceAll(new RegExp(htmlCharacterEntityRegex, 'g'), '')
    let words = text.split(' ').filter(word => word != '' && wordsRegex.test(word))
    let newText = words.join(' ')
    if (newText != '') modifiedEntryTexts.push(newText)

    // if (t_-- == 0) break // TEMP
  }
  modifiedEntryTexts = [...new Set(modifiedEntryTexts)]

  const isSamePhrase = (
    phrase1Arr: string[],
    phrase2Arr: string[],
  ) => {
    for (let i = 0; i < phrase1Arr.length; i++) {
      if (phrase1Arr[i] != phrase2Arr[i]) return false
    }
    return true
  }

  let loadingCount = 0
  for (const modifiedText of modifiedEntryTexts) {
    const words = modifiedText.split(' ')

    console.log('modifiedText', modifiedText) // TEMP
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
          const modifiedTextWords = modifiedText.split(' ')
          // TEMP
          // if (isSamePhrase(currentPhraseArr, modifiedTextWords)) currentPhraseOccurances++
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

  // TEMP SECTION BEGIN
  writeFileSync('filteredPhrases.json', JSON.stringify(filteredPhrases))
  // TEMP SECTION END

  return filteredPhrases
}
