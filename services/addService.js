const Bike = require('../model/bike')
const Regions = require('../model/regions')

async function createBike(bikeName, regionName, bikeData, userId) {

    let region = await Regions.findOne({ region: regionName }).lean()

    let bike = new Bike({
        bikeName: bikeName,
        imageUrl: bikeData.imageUrl,
        description: bikeData.description,
        rentPrice: bikeData.price,
        owner: userId,
        region: region._id,
        date: Date.now()
    })

    return bike.save()
}

async function getBikes() {
    let bike = await Bike.find({}).sort({ bike: 1 }).lean()

    return bike
}

async function getRegions() {
    let regions = await Regions.find({}).sort({ region: 1 }).lean()

    return regions
}


function createRegion(region) {
    let newRegion = new Regions(region)

    return newRegion.save()
}

module.exports = {
    getBikes,
    getRegions,
    createBike,
    createRegion
}