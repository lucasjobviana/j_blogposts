const categoryService = require('../services/category.service');

const getAllCategories = async (req, res, _next) => {
    const users = await categoryService.getAllUsers();
    return res.status(200).json(users);
}; 

const getCategoriesByName = async (req, res, _next) => {
    const { id: userId } = req.user;
    const { search } = req.query;
    const categories = await categoryService.getCategoriesByName(search, userId);
    return res.status(200).json(categories);
};

const createCategory = async (req, res, _next) => {
    const { id: userId } = req.user;
    const category = await categoryService.createCategory({...req.body,userId});
     
    return res.status(201).json({
        ...category,
    });
};

const updateCategory = async (req, res, _next) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const category = await categoryService.updateCategory(id, req.body, userId);
    return res.status(200).json(category);
};

const deleteCategory = async (req, res, _next) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const category = await categoryService.deleteCategory(id, userId);
    return res.status(204).json({hasDeleted: true});
};

module.exports = {
    getAllCategories,
    createCategory,
    getCategoriesByName,
    deleteCategory,
    updateCategory,
};