import * as express from 'express'
import * as cors from 'cors'
import { config } from 'dotenv'
import { Sheets } from '../modules/lol-personal-db/src/objects/Sheets'

config({path: '.env.local'})
const SPREADHSEET_ID = process.env['SPREADSHEET_ID']
const spreadsheetIdErrMsg = 'put SPREADSHEET_ID in .env.local'

const port = 8080
const app = express()
app.use(cors())

app.get('/sheets', async (req, res) => {
  if (SPREADHSEET_ID == null) throw spreadsheetIdErrMsg

  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server started:  http://localhost:${port}\n`)
})
