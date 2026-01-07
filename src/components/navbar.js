export default function navbar() {
  return {
    logo: 'ConvertEUR',
    menu: [
      { label: 'Converter', href: '#converter' },
      { label: 'Chart', href: '#tracker' },
      { label: 'About', href: '#about' }
    ],

    // light or dark theme
    toggleTheme() {
      this.$store.theme.toggle() 
    },

    // scroll to id
    scrollTo(hash) {
      const target = document.querySelector(hash)
      if (!target) return

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    },

    // scroll to top
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

  }
}
