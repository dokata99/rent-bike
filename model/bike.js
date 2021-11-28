const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    description: {
        type: String,
        required: true
    },
    rentPrice: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    region: {
        type: mongoose.Types.ObjectId,
        ref: 'Regions',
        required: true,
    },
    date: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Bike', bikeSchema)