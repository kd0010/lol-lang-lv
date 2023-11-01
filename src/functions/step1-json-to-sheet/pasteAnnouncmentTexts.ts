import { Sheets } from '../../modules/lol-personal-db/src/objects/Sheets'
import { LvLangSheetNames, LvLangSpreadsheetId } from '../../modules/lol-personal-db/src/constants/LvLangSpreadsheet'
import { getAnnouncementTexts } from '../the-real-guns/getAnnouncementTexts'
import { isTranslateableText } from '../isTranslateableText'

export async function pasteAnnouncmentTexts() {
  const sheets = new Sheets(LvLangSpreadsheetId)

  const values: string[][] = []
  const texts = getAnnouncementTexts()

  for (const entryId in texts) {
    const text = texts[entryId]!
    if (!isTranslateableText(text)) continue
    values.push([entryId, text, ''])
  }

  await sheets.jsonToSheet(
    LvLangSheetNames['Diktora tulkojumi'],
    texts,
    {
      skipHeadersRows: 1,
    },
  )
}
