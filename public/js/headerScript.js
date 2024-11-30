const header = document.getElementById('header')
const logo = document.querySelector('.header__logo')
const productSection = document.getElementById('product-section')
const formSection = document.getElementById('form-section')

logo.addEventListener('click', () => {
  productSection.style.display = 'none'
  formSection.style.display = 'block'
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled')
  } else {
    header.classList.remove('header--scrolled')
  }
})
