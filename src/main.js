/**
 * @fileoverview Main JavaScript file for UEX website functionality
 * @description Initializes Alpine.js stores and components for responsive hero backgrounds,
 * comparison tables, FAQ sections, range sliders, testimonials, and navigation
 */

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
  /**
   * Alpine.js store for managing comparison table data and active tab state
   * @namespace comparison
   * @property {number} activeTab - Currently active tab ID (default: 2)
   * @property {Array<Object>} tabs - Array of tab objects containing comparison data
   * @property {number} tabs[].id - Unique identifier for the tab
   * @property {string} tabs[].title - Display title for the tab
   * @property {Array<Object>} [tabs[].data] - Optional array of comparison data for the tab
   * @property {string} [tabs[].data[].usdYield] - USD yield percentage
   * @property {string} [tabs[].data[].cryptoYield] - Crypto yield percentage
   * @property {string} [tabs[].data[].lockUps] - Lock-up period information
   * @property {boolean} [tabs[].data[].withdrawAnytime] - Whether withdrawal is allowed anytime
   */
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
  })

  /**
   * Alpine.js store for managing daily savings FAQ section
   * @namespace dailySavings
   * @property {Array<Object>} faq - Array of FAQ items with security and feature information
   * @property {string} faq[].title - FAQ item title/question
   * @property {string} faq[].description - FAQ item description/answer
   * @property {string} faq[].image - Path to the FAQ item icon/image
   * @property {boolean} faq[].isOpen - Whether the FAQ item is expanded (default: false, first item true)
   * @method toggle - Toggles the open/closed state of an FAQ item by index
   * @param {number} index - Index of the FAQ item to toggle
   */
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

  /**
   * Alpine.js component for interactive range slider with financial calculations
   * @namespace rangeSlider
   * @property {number} value - Current slider value (default: 20000)
   * @property {number} min - Minimum slider value (default: 0)
   * @property {number} max - Maximum slider value (default: 40000)
   * @property {number} progress - Current progress percentage (0-100)
   * @property {number} tooltipPosition - Tooltip position in pixels
   * @property {number} sliderWidth - Cached slider width in pixels
   * @property {number} apy - Annual percentage yield (default: 0.05)
   * @property {number} days - Number of days for calculation (default: 30)
   * @method init - Initializes the component and sets up watchers and event listeners
   * @method cacheSliderWidth - Caches the slider element width for position calculations
   * @method updateProgress - Updates the progress percentage based on current value
   * @method updateTooltipPositionFast - Calculates and updates tooltip position efficiently
   * @method updateTooltipPosition - Legacy method for tooltip positioning (calls fast version)
   * @method projectedBalance - Calculates projected balance and earnings based on compound interest
   * @returns {Object} Object with balance and earnings properties
   */
  Alpine.data('rangeSlider', () => ({
    value: 20000,
    min: 0,
    max: 40000,
    progress: 50,
    tooltipPosition: 0,
    sliderWidth: 0,
    apy: 0.05,
    days: 30,

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
    projectedBalance() {
      const principal = this.value
      const n = 365 // compounding frequency (daily)
      const t = this.days / 365 // time in years
      const A = principal * Math.pow(1 + this.apy / n, n * t)
      return {
        balance: A,
        earnings: A - principal,
      }
    },
  }))

  /**
   * Alpine.js component for masonry layout testimonials with show more functionality
   * @namespace masonryTestimonials
   * @property {boolean} showAll - Whether to show all testimonials or limited set
   * @property {number} visibleCount - Number of testimonials to show initially (default: 9)
   * @property {Array<Object>} testimonials - Array of testimonial objects
   * @property {string} testimonials[].name - Testimonial author name
   * @property {string} testimonials[].position - Author's job title/position
   * @property {string} testimonials[].content - Testimonial content/review text
   * @property {string} testimonials[].avatar - Path to author's avatar image
   * @property {string} [testimonials[].image] - Optional testimonial background image
   * @property {number} testimonials[].rating - Star rating (1-5)
   * @property {string} testimonials[].size - Testimonial card size ('small', 'medium', 'large')
   * @method init - Initializes component and randomly assigns images to some testimonials
   * @getter visibleTestimonials - Returns array of testimonials to display based on visibleCount
   * @method toggleShowAll - Toggles between showing all testimonials and limited set
   */
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

  /**
   * Alpine.js component for mobile menu toggle functionality
   * @namespace menu
   * @property {boolean} isOpen - Whether the mobile menu is open
   * @method toggle - Toggles the open/closed state of the mobile menu
   */
  Alpine.data('menu', () => ({
    isOpen: false,
    toggle() {
      this.isOpen = !this.isOpen
    },
  }))

  /**
   * Alpine.js component for social media links data
   * @namespace socialLinks
   * @property {Array<Object>} links - Array of social media link objects
   * @property {string} links[].name - Social media platform name
   * @property {string} links[].url - URL to the social media profile
   * @property {string} links[].icon - Path to the social media icon image
   */
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

AOS.init({
  once: true,
  easing: 'ease-in-out',
})
