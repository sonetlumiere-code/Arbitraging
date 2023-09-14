'use strict'

const Setting = require('./settings.model')

const initialSetup = {

    createSettings: async () => {
        try {
            const countSettings = await Setting.estimatedDocumentCount()
            if (countSettings > 0) return
            const settingsValues = await Promise.all([
                new Setting({ run: true, gain: 0.99 }).save(),
            ])
            console.log('initial setup: ', settingsValues)
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = initialSetup
