'use strict'

const Setting = require('../models/settings.model')
const settingsId = process.env.SETTINGS_ID

if (!settingsId) {
    console.error('No settings ID provided.')
}

const settingsController = {

    getSettings: async () => {
        try {          
            const settings = await Setting.findById(settingsId).select('-_id')
            if (settings) {
                return settings
            } else {
                return 'Error al buscar settings'
            }
        } catch (error) {
            console.error(error)
        }
    },

    updateSettings: async (update) => {
        try {
            const settingsUpdated = await Setting.findByIdAndUpdate(settingsId, update, { new: true })
            if (settingsUpdated) {
                return true
            } else {
                return 'Error updating'
            }
        } catch (error) {
            console.error(error)
        }
    }
    
}

module.exports = settingsController