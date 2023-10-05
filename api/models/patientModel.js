const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
    // attr
}, { timestamps : true })

module.exports = mongoose.model('Patient', patientSchema)