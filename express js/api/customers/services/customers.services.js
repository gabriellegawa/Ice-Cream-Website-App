const customers = require("../models/customers.models")

const getCustomerDb = () => {
    var result = customers.find()
    return result
}

const createCustomerDb = (req) => {
    // console.log(req.body)

    const customer = new customers({
        userName: req.body.userName,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        dateOfBirth: new Date(req.body.dateOfBirth),
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        permissionLevel: req.body.permissionLevel
	})

    var result = customer.save()
    // console.log(result)
    return result
}

module.exports = {
    createCustomerDb,
    getCustomerDb,
}
