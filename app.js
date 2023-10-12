'use strict'

require('dotenv').config()
require('./db/mongodb')
const cron = require('node-cron')
const colors = require('colors')
const { cryptos, fiats } = require('./data.js')
const settingsController = require('./controllers/settings.controller')
const getPairs = require('./get-exchanges-data')
const findArbitrage = require('./arbitrage')

const cronJS = {
    run: () => {
        // console.log('cron running . . .')
        cron.schedule('0 */1 * * * *', async () => {
            try {
                const settings = await settingsController.getSettings()
                // console.log(settings);
                
                if (settings?.run) {
                    // console.log('Loading . . .')                   
                    try {
                        const [ stables_fiat, cryptos_fiat ] = await Promise.all([
                            getPairs.getStables(cryptos, fiats),
                            //getPairs.getCryptos(cryptos, fiats)
                        ])          
                        findArbitrage(stables_fiat)
                        console.log(Date().blue) 
                    } catch (err) {
                        console.error(err)
                    }               
                }
            } catch (error) {
                console.error(error)
            }              
        })
    }
}

cronJS.run()