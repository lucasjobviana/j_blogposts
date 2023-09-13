const Joi = require('joi');

const createBlogPostSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).max(10000).required(),
});

module.exports = { createBlogPostSchema };