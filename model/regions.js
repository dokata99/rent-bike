const mongoose = require('mongoose')

const regionsSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Regions', regionsSchema)