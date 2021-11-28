const { Router } = require('express')
const router = Router()
const addService = require('../services/addService')
const isAuthenticated = require('../middlewares/isAuth')


router.get('/', isAuthenticated, (req, res) => {
    addService.getRegions()
        .then((regions) => {
            res.render('add', { title: 'Rent A Bike', regions });
        })
        .catch(() => res.statusMessage(404).end());
})
router.post('/', isAuthenticated, (req, res) => {
    addService.createBike(req.body.description, req.body.price, req.body.imageUrl, req.body.region, req.user)
        .then(() => {
            res.redirect('/')
        }).catch((error) => console.log(error));
})

router.get('/region', isAuthenticated, (req, res) => {
    res.render('region', { title: 'Rent A Bike' });
})

router.post('/region', isAuthenticated, (req, res) => {
    addService.createRegion(req.body)
        .then(() => {
            res.redirect('/add')
        }).catch(() => res.status(500).end());
})

module.exports = router