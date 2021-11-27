const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4
    },
    password: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Users', userSchema)