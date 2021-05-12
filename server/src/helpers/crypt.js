const bcrypt = require('bcrypt');

const saltRounds = 10;

function hash(data) {
    let salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(data, salt);
}

function check(data, encrypted) {
    return bcrypt.compareSync(data, encrypted);
}

module.exports = {
    hash,
    check
}