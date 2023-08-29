const Joi = require('joi');

const createBlogPostSchema = Joi.object({
    title: Joi.string().min(1).max(30).required(),
    content: Joi.string().min(1).max(100).required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
    userId: Joi.number().required(),
    updated: Joi.date().required(),
    published: Joi.date().required(),

});

module.exports = { createBlogPostSchema };