const serviceModel = require("../../../../models/services.models")
const ValidationError = require('../../../lib/Validation/Exception/ValidationError')
const ValidatorError = require('../../../lib/Validation/Exception/ValidatorError')

const getAllServicesDb = () => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    var result = serviceModel.find()
    return result
}

//TODO: instead of passing req, make it into parameter like address,city,postalCode...
const createServiceDb = (request) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    // console.log(req.body)
    var newService = new serviceModel({
        title: request.body.title,
        description: request.body.description,
        dateAdded: new Date(request.body.dateAdded),
        lastUpdated: new Date(request.body.lastUpdated),
        userAccount: request.body.userAccount
	})

    var result = newService.save()
    return result
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
