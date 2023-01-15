const { getCustomerDb } = require("../services/customers.services")
const { getCustomerByUserAccountIdDb } = require("../services/customers.services")
const { createCustomerDb } = require("../services/customers.services")

const getCustomer = async (request, response, next) => {
    try {
        var customerData = await getCustomerDb()

        response.status(200).json(customerData)

        next()

    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

const getCustomerByUserAccountId = async (request, response, next) => {
    try {
        console.log(request.body)
        var customerData = await getCustomerByUserAccountIdDb(request.body.userAccountId)

        response.status(200).json(customerData)

        next()

    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

const createCustomer = async (request, response, next) => {
    try {
        // console.log(request)
        var result
        await createCustomerDb(request).then(function(res) {
            result = res
        })
        
        response.status(200).json(result._id)

        next()

    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }

}

module.exports = {
    getCustomer,
    getCustomerByUserAccountId,
    createCustomer
}