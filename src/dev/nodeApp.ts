import * as express from 'express'
import * as cors from 'cors'
import { Sheets } from '../modules/lol-personal-db/src/objects/Sheets'
import { Item, Champion } from 'lol-constants/assets'
import { LvLangSheetNames, LvLangSpreadsheetId } from '../modules/lol-personal-db/src/constants/LvLangSpreadsheet'
import { getChampionJson } from '../helpers/getChampionJson'
import { getBasicChampTexts } from '../functions/getBasicChampTexts'
import { pasteRepeatingTexts } from '../functions/step1-json-to-sheet/pasteRepeatingTexts'
import { repeatingTexts1 } from './repeatingTexts1'
import { pasteItemTexts } from '../functions/step1-json-to-sheet/pasteItemTexts'
import { pasteChampTexts } from '../functions/step1-json-to-sheet/pasteChampTexts'
import { pasteAnnouncmentTexts } from '../functions/step1-json-to-sheet/pasteAnnouncmentTexts'
import { getRepeatingPhrases } from '../functions/the-real-guns/getRepeatingPhrases'

const port = 8080 
const app = express()
app.use(cors())

app.get('/sheets', async (req, res) => {
  // await pasteRepeatingTexts(repeatingTexts1)
  // await pasteItemTexts()
  // await pasteChampTexts()
  // await pasteAnnouncmentTexts()

  res.sendStatus(200)
})

app.get('/temp', async (req, res) => {
  const repeatingPhrases = getRepeatingPhrases()
  console.log('repeatingPhrases', repeatingPhrases) // TEMP

  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server started:  http://localhost:${port}\n`)
})
