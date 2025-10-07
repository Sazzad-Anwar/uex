console.log('Hello, World!')
const heroSection = document.getElementById('hero-section')

const setHeroBackground = () => {
  if (window.innerWidth < 768) {
    console.log(heroSection)
    heroSection.style.backgroundImage =
      "url('./public/images/hero-bg-mobile-new.svg')"
    heroSection.style.backgroundSize = 'contain'
  } else {
    heroSection.style.backgroundImage = "url('./public/images/hero-bg.svg')"
  }
}

window.addEventListener('load', () => {
  setHeroBackground()
})

window.addEventListener('resize', () => {
  setHeroBackground()
})
