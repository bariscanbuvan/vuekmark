const router = require('express').Router();
const DashboardController = require('../controllers/user');

router.post('/register', DashboardController.register);
router.post('/login', DashboardController.login);

module.exports = router;