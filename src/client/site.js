const form = document.getElementById('myForm')
const fname = document.getElementById('fname')
const ftext = document.getElementById('ftext')
let csrfToken = null

form.addEventListener('submit', (event) => {
  // Don't submit, let JS do the work.
  event.preventDefault()

  // Output form values just because
  console.log('form fields', fname.value, ftext.value)

  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF': csrfToken,
    },
    body: JSON.stringify({ fname: fname.value, ftext: ftext.value }),
  })
})

function getCSRFToken() {
  fetch('/csrf')
    .then((resp) => resp.json())
    .then((data) => {
      console.log({ data })
      csrfToken = data.token
    })
}

window.addEventListener('load', (event) => {
  console.log('loaded')
  getCSRFToken()
})
