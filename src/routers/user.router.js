const router = require('express').Router();

// const userController = require('../controllers');

router.get('/', (req, res, _next) => {
    res.status(200).json({
        message: 'get all users',
    });
});

module.exports = router;