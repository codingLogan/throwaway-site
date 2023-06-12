const form = document.getElementById('myForm')
const fname = document.getElementById('username')
const ftext = document.getElementById('password')
let csrfToken = null

form.addEventListener('submit', (event) => {
  // Don't submit, let JS do the work.
  event.preventDefault()

  // Output form values just because
  console.log('form fields', username.value, password.value)

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF': csrfToken,
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
})
