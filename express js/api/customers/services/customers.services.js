const customers = require("../models/customers.models")

const getCustomerDb = () => {
    var result = customers.find()
    return result
}

//TODO: instead of passing req, make it into parameter like address,city,postalCode...
const createCustomerDb = (req) => {
    // console.log(req.body)
    var customer = new customers({
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        dateOfBirth: new Date(req.body.dateOfBirth),
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        permissionLevel: req.body.permissionLevel
	})

    var result = customer.save()
    return result
}

const getCustomerByUserAccountIdDb = (userAccountId) => {
    return (new customers).findByUserAccountId(userAccountId)
}

module.exports = {
    createCustomerDb,
    getCustomerByUserAccountIdDb,
    getCustomerDb,
}
