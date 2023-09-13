const { Category, User, PostCategory, BlogPost } = require('../models');
const { createCategoryValidator } = require('./validations');
const { Op } = require("sequelize");

const getAllUsers = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getCategoriesByName = async (name, userId) => {
    const categories = await Category.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
            userId,
        },
    });
    return categories;
};


const createCategory = async (category) => {
    createCategoryValidator(category);
    const createdCategory = await Category.create({ name: category.name, userId: category.userId });
    return createdCategory.dataValues;
};

const deleteCategory = async (id, userId) => {
    const category = await Category.findOne({ 
        where: { id },
        include: [
            {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
        ],
    });

    if (!category) throw new Error('Category does not exist');
    if (category.userId !== userId) throw new Error('Unauthorized user');
    await Category.destroy({ where: { id } });
};

const updateCategory = async (id, category, userId) => {
    const { name } = category;
    const categoryToUpdate = await Category.findOne({ where: { id } });
    if (!categoryToUpdate) throw new Error('Category does not exist');
    if (categoryToUpdate.userId !== userId) throw new Error('Unauthorized user');
    await Category.update({ name }, { where: { id } });
    const updatedCategory = await Category.findOne({ where: { id } });
    return updatedCategory;
};
     
module.exports = {
    getAllUsers,
    createCategory,
    getCategoriesByName,
    deleteCategory,
    updateCategory,
};
