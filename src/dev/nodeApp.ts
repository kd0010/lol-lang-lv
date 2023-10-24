import * as express from 'express'
import * as cors from 'cors'

const port = 8080
const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  const out: any[] = [
  ]
  res.send(out)
})

app.listen(port, () => {
  console.log(`Server started:  http://localhost:${port}\n`)
})
