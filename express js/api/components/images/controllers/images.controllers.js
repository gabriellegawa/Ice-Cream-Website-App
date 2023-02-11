const { createImageDb } = require("../services/images.services")
const { getImageByIdDb } = require("../services/images.services")
const { updateImageDb } = require("../services/images.services")
const { deleteImageByIdDb } = require("../services/images.services")

const createImage = async (request, response, next) => {
    try {
        var requestResult = await createImageDb(request)

        response.status(200).json(requestResult)
    } catch(error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return response.status(400).send(errors);
        }
        response.sendStatus(500).send(error)
    }
}

const getImage = async (request, response, next) => {
    try {
        var requestResult = await getImageByIdDb(request)

        response.status(200).json(requestResult)
    } catch(e) {
        response.sendStatus(500).send(e)
    }
}

const updateImage = async (request, response, next) => {
    try {
        var requestResult = await updateImageDb(request)

        response.status(200).json(requestResult)
    } catch(error) {
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return response.status(400).send(errors);
        }
        response.sendStatus(500).send(error)
    }
}

const deleteImage = async (request, response, next) => {
    try {
        var requestResult = await deleteImageByIdDb(request)

        response.status(200).json(requestResult)
    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

module.exports = {
    createImage,
    getImage,
    updateImage,
    deleteImage,
}