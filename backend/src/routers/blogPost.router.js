const router = require('express').Router();

const { blogPostController } = require('../controllers');

router.get('/search', blogPostController.getByQuery);

router.get('/', blogPostController.getAll);

router.get('/name', blogPostController.getPostsByName);

router.post('/', blogPostController.createPost);

router.get('/:id', blogPostController.getById); 

router.put('/:id', blogPostController.updatePost);

router.delete('/:id', blogPostController.deletePost);

module.exports = router;