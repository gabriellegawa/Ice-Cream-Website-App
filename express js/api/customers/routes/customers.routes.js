const controllers = require('../controllers/customers.controllers.js')
const router = require('express').Router()
const verifyUserMiddleware = require('../../authorization/middlewares/verify.user.middleware')
const validationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

router.get('/', [
    validationMiddleware.validJWTNeeded,
    controllers.getCustomer
])
router.post('/customers', controllers.createCustomer)

module.exports = router