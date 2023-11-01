import { ChampionNames, getChampionIdByName } from 'lol-constants'
import { getBasicChampTexts } from '../getBasicChampTexts'
import { Sheets } from '../../modules/lol-personal-db/src/objects/Sheets'
import { LvLangSheetNames, LvLangSpreadsheetId } from '../../modules/lol-personal-db/src/constants/LvLangSpreadsheet'
import { BorderStyles } from '../../modules/lol-personal-db/src/constants/BorderStyles'

export async function pasteChampTexts() {
  const sheets = new Sheets(LvLangSpreadsheetId)

  const values: string[][] = []

  const borderRequests: any[] = []
  const mergeRequests: any[] = []
  const sheet = await sheets.getSheet(LvLangSheetNames['Varoņu tulkojumi'])
  const sheetId = sheet?.properties?.sheetId
  let borderStartRowIndex = 1
  let borderEndRowIndex = 1
  let previousBorderEndRowIndex = borderEndRowIndex
  let mergeStartRowIndex = 1
  let mergeEndRowIndex = 1

  const addMergeRequest = (
    rowAmount: number,
  ) => {
    mergeEndRowIndex += rowAmount
    mergeRequests.push({
      mergeCells: {
        mergeType: 'MERGE_ALL',
        range: {
          sheetId: sheetId,
          startRowIndex: mergeStartRowIndex,
          endRowIndex: mergeEndRowIndex,
          startColumnIndex: 0,
          endColumnIndex: 1,
        },
      },
    })
    mergeStartRowIndex += rowAmount
  }

  const champNamesAsc = Object.values(ChampionNames).sort((a, b) => a.localeCompare(b))

  for (const champName of champNamesAsc) {
    const champId = getChampionIdByName(champName)
    const basicTexts = await getBasicChampTexts(champId)

    values.push(['Vārds', basicTexts.name, ''])
    values.push(['', basicTexts.title, ''])
    borderEndRowIndex += 2
    addMergeRequest(2)
    values.push(['P', basicTexts.p.name, ''])
    values.push(['', basicTexts.p.desc, ''])
    borderEndRowIndex += 2
    addMergeRequest(2)
    values.push(['Q', basicTexts.q.name, ''])
    values.push(['', basicTexts.q.desc, ''])
    borderEndRowIndex += 2
    addMergeRequest(2)
    values.push(['W', basicTexts.w.name, ''])
    values.push(['', basicTexts.w.desc, ''])
    borderEndRowIndex += 2
    addMergeRequest(2)
    values.push(['E', basicTexts.e.name, ''])
    values.push(['', basicTexts.e.desc, ''])
    borderEndRowIndex += 2
    addMergeRequest(2)
    values.push(['R', basicTexts.r.name, ''])
    values.push(['', basicTexts.r.desc, ''])
    borderEndRowIndex += 2
    addMergeRequest(2)
    basicTexts.skins.forEach((skinName, i) => values.push([i == 0 ? 'Tērpi' : '', skinName, '']))
    borderEndRowIndex += basicTexts.skins.length
    addMergeRequest(basicTexts.skins.length)

    // borders stuff
    borderRequests.push({
      updateBorders: {
        range: {
          sheetId,
          startRowIndex: borderStartRowIndex,
          endRowIndex: borderEndRowIndex,
          startColumnIndex: 0,
          endColumnIndex: 3,
        },
        bottom: {
          style: BorderStyles['SOLID'],
        },
      },
    })
    borderStartRowIndex += borderEndRowIndex - previousBorderEndRowIndex
    previousBorderEndRowIndex = borderEndRowIndex
  }

  await sheets.jsonArrayToSheet(
    LvLangSheetNames['Varoņu tulkojumi'],
    values,
    {
      skipHeadersRows: 1,
    },
  )

  await sheets.sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheets.spreadsheetId,
    requestBody: {
      requests: [
        ...borderRequests,
        ...mergeRequests,
      ],
    },
  })
}
