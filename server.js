const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes')
const mongoose = require('./config/mongoose') //mongoose configuration
const cookieParser = require('cookie-parser')
const mainMiddleware = require('./middlewares/mainMiddleware')
const path = require('path')

const app = express()


app.engine('handlebars', engine())
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ 
    extended: true
}))

mongoose(app)
app.use(cookieParser())

app.use(mainMiddleware())
//sadasdasadasdasdadasasd
app.use(routes)

app.listen(5001, () => console.log(`Server is running on port 5001...`)) //set up the port and information log