const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    // attr
}, { timestamps : true })

module.exports = mongoose.model('Admin', adminSchema)