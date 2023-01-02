const fs = require("fs")
const jwt = require("jsonwebtoken")

const RSA_PRIVATE_KEY = fs.readFileSync("./demos/private.key")

function generateToken(firstName, lastName, email, role) {
    return jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'HS256',
        expiresIn: 120,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role
    })
}

module.exports = {generateToken}