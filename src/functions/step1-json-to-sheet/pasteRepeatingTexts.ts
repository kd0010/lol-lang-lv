import { Sheets } from '../../modules/lol-personal-db/src/objects/Sheets'
import { LvLangSheetNames, LvLangSpreadsheetId } from '../../modules/lol-personal-db/src/constants/LvLangSpreadsheet'
import { AnalyzedText, AnalyzedTexts, RepeatingPhrases } from '../../types/interfaces'
import { isTranslateableText } from '../isTranslateableText'

export async function pasteRepeatingTexts(
  repeatingTexts: AnalyzedTexts,
  repeatingPhrases: RepeatingPhrases={},
) {
  const sheets = new Sheets(LvLangSpreadsheetId)

  const repeatingPhrasesArr = Object.entries(repeatingPhrases).map(([phrase, occurances]) => ({
    text: phrase,
    occurances,
    occursInIds: [],
    example: '—',
  } satisfies AnalyzedText))

  const repeatingTextsArr = Object.values(repeatingTexts).sort(({occurances: a}, {occurances: b}) => b - a)

  const repeatingTextsAndPhrasesDsc = [
    ...repeatingPhrasesArr,
    ...repeatingTextsArr,
  ].sort(({occurances: a}, {occurances: b}) => b - a)

  const values: (string | number)[][] = []
  for (const analyzedText of repeatingTextsAndPhrasesDsc) {
    if (!isTranslateableText(analyzedText.text)) continue

    values.push([
      analyzedText.occurances,
      analyzedText.example,
      analyzedText.text,
      '',
    ])
  }

  await sheets.jsonArrayToSheet(
    LvLangSheetNames['Atkārtojošo tekstu tulkojumi'],
    values,
    {
      skipHeadersRows: 1,
    },
  )
}
