# 📉 ConvertEUR

**ConvertEUR** is a single-page web application that converts arbitrary currency amounts to **EUR over time**, using **historical exchange rates** and optional **inflation adjustment** to reflect real purchasing power.

**Live demo:** https://converteur.vercel.app/

---

## 🚀 Features

- 💱 Convert supported currencies to EUR for **historical dates**
- 📊 **Inflation-adjusted values** and charts showing historical performance
- 🌙 Light and Dark theme support
- ⚡ Fast, lightweight, client-side only

---

## 🛠️ How to Use ConvertEUR

1. Select a **year between 1999 and today**
2. Choose the **input currency** and enter an **amount**
3. Convert the value to **EUR** using historical exchange rates
4. Use the **swap** option to reverse the conversion direction
5. All exchange rate and inflation data is **updated live**

---

## 🗂️ Source Structure

The `/src` directory is organized to keep the codebase modular, readable, and easy to extend.

### 📦 `/src/components`
Reusable UI components used throughout the application:

- Includes layout and interface elements such as the **responsive mobile navigation menu**

### 🧠 `/src/stores`
Centralized state management:

- Handles shared application state (e.g. theme, selected year, currency)
- Used to keep logic decoupled from UI components

### 🔧 `/src/services`
Domain-specific logic and data handling:

- Fetching and processing **exchange rate** and **inflation** data
- Encapsulates external data sources and transformations

### 📄 Other key files

- `main.js` — Application entry point and initialization logic
- `query.js` — Data querying and requests
- `theme.js` — Theme handling (light / dark mode)
- `currencyIcons.json` — Mapping of currencies to icons
- `style.css` — Global styles and Tailwind configuration layer

---

## 📊 Data Sources

ConvertEUR relies on publicly available historical datasets:

- **Currency exchange rates** are provided by  
  **https://openexchangerates.org/**

- **Euro inflation data** is sourced from  
  **https://www.statbureau.org/**

### Data Coverage

- All datasets cover the period **from 1999 to today**
- 1999 is used as the starting point as it marks the **introduction of the Euro (EUR)**

All data is used for **informational and educational purposes only**.

--- 

Unless otherwise stated, **all original content provided by the author** in this repository is released under the  
**Creative Commons CC0 1.0 Universal (Public Domain Dedication)**.

External data sources remain subject to their respective licenses and terms.
