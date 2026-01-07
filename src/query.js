// get exhange rates (one per query)
export async function queryRates(date,base,symbols) {
  const apiUrl = "https://openexchangerates.org/api/historical/"
  const appId = import.meta.env.VITE_OPENEXCHANGE_APP_ID
  const formattedDate = `${date}-01-01`
  const queryUrl = `${apiUrl}${formattedDate}.json?app_id=${appId}&base=${base}&symbols=${symbols}`

  const response = await fetch(queryUrl)

  if (!response.ok) {
    throw new Error("API Error")
  }
  return response.json()
}

// get rates for a time span (series of api queries)
export async function fetchAllRates(from = 'USD', to = 'EUR', startYear = 1999) {
  const currentYear = new Date().getFullYear();
  const years = [];
  const rates = [];

  for (let year = startYear; year <= currentYear; year++) {
    try {
      const data = await queryRates(year, from, to);
      years.push(year);
      rates.push(data.rates[to]);
    } catch (err) {
      console.error(`Errore per l'anno ${year}:`, err);
      years.push(year);
      rates.push(null);
    }
  }
  return { years, rates };
}

// get currency arrays
export async function getCurrencies() {
    const apiUrl = "https://openexchangerates.org/api/currencies.json"
    const response = await fetch(apiUrl)

    if (!response.ok) {
        throw new Error("API Error")
    }
    return response.json()
}

// get inflation rate
export async function getInflationRate(inputDate) {
  const apiUrl = "https://www.statbureau.org/calculate-inflation-rate-jsonp"
  const currentDate = new Date().getFullYear()

  const queryUrl = `${apiUrl}?jsoncallback=&country=eurozone&start=${inputDate}/1/1&end=${currentDate}/1/1`
  console.log(queryUrl)

  const response = await fetch(queryUrl)

  if (!response.ok) {
    throw new Error("API Error")
  }
  const value = await response.text()
  return value
}
