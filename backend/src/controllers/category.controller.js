const categoryService = require('../services/category.service');

const getAllCategories = async (req, res, _next) => {
    console.log('cheguei aqui')
    const users = await categoryService.getAllUsers();
    return res.status(200).json(users);
};

const getCategoriesByName = async (req, res, _next) => {
    console.log('Controller query jfdskltla: ',req.query);
    const { search } = req.query;
    const categories = await categoryService.getCategoriesByName(search);
    return res.status(200).json(categories);
};

const createCategory = async (req, res, _next) => {
    const category = await categoryService.createCategory(req.body);
     
    return res.status(201).json({
        ...category,
    });
};

const deleteCategory = async (req, res, _next) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const category = await categoryService.deleteCategory(id, userId);
    return res.status(204).json(category);
};

module.exports = {
    getAllCategories,
    createCategory,
    getCategoriesByName,
    deleteCategory,
};