const customers = require("../../../../models/customers.models")
const { createUserAccountDb } = require('../../userAccounts/services/userAccounts.services')

const getCustomerDb = () => {
    var result = customers.find()
    return result
}

//TODO: instead of passing req, make it into parameter like address,city,postalCode...
const createCustomerDb = (req) => {
    // console.log(req.body)
    if(!createUserAccountDb(req.body.userName,req.body.password)){
        //TODO: use error custom class
        throw {name: 'ValidationError', errors: { title:{ message: 'Failed Creating User Account Object', name: 'ValidatorError'}} }
    }

    var customerResult = new customers({
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        dateOfBirth: new Date(req.body.dateOfBirth),
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        permissionLevel: req.body.permissionLevel,
        userAccount:req.body.userAccount
	}).save()

    if(!customerResult){
        //TODO: use error custom class
        throw {name: 'ValidationError', errors: { title:{ message: 'Failed Creating Customer Object', name: 'ValidatorError'}} }
    }

    return customerResult
}

const getCustomerByUserAccountIdDb = (userAccountId) => {
    return (new customers).findByUserAccountId(userAccountId)
}

module.exports = {
    createCustomerDb,
    getCustomerByUserAccountIdDb,
    getCustomerDb,
}
