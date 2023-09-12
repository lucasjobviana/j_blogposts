const {Sequelize, Op} = require('sequelize');
const { BlogPost, Category, User, PostCategory: pc } = require('../models');
const { createBlogPostValidator, updateBlogPostValidator } = require('./validations');
const config = require('../config/config');
const PostCategory = require('../models/PostCategory');

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

const createPost = async (blogPost, userId) => {
    console.log('service blogPost: ',blogPost);
    let categories = [];
    if(blogPost.categoryIds[0] === 0) {
         categories = await Category.findAll(
        {
            where: {name: 'Geral', userId}

        });
    }else{
         categories = await Category.findAll(
        { 
                where: { id: blogPost.categoryIds, userId }

         },
        );

    }


    if (categories.length !== blogPost.categoryIds.length) {
    throw new Error('one or more "categoryIds" not found'); 
    }

    createBlogPostValidator(blogPost);
    const t = await sequelize.transaction();
     try {
        const createdPost = await BlogPost.create(mapBlogPost(blogPost), { transaction: t });
        await pc.bulkCreate(mapPostCategories(categories, createdPost.id), { transaction: t });
        await t.commit();
        createdPost.dataValues.categories = [categories[0].dataValues];
       
        const retorno = await createdPost.dataValues;
        console.log(retorno)
        return retorno;
    } catch (error) {
        await t.rollback(); throw error;
    }
};

const getPostsByName = async (name, userId) => {
    console.log('Service name: ',name);

    const posts = await BlogPost.findAll({
        where: {
            title: {
                [Op.like]: `%${name}%`,
            },
            userId,
        },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    console.log('______________________________________________________________________')
    console.log('meu service posts: ',posts);
    return posts;
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

const updatePost = async ({id, title, content, userId, categoryIds, updated=new Date()}) => {
    const post = await BlogPost.findOne({ where: { id } });
    // if (!post) throw new Error('Post does not exist');
    if (post.userId !== userId) throw new Error('Unauthorized user');
    updateBlogPostValidator({ title, content });
    await BlogPost.update({ title, content, updated }, { where: { id } });
    const retorno = await getById(id);
    let categories = [];
    if(categoryIds[0] === 0) {
         categories = await Category.findAll(
        {
            where: {name: 'Geral', userId}

        });
    }else{
         categories = await Category.findAll(
        { 
                where: { id: categoryIds, userId }

         },
        );

    }

    await pc.update({ categoryId:categories[0].id  }, { where: { postId:id } });
    return retorno;
};

const deletePost = async (id, userId) => {
    const post = await BlogPost.findOne({ where: { id } });
    if (!post) throw new Error('Post does not exist');
    if (post.userId !== userId) throw new Error('Unauthorized user');
    await BlogPost.destroy({ where: { id } });
};

const getByQuery = async (q) => {
    const posts = await BlogPost.findAll({
        where: Sequelize.or(
            { title: { [Sequelize.Op.like]: `%${q}%` } },
            { content: { [Sequelize.Op.like]: `%${q}%` } },
        ),
        include: [
            { model: Category, as: 'categories', through: { attributes: [] } },
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
        ],
    });
    return posts;
};
     
module.exports = {
    createPost,
    getAll,
    getById,
    updatePost,
    deletePost,
    getByQuery,
    getPostsByName
};
