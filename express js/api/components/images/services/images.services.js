const mongoose = require("mongoose");

const imageModel = require("../../../../models/images.models")
const ValidationError = require('../../../lib/Validation/Exception/ValidationError')
const ValidatorError = require('../../../lib/Validation/Exception/ValidatorError')

//TODO: instead of passing req, make it into parameter like address,city,postalCode...
const createImageDb = (request, session = null) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    
    var newImage = new imageModel({
        shortDescription: request.body.image.shortDescription,
        imagePath: request.body.image.imagePath
	})

    var result = newImage.save({session: session})
    return result._id
}

const getImageByIdDb = (request) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    return (new imageModel).findByImageId(request.params.id)
}

const updateImageDb = async (request) => {
    //TODO: wrap the whole thing in a try catch and on finally end the session
    const session = await mongoose.startSession()
    session.startTransaction()

    var errorsList = new Map()
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    if(!request.body.shortDescription){
        errorsList.set('shortDescription', new ValidatorError("Invalid Short Description", 'shortDescription', 'INVALID_INPUT'))
    }

    //TODO: Create an algorithm to generate random image path
    if(!request.body.imagePath){
        errorsList.set('imagePath', new ValidatorError("Invalid Image Path", 'imagePath', 'INVALID_INPUT'))
    }

    var imageResult = await imageModel({
        shortDescription: request.body.shortDescription,
        imagePath: request.body.imagePath
	}).save({ session: session })

    if(!imageResult){
        //TODO: Replace with more appropriate custom error class
        throw new ValidationError(new ValidatorError("Failed Creating Image Object", 'image', 'FAILED_CREATION'))
    }

    if(errorsList.size == 0){
        await session.commitTransaction()
        session.endSession()
        return true
    }

    await session.abortTransaction()
    throw new ValidationError(errorsList)
}

const deleteImageByIdDb = (request) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA
    return (new imageModel).deleteByImageId(request.params.id)
}

module.exports = {
    createImageDb,
    getImageByIdDb,
    updateImageDb,
    deleteImageByIdDb,
}
