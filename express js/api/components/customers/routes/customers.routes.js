const controllers = require('../controllers/customers.controllers.js')
const router = require('express').Router()
const validationMiddleware = require('../../../authentication/middlewares/auth.validation.middleware')
const userAccountControllers = require('../../userAccount/controllers/userAccount.controllers')

router.get('/', [
    validationMiddleware.validJWTNeeded,
    controllers.getCustomer
])
router.post('/customers', controllers.createCustomer)

router.get('/test', [
    userAccountControllers.getUserAccountByUserName,
    // controllers.getCustomerByUserAccountId
])

module.exports = router