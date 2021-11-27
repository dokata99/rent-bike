const { Router } = require('express')
const router = Router()
const homeController = require('./controllers/homeController')
const addController = require('./controllers/addController')
const authenticationController = require('./controllers/authenticationController')
const profileController = require('./controllers/profileController')

router.use('/', homeController) 
router.use('/add', addController) 
router.use('/profile', profileController)
router.use('/auth', authenticationController) 


module.exports = router