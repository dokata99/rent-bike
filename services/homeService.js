const Bikes = require('../model/bikes')
const Regions = require('../model/regions')

async function getAll() {
    let bikes = await Bikes.find({}).sort({ _id: -1 }).populate('owner').populate('region').lean();

    return bikes
}

async function getMatchingBikes(query) {
    const { searchBike, searchRegion, searchPriceMin, searchPriceMax } = query;
    let filterQuery = {};

    if (searchRegion) {
        let regions = await Regions.find({ region: searchRegion }).lean()
        let regionIds = [];
        regions.forEach((region) => {
            regionIds.push(region._id.toString())
        })

        filterQuery.region = { $in: regionIds };
    }

    if (searchPriceMin && searchPriceMax) {
        filterQuery.rentPrice = { $gte: searchPriceMin, $lte: searchPriceMax };
    }

    let bikes = await Bikes.find(filterQuery).sort({ _id: -1 }).populate('region').populate('owner').lean()

    return bikes
}

async function getMinPrice() {
    let bike = await Bikes.findOne({}).sort({ rentPrice: 1 }).lean();

    if (bike == null) {
        return 0;
    }

    return bike.rentPrice;
}

async function getMaxPrice() {
    let bike = await Bikes.findOne({}).sort({ rentPrice: -1 }).lean();

    if (bike == null) {
        return 0;
    }

    return bike.rentPrice;
}

function formatDate(bikes) {
    bikes.forEach(bike => {
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        };

        bike.date = bike.date.toLocaleDateString("bg", options)
    });
}

function getById(id) {
    return Bikes.findById(id).lean()
}

async function userOwnBike(userId, bikeId) {
    let bike = await Bikes.findById(bikeId)
    if (userId == bike.owner._id) {
        return true;
    }

    return false;
}

function getBikeById(bikeId) {
    return Bikes.findById(bikeId).lean()
}

function getRegionName(regionId) {
    return Regions.findById(regionId).lean()
}

function deleteBike(bikeId) {
    return Bikes.findByIdAndDelete({ _id: bikeId });
}

function editBike(bikeId, updatedData) {
    if (!updatedData.price) {
        return Bikes.findOneAndUpdate({ _id: bikeId }, { imageUrl: updatedData.imageUrl });
    } else if (!updatedData.imageUrl) {
        return Bikes.findOneAndUpdate({ _id: bikeId }, { price: updatedData.price });
    }

    return Bikes.findOneAndUpdate({ _id: bikeId }, { imageUrl: updatedData.imageUrl, price: updatedData.price });
}

async function check(userId, bikeId) {
    let bike = await Bikes.findById(bikeId);
    if (userId == bike.owner._id) {
        return true;
    }

    return false;
}

module.exports = {
    getAll,
    getMinPrice,
    getMaxPrice,
    formatDate,
    getMatchingBikes,
    getById,
    userOwnBike,
    getBikeById,
    editBike,
    deleteBike,
    getRegionName,
    check
}