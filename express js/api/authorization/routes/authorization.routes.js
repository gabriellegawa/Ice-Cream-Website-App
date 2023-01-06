const router = require('express').Router()
const controllers = require('../controllers/authorization.controllers')
const verifyUserMiddleware = require('../middlewares/verify.user.middleware')

router.post('/auth', [
    verifyUserMiddleware.hasAuthValidFields,
    verifyUserMiddleware.isPasswordAndUserMatch,
    controllers.login
])

module.exports = router