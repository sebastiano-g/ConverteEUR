import ApexCharts from 'apexcharts'
import { fetchAllRates } from '../query'

export default function lineChart() {
  return {
    chart: null,
    loading: true,

    async init() {
      await this.updateChart()

      // update the chart once one of the following values has been modified
      this.$watch('$store.converter.from', () => this.updateChart())
      this.$watch('$store.converter.to', () => this.updateChart())
      this.$watch('$store.converter.year', () => this.updateChart())
    },

    async updateChart() {
      this.loading = true
      
      const styles = getComputedStyle(document.documentElement)
      const lineColor = styles.getPropertyValue('--chart-line').trim() // get color from styles.css (dark and light theme handling)

      const { from, to, baseYear } = this.$store.converter

      try {

        const { years, rates } = await fetchAllRates(
          from,
          to,
          baseYear
        )

        const options = {
          series: [
            {
              name: `${from} → ${to}`,
              data: rates
            }
          ],
          chart: {
            type: 'line',
            height: '100%',
            toolbar: { show: false }
          },
          dataLabels: { enabled: false },
          colors: [lineColor],
          stroke: {
            lineCap: 'round',
            curve: 'smooth',
            width: 2
          },
          markers: { size: 0 },
          xaxis: {
            categories: years,
            axisTicks: { show: false },
            axisBorder: { show: false },
            labels: {
              style: {
                colors: '#616161',
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: 400
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#616161',
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: 400
              }
            }
          },
          responsive: [
            {
              breakpoint: 640,
              options: {
                xaxis: {
                  labels: { show: false }
                },
                yaxis: {
                  labels: { show: false }
                }
              }
            }
          ],
          grid: {
            show: true,
            borderColor: '#dddddd',
            strokeDashArray: 3,
            xaxis: { lines: { show: true } },
            padding: { top: 5, right: 20 }
          },
          fill: { opacity: 0.8 },
          tooltip: { theme: 'dark' }
        }

        if (!this.chart) {
          this.chart = new ApexCharts(this.$refs.chart, options)
          this.chart.render()
        } else {
          this.chart.updateOptions(options)
        }
      } catch (err) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    destroy() {
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }
    }
  }
}
