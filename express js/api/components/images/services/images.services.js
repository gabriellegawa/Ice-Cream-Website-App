const mongoose = require("mongoose");

const fs = require("fs")
const path = require("path")

const imageModel = require("../../../../models/image.models")
const ValidationError = require('../../../lib/Validation/Exception/ValidationError')
const ValidatorError = require('../../../lib/Validation/Exception/ValidatorError')
const { isUndefinedString } = require('../../../lib/Validation/CommonUtils/StringValidator/StringValidator')

//TODO: instead of passing req, make it into parameter like address,city,postalCode...
const createImageDb = async (request, session = null) => {
    //TODO: ADD DATA VALIDATION TO ENSURE ONLY CONSUME GOOD DATA

    var errorsList = new Map()
    
    if(isUndefinedString(request.body.image.imagePath)){
        errorsList.set('imagePath', new ValidatorError("Invalid image path", 'imagePath', 'INVALID_INPUT'))
    }

    if(isUndefinedString(request.body.image.shortDescription)){
        errorsList.set('shortDescription', new ValidatorError("Invalid short description", 'shortDescription', 'INVALID_INPUT'))
    }

    if(isUndefinedString(request.body.image.base64)){
        errorsList.set('base64', new ValidatorError("Invalid base64", 'base64', 'INVALID_INPUT'))
    }
    
    //TODO: add if to only save when there isnt any error
    let fileName = `${Date.now()}_${request.body.image.imagePath}`
    let filePath = '/public/images/' + fileName
    let buffer = Buffer.from(request.body.image.base64.split(',')[1],"base64")
    

    fs.writeFileSync(path.join('./',filePath),buffer,'base64')

    
    var newImage = new imageModel({
        shortDescription: request.body.image.shortDescription,
        imagePath: fileName
	})

    var result = await newImage.save({session: session})
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