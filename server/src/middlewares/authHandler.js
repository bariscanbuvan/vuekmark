const jwt = require('../helpers/jwt');
let Error = require('./ApiError');

function authenticationHandler (req, res, next) {
    let isAuthenticationRequired = req.path.startsWith('/users') || req.path.startsWith('/login') || req.path.startsWith('/register');

    if (isAuthenticationRequired == false) {
        if (req.headers.authorization && req.headers.authorization.split(' ').length == 2) {
            const token = req.headers.authorization.split(' ')[1];
            let decoded = jwt.verify(token);
            req.user = decoded;
        } else {
            throw new Error('Unauthorized', 401);
        }
    }
    next();
}

module.exports = authenticationHandler