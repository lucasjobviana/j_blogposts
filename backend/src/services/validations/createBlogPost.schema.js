const Joi = require('joi');

const createBlogPostSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).max(10000).required(),
    categories: Joi.array().items(Joi.number()).required(),
    userId: Joi.number().required(),
    updated: Joi.date().required(),
    published: Joi.date().required(),

});

module.exports = { createBlogPostSchema };