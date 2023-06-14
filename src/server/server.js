import express from 'express'
import session from 'express-session'
import { createToken } from './csrf/csrf.js'
import fs from 'fs'
import https from 'https'

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

// Session middleware
app.use(express.json())
app.use(
  session({
    resave: false,
    secret: 'Throwaway site secret',
    saveUninitialized: true,
  })
)

// Request middleware
app.use((req, res, next) => {
  console.log(req.method, 'request', req.path)
  next()
})

// Routes
app.post('/login', (req, res, next) => {
  // Start with a fresh session
  req.session.regenerate((error) => {
    if (error) next(error)

    req.session.user = req.body.username
    req.session.save((error) => {
      if (error) next(error)

      res.json({ message: 'logged in' })
    })
  })
})

app.get('/logout', (req, res, next) => {
  req.session.user = null
  req.session.save((error) => {
    if (error) next(error)

    // Starts a new fresh session
    req.session.regenerate((error) => {
      if (error) next(error)

      res.redirect('/')
    })
  })
})

app.get('/csrf', (req, res) => {
  const token = createToken()
  res.json({ token: token })
})

app.post('/save', (req, res) => {
  res.json({ message: 'Saved' })
})

// Secure site pages that need protecting
app.get('/site.html', (req, res) => {
  console.log('Protect this route!')
  if (!req.session.user) {
    res.redirect('/401.html')
  } else {
    res.sendFile(path.join(__dirname, '../../src/client/site.html'))
  }
})

// Default to serving static files (web pages)
app.use(express.static('src/client'))

const httpsOptions = {
  key: fs.readFileSync('src/server/key.pem'),
  cert: fs.readFileSync('src/server/cert.pem'),
}
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
