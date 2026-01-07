export default function createCurrencyDropdown() {
  return {
    open: false,
    target: null,
    style: {},
    search: '',

    get currencies() {
      return Alpine.store('currencies').data || {}
    },

    get filteredCurrencies() {
      if (!this.search) return this.currencies

      const q = this.search.toLowerCase()
      return Object.fromEntries(
        Object.entries(this.currencies).filter(([code, obj]) =>
          code.toLowerCase().includes(q) ||
          obj.name.toLowerCase().includes(q)
        )
      )
    },

    openFor(target, trigger) {
      this.target = target
      this.open = true

      this.$nextTick?.(() => {})

      const rect = trigger.getBoundingClientRect()
      this.style = {
        top: `${trigger.offsetTop + trigger.offsetHeight + 8}px`,
        left: '0px',
        width: 'calc(100% - 1.5rem)',
      }
    },

    select(code) {
        const converter = Alpine.store('converter')

        const isFrom = this.target === 'from'
        const currentFrom = converter.from
        const currentTo = converter.to
        const otherCode = isFrom ? currentTo : currentFrom

        // at least one and at maximum one value can be equal to 'EUR':
        // otherwise, swap values in advance
        const shouldSwap =
            (code !== 'EUR' && otherCode !== 'EUR') ||
            (code === 'EUR' && otherCode === 'EUR')

        if (shouldSwap) {
            converter.swap()
        }

        if (isFrom) {
            converter.setFrom(code)
        } else {
            converter.setTo(code)
        }

        this.close()
    },

    close() {
      this.open = false
      this.search = ''
    },
  }
}
