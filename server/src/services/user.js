const User = require('../models/user');
const Crypt = require('../helpers/crypt');
const jwt = require('../helpers/jwt');
const ApiError = require('../middlewares/ApiError');

async function login(username, password) {
    let user = await User.findOne({ username: username });

    if (user) {
        if (Crypt.check(password, user.password)) {
            const token = jwt.sign({ _id: user.id, username: username });
            return token;
        } else {
            throw new ApiError('User not found', 404);
        }
    } else {
        throw new ApiError('User not found', 404);
    }
}

async function register(username, password) {
    let user = await User.findOne({ username });

    if (user)
        throw new ApiError('This user already exists', 409);
    else if (password.length < 8)
        throw new ApiError('Password length should be greater than 8')

    user = new User({ username, password });
    user.password = Crypt.hash(password);

    await user.save();

    let token = jwt.sign({ _id: user.id, username: username });

    return token;
}

module.exports = {
    login,
    register
}