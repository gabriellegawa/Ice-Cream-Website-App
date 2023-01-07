const userAccountModels = require('../../../models/userAccount.models')
const userAccountControllers = require('../../components/userAccount/controllers/userAccount.controllers')

var crypto = require("crypto")

const isPasswordAndUserMatch = (req, res, next) => {
    if (req.body.userName) {
        userAccountControllers.getUserAccountByUserName(req)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$')
                let salt = passwordFields[0]
                let hash = crypto.createHmac('sha512', salt)
                                 .update(req.body.password)
                                 .digest("base64")
                console.log(hash)
                if (hash === passwordFields[1]) {
                    return next()
                } else {
                    return res.status(400).send({errors: ['Invalid email or password']})
                }
            }
        })
    } else {
        return next()
    }
    
}
 
const hasAuthValidFields = (req, res, next) => {
    if (req.headers['authorization']) {
        return res.status(406).send()
    } else {
        return next()
    }
}

module.exports = {
    isPasswordAndUserMatch,
    hasAuthValidFields
}