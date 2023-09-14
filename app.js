'use strict'

require('dotenv').config()
require('./db/mongodb')
const cron = require('node-cron')
const colors = require('colors')
const { cryptos, fiats } = require('./data.js')
const settingsController = require('./controllers/settings.controller')
const getPairs = require('./get-exchanges-data')
const findArbitraje = require('./arbitraje')

const cronJS = {
    run: () => {
        console.log('cron running . . .')
        cron.schedule('0 */1 * * * *', async () => {
            try {
                const settings = await settingsController.getSettings()
                if (settings.run) {
                    console.log('Loading . . .')                   
                    try {
                        const [ stables_fiat, cryptos_fiat ] = await Promise.all([
                            getPairs.getStables(cryptos, fiats),
                            //getPairs.getCryptos(cryptos, fiats)
                        ])          
                        findArbitraje(stables_fiat)
                        console.log(Date().blue) 
                    } catch (err) {
                        console.log(err)
                    }               
                }
            } catch (error) {
                console.log(error)
            }              
        })
    }
}

cronJS.run()