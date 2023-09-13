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

const getPostsByName = async (name, userId) => {
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

const createPost = async (blogPost, userId) => {
    let cat = [];
    
    if(blogPost.categories[0] === 0) {
         cat = await Category.findOne(
        {
            where: {userId}

        });
    }else{
         cat = await Category.findAll(
        { 
                where: { id: blogPost.categoryIds, userId }

         },
        );
    }

    if (cat.length && cat.length !== blogPost.categories.length) {
    throw new Error('one or more "categoryIds" not found'); 
    }

    createBlogPostValidator(blogPost);
    const t = await sequelize.transaction();
     try {
        const createdPost = await BlogPost.create(mapBlogPost(blogPost), { transaction: t });
        await pc.bulkCreate(mapPostCategories([cat], createdPost.id), { transaction: t });
        await t.commit();
        createdPost.dataValues.categories = [cat.dataValues];
        const retorno = createdPost.dataValues;
        return retorno;
    } catch (error) {
        await t.rollback(); throw error;
    }
};

const updatePost = async ({id, title, content, userId, categories, updated=new Date()}) => {
    console.log(content)
    const post = await BlogPost.findOne({ where: { id } });

    // if (!post) throw new Error('Post does not exist');
    if (post.userId !== userId) throw new Error('Unauthorized user');

    updateBlogPostValidator({ title, content });
    console.log('jaaaaaaa')
    await BlogPost.update({ title, content, updated }, { where: { id } });
    console.log('jaaaaaaa')
    const retorno = await getById(id);
    let cat = [];

    if(categories[0] === 0) {
        console.log(    'eh zero porra')
         cat = await Category.findAll(
        {
            where: { userId}

        });
    }else{
        console.log('nao eh zero')
        console.log(categories)
         cat = await Category.findAll(
        { 
                where: { id: categories, userId }/////////////////

         },
        );

    }
    console.log('jaaaaaaa')
    console.log(categories)
    console.log(cat)
   
    await pc.update({ categoryId:cat[0].id  }, { where: { postId:id } });
    console.log('jaaaaaaa')
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
