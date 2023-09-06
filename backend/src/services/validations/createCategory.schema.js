const Joi = require('joi');

const createCategorySchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    userId: Joi.number().integer().required(),
});

module.exports = { createCategorySchema };