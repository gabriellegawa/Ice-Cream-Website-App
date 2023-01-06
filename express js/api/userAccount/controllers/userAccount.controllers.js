const { getUserAccountDb } = require('../services/userAccount.services')
const { getUserAccountByUserNameDb } = require('../services/userAccount.services')
const { createUserAccountDb } = require('../services/userAccount.services')

const getUserAccount = async (request, response, next) => {
    try {
        var customerData = await getUserAccountDb()

        response.status(200).json(customerData)

        next()

    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

const getUserAccountByUserName = async (request, response, next) => {
    try {
        var customerData = await getUserAccountByUserNameDb(request.body.userName)

        // response.status(200).json(customerData)

        request.body = {
            userAccountId: customerData[0]._id,
            userName: customerData[0].userName,
            password: customerData[0].password,
        };

        next()

    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

const createUserAccount = async (request, response, next) => {
    try {
        // console.log(request)
        var result
        //TODO: maybe store it as a variable to make the code more easily readable
        await createUserAccountDb(request.body.userName, request.body.password).then(function(res) {
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
    getUserAccount,
    getUserAccountByUserName,
    createUserAccount
}