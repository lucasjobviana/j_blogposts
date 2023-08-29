const blogPostService = require('../services/blogPost.service');

const createPost = async (req, res, _next) => {
    const actualDate = new Date();
    const createdPost = await blogPostService.createPost({ 
        ...req.body, 
        userId: req.user.id,
        updated: actualDate,
        published: actualDate, 
    });
     
    return res.status(201).json({
        ...createdPost,
    });
};

const getAll = async (req, res, _next) => {
    const posts = await blogPostService.getAll();
    return res.status(200).json(posts);
};

const getById = async (req, res, _next) => {
    const { id } = req.params;
    const post = await blogPostService.getById(id);
    return res.status(200).json(post);
};

module.exports = {
    createPost,
    getAll,
    getById,
};