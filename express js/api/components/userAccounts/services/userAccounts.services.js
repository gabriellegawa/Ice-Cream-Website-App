const userAccounts = require("../../../../models/userAccounts.models")
const ValidationError = require('../../../lib/Validation/Exception/ValidationError')
const ValidatorError = require('../../../lib/Validation/Exception/ValidatorError')
const StringValidator = require('../../../lib/Validation/CommonUtils/StringValidator/StringValidator')

const getUserAccountDb = () => {
    var result = userAccounts.find()
    return result
}

const createUserAccountDb = async (userName, password, session = null) => {
    // console.log(req.body)
    // TO DO: ADD DECRYPTION AND ENCRYPTION MIDDLE WARE
    // TO DECRYPT THE TEMPORARY ENCRYPTION FROM FRONT END
    // and encrypt the password to be stored in database
    const errorsList = new Map();

    //TODO: Maybe create a function to validate user account
    if(StringValidator.isUndefinedString(userName)){
        errorsList.set('userName', new ValidatorError("Invalid userName", 'userName', 'INVALID_INPUT'))
    }

    if(StringValidator.isUndefinedString(password)){
        errorsList.set('password', new ValidatorError("Invalid password", 'password', 'INVALID_INPUT'))
    }

    var userAccount = new userAccounts({
        userName: userName,
        password: password,
    })

    if(errorsList.size == 0){
        try {
            const result = await userAccount.save({session: session})
            return result._id
        } catch (err) {
            //TODO: Replace with more appropriate custom error class
            throw new ValidationError(new ValidatorError("Failed Creating User Account Object", 'userAccount', 'FAILED_CREATION'))
        }
    }else{
        throw new ValidationError(errorsList)
    }
    
}
    

const getUserAccountByUserNameDb = (userName) => {
    return (new userAccounts).findByUserName(userName)
}

module.exports = {
    getUserAccountDb,
    getUserAccountByUserNameDb,
    createUserAccountDb,
}
