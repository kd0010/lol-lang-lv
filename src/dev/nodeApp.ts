import * as express from 'express'
import * as cors from 'cors'
import { getCombinedRepeatingTexts } from '../functions/getCombinedRepeatingTexts'
import { pasteRepeatingTexts } from '../functions/step1-json-to-sheet/pasteRepeatingTexts'
import { pasteItemTexts } from '../functions/step1-json-to-sheet/pasteItemTexts'

const port = 8080 
const app = express()
app.use(cors())

app.get('/sheets', async (req, res) => {
  // await pasteRepeatingTexts(getCombinedRepeatingTexts({useDevCachedObjects: true}))
  // await pasteItemTexts()
  // await pasteChampTexts()
  // await pasteAnnouncmentTexts()

  res.sendStatus(200)
})

app.get('/temp', async (req, res) => {
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server started:  http://localhost:${port}\n`)
})
