const { Category } = require('../models');
const { createCategoryValidator } = require('./validations');

const getAllUsers = async () => {
    const categories = await Category.findAll();
    return categories;
};

const createCategory = async (category) => {
    createCategoryValidator(category);
    const createdCategory = await Category.create({ name: category.name });
    return createdCategory.dataValues;
};
     
module.exports = {
    getAllUsers,
    createCategory,
};
