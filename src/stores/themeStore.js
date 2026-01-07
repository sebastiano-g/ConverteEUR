export default function themeStore() {
  return {
    dark: false,

    // itiliaze to preffered color scheme
    init() {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      this.dark = media.matches
      media.addEventListener('change', e => (this.dark = e.matches))
    },

    // toggle "dark" boolean
    toggle() {
      this.dark = !this.dark
    }
  }
}
