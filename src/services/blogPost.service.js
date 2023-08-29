const Sequelize = require('sequelize');
const { BlogPost, Category, User, PostCategory: pc } = require('../models');
const { createBlogPostValidator } = require('./validations');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const mapBlogPost = (blogPost) => ({
        title: blogPost.title,
        content: blogPost.content,
        userId: blogPost.userId,
        published: blogPost.published,
        updated: blogPost.updated,
    });

const mapPostCategories = (categories, postId) => categories.map((category) => ({
    postId,
    categoryId: category.id,
}));

const createPost = async (blogPost) => {
    const categories = await Category.findAll(
        { where: { id: blogPost.categoryIds } },
    );
    if (categories.length !== blogPost.categoryIds.length) {
    throw new Error('one or more "categoryIds" not found'); 
    }
    createBlogPostValidator(blogPost);
    const t = await sequelize.transaction();
     try {
        const createdPost = await BlogPost.create(mapBlogPost(blogPost), { transaction: t });
        await pc.bulkCreate(mapPostCategories(categories, createdPost.id), { transaction: t });
        await t.commit();
        return createdPost.dataValues;
    } catch (error) {
        await t.rollback(); throw error;
    }
};

const getAll = async () => {
    const posts = await BlogPost.findAll({
        include: [
            { model: Category, as: 'categories', through: { attributes: [] } },
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
        ],
    }); return posts;
};

const getById = async (id) => {
    const post = await BlogPost.findOne({
        where: { id },
        include: [
            { model: Category, as: 'categories', through: { attributes: [] } },
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
        ],
    });
    if (!post) throw new Error('Post does not exist');
    return post;
};
     
module.exports = {
    createPost,
    getAll,
    getById,
};
