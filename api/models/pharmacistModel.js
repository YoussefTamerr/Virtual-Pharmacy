const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pharmacistSchema = new Schema({
    // attr
}, { timestamps : true })

module.exports = mongoose.model('Pharmacist', pharmacistSchema)