const Bike = require('../model/bike')
const Regions = require('../model/regions')

async function createBike(description, price, imageUrl, regionName, user) {

    let region = await Regions.findOne({ region: regionName }).lean();

    let bike = new Bike({
        imageUrl: imageUrl,
        description: description,
        rentPrice: price,
        owner: user._id,
        region: region._id,
        date: Date.now()
    })

    return bike.save();
}

async function createRegion(region) {
    let newRegion = new Regions(region)

    return newRegion.save();
}

async function getBikes() {
    let bikes = await Bike.find({}).sort({ bike: 1 }).lean()

    return bikes;
}

async function getRegions() {
    let regions = await Regions.find({}).sort({ region: 1 }).lean()

    return regions;
}

module.exports = {
    createBike,
    createRegion,
    getBikes,
    getRegions
}