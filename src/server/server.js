import express from 'express'
import session from 'express-session'
import { createToken } from './csrf/csrf.js'

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
  console.log('Body', req.body)
  console.log('Pre-Request Session', req.session)
  next()
})

// Routes
app.post('/login', (req, res) => {
  req.session.user = req.body.username
  req.session.save((error) => {
    if (error) {
      res.status(500)
      res.json({ error: 'Server error' })
    }

    res.json({})
  })
})

app.post('/logout', (req, res) => {
  req.session.user = null
  req.session.save((error) => {
    if (error) next(error)

    res.redirect('/error.html')
  })
})

app.get('/csrf', (req, res) => {
  const token = createToken()
  res.json({ token: token })
})

app.post('/save', (req, res) => {
  res.json({ message: 'Saved' })
})

// Default to serving static files (web pages)
app.use(express.static('src/client'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
