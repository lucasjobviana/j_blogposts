const router = require('express').Router();

const { blogPostController } = require('../controllers');

// router.get('/', blogPostController.getAllO);

router.post('/', blogPostController.createPost);

module.exports = router;