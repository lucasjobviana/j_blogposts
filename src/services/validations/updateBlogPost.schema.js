const Joi = require('joi');

const createBlogPostSchema = Joi.object({
    title: Joi.string().min(1).max(30).required(),
    content: Joi.string().min(1).max(100).required(),
});

module.exports = { createBlogPostSchema };