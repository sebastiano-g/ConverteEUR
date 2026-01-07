import { getInflationRate } from '../services/api'

export default function inflationStore() {
  return {
    comparisonYear: new Date().getFullYear(),
    inflationRate: 0,
    loading: false,
    error: null,

    async fetchInflationRate() {
      this.loading = true
      this.error = null

      try {
        const response = await getInflationRate(this.comparisonYear)
        this.inflationRate = parseFloat(
          response.replace(/['"()]/g, '').trim()
        )
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    setComparisonYear(year) {
      this.comparisonYear = year
      this.fetchInflationRate()
    }
  }
}
