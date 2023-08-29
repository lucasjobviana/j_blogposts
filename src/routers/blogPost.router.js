const router = require('express').Router();

const { blogPostController } = require('../controllers');

router.get('/', blogPostController.getAll);

router.post('/', blogPostController.createPost);

router.get('/:id', blogPostController.getById); 

router.put('/:id', blogPostController.updatePost);

router.delete('/:id', blogPostController.deletePost);

module.exports = router;