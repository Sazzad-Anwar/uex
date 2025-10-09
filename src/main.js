const heroSection = document.getElementById('hero-section')

const setHeroBackground = () => {
  if (window.innerWidth < 768) {
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
    activeTab: 2,
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

  // Range Slider Component
  Alpine.data('rangeSlider', () => ({
    value: 20000,
    min: 0,
    max: 40000,
    progress: 50,
    tooltipPosition: 0,
    sliderWidth: 0,

    init() {
      this.$watch('value', () => {
        this.updateProgress()
        this.updateTooltipPositionFast()
      })

      // Initial setup
      this.$nextTick(() => {
        this.cacheSliderWidth()
        this.updateProgress()
        this.updateTooltipPositionFast()

        // Update slider width on resize
        window.addEventListener('resize', () => {
          this.cacheSliderWidth()
          this.updateTooltipPositionFast()
        })
      })
    },

    cacheSliderWidth() {
      const slider = this.$refs.slider
      if (slider) {
        this.sliderWidth = slider.offsetWidth
      }
    },

    updateProgress() {
      this.progress = ((this.value - this.min) / (this.max - this.min)) * 100
    },

    updateTooltipPositionFast() {
      // Use current slider width directly if not cached
      if (!this.sliderWidth) {
        const slider = this.$refs.slider
        if (slider) {
          this.sliderWidth = slider.offsetWidth
        } else {
          return
        }
      }

      // Account for the thumb width (approximately 20px) and padding
      const thumbWidth = 20
      const effectiveWidth = this.sliderWidth - thumbWidth
      const progressRatio = (this.value - this.min) / (this.max - this.min)

      // Calculate position with proper offset for thumb center - direct calculation
      this.tooltipPosition = thumbWidth / 2 + effectiveWidth * progressRatio
    },
    updateTooltipPosition() {
      // Legacy method for compatibility - just call the fast version
      this.updateTooltipPositionFast()
    },
  }))

  // Masonry Testimonials Component
  Alpine.data('masonryTestimonials', () => ({
    showAll: false,
    visibleCount: 9,
    testimonials: [
      {
        name: 'Leslie Alexander',
        position: 'CEO & Founder of Apple',
        content:
          'Seas shiver ballast timbers spirits sloop. Spot run bounty fleet the smartly. Rum halter buccaneer scourge prey crimp pin belaying measured. Run chase arrgh ensign down spanker pay.',
        avatar: './public/images/user.svg',
        image: './public/images/testimonial-image-1.svg',
        rating: 5,
        size: 'large',
      },
      {
        name: 'Robert Fox',
        position: 'CEO & Founder of Apple',
        content:
          'Deck clipper jennys chase avast killick. Lugsail reef tan bilge cove boom blossom hempen cog man nipper.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      {
        name: 'Esther Howard',
        position: 'CEO & Founder of Apple',
        content:
          'Tell poop topsail gar jack man ipsum boom. Bounty reef tan smartly six grapple. Just deck avast jack dead salmagundi.',
        avatar: './public/images/user.svg',
        rating: 4,
        size: 'small',
      },
      {
        name: 'Cameron Williamson',
        position: 'CEO & Founder of Apple',
        content:
          'Shiver bow mutiny pirate fluke cog man heave man a. Boat jennys roger lugsail splice crows shrouds pinnace pirate. A bilged chase tea jolly chains. Killick hands scourge grapple black.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      {
        name: 'Dianne Russell',
        position: 'CEO & Founder of Apple',
        content:
          'Lass topmast furl overhaul topsail. Black chains tea across smartly keelhaul nipper. Her fer starboard quarterdeck jack jib lass. Buccaneer.',
        avatar: './public/images/user.svg',
        rating: 4,
        size: 'small',
      },
      {
        name: 'Courtney Henry',
        position: 'CEO & Founder of Apple',
        content:
          'Coffer rat rig privateer scourge no reef nest. Arr bow cog grog weigh six. Topsailant boatswain of fleet sink aye.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'large',
      },
      {
        name: 'Jenny Wilson',
        position: 'CEO & Founder of Apple',
        content:
          'Gravida eget elementum nunc nulla arcu lorem. Sem quis consectetur non quam nibh. Quam cras venenatis amet risus.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      {
        name: 'Wade Warren',
        position: 'Product Manager',
        content:
          'Exceptional service and results. The team went above and beyond to deliver exactly what we needed for our business growth.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'small',
      },
      {
        name: 'Brooklyn Simmons',
        position: 'Marketing Director',
        content:
          'Outstanding experience from start to finish. Professional, reliable, and incredibly talented team. Highly recommended for anyone looking for quality work.',
        avatar: './public/images/user.svg',
        rating: 4,
        size: 'large',
      },
      {
        name: 'Savannah Nguyen',
        position: 'Design Lead',
        content:
          'Creative solutions and attention to detail. They transformed our vision into reality with precision and creativity.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      // Additional testimonials
      {
        name: 'Olivia Brown',
        position: 'Head of Product',
        content:
          'Reliable communication and timely delivery. Their product insights helped us pivot successfully and increase engagement.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'small',
      },
      {
        name: 'Liam Johnson',
        position: 'CTO',
        content:
          'Technical expertise was evident from day one. Clean architecture and thoughtful implementation made maintenance simple.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      {
        name: 'Emma Davis',
        position: 'Operations Manager',
        content:
          'Processes were streamlined and transparent. The team provided clear updates and delivered beyond expectations.',
        avatar: './public/images/user.svg',
        rating: 4,
        size: 'large',
      },
      {
        name: 'Noah Miller',
        position: 'Growth Lead',
        content:
          'We saw measurable improvements in user acquisition after the redesign. Smart choices and solid execution.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      {
        name: 'Ava Martinez',
        position: 'Customer Success',
        content:
          'Users reported an improved experience and fewer support tickets. The launch was smooth and well-supported.',
        avatar: './public/images/user.svg',
        rating: 4,
        size: 'small',
      },
      {
        name: 'Lucas Anderson',
        position: 'Data Analyst',
        content:
          'Insight-driven decisions and thoughtful A/B testing produced strong results. Analytics were clear and actionable.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      {
        name: 'Mia Thompson',
        position: 'Senior Designer',
        content:
          'Design collaboration was excellent. Visuals were polished and aligned with our brand, improving overall conversion.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'large',
      },
      {
        name: 'Ethan Rivera',
        position: 'Engineering Manager',
        content:
          'Code quality and documentation were top-notch. The onboarding process for new features was smooth.',
        avatar: './public/images/user.svg',
        rating: 4,
        size: 'small',
      },
      {
        name: 'Sophia Clark',
        position: 'Strategy Lead',
        content:
          'Thoughtful strategy and measurable KPIs. Their approach kept the project on track and aligned with our goals.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'medium',
      },
      {
        name: 'Benjamin Lee',
        position: 'Founder',
        content:
          'Trusted partner through the entire process. Their commitment and expertise were instrumental to our success.',
        avatar: './public/images/user.svg',
        rating: 5,
        size: 'large',
      },
    ],

    init() {
      // Randomly add the testimonial image to some testimonials (first already has it).
      const MAX_ASSIGN = 5 // cap number of random assignments
      const PROBABILITY = 0.3 // ~30% chance per testimonial
      let assigned = 0
      let imageList = [
        './public/images/testimonial-image-1.svg',
        './public/images/testimonial-image-2.svg',
      ]
      this.testimonials.forEach((t, i) => {
        if (i % 2 === 0 && !t.image && assigned < MAX_ASSIGN) {
          t.image = imageList[assigned % imageList.length]
          assigned++
        }
      })
    },

    get visibleTestimonials() {
      return this.testimonials.slice(0, this.visibleCount)
    },

    toggleShowAll() {
      this.showAll = !this.showAll
    },
  }))
  Alpine.data('menu', () => ({
    isOpen: false,
    toggle() {
      this.isOpen = !this.isOpen
    },
  }))
  Alpine.data('socialLinks', () => ({
    links: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com',
        icon: './public/images/facebook.svg',
      },
      {
        name: 'X',
        url: 'https://www.x.com',
        icon: './public/images/x.svg',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com',
        icon: './public/images/instagram.svg',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com',
        icon: './public/images/linkedin.svg',
      },
      {
        name: 'Thread',
        url: 'https://www.threads.net',
        icon: './public/images/thread.svg',
      },
      {
        name: 'Whatsapp',
        url: 'https://www.whatsapp.com',
        icon: './public/images/whatsapp.svg',
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com',
        icon: './public/images/youtube.svg',
      },
    ],
  }))
})
