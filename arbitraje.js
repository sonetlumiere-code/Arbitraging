const { exchanges } = require('./data.js')
const emitAlert = require('./emit-alert.js')

const findArbitraje = (stables_fiat) => {

    const arbitraje = {
        BUY: {
            favoriteBuyMethod: getPrices.getFavoriteBuyMethod(stables_fiat),
            lowPrices: getPrices.getLowPrices(stables_fiat)
        },
        SELL: {
            highPrices: getPrices.getHighPrices(stables_fiat)
        } 
    }

    const buy = Object.values(arbitraje.BUY.favoriteBuyMethod)[0]
    const sell = Object.values(Object.values(arbitraje.SELL.highPrices)[0])[0]
    const gain = (((sell - buy) / sell) * 100).toFixed(2)

    emitAlert(
        arbitraje.BUY.favoriteBuyMethod, 
        arbitraje.BUY.lowPrices, 
        arbitraje.SELL.highPrices, 
        gain
    )

}

const getPrices = {

    getFavoriteBuyMethod: ({ busd_ars, dai_ars, usdc_ars, usdt_ars }) => {
        const BinanceP2P = {
            'busd_ars': busd_ars[exchanges.binance].Venta,
            'dai_ars': dai_ars[exchanges.binance].Venta,
            'usdt_ars': usdt_ars[exchanges.binance].Venta,
        }
        return Object.fromEntries(Object.entries(BinanceP2P).sort((a, b) => a[1] - b[1]))   
    },

    getLowPrices: (stablesFiat) => {
        const result = {}
        for (let pair in stablesFiat) {
            let data = {}
            Object.entries(stablesFiat[pair])
                .filter(x => x[1] != 'Invalid pair')
                .sort((a, b) => a[1].Compra - b[1].Compra)
                .slice(0, 3)
                .forEach(x => {
                    data[x[0]] = x[1].Compra
                })
            result[pair] = data
        }
        return Object.fromEntries(Object.entries(result).sort(([,a], [,b]) => Object.values(a)[0] - Object.values(b)[0]))
    },

    getHighPrices: (stablesFiat) => {
        const result = {}
        for (let pair in stablesFiat) {
            let data = {}
            Object.entries(stablesFiat[pair])
                .filter(x => x[1] != 'Invalid pair')
                .sort((a, b) => b[1].Venta - a[1].Venta)
                .slice(0, 3)
                .forEach(x => {
                    data[x[0]] = x[1].Venta
                })
            result[pair] = data
        }
        return Object.fromEntries(Object.entries(result).sort(([,a], [,b]) => Object.values(b)[0] - Object.values(a)[0]))
    }

}

module.exports = findArbitraje