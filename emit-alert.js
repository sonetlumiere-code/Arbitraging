'use strict'

const settingsController = require('./controllers/settings.controller')
const bot = require('./telegram_bot/telegram_bot')
const chatId = process.env.CHAT_ID_GROUP

const emitAlert = async (
    // favoriteBuyMethod,
    lowPrices,
    highPrices,
    gain
) => {
    // let buyFav = JSON.stringify(favoriteBuyMethod, null, 4)
    let buyLow = JSON.stringify(lowPrices, null, 4)
    let sellHigh = JSON.stringify(highPrices, null, 4)
    
    //console.log('buy fav: '.cyan, buyFav)
    // console.log('buy low: '.cyan, buyLow)
    // console.log('sell high: '.cyan, sellHigh)
    // console.log(`gain: +${gain}%`.green)

    const settings = await settingsController.getSettings()

    if (gain > settings.gain) {
        const message = `Arbitrage alert:\nBuy Low: ${buyLow}\nSell High: ${sellHigh}\nGain: +${gain}%`
        bot.sendMessage(chatId, message)
    }
}

module.exports = emitAlert
