import express from 'express'
import { createToken } from './csrf/csrf.js'

const app = express()
const port = 3000

// Routes
app.get('/csrf', (req, res) => {
  const token = createToken()
  res.json({ token: token })
})

app.post('/save', (req, res) => {
  res.json({ message: 'Saved' })
})

// Default to serving static files
app.use(express.static('src/client'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
