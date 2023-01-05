const isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$')
                let salt = passwordFields[0]
                let hash = crypto.createHmac('sha512', salt)
                                 .update(req.body.password)
                                 .digest("base64")
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        email: user[0].email,
                        permissionLevel: user[0].permissionLevel,
                        provider: 'email',
                        name: user[0].firstName + ' ' + user[0].lastName,
                    }
                    return next()
                } else {
                    return res.status(400).send({errors: ['Invalid email or password']})
                }
            }
        })
}
 
const hasAuthValidFields = (req, res, next) => {
    if (req.headers['authorization']) {
        return res.status(406).send()
    } else {
        return next()
    }
}

module.exports = {
    isPasswordAndUserMatch,
    hasAuthValidFields
}