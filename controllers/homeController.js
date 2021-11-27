const { Router } = require('express')
const router = Router()
const homeService = require('../services/homeService')
const profileService = require('../services/profileService')
const addService = require('../services/addService')

router.get('/', async(req, res) => {
    let bikes = await homeService.getAll();
    //let regions = await addService.getRegions();
   
    try{
        res.render('home', { title: 'Rent Express', bikes})
    }catch(err){
        console.log(err)
        res.render('home', { title: 'CarExpress'})

    }
    

})

router.get('/details/:carId', async(req, res) => {

    let car = await homeService.getById(req.params.carId)
    let brand = await homeService.getBrandName(car.brand)
    let model = await homeService.getModelName(car.model)
    let user = await profileService.getUser(car.owner)
    let region = await homeService.getRegionName(car.region)

    let isOwner = false
    if (req.user) {
        isOwner = await homeService.check(req.user._id, req.params.carId)
    }
    res.render('details', { title: 'CarsExpress', car, isOwner, user, brand, model, region })
})

router.get('/edit/:carId', async(req, res) => {

    let carId = await req.params.carId


    res.render('editCar', { title: 'CarsExpress', carId })
})

router.post('/edit/:carId', async(req, res) => {

    homeService.editCar(req.params.carId, req.body)
        .then(() =>
            res.redirect(`/details/${req.params.carId}`)
        )

})

router.get('/delete/:carId', async(req, res) => {

    homeService.deleteCar(req.params.carId)
        .then(() =>
            res.redirect("/")
        )

})

module.exports = router