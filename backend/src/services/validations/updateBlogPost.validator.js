const { createBlogPostSchema: updateBlogPostSchema } = require('./updateBlogPost.schema');

const updateBlogPostValidator = (blogPost) => {
    const { error } = updateBlogPostSchema.validate(blogPost);
    if (error) throw new Error('Some required fields are missing');
};

module.exports = updateBlogPostValidator;