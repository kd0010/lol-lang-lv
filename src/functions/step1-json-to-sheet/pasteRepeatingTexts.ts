import { Sheets } from '../../modules/lol-personal-db/src/objects/Sheets'
import { LvLangSheetNames, LvLangSpreadsheetId } from '../../modules/lol-personal-db/src/constants/LvLangSpreadsheet'
import { AnalyzedTexts } from '../../types/types'
import { isTranslateableText } from '../isTranslateableText'

export async function pasteRepeatingTexts(
  repeatingTexts: AnalyzedTexts,
) {
  const sheets = new Sheets(LvLangSpreadsheetId)

  const repeatingTextsDesc = Object.values(repeatingTexts).sort(({occurances: a}, {occurances: b}) => b - a)

  const values: (string | number)[][] = []
  for (const analyzedText of repeatingTextsDesc) {
    if (!isTranslateableText(analyzedText.text)) continue

    values.push([
      analyzedText.occurances,
      analyzedText.example,
      analyzedText.text,
      '',
      JSON.stringify(analyzedText.occursInIds),
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
