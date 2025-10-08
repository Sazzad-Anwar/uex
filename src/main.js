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

document.addEventListener('alpine:init', () => {
  Alpine.store('comparison', {
    activeTab: 1,
    tabs: [
      {
        id: 1,
        title: 'UEX Flexible',
        data: [
          {
            usdYield: '4.5%',
            cryptoYield: '5.5%',
            lockUps: 'None',
            withdrawAnytime: true,
          },
        ],
      },
      {
        id: 2,
        title: 'UEX Premium',
      },
      {
        id: 3,
        title: 'Traditional Bank',
      },
    ],
  }),
    Alpine.store('dailySavings', {
      faq: [
        {
          title: 'U.S. MSB-registered.',
          description:
            'Grog seven yer locker overhaul crack. Tales black hang me coast gar. Parrel splice hearties or nipperkin bucko. Tea gabion prey blow seven dead. Lubber.',
          image: './public/images/verified.svg',
          isOpen: true,
        },
        {
          title:
            'Institutional-grade custody: multi-sig cold storage, encrypted transactions.',
          description:
            'Grog seven yer locker overhaul crack. Tales black hang me coast gar. Parrel splice hearties or nipperkin bucko. Tea gabion prey blow seven dead. Lubber.',
          image: './public/images/lock.svg',
          isOpen: false,
        },
        {
          title:
            'Yields powered by collateralized loans and hedging — not risky DeFi farms',
          description:
            'Grog seven yer locker overhaul crack. Tales black hang me coast gar. Parrel splice hearties or nipperkin bucko. Tea gabion prey blow seven dead. Lubber.',
          image: './public/images/hand.svg',
          isOpen: false,
        },
        {
          title: 'Continuous audits + segregated funds',
          image: './public/images/search.svg',
          description:
            'Grog seven yer locker overhaul crack. Tales black hang me coast gar. Parrel splice hearties or nipperkin bucko. Tea gabion prey blow seven dead. Lubber.',
          isOpen: false,
        },
      ],
      toggle(index) {
        this.faq[index].isOpen = !this.faq[index].isOpen
      },
    })
})
