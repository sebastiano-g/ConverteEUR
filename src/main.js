import Alpine from 'alpinejs'
window.Alpine = Alpine

// import stores from ./stores
import themeStore from './stores/themeStore'
import currenciesStore from './stores/currenciesStore'
import converterStore from './stores/converterStore'
import inflationStore from './stores/inflationStore'

// import components from ./components
import navbar from './components/navbar'
import currencyArray from './components/currencyArray'
import currencyDropdown from './components/currencyDropdown'
import converterCard from './components/converterCard'
import chartSection from './components/chartSection'
import lineChart from './components/chart'
import aboutCards from './components/aboutCards'


// register stores and components
Alpine.store('theme', themeStore())
Alpine.store('currencies', currenciesStore())
Alpine.store('converter', converterStore())
Alpine.store('inflation', inflationStore())
Alpine.store('theme').init()
Alpine.data('navbar', navbar)
Alpine.data('getCurrencyArray', currencyArray)
Alpine.data('currencyDropdown', currencyDropdown)
Alpine.data('converterCard', converterCard)
Alpine.data('chartSection', chartSection)
Alpine.data('lineChart', lineChart)
Alpine.data('aboutCards', aboutCards)

// start Alpine
Alpine.start()

// initial fetch
Alpine.store('currencies').fetch()
Alpine.store('converter').fetchExchangeRate()
Alpine.store('inflation').fetchInflationRate()
