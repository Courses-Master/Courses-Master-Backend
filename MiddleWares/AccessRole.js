const createError = require("../utils/createError")

function AccessRole(...roles) {
    return (req, res, next) => {        
        const role = req.user.role
        
        if (!roles.includes(role)) {
            throw next(createError("you can not access to this request", 403))
        }
        next()
    }

}
module.exports = AccessRole