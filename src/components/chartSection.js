export default function chartSection() {
  return {
    get title() {
      const { from, to } = this.$store.converter
      return `${from} to ${to} tracker`
    },

    get subtitle() {
      const { from, to } = this.$store.converter
      return `Visualize ${from} to ${to} performance with historical data since 1999`
    }
  }
}
