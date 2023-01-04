const fs = require("fs")
const jwt = require("jsonwebtoken")

const RSA_PRIVATE_KEY = fs.readFileSync("./demos/private.key")

<<<<<<< HEAD
function generateToken(firstName, lastName, email, role) {
    return jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'HS256',
        expiresIn: 120,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role
=======
function generateToken(id) {
    return jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'HS256',
        expiresIn: 120,
        subject: id
>>>>>>> fb8a4ff8e22d38cf808c03b7655ffa62a0211466
    })
}

module.exports = {generateToken}