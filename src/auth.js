const db = require("../fakedb/fakedb")
const config = require("../config.json")
const jwt = require('jsonwebtoken');

authenticate = (args, context) => {
    obj = context.db.selectOp('users', args.username) // get user
    if (obj == null) {
        // username does not exist
        throw new Error(`username "${obj.username}" does not exist`)
    }
    if (obj.password !== args.password) {
        // password is incorrect
        throw new Error("password is incorrect")
    }
    scopes = context.db.selectOp('roles', obj.role)["scopes"]
    return {token: generateJWT(obj.username, scopes)}
}

generateJWT = (username, scopes) => {
    scope = scopes.join(" ")
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            sub: username,
            scope: scope
        }, config.jwtsecret
    )
}

verifyJWT = (token) => {    
    return jwt.verify(token, config.jwtsecret) // throws if invalid    
}

authorize = (tokenHeader, resourceName) => {
    // receive jwt, verify it, 
    // then if resourceName in scope return true 
    // else throws error
    if (!tokenHeader) {
        throw new Error("Unauthorized: bearer token missing")
    }
    token = tokenHeader.replace('Bearer ', '')
    decoded = verifyJWT(token)
    scopes = decoded.scope.split(" ")    
    if (!scopes.includes(resourceName)) {
        throw new Error("Unauthorized: user role does not have access")
    }

}

module.exports = {
    authenticate: authenticate,
    authorize: authorize,
    verifyJWT: verifyJWT
}