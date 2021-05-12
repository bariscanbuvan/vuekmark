const jwt = require('jsonwebtoken');

function verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = {
    verify,
    sign
}