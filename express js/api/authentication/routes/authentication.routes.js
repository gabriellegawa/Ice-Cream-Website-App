const router = require('express').Router()
const controllers = require('../controllers/authentication.controllers')
const verifyUserMiddleware = require('../middlewares/verify.user.middleware')

router.post('/login', [
    verifyUserMiddleware.hasAuthValidFields,
    verifyUserMiddleware.isPasswordAndUserMatch,
    controllers.login
])

router.get('/login', (request, response) => {
    response.send('App is working')
  })

module.exports = router