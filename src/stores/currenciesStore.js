import { getCurrencies } from '../services/api'
import icons from '../currencyIcons.json'

export default function currenciesStore() {
  return {
    data: null,
    loading: false,
    error: null,

    async fetch() {
      if (this.data) return

      this.loading = true
      this.error = null

      try {
        const currencies = await getCurrencies()
        this.data = Object.fromEntries(
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
    }
  }
}
