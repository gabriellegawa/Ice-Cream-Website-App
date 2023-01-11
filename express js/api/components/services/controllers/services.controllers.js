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
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

const createService = async (request, response, next) => {
    try {
        var requestResult = await createServiceDb(request)

        response.status(200).json(requestResult)
    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

const getService = async (request, response, next) => {
    try {
        var requestResult = await getServiceByIdDb(request)

        response.status(200).json(requestResult)
    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
    }
}

const updateService = async (request, response, next) => {
    try {
        var requestResult = await updateServiceDb(request)

        response.status(200).json(requestResult)
    } catch(e) {
        console.log(e.message)
        response.sendStatus(500).send(e)
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