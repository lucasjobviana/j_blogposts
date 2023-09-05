const { Category } = require('../models');
const { createCategoryValidator } = require('./validations');
const { Op } = require("sequelize");

const getAllUsers = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getCategoriesByName = async (name) => {
    console.log('Service name: ',name);

    const categories = await Category.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
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
    getCategoriesByName,
};
