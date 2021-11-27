const Bike = require('../model/bike')
const Regions = require('../model/regions')

async function getAll() {
    let bikes = await Bike.find({}).sort({ _id: -1 }).populate('owner').populate('region').lean();
    //TODO: pagination

    return bikes
}

async function getMatchingBikes(query) {
    const { searchBike, searchRegion, searchPriceMin, searchPriceMax} = query;
    let filterQuery = {};
    if (searchBike && searchBike !== "all") {
        let bike = await Bike.findOne({ bikeName: searchBrand }).lean()

        filterQuery.brand = bikeName._id;
    }
    
    if (searchRegion) {
        let regions = await Regions.find({ region: searchRegion }).lean()
        let regionIds = [];
        regions.forEach((region) => {
            regionIds.push(region._id.toString())
        })

        filterQuery.region = { $in: regionIds };
    }
    
    if (searchPriceMin && searchPriceMax) {
        filterQuery.price = { $gte: searchPriceMin, $lte: searchPriceMax };
    }
    if (searchMileageMin && searchMileageMax) {
        filterQuery.mileage = { $gte: searchMileageMin, $lte: searchMileageMax };
    }

    let bikes = await Bike.find(filterQuery).sort({ _id: -1 }).populate('region').lean()

    //TODO: pagination

    return bikes
}

function getById(id) {
    return Bike.findById(id).lean()
}

async function userOwnBike(userId, bikeId) {

    let bike = await Bike.findById(bikeId)
    if (userId == bike.owner._id) {
        return true
    }

    return false
}

function getBikeById(bikeId) {
    return Bike.findById(bikeId).lean()
}


function editBike(bikeId, updatedData) {

    if (!updatedData.price) {
        return Bike.findOneAndUpdate({ _id: bikeId }, { imageUrl: updatedData.imageUrl })
    } else if (!updatedData.imageUrl) {
        return Bike.findOneAndUpdate({ _id: bikeId }, { price: updatedData.price })
    }

    return Bike.findOneAndUpdate({ _id: carId }, { imageUrl: updatedData.imageUrl, price: updatedData.price })

}
function getRegionName(regionId) {
    return Regions.findById(regionId).lean()
}
function deleteBike(bikeId){
    return Bike.findByIdAndDelete({_id: bikeId})
}



module.exports = {
    getAll,
    getMatchingBikes,
    getById,
    userOwnBike,
    getBikeById,
    editBike,
    deleteBike,
    getRegionName
}