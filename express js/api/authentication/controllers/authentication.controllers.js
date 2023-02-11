var crypto = require("crypto")
const fs = require("fs")
const jwt = require("jsonwebtoken")
var jwtSecret = fs.readFileSync("./api/authentication/demos/private.key")

const login = (req, res) => {
    try {
        let refreshId = req.body.userName + jwtSecret
        let salt = crypto.randomBytes(16).toString('base64')
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64")
        req.body.refreshKey = salt
        let token = jwt.sign(
            {
                req:req.body
            }, 
            jwtSecret,
            {
              expiresIn: "1h",
            })
        let b = Buffer.from(hash)
        let refresh_token = b.toString('base64')
        res.status(201).send({accessToken: token, expiresIn: 60})
    } catch (err) {
        res.status(500).send({errors: err})
    }
}

module.exports = {
    login
}