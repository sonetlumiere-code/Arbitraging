'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingSchema = Schema({
    run: Boolean,
    gain: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('Setting', settingSchema)