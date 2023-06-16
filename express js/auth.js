const fs = require("fs");
const jwt = require("jsonwebtoken");

const RSA_PRIVATE_KEY = fs.readFileSync(
  "./api/authentication/demos/private.key"
);

function generateToken(id) {
  return jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn: "2h",
    subject: id,
  });
}

module.exports = { generateToken };
