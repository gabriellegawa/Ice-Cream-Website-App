const fs = require("fs");

const jwksRsa = require("jwks-rsa");
const expressJwt = require("express-jwt");

const RSA_PUBLIC_KEY = fs.readFileSync("./api/authentication/demos/public.key");

function checkIfAuthenticated() {
  return expressJwt.expressjwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ["HS256"],
  });
}

module.exports = { checkIfAuthenticated };
