import { Item } from 'lol-constants/assets'
import { Sheets } from '../../modules/lol-personal-db/src/objects/Sheets'
import { LvLangSheetNames, LvLangSpreadsheetId } from '../../modules/lol-personal-db/src/constants/LvLangSpreadsheet'
import { BorderStyles } from '../../modules/lol-personal-db/src/constants/BorderStyles'

export async function pasteItemTexts(
  existingTexts?: unknown,
) {
  const sheets = new Sheets(LvLangSpreadsheetId)

  const values: string[][] = []

  const bordersRequests: any[] = []
  const sheet = await sheets.getSheet(LvLangSheetNames['Mantu tulkojumi'])
  const sheetId = sheet?.properties?.sheetId
  let borderStartRowIndex = 1
  let borderEndRowIndex = 3

  let itemKey: keyof typeof Item.data
  for (itemKey in Item.data) {
    const item = Item.data[itemKey]
    const desc = item.description
    const name = item.name
    if (name) values.push([name, ''])
    if (desc) values.push([desc, ''])

    // borders stuff
    bordersRequests.push({
      updateBorders: {
        range: {
          sheetId,
          startRowIndex: borderStartRowIndex,
          endRowIndex: borderEndRowIndex,
          startColumnIndex: 0,
          endColumnIndex: 2,
        },
        bottom: {
          style: BorderStyles['SOLID'],
        },
      },
    })

    if (name) borderStartRowIndex += 1
    if (desc) borderStartRowIndex += 1
    if (name) borderEndRowIndex += 1
    if (desc) borderEndRowIndex += 1
  }

  await sheets.jsonArrayToSheet(
    LvLangSheetNames['Mantu tulkojumi'],
    values,
    {
      skipHeadersRows: 1,
    },
  )

  await sheets.sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheets.spreadsheetId,
    requestBody: {
      requests: bordersRequests,
    },
  })
}
