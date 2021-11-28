const { Router } = require('express')
const router = Router()
const authService = require('../services/authenticationService')
const isAuth = require('../middlewares/isAuth')
const isGuest = require('../middlewares/isGuest')




router.get('/register', isGuest, (req, res) => {

    res.render('register', { title: 'Rent A Bike' })

})

router.post('/register', isGuest, async(req, res) => {
    const { email, username, phone, password, rePassword } = req.body

    if (password !== rePassword) {
        return res.render('register', { title: 'Register', error: 'The password does not match!' })
    }

    if (username.length <= 3) {
        return res.render('register', { title: 'Register', error: 'Username should be more than 3 symbols!' })
    }
    if (phone.length <= 9) {
        return res.render('register', { title: 'Register', error: 'Invalid phone number!' })
    }

    if (password.length <= 3) {
        return res.render('register', { title: 'Register', error: 'Password should be more than 3 symbols!' })
    }
    let searchUser = await authService.findUserByUsername(username);
    if (searchUser) {
        return res.render('register', { title: 'Register', error: 'User or email already exists!' })
    }
    let searchEmail = await authService.findUserByEmail(email)
    if (searchEmail) {
        return res.render('register', { title: 'Register', error: 'User or email already exists!' })
    }



    //VALIDATION TODO


    try {

        let user = await authService.register(req.body)

        console.log("New User Created!")
        console.log(user)

        res.redirect('/auth/login')

    } catch (error) {
        res.render('register', { error, title: 'Register' })
    }

})

router.get('/login', isGuest, (req, res) => {

    res.render('login', { title: 'Rent A Bike' })

})

router.post('/login', isGuest, async(req, res) => {

    const { username, password } = req.body

    if (!username) {
        return res.render('login', { title: 'Rent A Bike', message: 'Enter all fields!' })
    }

    if (!password) {
        return res.render('login', { title: 'Rent A Bike', message: 'Enter all fields!' })
    }

    //validation TODO

    try {
        let token = await authService.login(req.body)

        res.cookie('USER_SESSION', token)

        res.redirect('/')

    } catch (error) {

        console.log(error)
        res.render('login', { title: 'Rent A Bike', error })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('USER_SESSION')
    res.redirect('/')
})

module.exports = router