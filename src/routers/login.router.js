const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.login);

module.exports = router;