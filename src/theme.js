export default function theme() {
  return {
    dark: true,

    init() {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      this.dark = mq.matches
      mq.addEventListener('change', e => {
        this.dark = e.matches
      })
    }
  }
}
