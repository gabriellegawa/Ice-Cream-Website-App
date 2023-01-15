const { getAllServicesDb } = require("../services/services.services")
const { createServiceDb } = require("../services/services.services")
const { getServiceByIdDb } = require("../services/services.services")
const { updateServiceDb } = require("../services/services.services")
const { deleteServiceByIdDb } = require("../services/services.services")

const getAllServices = async (request, response, next) => {
    try {
        var requestResult = await getAllServicesDb()

        response.status(200).json(requestResult)
    } catch(e) {
        response.sendStatus(500).send(e)
    }
}

const createService = async (request, response, next) => {
    try {
        var requestResult = await createServiceDb(request)

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

const getService = async (request, response, next) => {
    try {
        var requestResult = await getServiceByIdDb(request)

        response.status(200).json(requestResult)
    } catch(e) {
        response.sendStatus(500).send(e)
    }
}

const updateService = async (request, response, next) => {
    try {
        var requestResult = await updateServiceDb(request)

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

const deleteService = async (request, response, next) => {
    try {
        var requestResult = await deleteServiceByIdDb(request)

        response.status(200).json(requestResult)
    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

module.exports = {
    getAllServices,
    createService,
    getService,
    updateService,
    deleteService,
}