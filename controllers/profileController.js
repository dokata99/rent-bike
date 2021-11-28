const { Router } = require('express')
const router = Router()
const profileService = require('../services/profileService')

router.get('/:profileId', async(req, res) => {

    let profile = await profileService.getUser(req.params.profileId)
    let isOwner = false
    if (req.user) {
        isOwner = await profileService.checkUserProfile(req.user._id, req.params.profileId)
    }

    res.render('profile', { title: 'Rent A Bike', profile, isOwner })
})

router.get('/edit/:profileId', async(req, res) => {
    res.render('edit', { title: 'Rent A Bike' });
})

router.post('/edit/:profileId', (req, res) => {
    profileService.uploadPhoto(req.params.profileId, req.body.profileImg)
        .then(() =>
            res.redirect(`/profile/${req.user._id}`)
        );
})

module.exports = router