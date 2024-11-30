const phoneInput = document.getElementById('phone')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const submitButton = document.getElementById('submit-button')
const form = document.getElementById('form')

// Função para validar o telefone
function validatePhone() {
  const phone = phoneInput.value.replace(/\D/g, '')
  return phone.length === 10 || phone.length === 11
}

// Função para validar o e-mail
function validateEmail() {
  const email = emailInput.value.trim()
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}

// Função para validar o formulário
function validateForm() {
  const isPhoneValid = validatePhone()
  const isEmailValid = validateEmail()
  const allFieldsFilled = [...form.elements].every(
    (input) => input.value.trim() !== '' || input.type === 'submit'
  )

  submitButton.disabled = !(isPhoneValid && isEmailValid && allFieldsFilled)
}

// Adiciona o evento de input para validar o formulário enquanto o usuário digita
form.addEventListener('input', (event) => {
  validateForm()
})

// Formatação do telefone enquanto o usuário digita
phoneInput.addEventListener('input', (event) => {
  let input = event.target.value
  const onlyNumbers = input.replace(/\D/g, '')
  const isDeleting = input.length < event.target.dataset.lastValue?.length
  event.target.dataset.lastValue = input

  if (!isDeleting) {
    if (onlyNumbers.length <= 10) {
      input = onlyNumbers.replace(
        /^(\d{2})(\d{0,4})(\d{0,4})/,
        (_, areaCode, firstPart, secondPart) =>
          secondPart
            ? `(${areaCode}) ${firstPart}-${secondPart}`
            : firstPart
            ? `(${areaCode}) ${firstPart}`
            : `(${areaCode}`
      )
    } else {
      input = onlyNumbers.replace(
        /^(\d{2})(\d{5})(\d{0,4})/,
        (_, areaCode, firstPart, secondPart) =>
          secondPart
            ? `(${areaCode}) ${firstPart}-${secondPart}`
            : `(${areaCode}) ${firstPart}`
      )
    }
  }

  event.target.value = input
  validateForm()
})

// Funções de cookie
function setCookie(name, value, days) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`
}

function getCookie(name) {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Lógica para esconder o formulário, mostrar a seção de produto e limpar campos
submitButton.addEventListener('click', (event) => {
  event.preventDefault()

  if (submitButton.disabled) return

  // Armazena o nome no cookie
  setCookie('userName', nameInput.value, 1)

  // Exibe o nome do usuário armazenado no cookie
  const userName = getCookie('userName')
  const greetingParagraph = document.getElementById('greeting')
  if (userName) {
    greetingParagraph.textContent = `Olá ${userName.split(' ')[0]}!`
  } else {
    greetingParagraph.textContent = 'Olá!'
  }

  // Esconde a seção do formulário e mostra a seção de produto
  const formSection = document.getElementById('form-section')
  formSection.style.display = 'none'
  const productSection = document.getElementById('product-section')
  productSection.style.display = 'block'

  // Limpa os campos do formulário
  nameInput.value = ''
  emailInput.value = ''
  phoneInput.value = ''

  // Revalida o formulário
  validateForm()
})
