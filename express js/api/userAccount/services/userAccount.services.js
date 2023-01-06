const userAccounts = require("../models/userAccount.models")

const getUserAccountDb = () => {
    var result = userAccounts.find()
    return result
}

const createUserAccountDb = (userName, password) => {
    // console.log(req.body)
    // TO DO: ADD DECRYPTION AND ENCRYPTION MIDDLE WARE
    // TO DECRYPT THE TEMPORARY ENCRYPTION FROM FRONT END
    // and encrypt the password to be stored in database
    var userAccount = new userAccounts({
        userName: userName,
        password: password,
    })

    var result = userAccount.save()
    // console.log(result)
    return result
}

const getUserAccountByUserNameDb = (userName) => {
    return (new userAccounts).findByUserName(userName)
}

module.exports = {
    getUserAccountDb,
    getUserAccountByUserNameDb,
    createUserAccountDb,
}
