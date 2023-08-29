const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.delete('/me', userController.deleteUser);

module.exports = router;