const axios = require('axios')
const format = require('./format.js')
const { exchanges, cryptos, fiats } = require('./data.js')

const apiCall = async (exchange, crypto, fiat, volume = 1000) => {
    try {
        const res = await axios(`https://criptoya.com/api/${exchange}/${crypto}/${fiat}/${volume}`)
        if (res.data == 'Invalid pair') {
            return res.data
        }  
        return format(res.data, exchange)
    } catch (error) {
        console.error(error)
    }
}

const getExchangesData = async (crypto, fiat) => {
    const exchangesData = {}  
    for await (const exchange of Object.values(exchanges)) {
        exchangesData[exchange] = await apiCall(exchange, cryptos[crypto], fiats[fiat])
    }
    return exchangesData
}

const getPairs = {
    getStables: async ({ busd, dai, usdc, usdt }, { ars }) => {
        const [ busd_ars, dai_ars, usdc_ars, usdt_ars ] = await Promise.all([
            getExchangesData(busd, ars),
            getExchangesData(dai, ars),
            getExchangesData(usdc, ars),
            getExchangesData(usdt, ars)
        ])
        return { busd_ars, dai_ars, usdc_ars, usdt_ars }
    },
    getCryptos: async ({ btc, eth }, { ars }) => {
        const [ btc_ars, eth_ars ] = await Promise.all([
            getExchangesData(btc, ars),
            getExchangesData(eth, ars)
        ])
        return { btc_ars, eth_ars }
    }
}

module.exports = getPairs