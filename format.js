const { exchanges } = require('./data.js')

const filtersBinanceP2P = {
    users: [
        'ArgenSaldo'
    ],
    tradeMethods: [
        'CashInPerson',
        'BankArgentina'
    ]
}

const format = (data, exchange) => {
    let result
    switch(exchange) {
        case exchanges.belo:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.binance:
            result = {
                Compra: +data.asks.data[0].adv.price,
                Venta: +data.bids.data
                    .filter(x => x.adv.tradeMethods.some(x => !filtersBinanceP2P.tradeMethods.includes(x.identifier)) && !filtersBinanceP2P.users.includes(x.advertiser.nickName))
                    .find(x => x.advertiser.userType === 'merchant')?.adv.price
            }
            break;
        case exchanges.bitex:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.bitso:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.buenbit:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.cryptoMkt:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.fiwind:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.ftx:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.lemonCash:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.letsbit:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.ripioexchange:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.saldo:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        case exchanges.tiendaCrypto:
            result = {
                Compra: data.totalAsk,
                Venta: data.totalBid
            }
            break;
        default:
            result = `Error data: ${data}`
    }
    return result
}

module.exports = format;