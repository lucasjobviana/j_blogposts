const router = require('express').Router();

const { categoryController } = require('../controllers');

router.get('/', categoryController.getAllCategories);

router.get('/name', categoryController.getCategoriesByName);

router.post('/', categoryController.createCategory);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;