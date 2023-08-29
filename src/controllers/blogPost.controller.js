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

module.exports = {
    createPost,
};