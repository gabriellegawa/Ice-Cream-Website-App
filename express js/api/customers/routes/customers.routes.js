const controllers = require('../controllers/customers.controllers.js')
const router = require('express').Router()

router.get('/', controllers.getCustomer)
router.post('/customers', controllers.createCustomer)

module.exports = router