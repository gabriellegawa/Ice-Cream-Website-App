const mongoose = require("mongoose");

const customers = require("../../../../models/customers.models")
const { createUserAccountDb } = require('../../userAccounts/services/userAccounts.services')

const ValidationError = require('../../../lib/Validation/Exception/ValidationError')
const ValidatorError = require('../../../lib/Validation/Exception/ValidatorError')
const StringValidator = require('../../../lib/Validation/CommonUtils/StringValidator/StringValidator');
const e = require("express");
const getCustomerDb = () => {
    var result = customers.find()
    return result
}

//TODO: instead of passing req, make it into parameter like address,city,postalCode...
const createCustomerDb = async (req) => {
    const session = await mongoose.startSession()
    session.startTransaction();


    var errorsList = new Map();

    try{
        var newUserAccount = await createUserAccountDb(req.body.userName,req.body.password, session)
        // console.log("UserAccount" + newUserAccount)
    }catch(error){
        if(error instanceof ValidationError){
            error.errors.forEach((value, key) => errorsList.set(key, value));
            // errorsList = new Map([[...errorsList, ...error.errors]]);
        }
    }

    //TODO: Maybe create a function to validate customer
    if(StringValidator.isUndefinedString(req.body.address)){
        errorsList.set('address', new ValidatorError("Invalid address", 'address', 'INVALID_INPUT'))
    }

    if(StringValidator.isUndefinedString(req.body.city)){
        errorsList.set('address', new ValidatorError("Invalid address", 'address', 'INVALID_INPUT'))
    }

    var customerResult = await customers({
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        dateOfBirth: new Date(req.body.dateOfBirth),
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        permissionLevel: req.body.permissionLevel,
        userAccount: newUserAccount
	}).save({ session: session })

    if(!customerResult){

        //TODO: Replace with more appropriate custom error class
        throw new ValidationError(new ValidatorError("Failed Creating Customer Object", 'userAccount', 'FAILED_CREATION'))
    }

    if(errorsList.size == 0){
        await session.commitTransaction()
        session.endSession()
        return true
    }

    await session.abortTransaction();


    throw new ValidationError(errorsList)
}

const getCustomerByUserAccountIdDb = (userAccountId) => {
    return (new customers).findByUserAccountId(userAccountId)
}

module.exports = {
    createCustomerDb,
    getCustomerByUserAccountIdDb,
    getCustomerDb,
}
