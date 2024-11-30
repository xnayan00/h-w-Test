const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightbox-image')

const images = [
  './public/images/product01.webp',
  './public/images/product02.webp',
  './public/images/product03.webp',
  './public/images/product04.webp',
  './public/images/product05.webp',
]

// Abre o lightbox com a imagem correspondente
function openLightbox(index) {
  lightbox.classList.add('lightbox--active')
  lightboxImage.src = images[index]
}

// Fecha o lightbox
function closeLightbox() {
  lightbox.classList.remove('lightbox--active')
}
