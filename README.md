> 💰 Cryptocurrency price ticker CLI.

Check cryptocurrencies' prices, changes on your console.
Best CLI tool for those who are both **Crypto investors** and **Engineers**.

All data comes from [coinmarketcap.com](https://coinmarketcap.com/) APIs.


### forked changes
updated so that cli is stripped and can be used for just getting the prices of your portfolio and portfolio value

### example
portfolio.json:
```json
{
    "XRP": 10412,
    "BTC": 21,
    "LTC": 7
}
```

output:
```
Data source from coinmarketcap.com at 9:07:11 PM
----------------------------------------------------------------------------------------
║ Coin     │ Change (24H)  │ Change (1H)  │ Price (USD)   │ Quantity │ Portfolio (USD) ║
----------------------------------------------------------------------------------------
║ 💰  BTC   │ -9.47%        │ 3.13%        │ $17225.3      │ 21       │ $361,731.30     ║
----------------------------------------------------------------------------------------
║ 💰  XRP   │ -3.23%        │ 5.23%        │ $0.780969     │ 10,412   │ $8,131.45       ║
----------------------------------------------------------------------------------------
║ 💰  LTC   │ -6.05%        │ 4.67%        │ $338.197      │ 7        │ $2,367.38       ║
----------------------------------------------------------------------------------------

total portfolio value: $372,230.13
```

## installation
```bash
git clone https://github.com/christophior/coinmon.git
cd coinmon
npm install
# fill out portfolio.json
npm run dev
```

## installing as a global command
```bash
# do same instructions as above minus actually running the app
# edit src/index.js and update portfolio.json path (line 2) to use absolute path
# ex: const portfolio = require('/Users/Chris/Development/coinmon/portfolio.json');
npm install -g .
coinmon # to run the app
```