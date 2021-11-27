const User = require('../model/users')


function getUser(userId) {

    return User.findById(userId).lean()

}

function uploadPhoto(userId, profileImg) {

    return User.findOneAndUpdate({ _id: userId }, { profileImg: profileImg })

}

async function checkUserProfile(userId, profileId){

    let user = await User.findById(profileId)
    if (userId == user._id) {
        return true
    }

    return false
}

module.exports = {
    getUser,
    uploadPhoto,
    checkUserProfile
}