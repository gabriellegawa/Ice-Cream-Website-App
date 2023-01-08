const jwt = require("jsonwebtoken");
const fs = require("fs")
var jwtSecret = fs.readFileSync("./api/authentication/demos/private.key")

const validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send()
            } else {
                req.jwt = jwt.verify(authorization[1], jwtSecret, function(err, decoded) {
                    if(err){
                        res.status(401).send({msg:"Invalid JWT Token"})
                    }

                    if(decoded) {
                        next()
                    }
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(403).send()
        }
    } else {
        return res.status(401).send()
    }
}

const minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permission_level)
        let user_id = req.jwt.user_id
        if (user_permission_level & required_permission_level) {
            return next()
        } else {
            return res.status(403).send()
        }
    }
}

module.exports = {
    validJWTNeeded,
    minimumPermissionLevelRequired
}