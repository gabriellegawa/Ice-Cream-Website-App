const controllers = require('../controllers/services.controllers')
const router = require('express').Router()
const validationMiddleware = require('../../../authentication/middlewares/auth.validation.middleware')

router.get('/', [
    validationMiddleware.validJWTNeeded,
    controllers.getAllServices
])

router.post('/', [
    validationMiddleware.validJWTNeeded,
    controllers.createService
])

router.get('/:id', [
    //Need to figure out what kind of search is perform is it by ID or by title or something different
    validationMiddleware.validJWTNeeded,
    controllers.getService
])

router.put('/:id', [
    validationMiddleware.validJWTNeeded,
    controllers.updateService
])

router.delete('/:id', [
    validationMiddleware.validJWTNeeded,
    controllers.deleteService
])

module.exports = router