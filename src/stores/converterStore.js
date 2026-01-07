import { queryRates } from '../services/api'
import icons from '../currencyIcons.json'

export default function converterStore() {
  return {
    baseYear: 1999,
    year: new Date().getFullYear(),
    from: 'USD',
    to: 'EUR',
    fromIcon: icons['USD'],
    toIcon: icons['EUR'],
    fromAmount: 1000,
    toAmount: null,
    rate: null,
    loading: false,
    error: null,

    async fetchExchangeRate() {
      this.loading = true
      this.error = null

      try {
        const data = await queryRates(this.year, this.from, this.to)
        this.rate = data.rates[this.to]
        this.updateToAmount()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    setYear(year) {
      this.year = year
      this.fetchExchangeRate()
    },

    setFrom(code) {
      this.from = code
      this.fromIcon = icons[code]
      this.fetchExchangeRate()
    },

    setTo(code) {
      this.to = code
      this.toIcon = icons[code]
      this.fetchExchangeRate()
    },

    swap() {
      ;[this.from, this.to] = [this.to, this.from]
      this.fromIcon = icons[this.from]
      this.toIcon = icons[this.to]
      this.fetchExchangeRate()
    },

    updateToAmount() {
      if (this.rate != null) {
        this.toAmount = (this.fromAmount * this.rate).toFixed(2)
      }
    },

    updateFromAmount() {
      if (this.rate != null) {
        this.fromAmount = (this.toAmount / this.rate).toFixed(2)
      }
    },

    get convertedAmount() {
      return this.rate ? (1 * this.rate).toFixed(2) : null
    }
  }
}
