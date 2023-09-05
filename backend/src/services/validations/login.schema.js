const Joi = require('joi');

const loginSchema = Joi.string().min(4).max(30);

const userLoginSchema = Joi.object({
    email: loginSchema.required(),
    password: loginSchema.required(),
});

module.exports = { loginSchema, userLoginSchema };