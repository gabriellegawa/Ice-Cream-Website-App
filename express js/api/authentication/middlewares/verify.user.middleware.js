const {
  getUserAccountByUserNameDb,
} = require("../../components/userAccounts/services/userAccounts.services");
var crypto = require("crypto");

const isPasswordAndUserMatch = (request, response, next) => {
  console.log(request.body);
  if (request.body.userName || request.body.password) {
    getUserAccountByUserNameDb(request.body.userName).then((user) => {
      if (!user[0]) {
        response.status(404).send({});
      } else {
        let passwordFields = user[0].password.split("$");
        let salt = passwordFields[0];
        let hash = crypto
          .createHmac("sha512", salt)
          .update(request.body.password)
          .digest("base64");
        if (hash === passwordFields[1]) {
          return next();
        } else {
          return response
            .status(400)
            .send({ errors: ["Invalid email or password"] });
        }
      }
    });
  } else {
    response
      .status(400)
      .send({ errors: ["Missing required authentication fields"] });
  }
};

const hasAuthValidFields = (req, res, next) => {
  console.log(req.headers);
  if (req.headers["authorization"]) {
    return res.status(406).send();
  } else {
    return next();
  }
};

module.exports = {
  isPasswordAndUserMatch,
  hasAuthValidFields,
};
