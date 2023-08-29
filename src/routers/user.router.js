const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', (req, res, _next) => {
    console.log(userController);
    console.log(userController.createUser);
    console.log(userController.createUser());
    res.status(200).json({
        message: 'get all users',
    });
});

router.post('/', userController.createUser);

module.exports = router;