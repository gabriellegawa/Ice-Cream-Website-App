const controllers = require('../controllers/customers.controllers.js')

const router = require('express').Router()
const validationMiddleware = require('../../../authentication/middlewares/auth.validation.middleware')
const userAccountsControllers = require('../../userAccounts/controllers/userAccounts.controllers')

router.get('/', [
    validationMiddleware.validJWTNeeded,
    controllers.getCustomer
])
router.post('/customers', [
    validationMiddleware.validJWTNeeded,
    controllers.createCustomer
])

router.get('/test', [
    userAccountsControllers.getUserAccountByUserName,
    // controllers.getCustomerByUserAccountId
])

module.exports = router