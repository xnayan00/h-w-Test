const mainImage = document.getElementById('carousel__main-image')
const thumbnails = document.querySelectorAll('.carousel__thumbnail')

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    mainImage.style.opacity = 0

    setTimeout(() => {
      mainImage.src = thumbnail.src
      mainImage.style.opacity = 1
    }, 500)

    thumbnails.forEach((thumb) =>
      thumb.classList.remove('carousel__thumbnail--active')
    )
    thumbnail.classList.add('carousel__thumbnail--active')
  })
})
