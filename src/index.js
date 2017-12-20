#!/usr/bin/env node
const portfolio = require('../portfolio.json');
const axios = require('axios')
const ora = require('ora')
const Table = require('cli-table2')
const colors = require('colors')
const humanize = require('humanize-plus')

const find = Object.keys(portfolio)
const table = new Table({
	chars: {
		'top': '-',
		'top-mid': '-',
		'top-left': '-',
		'top-right': '-',
		'bottom': '-',
		'bottom-mid': '-',
		'bottom-left': '-',
		'bottom-right': '-',
		'left': '║',
		'left-mid': '-' ,
		'mid': '-' ,
		'mid-mid': '-',
		'right': '║',
		'right-mid': '-',
		'middle': '│'
	},
	head: ['Coin', 'Change (24H)', 'Change (1H)', 'Price (USD)', 'Quantity', 'Portfolio (USD)'].map(title => title.yellow),
	colWidths: [10, 15, 14, 15]
})
const spinner = ora('Loading data').start()
const sourceUrl = 'https://api.coinmarketcap.com/v1/ticker/?limit=50&convert=$USD'
var total = 0
axios.get(sourceUrl)
.then(function (response) {
	spinner.stop()
	response.data
		.filter(record => {
			if (find.length > 0) {
				return find.some(keyword => record.symbol.toLowerCase() === keyword.toLowerCase())
			}
			return true
		})
		.map(record => {
			const percentChange24h = record.percent_change_24h
			const textChange24h = `${percentChange24h}%`
			const change24h = percentChange24h? (percentChange24h > 0 ? textChange24h.green : textChange24h.red) : 'NA'
			
			const percentChange1h = record.percent_change_1h
			const textChange1h = `${percentChange1h}%`
			const change1h = percentChange1h ? (percentChange1h > 0 ? textChange1h.green : textChange1h.red) : 'NA'
			
			const portfolioValue = Number(portfolio[record.symbol] * record.price_usd).toFixed(2)
			total += parseFloat(portfolioValue)
			return [
				`💰  ${record.symbol}`,
				change24h,
				change1h,
				`$${record.price_usd}`,
				numberWithCommas(portfolio[record.symbol]),
				`$${numberWithCommas(portfolioValue)}`
			]
		})
		.forEach(record => table.push(record))
	if (table.length === 0) {
		console.log('We are not able to find coins matching your portfolio'.red)
	} else {
		console.log(`\nData source from coinmarketcap.com at ${new Date().toLocaleTimeString()}`)
		console.log(table.toString())
		console.log(`\ntotal portfolio value: $${numberWithCommas(Number(total).toFixed(2))}\n`)
	}
})
.catch(function (error) {
	spinner.stop()
	console.error('Coinmon is not working now. Please try again later.'.red)
})

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}