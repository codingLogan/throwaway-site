const form = document.getElementById('myForm')
const fname = document.getElementById('fname')
const ftext = document.getElementById('ftext')

form.addEventListener('submit', (event) => {
  // Don't submit, let JS do the work.
  event.preventDefault()

  // Output form values just because
  console.log('form fields', fname.value, ftext.value)
})
