const { createBlogPostSchema } = require('./createBlogPost.schema');

const createBlogPostValidator = (blogPost) => {
    const { error } = createBlogPostSchema.validate(blogPost);
    if (error) throw new Error('Some required fields are missing');
};

module.exports = createBlogPostValidator;