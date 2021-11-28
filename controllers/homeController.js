const { Router } = require('express')
const router = Router()
const homeService = require('../services/homeService')
const profileService = require('../services/profileService')
const addService = require('../services/addService')

router.get('/', async(req, res) => {
    let regions = await addService.getRegions();
    let minPrice = await homeService.getMinPrice();
    let maxPrice = await homeService.getMaxPrice();

    homeService.getMatchingBikes(req.query)
        .then((bikes) => {
            homeService.formatDate(bikes);
            res.render('home', { title: 'Rent A Bike', bikes, regions, minPrice, maxPrice })
        }).catch(() => res.status(500).end());
})

router.get('/details/:bikeId', async(req, res) => {
    let bike = await homeService.getById(req.params.bikeId);
    let user = await profileService.getUser(bike.owner);
    let region = await homeService.getRegionName(bike.region);

    let isOwner = false
    if (req.user) {
        isOwner = await homeService.check(req.user._id, req.params.bikeId);
    }

    res.render('details', { title: 'Rent A Bike', bike, isOwner, user, region });
})

router.get('/edit/:bikeId', async(req, res) => {
    let bikeId = await req.params.bikeId;

    res.render('editBike', { title: 'Rent A Bike', bikeId });
})

router.post('/edit/:bikeId', async(req, res) => {
    homeService.editBike(req.params.bikeId, req.body)
        .then(() =>
            res.redirect(`/details/${req.params.bikeId}`)
        );
})

router.get('/delete/:bikeId', async(req, res) => {
    homeService.deleteBike(req.params.bikeId)
        .then(() =>
            res.redirect("/")
        );
})

module.exports = router