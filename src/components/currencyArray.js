import { getCurrencies } from '../services/api'
import icons from '../currencyIcons.json'

export default function currencyArray() {
  return {
    currencyArray: null,
    loading: false,
    error: null,
    search: '',

    async fetchCurrencies() {
      this.loading = true
      this.error = null

      try {
        const currencies = await getCurrencies()
        this.currencyArray = Object.fromEntries(
          Object.entries(currencies).map(([code, name]) => [
            code,
            { name, icon: icons[code] || '' }
          ])
        )
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    get filteredCurrencies() {
      if (!this.currencyArray) return {}
      if (!this.search.trim()) return this.currencyArray

      const term = this.search.toLowerCase()
      return Object.fromEntries(
        Object.entries(this.currencyArray).filter(
          ([code, obj]) =>
            code.toLowerCase().includes(term) ||
            obj.name.toLowerCase().includes(term)
        )
      )
    }
  }
}
