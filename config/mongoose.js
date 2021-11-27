const mongoose = require('mongoose')

module.exports = (app) => {
    mongoose.connect('mongodb://localhost/rent-bike', {useNewUrlParser: true, useUnifiedTopology: true})

    const db = mongoose.connection


    db.on('error', console.log.bind(console, 'connection error:'))
    db.once('open',console.log.bind(console, 'Connected to database!'))
}