const { Router } = require('express')
const router = Router()
const addService = require('../services/addService')
const isAuthenticated = require('../middlewares/isAuth')


router.get('/', isAuthenticated, (req, res) => {

    addService.getRegions()
        .then((regions) => {
            res.render('add', { title: 'CarsExpress' })
        })
        .catch(() => res.statusMessage(404).end())


})
router.post('/', isAuthenticated, (req, res) => {

    //TODO VALIDATION

    //console.log(req.body)
    //res.redirect('/')
    addService.createBike(req.body.brand, req.body.model, req.body.region, req.body, req.user._id)
        .then(() => {
            res.redirect('/')
        }).catch((error) => console.log(error))

})

router.get('/brand', isAuthenticated, (req, res) => {

    res.render('brand', { title: 'CarsExpress' })

})

router.post('/brand', isAuthenticated, (req, res) => {

    addService.createBrand(req.body)
        .then(() => {
            res.redirect('/add')
        }).catch(() => res.status(500).end())

})

router.get('/model', isAuthenticated, (req, res) => {

    addService.getBrands()
        .then((brands) => {
            res.render('model', { title: 'CarsExpress', brands })
        })
        .catch(() => res.statusMessage(404).end())

})

router.post('/model', isAuthenticated, (req, res) => {

    addService.createModel(req.body.model, req.body.brand)
        .then(() => {
            //TODO: update cache when adding new model
            res.redirect('/add')
        }).catch(() => res.status(500).end())

})

router.get('/region', isAuthenticated, (req, res) => {

    res.render('region', { title: 'CarsExpress' })

})

router.post('/region', isAuthenticated, (req, res) => {

    addService.createRegion(req.body)
        .then(() => {
            res.redirect('/add')
        }).catch(() => res.status(500).end())

})

router.get('/:brandName', isAuthenticated, (req, res) => {
    addService.getModelsByBrand(req.params.brandName)
        .then((models) => {
            res.set('Cache-control', 'public, max-age=300')
            res.json(models);
        })
        .catch(() => res.status(404).end())
})

module.exports = router