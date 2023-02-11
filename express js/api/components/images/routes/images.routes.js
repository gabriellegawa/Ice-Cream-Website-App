const controllers = require('../controllers/images.controllers')
const router = require('express').Router()
const validationMiddleware = require('../../../authentication/middlewares/auth.validation.middleware')

router.post('/', [
    validationMiddleware.validJWTNeeded,
    controllers.createImage
])

router.get('/:id', [
    //Need to figure out what kind of search is perform is it by ID or by title or something different
    // validationMiddleware.validJWTNeeded,
    controllers.getImage
])

router.put('/:id', [
    validationMiddleware.validJWTNeeded,
    controllers.updateImage
])

router.delete('/:id', [
    validationMiddleware.validJWTNeeded,
    controllers.deleteImage
])

module.exports = router