const serviceModel = require("../../../../models/services.models")

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
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
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
