const customers = require("../../../../models/customers.models")
const userAccounts = require('../../../../models/userAccounts.models')

const getCustomerDb = () => {
    var result = customers.find()
    return result
}

//TODO: instead of passing req, make it into parameter like address,city,postalCode...
const createCustomerDb = (req) => {
    // console.log(req.body)
    var userAccount = new userAccounts({
        userName: req.body.userName,
        password: req.body.password,
    })

    var userAccountResult = userAccount.save()

    if(!userAccountResult){
        //TODO: use error custom class
        throw {name: 'ValidationError', errors: { title:{ message: 'Invalid/Missing Title', name: 'ValidatorError'}} }
    }

    var customer = new customers({
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        dateOfBirth: new Date(req.body.dateOfBirth),
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        permissionLevel: req.body.permissionLevel,
        userAccount:req.body.userAccount
	})

    var customerResult = customer.save()

    if(!customerResult){
        //TODO: use error custom class
        throw {name: 'ValidationError', errors: { title:{ message: 'Invalid/Missing Title', name: 'ValidatorError'}} }
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
