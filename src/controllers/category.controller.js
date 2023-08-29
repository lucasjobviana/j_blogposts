const categoryService = require('../services/category.service');

const getAllCategories = async (req, res, _next) => {
    const users = await categoryService.getAllUsers();
    return res.status(200).json(users);
};

const createCategory = async (req, res, _next) => {
    const category = await categoryService.createCategory(req.body);
     
    return res.status(201).json({
        ...category,
    });
};

module.exports = {
    getAllCategories,
    createCategory,
};