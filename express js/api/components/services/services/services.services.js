const mongoose = require("mongoose");

const serviceModel = require("../../../../models/services.models")
const ValidationError = require('../../../lib/Validation/Exception/ValidationError')
const ValidatorError = require('../../../lib/Validation/Exception/ValidatorError')
const { isUndefinedString } = require('../../../lib/Validation/CommonUtils/StringValidator/StringValidator')

const { createImageDb } = require('../../images/services/images.services')

const getAllServicesDb = async () => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    var result = await serviceModel.find().populate('image')
    return result
}

const createServiceDb = async(request) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    const session = await mongoose.startSession()
    session.startTransaction()

    // let yourDate = new Date()
    // const offset = yourDate.getTimezoneOffset()
    // yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    // let currentDateStamp = yourDate.toISOString().split('T')[0]

    let currentDateStamp = new Date()
    
    var errorsList = new Map()

    if(request.body.image){
        try{
            var newImage = await createImageDb(request, session)
        }catch(error){
            if(error instanceof ValidationError){
                error.errors.forEach((value, key) => errorsList.set(key, value));
            }
        }

        if(isUndefinedString(request.body.title)){
            errorsList.set('title', new ValidatorError("Invalid title", 'title', 'INVALID_INPUT'))
        }

        if(isUndefinedString(request.body.description)){
            errorsList.set('description', new ValidatorError("Invalid description", 'description', 'INVALID_INPUT'))
        }

        var newService = new serviceModel({
            title: request.body.title,
            description: request.body.description,
            dateAdded: currentDateStamp,
            lastUpdated: currentDateStamp,
            image: newImage
        })

    }else{

        var newService = new serviceModel({
            title: request.body.title,
            description: request.body.description,
            dateAdded: currentDateStamp,
            lastUpdated: currentDateStamp
        })
    }
    
    var serviceResult = await newService.save({session: session})

    if(!serviceResult){

        //TODO: Replace with more appropriate custom error class
        throw new ValidationError(new ValidatorError("Failed Creating Service Object", 'service', 'FAILED_CREATION'))
    }

    if(errorsList.size == 0){
        await session.commitTransaction()
        session.endSession()
        
        return serviceResult._id
    }

    await session.abortTransaction()
    throw new ValidationError(errorsList)
}

const getServiceByIdDb = (request) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    return (new serviceModel).findByServiceId(request.params.id)
}

const updateServiceDb = (request) => {
    errorsList = []
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    if(!request.body.title){
        // erre.title = {message:'Title is missing'}
        errorsList['title'] = new ValidatorError("Invalid/Missing Title", 'title', 'INVALID_TITLE')
        errorsList['title1'] = new ValidatorError("Invalid/Missing Title", 'title', 'INVALID_TITLE')
        // throw {name: 'ValidationError', errors: { title:{ message: 'Invalid/Missing Title', name: 'ValidatorError'}} }
        // throw {name: 'ValidationError', errors: new Map([['Title', 'Yesy']]) }
        // throw ValidationError()
    }

    if(Array.isArray(errorsList) || errorsList.length){
        throw new ValidationError(errorsList)
    }

    return (new serviceModel).updateByServiceId(request.params.id, request.body.title, request.body.description, request.body.lastUpdated, request.body.userAccount)
}

const deleteServiceByIdDb = (request) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    return (new serviceModel).deleteByServiceId(request.params.id)
}

module.exports = {
    getAllServicesDb,
    createServiceDb,
    getServiceByIdDb,
    updateServiceDb,
    deleteServiceByIdDb,
}
