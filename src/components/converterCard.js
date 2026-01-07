import createCurrencyDropdown from './currencyDropdown'

export default () => ({
  show: false,
  dropdown: null,

  init() {
    this.dropdown = createCurrencyDropdown()
    this.dropdown.$nextTick = this.$nextTick

    setTimeout(() => {
      this.show = true
    }, 150)
  },
  
  yearDropdown() {
    const currentYear = new Date().getFullYear()
    const baseYear = Alpine.store('converter').baseYear

    return {
      open: false,
      year: currentYear,

      years: Array.from(
        { length: currentYear - baseYear + 1 },
        (_, i) => currentYear - i
      ),

      toggle() {
        this.open = !this.open
      },

      close() {
        this.open = false
      },

      select(y) {
        this.year = y
        this.close()

        Alpine.store('converter').setYear(y)
        Alpine.store('inflation').setComparisonYear(y)
      }
    }
  }


})
