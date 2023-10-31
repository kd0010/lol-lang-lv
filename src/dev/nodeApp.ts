import * as express from 'express'
import * as cors from 'cors'
import { Sheets } from '../modules/lol-personal-db/src/objects/Sheets'
import { Item, Champion } from 'lol-constants/assets'
import { LvLangSheetNames, LvLangSpreadsheetId } from '../modules/lol-personal-db/src/constants/LvLangSpreadsheet'
import { getChampionJson } from '../helpers/getChampionJson'
import { getBasicChampTexts } from '../functions/getBasicChampTexts'
import { basicChampTextsToSheetValues } from '../functions/basicChampTextsToSheetValues'

// TEMP
// config({path: '.env.local'})
// const SPREADHSEET_ID = process.env['SPREADSHEET_ID']
// const spreadsheetIdErrMsg = 'put SPREADSHEET_ID in .env.local'

const port = 8080
const app = express()
app.use(cors())

app.get('/sheets', async (req, res) => {
  const sheets = new Sheets(LvLangSpreadsheetId)
  

  const basic = await getBasicChampTexts('Pyke')
  // console.log('basic', basic) // TEMP

  const values = basicChampTextsToSheetValues(basic)
  console.log('values', values) // TEMP

  await sheets.jsonArrayToSheet('Varoņu tulkojumi', values, {
    skipHeadersRows: 1,
  })

  // const schema = {
  //   'title_small': 'Title Smal',
  //   'title_tiel_eaK<Odpaw': 'that\'s pretty fucked up',
  //   'third_columun': 'pffffffffffff',
  //   'fourht': 'Fourth',
  //   'fift': 'Fifth',
  // }

  // await sheets.jsonArrayToSheet('asdfgh', exampleData, {
  //   jsonPropertiesToColumnTitles: schema,
  // })

  // const jsonArr = await sheets.sheetToJsonArray('asdfgh', {
  //   jsonPropertiesToColumnTitles: schema,
  // })
  // console.log('jsonArr', jsonArr) // TEMP

  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server started:  http://localhost:${port}\n`)
})
