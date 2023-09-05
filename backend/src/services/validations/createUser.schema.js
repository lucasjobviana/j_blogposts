const Joi = require('joi');

const createUserSchema = Joi.object({
    displayName: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    image: Joi.string(),
});

module.exports = { createUserSchema };