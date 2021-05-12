const userService = require('../services/user');

module.exports = {
    async register(req, res) {
        res.json({ token: await userService.register(req.body.username, req.body.password) });

    },

    async login(req, res) {
        res.json({ token: await userService.login(req.body.username, req.body.password) });
    }
}