const blogPostService = require('../services/blogPost.service');

const createPost = async (req, res, _next) => {
    const actualDate = new Date();

    const createdPost = await blogPostService.createPost({ 
        ...req.body, 
        userId: req.user.id,
        updated: actualDate,
        published: actualDate, 
    }, req.user.id);
     
    return res.status(201).json({
        ...createdPost,
    });
};

const getAll = async (req, res, _next) => {
    const posts = await blogPostService.getAll();
    return res.status(200).json(posts);
};

const getPostsByName = async (req, res, _next) => {
    console.log('Controller post query: ',req.query);
    const { id: userId } = req.user;
    const { search } = req.query;
    const posts = await blogPostService.getPostsByName(search, userId);
    return res.status(200).json(posts);
};

const getById = async (req, res, _next) => {
    const { id } = req.params;
    const post = await blogPostService.getById(id);
    return res.status(200).json(post);
};

const updatePost = async (req, res, _next) => {
    console.log(req.body.content)
    const { id } = req.params;
    const { title, content, categories=[0] } = req.body;
    const { id: userId } = req.user;
    const updatedPost = await blogPostService.updatePost({id, title, content, userId, categories});
    return res.status(200).json(updatedPost);
};

const deletePost = async (req, res, _next) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    await blogPostService.deletePost(id, userId);
    return res.status(204).end();
};

const getByQuery = async (req, res, _next) => {
    const { q } = req.query;
    const posts = await blogPostService.getByQuery(q);
    return res.status(200).json(posts);
};

module.exports = {
    createPost,
    getAll,
    getById,
    updatePost,
    deletePost,
    getByQuery,
    getPostsByName,
};