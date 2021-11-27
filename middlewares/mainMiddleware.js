const jwt = require('jsonwebtoken')


module.exports = function () {
    return (req,res, next) => {
        let token = req.cookies['USER_SESSION']

        if(token){
            jwt.verify(token, 'SHUUUUUU' , function (err, decoded){
                if(err){
                    res.clearCookie('USER_SESSION')
                }else{
                    req.user = decoded
                    req.locals = decoded
                    res.locals.isAuthenticated = true
                    res.locals.username = req.user.username
                    res.locals.userId = req.user._id
                }
            })
        }
        next()
    
    }
}